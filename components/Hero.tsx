import React from "react";
import Mascot from "./Mascot";
import { Star, Sparkle, SquiggleUnderline } from "./doodles";
import { HEADLINE, SKILLS_HERO, HERO_STATS, CV_HREF } from "@/lib/data";

const statPositions: React.CSSProperties[] = [
  { top: "4%", left: "-12%" },
  { top: "48%", right: "-10%" },
  { bottom: "0%", left: "-8%" },
];
const statRot = ["-9deg", "7deg", "-4deg"];

export default function Hero() {
  const h = HEADLINE;
  return (
    <section id="hero" style={{ paddingTop: 130 }}>
      <div className="wrap">
        <div className="hero-area" data-layout="left">
          <div className="hero-left">
            {/* "hi i'm Hasib" sticker + open to work */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 28,
                position: "relative",
                flexWrap: "wrap",
              }}
            >
              <span
                className="sticker sticker--press"
                style={
                  {
                    "--rot": "-3deg",
                    transform: "rotate(-3deg)",
                    padding: "10px 18px",
                    borderRadius: 999,
                    fontFamily: "var(--font-fredoka),sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    background: "var(--surface)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    whiteSpace: "nowrap",
                  } as React.CSSProperties
                }
              >
                <span style={{ fontSize: 22 }}>👋</span> hi, I&apos;m Hasib
                <Sparkle size={14} color="var(--coral)" />
              </span>
              <span
                className="sticker sticker--press pop-in"
                style={
                  {
                    "--rot": "4deg",
                    transform: "rotate(4deg)",
                    padding: "8px 14px",
                    borderRadius: 999,
                    background: "var(--mint)",
                    fontFamily: "var(--font-nunito),sans-serif",
                    fontWeight: 800,
                    fontSize: 13,
                    color: "#1a1411",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  } as React.CSSProperties
                }
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: "#1d5a3a",
                    boxShadow: "0 0 0 3px #fff, 0 0 0 4.5px #241F1B",
                  }}
                />
                open to work
              </span>
            </div>

            {/* headline */}
            <h1 style={{ fontSize: "clamp(2.6rem, 6.4vw, 4.6rem)", lineHeight: 1.05, marginBottom: 22, textWrap: "balance" }}>
              {h.lead}
              {" "}
              <span className="squiggle-word" style={{ color: "var(--accent)", marginRight: "0.18em" }}>
                {h.pop}
                <SquiggleUnderline />
              </span>
              {" "}
              {h.tail}
            </h1>

            <p style={{ fontSize: 19, maxWidth: 540, color: "var(--fg-soft)", marginBottom: 32 }}>
              Full-stack engineer based in Sylhet, Bangladesh. I architect AI systems end to end — retrieval, infra, the
              chat widget on the page, the deploys at 3am. I care about shipping things that make a number move.
            </p>

            {/* buttons */}
            <div className="hero-buttons row" style={{ flexWrap: "wrap", gap: 14, marginBottom: 36 }}>
              <a className="btn btn--primary" href="#work">
                see my work
                <svg width="20" height="14" viewBox="0 0 28 16" aria-hidden="true">
                  <path d="M2 8 H 22 M16 2 L 24 8 L 16 14" fill="none" stroke="#1a1411" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a className="btn" href={CV_HREF} target="_blank" rel="noopener">
                grab my CV
                <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true">
                  <path d="M7 1 V 10 M3 7 L 7 11 L 11 7 M2 14 H 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* pill row */}
            <div className="pill-row">
              {SKILLS_HERO.map((s, i) => (
                <span
                  key={s}
                  className="pill pill--tag pop-in"
                  style={{ ["--i" as string]: i, animationDelay: `${0.4 + i * 0.05}s` } as React.CSSProperties}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* character + stat stickers */}
          <div className="character-stage" style={{ position: "relative" }}>
            <div className="blob" />
            {/* sparkles around blob (maximal) */}
            <div className="doodle" style={{ top: -14, left: "20%" }}>
              <Star size={28} color="var(--sun)" />
            </div>
            <div className="doodle" style={{ top: "30%", right: -22 }}>
              <Sparkle size={20} color="var(--ink)" />
            </div>
            <div className="doodle" style={{ bottom: 18, right: "10%" }}>
              <Sparkle size={14} color="var(--ink)" />
            </div>
            <div className="doodle doodle--extra" style={{ top: "10%", right: "10%" }}>
              <Sparkle size={12} color="var(--coral)" />
            </div>
            <div className="doodle doodle--extra" style={{ bottom: "32%", left: -16 }}>
              <Star size={20} color="var(--coral)" />
            </div>
            <div className="doodle doodle--extra" style={{ top: "60%", right: "-6%" }}>
              <Sparkle size={16} color="var(--ink)" />
            </div>

            {/* mascot inside blob */}
            <div style={{ position: "absolute", inset: "6%", overflow: "visible" }}>
              <Mascot trackMouse={true} />
            </div>

            {/* stat stickers */}
            {HERO_STATS.map((s, i) => (
              <div
                key={s.num + i}
                className="stat-sticker"
                style={
                  {
                    ...statPositions[i],
                    "--rot": statRot[i],
                    transform: `rotate(${statRot[i]})`,
                    animationDelay: `${0.6 + i * 0.15}s`,
                  } as React.CSSProperties
                }
              >
                <div className="num">{s.num}</div>
                <div className="lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
