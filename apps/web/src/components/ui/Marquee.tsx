import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/**
 * Letreiro contínuo (design.md, Apêndice B): faixa técnica entre
 * seções. Decorativo — escondido de leitores de tela; pausa no hover
 * e congela sob prefers-reduced-motion (CSS).
 */
export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("marquee border-y border-border-strong bg-bg-secondary py-3", className)}
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-3 pr-10 font-mono text-xs font-bold uppercase tracking-[0.18em] text-text-secondary"
              >
                <span className="size-1.5 shrink-0 bg-brand-accent" />
                <span className="whitespace-nowrap">{item}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
