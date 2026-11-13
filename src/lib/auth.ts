// Utilitários compartilhados da autenticação.

/** Evita redirecionamento aberto: só aceita caminhos internos. */
export function safeNext(next: string | null | undefined, fallback = "/area-do-cliente") {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return fallback;
  return next;
}

export function validatePassword(pw: string): string | null {
  if (pw.length < 8) return "A senha deve ter pelo menos 8 caracteres.";
  if (!/[A-Za-z]/.test(pw) || !/\d/.test(pw)) return "Use letras e números na senha.";
  if (pw.length > 72) return "A senha deve ter no máximo 72 caracteres.";
  return null;
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/** Traduz as mensagens de erro mais comuns do Supabase Auth. */
export function translateAuthError(msg?: string): string {
  if (!msg) return "Ocorreu um erro inesperado. Tente novamente.";
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials")) return "E-mail ou senha incorretos.";
  if (m.includes("email not confirmed")) return "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada (e o spam).";
  if (m.includes("user already registered") || m.includes("already been registered")) return "Já existe uma conta com este e-mail. Tente entrar ou recuperar a senha.";
  if (m.includes("password should be") || m.includes("weak password")) return "Senha fraca. Use pelo menos 8 caracteres, com letras e números.";
  if (m.includes("rate limit") || m.includes("too many")) return "Muitas tentativas. Aguarde alguns minutos e tente novamente.";
  if (m.includes("same password") || m.includes("different from the old")) return "A nova senha deve ser diferente da anterior.";
  if (m.includes("expired") || m.includes("invalid") && m.includes("token")) return "O link expirou ou é inválido. Solicite um novo.";
  if (m.includes("fetch") || m.includes("network")) return "Falha de conexão. Verifique sua internet.";
  return "Não foi possível concluir a operação. Tente novamente.";
}
