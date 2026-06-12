import type { Metadata, Viewport } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SplashScreen } from "@/components/sections/SplashScreen";
import { siteConfig } from "@/data/site";
import { SPLASH_EVERY_VISIT } from "@/lib/splash";

/* Archivo variável (peso + largura): UI e display na mesma família —
   o display usa Black expandida em caixa alta (design.md §5). */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Hub para mestres de RPG`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "RPG de mesa",
    "mestre de RPG",
    "dungeon master",
    "D&D",
    "DCC",
    "Pathfinder",
    "old school",
    "guias para mestres",
    "materiais de RPG",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Hub para mestres de RPG`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Hub para mestres de RPG`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050304",
  width: "device-width",
  initialScale: 1,
};

/**
 * Executa antes do primeiro paint:
 * - marca `.js` no <html> (gate dos estados iniciais de animação);
 * - marca `data-splash-seen` se a splash já rodou nesta sessão
 *   (suprimido enquanto `SPLASH_EVERY_VISIT` estiver ligada).
 */
const bootScript = [
  'document.documentElement.classList.add("js");',
  SPLASH_EVERY_VISIT
    ? ""
    : 'try{if(sessionStorage.getItem("ad:splash")==="1"){document.documentElement.setAttribute("data-splash-seen","")}}catch(e){}',
]
  .join("")
  .trim();

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.contactEmail,
      description: siteConfig.description,
    },
    {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: "pt-BR",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-bg-primary font-sans text-text-primary antialiased">
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />

        <a
          href="#conteudo"
          className="sr-only z-100 rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-text-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>

        <SplashScreen />
        <Header />
        {children}
        <Footer />

        {/* grain quase invisível sobre tudo (design.md, Apêndice B) */}
        <div className="grain-overlay" aria-hidden="true" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
