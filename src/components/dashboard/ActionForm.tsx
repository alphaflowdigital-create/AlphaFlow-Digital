"use client";
import { useActionState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import type { ActionState } from "@/app/area-do-cliente/actions";

/** Formulário ligado a uma Server Action, com estado de carregamento e mensagens. */
export function ActionForm({
  action, children, submitLabel, className = "",
}: {
  action: (state: ActionState, fd: FormData) => Promise<ActionState>;
  children: ReactNode;
  submitLabel: string;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form action={formAction} className={className}>
      {children}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className="btn btn-primary btn-sm">
          {pending ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Salvando…</> : submitLabel}
        </button>
        <p aria-live="polite" className={`text-sm ${state?.error ? "text-[#ff8a8a]" : "text-soft"}`}>
          {state?.error ?? state?.message ?? ""}
        </p>
      </div>
    </form>
  );
}
