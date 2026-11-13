import { Logo } from "@/components/brand/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid min-h-dvh lg:grid-cols-[1fr_1.1fr]">
      <div className="bg-grid mask-radial pointer-events-none absolute inset-0 lg:hidden" aria-hidden />
      {/* painel de marca (desktop) */}
      <aside className="relative hidden overflow-hidden border-r border-line bg-ink-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="bg-grid mask-radial pointer-events-none absolute inset-0" aria-hidden />
        <div className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-white/[0.07] blur-[100px]" aria-hidden />
        <Logo className="relative" />
        <div className="relative">
          <img src="/brand/logo-mark.png" alt="" width={256} height={199} className="h-24 w-auto opacity-90" />
          <p className="text-chrome mt-10 max-w-md font-display text-4xl font-semibold leading-tight tracking-tight">
            Acompanhe seu projeto com a AlphaFlow Digital.
          </p>
          <p className="mt-4 max-w-sm leading-relaxed text-mute">
            Status do desenvolvimento, informações do plano e contato direto com o suporte, em um só lugar.
          </p>
        </div>
        <p className="relative text-xs text-mute">O site institucional e os planos continuam abertos — o cadastro é apenas para clientes.</p>
      </aside>

      <main id="conteudo" className="relative flex flex-col px-5 py-8 sm:px-10">
        <div className="lg:hidden"><Logo /></div>
        <div className="flex flex-1 items-center justify-center py-12">{children}</div>
      </main>
    </div>
  );
}
