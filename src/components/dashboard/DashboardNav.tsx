"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShieldCheck, UserRound, ExternalLink } from "lucide-react";

export function DashboardNav({ isAdmin }: { isAdmin: boolean }) {
  const path = usePathname();
  const items = [
    { href: "/area-do-cliente", label: "Painel", icon: LayoutDashboard },
    { href: "/area-do-cliente/conta", label: "Minha conta", icon: UserRound },
    ...(isAdmin ? [{ href: "/area-do-cliente/admin", label: "Administração", icon: ShieldCheck }] : []),
  ];
  return (
    <nav aria-label="Área do cliente" className="-mb-px flex gap-1 overflow-x-auto">
      {items.map(({ href, label, icon: Icon }) => {
        const active = path === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-sm transition-colors ${active ? "border-white text-white" : "border-transparent text-mute hover:text-white"}`}
          >
            <Icon className="h-4 w-4" aria-hidden /> {label}
          </Link>
        );
      })}
      <Link href="/" className="ml-auto flex items-center gap-2 whitespace-nowrap px-3 py-3 text-sm text-mute hover:text-white">
        Ver site <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </nav>
  );
}
