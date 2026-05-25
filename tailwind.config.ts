import type { Config } from "tailwindcss";

// The design system lives in CSS variables + hand-authored classes in
// app/globals.css and app/post.css (ported pixel-for-pixel from the
// Claude Design handoff). Tailwind is available for incidental utilities.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        paper: "var(--paper)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        coral: "var(--coral)",
        sky: "var(--sky)",
        sun: "var(--sun)",
        mint: "var(--mint)",
      },
      fontFamily: {
        fredoka: ["var(--font-fredoka)", "ui-sans-serif", "system-ui", "sans-serif"],
        nunito: ["var(--font-nunito)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
