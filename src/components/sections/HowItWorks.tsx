import { STEPS } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-title" className="relative border-t border-line bg-ink-900 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="como-title"
          eyebrow="Como funciona"
          title="Do primeiro contato ao site no ar."
          text="Um processo simples e transparente, em quatro etapas, para que você saiba exatamente o que acontece em cada fase do projeto."
          align="center"
        />

        <div className="relative mt-16">
        {/* linha conectora — horizontal no desktop, vertical no celular */}
        <div className="pointer-events-none absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-white/40 via-white/15 to-transparent md:left-[12.5%] md:right-[12.5%] md:top-[27px] md:bottom-auto md:h-px md:w-auto md:bg-gradient-to-r md:from-white/10 md:via-white/40 md:to-white/10" aria-hidden />
        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {STEPS.map(({ title, text, icon: Icon }, i) => (
            <Reveal as="li" key={title} delay={i * 120} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line-strong bg-ink-950 shadow-[0_0_0_6px_#0b0b0b,inset_0_1px_0_rgba(255,255,255,0.12)]">
                <Icon className="h-5 w-5 text-white" strokeWidth={1.6} aria-hidden />
                <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-white font-display text-[11px] font-bold text-ink-950">{i + 1}</span>
              </span>
              <div className="md:mt-6">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 max-w-xs leading-relaxed text-mute md:mx-auto">{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
