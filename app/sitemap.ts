import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const SITE = "https://smalhasib.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => {
    const [y, m, d] = p.date.split(".").map(Number);
    return {
      url: `${SITE}/writing/${p.slug}`,
      lastModified: new Date(Date.UTC(y, m - 1, d)),
    };
  });
  return [{ url: SITE, lastModified: new Date() }, ...posts];
}
