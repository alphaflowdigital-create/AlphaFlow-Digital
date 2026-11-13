import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { RecoverForm } from "@/components/auth/RecoverForm";

export const metadata: Metadata = {
  title: "Recuperar senha",
  description: "Receba um link para criar uma nova senha da área do cliente AlphaFlow Digital.",
  alternates: { canonical: "/recuperar-senha" },
  robots: { index: false, follow: true },
};

export default function RecuperarSenhaPage() {
  return (
    <AuthShell
      title="Recuperar senha"
      subtitle="Informe o e-mail da sua conta e enviaremos um link para você criar uma nova senha."
      footer={<>Lembrou a senha? <Link href="/login" className="text-white underline underline-offset-4">Entrar</Link></>}
    >
      <RecoverForm />
    </AuthShell>
  );
}
