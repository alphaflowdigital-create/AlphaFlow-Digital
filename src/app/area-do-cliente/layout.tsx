import type { Metadata } from "next";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { requireSession } from "@/lib/data";
import { signOut } from "./actions";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export const metadata: Metadata = {
  title: { default: "Área do cliente", template: "%s | Área do cliente AlphaFlow" },
  robots: { index: false, follow: false },
};

export default async function ClientAreaLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, isAdmin } = await requireSession();
  const name = profile?.full_name || user.email;

  return (
    <div className="min-h-dvh bg-ink-950">
      <header className="sticky top-0 z-40 border-b border-line bg-ink-950/80 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <Logo href="/area-do-cliente" />
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[220px] truncate text-sm text-mute sm:block" title={user.email}>{name}</span>
            <form action={signOut}>
              <button type="submit" className="btn btn-ghost btn-sm"><LogOut className="h-4 w-4" aria-hidden /> Sair</button>
            </form>
          </div>
        </div>
        <div className="container-x"><DashboardNav isAdmin={isAdmin} /></div>
      </header>
      <main id="conteudo" className="container-x py-10 sm:py-14">{children}</main>
    </div>
  );
}
