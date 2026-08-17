import argparse
import datetime as dt
import html
import json
import pathlib
import re
import ssl
import time
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser


API_BASE = "https://dmcommunity.org/wp-json/wp/v2"
SSL_CONTEXT = ssl._create_unverified_context()
USER_AGENT = "DMCommunity WordPress-comment migration/1.0"
LEGACY_PATH_RE = re.compile(r'^legacyPath:\s*["\']?(/\d{4}/\d{2}/\d{2}/[^"\'\s]+/)', re.MULTILINE)


class CommentTextParser(HTMLParser):
    """Convert approved WordPress comment HTML to safe, readable plain text."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() in {"br", "p", "div", "li", "blockquote"}:
            self.parts.append("\n")

    def handle_endtag(self, tag):
        if tag.lower() in {"p", "div", "li", "blockquote"}:
            self.parts.append("\n")

    def handle_data(self, data):
        self.parts.append(data)

    def text(self):
        raw = "".join(self.parts).replace("\r\n", "\n")
        lines = []
        for line in raw.split("\n"):
            cleaned = " ".join(line.split())
            if cleaned:
                lines.append(cleaned)
        return "\n".join(lines)


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


def load_legacy_routes(news_dir):
    routes = {}
    for path in news_dir.glob("*.md"):
        if path.name == "README.md":
            continue
        match = LEGACY_PATH_RE.search(path.read_text(encoding="utf-8"))
        if match:
            routes[match.group(1)] = path.stem
    return routes


def comment_text(rendered):
    parser = CommentTextParser()
    parser.feed(rendered or "")
    parser.close()
    return parser.text()


def main():
    parser = argparse.ArgumentParser(description="Archive approved WordPress comments for migrated News posts.")
    parser.add_argument("repo", type=pathlib.Path)
    args = parser.parse_args()

    news_dir = args.repo / "src" / "content" / "news"
    routes = load_legacy_routes(news_dir)
    if not routes:
        raise SystemExit(f"No legacyPath entries found in {news_dir}")

    posts = fetch_all("posts", fields="id,link")
    comments = fetch_all("comments", fields="id,post,parent,author_name,date,content")

    wordpress_to_news = {}
    for post in posts:
        legacy_path = normalize_legacy_url(post.get("link", ""))
        news_id = routes.get(legacy_path)
        if news_id:
            wordpress_to_news[post["id"]] = news_id

    archived = {}
    unmatched = 0
    for comment in comments:
        news_id = wordpress_to_news.get(comment.get("post"))
        if not news_id:
            unmatched += 1
            continue
        content = comment_text(comment.get("content", {}).get("rendered", ""))
        if not content:
            continue
        archived.setdefault(news_id, []).append(
            {
                "id": int(comment["id"]),
                "parent": int(comment.get("parent") or 0),
                "author": html.unescape(comment.get("author_name") or "Anonymous").strip() or "Anonymous",
                "date": comment.get("date", ""),
                "content": content,
            }
        )

    for thread in archived.values():
        thread.sort(key=lambda item: (item["date"], item["id"]))

    output = args.repo / "src" / "data" / "legacy-news-comments.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(archived, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    archived_count = sum(len(thread) for thread in archived.values())
    print(
        json.dumps(
            {
                "wordpress_posts": len(posts),
                "wordpress_comments": len(comments),
                "archived_comments": archived_count,
                "news_posts_with_comments": len(archived),
                "unmatched_comments": unmatched,
                "generated_at": dt.datetime.now(dt.timezone.utc).isoformat(),
                "output": str(output),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
