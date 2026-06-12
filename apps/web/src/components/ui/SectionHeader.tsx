import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  /** Índice técnico da seção (ex.: "01"). */
  index?: string;
  title: ReactNode;
  description?: string;
  align?: "start" | "center";
  /** Ação alinhada à direita no desktop (ex.: link "Ver todos"). */
  action?: ReactNode;
  className?: string;
}

/**
 * Cabeçalho de seção (design.md §13): índice mono + eyebrow técnico →
 * título display em caixa alta → apoio. Fecha com regra estrutural.
 * Os filhos carregam `data-reveal` — envolver a seção em `<Reveal>`.
 */
export function SectionHeader({
  eyebrow,
  index,
  title,
  description,
  align = "start",
  action,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={cn("border-b-2 border-border-strong pb-6", className)}>
      <div
        className={cn(
          "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
          centered && "sm:flex-col sm:items-center sm:justify-start sm:text-center"
        )}
      >
        <div className={cn("max-w-3xl", centered && "mx-auto")}>
          <p className="eyebrow" data-reveal>
            {index && (
              <span className="mr-2 text-brand-ember">
                {index}
                <span aria-hidden="true">{" //"}</span>
              </span>
            )}
            {eyebrow}
          </p>
          <h2
            className="mt-3 text-balance font-display text-display-xl font-black uppercase font-stretch-expanded text-text-primary"
            data-reveal
          >
            {title}
          </h2>
          {description && (
            <p
              className="mt-4 max-w-2xl text-pretty text-sm/6 text-text-secondary sm:text-base/7"
              data-reveal
            >
              {description}
            </p>
          )}
        </div>
        {action && (
          <div className="shrink-0 pb-1" data-reveal>
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
