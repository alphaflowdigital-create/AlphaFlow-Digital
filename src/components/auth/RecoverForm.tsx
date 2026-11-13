"use client";
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isEmail, translateAuthError } from "@/lib/auth";
import { FormAlert } from "./AuthShell";

export function RecoverForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) { setError("Informe um e-mail válido."); return; }
    const supabase = createClient();
    if (!supabase) return;
    setLoading(true); setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${location.origin}/auth/confirm?next=/redefinir-senha`,
    });
    setLoading(false);
    // Erros de limite/rede são exibidos; para os demais, resposta neutra (não revela se o e-mail existe).
    if (error && /rate|network|fetch/i.test(error.message)) { setError(translateAuthError(error.message)); return; }
    setDone(true);
  }

  if (done) {
    return (
      <FormAlert kind="success">
        Se houver uma conta associada a <strong>{email.trim()}</strong>, você receberá um e-mail com o link para criar uma nova senha. O link expira em pouco tempo.
      </FormAlert>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      {error && <FormAlert kind="error">{error}</FormAlert>}
      <div>
        <label htmlFor="email" className="label">E-mail da conta</label>
        <input id="email" type="email" autoComplete="email" className="field" value={email} onChange={(e) => { setEmail(e.target.value); setError(null); }} />
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary h-12 w-full">
        {loading ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Enviando…</> : "Enviar link de recuperação"}
      </button>
    </form>
  );
}
