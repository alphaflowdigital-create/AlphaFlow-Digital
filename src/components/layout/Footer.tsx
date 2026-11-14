import Link from "next/link";
import { Mail } from "lucide-react";
import { LogoStacked } from "@/components/brand/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { NAV, PLANS } from "@/content/site";
import { siteConfig, formatPhoneBR } from "@/lib/config";
import { whatsappLink, WA_MESSAGES } from "@/lib/whatsapp";
import { CurrentYear } from "./CurrentYear";

const SERVICES_LINKS = ["Sites institucionais", "Landing pages", "Catálogos digitais", "Redesign de sites", "SEO e desempenho"];

export function Footer() {
  const phone = formatPhoneBR(siteConfig.whatsappNumber);
  const { business } = siteConfig;
  const place = [business.city, business.state].filter(Boolean).join(" — ");

  return (
    <footer className="relative overflow-hidden border-t border-line section-alt pb-28 pt-20 lg:pb-0">
      <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <LogoStacked className="h-20 w-auto" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-mute">
            AlphaFlow Digital — Tecnologia, criatividade e estratégia para transformar sua presença digital.
          </p>
          <a href={whatsappLink(WA_MESSAGES.orcamento)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm mt-6">
            Solicitar orçamento
          </a>
        </div>

        <nav aria-label="Links do rodapé">
          <p className="text-sm font-semibold text-white">Navegação</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((n) => <li key={n.href}><Link href={n.href} className="text-mute transition-colors hover:text-white">{n.label}</Link></li>)}
            <li><Link href="/login" className="text-mute transition-colors hover:text-white">Área do cliente</Link></li>
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-white">Serviços</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICES_LINKS.map((s) => <li key={s}><Link href="/#servicos" className="text-mute transition-colors hover:text-white">{s}</Link></li>)}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Planos</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {PLANS.map((p) => <li key={p.id}><Link href="/#planos" className="text-mute transition-colors hover:text-white">{p.name}</Link></li>)}
            <li><Link href="/#planos" className="text-mute transition-colors hover:text-white">Serviços adicionais</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Contato</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={whatsappLink(WA_MESSAGES.conversa)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-mute hover:text-white">
                <WhatsAppIcon className="h-4 w-4" /> {phone ?? "WhatsApp"}
              </a>
            </li>
            {siteConfig.instagramUrl && (
              <li>
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-mute hover:text-white">
                  <InstagramIcon className="h-4 w-4" /> Instagram
                </a>
              </li>
            )}
            {siteConfig.contactEmail && (
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="inline-flex items-center gap-2 text-mute hover:text-white">
                  <Mail className="h-4 w-4" aria-hidden /> {siteConfig.contactEmail}
                </a>
              </li>
            )}
            {place && <li className="text-mute">{place}</li>}
            <li><Link href="/#orcamento" className="text-mute hover:text-white">Formulário de orçamento</Link></li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-16 flex flex-col gap-3 border-t border-line pt-6 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>© <CurrentYear /> AlphaFlow Digital. Todos os direitos reservados.{business.cnpj ? ` CNPJ ${business.cnpj}.` : ""}</p>
        <div className="flex gap-5">
          <Link href="/privacidade" className="hover:text-white">Política de privacidade</Link>
          <Link href="/privacidade#cookies" className="hover:text-white">Cookies</Link>
        </div>
      </div>

      {/* assinatura gigante, cortada na base — como na referência */}
      <p aria-hidden className="text-chrome-soft pointer-events-none mt-10 select-none text-center font-display text-[22vw] font-bold leading-[0.72] tracking-[-0.06em] opacity-[0.16] lg:text-[17rem]">
        AlphaFlow
      </p>
    </footer>
  );
}
