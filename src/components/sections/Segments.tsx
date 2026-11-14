import { ArrowUpRight, BriefcaseBusiness, Building2, CarFront, Scissors, Stethoscope, Store, UtensilsCrossed } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { whatsappLink, WA_MESSAGES } from "@/lib/whatsapp";

const SEGMENTS = [
  { icon: UtensilsCrossed, title: "Restaurantes e lanchonetes", text: "Cardápio, horários, localização e pedidos pelo WhatsApp.", tags: ["Cardápio", "Delivery"] },
  { icon: Stethoscope, title: "Clínicas e consultórios", text: "Especialidades, profissionais, convênios e agendamento.", tags: ["Agendamento", "Convênios"] },
  { icon: Scissors, title: "Barbearias e salões", text: "Tabela de serviços, galeria de trabalhos e reserva rápida.", tags: ["Serviços", "Galeria"] },
  { icon: CarFront, title: "Oficinas mecânicas", text: "Serviços, diferenciais, mapa e pedido de orçamento.", tags: ["Orçamento", "Mapa"] },
  { icon: Store, title: "Lojas e comércios", text: "Catálogo de produtos, promoções e contato direto.", tags: ["Catálogo", "Promoções"] },
  { icon: BriefcaseBusiness, title: "Prestadores de serviços", text: "Apresentação profissional, portfólio e captação de contatos.", tags: ["Portfólio", "Contato"] },
  { icon: Building2, title: "Pequenas e médias empresas", text: "Site institucional completo para fortalecer a marca.", tags: ["Institucional", "SEO"] },
];

export function Segments() {
  return (
    <section aria-labelledby="segmentos-title" className="relative overflow-hidden border-t border-line section-alt py-24 sm:py-32">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-96 opacity-50" aria-hidden />
      <div className="container-x relative">
        <SectionHeading
          id="segmentos-title"
          eyebrow="Para quem criamos"
          title="Um site pensado para o seu tipo de negócio."
          text="Cada segmento tem necessidades diferentes. Planejamos a estrutura do site de acordo com o que o seu cliente precisa encontrar."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map(({ icon: Icon, title, text, tags }, i) => (
            <Reveal as="li" key={title} delay={(i % 4) * 70}>
              <GlowCard className="group relative h-full overflow-hidden p-6">
                {/* ícone gigante de fundo */}
                <Icon className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 text-white/[0.035] transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110" strokeWidth={1} aria-hidden />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-white to-[#9a9a9a] text-ink-950 shadow-[0_8px_30px_-8px_rgba(255,255,255,0.4)]">
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="relative mt-6 text-lg font-semibold leading-snug text-white">{title}</h3>
                <p className="relative mt-2 text-[15px] leading-relaxed text-mute">{text}</p>
                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {tags.map((t) => <span key={t} className="rounded-full border border-line-strong px-2.5 py-1 text-[11px] text-soft/80">{t}</span>)}
                </div>
              </GlowCard>
            </Reveal>
          ))}
          <Reveal as="li" delay={210}>
            <a
              href={whatsappLink(WA_MESSAGES.orcamento)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full min-h-56 flex-col justify-between rounded-[1.25rem] bg-white p-6 text-ink-950 transition-transform duration-500 hover:-translate-y-1"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink-950 text-white">
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" aria-hidden />
              </span>
              <span>
                <span className="block font-display text-lg font-semibold leading-snug">Seu segmento não está aqui?</span>
                <span className="mt-2 block text-[15px] leading-relaxed text-ink-950/65">Conte sobre o seu negócio e montamos a estrutura ideal.</span>
              </span>
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
