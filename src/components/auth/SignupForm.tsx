"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2, MailCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isEmail, translateAuthError, validatePassword } from "@/lib/auth";
import { FormAlert } from "./AuthShell";
import { PasswordInput } from "./PasswordInput";

type Fields = { name: string; company: string; email: string; password: string; confirm: string; consent: boolean };
type Errs = Partial<Record<keyof Fields, string>>;

export function SignupForm() {
  const router = useRouter();
  const [f, setF] = useState<Fields>({ name: "", company: "", email: "", password: "", confirm: "", consent: false });
  const [errors, setErrors] = useState<Errs>({});
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => { setF((s) => ({ ...s, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: Errs = {};
    if (f.name.trim().length < 2) errs.name = "Informe seu nome.";
    if (!isEmail(f.email)) errs.email = "Informe um e-mail válido.";
    const pw = validatePassword(f.password);
    if (pw) errs.password = pw;
    if (f.confirm !== f.password) errs.confirm = "As senhas não conferem.";
    if (!f.consent) errs.consent = "É necessário aceitar a política de privacidade.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const supabase = createClient();
    if (!supabase) return;
    setLoading(true); setMsg(null);
    const { data, error } = await supabase.auth.signUp({
      email: f.email.trim(),
      password: f.password,
      options: {
        data: { full_name: f.name.trim(), company: f.company.trim() },
        emailRedirectTo: `${location.origin}/auth/confirm?next=/area-do-cliente`,
      },
    });
    setLoading(false);
    if (error) { setMsg(translateAuthError(error.message)); return; }
    // Quando a confirmação de e-mail está desativada no Supabase, a sessão já vem pronta.
    if (data.session) { router.replace("/area-do-cliente"); router.refresh(); return; }
    setSentTo(f.email.trim());
  }

  if (sentTo) {
    return (
      <div className="text-center" role="status">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-ink-950"><MailCheck className="h-6 w-6" aria-hidden /></span>
        <p className="mt-5 text-lg font-semibold text-white">Confirme seu e-mail</p>
        <p className="mt-2 text-sm leading-relaxed text-mute">
          Enviamos um link de confirmação para <strong className="text-white">{sentTo}</strong>. Abra o e-mail para ativar sua conta. Se não encontrar, verifique a caixa de spam.
        </p>
        <Link href="/login" className="btn btn-ghost mt-6 w-full">Ir para o login</Link>
      </div>
    );
  }

  const err = (k: keyof Fields) => errors[k] && <p id={`${k}-err`} className="field-error">{errors[k]}</p>;
  const aria = (k: keyof Fields) => ({ "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      {msg && <FormAlert kind="error">{msg}</FormAlert>}
      <div>
        <label htmlFor="name" className="label">Nome completo</label>
        <input id="name" className="field" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="company" className="label">Empresa <span className="text-mute">(opcional)</span></label>
        <input id="company" className="field" autoComplete="organization" value={f.company} onChange={(e) => set("company", e.target.value)} />
      </div>
      <div>
        <label htmlFor="email" className="label">E-mail</label>
        <input id="email" type="email" className="field" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="password" className="label">Senha</label>
        <PasswordInput id="password" autoComplete="new-password" value={f.password} onChange={(e) => set("password", e.target.value)} {...aria("password")} />
        {err("password") || <p className="mt-1.5 text-xs text-mute">Mínimo de 8 caracteres, com letras e números.</p>}
      </div>
      <div>
        <label htmlFor="confirm" className="label">Confirmar senha</label>
        <PasswordInput id="confirm" autoComplete="new-password" value={f.confirm} onChange={(e) => set("confirm", e.target.value)} {...aria("confirm")} />
        {err("confirm")}
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-mute">
          <input id="consent" type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-4 w-4 accent-white" {...aria("consent")} />
          <span>Li e concordo com a <Link href="/privacidade" className="text-white underline underline-offset-4">Política de Privacidade</Link>.</span>
        </label>
        {err("consent")}
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary h-12 w-full">
        {loading ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Criando conta…</> : "Criar conta"}
      </button>
    </form>
  );
}
