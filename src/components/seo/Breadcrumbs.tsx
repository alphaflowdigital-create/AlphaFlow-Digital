import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbJsonLd } from "./JsonLd";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Início", path: "/" }, ...items];
  return (
    <>
      <BreadcrumbJsonLd items={all} />
      <nav aria-label="Trilha de navegação" className="text-sm text-mute">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((it, i) => (
            <li key={it.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/30" aria-hidden />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-white">{it.name}</span>
              ) : (
                <Link href={it.path} className="hover:text-white">{it.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
