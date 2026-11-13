import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Criar conta",
  description: "Crie sua conta na área do cliente AlphaFlow Digital.",
  alternates: { canonical: "/cadastro" },
  robots: { index: false, follow: true },
};

export default function CadastroPage() {
  return (
    <AuthShell
      title="Criar conta"
      subtitle="Cadastro para clientes AlphaFlow acompanharem seus projetos. Para conhecer os planos ou pedir orçamento, não é preciso conta."
      footer={<>Já tem conta? <Link href="/login" className="text-white underline underline-offset-4">Entrar</Link></>}
    >
      <SignupForm />
    </AuthShell>
  );
}
