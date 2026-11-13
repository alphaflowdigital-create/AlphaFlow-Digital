import { Monitor, Smartphone, Tablet, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkle } from "./HeroArt";

/** Mini site ilustrativo (marca genérica) usado dentro das telas. */
function MiniSite({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#141414] to-[#070707] text-white">
      <div className={`flex items-center justify-between border-b border-white/10 ${compact ? "px-3 py-2" : "px-5 py-3"}`}>
        <span className={`flex items-center gap-1.5 whitespace-nowrap font-display font-semibold ${compact ? "text-[9px]" : "text-[11px]"}`}>
          <span className={`rounded-full bg-white ${compact ? "h-2.5 w-2.5" : "h-3 w-3"}`} /> Sua Empresa
        </span>
        {compact ? (
          <span className="flex flex-col gap-0.5">{[0, 1, 2].map((k) => <span key={k} className="h-px w-3 bg-white/60" />)}</span>
        ) : (
          <span className="flex items-center gap-2 sm:gap-3">
            {[0, 1, 2, 3].map((k) => <span key={k} className="hidden h-1 w-7 rounded-full bg-white/20 sm:block" />)}
            <span className="h-4 w-12 rounded bg-white" />
          </span>
        )}
      </div>

      <div className={`relative overflow-hidden ${compact ? "px-3 pb-3 pt-4" : "px-5 pb-4 pt-6"}`}>
        <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
        <span className={`inline-flex items-center gap-1 rounded-full border border-white/15 ${compact ? "px-1.5 py-0.5 text-[6px]" : "px-2 py-0.5 text-[8px]"} text-white/70`}>
          <Star className={compact ? "h-1.5 w-1.5" : "h-2 w-2"} fill="currentColor" /> Atendimento na sua região
        </span>
        <p className={`mt-2 font-display font-semibold leading-[1.05] tracking-tight ${compact ? "text-[15px]" : "text-[17px] sm:text-[26px]"}`}>
          Qualidade que<br />você percebe.
        </p>
        <div className={`mt-2 space-y-1 ${compact ? "w-4/5" : "w-1/2"}`}>
          <div className="h-1 rounded-full bg-white/20" /><div className="h-1 w-4/5 rounded-full bg-white/10" />
        </div>
        <div className={`flex gap-1.5 ${compact ? "mt-3" : "mt-4"}`}>
          <span className={`rounded bg-white ${compact ? "h-4 w-14" : "h-5 w-20"}`} />
          <span className={`rounded border border-white/25 ${compact ? "h-4 w-10" : "h-5 w-16"}`} />
        </div>
      </div>

      <div className={`grid flex-1 gap-1.5 ${compact ? "grid-cols-1 px-3 pb-3" : "grid-cols-3 px-5 pb-5"}`}>
        {(compact ? [0, 1, 2] : [0, 1, 2]).map((k) => (
          <div key={k} className={`rounded-md border border-white/10 bg-white/[0.03] ${compact ? "flex items-center gap-2 p-2" : "p-2.5"}`}>
            <span className={`block rounded bg-gradient-to-br from-white/40 to-white/5 ${compact ? "h-5 w-5 shrink-0" : "h-8 w-full"}`} />
            <div className={compact ? "flex-1 space-y-1" : "mt-2 space-y-1"}>
              <div className="h-1 w-3/4 rounded-full bg-white/50" />
              <div className="h-1 w-1/2 rounded-full bg-white/15" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DeviceShowcase() {
  const points = [
    { icon: Smartphone, t: "Celular", d: "Botões grandes, leitura confortável e contato a um toque." },
    { icon: Tablet, t: "Tablet", d: "Layout reorganizado para aproveitar a tela." },
    { icon: Monitor, t: "Computador", d: "Apresentação completa, com espaço para cada detalhe." },
  ];
  return (
    <section aria-labelledby="telas-title" className="relative overflow-hidden border-t border-line bg-ink-900 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-[130px]" aria-hidden />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            id="telas-title"
            eyebrow="Experiência responsiva"
            title="Impecável em qualquer tela."
            text="A maior parte das pessoas vai conhecer sua empresa pelo celular. Por isso, cada site é desenhado e testado para celulares, tablets e computadores."
          />
          <ul className="mt-10 space-y-5">
            {points.map(({ icon: Icon, t, d }, i) => (
              <Reveal as="li" key={t} delay={i * 90} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-white/[0.04]"><Icon className="h-5 w-5 text-white" strokeWidth={1.6} aria-hidden /></span>
                <div><p className="font-semibold text-white">{t}</p><p className="mt-0.5 text-[15px] text-mute">{d}</p></div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* composição de dispositivos — ilustração, marca genérica */}
        <Reveal delay={120} className="relative mx-auto w-full max-w-[640px]" aria-hidden>
          <Sparkle id="ds1" size={90} className="absolute -left-4 -top-10 z-10 animate-float-slow" />
          <Sparkle id="ds2" size={54} className="absolute -right-2 bottom-8 z-30 animate-float [animation-delay:-3s]" />

          {/* notebook */}
          <div className="relative">
            <div className="rounded-t-[1.1rem] border border-white/15 bg-[#0c0c0c] p-2 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.12)]">
              <div className="mx-auto mb-1.5 h-1 w-1 rounded-full bg-white/25" />
              <div className="aspect-[16/10] overflow-hidden rounded-md border border-white/10"><MiniSite /></div>
            </div>
            <div className="relative mx-[-5%] h-3.5 rounded-b-2xl bg-gradient-to-b from-[#3a3a3a] via-[#1d1d1d] to-[#0b0b0b] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.9)]">
              <div className="absolute left-1/2 top-0 h-1.5 w-20 -translate-x-1/2 rounded-b-lg bg-black/60" />
            </div>
          </div>

          {/* celular */}
          <div className="absolute -bottom-10 right-[-2%] z-20 w-[30%] min-w-[118px] rotate-[4deg] animate-float-slow sm:right-[-6%]">
            <div className="rounded-[1.6rem] border border-white/20 bg-[#0c0c0c] p-1.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.15)]">
              <div className="relative aspect-[9/19] overflow-hidden rounded-[1.25rem] border border-white/10">
                <div className="absolute left-1/2 top-1.5 z-10 h-3 w-12 -translate-x-1/2 rounded-full bg-black" />
                <div className="h-full pt-4"><MiniSite compact /></div>
              </div>
            </div>
          </div>

          {/* selo */}
          <div className="card absolute -left-3 bottom-10 z-20 hidden items-center gap-2.5 rounded-xl px-3.5 py-2.5 sm:flex">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-ink-950"><Smartphone className="h-3.5 w-3.5" /></span>
            <span className="text-xs leading-tight"><span className="block font-semibold text-white">Mobile-first</span><span className="text-mute">pensado primeiro no celular</span></span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
