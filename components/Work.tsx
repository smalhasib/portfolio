"use client";
import React, { useState } from "react";
import { Squiggle } from "./doodles";
import { WORK } from "@/lib/data";

const rots = ["-1.5deg", "1.2deg", "-.8deg"];

export default function Work() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="work">
      <div className="wrap">
        <div className="row" style={{ marginBottom: 22, gap: 18, position: "relative" }}>
          <span className="eyebrow">02 · Work</span>
          <div className="doodle wiggle" style={{ position: "relative", display: "inline-block" }}>
            <Squiggle width={50} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 34 }}>
          <h2>Things I&apos;ve shipped.</h2>
          <span className="mono" style={{ color: "var(--fg-soft)", fontSize: 13 }}>
            tap a card to peek inside ↓
          </span>
        </div>

        <div className="grid" style={{ gap: 26 }}>
          {WORK.map((w, i) => {
            const isOpen = open === w.id;
            return (
              <div
                key={w.id}
                className="work-card pop-in"
                data-open={isOpen ? "1" : "0"}
                style={{ ["--rot" as string]: rots[i % rots.length], transform: `rotate(${rots[i % rots.length]})`, animationDelay: `${i * 0.08}s` } as React.CSSProperties}
                onClick={() => setOpen(isOpen ? null : w.id)}
              >
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 22, alignItems: "center" }}>
                  <div className="mono" style={{ fontSize: 38, fontWeight: 500, color: "var(--fg-soft)", lineHeight: 1 }}>
                    {w.n}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                      <h3 className="fredoka" style={{ fontSize: 30, fontWeight: 700 }}>
                        {w.name}
                      </h3>
                      <span className="pill pill--tag" style={{ background: w.color, color: "#1a1411" }}>
                        {w.outcome}
                      </span>
                    </div>
                    <p style={{ color: "var(--fg-soft)", marginTop: 8, maxWidth: 700 }}>{w.blurb}</p>
                    <div className="row" style={{ flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                      {w.stack.map((s) => (
                        <span key={s} className="pill pill--tag">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                    <span className="mono" style={{ fontSize: 12, color: "var(--fg-soft)" }}>
                      {w.year}
                    </span>
                    <span className="chev" data-open={isOpen ? "1" : "0"}>
                      <svg width="22" height="22" viewBox="0 0 22 22">
                        <path d="M5 8 L 11 14 L 17 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>

                {isOpen && (
                  <div style={{ marginTop: 24, paddingTop: 22, borderTop: "3px dashed var(--ink)" }} onClick={(e) => e.stopPropagation()}>
                    <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
                      <div>
                        <div className="eyebrow" style={{ marginBottom: 10 }}>
                          Problem
                        </div>
                        <p style={{ color: "var(--fg)" }}>{w.problem}</p>
                      </div>
                      <div>
                        <div className="eyebrow" style={{ marginBottom: 10 }}>
                          Approach
                        </div>
                        <p style={{ color: "var(--fg)" }}>{w.approach}</p>
                      </div>
                      <div>
                        <div className="eyebrow" style={{ marginBottom: 10 }}>
                          Outcome
                        </div>
                        <div className="stack" style={{ gap: 10 }}>
                          {w.outcomeBlocks.map(([n, l], j) => (
                            <div key={j} className="sticker" style={{ padding: "10px 14px", borderRadius: 12, boxShadow: "4px 4px 0 var(--ink)" }}>
                              <div className="fredoka" style={{ fontSize: 22, fontWeight: 700, color: w.color, lineHeight: 1 }}>
                                {n}
                              </div>
                              <div style={{ fontSize: 13, color: "var(--fg-soft)", marginTop: 4 }}>{l}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
