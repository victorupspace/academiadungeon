"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { navigation } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Header fixo (design.md §13): barra sólida com fio de acento no topo
 * e regra estrutural embaixo. Ao rolar, a regra inferior acende em crimson.
 */
export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    let frame = 0;

    const syncScrolledState = () => {
      frame = 0;
      el.toggleAttribute("data-scrolled", window.scrollY > 32);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncScrolledState);
    };

    syncScrolledState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    triggerButtonRef.current?.focus();
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "group/header fixed inset-x-0 top-0 z-40 bg-bg-primary",
          "border-b border-border-strong",
          "transition-[border-color,box-shadow] duration-300 ease-out-soft",
          "data-scrolled:border-brand-accent/70 data-scrolled:shadow-elevated"
        )}
      >
        {/* fio de acento no topo */}
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-brand-accent" />

        <Container>
          <div className="flex h-(--ad-header-height) items-center justify-between gap-6">
            <Link
              href="/"
              aria-label="Academia Dungeon — início"
              className="focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
            >
              <Logo wordmarkClassName="translate-y-1 max-[419px]:hidden" />
            </Link>

            <nav aria-label="Navegação principal" className="hidden lg:block">
              <ul className="flex items-center gap-6">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative inline-flex items-center gap-1.5 py-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-text-secondary",
                        "transition-colors duration-150 hover:text-text-primary",
                        "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0",
                        "after:bg-brand-accent after:transition-transform after:duration-200 after:ease-out-soft",
                        "hover:after:scale-x-100 focus-visible:after:scale-x-100"
                      )}
                    >
                      {item.label}
                      {item.soon && (
                        <span
                          aria-hidden="true"
                          className="pulse-dot size-1.5 bg-neon-amber"
                          title="Em breve"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <Button href="/#newsletter" size="sm" className="hidden lg:inline-flex">
                Entrar na Academia
              </Button>
              <button
                ref={triggerButtonRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Abrir menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className={cn(
                  "flex size-11 items-center justify-center border border-border-strong",
                  "bg-bg-primary text-text-primary transition-colors duration-150",
                  "hover:border-brand-accent hover:text-brand-ember lg:hidden"
                )}
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
