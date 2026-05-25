import React from "react";
import Link from "next/link";
import { Star } from "./doodles";
import { getAllPosts } from "@/lib/posts";

const tagColor = ["var(--sun)", "var(--sky)", "var(--mint)"];

export default function Writing() {
  const POSTS = getAllPosts().slice(0, 3);
  return (
    <section id="writing">
      <div className="wrap">
        <div className="row" style={{ marginBottom: 22, gap: 18 }}>
          <span className="eyebrow">04 · Writing</span>
          <Star size={22} color="var(--coral)" />
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 34 }}>
          <h2>Recent posts.</h2>
          <span className="mono" style={{ color: "var(--fg-soft)", fontSize: 13, textDecoration: "underline", textDecorationStyle: "wavy" }}>
            all posts →
          </span>
        </div>

        <div className="grid" style={{ gap: 22 }}>
          {POSTS.map((p, i) => {
            const Card = (
              <div style={{ display: "grid", gridTemplateColumns: "180px 1fr auto", gap: 24, alignItems: "start" }}>
                <div>
                  <div className="mono" style={{ fontSize: 13, color: "var(--fg-soft)" }}>
                    {p.date}
                  </div>
                  <div className="mono" style={{ fontSize: 12, color: "var(--fg-soft)", marginTop: 6 }}>
                    · {p.read}
                  </div>
                </div>
                <div>
                  <h3 className="fredoka" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.15, marginBottom: 8, textWrap: "balance" }}>
                    {p.title}
                  </h3>
                  <p style={{ color: "var(--fg-soft)", marginBottom: 14 }}>{p.excerpt}</p>
                  <div className="row" style={{ flexWrap: "wrap", gap: 8 }}>
                    {p.tags.map((t) => (
                      <span key={t} className="pill pill--tag" style={{ background: tagColor[i] ?? "var(--mint)", color: "#1a1411" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ alignSelf: "center", color: "var(--fg-soft)" }}>
                  <svg width="22" height="22" viewBox="0 0 22 22">
                    <path d="M5 11 H 17 M12 5 L 18 11 L 12 17" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            );
            return (
              <Link key={p.slug} href={`/writing/${p.slug}`} className="write-card pop-in" style={{ animationDelay: `${i * 0.06}s`, display: "block", textDecoration: "none" }}>
                {Card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
