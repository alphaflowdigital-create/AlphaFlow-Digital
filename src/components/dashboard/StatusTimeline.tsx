import { Check } from "lucide-react";
import { PROJECT_STATUS, type ProjectStatus } from "@/content/site";

export function StatusTimeline({ status }: { status: ProjectStatus }) {
  const idx = PROJECT_STATUS.findIndex((s) => s.id === status);
  return (
    <ol className="grid gap-3 sm:grid-cols-7 sm:gap-0" aria-label="Etapas do projeto">
      {PROJECT_STATUS.map((s, i) => {
        const done = i < idx, current = i === idx;
        return (
          <li key={s.id} className="relative flex items-center gap-3 sm:flex-col sm:gap-2 sm:text-center" aria-current={current ? "step" : undefined}>
            {i < PROJECT_STATUS.length - 1 && (
              <span className={`absolute left-1/2 top-3.5 hidden h-px w-full sm:block ${done ? "bg-white/70" : "bg-white/10"}`} aria-hidden />
            )}
            <span className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[11px] font-bold ${
              done ? "border-white bg-white text-ink-950" : current ? "border-white bg-ink-950 text-white shadow-[0_0_0_4px_rgba(255,255,255,0.12)]" : "border-line-strong bg-ink-950 text-mute"
            }`}>
              {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /> : i + 1}
            </span>
            <span className={`text-xs leading-tight ${current ? "font-semibold text-white" : done ? "text-soft" : "text-mute"}`}>
              {s.label}
              {done && <span className="sr-only"> (concluído)</span>}
              {current && <span className="sr-only"> (etapa atual)</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
