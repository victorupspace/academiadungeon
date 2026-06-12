"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LogoMark } from "@/components/ui/Logo";
import { FULL_MOTION, REDUCED_MOTION, registerGsap } from "@/lib/animations";
import { isSplashSkipped, markSplashSeen, signalSplashDone } from "@/lib/splash";
import { cn } from "@/lib/utils";

registerGsap();

/**
 * Gotas da explosão de sangue. Valores derivados do índice (nada de
 * Math.random no render) para o HTML ser idêntico no SSR e no client.
 */
const BLOOD_DROPS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size: 6 + ((i * 7) % 14),
}));

/** Splat orgânico com pseudópodes + gotas satélites. */
const SPLAT_A =
  "M52 14c7-3 15 1 17 8 2 6 11 7 14 13 3 7-3 12-7 17-3 5 4 12-1 17-5 6-13 1-19 4-7 3-12 9-19 6-7-2-6-11-11-16-4-5-13-6-13-14 0-7 8-10 11-16 3-5 0-13 6-16 6-4 10 3 16 1 2-1 4-3 6-4Z";
/** Splat alongado, como sangue jogado na diagonal. */
const SPLAT_B =
  "M8 62c6-12 20-10 30-18 10-8 12-22 24-26 12-4 22 2 26 12 3 9-4 16-2 25 2 8 9 14 4 21-5 8-16 3-25 6-9 2-16 10-25 7-8-3-7-13-13-19-5-5-15-4-19-8Z";

/**
 * Sangue arremessado contra a tela: posição/rotação/opacidade fixas
 * (SSR-safe); o GSAP só cuida do arremesso. Ordem = ordem dos golpes.
 */
const SPLATS = [
  { left: "14%", top: "20%", size: 190, rot: -18, o: 0.9, d: SPLAT_A, at: 0 },
  { left: "82%", top: "16%", size: 240, rot: 26, o: 0.8, d: SPLAT_B, at: 0.45 },
  { left: "10%", top: "72%", size: 150, rot: 42, o: 0.85, d: SPLAT_B, at: 0.8 },
  { left: "85%", top: "68%", size: 210, rot: -28, o: 0.75, d: SPLAT_A, at: 1.1 },
  { left: "50%", top: "88%", size: 140, rot: 8, o: 0.8, d: SPLAT_B, at: 1.4 },
  { left: "68%", top: "40%", size: 110, rot: 60, o: 0.7, d: SPLAT_A, at: 1.65 },
];

/**
 * Splash de entrada (prompt §10, v4 brutalista total): o sigilo
 * CARIMBA a tela — flash crimson, tremor com torção e gotas explodindo
 * do impacto. Durante o ritual, splats de sangue são ARREMESSADOS
 * contra a tela em ondas, cada golpe com seu micro-tremor; o wordmark
 * entra em corte seco e sofre um glitch. Dois blobs de acento (mesma
 * linguagem da home) respiram nas laterais. Roda conforme o gate em
 * `lib/splash.ts`; sem JS nunca aparece (`.js`-gated).
 */
export function SplashScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);
  const [finished, setFinished] = useState(false);

  const finishSplash = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    markSplashSeen();
    signalSplashDone();
    setFinished(true);
  }, []);

  // Sessão repetida: libera o hero imediatamente.
  useEffect(() => {
    if (isSplashSkipped()) {
      finishSplash();
      return;
    }

    const fallback = window.setTimeout(finishSplash, 4600);
    return () => window.clearTimeout(fallback);
  }, [finishSplash]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || isSplashSkipped()) return;

      const stage = root.querySelector("[data-splash-stage]");
      const sigil = root.querySelector("[data-splash-sigil]");
      const flames = root.querySelectorAll('[data-logo-part$="flame"]');
      const flash = root.querySelector("[data-splash-flash]");
      const drops = root.querySelectorAll<HTMLElement>("[data-splash-drop]");
      const splats = root.querySelectorAll<HTMLElement>("[data-splash-splat]");
      const splatWrap = root.querySelector("[data-splash-splats]");
      const ambient = root.querySelector("[data-splash-ambient]");
      const word = root.querySelector("[data-splash-word]");
      const lines = root.querySelectorAll("[data-splash-line]");
      const sub = root.querySelector("[data-splash-sub]");
      const tick = root.querySelector("[data-splash-tick]");
      const drips = root.querySelectorAll("[data-splash-drip]");
      const gates = root.querySelectorAll("[data-splash-gate]");

      const mm = gsap.matchMedia();

      // Reduced motion: presença breve da marca, sem ritual nem sangue.
      mm.add(REDUCED_MOTION, () => {
        const tl = gsap.timeline({ onComplete: finishSplash });
        tl.set([sigil, sub], { opacity: 1 })
          .set(drips, { scaleY: 0 })
          .fromTo(stage, { opacity: 0 }, { opacity: 1, duration: 0.25 })
          .to(stage, { opacity: 1, duration: 0.55 })
          .to(root, { opacity: 0, duration: 0.3 });
      });

      mm.add(FULL_MOTION, () => {
        // Estados iniciais via GSAP (não via classes de transform do
        // Tailwind v4: `translate`/`scale` CSS compõem separado do
        // `transform` do GSAP e nunca seriam sobrescritos).
        gsap.set(lines, { yPercent: 110 });
        gsap.set(tick, { scaleX: 0 });
        gsap.set(drips, { scaleY: 0 });

        const tl = gsap.timeline({ onComplete: finishSplash });

        tl
          // corte seco: o palco já está lá, sem fade de entrada
          .set(stage, { opacity: 1 })
          // o sigilo CARIMBA a tela
          .fromTo(sigil, { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "none" }, 0.15)
          .fromTo(sigil, { scale: 3 }, { scale: 1, duration: 0.32, ease: "power4.in" }, 0.15)
          .addLabel("impact", 0.47)
          // flash crimson do golpe
          .fromTo(
            flash,
            { opacity: 0 },
            { opacity: 0.45, duration: 0.06, ease: "none" },
            "impact"
          )
          .to(flash, { opacity: 0, duration: 0.22, ease: "power1.out" }, "impact+=0.06")
          // eco do flash no segundo golpe de sangue
          .fromTo(
            flash,
            { opacity: 0 },
            { opacity: 0.16, duration: 0.05, ease: "none" },
            "impact+=0.45"
          )
          .to(flash, { opacity: 0, duration: 0.18, ease: "power1.out" }, "impact+=0.5")
          // a tela treme e torce com o impacto
          .to(
            stage,
            {
              keyframes: [
                { x: -12, y: 7, rotation: -1.2, duration: 0.05 },
                { x: 9, y: -6, rotation: 0.8, duration: 0.05 },
                { x: -6, y: 3, rotation: -0.5, duration: 0.05 },
                { x: 3, y: -2, rotation: 0.3, duration: 0.04 },
                { x: 0, y: 0, rotation: 0, duration: 0.04 },
              ],
              ease: "none",
            },
            "impact"
          )
          // as tochas tremulam (flicker em degraus, sem suavidade)
          .to(
            flames,
            { opacity: 0.4, duration: 0.09, repeat: 7, yoyo: true, ease: "steps(1)" },
            "impact+=0.3"
          )
          // o nome da casa entra em corte seco, linha a linha
          .to(
            lines,
            { yPercent: 0, duration: 0.35, stagger: 0.09, ease: "power4.out" },
            "impact+=0.15"
          )
          // régua crimson rasga a tela
          .to(tick, { scaleX: 1, duration: 0.45, ease: "power4.inOut" }, "impact+=0.3")
          .to(sub, { opacity: 1, duration: 0.3, ease: "none" }, "impact+=0.6")
          // glitch seco no wordmark
          .to(
            word,
            {
              keyframes: [
                { x: -7, duration: 0.05 },
                { x: 5, duration: 0.05 },
                { x: 0, duration: 0.04 },
              ],
              ease: "none",
            },
            "impact+=0.85"
          )
          // o sangue escorre da régua
          .to(
            drips,
            { scaleY: 1, duration: 1.1, stagger: 0.15, ease: "power1.in" },
            "impact+=0.55"
          )
          // os portões se abrem (corte seco)
          .to([stage, splatWrap, ambient], { opacity: 0, duration: 0.2, ease: "power1.in" }, "impact+=2.35")
          .to(
            gates,
            {
              xPercent: (index) => (index === 0 ? -100 : 100),
              duration: 0.6,
              ease: "power4.inOut",
            },
            "-=0.05"
          )
          .set(root, { opacity: 0 });

        // sangue ARREMESSADO contra a tela, em ondas
        SPLATS.forEach((splat, i) => {
          tl.fromTo(
            splats[i],
            { scale: 2.4, rotation: splat.rot - 40, opacity: 0 },
            {
              scale: 1,
              rotation: splat.rot,
              opacity: splat.o,
              duration: 0.16,
              ease: "power4.in",
            },
            `impact+=${splat.at}`
          );
          // cada golpe sacode a tela (o primeiro já tem o tremor grande)
          if (i > 0) {
            tl.to(
              stage,
              {
                keyframes: [
                  { x: 5, y: -3, duration: 0.04 },
                  { x: -4, y: 2, duration: 0.04 },
                  { x: 0, y: 0, duration: 0.04 },
                ],
                ease: "none",
              },
              `impact+=${splat.at + 0.12}`
            );
          }
        });

        // explosão de sangue: cada gota voa do impacto e cai com gravidade
        drops.forEach((drop, i) => {
          const angle = (i / drops.length) * Math.PI * 2 + gsap.utils.random(-0.4, 0.4);
          const dist = gsap.utils.random(110, 520);
          const dx = Math.cos(angle) * dist;
          // viés para cima: sangue espirra antes de cair
          const dy = Math.sin(angle) * dist * 0.6 - gsap.utils.random(20, 90);
          const spin = gsap.utils.random(-220, 220);

          tl.fromTo(
            drop,
            { x: 0, y: 0, opacity: 1, rotation: 0 },
            { x: dx, y: dy, rotation: spin, duration: 0.4, ease: "power3.out" },
            `impact+=${gsap.utils.random(0, 0.06)}`
          ).to(
            drop,
            {
              x: dx * 1.25,
              y: dy + gsap.utils.random(240, 520),
              rotation: spin * 1.6,
              opacity: 0,
              duration: gsap.utils.random(0.5, 0.8),
              ease: "power2.in",
            },
            ">"
          );
        });
      });
    },
    { dependencies: [finishSplash], scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn(
        // sem JS nunca aparece; com sessão vista, escondida antes do paint
        "hidden in-[.js]:flex [html[data-splash-seen]_&]:hidden!",
        "fixed inset-0 z-60 items-center justify-center overflow-hidden",
        finished && "hidden!"
      )}
    >
      {/* os dois portões */}
      <div data-splash-gate className="absolute inset-y-0 left-0 w-1/2 bg-bg-primary" />
      <div data-splash-gate className="absolute inset-y-0 right-0 w-1/2 bg-bg-primary" />

      {/* atmosfera: blobs de acento (mesma linguagem da home) + vinheta */}
      <div data-splash-ambient className="pointer-events-none absolute inset-0">
        <div className="blob blob-drift -right-32 top-1/4 h-96 w-96 opacity-40" />
        <div className="blob -left-40 bottom-1/4 h-96 w-96 opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* sangue arremessado contra a tela */}
      <div data-splash-splats className="pointer-events-none absolute inset-0">
        {SPLATS.map((splat, i) => (
          <span
            key={i}
            data-splash-splat
            className="absolute text-brand-accent opacity-0"
            style={{
              left: splat.left,
              top: splat.top,
              width: splat.size,
              height: splat.size,
              marginLeft: -splat.size / 2,
              marginTop: -splat.size / 2,
            }}
          >
            <svg viewBox="0 0 100 100" className="h-full w-full" fill="currentColor">
              <path d={splat.d} />
              <circle cx="14" cy="22" r="4" />
              <circle cx="88" cy="30" r="3" />
              <circle cx="80" cy="84" r="5" />
              <circle cx="22" cy="88" r="3" />
            </svg>
          </span>
        ))}
      </div>

      <div data-splash-stage className="relative flex flex-col items-center opacity-0">
        <div data-splash-sigil className="relative opacity-0">
          <LogoMark className="h-28 w-28 text-text-primary sm:h-36 sm:w-36" />
          {/* origem da explosão de sangue: centro do sigilo */}
          <div className="pointer-events-none absolute left-1/2 top-1/2">
            {BLOOD_DROPS.map((drop) => (
              <span
                key={drop.id}
                data-splash-drop
                className="absolute left-0 top-0 text-brand-accent opacity-0"
                style={{ width: drop.size, height: drop.size * 1.4 }}
              >
                <svg viewBox="0 0 10 14" className="h-full w-full" fill="currentColor">
                  <path d="M5 0 9.6 9.2A4.8 4.8 0 1 1 .4 9.2Z" />
                </svg>
              </span>
            ))}
          </div>
        </div>

        {/* nome da casa em tipografia monumental */}
        <div data-splash-word className="mt-7 text-center">
          <p className="font-display text-4xl font-black uppercase leading-[0.92] tracking-[-0.01em] text-text-primary sm:text-6xl">
            <span className="block overflow-hidden">
              <span data-splash-line className="block">
                Academia
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-splash-line className="block text-brand-ember">
                Dungeon
              </span>
            </span>
          </p>

          {/* régua crimson + sangue escorrendo */}
          <span className="relative mt-6 block">
            <span
              data-splash-tick
              className="block h-1 w-full origin-left bg-brand-accent"
            />
            <span
              data-splash-drip
              className="absolute left-[18%] top-full block h-4 w-0.75 origin-top bg-brand-accent"
            />
            <span
              data-splash-drip
              className="absolute left-[52%] top-full block h-7 w-0.75 origin-top bg-brand-accent"
            />
            <span
              data-splash-drip
              className="absolute left-[83%] top-full block h-5 w-0.75 origin-top bg-brand-accent"
            />
          </span>

          <p
            data-splash-sub
            className="mt-5 font-mono text-[0.625rem] font-bold uppercase tracking-[0.22em] text-text-muted opacity-0"
          >
            {"// Abrindo o portão"}
          </p>
        </div>
      </div>

      {/* flash crimson do impacto */}
      <div
        data-splash-flash
        className="pointer-events-none absolute inset-0 bg-brand-accent opacity-0"
      />
    </div>
  );
}
