import { Layers3, MonitorSmartphone, Receipt, Wallet } from "lucide-react";
import { DIFFERENTIALS } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

// Fatos verificáveis da própria oferta — não são resultados de clientes.
const FACTS = [
  { value: "100%", label: "Layout responsivo em todos os projetos", icon: MonitorSmartphone },
  { value: "3", label: "Planos com preços publicados", icon: Layers3 },
  { value: "R$ 600", label: "Desenvolvimento a partir de", icon: Wallet },
  { value: "1×", label: "Desenvolvimento cobrado uma única vez", icon: Receipt },
];

export function Differentials() {
  return (
    <section aria-labelledby="diferenciais-title" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="pointer-events-none absolute right-[-10%] top-1/3 h-[480px] w-[480px] rounded-full bg-white/[0.05] blur-[110px]" aria-hidden />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="diferenciais-title"
            eyebrow="Diferenciais"
            title="Não entregamos apenas páginas. Construímos experiências digitais."
            text="Cada detalhe do site é pensado para que o visitante entenda o que sua empresa faz e encontre facilmente como falar com você."
          />
          <ul className="mt-10 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {DIFFERENTIALS.map(({ title, icon: Icon }, i) => (
              <Reveal as="li" key={title} delay={i * 50} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line-strong bg-white/[0.04]">
                  <Icon className="h-4 w-4 text-white" strokeWidth={1.7} aria-hidden />
                </span>
                <span className="pt-1 text-[15px] leading-snug text-soft">{title}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* celular/tablet: grade simples e legível */}
        <ul className="grid grid-cols-2 gap-3 lg:hidden" aria-label="Destaques da nossa oferta">
          {FACTS.map(({ value, label, icon: Icon }, i) => (
            <Reveal as="li" key={label} delay={i * 70} className="card p-5">
              <Icon className="h-4 w-4 text-white/70" aria-hidden />
              <p className="text-chrome mt-4 font-display text-3xl font-semibold tracking-tight">{value}</p>
              <p className="mt-1.5 text-sm leading-snug text-mute">{label}</p>
            </Reveal>
          ))}
        </ul>

        {/* desktop: cartões inclinados — linguagem visual da referência */}
        <div className="relative hidden h-[580px] [perspective:1400px] lg:block" aria-hidden>
          <div className="absolute inset-0 [transform:rotateX(14deg)_rotateZ(-11deg)] [transform-style:preserve-3d]">
            {FACTS.map(({ value, label, icon: Icon }, i) => (
              <Reveal
                key={label}
                delay={i * 110}
                className="absolute w-[min(78%,330px)]"
                style={{ left: `${6 + (i % 2) * 22}%`, top: `${2 + i * 24.5}%` }}
              >
                <div className={`card card-hover rounded-2xl p-5 sm:p-6 ${i === 1 ? "border-white/25" : ""}`} style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.1), 0 30px 60px -20px rgba(0,0,0,.9)" }}>
                  <div className="flex items-start justify-between">
                    <span className="text-chrome font-display text-4xl font-semibold tracking-tight sm:text-5xl">{value}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink-950"><Icon className="h-4 w-4" aria-hidden /></span>
                  </div>
                  <p className="mt-3 text-sm text-mute">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950 to-transparent" aria-hidden />
        </div>
      </div>
      <p className="sr-only">
        Os destaques acima descrevem características da nossa oferta comercial, não resultados de clientes.
      </p>
    </section>
  );
}
