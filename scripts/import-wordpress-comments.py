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


# DMCommunity is hosted on WordPress.com. Use Automattic's public API instead
# of the site's proxied wp-json endpoint: the latter aggressively rate-limits
# cloud CI addresses, while this endpoint is explicitly public and unauthenticated.
API_URL = "https://public-api.wordpress.com/rest/v1.1/sites/dmcommunity.org/comments/"
SSL_CONTEXT = ssl._create_unverified_context()
USER_AGENT = "DMCommunity comment archive migration/1.0"
LEGACY_PATH_RE = re.compile(r'^legacyPath:\s*["\']?(/\d{4}/\d{2}/\d{2}/[^"\'\s]+/)', re.MULTILINE)
TITLE_RE = re.compile(r'^title:\s*(.+?)\s*$', re.MULTILINE)


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


def fetch_comments():
    comments = []
    page = 1
    while True:
        query = urllib.parse.urlencode(
            {
                "number": 100,
                "page": page,
                "order": "ASC",
                "type": "comment",
                "status": "approved",
            }
        )
        with request(f"{API_URL}?{query}") as response:
            payload = json.load(response)
        batch = payload.get("comments", [])
        comments.extend(batch)
        found = payload.get("found")
        total_label = found if isinstance(found, int) and found >= 0 else "unknown"
        print(f"Fetched comments page {page}: {len(comments)}/{total_label}", flush=True)
        # WordPress.com can report found=-1 for this older mapped site. A
        # short/empty page is therefore the reliable completion signal.
        if len(batch) < 100:
            break
        page += 1
        time.sleep(0.15)
    return comments


def normalize_legacy_url(value):
    parsed = urllib.parse.urlsplit(html.unescape(value or ""))
    host = (parsed.hostname or "").lower()
    if host not in {"dmcommunity.org", "www.dmcommunity.org", "dmcommunity.wordpress.com"}:
        return None
    path = re.sub(r"/+", "/", parsed.path)
    return path.rstrip("/") + "/"


def clean_title(value):
    value = html.unescape(value or "").strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
        value = value[1:-1]
    return " ".join(value.replace('\\"', '"').split()).casefold()


def load_legacy_indexes(news_dir):
    routes = {}
    title_candidates = {}
    for path in news_dir.glob("*.md"):
        if path.name == "README.md":
            continue
        text = path.read_text(encoding="utf-8")
        match = LEGACY_PATH_RE.search(text)
        if match:
            routes[match.group(1)] = path.stem
        title_match = TITLE_RE.search(text)
        if title_match:
            title = clean_title(title_match.group(1))
            title_candidates.setdefault(title, []).append(path.stem)
    unique_titles = {title: ids[0] for title, ids in title_candidates.items() if len(ids) == 1}
    return routes, unique_titles


def comment_text(comment):
    raw = comment.get("raw_content")
    if raw:
        parser = CommentTextParser()
        parser.feed(raw)
        parser.close()
        return parser.text()
    parser = CommentTextParser()
    parser.feed(comment.get("content") or "")
    parser.close()
    return parser.text()


def parent_id(comment):
    parent = comment.get("parent")
    if isinstance(parent, dict):
        return int(parent.get("ID") or 0)
    return int(parent or 0) if isinstance(parent, (int, str)) else 0


def author_name(comment):
    author = comment.get("author")
    if isinstance(author, dict):
        value = author.get("name") or author.get("login")
    else:
        value = None
    return html.unescape(value or "Anonymous").strip() or "Anonymous"


def comment_news_id(comment, routes, titles):
    # First try the original permalink. WordPress.com occasionally keeps an
    # older slug here even after the visible site redirects to a newer one.
    legacy_path = normalize_legacy_url(comment.get("URL"))
    if legacy_path in routes:
        return routes[legacy_path], "path"

    # The comment payload also carries a compact post reference with the
    # original post title. Use that only when the migrated title is unique.
    post = comment.get("post")
    if isinstance(post, dict):
        title = clean_title(post.get("title"))
        if title in titles:
            return titles[title], "title"
    return None, None


def main():
    parser = argparse.ArgumentParser(description="Archive approved WordPress comments for migrated News posts.")
    parser.add_argument("repo", type=pathlib.Path)
    args = parser.parse_args()

    news_dir = args.repo / "src" / "content" / "news"
    routes, titles = load_legacy_indexes(news_dir)
    if not routes:
        raise SystemExit(f"No legacyPath entries found in {news_dir}")

    comments = fetch_comments()

    archived = {}
    unmatched = 0
    skipped_empty = 0
    matched_by_path = 0
    matched_by_title = 0
    unmatched_examples = []
    for comment in comments:
        news_id, match_kind = comment_news_id(comment, routes, titles)
        if not news_id:
            unmatched += 1
            if len(unmatched_examples) < 5:
                post = comment.get("post") if isinstance(comment.get("post"), dict) else {}
                unmatched_examples.append(
                    {
                        "comment_id": comment.get("ID"),
                        "url": comment.get("URL"),
                        "post_title": post.get("title"),
                    }
                )
            continue
        if match_kind == "path":
            matched_by_path += 1
        else:
            matched_by_title += 1
        content = comment_text(comment)
        if not content:
            skipped_empty += 1
            continue
        archived.setdefault(news_id, []).append(
            {
                "id": int(comment["ID"]),
                "parent": parent_id(comment),
                "author": author_name(comment),
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
                "wordpress_comments": len(comments),
                "archived_comments": archived_count,
                "news_posts_with_comments": len(archived),
                "matched_by_path": matched_by_path,
                "matched_by_title": matched_by_title,
                "unmatched_comments": unmatched,
                "skipped_empty_comments": skipped_empty,
                "unmatched_examples": unmatched_examples,
                "generated_at": dt.datetime.now(dt.timezone.utc).isoformat(),
                "output": str(output),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
