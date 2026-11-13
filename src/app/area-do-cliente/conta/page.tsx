import Link from "next/link";
import { KeyRound } from "lucide-react";
import { requireSession } from "@/lib/data";
import { ActionForm } from "@/components/dashboard/ActionForm";
import { updateProfile } from "../actions";

export const metadata = { title: "Minha conta" };

export default async function ContaPage() {
  const { user, profile } = await requireSession();
  const created = new Date(user.created_at).toLocaleDateString("pt-BR");

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <section className="card p-6 sm:p-8" aria-labelledby="conta-title">
        <h1 id="conta-title" className="text-2xl font-semibold text-white">Dados da conta</h1>
        <p className="mt-1 text-sm text-mute">Mantenha seus dados atualizados para facilitar o contato.</p>
        <ActionForm action={updateProfile} submitLabel="Salvar alterações" className="mt-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="full_name" className="label">Nome completo</label>
              <input id="full_name" name="full_name" required minLength={2} maxLength={120} defaultValue={profile?.full_name ?? ""} className="field" autoComplete="name" />
            </div>
            <div>
              <label htmlFor="company" className="label">Empresa</label>
              <input id="company" name="company" maxLength={160} defaultValue={profile?.company ?? ""} className="field" autoComplete="organization" />
            </div>
            <div>
              <label htmlFor="phone" className="label">Telefone / WhatsApp</label>
              <input id="phone" name="phone" type="tel" maxLength={20} defaultValue={profile?.phone ?? ""} className="field" autoComplete="tel" />
            </div>
          </div>
        </ActionForm>
      </section>

      <aside className="space-y-5">
        <div className="card p-6">
          <dl className="space-y-4 text-sm">
            <div><dt className="text-mute">E-mail de acesso</dt><dd className="mt-1 break-all text-white">{user.email}</dd></div>
            <div><dt className="text-mute">Conta criada em</dt><dd className="mt-1 text-white">{created}</dd></div>
            <div><dt className="text-mute">Tipo de acesso</dt><dd className="mt-1 text-white">{profile?.role === "admin" ? "Administrador" : "Cliente"}</dd></div>
          </dl>
        </div>
        <div className="card p-6">
          <p className="flex items-center gap-2 font-semibold text-white"><KeyRound className="h-4 w-4" aria-hidden /> Senha</p>
          <p className="mt-2 text-sm text-mute">Para trocar sua senha, você receberá um link seguro por e-mail.</p>
          <Link href="/recuperar-senha" className="btn btn-ghost btn-sm mt-4">Alterar senha</Link>
        </div>
      </aside>
    </div>
  );
}
