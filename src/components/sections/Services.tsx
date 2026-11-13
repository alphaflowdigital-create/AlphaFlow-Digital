import { SERVICES } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="relative border-t border-line py-24 sm:py-32">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-80 opacity-60" aria-hidden />
      <div className="container-x relative">
        <SectionHeading
          id="servicos-title"
          eyebrow="Serviços"
          title="Soluções digitais para negócios que querem evoluir."
          text="Do primeiro site à evolução de uma presença digital já existente, cada entrega é planejada para o momento do seu negócio."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ title, text, icon: Icon }, i) => (
            <Reveal as="li" key={title} delay={(i % 4) * 70}>
              <GlowCard className="group h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong bg-gradient-to-b from-white/[0.12] to-white/[0.02] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition-colors duration-300 group-hover:bg-white group-hover:text-ink-950">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-mute">{text}</p>
              </GlowCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
