import { ArrowUpRight, Info, Plus } from "lucide-react";
import { ADDONS, CONDITIONS, PLANS } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlanCard } from "@/components/pricing/PlanCard";
import { Sparkle } from "./HeroArt";
import { whatsappLink, WA_MESSAGES } from "@/lib/whatsapp";

function Comparison() {
  const rows: [string, string, string, string][] = [
    ["Páginas", "Até 3", "Até 6", "Até 10"],
    ["Design", "Moderno e profissional", "Personalizado à identidade", "Exclusivo e sofisticado"],
    ["SEO", "Configuração básica", "Páginas e conteúdos", "Otimização avançada"],
    ["Google Analytics", "—", "Configurado", "Ferramentas de análise"],
    ["Catálogo digital", "—", "—", "Incluso"],
    ["Suporte", "Para eventuais problemas", "Prioritário", "Prioritário"],
  ];
  return (
    <Reveal className="card mt-10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">Comparativo resumido entre os planos</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="px-5 py-4 font-medium text-mute">Comparativo rápido</th>
              {PLANS.map((p) => (
                <th key={p.id} scope="col" className={`px-5 py-4 font-semibold ${p.featured ? "text-white" : "text-soft"}`}>{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, ...vals]) => (
              <tr key={label} className="border-b border-line last:border-0">
                <th scope="row" className="px-5 py-3.5 font-medium text-mute">{label}</th>
                {vals.map((v, i) => (
                  <td key={i} className={`px-5 py-3.5 ${v === "—" ? "text-white/25" : i === 1 ? "text-white" : "text-soft/80"}`}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

export function Pricing() {
  return (
    <section id="planos" aria-labelledby="planos-title" className="relative overflow-hidden border-t border-line section-alt py-24 sm:py-32">
      <div className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-[30%] h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[130px]" aria-hidden />
      <div className="container-x relative">
        <Sparkle id="pr1" size={84} className="pointer-events-none absolute left-[6%] top-0 hidden animate-float-slow md:block" />
        <Sparkle id="pr2" size={46} className="pointer-events-none absolute right-[10%] top-24 hidden animate-float [animation-delay:-4s] md:block" />
        <SectionHeading
          id="planos-title"
          eyebrow="Planos e preços"
          title="Escolha a solução ideal para o seu negócio."
          text="Planos transparentes, desenvolvimento personalizado e acompanhamento técnico para sua presença digital."
          align="center"
        />

        <div className="mt-16 grid items-start gap-5 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 100} className="h-full">
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>

        <Comparison />

        {/* Serviços adicionais */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h3 className="text-chrome text-3xl font-semibold sm:text-4xl">Serviços adicionais</h3>
            <p className="mt-4 max-w-md leading-relaxed text-mute">
              Precisa de algo além do plano? Estes serviços podem ser contratados separadamente, a qualquer momento.
            </p>
          </Reveal>
          <ul className="grid gap-3 sm:grid-cols-2">
            {ADDONS.map((a, i) => (
              <Reveal as="li" key={a.name} delay={i * 50}>
                <a
                  href={whatsappLink(WA_MESSAGES.adicional(a.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover group flex h-full items-start gap-4 p-5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line-strong text-white transition-colors group-hover:bg-white group-hover:text-ink-950">
                    <Plus className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-medium text-white">{a.name}</span>
                    <span className="mt-1 text-sm text-mute">{a.price}</span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-white" aria-hidden />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Condições comerciais */}
        <Reveal className="mt-16 rounded-2xl border border-line bg-ink-950/60 p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <p className="flex items-center gap-2 font-display text-lg font-semibold text-white">
                <Info className="h-5 w-5" aria-hidden /> Condições comerciais
              </p>
              <p className="mt-2 text-sm leading-relaxed text-mute">Transparência desde o primeiro contato. Sem custos escondidos.</p>
              <a href={whatsappLink(WA_MESSAGES.orcamento)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm mt-5">
                Tirar dúvidas <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <ul className="grid flex-1 gap-x-8 gap-y-3 text-sm leading-relaxed text-soft/80 sm:grid-cols-2 md:max-w-2xl">
              {CONDITIONS.map((c) => (
                <li key={c} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
