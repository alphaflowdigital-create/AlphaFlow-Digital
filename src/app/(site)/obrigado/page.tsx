import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink, WA_MESSAGES } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Solicitação recebida",
  description: "Recebemos sua solicitação de orçamento. A equipe AlphaFlow Digital entrará em contato.",
  alternates: { canonical: "/obrigado" },
  robots: { index: false, follow: true },
};

export default function ObrigadoPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <div className="bg-grid mask-radial pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-x relative">
        <Breadcrumbs items={[{ name: "Obrigado", path: "/obrigado" }]} />
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <span className="hero-in mx-auto grid h-20 w-20 place-items-center rounded-full border border-line-strong bg-white/[0.04] shadow-[0_0_80px_-10px_rgba(255,255,255,0.35)]">
            <CheckCircle2 className="h-9 w-9 text-white" strokeWidth={1.5} aria-hidden />
          </span>
          <h1 className="hero-in text-chrome mt-8 text-4xl font-semibold leading-tight sm:text-6xl" style={{ "--d": "80ms" } as React.CSSProperties}>
            Recebemos sua solicitação!
          </h1>
          <p className="hero-in mx-auto mt-6 max-w-lg text-lg leading-relaxed text-mute" style={{ "--d": "160ms" } as React.CSSProperties}>
            A equipe AlphaFlow Digital entrará em contato para entender melhor seu projeto.
          </p>
          <div className="hero-in mt-10 flex flex-col justify-center gap-3 sm:flex-row" style={{ "--d": "240ms" } as React.CSSProperties}>
            <Link href="/" className="btn btn-primary h-12 px-6"><ArrowLeft className="h-4 w-4" aria-hidden /> Voltar ao início</Link>
            <a href={whatsappLink(WA_MESSAGES.conversa)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost h-12 px-6">
              <WhatsAppIcon className="h-4 w-4" /> Adiantar pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
