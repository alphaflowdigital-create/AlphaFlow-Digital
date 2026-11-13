import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Settings2 } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { whatsappLink, WA_MESSAGES } from "@/lib/whatsapp";

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle?: ReactNode; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-chrome text-3xl font-semibold leading-tight sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 leading-relaxed text-mute">{subtitle}</p>}
      <div className="card mt-8 p-6 sm:p-8">{isSupabaseConfigured ? children : <NotConfigured />}</div>
      {footer && <div className="mt-6 text-center text-sm text-mute">{footer}</div>}
      <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm text-mute hover:text-white">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Voltar ao site
      </Link>
    </div>
  );
}

/** Exibido enquanto as credenciais do Supabase não forem configuradas. Nada é simulado. */
function NotConfigured() {
  return (
    <div className="text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-line-strong bg-white/[0.04]"><Settings2 className="h-5 w-5 text-white" aria-hidden /></span>
      <p className="mt-5 font-semibold text-white">Área do cliente em configuração</p>
      <p className="mt-2 text-sm leading-relaxed text-mute">
        O acesso de clientes será liberado em breve. Enquanto isso, fale com a AlphaFlow pelo WhatsApp para acompanhar seu projeto.
      </p>
      <a href={whatsappLink(WA_MESSAGES.suporte)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6 w-full">Falar com o suporte</a>
    </div>
  );
}

export function FormAlert({ kind, children }: { kind: "error" | "success"; children: ReactNode }) {
  return (
    <div role={kind === "error" ? "alert" : "status"} className={`rounded-xl border p-3.5 text-sm leading-relaxed ${kind === "error" ? "border-[#ff8a8a]/40 bg-[#ff6b6b]/[0.07] text-soft" : "border-white/25 bg-white/[0.06] text-white"}`}>
      {children}
    </div>
  );
}
