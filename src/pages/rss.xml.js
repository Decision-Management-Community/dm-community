import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const [challenges, qa, minicamps, vendorNews, news] = await Promise.all([
    getCollection('challenges'),
    getCollection('qa'),
    getCollection('minicamps'),
    getCollection('vendorNews'),
    getCollection('news'),
  ]);

  const items = [
    ...challenges.map((c) => ({
      title: `Challenge: ${c.data.title}`,
      pubDate: c.data.date,
      link: `/challenges/${c.id}/`,
      categories: ['Challenge', ...c.data.tags],
    })),
    ...qa.map((q) => ({
      title: `Q&A: ${q.data.title}`,
      pubDate: q.data.date,
      link: `/qa/${q.id}/`,
      categories: ['Q&A', q.data.category],
    })),
    ...minicamps.map((m) => ({
      title: `MiniCamp: ${m.data.title}`,
      pubDate: m.data.date,
      link: `/decisioncamp/minicamps/`,
      categories: ['MiniCamp'],
    })),
    ...vendorNews.map((v) => ({
      title: `Vendor's Corner: ${v.data.title}`,
      pubDate: v.data.date,
      link: `/vendors-corner/`,
      categories: ["Vendor's Corner", v.data.vendor],
    })),
    ...news.map((n) => ({
      title: `News: ${n.data.title}`,
      pubDate: n.data.date,
      link: `/news/${n.id}/`,
      categories: ['News', ...n.data.tags],
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Decision Management Community',
    description: 'New Challenges, Q&A threads, News, and MiniCamp sessions from the Decision Management Community.',
    site: context.site,
    items,
  });
}
