"use client";
import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

/** Animação de entrada sutil, via IntersectionObserver + CSS (sem bibliotecas). */
export function Reveal({
  children, as: Tag = "div", delay = 0, className = "", style, ...rest
}: { children: ReactNode; as?: ElementType; delay?: number; className?: string; style?: CSSProperties } & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("is-in"); return; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("is-in"); io.disconnect(); } },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ ...style, "--d": `${delay}ms` } as CSSProperties} {...rest}>
      {children}
    </Tag>
  );
}
