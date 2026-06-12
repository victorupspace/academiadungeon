"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { navigation, socialLinks } from "@/data/site";
import { EASE, prefersReducedMotion, registerGsap } from "@/lib/animations";
import { cn } from "@/lib/utils";

registerGsap();

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Menu full-screen do mobile (design.md §12/§17): links display em
 * caixa alta com índice mono, stagger GSAP, scroll lock, ESC fecha,
 * foco gerido. Mesma linguagem brutalista do resto da casa.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll lock + foco inicial + ESC + trap de foco
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();

      if (event.key === "Tab" && rootRef.current) {
        const focusables = rootRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  // Entrada com stagger dos links
  useGSAP(
    () => {
      if (!open || !rootRef.current || prefersReducedMotion()) return;
      gsap.fromTo(
        rootRef.current.querySelectorAll("[data-menu-item]"),
        { opacity: 0, x: -18 },
        { opacity: 1, x: 0, duration: 0.45, ease: EASE.expo, stagger: 0.05, delay: 0.06 }
      );
    },
    { dependencies: [open], scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-bg-primary lg:hidden",
        "transition-[opacity,visibility] duration-200 ease-out-soft",
        open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
      )}
    >
      {/* fio de acento + atmosfera */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-brand-accent" />
      <div aria-hidden="true" className="dungeon-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="blob -right-24 top-1/4 h-80 w-80 opacity-50" />

      <div className="relative flex h-(--ad-header-height) shrink-0 items-center justify-between border-b border-border-strong px-container">
        <Link href="/" aria-label="Academia Dungeon — início" onClick={onClose}>
          <Logo />
        </Link>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className={cn(
            "flex size-11 items-center justify-center border border-border-strong",
            "bg-bg-primary text-text-primary transition-colors duration-150",
            "hover:border-brand-accent hover:text-brand-ember"
          )}
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <nav
        aria-label="Navegação principal"
        className="relative flex grow flex-col justify-center overflow-y-auto px-container py-8"
      >
        <ul className="flex flex-col">
          {navigation.map((item, index) => (
            <li key={item.href} data-menu-item className="border-b border-border-faint">
              <Link
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-baseline gap-4 py-4",
                  "font-display text-[2rem] font-black uppercase leading-none tracking-tight",
                  "text-text-secondary transition-colors duration-150 hover:text-text-primary"
                )}
              >
                <span className="font-mono text-xs font-bold text-brand-ember">
                  /{String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
                {item.soon && (
                  <span className="border border-neon-amber/30 bg-neon-amber/10 px-2 py-1 font-mono text-[0.625rem] font-bold uppercase tracking-[0.12em] text-neon-amber">
                    Em breve
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative shrink-0 space-y-5 border-t border-border-strong px-container py-7" data-menu-item>
        <Button href="/#newsletter" size="lg" className="w-full" onClick={onClose}>
          Entrar na Academia
        </Button>
        <ul className="flex items-center justify-center gap-6">
          {socialLinks.map((social) => (
            <li key={social.network}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-2xs font-bold uppercase tracking-[0.12em] text-text-muted transition-colors duration-150 hover:text-brand-ember"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
