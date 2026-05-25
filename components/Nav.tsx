"use client";
import React, { useEffect, useState } from "react";

const ITEMS = [
  { id: "hero", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const els = ITEMS.map((i) => document.getElementById(i.id)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="navwrap">
      <nav className="nav" aria-label="Section navigation">
        {ITEMS.map((it, idx) => (
          <a key={it.id} href={`#${it.id}`} data-active={active === it.id ? "1" : "0"}>
            <span className="num">{String(idx + 1).padStart(2, "0")}</span>
            {it.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
