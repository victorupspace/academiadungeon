"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

interface VideoFrameProps {
  /** Fonte real do vídeo (mp4/webm). Sem `src`, renderiza a cena da casa. */
  src?: string;
  poster?: string;
  title: string;
  /** Meta exibida sob o título (ex.: "02:47 // APRESENTAÇÃO"). */
  meta?: string;
  badgeLabel?: string;
  className?: string;
}

type PlayerState = "idle" | "playing" | "unavailable";

/**
 * Painel de vídeo (design.md §18): moldura reta com canto chanfrado,
 * chrome técnico próprio e fallback obrigatório — a cena do portão com
 * a fenda de luz. Preparado para receber `src` real no futuro.
 */
export function VideoFrame({ src, poster, title, meta, badgeLabel, className }: VideoFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<PlayerState>("idle");

  const handlePlay = () => {
    if (src && videoRef.current) {
      void videoRef.current.play();
      setState("playing");
    } else {
      setState("unavailable");
    }
  };

  return (
    <figure className={cn("relative", className)}>
      {/* placa de fundo deslocada — profundidade brutalista */}
      <div
        aria-hidden="true"
        className="absolute -bottom-2.5 -right-2.5 h-full w-full border border-border-strong bg-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-2.5 -right-2.5 h-10 w-10 bg-brand-accent"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
      />

      <div
        className={cn(
          "clip-notch relative aspect-video overflow-hidden border-[1.5px] border-border-strong bg-bg-secondary"
        )}
      >
        {src ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            playsInline
            preload="metadata"
            controls={state === "playing"}
            onError={() => setState("unavailable")}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          /* Cena da casa: o portão no escuro, fenda de luz acesa */
          <div aria-hidden="true" className="absolute inset-0">
            <div className="dungeon-grid absolute inset-0" />
            <div className="blob left-1/2 top-[46%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 opacity-60" />
            <LogoMark className="absolute left-1/2 top-[44%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 text-text-secondary/45" />
            {/* fenda de luz em acento */}
            <span className="absolute left-1/2 top-[47.5%] h-[3.2rem] w-[0.45rem] -translate-x-1/2 bg-brand-accent" />
            {/* régua técnica no canto */}
            <span className="absolute left-4 top-4 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-text-muted">
              REC_00:00:00
            </span>
          </div>
        )}

        {badgeLabel && state !== "playing" && (
          <div className="absolute right-4 top-4 z-10">
            <Badge tone="red" dot pulse>
              {badgeLabel}
            </Badge>
          </div>
        )}

        {/* aviso quando não há vídeo disponível */}
        <div
          role="status"
          className={cn(
            "absolute inset-x-6 top-1/2 z-10 -translate-y-1/2 border border-border-strong",
            "bg-bg-primary/95 px-5 py-4 text-center font-mono text-xs/5 uppercase tracking-[0.08em] text-text-secondary",
            "transition-all duration-300 ease-out-soft",
            state === "unavailable"
              ? "translate-y-[-50%] opacity-100"
              : "pointer-events-none translate-y-[-44%] opacity-0"
          )}
        >
          Trailer em produção // disponível em breve
        </div>

        {/* chrome do player */}
        {state !== "playing" && (
          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-border-strong bg-bg-primary/92 backdrop-blur-sm">
            <div className="flex items-center gap-4 p-4">
              <button
                type="button"
                onClick={handlePlay}
                aria-label={`Reproduzir vídeo: ${title}`}
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center",
                  "bg-brand-accent text-white",
                  "transition-[transform,background-color,box-shadow] duration-200 ease-out-soft",
                  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brand-secondary hover:shadow-hard",
                  "active:translate-x-0 active:translate-y-0 active:shadow-none",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus"
                )}
              >
                <Play className="ml-0.5 size-4 fill-current" aria-hidden="true" />
              </button>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold uppercase tracking-[0.04em] text-text-primary">
                  {title}
                </p>
                {meta && (
                  <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-text-muted">
                    {meta}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  );
}
