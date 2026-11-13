import { POSITIONING } from "@/content/site";

export function PositioningBar() {
  const items = [...POSITIONING, ...POSITIONING];
  return (
    <section aria-label="Nosso posicionamento" className="border-y border-line bg-ink-900/60">
      <div className="mask-fade-x overflow-hidden py-6">
        <ul className="flex w-max animate-marquee items-center gap-14 pr-14 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {items.map(({ label, icon: Icon }, i) => (
            <li key={i} aria-hidden={i >= POSITIONING.length} className="flex items-center gap-3 whitespace-nowrap text-[15px] font-medium text-mute">
              <Icon className="h-[18px] w-[18px] text-white/80" strokeWidth={1.6} aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
