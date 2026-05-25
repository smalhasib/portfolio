import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

// Runs before paint to apply the saved theme (no flash of light on dark pages).
const PREPAINT = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.dataset.dark='1';else if(t==='light')document.documentElement.dataset.dark='0';else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.dataset.dark='1';}catch(_){}})();`;

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE = "https://smalhasib.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "S M Al Hasib — full-stack engineer, AI end to end",
  description:
    "Full-stack engineer based in Sylhet, Bangladesh. I architect AI systems end to end — retrieval, infra, the chat widget on the page, the deploys at 3am.",
  openGraph: {
    title: "S M Al Hasib — full-stack engineer, AI end to end",
    description:
      "Full-stack engineer based in Sylhet, Bangladesh. I architect AI systems end to end.",
    url: SITE,
    siteName: "S M Al Hasib",
    type: "website",
  },
  alternates: {
    types: { "application/rss+xml": `${SITE}/rss.xml` },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7EEDD" },
    { media: "(prefers-color-scheme: dark)", color: "#1F1A14" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-density="regular"
      data-doodles="maximal"
      className={`${fredoka.variable} ${nunito.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREPAINT }} />
      </head>
      <body>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
