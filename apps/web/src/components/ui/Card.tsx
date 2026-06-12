import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Hover de artefato: bloco desloca e revela sombra dura crimson. */
  interactive?: boolean;
}

/**
 * Placa base de artefato (design.md §19): retângulo reto, borda
 * estrutural visível, fundo grafite. No hover, o bloco desloca em
 * diagonal e a sombra dura #A00024 aparece atrás — sem glow, sem blur.
 */
export function Card({ className, interactive = true, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "relative border border-border-strong bg-surface-primary",
        "transition-[transform,border-color,background-color,box-shadow] duration-200 ease-out-soft",
        interactive &&
          "hover:-translate-x-1 hover:-translate-y-1 hover:border-brand-accent hover:shadow-hard-accent",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
