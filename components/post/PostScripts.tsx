"use client";
import { useEffect } from "react";

// Replicates the vanilla JS from the handoff post: scroll progress bar,
// reading-progress bubble, TOC scroll-spy, code copy buttons, reaction stack
// with confetti burst. Operates on the server-rendered DOM directly.
export default function PostScripts() {
  useEffect(() => {
    // Dress rehype-pretty-code figures (MDX posts) as cream-cartoon code
    // stickers: add .codeblock, a traffic-dots filebar, and a copy button
    // matching the bespoke post's markup so PostScripts can wire it below.
    document.querySelectorAll("figure[data-rehype-pretty-code-figure]").forEach((fig) => {
      if (fig.classList.contains("codeblock")) return;
      fig.classList.add("codeblock");
      const cap = fig.querySelector("[data-rehype-pretty-code-title]");
      if (cap && !cap.querySelector(".dots")) {
        cap.classList.add("filebar");
        const dots = document.createElement("span");
        dots.className = "dots";
        dots.innerHTML = "<i></i><i></i><i></i>";
        cap.insertBefore(dots, cap.firstChild);
      }
      if (!fig.querySelector(".copy")) {
        const btn = document.createElement("button");
        btn.className = "copy";
        btn.setAttribute("data-copy", "");
        btn.textContent = "Copy";
        fig.appendChild(btn);
      }
    });

    const progress = document.getElementById("progress");
    const ring = document.getElementById("read-ring");
    const pctEl = document.getElementById("read-pct");
    const RING_CIRC = 2 * Math.PI * 32;
    if (ring) ring.setAttribute("stroke-dasharray", RING_CIRC.toFixed(2));

    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      const ratio = scrollable > 0 ? h.scrollTop / scrollable : 0;
      const pct = Math.max(0, Math.min(100, ratio * 100));
      if (progress) progress.style.width = pct + "%";
      if (ring) ring.setAttribute("stroke-dashoffset", (RING_CIRC * (1 - ratio)).toFixed(2));
      if (pctEl) pctEl.textContent = String(Math.round(pct));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // reaction stack
    function spawnBurst(btn: Element) {
      const r = btn.getBoundingClientRect();
      for (let i = 0; i < 6; i++) {
        const s = document.createElement("span");
        s.style.cssText = `position:fixed; left:${r.left + r.width / 2}px; top:${r.top + r.height / 2}px;
          width:6px; height:6px; border-radius:50%;
          background: ${["var(--coral)", "var(--sun)", "var(--sky)", "var(--mint)"][i % 4]};
          border: 1.5px solid var(--ink);
          pointer-events:none; z-index: 200;
          transition: transform .55s cubic-bezier(.34,1.56,.64,1), opacity .55s ease-out;`;
        document.body.appendChild(s);
        const a = (Math.PI * 2 * i) / 6 + Math.random() * 0.5;
        const d = 28 + Math.random() * 14;
        requestAnimationFrame(() => {
          s.style.transform = `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px) scale(.4)`;
          s.style.opacity = "0";
        });
        setTimeout(() => s.remove(), 600);
      }
    }
    const reactHandlers: Array<[Element, () => void]> = [];
    document.querySelectorAll(".react").forEach((btn) => {
      const handler = () => {
        const el = btn as HTMLElement;
        const kind = el.dataset.react;
        const count = btn.querySelector(".count");
        if (kind === "heart" || kind === "save") {
          const on = el.dataset.on === "1";
          el.dataset.on = on ? "0" : "1";
          el.setAttribute("aria-pressed", on ? "false" : "true");
          if (count) {
            const n = parseInt((count.textContent || "").replace(/\D/g, ""), 10) || 0;
            count.textContent = String(on ? n - 1 : n + 1);
          }
        }
        spawnBurst(btn);
      };
      btn.addEventListener("click", handler);
      reactHandlers.push([btn, handler]);
    });

    // TOC scroll-spy
    const tocLinks = document.querySelectorAll<HTMLAnchorElement>(".toc a");
    const headings = [...document.querySelectorAll(".prose h2[id]")];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (!visible.length) return;
        const id = visible[0].target.id;
        tocLinks.forEach((a) => (a.dataset.active = a.getAttribute("href") === "#" + id ? "1" : "0"));
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    headings.forEach((h) => io.observe(h));

    // copy buttons
    const copyHandlers: Array<[Element, () => void]> = [];
    document.querySelectorAll(".copy[data-copy]").forEach((btn) => {
      const handler = async () => {
        const pre = btn.parentElement?.querySelector("pre");
        const text = (pre as HTMLElement)?.innerText || "";
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const t = document.createElement("textarea");
          t.value = text;
          document.body.appendChild(t);
          t.select();
          document.execCommand("copy");
          t.remove();
        }
        const orig = btn.textContent;
        btn.textContent = "copied!";
        (btn as HTMLElement).dataset.ok = "1";
        setTimeout(() => {
          btn.textContent = orig;
          (btn as HTMLElement).dataset.ok = "0";
        }, 1400);
      };
      btn.addEventListener("click", handler);
      copyHandlers.push([btn, handler]);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      reactHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
      copyHandlers.forEach(([el, h]) => el.removeEventListener("click", h));
    };
  }, []);

  return null;
}
