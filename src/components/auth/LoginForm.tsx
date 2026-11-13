"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isEmail, translateAuthError } from "@/lib/auth";
import { FormAlert } from "./AuthShell";
import { PasswordInput } from "./PasswordInput";

export function LoginForm({ next, notice }: { next: string; notice?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [msg, setMsg] = useState<{ kind: "error" | "success"; text: string } | null>(notice ? { kind: "success", text: notice } : null);
  const [loading, setLoading] = useState(false);
  const [unconfirmed, setUnconfirmed] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!isEmail(email)) errs.email = "Informe um e-mail válido.";
    if (!password) errs.password = "Informe sua senha.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const supabase = createClient();
    if (!supabase) return;
    setLoading(true); setMsg(null); setUnconfirmed(false);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) {
      setLoading(false);
      setUnconfirmed(error.message.toLowerCase().includes("not confirmed"));
      setMsg({ kind: "error", text: translateAuthError(error.message) });
      return;
    }
    router.replace(next);
    router.refresh();
  }

  async function resend() {
    const supabase = createClient();
    if (!supabase) return;
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email.trim(),
      options: { emailRedirectTo: `${location.origin}/auth/confirm?next=/area-do-cliente` },
    });
    setMsg(error ? { kind: "error", text: translateAuthError(error.message) } : { kind: "success", text: "Enviamos um novo link de confirmação para o seu e-mail." });
    setUnconfirmed(false);
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      {msg && <FormAlert kind={msg.kind}>{msg.text}</FormAlert>}
      {unconfirmed && (
        <button type="button" onClick={resend} className="text-sm text-white underline underline-offset-4">Reenviar e-mail de confirmação</button>
      )}
      <div>
        <label htmlFor="email" className="label">E-mail</label>
        <input id="email" type="email" autoComplete="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email || undefined} aria-describedby={errors.email ? "email-err" : undefined} />
        {errors.email && <p id="email-err" className="field-error">{errors.email}</p>}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="label">Senha</label>
          <Link href="/recuperar-senha" className="mb-1.5 text-xs text-mute hover:text-white">Esqueci minha senha</Link>
        </div>
        <PasswordInput id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={!!errors.password || undefined} aria-describedby={errors.password ? "password-err" : undefined} />
        {errors.password && <p id="password-err" className="field-error">{errors.password}</p>}
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary h-12 w-full">
        {loading ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Entrando…</> : <><LogIn className="h-4 w-4" aria-hidden /> Entrar</>}
      </button>
    </form>
  );
}
