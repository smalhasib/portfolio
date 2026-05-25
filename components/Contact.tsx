import React from "react";
import { SquiggleUnderline } from "./doodles";

type Link = { label: string; value: string; href: string; color: string; icon: React.ReactNode };

const LINKS: Link[] = [
  {
    label: "email",
    value: "alhasibsm@gmail.com",
    href: "mailto:alhasibsm@gmail.com",
    color: "var(--coral)",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <rect x="2.5" y="5" width="19" height="14" rx="2" fill="#fff" stroke="#241F1B" strokeWidth="2" />
        <path d="M3 6.5 L 12 13 L 21 6.5" fill="none" stroke="#241F1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 6.5 L 12 13 L 21 6.5 L 21 7.8 L 12 14.3 L 3 7.8 Z" fill="#EA4335" />
      </svg>
    ),
  },
  {
    label: "github",
    value: "@smalhasib",
    href: "https://github.com/smalhasib",
    color: "var(--ink)",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M12 1.5 C 6.2 1.5, 1.5 6.3, 1.5 12.2 C 1.5 16.9, 4.5 20.9, 8.7 22.3 C 9.2 22.4, 9.4 22.1, 9.4 21.8 C 9.4 21.5, 9.4 20.8, 9.4 19.9 C 6.5 20.5, 5.9 18.5, 5.9 18.5 C 5.4 17.3, 4.7 17, 4.7 17 C 3.7 16.3, 4.8 16.3, 4.8 16.3 C 5.9 16.4, 6.5 17.4, 6.5 17.4 C 7.5 19.2, 9.2 18.7, 9.5 18.4 C 9.6 17.7, 9.9 17.2, 10.2 17 C 7.9 16.7, 5.5 15.8, 5.5 11.8 C 5.5 10.6, 5.9 9.7, 6.5 8.9 C 6.4 8.7, 6 7.6, 6.6 6.2 C 6.6 6.2, 7.5 5.9, 9.4 7.2 C 10.3 7, 11.2 6.9, 12 6.9 C 12.8 6.9, 13.7 7, 14.6 7.2 C 16.5 5.9, 17.4 6.2, 17.4 6.2 C 18 7.6, 17.6 8.7, 17.5 8.9 C 18.2 9.7, 18.5 10.6, 18.5 11.8 C 18.5 15.8, 16.1 16.7, 13.8 17 C 14.2 17.3, 14.5 17.9, 14.5 18.9 C 14.5 20.3, 14.5 21.4, 14.5 21.8 C 14.5 22.1, 14.7 22.4, 15.3 22.3 C 19.5 20.9, 22.5 16.9, 22.5 12.2 C 22.5 6.3, 17.8 1.5, 12 1.5 Z" fill="#241F1B" />
      </svg>
    ),
  },
  {
    label: "linkedin",
    value: "S M Al Hasib",
    href: "https://www.linkedin.com/in/smalhasib/",
    color: "var(--sky)",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="3" fill="#0A66C2" stroke="#241F1B" strokeWidth="1.5" />
        <rect x="5.5" y="9.5" width="3" height="9" fill="#fff" />
        <circle cx="7" cy="6.8" r="1.7" fill="#fff" />
        <path d="M11 9.5 H 14 V 11 C 14.5 10, 15.7 9.3, 17 9.3 C 19 9.3, 19.5 10.8, 19.5 12.8 V 18.5 H 16.5 V 13.5 C 16.5 12.5, 16.2 11.8, 15.3 11.8 C 14.3 11.8, 14 12.6, 14 13.5 V 18.5 H 11 Z" fill="#fff" />
      </svg>
    ),
  },
  {
    label: "x",
    value: "@smalhasib",
    href: "https://x.com/smalhasib",
    color: "var(--ink)",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4" fill="#241F1B" stroke="#241F1B" strokeWidth="1.5" />
        <path d="M6.5 6.5 L 11 12 L 6.5 17.5 H 8.2 L 12 13.2 L 15 17.5 H 18 L 13.2 11 L 17.6 6.5 H 15.9 L 12.5 10.4 L 9.5 6.5 Z" fill="#fff" />
      </svg>
    ),
  },
];

const rots = [-1.5, 1, -1, 1.5];

export default function Contact() {
  return (
    <section id="contact" style={{ paddingBottom: 80 }}>
      <div className="wrap">
        <div className="row" style={{ marginBottom: 22, gap: 18 }}>
          <span className="eyebrow">05 · Contact</span>
        </div>
        <h2 className="contact-mega" style={{ marginBottom: 36, textWrap: "balance" }}>
          Let&apos;s build something{" "}
          <span className="squiggle-word" style={{ color: "var(--accent)" }}>
            useful
            <SquiggleUnderline />
          </span>
          .
        </h2>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18, marginBottom: 48 }}>
          {LINKS.map((l, i) => {
            const external = !l.href.startsWith("mailto:");
            return (
              <a
                key={l.label}
                href={l.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="sticker sticker--press"
                style={
                  {
                    padding: "18px 20px",
                    textDecoration: "none",
                    "--rot": `${rots[i]}deg`,
                    transform: `rotate(${rots[i]}deg)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  } as React.CSSProperties
                }
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                    background: "#F7EEDD",
                    border: "2.5px solid #241F1B",
                    borderRadius: 12,
                    boxShadow: "2px 2px 0 #241F1B",
                  }}
                >
                  {l.icon}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div className="mono" style={{ fontSize: 11.5, color: "var(--fg-soft)", textTransform: "uppercase", letterSpacing: ".08em" }}>
                    {l.label}
                  </div>
                  <div
                    className="fredoka"
                    style={{ fontSize: 18, fontWeight: 700, marginTop: 4, color: l.color, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  >
                    {l.value}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="row" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 16, paddingTop: 28, borderTop: "3px dashed var(--ink)" }}>
          <span className="footer-mark">© S M Al Hasib · Sylhet, BD · smalhasib.com</span>
          <span className="footer-mark">made by hand, in cream and ink ✦</span>
        </div>
      </div>
    </section>
  );
}
