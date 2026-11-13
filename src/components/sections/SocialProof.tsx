import { Quote } from "lucide-react";
import { COMMITMENTS, TESTIMONIALS } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LogoStacked } from "@/components/brand/Logo";

export function SocialProof() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            id="sobre-title"
            eyebrow="Sobre nós"
            title="Confiança construída com transparência."
            text="A AlphaFlow Digital desenvolve sites modernos, personalizados e estratégicos para empresas que desejam fortalecer sua presença digital, apresentar seus serviços com profissionalismo e facilitar o contato com seus clientes."
          />
          <Reveal className="mt-8 max-w-xl leading-relaxed text-mute">
            Estamos no início da nossa trajetória — e por isso preferimos mostrar como trabalhamos, em vez de números. Cada projeto entregue será apresentado aqui com a autorização do cliente.
          </Reveal>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-10 rounded-full bg-white/[0.04] blur-3xl" aria-hidden />
          <div className="relative grid gap-4">
            {COMMITMENTS.map(({ title, text, icon: Icon }, i) => (
              <Reveal key={title} delay={i * 100} className="card card-hover flex gap-5 p-6" style={{ marginLeft: `${i * 4}%` }}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-ink-950">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-mute">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Depoimentos reais — só renderiza quando existirem */}
      {TESTIMONIALS.length > 0 ? (
        <div className="container-x mt-20">
          <ul className="grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <li key={t.name} className="card p-6">
                <Quote className="h-6 w-6 text-white/40" aria-hidden />
                <blockquote className="mt-4 leading-relaxed text-soft">{t.text}</blockquote>
                <p className="mt-5 text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-mute">{t.company} · {t.segment}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="container-x mt-16">
          <Reveal className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-white/12 px-6 py-10 text-center sm:flex-row sm:text-left">
            <LogoStacked className="h-14 w-auto opacity-90" />
            <p className="max-w-2xl text-sm leading-relaxed text-mute sm:border-l sm:border-line sm:pl-6">
              <strong className="font-medium text-white">Avaliações de clientes.</strong>{" "}
              Este espaço receberá depoimentos reais à medida que os projetos forem concluídos. Não publicamos avaliações fictícias.
            </p>
          </Reveal>
        </div>
      )}
    </section>
  );
}
