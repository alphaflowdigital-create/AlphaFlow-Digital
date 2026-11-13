import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="conteudo" className="relative flex min-h-[88dvh] items-center overflow-hidden pb-20 pt-32">
        <div className="bg-grid mask-radial pointer-events-none absolute inset-0" aria-hidden />
        <p aria-hidden className="text-chrome-soft pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[42vw] font-bold leading-none tracking-[-0.08em] opacity-[0.07] sm:text-[24rem]">
          404
        </p>
        <div className="container-x relative text-center">
          <img src="/brand/logo-mark.png" alt="" width={256} height={199} className="hero-in mx-auto h-14 w-auto opacity-90" />
          <h1 className="hero-in text-chrome mx-auto mt-8 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl" style={{ "--d": "80ms" } as React.CSSProperties}>
            Ops! Parece que você saiu do fluxo.
          </h1>
          <p className="hero-in mt-5 text-lg text-mute" style={{ "--d": "160ms" } as React.CSSProperties}>Esta página não foi encontrada.</p>
          <Link href="/" className="hero-in btn btn-primary mt-10 h-12 px-7" style={{ "--d": "240ms" } as React.CSSProperties}>
            <ArrowLeft className="h-4 w-4" aria-hidden /> Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
