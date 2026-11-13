"use client";
import { useEffect, useState } from "react";

/** Ano dinâmico: renderiza o ano do build e atualiza no navegador, se mudou. */
export function CurrentYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span suppressHydrationWarning>{year}</span>;
}
