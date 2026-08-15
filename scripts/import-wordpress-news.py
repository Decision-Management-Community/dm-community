import argparse
import concurrent.futures
import datetime as dt
import html
import json
import mimetypes
import os
import pathlib
import re
import ssl
import time
import urllib.error
import urllib.parse
import urllib.request


API_BASE = "https://dmcommunity.org/wp-json/wp/v2"
SITE_BASE = "https://dmcommunity.org"
SSL_CONTEXT = ssl._create_unverified_context()
USER_AGENT = "DMCommunity WordPress-to-Astro migration/1.0"
UPLOAD_HOSTS = {
    "dmcommunity.org",
    "www.dmcommunity.org",
    "dmcommunity.files.wordpress.com",
    "i0.wp.com",
    "i1.wp.com",
    "i2.wp.com",
}
URL_RE = re.compile(r"https?://[^\s\"'<>]+", re.IGNORECASE)
SOURCE_URL_RE = re.compile(r'^sourceUrl:\s*["\']?(https?://dmcommunity\.org/[^"\'\s]+)', re.MULTILINE)
LEGACY_PATH_RE = re.compile(r'^legacyPath:\s*["\']?(/\d{4}/\d{2}/\d{2}/[a-z0-9-]+/)', re.MULTILINE)


def request(url, *, timeout=90):
    for attempt in range(7):
        try:
            return urllib.request.urlopen(
                urllib.request.Request(url, headers={"User-Agent": USER_AGENT}),
                context=SSL_CONTEXT,
                timeout=timeout,
            )
        except urllib.error.HTTPError as exc:
            if exc.code != 429 or attempt == 6:
                raise
            retry_after = int(exc.headers.get("Retry-After", "0") or 0)
            delay = min(30, max(retry_after, 2 ** attempt))
            print(f"Rate limited; retrying in {delay}s", flush=True)
            time.sleep(delay)


def fetch_json(path, **params):
    query = urllib.parse.urlencode(params, doseq=True)
    with request(f"{API_BASE}/{path}?{query}") as response:
        return json.load(response), dict(response.headers)


def fetch_all(path, *, fields):
    records = []
    page = 1
    while True:
        batch, headers = fetch_json(path, per_page=100, page=page, _fields=fields)
        records.extend(batch)
        total_pages = int(headers.get("X-WP-TotalPages", "1"))
        print(f"Fetched {path} page {page}/{total_pages}", flush=True)
        if page >= total_pages:
            return records
        page += 1
        time.sleep(0.35)


def normalize_legacy_url(value):
    parsed = urllib.parse.urlsplit(html.unescape(value))
    host = (parsed.hostname or "").lower()
    if host not in {"dmcommunity.org", "www.dmcommunity.org"}:
        return None
    path = re.sub(r"/+", "/", parsed.path)
    return path.rstrip("/") + "/"


def load_existing_url_ids(news_dir):
    mapping = {}
    if not news_dir.exists():
        return mapping
    for path in news_dir.glob("*.md"):
        if path.name == "README.md":
            continue
        text = path.read_text(encoding="utf-8")
        legacy_match = LEGACY_PATH_RE.search(text)
        if legacy_match:
            mapping[legacy_match.group(1)] = path.stem
            continue
        match = SOURCE_URL_RE.search(text)
        if match:
            legacy_path = normalize_legacy_url(match.group(1))
            if legacy_path:
                mapping[legacy_path] = path.stem
    return mapping


def media_key(value):
    value = html.unescape(value).rstrip(".,;:")
    parsed = urllib.parse.urlsplit(value)
    host = (parsed.hostname or "").lower()
    if host not in UPLOAD_HOSTS or "/wp-content/uploads/" not in parsed.path:
        return None
    suffix = parsed.path.split("/wp-content/uploads/", 1)[1].lstrip("/")
    if not suffix or suffix.endswith("/"):
        return None
    return urllib.parse.unquote(suffix)


def collect_media(posts):
    found = {}
    for post in posts:
        body = post.get("content", {}).get("rendered", "")
        for raw in URL_RE.findall(html.unescape(body)):
            key = media_key(raw)
            if key:
                # Jetpack often renders several i0.wp.com resize variants of
                # the same upload. Always fetch the original upload once.
                canonical = f"{SITE_BASE}/wp-content/uploads/{urllib.parse.quote(key, safe='/@._-')}"
                found.setdefault(key, canonical)
    return found


def probe_media(item):
    key, url = item
    try:
        req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, context=SSL_CONTEXT, timeout=45) as response:
            return key, int(response.headers.get("Content-Length", "0") or 0), response.headers.get("Content-Type"), None
    except Exception as exc:
        return key, 0, None, str(exc)


def audit_media(media):
    rows = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        for index, result in enumerate(pool.map(probe_media, media.items()), start=1):
            rows.append(result)
            if index % 100 == 0:
                print(f"Probed {index}/{len(media)} media files", flush=True)
    failures = [row for row in rows if row[3]]
    return {
        "count": len(rows),
        "reported_bytes": sum(row[1] for row in rows),
        "reported_megabytes": round(sum(row[1] for row in rows) / 1024 / 1024, 2),
        "failures": [{"path": row[0], "error": row[3]} for row in failures],
    }


def download_media(item, output_root):
    key, url = item
    destination = output_root / key
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists() and destination.stat().st_size:
        return key, destination.stat().st_size, None
    try:
        with request(url, timeout=120) as response:
            data = response.read()
        destination.write_bytes(data)
        return key, len(data), None
    except Exception as exc:
        return key, 0, str(exc)


def rewrite_content(body, media, legacy_routes):
    body = body.replace("\r\n", "\n")
    body = re.sub(r"<!--\s*/?wp:[\s\S]*?-->", "", body)
    # Jetpack expands old contact-form shortcodes into a large interactive
    # form containing runtime-only bindings, expiring JWTs, and API URLs. The
    # form cannot work on a static site, so retain the invitation and replace
    # the widget with the community email address.
    body = re.sub(
        r"<p>([^<]*?)<div\s+data-test=['\"]contact-form['\"][\s\S]*?</form>\s*</div>",
        lambda match: (
            f"<p>{match.group(1).strip()} "
            '<a href="mailto:DecisionManagementCommunity@gmail.com">'
            "DecisionManagementCommunity@gmail.com</a>.</p>"
        ),
        body,
        flags=re.IGNORECASE,
    )
    body = re.sub(
        r'<img\b[^>]*\bsrc=["\']data:image/[^"\']+["\'][^>]*\/?>',
        "",
        body,
        flags=re.IGNORECASE,
    )
    body = re.sub(r'href=(["\'])DMCommunity\.org\1', r'href=\1https://dmcommunity.org/\1', body, flags=re.IGNORECASE)
    body = re.sub(r'href=(["\'])(?!mailto:)([^"\']+@[^"\']+)\1', r'href=\1mailto:\2\1', body, flags=re.IGNORECASE)
    body = body.replace("mailto:mailto:", "mailto:")
    # A few WordPress posts accidentally stored an author's local Downloads
    # path as a link. Keep the visible text but never publish the machine path.
    body = re.sub(
        r'<a\b[^>]*href=["\'](?:/[Uu]sers/|[A-Za-z]:\\)[^"\']*["\'][^>]*>([\s\S]*?)</a>',
        r"\1",
        body,
        flags=re.IGNORECASE,
    )

    def replace_url(match):
        original = html.unescape(match.group(0)).rstrip(".,;:")
        key = media_key(original)
        if key and key in media:
            return f"/news-media/{urllib.parse.quote(key, safe='/@._-')}"
        legacy_path = normalize_legacy_url(original)
        if legacy_path and legacy_path in legacy_routes:
            return f"/news/{legacy_routes[legacy_path]}/"
        return match.group(0)

    return URL_RE.sub(replace_url, body).strip() + "\n"


def yaml_string(value):
    return json.dumps(value, ensure_ascii=False)


def post_markdown(post, post_id, categories, tags, authors, media, legacy_routes):
    title = html.unescape(post["title"]["rendered"]).strip()
    date = post["date"][:10]
    author = authors.get(post.get("author"))
    topic_names = []
    for category_id in post.get("categories", []):
        name = categories.get(category_id)
        if name and name not in topic_names and name != "Uncategorized":
            topic_names.append(name)
    for tag_id in post.get("tags", []):
        name = tags.get(tag_id)
        if name and name not in topic_names:
            topic_names.append(name)
    legacy_path = normalize_legacy_url(post["link"])
    body = rewrite_content(post.get("content", {}).get("rendered", ""), media, legacy_routes)
    lines = ["---", f"title: {yaml_string(title)}", f"date: {date}"]
    if author:
        lines.append(f"author: {yaml_string(author)}")
    lines.append(f"tags: {json.dumps(topic_names, ensure_ascii=False)}")
    if legacy_path:
        lines.append(f"legacyPath: {yaml_string(legacy_path)}")
    lines.extend(["---", "", body])
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("repo", type=pathlib.Path)
    parser.add_argument("--audit-media", action="store_true")
    parser.add_argument("--download-media", action="store_true")
    args = parser.parse_args()

    posts = fetch_all(
        "posts",
        fields="id,date,slug,link,title,content,excerpt,author,categories,tags,featured_media",
    )
    category_records = fetch_all("categories", fields="id,name")
    tag_records = fetch_all("tags", fields="id,name")
    author_records = fetch_all("users", fields="id,name")
    categories = {item["id"]: html.unescape(item["name"]) for item in category_records}
    tags = {item["id"]: html.unescape(item["name"]) for item in tag_records}
    authors = {item["id"]: html.unescape(item["name"]) for item in author_records}

    news_dir = args.repo / "src" / "content" / "news"
    existing_ids = load_existing_url_ids(news_dir)
    legacy_routes = {}
    post_ids = {}
    used_ids = set()
    for post in posts:
        legacy_path = normalize_legacy_url(post["link"])
        candidate = existing_ids.get(legacy_path) or f"{post['date'][:10]}-{post['slug']}"
        # Five WordPress slugs ended with percent-encoded invisible Unicode
        # characters. Keep those bytes in legacyPath, but not in the new ID.
        candidate = re.sub(r"(?:%[0-9a-fA-F]{2})+", "", candidate).strip("-")
        post_id = candidate
        counter = 2
        while post_id in used_ids:
            post_id = f"{candidate}-{counter}"
            counter += 1
        used_ids.add(post_id)
        post_ids[post["id"]] = post_id
        if legacy_path:
            legacy_routes[legacy_path] = post_id

    media = collect_media(posts)
    print(json.dumps({"posts": len(posts), "media_urls": len(media), "preserved_ids": len(existing_ids)}, indent=2))
    if args.audit_media:
        print(json.dumps(audit_media(media), indent=2, ensure_ascii=False))
        return

    downloaded = set()
    if args.download_media:
        output_root = args.repo / "public" / "news-media"
        failures = []
        total = 0
        with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
            jobs = ((key, url) for key, url in media.items())
            for index, (key, size, error) in enumerate(pool.map(lambda item: download_media(item, output_root), jobs), start=1):
                if error:
                    failures.append({"path": key, "error": error})
                else:
                    downloaded.add(key)
                    total += size
                if index % 100 == 0:
                    print(f"Downloaded {index}/{len(media)} media files", flush=True)
        (args.repo / "news-media-migration.json").write_text(
            json.dumps({"downloaded": len(downloaded), "bytes": total, "failures": failures}, indent=2),
            encoding="utf-8",
        )
    else:
        downloaded = set(media)

    news_dir.mkdir(parents=True, exist_ok=True)
    for path in news_dir.glob("*.md"):
        if path.name != "README.md":
            path.unlink()
    for post in posts:
        post_id = post_ids[post["id"]]
        content = post_markdown(post, post_id, categories, tags, authors, downloaded, legacy_routes)
        (news_dir / f"{post_id}.md").write_text(content, encoding="utf-8", newline="\n")

    print(f"Wrote {len(posts)} news posts to {news_dir}")


if __name__ == "__main__":
    main()

