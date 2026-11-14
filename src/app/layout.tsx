import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { BackgroundFX } from "@/components/layout/BackgroundFX";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap", weight: ["500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Criação de Sites Profissionais para Empresas | AlphaFlow Digital",
    template: "%s | AlphaFlow Digital",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "criação de sites", "desenvolvimento de sites profissionais", "criação de sites para empresas",
    "sites para comércios", "desenvolvimento web", "criação de landing pages", "site para pequenas empresas",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.name,
    title: "AlphaFlow Digital — Sites profissionais para empresas",
    description: siteConfig.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AlphaFlow Digital — Criação de sites profissionais" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaFlow Digital — Sites profissionais para empresas",
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-dvh bg-ink-950">
        <OrganizationJsonLd />
        <BackgroundFX />
        {children}
        <CookieConsent gaId={siteConfig.gaId} />
      </body>
    </html>
  );
}
