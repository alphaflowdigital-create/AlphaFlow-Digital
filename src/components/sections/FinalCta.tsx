import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Sparkle } from "./HeroArt";
import { whatsappLink, WA_MESSAGES } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-line-strong bg-gradient-to-b from-[#161616] to-[#070707] px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="bg-grid mask-radial pointer-events-none absolute inset-0" aria-hidden />
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.12] blur-[90px]" aria-hidden />
          {/* símbolo oficial como marca d'água */}
          <img src="/brand/logo-mark.png" alt="" aria-hidden width={256} height={199} loading="lazy" className="pointer-events-none absolute -bottom-10 -right-6 w-56 opacity-[0.05] sm:w-80" />

          <Sparkle id="cta1" size={110} className="pointer-events-none absolute left-[5%] top-[12%] hidden animate-float-slow md:block" />
          <Sparkle id="cta2" size={56} className="pointer-events-none absolute right-[8%] top-[18%] hidden animate-float [animation-delay:-3s] md:block" />
          <Sparkle id="cta3" size={38} className="pointer-events-none absolute bottom-[14%] left-[16%] hidden animate-float [animation-delay:-6s] md:block" />
          <div className="relative mx-auto max-w-3xl">
            <h2 id="cta-title" className="text-chrome text-[2.1rem] font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
              Seu próximo passo começa com uma presença digital profissional.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-mute">
              Vamos transformar a maneira como sua empresa se apresenta na internet?
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/#orcamento" className="btn btn-primary h-12 px-7">
                Quero desenvolver meu site <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a href={whatsappLink(WA_MESSAGES.conversa)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost h-12 px-7">
                <WhatsAppIcon className="h-4 w-4" /> Conversar pelo WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
