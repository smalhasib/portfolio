# Portfolio Design Brief — S M Al Hasib

A build brief for an AI design/coding agent. Follow it precisely. Every section is a decision already made — do not re-litigate aesthetic direction; execute it. Where content is missing it is marked `TODO`.

---

## 0. One-paragraph summary

Build a personal portfolio + blog for **S M Al Hasib**, a full-stack/AI software engineer. The look is **cream + cartoon**: a warm cream canvas with a friendly, hand-drawn / illustrated aesthetic — thick black outlines, hard offset shadows, sticker-style UI, doodle decorations (stars, squiggles, arrows), rounded chunky display type, and a cartoon avatar character of Hasib. Playful and personable, but still a serious engineer's site (real metrics, real case studies). Think neo-brutalist-meets-cartoon, not corporate. **Single-page** Next.js app (one scrolling page of anchored sections) with an MDX-powered blog on its own `/writing/[slug]` routes. Locked reference: `v5-cream-cartoon.html`.

---

## 1. Anti-requirements (do NOT do these)

These are hard constraints. Violating them defeats the purpose of the brief.

- ❌ No purple/violet gradient backgrounds or gradient text, no glassmorphism, no neon glow.
- ❌ No default shadcn / generic SaaS-template look, no all-Inter sterile UI.
- ❌ No soft drop-shadows — cartoon shadows are **hard offset** (no blur).
- ❌ No thin/light borders — outlines are **thick (2.5–4px) solid ink**.
- ❌ Don't let "playful" kill credibility: real metrics, real case studies, no lorem, no childish copy.
- ❌ No fade-up-on-scroll applied indiscriminately to every element.

When in doubt, lean toward "handmade, warm, characterful sticker-book" rather than "polished corporate product." But keep the engineering substance front and center.

---

## 2. Tech stack

- **Framework:** Next.js (App Router, latest stable). React Server Components where sensible.
- **Styling:** Tailwind CSS. Define the design tokens below as CSS variables + Tailwind theme extension. No component library defaults imposed on the visual language.
- **Content/blog:** MDX. Use a content layer (e.g. `next-mdx-remote`, `contentlayer`/`velite`, or App Router `mdx` with frontmatter) — pick the most maintainable current option. Posts authored as `.mdx` files in the repo.
- **Code highlighting:** Shiki (build-time), with copy button, line highlighting, optional filename tab.
- **Motion:** Motion (Framer Motion) for component/entrance choreography; the View Transitions API for route changes; Lenis for smooth scroll. **GSAP** allowed for the hero signature sequence if it gives better control.
- **Deploy:** Vercel. Custom domain `smalhasib.com`.
- **Analytics:** Plausible (privacy-friendly, no cookies). Lightweight script only.
- **Package manager / lint:** pnpm, ESLint + Prettier, TypeScript strict.

---

## 3. Design system

### 3.1 Color (cream + bright cartoon palette)

Cream is the canvas. Ink is near-black, used for ALL outlines, text, and hard shadows. Four bright accents rotate across stickers/buttons/highlights — used as solid fills, never gradients.

```
--cream:     #F7EEDD;  /* page background */
--paper:     #FFFFFF;  /* cards, nav, sticker surfaces */
--ink:       #241F1B;  /* text + every outline + every hard shadow */
--ink-soft:  #5A524A;  /* secondary text */

/* accents — solid fills only */
--coral:     #FF6B5E;  /* primary action / highlight */
--sky:       #5BB8E6;  /* secondary */
--sun:       #FFC53D;  /* active nav / emphasis */
--mint:      #73C99A;  /* tertiary / success */
```

Rules:
- Bg texture: cream + a **polka-dot pattern** (`radial-gradient` ink dots, ~26px grid, low opacity), faded out lower on the page.
- Every surface gets a **thick ink outline (2.5–4px)** + a **hard offset shadow** (`box-shadow: Npx Npx 0 var(--ink)`, **no blur**).
- Accents are bold and used freely (this look is *meant* to be colorful) but keep ink + cream dominant so it stays readable.
- **Dark mode:** optional / lower priority. If built, use a warm dark cream-night (`#26211B` bg, cream ink, same accents) — keep the cartoon outlines/shadows. Ship light first.

### 3.2 Typography

- **Display / headings:** `Fredoka` (rounded, chunky, friendly). Weights 500–700. This carries the cartoon personality.
- **Body / UI:** `Nunito` (rounded sans, weights 500–800). Pairs warmly with Fredoka.
- **Monospace (code only):** `JetBrains Mono` — used inside blog code blocks and inline `code`, not for UI labels.
- Self-host fonts (`next/font`), subset, `font-display: swap`.

Usage:
- Big rounded Fredoka for hero, section titles, project names, stat numbers. Confident sizes (~clamp(2.5rem, 6vw, 4.2rem) hero).
- Nunito (bold) for paragraphs, nav, buttons, pills.
- Hand-drawn **squiggle underline** (inline SVG) under key words; coral by default.

### 3.3 Layout & components

- Generous margins; rounded everything (border-radius 14–20px on cards/buttons, 999px on nav + pills + badges).
- **Nav:** a single rounded "pill bar" — white, ink outline, hard shadow; active item = `--sun` filled pill. Numbered nav NOT required (that was the old direction).
- **Buttons:** chunky, ink outline, hard offset shadow, Fredoka label; primary = coral fill, secondary = white.
- **Sticker cards / badges:** white or accent fill, thick outline, hard shadow, slight rotation (±3–8°) for the hand-placed feel. Used for stats, project cards, callouts.
- **Pills/tags:** rounded, ink outline, for skills/tech tags.
- **Doodle decorations:** stars (✦/✧), small hand-drawn arrows, sparkles, squiggles scattered tastefully near headings and the character. Inline SVG preferred over emoji where it matters.
- **Cartoon character / mascot:** an illustrated avatar of Hasib (glasses + laptop, as in v5) sits in the hero inside a colored blob with sparkles. Reuse it smaller as a section accent / 404 / contact. Can be inline SVG or a commissioned illustration set later (mark `TODO: refine character art`).
- Section dividers: wobbly/dashed rules or doodle separators, not flat hairlines.

### 3.4 Motion (bouncy, playful, gated)

All motion **must** be disabled/reduced under `prefers-reduced-motion: reduce`.

- **Springy feel:** use spring easing (Motion) for hovers and entrances — things bounce a little, not linear.
- **Hover:** buttons/stickers "press" (translate toward shadow + shadow shrinks); cards wobble/tilt slightly; pills pop.
- **Hero:** the cartoon character has a subtle idle animation (gentle bob/blink); the squiggle underline draws in on load; stat stickers pop in staggered.
- **Doodles:** sparkles twinkle, small arrows wiggle — subtle, looping, low-frequency.
- **Route changes:** View Transitions API — keep it cohesive and bouncy.
- **Smooth scroll** via Lenis, gentle easing. No scroll-jacking, no forced parallax.
- Custom cursor optional; if used, make it match the playful tone (e.g. a small doodle), and never break keyboard/touch.

---

## 4. Information architecture

**Single-page site.** The portfolio is one long scrolling page (`/`) composed of anchored sections. The blog is the only exception: posts keep their own routes for SEO, sharing, and deep-linking. Numbered nav scrolls to in-page sections (smooth, with scroll-spy on the active section).

| Route / anchor | Purpose |
|---|---|
| `/` → `#hero` | Name, positioning line, mono metadata, signature motion + grid motif. |
| `/` → `#work` | Featured projects as a typographic index (FluentBot first). Inline expand or anchor to case-study detail. |
| `/` → `#writing` | Recent posts (latest 3–5) with date, title, reading time, tags; link to full post route. |
| `/` → `#about` | Bio + experience timeline + skills + community + CV download. |
| `/` → `#contact` | Footer block: email + GitHub + LinkedIn + X + CV. |
| `/writing/[slug]` | Full MDX post: TOC, Shiki code, OG/SEO. **Only routed pages besides `/`.** |
| `/cv` (or direct PDF link) | Serves the CV PDF (bundled in repo — see §6). |

- **Case studies:** since the site is single-page, render project detail either as an in-page expand/accordion or a lightweight detail view; avoid spawning many routes. Keep FluentBot's depth (problem → approach → outcome) inline-expandable.
- Global: numbered top nav (scroll-spy), dark/light toggle, footer. RSS link in footer + `<head>` for the blog.

---

## 5. Page specs

### 5.1 Home `/`
1. **Hero** — a "hi, i'm Hasib!" sticker greeting, big Fredoka headline (e.g. *"I build AI systems that actually ship"* with coral pop word + squiggle underline), short Nunito sub, primary coral "See my work →" + white "Grab my CV" buttons, skill pills, and the **cartoon character** (glasses + laptop) in a sky blob with sparkles + stat stickers (−70%, since '21). This is the signature moment.
2. **Featured work** — 2–3 projects (FluentBot first) as **sticker cards** (ink outline, hard shadow, slight rotation): project name (Fredoka), one-line outcome, tech pills, year. Inline-expand for the case study.
3. **Recent writing** — latest 3 posts as cards/rows: date, title (Fredoka), reading time, tag pills.
4. **About teaser** — 2–3 sentence bio + link to `/about`.
5. **Contact footer** — email, GitHub, LinkedIn, X, CV download.

### 5.2 Work `/work` + `/work/[slug]`
- Index: a typographic **index** of projects (numbered `01…`), each row: name, year, role, stack tags, outcome metric. Hover reveals accent.
- Case study template (per project):
  - Title (serif) + mono meta: role, timeframe, stack.
  - **Problem / context** — what & why.
  - **Approach / architecture** — decisions, with the option to embed diagrams, code snippets (Shiki), pull-quotes.
  - **Outcome** — metrics (e.g. −70% latency), what shipped, links.
  - Prev/next project nav.

### 5.3 Writing `/writing` + `/writing/[slug]`
- Index: chronological list, mono dates, serif titles, tag chips (filterable), reading time. RSS link.
- Post: serif H1, mono meta (date · reading time · tags), MDX body using the type system, Shiki code blocks with copy, auto-generated OG image, TOC for long posts, prev/next. Topics: software engineering + miscellaneous.

### 5.4 About `/about`
- Bio (expand from CV summary — see §6).
- **Experience timeline** (vertical, editorial — mono dates, serif role/company): AuthLab → InfancyIT → Rangan Studio.
- **Open-source / community** section (community work from CV; OSS repos `TODO`).
- **Skills** grouped (AI / Backend / Frontend / DevOps & Cloud / Databases).
- **Education** (SUST).
- **CV download** button → `/cv`.

---

## 6. Content (real — embed this)

> Source: `CV-S M Al Hasib-2026.pdf`. **Action:** copy the PDF into the repo at `public/cv/S-M-Al-Hasib-CV-2026.pdf` and serve a `/cv` route (or direct link) that downloads it. The file is currently only at `/Users/smalhasib/Documents/CV-S M Al Hasib-2026.pdf` and is not hosted anywhere — bundle it.

### Identity
- **Name:** S M Al Hasib  ·  **handle:** `smalhasib`
- **Title:** Software Engineer (AI & Full Stack)
- **Positioning line:** *Full-stack engineer. AI systems, end to end.*
- **Location:** Chowkidekhi, Sylhet, Bangladesh
- **Email (public):** alhasibsm@gmail.com
- **GitHub:** github.com/smalhasib  ·  **LinkedIn:** S M Al Hasib  ·  **X:** @smalhasib
- **Domain:** smalhasib.com
- Phone from CV (01621010084) — **do not publish** unless requested.

### Bio (from CV summary — refine, don't pad)
Results-driven software engineer with 3+ years' experience, moved from mobile development into architecting enterprise-grade AI solutions. In 2025 built and deployed **FluentBot**, a RAG-based customer support agent — owning the full lifecycle from RAG architecture to frontend and DevOps automation. Focus areas: RAG latency optimization, vector databases, real-time backends, and robust CI/CD.

### Experience (most recent first)
1. **Software Engineer (AI & Full Stack)** — AuthLab · Feb 2025–Present. *Lead Engineer for FluentBot.* Architected RAG system (LangChain.js → Python migration), LangGraph + ChromaDB + PostgreSQL chat memory, parent-document retrieval, Redis semantic caching; **−70% response latency (~30s → 6–11s)**; content-gap detection; Laravel backend with Horizon queues; FireCrawl scraping; real-time training status via Reverb (WebSockets); RBAC; analytics modules; Vue admin app; **Svelte chat widget refactored to vanilla — −80% JS bundle**; Docker/GHCR deploys; **blue-green zero-downtime**; GitHub Actions CI/CD; hourly backups to Cloudflare R2.
2. **Junior Software Engineer (Mobile)** — InfancyIT Limited · Mar 2024–Jan 2025. Flutter apps; CI/CD for web & mobile; Spring Boot backend.
3. **Trainee Software Engineer (Part-time)** — InfancyIT Limited · May 2023–Feb 2024. Cross-platform Flutter + native Android/iOS; in-app purchase, ML Kit, Firebase, AdMob. Apps: MySUST (Android/iOS), Wali Woo.
4. **Trainee Software Engineer (Part-time)** — Rangan Studio · Oct 2021–Aug 2022. Native Android (Java/Kotlin); Dagger Hilt, Navigation, MVVM; published 1 app to Play Store.

### Projects / case studies
1. **FluentBot** *(flagship)* — AI-powered customer support agent (RAG). Role: Lead Engineer. Stack: Python, LangChain/LangGraph, ChromaDB, PostgreSQL, Redis, Laravel, Horizon, Reverb, Vue, Svelte, Docker, GHCR, GitHub Actions, Cloudflare (Vectorize, R2, D1, KV, AI Gateway, Workers). Outcomes: −70% latency, −80% widget bundle, zero-downtime blue-green, content-gap detection. Links: `TODO` (live/case-study permission?).
2. **FluentBot Chat Widget** — standalone embeddable widget in Svelte, refactored off UI libs to vanilla → −80% JS bundle. (Can be a sub-section of FluentBot or its own short case study.)
3. **MySUST** — Flutter app, Android + iOS. Android: t.ly/UTysr · iOS: t.ly/rExHa.
4. **Wali Woo** — Android app. t.ly/HpGpx.

### Skills (groups verbatim — present as grouped mono lists)
- **AI:** Python, LangChain, LangGraph, RAG, ChromaDB, Cloudflare Vectorize, OpenAI API.
- **Backend:** PHP (Laravel), Python (FastAPI/scripts), Node.js, WebSocket (Laravel Reverb), Queues (Laravel Horizon).
- **Frontend:** Vue.js, Svelte (vanilla), TailwindCSS, TypeScript, JavaScript.
- **DevOps & Cloud:** Docker, Kubernetes (basic), GitHub Actions, Nginx, Linux (Ubuntu/Manjaro), Cloudflare (Vectorize, R2, D1, KV, AI Gateway, Workers).
- **Databases:** PostgreSQL, MySQL, Redis, SQLite.

### Education
**BSc, Computer Science & Engineering** — Shahjalal University of Science & Technology (SUST) · CGPA 3.40/4.00 · Jan 2019–Feb 2024.

### Community / leadership
- Organizer, **SUST CSE Carnival 2024** — Resources & Venue Management, Team Leader.
- Mentor, **SUST ACM Student Chapter** — workshops: "Intro to Android with Kotlin", "Intro to Git & GitHub".
- Technical Executive (Development), SUST ACM Student Chapter.

### Open-source
`TODO` — list public repos / notable PRs (GitHub: smalhasib). Until provided, render the section with the GitHub link only; do not fabricate repos.

### Writing
Topics: software engineering + miscellaneous. Suggested starter posts (rough, derived from real work — confirm before publishing):
- "Cutting RAG response latency 70%: what actually moved the needle"
- "Migrating a RAG stack from LangChain.js to Python — and why"
- "Shrinking a chat widget 80% by dropping the UI library"
- "Blue-green, zero-downtime deploys with GitHub Actions + GHCR"

---

## 7. Blog pipeline requirements

- MDX with frontmatter: `title, date, updated?, tags[], summary, draft?`.
- Shiki code: syntax highlighting, **copy button**, line highlighting, optional filename tab.
- Tag taxonomy + filtering on `/writing`.
- Reading time + dates (mono).
- RSS/Atom feed + `sitemap.xml` + `robots.txt`.
- Per-post **SEO meta** + **dynamically generated OpenGraph images** (use the page's serif title on the paper palette — keep brand-consistent).
- Draft posts excluded from production builds/feeds.
- No comments section.

---

## 8. SEO / performance / accessibility targets

- Lighthouse ≥ 95 across Performance / A11y / Best Practices / SEO.
- Semantic HTML, proper heading order, focus-visible states (accent ring), keyboard-navigable nav + toggle + custom cursor must not break keyboard/AT.
- All motion gated behind `prefers-reduced-motion`.
- Color contrast: verify ink-on-cream and text-on-accent combos meet WCAG AA (e.g. white text on coral, ink text on sun-yellow). Darken an accent or swap text color where a fill fails AA.
- Self-hosted, subset fonts; lazy-load below-fold media; no layout shift.
- Metadata: title templates, canonical URLs, JSON-LD `Person` + `BlogPosting`.

---

## 9. Build order (suggested)

1. Scaffold Next.js + Tailwind + TS + tokens + fonts + dark mode.
2. Layout shell: numbered nav, footer, theme toggle, custom cursor, Lenis, View Transitions.
3. Home page (hero signature moment first — it sets the tone).
4. Design-system primitives (typographic scale, grid, hairline rules, tag/label, button, link).
5. Work index + case-study template; seed FluentBot.
6. Blog pipeline (MDX, Shiki, tags, RSS, OG, SEO); seed 1 real post.
7. About (timeline, skills, community, CV download); bundle CV PDF + `/cv`.
8. Polish: motion pass, a11y pass, Lighthouse, Plausible, deploy to Vercel + smalhasib.com.

---

## 10. Open TODOs to confirm with owner

- "Open to work" status line in hero — show or hide?
- FluentBot public links (live demo / detailed case study) — allowed?
- Open-source repos to feature.
- Final starter blog post(s) to publish at launch.
