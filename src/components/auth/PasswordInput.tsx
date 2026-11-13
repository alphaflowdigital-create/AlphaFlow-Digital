"use client";
import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

export function PasswordInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input {...props} type={show ? "text" : "password"} className="field pr-12" />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-mute hover:text-white"
        aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        aria-pressed={show}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
