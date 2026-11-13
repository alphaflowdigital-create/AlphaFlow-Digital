"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

const KEY = "af-cookie-consent";
type Consent = "granted" | "denied" | null;

function read(): Consent {
  try { const v = localStorage.getItem(KEY); return v === "granted" || v === "denied" ? v : null; } catch { return null; }
}

/**
 * Banner de consentimento (LGPD). O Google Analytics 4 só é carregado
 * depois que o visitante aceita — e somente se NEXT_PUBLIC_GA_ID estiver definido.
 */
export function CookieConsent({ gaId }: { gaId?: string }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(read());
    setReady(true);
    const onReset = () => setConsent(null);
    window.addEventListener("af:cookie-reset", onReset);
    return () => window.removeEventListener("af:cookie-reset", onReset);
  }, []);

  const choose = (v: Exclude<Consent, null>) => {
    try { localStorage.setItem(KEY, v); } catch {}
    setConsent(v);
  };

  return (
    <>
      {gaId && consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {ready && consent === null && (
        <div role="dialog" aria-live="polite" aria-label="Aviso de cookies" className="fixed inset-x-3 bottom-24 z-[60] mx-auto max-w-lg rounded-2xl border border-line-strong bg-ink-900/95 p-5 shadow-2xl backdrop-blur-xl lg:bottom-6 lg:left-6 lg:right-auto lg:mx-0">
          <div className="flex gap-3">
            <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden />
            <p className="text-sm leading-relaxed text-mute">
              Usamos cookies essenciais para o funcionamento do site e, com sua permissão, cookies de análise para entender como ele é utilizado.{" "}
              <Link href="/privacidade#cookies" className="text-white underline underline-offset-4">Saiba mais</Link>.
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => choose("denied")} className="btn btn-ghost btn-sm flex-1">Recusar</button>
            <button type="button" onClick={() => choose("granted")} className="btn btn-primary btn-sm flex-1">Aceitar</button>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="btn btn-ghost btn-sm"
      onClick={() => {
        try { localStorage.removeItem(KEY); } catch {}
        window.dispatchEvent(new Event("af:cookie-reset"));
      }}
    >
      Alterar preferências de cookies
    </button>
  );
}
