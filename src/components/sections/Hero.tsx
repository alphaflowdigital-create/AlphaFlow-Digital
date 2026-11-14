import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HeroArt } from "./HeroArt";
import { whatsappLink, WA_MESSAGES } from "@/lib/whatsapp";
import type { CSSProperties } from "react";
import { PLANS, formatBRL } from "@/content/site";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const cheapest = PLANS.reduce((a, b) => (b.setup < a.setup ? b : a));
const startPrice = formatBRL(cheapest.setup).replace(",00", "");
const startMonthly = formatBRL(Math.min(...PLANS.map((p) => p.monthly)));

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pb-28 pt-32 sm:pt-36 lg:pb-36 lg:pt-40">
      {/* fundo: grade + luz superior */}
      <div className="bg-grid mask-radial pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.07] blur-[120px]" aria-hidden />

      {/* feixes de luz vindos do topo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[760px] overflow-hidden" aria-hidden>
        <div className="absolute left-[18%] top-[-120px] h-[900px] w-[220px] origin-top rotate-[24deg] bg-gradient-to-b from-white/[0.17] via-white/[0.04] to-transparent blur-2xl" />
        <div className="absolute left-[40%] top-[-120px] h-[820px] w-[120px] origin-top rotate-[12deg] bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent blur-xl" />
        <div className="absolute right-[22%] top-[-120px] h-[880px] w-[180px] origin-top -rotate-[18deg] bg-gradient-to-b from-white/[0.14] via-white/[0.035] to-transparent blur-2xl" />
      </div>

      {/* horizonte: arco luminoso na base do hero */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px] overflow-hidden" aria-hidden>
        <div className="absolute left-1/2 top-[100px] h-[1400px] w-[2400px] -translate-x-1/2 rounded-[50%] border-t border-white/40 bg-[radial-gradient(ellipse_50%_8%_at_50%_0%,rgba(255,255,255,0.16),transparent)] shadow-[0_-30px_80px_-20px_rgba(255,255,255,0.3)]" />
        <div className="absolute left-1/2 top-[98px] h-[3px] w-[38%] -translate-x-1/2 rounded-full bg-white/90 blur-[3px]" />
      </div>

      {/* pontos de luz */}
      <div className="bg-dots pointer-events-none absolute right-0 top-24 hidden h-[420px] w-[420px] [mask-image:radial-gradient(closest-side,#000,transparent)] lg:block" aria-hidden />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <p className="hero-badge hero-in" style={d(0)}>
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.5)]">
              <img src="/brand/logo-mark.png" alt="" width={256} height={199} className="h-3 w-auto invert" />
            </span>
            <span className="whitespace-nowrap text-[9.5px] font-semibold tracking-[0.1em] text-white sm:text-[11px] sm:tracking-[0.18em]">ALPHAFLOW DIGITAL</span>
            <span className="h-3.5 w-px shrink-0 bg-gradient-to-b from-transparent via-white/40 to-transparent" aria-hidden />
            <span className="sr-only"> — </span>
            <span className="whitespace-nowrap text-[9.5px] font-medium tracking-[0.1em] text-mute sm:text-[11px] sm:tracking-[0.18em]">DESENVOLVIMENTO WEB</span>
          </p>

          <h1 id="hero-title" className="hero-in mt-7 text-[2.6rem] font-semibold leading-[1.02] text-white sm:text-6xl lg:text-[4.6rem]" style={d(90)}>
            Seu negócio merece uma{" "}
            <span className="text-chrome-soft">presença digital</span>{" "}
            <span className="relative inline-block">
              à altura.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none" aria-hidden>
                <path d="M1 6 C50 1 150 1 199 5" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="hero-in mt-7 max-w-xl text-base leading-relaxed text-mute sm:text-lg" style={d(180)}>
            Criamos sites modernos, estratégicos e personalizados para destacar sua empresa, fortalecer sua marca e aproximar seu negócio de novos clientes.
          </p>

          <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={d(270)}>
            <a href={whatsappLink(WA_MESSAGES.orcamento)} target="_blank" rel="noopener noreferrer" className="btn btn-primary h-12 px-6">
              Solicitar meu site <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <Link href="/#planos" className="btn btn-ghost h-12 px-6">
              Conhecer nossos planos <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {/* pista de preço — valores vêm direto dos planos para nunca ficarem desatualizados */}
          <Link
            href="/#planos"
            className="hero-in group mt-8 inline-flex max-w-full items-center gap-4 rounded-2xl border border-line-strong bg-white/[0.03] py-3 pl-4 pr-4 transition-colors hover:border-white/30 hover:bg-white/[0.06] sm:pr-5"
            style={d(340)}
            aria-label={`Sites a partir de ${startPrice}. Ver planos e preços`}
          >
            <span className="flex shrink-0 flex-col leading-none">
              <span className="text-[11px] font-medium uppercase tracking-wider text-mute">Sites a partir de</span>
              <span className="text-chrome mt-1.5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{startPrice}</span>
            </span>
            <span className="h-10 w-px shrink-0 bg-line-strong" aria-hidden />
            <span className="text-[13px] leading-snug text-mute">
              Desenvolvimento em pagamento único
              <span className="block">+ mensalidade a partir de {startMonthly}</span>
            </span>
            <ArrowRight className="hidden h-4 w-4 shrink-0 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:text-white sm:block" aria-hidden />
          </Link>
        </div>

        <div className="hero-in" style={d(200)}>
          <HeroArt />
        </div>
      </div>
    </section>
  );
}
