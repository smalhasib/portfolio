# smalhasib.com

Personal portfolio + blog for **S M Al Hasib** — full-stack / AI software engineer.

A single-page site in a deliberately non-generic **cream + cartoon** aesthetic:
warm paper canvas, thick ink outlines, hard offset shadows, sticker UI, an
animated cursor-tracking mascot, hand-drawn doodles, and a full dark mode.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** + hand-authored design-system CSS (`app/globals.css`, `app/post.css`)
- **MDX** blog via `next-mdx-remote`, syntax highlighting by **Shiki** (`rehype-pretty-code`)
- Fonts: **Fredoka** / **Nunito** / **JetBrains Mono** via `next/font`
- Deployed on **Vercel**

## Features

- Single-page scroll: Hero → Work → About → Writing → Contact, with a sticky
  numbered pill nav + scroll-spy
- Animated SVG mascot (eyes track the cursor, idle bob + blink)
- Expandable work case studies (problem → approach → outcome)
- MDX-authored blog at `/writing/[slug]` — TOC, code stickers with copy button,
  callouts, pull-quotes, sticky-notes, reactions, reading-progress bubble
- Dark / light theme toggle (persisted, cross-tab, no flash)
- RSS feed (`/rss.xml`) + `sitemap.xml`
- Fully responsive (760px / 480px breakpoints), motion gated behind
  `prefers-reduced-motion`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Project layout

```
app/                 routes, global + post CSS, layout (fonts, theme, metadata)
  writing/[slug]/    MDX post route
  rss.xml/ sitemap   feed + sitemap
components/          Hero, Work, About, Writing, Contact, Nav, Mascot, ThemeToggle, doodles
  post/              MDX components + client post scripts
content/posts/       blog posts (.mdx)
lib/                 site data + post loader
public/cv/           downloadable CV
```

## Writing a post

Drop a `.mdx` file in `content/posts/` with frontmatter:

```mdx
---
title: "Post title"
date: "2026.04.18"
read: "9 min"
tags: ["RAG", "Latency"]
excerpt: "One-line summary for the listing + meta."
---

## A heading

Body in Markdown. Use components: <Callout type="tip" badge="good idea">…</Callout>,
<PullQuote>…</PullQuote>, <Cover .../>, <Compare>…</Compare>.
```

It appears automatically in the homepage listing, RSS, and sitemap.

## Deploy

Import the repo on [Vercel](https://vercel.com) (auto-detects Next.js). Every
push to `main` ships to production; other branches get preview deploys. No
GitHub Actions required.
