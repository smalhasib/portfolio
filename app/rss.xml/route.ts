import { getAllPosts } from "@/lib/posts";

const SITE = "https://smalhasib.com";

function rfc822(date: string) {
  // "2026.04.18" -> Date
  const [y, m, d] = date.split(".").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toUTCString();
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = getAllPosts();
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/writing/${p.slug}</link>
      <guid>${SITE}/writing/${p.slug}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${esc(p.excerpt)}</description>
      ${p.tags.map((t) => `<category>${esc(t)}</category>`).join("")}
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>S M Al Hasib — Writing</title>
    <link>${SITE}/#writing</link>
    <description>Software engineering and other miscellaneous, by S M Al Hasib.</description>
    <language>en</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
