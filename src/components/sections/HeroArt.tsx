/**
 * Arte autoral do hero: estrelas cromadas de quatro pontas (linguagem da referência)
 * orbitando uma janela de navegador estilizada com uma curva ascendente —
 * representa presença online e crescimento digital, sem números ou métricas inventadas.
 */
export function Sparkle({ size, className = "", id }: { size: number; className?: string; id: string }) {
  const R = 50, r = 7;
  const d = `M0,${-R} C${r},${-r} ${r},${-r} ${R},0 C${r},${r} ${r},${r} 0,${R} C${-r},${r} ${-r},${r} ${-R},0 C${-r},${-r} ${-r},${-r} 0,${-R} Z`;
  return (
    <svg width={size} height={size} viewBox="-56 -56 112 112" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-f`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b2b2b" /><stop offset=".5" stopColor="#0a0a0a" /><stop offset="1" stopColor="#1f1f1f" />
        </linearGradient>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" /><stop offset=".35" stopColor="#6d6d6d" />
          <stop offset=".6" stopColor="#f5f5f5" /><stop offset="1" stopColor="#555" />
        </linearGradient>
        <filter id={`${id}-g`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <path d={d} fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2" filter={`url(#${id}-g)`} />
      <path d={d} fill={`url(#${id}-f)`} stroke={`url(#${id}-s)`} strokeWidth="2.6" strokeLinejoin="round" />
      <path d={d} transform="scale(.62)" fill="none" stroke={`url(#${id}-s)`} strokeOpacity=".55" strokeWidth="2" />
    </svg>
  );
}

export function HeroArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden>
      {/* órbitas */}
      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="orb" x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".28" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="260" cy="270" rx="236" ry="92" fill="none" stroke="url(#orb)" transform="rotate(-18 260 270)" />
        <ellipse cx="260" cy="270" rx="200" ry="200" fill="none" stroke="#fff" strokeOpacity=".05" />
        <ellipse cx="260" cy="270" rx="140" ry="140" fill="none" stroke="#fff" strokeOpacity=".04" strokeDasharray="2 6" />
      </svg>

      {/* janela do navegador */}
      <div className="absolute left-1/2 top-[54%] w-[74%] -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] animate-float-slow">
        <div className="card overflow-hidden rounded-2xl border-line-strong bg-ink-900/90 backdrop-blur">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-3 flex h-6 flex-1 items-center gap-2 rounded-md bg-white/[0.05] px-2.5 text-[10px] text-mute">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
              suaempresa.com.br
            </span>
          </div>
          <div className="relative p-5">
            <div className="h-2.5 w-24 rounded-full bg-white/80" />
            <div className="mt-2.5 h-2 w-40 rounded-full bg-white/15" />
            <div className="mt-1.5 h-2 w-32 rounded-full bg-white/10" />
            <svg viewBox="0 0 300 110" className="mt-5 w-full">
              <defs>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity=".18" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[22, 50, 78].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#fff" strokeOpacity=".05" />)}
              <path d="M0 96 C40 92 60 80 90 78 S140 62 170 50 S230 30 300 10 V110 H0Z" fill="url(#area)" />
              <path d="M0 96 C40 92 60 80 90 78 S140 62 170 50 S230 30 300 10" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <circle cx="170" cy="50" r="4.5" fill="#050505" stroke="#fff" strokeWidth="2" />
            </svg>
            <div className="mt-3 flex gap-2">
              <span className="h-7 w-20 rounded-md bg-white" />
              <span className="h-7 w-16 rounded-md border border-line-strong" />
            </div>
          </div>
        </div>
        {/* selo flutuante */}
        <div className="card absolute -right-4 -top-5 flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] text-soft sm:-right-8">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" /><span className="relative h-2 w-2 rounded-full bg-white" /></span>
          Site no ar
        </div>
        <div className="card absolute -bottom-6 -left-4 flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] text-soft sm:-left-10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>
          Responsivo
        </div>
      </div>

      {/* estrelas cromadas */}
      <Sparkle id="s1" size={170} className="absolute right-[2%] top-[0%] animate-float drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]" />
      <Sparkle id="s2" size={96} className="absolute left-[4%] top-[14%] animate-float-slow [animation-delay:-4s]" />
      <Sparkle id="s3" size={62} className="absolute bottom-[6%] right-[10%] animate-float [animation-delay:-2s]" />
      <span className="absolute left-[22%] bottom-[16%] h-1 w-1 animate-twinkle rounded-full bg-white" />
      <span className="absolute right-[34%] top-[8%] h-1 w-1 animate-twinkle rounded-full bg-white [animation-delay:-2s]" />
    </div>
  );
}
