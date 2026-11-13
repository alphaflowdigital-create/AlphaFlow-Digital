import Image from "next/image";
import { ArrowUpRight, CarFront, Scissors, Stethoscope, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { PORTFOLIO, type PortfolioItem } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappLink, WA_MESSAGES } from "@/lib/whatsapp";

const PREVIEW: Record<PortfolioItem["variant"], { icon: LucideIcon; brand: string; headline: string; chips: string[] }> = {
  restaurant: { icon: UtensilsCrossed, brand: "Casa & Brasa", headline: "Sabor que reúne.", chips: ["Cardápio", "Reservas", "Delivery"] },
  clinic: { icon: Stethoscope, brand: "Clínica Vitta", headline: "Cuidado em cada detalhe.", chips: ["Especialidades", "Convênios", "Agendar"] },
  barber: { icon: Scissors, brand: "Navalha Club", headline: "Estilo com precisão.", chips: ["Cortes", "Barba", "Agendar"] },
  garage: { icon: CarFront, brand: "Motor Pro", headline: "Revisão sem surpresas.", chips: ["Serviços", "Orçamento", "Mapa"] },
};

/** Prévia ilustrada (marca fictícia, claramente identificada como demonstração). */
function IllustratedPreview({ variant }: { variant: PortfolioItem["variant"] }) {
  const p = PREVIEW[variant];
  const Icon = p.icon;
  return (
    <div className="absolute inset-0 flex flex-col p-4 sm:p-5" aria-hidden>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-display text-[11px] font-semibold text-white"><Icon className="h-3.5 w-3.5" /> {p.brand}</span>
        <span className="flex gap-2">{[0, 1, 2].map((k) => <span key={k} className="h-1 w-6 rounded-full bg-white/20" />)}</span>
      </div>
      <div className="mt-auto grid grid-cols-[1.3fr_1fr] items-end gap-4">
        <div>
          <p className="font-display text-xl font-semibold leading-tight text-white sm:text-2xl">{p.headline}</p>
          <div className="mt-2 h-1.5 w-4/5 rounded-full bg-white/15" />
          <div className="mt-1.5 h-1.5 w-3/5 rounded-full bg-white/10" />
          <div className="mt-3 flex gap-1.5">
            <span className="h-5 w-16 rounded bg-white" />
            <span className="h-5 w-12 rounded border border-white/25" />
          </div>
        </div>
        <div className="grid gap-1.5">
          {p.chips.map((c, i) => (
            <span key={c} className={`rounded-md border px-2 py-1 text-[10px] ${i === 0 ? "border-white/40 bg-white/10 text-white" : "border-white/10 text-mute"}`}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  return (
    <section aria-labelledby="portfolio-title" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="portfolio-title"
            eyebrow="Portfólio"
            title="Design pensado para destacar cada negócio."
            text="Conceitos visuais criados pela AlphaFlow para mostrar como diferentes segmentos podem se apresentar na internet."
          />
          <Reveal className="max-w-xs text-sm leading-relaxed text-mute md:text-right">
            Os projetos abaixo são <strong className="font-medium text-white">demonstrativos</strong>: as marcas são fictícias e não representam clientes.
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {PORTFOLIO.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 2) * 100}>
              <article className="card card-hover group flex h-full flex-col overflow-hidden">
                <div className="relative m-2 aspect-[16/10] overflow-hidden rounded-[0.9rem] border border-line bg-gradient-to-br from-[#1b1b1b] via-[#0e0e0e] to-[#050505]">
                  <div className="bg-grid absolute inset-0 opacity-50" aria-hidden />
                  <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/[0.07] blur-3xl transition-transform duration-700 group-hover:scale-125" aria-hidden />
                  {item.image ? (
                    <Image src={item.image} alt={`Visualização do site: ${item.title}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" loading="lazy" />
                  ) : (
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
                      <IllustratedPreview variant={item.variant} />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 pt-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-medium uppercase tracking-wider text-mute">{item.segment}</p>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${item.kind === "demo" ? "border border-white/15 text-soft" : "bg-white text-ink-950"}`}>
                      {item.kind === "demo" ? "Projeto demonstrativo" : "Projeto entregue"}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-mute">{item.description}</p>
                  <div className="mt-5">
                    {item.demoUrl ? (
                      <a href={item.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                        Visualizar demonstração <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </a>
                    ) : (
                      <a href={whatsappLink(WA_MESSAGES.portfolio(item.segment.toLowerCase()))} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                        Quero um site assim <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
