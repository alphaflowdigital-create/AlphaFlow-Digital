/**
 * Camada de fundo global (fixa, atrás de todo o conteúdo):
 * luz ambiente, anéis concêntricos (como os arcos da referência) e granulação fina.
 * Tudo em CSS/SVG estático — sem custo de JavaScript.
 */
export function BackgroundFX() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* luzes ambiente */}
        <div className="absolute -top-[30vh] left-1/2 h-[80vh] w-[120vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.14),transparent)]" />
        <div className="absolute -right-[20vw] top-[35vh] h-[70vh] w-[60vw] rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.075),transparent)]" />
        <div className="absolute -left-[25vw] bottom-[-20vh] h-[70vh] w-[70vw] rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.065),transparent)]" />

        {/* anéis concêntricos */}
        <svg className="absolute left-1/2 top-[-35vh] h-[170vh] w-[170vh] -translate-x-1/2 opacity-90" viewBox="0 0 1000 1000">
          <defs>
            <radialGradient id="ring-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.6" stopColor="#fff" stopOpacity="1" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="ring-mask"><rect width="1000" height="1000" fill="url(#ring-fade)" /></mask>
          </defs>
          <g fill="none" stroke="#fff" mask="url(#ring-mask)">
            {[220, 290, 360, 430, 500].map((r, i) => (
              <circle key={r} cx="500" cy="500" r={r} strokeOpacity={0.095 - i * 0.012} />
            ))}
          </g>
          <g className="origin-center animate-[spin_160s_linear_infinite] motion-reduce:animate-none" style={{ transformBox: "fill-box" }}>
            <circle cx="500" cy="500" r="395" fill="none" stroke="#fff" strokeOpacity="0.13" strokeDasharray="1 14" mask="url(#ring-mask)" />
          </g>
        </svg>

        {/* vinheta nas bordas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* granulação de filme — dá textura "premium" ao preto */}
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[70]" />
    </>
  );
}
