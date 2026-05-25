import React from "react";
import { EXPERIENCE, SKILL_GROUPS, COMMUNITY, CV_HREF } from "@/lib/data";

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="row" style={{ marginBottom: 22, gap: 18 }}>
          <span className="eyebrow">03 · About</span>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "1.1fr .9fr", gap: 56, alignItems: "start" }}>
          <div>
            <h2 style={{ marginBottom: 22 }}>The short version.</h2>
            <p style={{ marginBottom: 16, fontSize: 18 }}>
              I&apos;m a results-driven software engineer with 3+ years of experience. I moved from mobile development into
              architecting enterprise-grade AI solutions, and in 2025 built and deployed <b>FluentBot</b> — a RAG-based
              customer support agent — owning the full lifecycle.
            </p>
            <p style={{ color: "var(--fg-soft)", marginBottom: 28 }}>
              I&apos;m happiest where retrieval, real-time backends, and CI/CD meet. I like systems that survive 3am pages,
              and I like the small, boring decisions that get them there.
            </p>

            <h3 className="fredoka" style={{ fontSize: 22, fontWeight: 700, marginBottom: 18 }}>
              Experience
            </h3>
            <div className="timeline">
              {EXPERIENCE.map((e, i) => (
                <div key={i} className="tl-row">
                  <div className="tl-date">{e.when}</div>
                  <div className="tl-title">
                    {e.title} <span className="tl-co">· {e.co}</span>
                  </div>
                  <p style={{ color: "var(--fg-soft)", marginTop: 6, maxWidth: 560 }}>{e.body}</p>
                </div>
              ))}
            </div>

            <h3 className="fredoka" style={{ fontSize: 22, fontWeight: 700, margin: "32px 0 16px" }}>
              Community
            </h3>
            <div className="stack" style={{ gap: 10 }}>
              {COMMUNITY.map((c, i) => (
                <div key={i} className="row" style={{ alignItems: "flex-start", gap: 12 }}>
                  <span className="pill pill--tag" style={{ background: "var(--sky)", color: "#1a1411", flexShrink: 0 }}>
                    {c.kind}
                  </span>
                  <span style={{ color: "var(--fg-soft)" }}>{c.what}</span>
                </div>
              ))}
            </div>
          </div>

          <aside>
            <h3 className="fredoka" style={{ fontSize: 22, fontWeight: 700, marginBottom: 18 }}>
              Skills
            </h3>
            <div className="stack" style={{ gap: 18 }}>
              {SKILL_GROUPS.map((g) => (
                <div key={g.name}>
                  <div className="mono" style={{ fontSize: 12, color: "var(--fg-soft)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>
                    {g.name}
                  </div>
                  <div className="row" style={{ flexWrap: "wrap", gap: 7 }}>
                    {g.items.map((it) => (
                      <span key={it} className="pill pill--tag" style={{ fontSize: 12, padding: "3px 9px" }}>
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="sticker edu-card" style={{ marginTop: 28, padding: 22, ["--rot" as string]: "1.5deg", transform: "rotate(1.5deg)", background: "var(--sun)" } as React.CSSProperties}>
              <div className="tape" />
              <div className="mono edu-eyebrow" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em" }}>
                Education
              </div>
              <div className="fredoka edu-title" style={{ fontSize: 20, fontWeight: 700, marginTop: 8, lineHeight: 1.2 }}>
                BSc, Computer Science &amp; Engineering
              </div>
              <div className="edu-school" style={{ marginTop: 4, fontWeight: 700 }}>Shahjalal University of Science &amp; Technology</div>
              <div className="mono edu-meta" style={{ fontSize: 12, marginTop: 6 }}>
                CGPA 3.40 / 4.00 · Jan 2019 — Feb 2024
              </div>
            </div>

            <a className="btn btn--sun" href={CV_HREF} target="_blank" rel="noopener" style={{ marginTop: 24 }}>
              download CV (PDF)
              <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
                <path d="M7 1 V 10 M3 7 L 7 11 L 11 7 M2 14 H 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
