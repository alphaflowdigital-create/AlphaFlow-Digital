import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="pill">
      <span className="pill-dot" aria-hidden>
        <svg width="8" height="8" viewBox="0 0 10 10"><path d="M5 0c.4 2.6 2 4.6 5 5-3 .4-4.6 2.4-5 5-.4-2.6-2-4.6-5-5 3-.4 4.6-2.4 5-5Z" fill="currentColor" /></svg>
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow, title, text, align = "left", id, className = "",
}: { eyebrow: string; title: ReactNode; text?: ReactNode; align?: "left" | "center"; id?: string; className?: string }) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="text-chrome mt-5 text-[2rem] font-semibold leading-[1.05] sm:text-5xl md:text-[3.4rem]">
        {title}
      </h2>
      {text && <p className={`mt-5 text-base leading-relaxed text-mute sm:text-lg ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{text}</p>}
    </Reveal>
  );
}
