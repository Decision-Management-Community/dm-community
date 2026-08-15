import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const mediaDirectory = join(root, 'public', 'news-media');
if (!existsSync(mediaDirectory) || readdirSync(mediaDirectory).length === 0) {
  const archiveDirectory = join(root, 'archives', 'news-media');
  const archives = readdirSync(archiveDirectory)
    .filter((name) => name.endsWith('.tar.gz'))
    .sort();
  if (!archives.length) throw new Error(`No news media archives found in ${archiveDirectory}`);
  mkdirSync(join(root, 'public'), { recursive: true });
  for (const archive of archives) {
    const result = spawnSync('tar', ['-xzf', join(archiveDirectory, archive), '-C', join(root, 'public')], {
      stdio: 'inherit',
    });
    if (result.status !== 0) throw new Error(`Failed to extract ${archive}`);
  }
  console.log(`Extracted ${archives.length} news media archives.`);
}
