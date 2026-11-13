import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { safeNext } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Entrar na área do cliente",
  description: "Acesse a área do cliente AlphaFlow Digital para acompanhar o desenvolvimento do seu site.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

const NOTICES: Record<string, string> = {
  confirmado: "E-mail confirmado! Agora é só entrar.",
  "senha-alterada": "Senha alterada. Entre com a nova senha.",
  saiu: "Você saiu da sua conta.",
};
const ERRORS: Record<string, string> = {
  "link-invalido": "O link de confirmação expirou ou é inválido. Solicite um novo.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; msg?: string; erro?: string }> }) {
  const sp = await searchParams;
  const notice = sp.msg ? NOTICES[sp.msg] : undefined;
  const error = sp.erro ? ERRORS[sp.erro] : undefined;
  return (
    <AuthShell
      title="Área do cliente"
      subtitle="Entre para acompanhar o status do seu projeto e falar com o suporte."
      footer={<>Ainda não tem conta? <Link href="/cadastro" className="text-white underline underline-offset-4">Criar conta</Link></>}
    >
      {error && <p role="alert" className="mb-5 rounded-xl border border-[#ff8a8a]/40 bg-[#ff6b6b]/[0.07] p-3.5 text-sm text-soft">{error}</p>}
      <LoginForm next={safeNext(sp.next)} notice={notice} />
    </AuthShell>
  );
}
