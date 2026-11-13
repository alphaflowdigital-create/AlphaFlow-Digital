import Link from "next/link";
import { ArrowUpRight, Calendar, FolderKanban, Globe, LifeBuoy, Sparkles } from "lucide-react";
import { requireSession, type Project } from "@/lib/data";
import { PLANS, PROJECT_STATUS, formatBRL } from "@/content/site";
import { StatusTimeline } from "@/components/dashboard/StatusTimeline";
import { whatsappLink, WA_MESSAGES } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export const metadata = { title: "Painel" };

const fmtDate = (d: string | null) => (d ? new Date(`${d}T12:00:00`).toLocaleDateString("pt-BR") : "—");

export default async function PainelPage() {
  const { supabase, user, profile } = await requireSession();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false })
    .returns<Project[]>();

  const firstName = (profile?.full_name || "").split(" ")[0];

  return (
    <div className="space-y-10">
      <section>
        <p className="text-sm text-mute">Painel do cliente</p>
        <h1 className="text-chrome mt-1 text-3xl font-semibold sm:text-4xl">Olá{firstName ? `, ${firstName}` : ""}.</h1>
        <p className="mt-2 text-mute">Acompanhe aqui o andamento do seu projeto com a AlphaFlow Digital.</p>
      </section>

      {error && (
        <p role="alert" className="rounded-xl border border-[#ff8a8a]/40 bg-[#ff6b6b]/[0.07] p-4 text-sm text-soft">
          Não foi possível carregar seus projetos agora. Atualize a página em instantes.
        </p>
      )}

      {!error && (!projects || projects.length === 0) && (
        <section className="card flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line-strong bg-white/[0.04]"><FolderKanban className="h-6 w-6 text-white" aria-hidden /></span>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white">Nenhum projeto vinculado à sua conta ainda</h2>
            <p className="mt-2 max-w-xl leading-relaxed text-mute">
              Assim que seu projeto for contratado, a equipe AlphaFlow vincula ele a esta conta e você poderá acompanhar cada etapa por aqui.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <Link href="/#planos" className="btn btn-primary btn-sm">Conhecer os planos</Link>
            <a href={whatsappLink(WA_MESSAGES.suporte)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">Falar com a AlphaFlow</a>
          </div>
        </section>
      )}

      {projects?.map((p) => {
        const plan = PLANS.find((x) => x.id === p.plan);
        const statusLabel = PROJECT_STATUS.find((s) => s.id === p.status)?.label;
        return (
          <section key={p.id} aria-labelledby={`proj-${p.id}`} className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <div className="card p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-mute">Projeto</p>
                  <h2 id={`proj-${p.id}`} className="mt-1 text-2xl font-semibold text-white">{p.name}</h2>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink-950">{statusLabel}</span>
              </div>
              <div className="mt-8"><StatusTimeline status={p.status} /></div>
              {p.notes && (
                <div className="mt-8 rounded-xl border border-line bg-white/[0.02] p-4">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mute"><Sparkles className="h-3.5 w-3.5" aria-hidden /> Atualização da equipe</p>
                  <p className="mt-2 whitespace-pre-line leading-relaxed text-soft">{p.notes}</p>
                </div>
              )}
              <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
                <div><dt className="flex items-center gap-1.5 text-mute"><Calendar className="h-3.5 w-3.5" aria-hidden /> Início</dt><dd className="mt-1 text-white">{fmtDate(p.started_at)}</dd></div>
                <div><dt className="flex items-center gap-1.5 text-mute"><Calendar className="h-3.5 w-3.5" aria-hidden /> Publicação</dt><dd className="mt-1 text-white">{fmtDate(p.published_at)}</dd></div>
                <div><dt className="flex items-center gap-1.5 text-mute"><Globe className="h-3.5 w-3.5" aria-hidden /> Endereço</dt><dd className="mt-1 truncate text-white">
                  {p.published_url ? <a href={p.published_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4">{p.domain || p.published_url} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a> : p.domain || "—"}
                </dd></div>
              </dl>
            </div>

            <aside className="space-y-5">
              {plan && (
                <div className="card p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-mute">Plano contratado</p>
                  <p className="mt-1 text-xl font-semibold text-white">{plan.name}</p>
                  <p className="mt-1 text-sm text-mute">{plan.pages} · mensalidade de {formatBRL(plan.monthly)}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {plan.monthlyServices.map((s) => <li key={s} className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-soft/80">{s}</li>)}
                  </ul>
                </div>
              )}
              <div className="card p-6">
                <p className="flex items-center gap-2 font-semibold text-white"><LifeBuoy className="h-4 w-4" aria-hidden /> Precisa de ajuda?</p>
                <p className="mt-2 text-sm leading-relaxed text-mute">Fale com o suporte AlphaFlow sobre ajustes, dúvidas ou problemas no seu site.</p>
                <a href={whatsappLink(`${WA_MESSAGES.suporte} Projeto: ${p.name}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm mt-4 w-full">
                  <WhatsAppIcon className="h-4 w-4" /> Contatar o suporte
                </a>
              </div>
            </aside>
          </section>
        );
      })}

    </div>
  );
}
