import { requireAdmin, type Lead, type Profile, type Project } from "@/lib/data";
import { PLANS, PLAN_LABEL, PROJECT_STATUS } from "@/content/site";
import { PLAN_OPTIONS } from "@/lib/lead";
import { ActionForm } from "@/components/dashboard/ActionForm";
import { createProject, updateLeadStatus, updateProject } from "../actions";

export const metadata = { title: "Administração" };

const LEAD_STATUS = [
  { id: "novo", label: "Novo" }, { id: "em_contato", label: "Em contato" },
  { id: "convertido", label: "Convertido" }, { id: "descartado", label: "Descartado" },
];

export default async function AdminPage() {
  const { supabase } = await requireAdmin();
  const [{ data: clients }, { data: projects }, { data: leads }] = await Promise.all([
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).returns<Profile[]>(),
    supabase.from("projects").select("*").order("updated_at", { ascending: false }).returns<Project[]>(),
    supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(50).returns<Lead[]>(),
  ]);
  const clientName = (id: string) => {
    const c = clients?.find((x) => x.id === id);
    return c ? `${c.full_name ?? "Sem nome"}${c.company ? ` — ${c.company}` : ""}` : "Cliente";
  };

  return (
    <div className="space-y-12">
      <header>
        <p className="text-sm text-mute">Restrito a administradores</p>
        <h1 className="text-chrome mt-1 text-3xl font-semibold sm:text-4xl">Administração</h1>
      </header>

      {/* Novo projeto */}
      <section className="card p-6 sm:p-8" aria-labelledby="novo-projeto">
        <h2 id="novo-projeto" className="text-xl font-semibold text-white">Vincular novo projeto a um cliente</h2>
        <p className="mt-1 text-sm text-mute">O cliente precisa ter criado a conta em /cadastro.</p>
        <ActionForm action={createProject} submitLabel="Criar projeto" className="mt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="client_id" className="label">Cliente</label>
              <select id="client_id" name="client_id" required className="field" defaultValue="">
                <option value="" disabled>Selecione</option>
                {clients?.map((c) => <option key={c.id} value={c.id}>{c.full_name ?? "Sem nome"}{c.company ? ` — ${c.company}` : ""}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="pname" className="label">Nome do projeto</label>
              <input id="pname" name="name" required minLength={2} maxLength={160} className="field" placeholder="Site institucional" />
            </div>
            <div>
              <label htmlFor="plan" className="label">Plano</label>
              <select id="plan" name="plan" required className="field" defaultValue="">
                <option value="" disabled>Selecione</option>
                {PLANS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>
        </ActionForm>
      </section>

      {/* Projetos */}
      <section aria-labelledby="projetos">
        <h2 id="projetos" className="text-xl font-semibold text-white">Projetos ({projects?.length ?? 0})</h2>
        {!projects?.length && <p className="mt-3 text-sm text-mute">Nenhum projeto cadastrado.</p>}
        <div className="mt-5 grid gap-4">
          {projects?.map((p) => (
            <details key={p.id} className="card group p-0 open:border-line-strong">
              <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 p-5">
                <span>
                  <span className="font-semibold text-white">{p.name}</span>
                  <span className="block text-sm text-mute">{clientName(p.client_id)} · {PLAN_LABEL[p.plan]}</span>
                </span>
                <span className="rounded-full border border-line-strong px-3 py-1 text-xs text-soft">{PROJECT_STATUS.find((s) => s.id === p.status)?.label}</span>
              </summary>
              <div className="border-t border-line p-5">
                <ActionForm action={updateProject} submitLabel="Salvar projeto">
                  <input type="hidden" name="id" value={p.id} />
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label htmlFor={`st-${p.id}`} className="label">Status</label>
                      <select id={`st-${p.id}`} name="status" defaultValue={p.status} className="field">
                        {PROJECT_STATUS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor={`dom-${p.id}`} className="label">Domínio</label>
                      <input id={`dom-${p.id}`} name="domain" defaultValue={p.domain ?? ""} className="field" placeholder="empresa.com.br" />
                    </div>
                    <div>
                      <label htmlFor={`url-${p.id}`} className="label">URL publicada</label>
                      <input id={`url-${p.id}`} name="published_url" type="url" defaultValue={p.published_url ?? ""} className="field" placeholder="https://" />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor={`notes-${p.id}`} className="label">Atualização visível ao cliente</label>
                      <textarea id={`notes-${p.id}`} name="notes" defaultValue={p.notes ?? ""} maxLength={2000} className="field min-h-24" />
                    </div>
                  </div>
                </ActionForm>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Orçamentos recebidos */}
      <section aria-labelledby="leads">
        <h2 id="leads" className="text-xl font-semibold text-white">Orçamentos recebidos</h2>
        {!leads?.length && <p className="mt-3 text-sm text-mute">Nenhuma solicitação recebida pelo formulário.</p>}
        <ul className="mt-5 grid gap-3">
          {leads?.map((l) => (
            <li key={l.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{l.company} <span className="font-normal text-mute">· {l.segment}</span></p>
                  <p className="text-sm text-mute">{l.name} · <a className="underline underline-offset-4" href={`mailto:${l.email}`}>{l.email}</a> · <a className="underline underline-offset-4" href={`https://wa.me/${l.whatsapp.length <= 11 ? `55${l.whatsapp}` : l.whatsapp}`} target="_blank" rel="noopener noreferrer">{l.whatsapp}</a></p>
                  <p className="mt-1 text-xs text-mute">{new Date(l.created_at).toLocaleString("pt-BR")} · {PLAN_OPTIONS.find((p) => p.value === l.plan)?.label ?? l.plan}</p>
                </div>
                <form action={updateLeadStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={l.id} />
                  <label htmlFor={`ls-${l.id}`} className="sr-only">Status do orçamento</label>
                  <select id={`ls-${l.id}`} name="status" defaultValue={l.status} className="field py-2 text-sm">
                    {LEAD_STATUS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                  <button type="submit" className="btn btn-ghost btn-sm">Atualizar</button>
                </form>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-soft/85">{l.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
