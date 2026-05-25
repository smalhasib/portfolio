// Server-only: reads MDX posts from content/posts + the one bespoke
// hand-built post (cutting-rag-latency-70, rendered as injected HTML).
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // display form, e.g. "2026.04.18"
  read: string;
  tags: string[];
  excerpt: string;
  numbered?: boolean; // false => manual <H2 n=…> eyebrows instead of auto-counter
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const toTime = (d: string) => Number(d.replace(/\./g, ""));

export function getMdxSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getMdxSource(slug: string): { content: string; data: PostMeta } | null {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { content, data } = matter(raw);
  return { content, data: { slug, ...(data as Omit<PostMeta, "slug">) } };
}

export function getAllPosts(): PostMeta[] {
  const mdx = getMdxSlugs().map((slug) => getMdxSource(slug)!.data);
  return mdx.sort((a, b) => toTime(b.date) - toTime(a.date));
}

export function getPostMeta(slug: string): PostMeta | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

// Build a simple TOC from `## ` headings and <H2 id="…">…</H2> components.
export function getToc(content: string): { id: string; text: string }[] {
  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  const out: { id: string; text: string }[] = [];
  for (const l of content.split("\n")) {
    const h2 = l.match(/^<H2[^>]*\bid="([^"]+)"[^>]*>([^<]+)/);
    if (h2) {
      out.push({ id: h2[1], text: h2[2].trim() });
      continue;
    }
    if (/^##\s+/.test(l)) {
      const text = l.replace(/^##\s+/, "").trim();
      out.push({ id: slugify(text), text });
    }
  }
  return out;
}
