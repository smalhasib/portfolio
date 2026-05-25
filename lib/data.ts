// Site content — extracted from the design handoff (sections.jsx) and the CV.

export const HEADLINE = { lead: "I build", pop: "AI systems", tail: "that actually ship." };

export const SKILLS_HERO = ["Python", "LangChain", "RAG", "Laravel", "Vue", "Svelte", "Postgres", "Docker"];

// Locked Tweaks defaults from the design tool.
export const HERO_STATS = [
  { num: "−70%", lbl: "RAG latency" },
  { num: "−80%", lbl: "widget bundle" },
  { num: "3+ yrs", lbl: "experience" },
];

export type WorkItem = {
  id: string;
  n: string;
  name: string;
  year: string;
  role: string;
  outcome: string;
  blurb: string;
  stack: string[];
  color: string;
  problem: string;
  approach: string;
  outcomeBlocks: [string, string][];
};

export const WORK: WorkItem[] = [
  {
    id: "fluentbot",
    n: "01",
    name: "FluentBot",
    year: "2025 → now",
    role: "Lead Engineer",
    outcome: "−70% RAG response latency",
    blurb:
      "AI-powered customer-support agent built on a RAG architecture. Owned the full lifecycle: retrieval, infra, frontend widget, and zero-downtime deploys.",
    stack: ["Python", "LangChain", "LangGraph", "ChromaDB", "Postgres", "Redis", "Laravel", "Vue", "Svelte"],
    color: "var(--coral)",
    problem:
      "The first cut answered correctly but felt dead — 30s round-trips killed every demo. The widget shipped a 220kB JS bundle to embed a chat box. Customers couldn't tell when content gaps were costing them tickets.",
    approach:
      "Migrated the RAG core from LangChain.js to Python; introduced LangGraph for orchestration, parent-document retrieval, and Redis semantic caching. Refactored the chat widget off its UI library to vanilla JS. Wired blue-green deploys on GHCR with Reverb websockets pushing live training status.",
    outcomeBlocks: [
      ["−70%", "response latency, 30s → 6–11s"],
      ["−80%", "widget JS bundle size"],
      ["0s", "downtime on rolling deploys"],
    ],
  },
  {
    id: "widget",
    n: "02",
    name: "FluentBot Chat Widget",
    year: "2025",
    role: "Solo build",
    outcome: "−80% JS bundle",
    blurb:
      "Refactored an embeddable Svelte chat widget off its UI dependencies to vanilla — same surface, a fraction of the bytes.",
    stack: ["Svelte", "TypeScript", "TailwindCSS"],
    color: "var(--sky)",
    problem:
      "Embedding the widget on a customer's marketing site was burning measurable LCP and inflating Core Web Vitals. The UI library was carrying us, not helping us.",
    approach:
      "Catalogued every UI primitive in use, rebuilt them as small vanilla components, tree-shook the build, dropped runtime CSS-in-JS in favour of utility classes scoped to a shadow root.",
    outcomeBlocks: [
      ["−80%", "JS bundle shipped to host"],
      ["Same", "feature surface area"],
      ["1", "iframe-free embed"],
    ],
  },
  {
    id: "mysust",
    n: "03",
    name: "MySUST",
    year: "2023–2024",
    role: "Mobile dev",
    outcome: "Android + iOS, in students' pockets",
    blurb:
      "Cross-platform Flutter app for SUST students — schedules, results, campus info. Shipped to both stores.",
    stack: ["Flutter", "Firebase", "ML Kit", "AdMob"],
    color: "var(--mint)",
    problem:
      "Students were juggling 3 PDFs, a Facebook group, and a half-broken intranet to find their own class schedule.",
    approach:
      "Single Flutter codebase, Firebase for auth + sync, Play Store and App Store releases. In-app purchase and AdMob to keep it sustainable.",
    outcomeBlocks: [
      ["Android", "Play Store: t.ly/UTysr"],
      ["iOS", "App Store: t.ly/rExHa"],
      ["1 codebase", "two platforms"],
    ],
  },
];

export const EXPERIENCE = [
  {
    when: "Feb 2025 — Present",
    title: "Software Engineer (AI & Full Stack)",
    co: "AuthLab",
    body: "Lead Engineer for FluentBot. RAG architecture, LangGraph orchestration, blue-green deploys, real-time training status, RBAC, analytics modules. Built the Vue admin app and refactored the Svelte widget to vanilla.",
  },
  {
    when: "Mar 2024 — Jan 2025",
    title: "Junior Software Engineer (Mobile)",
    co: "InfancyIT Limited",
    body: "Flutter apps across Android and iOS, CI/CD for web and mobile, Spring Boot backend work.",
  },
  {
    when: "May 2023 — Feb 2024",
    title: "Trainee Software Engineer (Part-time)",
    co: "InfancyIT Limited",
    body: "Cross-platform Flutter plus native Android/iOS. Shipped MySUST and Wali Woo — in-app purchase, ML Kit, Firebase, AdMob.",
  },
  {
    when: "Oct 2021 — Aug 2022",
    title: "Trainee Software Engineer (Part-time)",
    co: "Rangan Studio",
    body: "Native Android in Java/Kotlin. Dagger Hilt, Navigation component, MVVM. Published one app to the Play Store.",
  },
];

export const SKILL_GROUPS = [
  { name: "AI", items: ["Python", "LangChain", "LangGraph", "RAG", "ChromaDB", "Cloudflare Vectorize", "OpenAI API"] },
  { name: "Backend", items: ["PHP (Laravel)", "Python (FastAPI)", "Node.js", "Laravel Reverb", "Laravel Horizon"] },
  { name: "Frontend", items: ["Vue.js", "Svelte", "TailwindCSS", "TypeScript", "JavaScript"] },
  {
    name: "DevOps & Cloud",
    items: ["Docker", "Kubernetes", "GitHub Actions", "Nginx", "Linux", "Cloudflare (R2, D1, KV, AI Gateway, Workers)"],
  },
  { name: "Databases", items: ["PostgreSQL", "MySQL", "Redis", "SQLite"] },
];

export const COMMUNITY = [
  { kind: "Organizer", what: "SUST CSE Carnival 2024 — Resources & Venue, Team Lead" },
  { kind: "Mentor", what: "SUST ACM Student Chapter — workshops: Intro to Android with Kotlin · Intro to Git & GitHub" },
  { kind: "Exec", what: "Technical Executive (Development), SUST ACM Student Chapter" },
];

export const CV_HREF = "/cv/S-M-Al-Hasib-CV-2026.pdf";
