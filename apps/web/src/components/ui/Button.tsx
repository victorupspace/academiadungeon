import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;

type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseClasses = cn(
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5",
  "font-sans font-bold uppercase tracking-label",
  "transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out-soft",
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus",
  "disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45"
);

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.6875rem]",
  md: "h-11 px-6 text-xs",
  lg: "h-12 px-7 text-[0.8125rem]",
};

/**
 * Variantes brutalistas (design.md §14): blocos retos; o hover desloca
 * o bloco e revela uma sombra dura (offset sólido) — nunca glow.
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    "border border-brand-accent bg-brand-accent text-white",
    "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brand-secondary hover:shadow-hard",
    "active:translate-x-0 active:translate-y-0 active:shadow-none"
  ),
  secondary: cn(
    "border-[1.5px] border-border-strong bg-transparent text-text-primary",
    "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-brand-accent hover:shadow-hard",
    "active:translate-x-0 active:translate-y-0 active:shadow-none"
  ),
  ghost: cn(
    "border border-transparent bg-transparent font-mono text-text-secondary",
    "hover:text-brand-ember",
    "active:translate-y-px"
  ),
};

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-3.5 animate-spin border-2 border-current border-t-transparent"
    />
  );
}

/**
 * Botão da casa. Vira <Link> quando recebe `href`.
 * `loading` mantém a largura (sem layout shift) e anuncia `aria-busy`.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", loading = false, className, children, ...rest } = props;
  const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<ButtonAsLink, keyof CommonProps>;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button
      className={classes}
      aria-busy={loading || undefined}
      disabled={loading || buttonProps.disabled}
      {...buttonProps}
    >
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {loading && <Spinner />}
        {children}
      </span>
    </button>
  );
}
