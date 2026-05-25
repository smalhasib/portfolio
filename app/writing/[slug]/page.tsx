import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostMeta, getMdxSource, getToc } from "@/lib/posts";
import { mdxComponents } from "@/components/post/mdx-components";
import PostScripts from "@/components/post/PostScripts";
import "../../post.css";

const tagColor = ["sun", "sky", "mint", "coral"];

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostMeta(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — S M Al Hasib`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

const prettyCodeOptions = {
  theme: "github-dark-default",
  keepBackground: false,
  defaultLang: "plaintext",
};

export default function PostPage({ params }: { params: { slug: string } }) {
  const meta = getPostMeta(params.slug);
  if (!meta) notFound();

  const src = getMdxSource(params.slug);
  if (!src) notFound();
  const toc = getToc(src.content);
  const proseClass = meta.numbered === false ? "prose" : "prose prose-mdx";

  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === params.slug);
  const prev = all[idx + 1]; // older
  const next = all[idx - 1]; // newer

  return (
    <>
      <div className="progress" id="progress" />

      <a className="back-home" href="/" aria-label="Back to homepage">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M10 3 L 5 8 L 10 13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="h">home</span>
        <span className="h-meta" style={{ color: "var(--ink-soft)", fontWeight: 600, fontSize: "12.5px" }}>
          smalhasib.com
        </span>
      </a>

      <article>
        <header>
          <h1 className="title">{meta.title}</h1>
          <div className="meta">
            <span>{meta.date}</span>
            <span className="dot" />
            <span>{meta.read} read</span>
            <span className="dot" />
            <div className="tags">
              {meta.tags.map((t, i) => (
                <span key={t} className={`post-pill ${tagColor[i % tagColor.length]}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="byline">
            <span className="avatar-chip">H</span>
            <div>
              <div>S M Al Hasib</div>
              <div className="by-meta">Lead Engineer, FluentBot · Sylhet, BD</div>
            </div>
          </div>
        </header>

        <div className="layout">
          {toc.length > 0 && (
            <aside className="toc" aria-label="Table of contents">
              <h4>On this page</h4>
              <ol>
                {toc.map((h, i) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} data-active={i === 0 ? "1" : "0"}>
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          )}

          <div className={proseClass}>
            <MDXRemote
              source={src.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions] as never],
                },
              }}
            />
          </div>
        </div>

        <div className="pn-separator" aria-hidden="true">
          <svg viewBox="0 0 480 30" preserveAspectRatio="none">
            <path d="M4 15 Q 30 0, 60 15 T 120 15 T 180 15 T 240 15 T 300 15 T 360 15 T 420 15 T 476 15" />
          </svg>
        </div>

        <nav className="pn" aria-label="Post navigation">
          {prev ? (
            <a href={`/writing/${prev.slug}`} className="prev">
              <div className="dir">← previous</div>
              <div className="ttl">{prev.title}</div>
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a href={`/writing/${next.slug}`} className="next">
              <div className="dir">next →</div>
              <div className="ttl">{next.title}</div>
            </a>
          ) : (
            <span />
          )}
        </nav>

        <div className="rss-tape">
          <div className="inner">
            <span>get the next one →</span>
            <a href="/rss.xml" className="rss-link" title="RSS feed">
              / RSS
            </a>
          </div>
        </div>
      </article>

      <div className="read-bubble" id="read-bubble" aria-hidden="true">
        <svg viewBox="0 0 76 76">
          <circle cx="38" cy="38" r="32" fill="none" stroke="rgba(36,31,27,.12)" strokeWidth="6" />
          <circle id="read-ring" cx="38" cy="38" r="32" fill="none" stroke="var(--coral)" strokeWidth="6" strokeLinecap="round" strokeDasharray="201" strokeDashoffset="201" transform="rotate(-90 38 38)" />
        </svg>
        <div className="lbl">
          <span id="read-pct">0</span>%<small>read</small>
        </div>
      </div>

      <PostScripts />
    </>
  );
}
