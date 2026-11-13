import Image from "next/image";
import Link from "next/link";

/**
 * Logo oficial AlphaFlow Digital. Símbolo e nome são recortes do arquivo original
 * (design-ref/logo-original.jpg) — não há redesenho, apenas fundo transparente.
 */
export function Logo({ href = "/", className = "", priority = false }: { href?: string; className?: string; priority?: boolean }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="AlphaFlow Digital — página inicial">
      <Image src="/brand/logo-mark.png" alt="" width={256} height={199} priority={priority} className="h-7 w-auto transition-transform duration-500 group-hover:scale-105" />
      <Image src="/brand/logo-wordmark.png" alt="AlphaFlow Digital" width={480} height={61} priority={priority} className="h-[15px] w-auto" />
    </Link>
  );
}

export function LogoStacked({ className = "" }: { className?: string }) {
  return <Image src="/brand/logo-full.png" alt="AlphaFlow Digital" width={640} height={471} className={className} />;
}
