import React from "react";

// Custom components authors can use inside .mdx posts. Plain HTML elements
// (h2/p/ul/code/pre) are styled by .prose in post.css; block code is
// transformed + highlighted by rehype-pretty-code and styled there too.

// Section doodles for the flagship post's H2s (keyed by name).
const H2_DOODLES: Record<string, React.ReactNode> = {
  star: (
    <svg viewBox="0 0 32 32">
      <path d="M16 2 L19 13 L30 16 L19 19 L16 30 L13 19 L2 16 L13 13 Z" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2.5" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 46 46">
      <circle cx="23" cy="23" r="14" fill="var(--sky)" stroke="var(--ink)" strokeWidth="2.5" />
      <circle cx="23" cy="23" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="23" cy="23" r="2" fill="var(--ink)" />
    </svg>
  ),
  docs: (
    <svg viewBox="0 0 48 48" style={{ overflow: "visible" }}>
      <rect x="6" y="14" width="22" height="22" rx="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
      <rect x="20" y="6" width="22" height="22" rx="3" fill="var(--mint)" stroke="var(--ink)" strokeWidth="2.5" />
      <path d="M22 18 h14 M22 23 h10 M22 28 h12" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  redis: (
    <svg viewBox="0 0 46 46" style={{ overflow: "visible" }}>
      <ellipse cx="23" cy="13" rx="14" ry="5" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2.5" />
      <path d="M9 13 V 28 C 9 31, 16 33, 23 33 C 30 33, 37 31, 37 28 V 13" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2.5" />
      <path d="M9 22 C 9 24, 16 26, 23 26 C 30 26, 37 24, 37 22" fill="none" stroke="var(--ink)" strokeWidth="1.8" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 50 50" style={{ overflow: "visible" }}>
      <path d="M6 25 H 40" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 15 L 42 25 L 30 35" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="25" r="5" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2" />
    </svg>
  ),
  bigstar: (
    <svg viewBox="0 0 48 48" style={{ overflow: "visible" }}>
      <path d="M24 4 L29 18 L44 19 L33 29 L37 44 L24 36 L11 44 L15 29 L4 19 L19 18 Z" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="3" fill="var(--ink)" />
    </svg>
  ),
};

const DOODLE_ANIM: Record<string, string> = {
  star: "wiggle",
  target: "pulse-soft",
  docs: "drift",
  redis: "hop",
  arrow: "sway",
  bigstar: "bob-y",
};

export const mdxComponents = {
  // Numbered section heading with optional margin doodle (flagship post).
  H2: ({ id, n, doodle, children }: { id: string; n?: string; doodle?: string; children: React.ReactNode }) => (
    <h2 id={id} data-n={n}>
      {children}
      {doodle && H2_DOODLES[doodle] && (
        <span className={`h2-doodle ${DOODLE_ANIM[doodle] || ""}`} aria-hidden="true">
          {H2_DOODLES[doodle]}
        </span>
      )}
    </h2>
  ),

  // Before / Result / After cover stat card.
  Cover: ({
    before,
    beforeSub,
    result,
    resultSub,
    after,
    afterSub,
  }: {
    before: string;
    beforeSub: string;
    result: string;
    resultSub: string;
    after: string;
    afterSub: string;
  }) => (
    <div className="cover-wrap" style={{ padding: 0, marginTop: "1.6em", marginBottom: "1.6em" }}>
      <div className="cover">
        <div className="cover-decor">
          <svg width="32" height="32" viewBox="0 0 20 20">
            <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill="var(--ink)" />
          </svg>
        </div>
        <div className="col">
          <div className="lbl">Before</div>
          <div className="val" style={{ color: "var(--ink-soft)" }}>{before}</div>
          <div className="sub">{beforeSub}</div>
        </div>
        <div className="col" style={{ textAlign: "center" }}>
          <div className="lbl">Result</div>
          <div className="val" style={{ color: "var(--coral)", fontSize: 38 }}>{result}</div>
          <div className="sub">{resultSub}</div>
        </div>
        <div className="col" style={{ textAlign: "right" }}>
          <div className="lbl">After</div>
          <div className="val">{after}</div>
          <div className="sub">{afterSub}</div>
        </div>
      </div>
    </div>
  ),

  // Two-panel before/after comparison.
  Compare: ({ children }: { children: React.ReactNode }) => <div className="compare">{children}</div>,
  CompareCol: ({ label, title, children }: { label: string; title: string; children: React.ReactNode }) => (
    <div>
      <div className="lbl">{label}</div>
      <h4>{title}</h4>
      {children}
    </div>
  ),
  CRow: ({ k, v, hot }: { k: string; v: string; hot?: boolean }) => (
    <div className="row">
      <span>{k}</span>
      {hot ? <b>{v}</b> : <span>{v}</span>}
    </div>
  ),

  Callout: ({
    type = "tip",
    badge = "note",
    children,
  }: {
    type?: "tip" | "warn";
    badge?: string;
    children: React.ReactNode;
  }) => (
    <div className={`callout ${type}`}>
      <span className="badge">{badge}</span>
      <div>{children}</div>
    </div>
  ),

  PullQuote: ({ children }: { children: React.ReactNode }) => (
    <div className="pullquote" style={{ position: "relative" }}>
      <div className="doodle twinkle" style={{ top: -22, right: 30 }}>
        <svg width="28" height="28" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill="var(--coral)" stroke="var(--ink)" strokeWidth="1.4" />
        </svg>
      </div>
      <div className="doodle pulse-soft" style={{ bottom: -16, left: 20 }}>
        <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill="var(--ink)" />
        </svg>
      </div>
      {children}
    </div>
  ),

  StickyNote: ({
    tone = "",
    label = "note",
    tilt,
    max,
    align,
    list,
    children,
  }: {
    tone?: "" | "coral" | "mint" | "paper";
    label?: string;
    tilt?: number;
    max?: number;
    align?: "left" | "right";
    list?: boolean;
    children: React.ReactNode;
  }) => {
    const style: React.CSSProperties = {};
    if (typeof tilt === "number") style.transform = `rotate(${tilt}deg)`;
    if (max) style.maxWidth = max;
    if (align === "right") style.marginLeft = "auto";
    return (
      <aside className={`sticky-note ${tone}`} style={style}>
        <span className="tape" />
        <div className="lbl">{label}</div>
        {list ? children : <div className="body">{children}</div>}
      </aside>
    );
  },
};
