import pathlib
import tarfile


ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "news-media"
DESTINATION = ROOT / "archives" / "news-media"
MAX_RAW_BYTES = 12 * 1024 * 1024


def main():
    files = sorted(path for path in SOURCE.rglob("*") if path.is_file())
    if not files:
        raise SystemExit(f"No media found under {SOURCE}")
    DESTINATION.mkdir(parents=True, exist_ok=True)
    for old in DESTINATION.glob("news-media-*.tar.gz"):
        old.unlink()

    groups = []
    current = []
    current_size = 0
    for path in files:
        size = path.stat().st_size
        if current and current_size + size > MAX_RAW_BYTES:
            groups.append(current)
            current = []
            current_size = 0
        current.append(path)
        current_size += size
    if current:
        groups.append(current)

    for index, group in enumerate(groups, start=1):
        destination = DESTINATION / f"news-media-{index:02d}.tar.gz"
        with tarfile.open(destination, "w:gz") as archive:
            for path in group:
                archive.add(path, arcname=path.relative_to(ROOT / "public"))
        print(f"{destination.name}: {len(group)} files, {destination.stat().st_size / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
