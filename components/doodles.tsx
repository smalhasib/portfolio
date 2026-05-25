// Doodle library — inline SVG primitives ported from the handoff (mascot.jsx).
import React from "react";

export function Star({
  size = 28,
  color = "var(--sun)",
  spin = true,
}: {
  size?: number;
  color?: string;
  spin?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={spin ? "twinkle" : ""}
      style={{ display: "inline-block", overflow: "visible" }}
      aria-hidden="true"
    >
      <path
        d="M16 2 L19 13 L30 16 L19 19 L16 30 L13 19 L2 16 L13 13 Z"
        fill={color}
        stroke="#241F1B"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ size = 14, color = "var(--ink)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className="twinkle" aria-hidden="true">
      <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill={color} />
    </svg>
  );
}

export function Squiggle({ width = 70, color = "var(--ink)" }: { width?: number; color?: string }) {
  return (
    <svg width={width} height="14" viewBox="0 0 70 14" aria-hidden="true">
      <path
        d="M2 7 Q 10 -2, 18 7 T 34 7 T 50 7 T 68 7"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HandArrow({
  width = 80,
  color = "var(--ink)",
  rotate = 0,
}: {
  width?: number;
  color?: string;
  rotate?: number;
}) {
  return (
    <svg
      width={width}
      height="46"
      viewBox="0 0 90 50"
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M4 30 C 20 8, 40 6, 60 18 C 68 23, 74 30, 80 38"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M80 38 L 70 36 M80 38 L 76 28"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SquiggleUnderline() {
  return (
    <svg viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true">
      <path d="M3 11 Q 25 1, 50 11 T 100 11 T 150 11 T 200 11 T 250 11 T 297 11" />
    </svg>
  );
}
