import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createMarkdownProcessor, parseFrontmatter } from '@astrojs/markdown-remark';

const directory = join(process.cwd(), 'src', 'content', 'news');
const files = readdirSync(directory).filter((name) => name.endsWith('.md') && name !== 'README.md');
const processor = await createMarkdownProcessor({ syntaxHighlight: false, smartypants: false });
const paths = new Set();
const ids = new Set();
const errors = [];
let localMediaReferences = 0;
let oldUploadReferences = 0;

for (const name of files) {
  const id = name.slice(0, -3);
  const source = readFileSync(join(directory, name), 'utf8');
  try {
    const frontmatter = parseFrontmatter(source);
    const data = frontmatter.frontmatter;
    if (typeof data.title !== 'string' || !data.title) throw new Error('missing title');
    if (!(data.date instanceof Date) && !/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))) throw new Error('invalid date');
    if (!Array.isArray(data.tags)) throw new Error('tags is not an array');
    if (!/^\/\d{4}\/\d{2}\/\d{2}\/[^/]+\/$/.test(data.legacyPath ?? '')) throw new Error('invalid legacyPath');
    if (paths.has(data.legacyPath)) throw new Error(`duplicate legacyPath ${data.legacyPath}`);
    if (ids.has(id)) throw new Error(`duplicate id ${id}`);
    paths.add(data.legacyPath);
    ids.add(id);
    await processor.render(frontmatter.content, { fileURL: new URL(`file:///${join(directory, name).replaceAll('\\', '/')}`) });

    for (const match of source.matchAll(/\/news-media\/([^\s"'<>]+)/g)) {
      localMediaReferences += 1;
      const relative = decodeURIComponent(match[1].replace(/&amp;.*$/, ''));
      if (!existsSync(join(process.cwd(), 'public', 'news-media', relative))) {
        errors.push(`${name}: missing local media ${relative}`);
      }
    }
    oldUploadReferences += (source.match(/https?:\/\/(?:i[012]\.wp\.com\/)?dmcommunity\.org\/wp-content\/uploads\//g) ?? []).length;
  } catch (error) {
    errors.push(`${name}: ${error.message}`);
  }
}

console.log(JSON.stringify({
  files: files.length,
  uniqueIds: ids.size,
  uniqueLegacyPaths: paths.size,
  localMediaReferences,
  oldUploadReferences,
  errors: errors.slice(0, 100),
  errorCount: errors.length,
}, null, 2));
if (errors.length || files.length !== 1327) process.exitCode = 1;


