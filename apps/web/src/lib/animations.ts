import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Núcleo de animação (GSAP). Importado apenas por componentes client —
 * o GSAP nunca entra no bundle de Server Components.
 *
 * Convenções (ver design.md §10):
 * - GSAP cuida de narrativa (splash, reveals, header);
 * - CSS cuida de estado (hover, focus, loops ambientes);
 * - tudo respeita prefers-reduced-motion via gsap.matchMedia.
 */

let registered = false;

export function registerGsap(): void {
  if (!registered) {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
    registered = true;
  }
}

export const EASE = {
  out: "power3.out",
  expo: "expo.out",
  inOut: "power2.inOut",
} as const;

/** Parâmetros padrão de scroll reveal — manter em sincronia com tokens de motion. */
export const REVEAL = {
  y: 24,
  duration: 0.7,
  stagger: 0.08,
  start: "top 82%",
} as const;

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const FULL_MOTION = "(prefers-reduced-motion: no-preference)";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION).matches;
}
