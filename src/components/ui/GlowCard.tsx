"use client";
import type { ReactNode, PointerEvent } from "react";

/** Card escuro com brilho discreto que segue o cursor (apenas em dispositivos com mouse). */
export function GlowCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div onPointerMove={onMove} className={`card card-hover card-glow ${className}`}>
      {children}
    </div>
  );
}
