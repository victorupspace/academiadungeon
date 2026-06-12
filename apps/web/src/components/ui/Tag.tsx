import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { NeonTone } from "@/types/content";

interface TagProps {
  tone?: "neutral" | NeonTone;
  className?: string;
  children: ReactNode;
}

const toneClasses: Record<NonNullable<TagProps["tone"]>, string> = {
  neutral: "border-border-strong text-text-secondary",
  green: "border-neon-green/30 text-neon-green",
  blue: "border-neon-blue/30 text-neon-blue",
  purple: "border-neon-purple/30 text-neon-purple",
  amber: "border-neon-amber/30 text-neon-amber",
  red: "border-neon-red/30 text-neon-red",
};

/**
 * Chip de taxonomia: quadrado, mono, contorno visível (design.md §20).
 * Neutro por padrão; neon apenas com semântica de status/sistema.
 */
export function Tag({ tone = "neutral", className, children }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap border bg-transparent px-2 py-1",
        "font-mono text-2xs uppercase leading-none tracking-[0.08em]",
        "transition-colors duration-150 ease-out-soft",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
