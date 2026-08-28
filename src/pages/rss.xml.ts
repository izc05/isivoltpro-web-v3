import { v3BlogPosts } from '../data/v3-blog';

export const prerender = true;

const SITE_ORIGIN = 'https://isivoltpro.com';

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const toRfc822 = (value: string) => new Date(`${value}T12:00:00Z`).toUTCString();

export function GET() {
  const posts = v3BlogPosts
    .filter((post) => post.status === 'published')
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const latest = posts[0]?.updatedAt ?? '2026-08-26';
  const items = posts
    .map((post) => {
      const url = `${SITE_ORIGIN}/blog/${post.slug}/`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <author>${escapeXml(post.author)}</author>
      <pubDate>${toRfc822(post.publishedAt)}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>IsiVoltPro · Blog y noticias</title>
    <link>${SITE_ORIGIN}/blog/</link>
    <description>Mantenimiento, operativa, activos, digitalización y actualidad técnica útil para equipos de mantenimiento.</description>
    <language>es-ES</language>
    <lastBuildDate>${toRfc822(latest)}</lastBuildDate>
    <generator>IsiVoltPro Web V3</generator>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
