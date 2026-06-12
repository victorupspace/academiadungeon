/** Junta classes condicionalmente (equivalente mínimo de clsx). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

/** Formata ISO → "09 jun. 2026" (pt-BR). */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export const difficultyLabels = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  veterano: "Veterano",
} as const;
