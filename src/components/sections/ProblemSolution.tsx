import { Clock, MapPin, MessageCircle, Search, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { PROBLEMS } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function VisualSearch() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-6">
      <div className="flex items-center gap-2 rounded-full border border-line-strong bg-ink-950/80 px-4 py-2.5 text-xs text-mute">
        <Search className="h-3.5 w-3.5" aria-hidden /> sua empresa perto de mim
      </div>
      <div className="space-y-2 rounded-xl border border-dashed border-white/15 p-3">
        <div className="h-2 w-2/3 rounded-full bg-white/10" />
        <div className="h-2 w-1/2 rounded-full bg-white/[0.06]" />
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-line-strong bg-white/[0.04] p-3">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-ink-950"><Sparkles className="h-3.5 w-3.5" /></span>
        <div className="flex-1 space-y-1.5"><div className="h-2 w-3/4 rounded-full bg-white/70" /><div className="h-1.5 w-1/2 rounded-full bg-white/20" /></div>
      </div>
    </div>
  );
}

function VisualChips() {
  const chips = [
    { t: "Serviços", i: Wrench }, { t: "Contato", i: MessageCircle }, { t: "Localização", i: MapPin },
    { t: "Horários", i: Clock }, { t: "Diferenciais", i: Sparkles },
  ];
  return (
    <div className="flex h-full flex-wrap content-center justify-center gap-2 px-5">
      {chips.map(({ t, i: Icon }, idx) => (
        <span key={t} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${idx === 2 ? "border-white bg-white text-ink-950" : "border-line-strong bg-ink-950/70 text-soft"}`}>
          <Icon className="h-3 w-3" aria-hidden /> {t}
        </span>
      ))}
    </div>
  );
}

function VisualStack() {
  return (
    <div className="relative flex h-full items-center justify-center">
      {[-10, 0, 10].map((rot, i) => (
        <div key={rot} className="card absolute flex w-44 items-center gap-2.5 rounded-xl px-3 py-2.5" style={{ transform: `rotate(${rot}deg) translate(${(i - 1) * 26}px, ${(i - 1) * -10}px)`, zIndex: i === 1 ? 2 : 1 }}>
          <ShieldCheck className={`h-4 w-4 ${i === 1 ? "text-white" : "text-mute"}`} aria-hidden />
          <div className="flex-1 space-y-1.5"><div className={`h-1.5 rounded-full ${i === 1 ? "w-4/5 bg-white/80" : "w-3/5 bg-white/20"}`} /><div className="h-1.5 w-1/2 rounded-full bg-white/10" /></div>
        </div>
      ))}
    </div>
  );
}

const VISUALS = [VisualSearch, VisualChips, VisualStack];

export function ProblemSolution() {
  return (
    <section aria-labelledby="problema-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="problema-title"
          eyebrow="O cenário"
          title={<>Seu cliente procura sua empresa. O que ele encontra?</>}
          text="Hoje, ter presença digital faz diferença na forma como uma empresa é encontrada, conhecida e avaliada. Um site profissional permite apresentar seus serviços, transmitir confiança e facilitar o contato com potenciais clientes."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PROBLEMS.map((p, i) => {
            const Visual = VISUALS[i];
            return (
              <Reveal key={p.title} delay={i * 90} className="card card-hover flex flex-col overflow-hidden">
                <div className="card-stripes relative h-48 border-b border-line bg-gradient-to-b from-white/[0.03] to-transparent">
                  <Visual />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-display text-xs font-semibold text-mute">0{i + 1}</span>
                  <h3 className="mt-2 text-xl font-semibold leading-snug text-white">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-mute">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
