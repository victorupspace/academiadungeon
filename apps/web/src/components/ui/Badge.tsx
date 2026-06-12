import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { NeonTone } from "@/types/content";

type BadgeTone = NeonTone | "brand" | "neutral";

interface BadgeProps {
  tone?: BadgeTone;
  /** Quadrado de status à esquerda. */
  dot?: boolean;
  /** Pulso lento no dot (CSS, respeita reduced-motion). */
  pulse?: boolean;
  className?: string;
  children: ReactNode;
}

const toneClasses: Record<BadgeTone, string> = {
  green: "border-neon-green/30 bg-neon-green/10 text-neon-green",
  blue: "border-neon-blue/30 bg-neon-blue/10 text-neon-blue",
  purple: "border-neon-purple/30 bg-neon-purple/10 text-neon-purple",
  amber: "border-neon-amber/30 bg-neon-amber/10 text-neon-amber",
  red: "border-neon-red/30 bg-neon-red/10 text-neon-red",
  brand: "border-brand-accent/60 bg-brand-accent/12 text-brand-ember",
  neutral: "border-border-strong bg-surface-secondary text-text-secondary",
};

/**
 * Selo de status (design.md §20): bloco reto, mono, caixa alta.
 * Neon com semântica fixa — máximo de 1 badge por artefato.
 */
export function Badge({ tone = "neutral", dot = false, pulse = false, className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-2.5 py-1.5",
        "font-mono text-[0.625rem] font-bold uppercase leading-none tracking-[0.14em]",
        toneClasses[tone],
        className
      )}
    >
      {dot && (
        <span aria-hidden="true" className={cn("size-1.5 bg-current", pulse && "pulse-dot")} />
      )}
      {children}
    </span>
  );
}
