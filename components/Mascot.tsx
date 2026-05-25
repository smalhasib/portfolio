"use client";
// Cartoon avatar of Hasib — bowl-cut, round glasses, hugging a laptop.
// Eyes track the cursor; idle bob + blink are CSS-driven. Ported from mascot.jsx.
// TODO: refine character art (placeholder primitives per the brief).
import React, { useEffect, useRef } from "react";

export default function Mascot({ trackMouse = true }: { trackMouse?: boolean }) {
  const leftPupil = useRef<SVGGElement>(null);
  const rightPupil = useRef<SVGGElement>(null);
  const root = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!trackMouse) return;
    const onMove = (e: MouseEvent) => {
      if (!root.current) return;
      const stage = root.current.getBoundingClientRect();
      const cx = stage.left + stage.width / 2;
      const cy = stage.top + stage.height / 2 - 30; // eyes are above center
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const max = 2.4; // px of pupil travel
      const tx = (dx / dist) * Math.min(max, dist / 30);
      const ty = (dy / dist) * Math.min(max, dist / 30);
      leftPupil.current?.setAttribute("transform", `translate(${tx} ${ty})`);
      rightPupil.current?.setAttribute("transform", `translate(${tx} ${ty})`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [trackMouse]);

  return (
    <svg
      ref={root}
      viewBox="0 0 220 240"
      width="100%"
      height="100%"
      className="bob"
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
      aria-label="Cartoon avatar of Hasib"
    >
      {/* hair backshape — fuller, slightly tousled */}
      <path
        d="M48 96 C 42 50, 86 26, 112 28 C 146 30, 178 52, 174 96 L 174 118 L 48 118 Z"
        fill="#1A1612"
        stroke="#1A1612"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* face — warm medium-tan skin */}
      <path
        d="M58 96 C 58 78, 78 64, 110 64 C 142 64, 162 78, 162 96 L 162 134 C 162 156, 142 170, 110 170 C 78 170, 58 156, 58 134 Z"
        fill="#C58E63"
        stroke="#241F1B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* hair front — natural tousled sweep */}
      <path
        d="M60 102 C 66 78, 86 66, 108 70 C 124 73, 136 80, 144 100 C 132 88, 116 86, 100 92 C 88 96, 74 100, 60 102 Z"
        fill="#1A1612"
      />
      <path d="M82 80 Q 88 72, 96 78" fill="none" stroke="#1A1612" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M118 76 Q 126 70, 134 80" fill="none" stroke="#1A1612" strokeWidth="2.5" strokeLinecap="round" />

      {/* ears */}
      <ellipse cx="58" cy="120" rx="6" ry="9" fill="#C58E63" stroke="#241F1B" strokeWidth="3.5" />
      <ellipse cx="162" cy="120" rx="6" ry="9" fill="#C58E63" stroke="#241F1B" strokeWidth="3.5" />

      {/* eyebrows — thicker */}
      <path d="M74 102 q 14 -3 26 1" stroke="#1A1612" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M120 103 q 14 -4 26 -1" stroke="#1A1612" strokeWidth="4.5" fill="none" strokeLinecap="round" />

      {/* rectangular dark glasses */}
      <g>
        <rect x="71" y="110" width="34" height="22" rx="5" fill="#FFFFFF" stroke="#241F1B" strokeWidth="4" />
        <rect x="115" y="110" width="34" height="22" rx="5" fill="#FFFFFF" stroke="#241F1B" strokeWidth="4" />
        <line x1="105" y1="120" x2="115" y2="120" stroke="#241F1B" strokeWidth="4" strokeLinecap="round" />
        <line x1="71" y1="116" x2="60" y2="116" stroke="#241F1B" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="149" y1="116" x2="160" y2="116" stroke="#241F1B" strokeWidth="3.5" strokeLinecap="round" />
        {/* pupils — track cursor */}
        <g ref={leftPupil}>
          <circle cx="88" cy="121" r="3.8" fill="#241F1B" className="blink-eye" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
        </g>
        <g ref={rightPupil}>
          <circle cx="132" cy="121" r="3.8" fill="#241F1B" className="blink-eye" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
        </g>
        {/* glints */}
        <circle cx="84" cy="117" r="1.4" fill="#fff" />
        <circle cx="128" cy="117" r="1.4" fill="#fff" />
      </g>

      {/* nose */}
      <path d="M108 136 q -3 9 -3 14 q 0 3 5 3" fill="none" stroke="#1A1612" strokeWidth="2.8" strokeLinecap="round" />

      {/* beard along jaw + chin */}
      <path
        d="M60 132 C 60 152, 72 170, 92 174 Q 110 178, 128 174 C 148 170, 160 152, 160 132 C 154 154, 138 168, 110 168 C 82 168, 66 154, 60 132 Z"
        fill="#1A1612"
        stroke="#1A1612"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* mustache */}
      <path
        d="M88 156 q 12 5 22 5 q 10 0 22 -5 q -4 8 -22 8 q -18 0 -22 -8 Z"
        fill="#1A1612"
        stroke="#1A1612"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* small lower lip */}
      <path d="M100 165 q 10 3 20 0" fill="none" stroke="#1A1612" strokeWidth="2.5" strokeLinecap="round" />
      {/* beard stipple texture */}
      <g fill="#1A1612" opacity=".85">
        <circle cx="78" cy="150" r="1.2" />
        <circle cx="84" cy="158" r="1.2" />
        <circle cx="92" cy="164" r="1.2" />
        <circle cx="142" cy="150" r="1.2" />
        <circle cx="136" cy="158" r="1.2" />
        <circle cx="128" cy="164" r="1.2" />
      </g>

      {/* neck */}
      <rect x="100" y="170" width="20" height="12" fill="#C58E63" stroke="#241F1B" strokeWidth="3.5" />

      {/* shoulders — orange blazer */}
      <path
        d="M40 240 C 40 200, 78 180, 110 180 C 142 180, 180 200, 180 240 Z"
        fill="#F58A3D"
        stroke="#241F1B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* shirt v-neck (dark) */}
      <path d="M94 182 L 110 200 L 126 182 L 126 198 L 110 212 L 94 198 Z" fill="#161311" stroke="#241F1B" strokeWidth="3" strokeLinejoin="round" />
      {/* lapels */}
      <path d="M88 200 L 104 196 L 100 226" fill="none" stroke="#1A1612" strokeWidth="3" strokeLinejoin="round" />
      <path d="M132 200 L 116 196 L 120 226" fill="none" stroke="#1A1612" strokeWidth="3" strokeLinejoin="round" />
      {/* coral pocket-square */}
      <path d="M148 212 L 158 210 L 158 220 L 148 222 Z" fill="#FF6B5E" stroke="#241F1B" strokeWidth="2" />

      {/* laptop hugged in front */}
      <g>
        <rect x="62" y="208" width="96" height="28" rx="3" fill="#FFFFFF" stroke="#241F1B" strokeWidth="4" />
        <rect x="68" y="214" width="84" height="14" rx="2" fill="#5BB8E6" stroke="#241F1B" strokeWidth="3" />
        <line x1="72" y1="218" x2="86" y2="218" stroke="#241F1B" strokeWidth="2" />
        <line x1="90" y1="218" x2="100" y2="218" stroke="#241F1B" strokeWidth="2" />
        <line x1="72" y1="222" x2="96" y2="222" stroke="#241F1B" strokeWidth="2" />
        <line x1="100" y1="222" x2="116" y2="222" stroke="#241F1B" strokeWidth="2" />
        <path d="M52 222 C 56 210, 62 206, 70 208 L 70 234 C 60 234, 52 232, 52 222 Z" fill="#F58A3D" stroke="#241F1B" strokeWidth="4" strokeLinejoin="round" />
        <path d="M168 222 C 164 210, 158 206, 150 208 L 150 234 C 160 234, 168 232, 168 222 Z" fill="#F58A3D" stroke="#241F1B" strokeWidth="4" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
