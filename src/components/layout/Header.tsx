"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, UserRound, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV } from "@/content/site";
import { whatsappLink, WA_MESSAGES } from "@/lib/whatsapp";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "border-b border-line bg-ink-950/75 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink-950">
        Pular para o conteúdo
      </a>
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Logo priority />

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded-lg px-3 py-2 text-sm text-mute transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/login" className="btn btn-sm text-mute hover:text-white">
            <UserRound className="h-4 w-4" aria-hidden /> Área do cliente
          </Link>
          <a href={whatsappLink(WA_MESSAGES.orcamento)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            Solicitar orçamento <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong text-white lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-ink-950 lg:hidden"
      >
        <nav aria-label="Navegação móvel" className="container-x flex flex-col py-6">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="hero-in flex items-center justify-between border-b border-line py-4 font-display text-2xl font-medium tracking-tight text-white"
              style={{ "--d": `${i * 45}ms` } as React.CSSProperties}
            >
              {item.label}
              <ArrowUpRight className="h-5 w-5 text-mute" aria-hidden />
            </Link>
          ))}
          <div className="mt-8 grid gap-3">
            <a href={whatsappLink(WA_MESSAGES.orcamento)} target="_blank" rel="noopener noreferrer" onClick={close} className="btn btn-primary w-full">
              Solicitar orçamento <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <Link href="/login" onClick={close} className="btn btn-ghost w-full">
              <UserRound className="h-4 w-4" aria-hidden /> Área do cliente
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
