import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell, FormAlert } from "@/components/auth/AuthShell";
import { ResetForm } from "@/components/auth/ResetForm";
import { createClient } from "@/lib/supabase/server";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "Redefinir senha",
  robots: { index: false, follow: false },
};

export default async function RedefinirSenhaPage() {
  await connection();
  const supabase = await createClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  return (
    <AuthShell title="Criar nova senha" subtitle="Escolha uma nova senha para acessar a área do cliente.">
      {user ? (
        <ResetForm />
      ) : (
        <div className="space-y-5">
          <FormAlert kind="error">Este link de redefinição é inválido ou expirou. Solicite um novo para continuar.</FormAlert>
          <Link href="/recuperar-senha" className="btn btn-primary w-full">Solicitar novo link</Link>
        </div>
      )}
    </AuthShell>
  );
}
