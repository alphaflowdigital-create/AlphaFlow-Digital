"use client";
import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Server } from "lucide-react";
import { formatBRL, type Plan } from "@/content/site";
import { whatsappLink, WA_MESSAGES } from "@/lib/whatsapp";

const VISIBLE = 6;

export function PlanCard({ plan }: { plan: Plan }) {
  const [expanded, setExpanded] = useState(false);
  const f = plan.featured;
  const items = expanded ? plan.includes : plan.includes.slice(0, VISIBLE);
  const hidden = plan.includes.length - VISIBLE;
  const [reais, cents] = formatBRL(plan.monthly).replace("R$", "").trim().split(",");

  return (
    <article
      aria-labelledby={`${plan.id}-name`}
      className={`relative flex h-full flex-col rounded-[1.5rem] p-2 transition-transform duration-500 ${
        f ? "bg-white text-ink-950 shadow-[0_40px_120px_-30px_rgba(255,255,255,0.35)] lg:-translate-y-4" : "card"
      }`}
    >
      {/* topo com preço */}
      <div className={`rounded-[1.1rem] p-6 sm:p-7 ${f ? "bg-[#f4f4f4]" : "border border-line bg-white/[0.02]"}`}>
        <div className="flex items-center justify-between gap-3">
          <h3 id={`${plan.id}-name`} className={`text-lg font-semibold ${f ? "text-ink-950" : "text-white"}`}>{plan.name}</h3>
          {f ? (
            <span className="rounded-full bg-ink-950 px-3 py-1 text-[11px] font-semibold text-white">Recomendado</span>
          ) : (
            <span className="rounded-full border border-line-strong px-3 py-1 text-[11px] text-mute">{plan.pages}</span>
          )}
        </div>

        <p className={`mt-6 text-xs font-medium uppercase tracking-wider ${f ? "text-ink-950/55" : "text-mute"}`}>Desenvolvimento · pagamento único</p>
        <p className={`mt-1 font-display text-[2.6rem] font-semibold leading-none tracking-tight ${f ? "text-ink-950" : "text-chrome"}`}>
          {formatBRL(plan.setup).replace(",00", "")}
        </p>

        <div className={`mt-4 flex items-baseline gap-1.5 border-t pt-4 ${f ? "border-ink-950/10" : "border-line"}`}>
          <span className={`text-sm ${f ? "text-ink-950/60" : "text-mute"}`}>+ R$</span>
          <span className={`font-display text-2xl font-semibold ${f ? "text-ink-950" : "text-white"}`}>{reais}<span className="text-base">,{cents}</span></span>
          <span className={`text-sm ${f ? "text-ink-950/60" : "text-mute"}`}>/mês após a publicação</span>
        </div>

        <p className={`mt-5 text-[15px] leading-relaxed ${f ? "text-ink-950/70" : "text-mute"}`}>{plan.description}</p>

        <a
          href={whatsappLink(WA_MESSAGES.plano(plan.name))}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn mt-6 h-12 w-full ${f ? "btn-dark" : "btn-primary"}`}
        >
          {plan.cta} <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      </div>

      {/* incluso */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-6 sm:px-6">
        <p className={`text-sm font-semibold ${f ? "text-ink-950" : "text-white"}`}>
          {plan.inheritsFrom ? <>Tudo do {plan.inheritsFrom}, mais:</> : "Incluso no projeto:"}
        </p>
        <ul id={`${plan.id}-list`} className="mt-4 space-y-3">
          {items.map((it) => (
            <li key={it} className={`flex gap-3 text-[14.5px] leading-snug ${f ? "text-ink-950/80" : "text-soft/85"}`}>
              <span className={`mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full ${f ? "bg-ink-950 text-white" : "bg-white/10 text-white"}`}>
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
              </span>
              {it}
            </li>
          ))}
        </ul>
        {hidden > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={`${plan.id}-list`}
            className={`mt-4 inline-flex items-center gap-1.5 self-start text-sm font-medium underline-offset-4 hover:underline ${f ? "text-ink-950" : "text-white"}`}
          >
            {expanded ? "Mostrar menos" : `Ver mais ${hidden} itens`}
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden />
          </button>
        )}

        <div className={`mt-6 rounded-xl p-4 ${f ? "bg-ink-950/[0.04]" : "border border-line bg-white/[0.02]"}`}>
          <p className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${f ? "text-ink-950/60" : "text-mute"}`}>
            <Server className="h-3.5 w-3.5" aria-hidden /> Serviços mensais
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {plan.monthlyServices.map((s) => (
              <li key={s} className={`rounded-full px-2.5 py-1 text-xs ${f ? "bg-white text-ink-950/80 ring-1 ring-ink-950/10" : "bg-white/[0.05] text-soft/80"}`}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
