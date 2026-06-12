import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Sigilo da Academia Dungeon: porta de dungeon em arco — pranchas
 * verticais, travessa e soleira pesada, flanqueada por tochas. Single
 * color via `currentColor`, traços grossos com terminação reta
 * (brutalista). Os `data-logo-part` são alvos da splash screen.
 */
export function LogoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      {...props}
      className={cn("shrink-0", className)}
    >
      {/* pedra angular — runa quadrada */}
      <path data-logo-part="keystone" d="M32 1.5 36.2 6 32 10.5 27.8 6Z" fill="currentColor" />
      {/* tochas laterais — chama + suporte */}
      <path data-logo-part="torch-left-flame" d="M6 14.5 9 18.7 6 22.9 3 18.7Z" fill="currentColor" />
      <path data-logo-part="torch-left" d="M2 27h8L6 36.5Z" fill="currentColor" />
      <path data-logo-part="torch-right-flame" d="M58 14.5 61 18.7 58 22.9 55 18.7Z" fill="currentColor" />
      <path data-logo-part="torch-right" d="M54 27h8L58 36.5Z" fill="currentColor" />
      {/* arco externo — o batente */}
      <path
        data-logo-part="arch-outer"
        d="M15 53V31a17 17 0 0 1 34 0v22"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="square"
      />
      {/* arco interno — a porta */}
      <path
        data-logo-part="arch-inner"
        d="M23 53V32a9 9 0 0 1 18 0v21"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
      {/* pranchas verticais da porta */}
      <path
        data-logo-part="slit"
        d="M29.2 25.5V53"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
      />
      <path
        data-logo-part="slit-2"
        d="M34.8 25.5V53"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
      />
      {/* travessa de ferro */}
      <path
        data-logo-part="crossbar"
        d="M21 40h22"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="square"
      />
      {/* soleira dupla — laje pesada */}
      <path
        data-logo-part="base"
        d="M9 55.5h46"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="square"
      />
      <path
        data-logo-part="base-2"
        d="M15 61.5h34"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

interface LogoProps {
  /** `full` = sigilo + wordmark; `mark` = apenas o sigilo. */
  variant?: "mark" | "full";
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
}

export function Logo({ variant = "full", className, markClassName, wordmarkClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("h-8 w-8 text-text-primary", markClassName)} />
      {variant === "full" && (
        <span
          className={cn(
            "flex flex-col font-display text-[0.8rem] font-black uppercase leading-[1.05] tracking-[0.16em] text-text-primary",
            wordmarkClassName
          )}
        >
          <span>Academia</span>
          <span className="text-brand-accent">Dungeon</span>
        </span>
      )}
    </span>
  );
}
