"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Film } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EASE, FULL_MOTION, REDUCED_MOTION, registerGsap } from "@/lib/animations";
import { MEDIA_START_EVENT } from "@/lib/media";
import { waitForSplashDone } from "@/lib/splash";

registerGsap();

/**
 * Hero compacto: abre a marca sem sequestrar a primeira dobra.
 * As portas de Materiais e Guias aparecem logo em seguida.
 */
export function HeroSection() {
  const scope = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mídia parte junto com o fim da splash: o vídeo dá play e o evento
  // avisa a trilha (MusicPlayer) para começar no mesmo instante.
  useEffect(() => {
    let cancelled = false;
    void waitForSplashDone().then(() => {
      if (cancelled) return;
      void videoRef.current?.play().catch(() => {
        // autoplay de vídeo muted raramente falha; se falhar, fica o frame
      });
      window.dispatchEvent(new Event(MEDIA_START_EVENT));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      const root = scope.current;
      if (!root) return;
      gsap.set(root.querySelectorAll("[data-reveal]"), {
        opacity: 1,
        y: 0,
        clearProps: "transform",
      });
    }, 5200);

    return () => window.clearTimeout(fallback);
  }, []);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const copyTargets = root.querySelectorAll("[data-hero-copy] [data-reveal]");

      const mm = gsap.matchMedia();

      mm.add(FULL_MOTION, () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.expo } });
        tl.fromTo(
          copyTargets,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, clearProps: "transform" }
        );

        void waitForSplashDone().then(() => tl.play());
        return () => {
          tl.kill();
        };
      });

      mm.add(REDUCED_MOTION, () => {
        gsap.set(copyTargets, { opacity: 1, clearProps: "transform" });
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-border-strong pb-12 pt-[calc(var(--ad-header-height)+clamp(2rem,5vh,4rem))] sm:pb-16"
    >
      <div aria-hidden="true" className="hero-dungeon-backdrop absolute inset-0 -z-20" />
      <div aria-hidden="true" className="dungeon-grid absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-bg-primary to-transparent"
      />

      <Container className="relative">
        <div
          data-hero-copy
          className="grid min-h-[clamp(34rem,70vh,46rem)] grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(28rem,1.05fr)] lg:gap-12"
        >
          <div className="max-w-4xl">
            <div
              className="flex items-center justify-between gap-4 border-b border-border-strong pb-3"
              data-reveal
            >
              <p className="eyebrow">
                <span className="text-brand-ember">{"// "}</span>A academia para mestres de RPG
              </p>
              <p className="hidden font-mono text-2xs uppercase tracking-[0.18em] text-text-muted sm:block">
                AD_001 — EST.2026
              </p>
            </div>

            <h1
              id="hero-title"
              className="mt-7 max-w-4xl text-balance font-display text-[clamp(2.6rem,5.5vw,4.5rem)] font-black uppercase font-stretch-expanded leading-[0.9] text-text-primary"
              data-reveal
            >
              Domine a mesa.
            </h1>

            <p
              className="mt-6 max-w-2xl text-pretty text-base/7 text-text-secondary sm:text-lg/8"
              data-reveal
            >
              Materiais e guias práticos para preparar sessões melhores, estudar sistemas e
              conduzir aventuras com mais intenção.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal>
              <Button href="/materiais" size="lg" className="w-full sm:w-auto">
                Materiais
              </Button>
              <Button href="/guias" variant="secondary" size="lg" className="w-full sm:w-auto">
                Guias
              </Button>
            </div>
          </div>

          <div className="hidden lg:block" data-reveal>
            <div className="clip-notch relative ml-auto aspect-[16/10] w-full max-w-154 border-2 border-border-strong bg-bg-primary/55 p-3 shadow-hard-accent">
              <div aria-hidden="true" className="hazard-strip absolute inset-x-0 top-0 h-1.5 opacity-70" />
              <div className="media-slot-etching relative flex h-full flex-col justify-between overflow-hidden border border-border-strong bg-bg-secondary/80 p-5">
                <video
                  ref={videoRef}
                  src="/video/dungeonvideo.mov"
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Vídeo da Academia Dungeon"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* tinta brutalista sobre o vídeo, mantém o chrome legível */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-br from-bg-primary/60 via-transparent to-brand-accent/14"
                />
                <div className="relative flex items-center justify-between font-mono text-2xs font-bold uppercase tracking-[0.16em] text-text-muted">
                  <span>Dungeon_Masters</span>
                  <Film className="size-4 text-brand-ember" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
