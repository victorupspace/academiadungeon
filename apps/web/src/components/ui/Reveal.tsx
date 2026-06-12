"use client";

import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EASE, FULL_MOTION, REDUCED_MOTION, REVEAL, registerGsap } from "@/lib/animations";

registerGsap();

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  /** Intervalo do stagger entre os alvos `[data-reveal]`. */
  stagger?: number;
  delay?: number;
  y?: number;
}

/**
 * Scroll reveal da casa: anima todos os descendentes `[data-reveal]`
 * com stagger quando a seção entra no viewport. O estado inicial é
 * aplicado por CSS apenas com JS ativo (ver globals.css) — sem JS o
 * conteúdo permanece visível. Reduced-motion: revela sem animar.
 */
export function Reveal({
  children,
  stagger = REVEAL.stagger,
  delay = 0,
  y = REVEAL.y,
  ...rest
}: RevealProps) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fallback = window.setTimeout(
      () => {
        const el = scope.current;
        if (!el) return;
        gsap.set(el.querySelectorAll("[data-reveal]"), {
          opacity: 1,
          y: 0,
          clearProps: "transform",
        });
      },
      Math.max(1800, delay * 1000 + 1400)
    );

    return () => window.clearTimeout(fallback);
  }, [delay]);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const targets = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-reveal]"));
      if (targets.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(FULL_MOTION, () => {
        gsap.fromTo(
          targets,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: REVEAL.duration,
            ease: EASE.expo,
            stagger,
            delay,
            clearProps: "transform",
            scrollTrigger: { trigger: el, start: REVEAL.start, once: true },
          }
        );
      });

      // Sem animação: apenas garante visibilidade imediata.
      mm.add(REDUCED_MOTION, () => {
        gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
      });
    },
    { scope }
  );

  return (
    <div ref={scope} {...rest}>
      {children}
    </div>
  );
}
