"use client";
// Floating sun/moon theme toggle. Persists to localStorage, syncs across tabs,
// and fires a tiny confetti burst. The no-flash initial theme is set by the
// pre-paint script in app/layout.tsx before this mounts.
import React from "react";

function confetti(btn: HTMLElement, dark: boolean) {
  const r = btn.getBoundingClientRect();
  const clrs = ["#FF6B5E", "#FFC53D", "#5BB8E6", "#73C99A"];
  for (let i = 0; i < 6; i++) {
    const s = document.createElement("span");
    s.style.cssText = `position:fixed;left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;width:6px;height:6px;border-radius:50%;background:${clrs[i % 4]};border:1.5px solid ${dark ? "#F4E9D3" : "#241F1B"};pointer-events:none;z-index:200;transition:transform .55s cubic-bezier(.34,1.56,.64,1),opacity .55s ease-out;`;
    document.body.appendChild(s);
    const a = (Math.PI * 2 * i) / 6 + Math.random() * 0.5;
    const d = 30 + Math.random() * 14;
    requestAnimationFrame(() => {
      s.style.transform = `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px) scale(.4)`;
      s.style.opacity = "0";
    });
    setTimeout(() => s.remove(), 600);
  }
}

export default function ThemeToggle() {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== "theme") return;
      document.documentElement.dataset.dark = e.newValue === "dark" ? "1" : "0";
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const dark = root.dataset.dark === "1";
    root.dataset.dark = dark ? "0" : "1";
    try {
      localStorage.setItem("theme", dark ? "light" : "dark");
    } catch {}
    if (ref.current) confetti(ref.current, !dark);
  };

  return (
    <button ref={ref} type="button" className="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle theme" onClick={toggle}>
      <span className="twk twk-1" />
      <span className="twk twk-2" />
      <span className="twk twk-3" />
      <svg className="sun-ico" viewBox="0 0 26 26" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13" cy="13" r="4.5" fill="currentColor" stroke="var(--ink)" />
        <path d="M13 2 V 4.5 M13 21.5 V 24 M2 13 H 4.5 M21.5 13 H 24 M5 5 L 6.8 6.8 M19.2 19.2 L 21 21 M5 21 L 6.8 19.2 M19.2 6.8 L 21 5" stroke="var(--ink)" />
      </svg>
      <svg className="moon-ico" viewBox="0 0 26 26" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16 A 9 9 0 1 1 10 5 A 7 7 0 0 0 21 16 Z" fill="currentColor" />
      </svg>
    </button>
  );
}
