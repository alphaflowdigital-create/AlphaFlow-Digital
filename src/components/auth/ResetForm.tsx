"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { translateAuthError, validatePassword } from "@/lib/auth";
import { FormAlert } from "./AuthShell";
import { PasswordInput } from "./PasswordInput";

/** Só é renderizado quando há uma sessão de recuperação válida (verificado no servidor). */
export function ResetForm() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = validatePassword(pw);
    if (v) { setError(v); return; }
    if (pw !== confirm) { setError("As senhas não conferem."); return; }
    const supabase = createClient();
    if (!supabase) return;
    setLoading(true); setError(null);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setLoading(false);
    if (error) { setError(translateAuthError(error.message)); return; }
    setDone(true);
    setTimeout(() => { router.replace("/area-do-cliente"); router.refresh(); }, 1600);
  }

  if (done) return <FormAlert kind="success">Senha atualizada com sucesso! Redirecionando para a área do cliente…</FormAlert>;

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      {error && <FormAlert kind="error">{error}</FormAlert>}
      <div>
        <label htmlFor="pw" className="label">Nova senha</label>
        <PasswordInput id="pw" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} />
        <p className="mt-1.5 text-xs text-mute">Mínimo de 8 caracteres, com letras e números.</p>
      </div>
      <div>
        <label htmlFor="confirm" className="label">Confirmar nova senha</label>
        <PasswordInput id="confirm" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary h-12 w-full">
        {loading ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Salvando…</> : "Salvar nova senha"}
      </button>
      <p className="text-center text-xs text-mute"><Link href="/area-do-cliente" className="hover:text-white">Cancelar</Link></p>
    </form>
  );
}
