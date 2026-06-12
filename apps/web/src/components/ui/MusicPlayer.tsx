"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { MEDIA_START_EVENT } from "@/lib/media";
import { cn } from "@/lib/utils";

const AUDIO_SRC = "/audio/Aggressive-Darkness_AdobeStock_1933280659.wav";
/** A trilha toca por 66s — o loader e o fim da reprodução usam este valor. */
const TRACK_DURATION_S = 66;
const DEFAULT_VOLUME = 1;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainder}`;
}

export function MusicPlayer() {
  const playerRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const unlockOnGestureRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [muted, setMuted] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  useEffect(() => {
    const previousPadding = document.body.style.paddingBottom;
    document.body.style.paddingBottom = "4rem";

    return () => {
      document.body.style.paddingBottom = previousPadding;
    };
  }, []);

  const playWithSound = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = DEFAULT_VOLUME;
    audio.muted = false;
    unlockOnGestureRef.current = false;
    setVolume(DEFAULT_VOLUME);
    setMuted(false);
    setNeedsGesture(false);

    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
      setNeedsGesture(true);
      unlockOnGestureRef.current = true;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = muted;
  }, [muted, volume]);

  // O hero dispara MEDIA_START_EVENT depois da splash. Tentamos iniciar
  // com som; se o browser bloquear autoplay audível, armamos a primeira
  // interação real da página para liberar a trilha sem trazer CTA na splash.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onMediaStart = () => {
      if (audio.paused) {
        void playWithSound();
      }
    };

    window.addEventListener(MEDIA_START_EVENT, onMediaStart);
    return () => {
      window.removeEventListener(MEDIA_START_EVENT, onMediaStart);
    };
  }, [playWithSound]);

  useEffect(() => {
    const isInsidePlayer = (target: EventTarget | null) => {
      return target instanceof Node && Boolean(playerRef.current?.contains(target));
    };

    const unlockFromPageGesture = (event: Event) => {
      if (!unlockOnGestureRef.current || isInsidePlayer(event.target)) return;
      void playWithSound();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        unlockFromPageGesture(event);
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        unlockFromPageGesture(event);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        (event.key !== "Enter" && event.key !== " ")
      ) {
        return;
      }

      unlockFromPageGesture(event);
    };

    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("pointerup", onPointerUp, true);
    window.addEventListener("keydown", onKeyDown, true);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("pointerup", onPointerUp, true);
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, [playWithSound]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      audio.volume = volume || DEFAULT_VOLUME;
      audio.muted = false;
      unlockOnGestureRef.current = false;
      setMuted(false);
      setNeedsGesture(false);
      await audio.play();
    } catch {
      setIsPlaying(false);
      setNeedsGesture(true);
      unlockOnGestureRef.current = true;
    }
  };

  const seek = (value: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextTime = Number(value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const changeVolume = (value: string) => {
    const nextVolume = Number(value);
    setVolume(nextVolume);
    setMuted(nextVolume === 0);
  };

  const toggleMute = () => {
    setMuted((current) => !current);
  };

  const progressMax = TRACK_DURATION_S;

  return (
    <aside
      ref={playerRef}
      aria-label="Player de música da Academia Dungeon"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 h-16 max-h-16 border-t-2 border-border-strong",
        "bg-bg-primary/96 shadow-[0_-16px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
      )}
    >
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="auto"
        className="hidden"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          // A trilha é curta; chegou ao fim previsto, encerra e rebobina.
          if (audio.currentTime >= TRACK_DURATION_S) {
            audio.pause();
            audio.currentTime = 0;
            setCurrentTime(0);
            return;
          }
          setCurrentTime(audio.currentTime);
        }}
      />

      <Container className="h-full">
        <div className="grid h-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pausar trilha" : "Tocar trilha"}
            className={cn(
              "flex size-10 shrink-0 items-center justify-center border border-brand-accent",
              "bg-brand-accent text-white transition-all duration-150 ease-out-soft",
              "hover:-translate-y-0.5 hover:bg-brand-secondary hover:shadow-hard",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            )}
          >
            {isPlaying ? (
              <Pause className="size-4" aria-hidden="true" />
            ) : (
              <Play className="ml-0.5 size-4 fill-current" aria-hidden="true" />
            )}
          </button>

          <div className="grid min-w-0 grid-cols-[minmax(0,13rem)_minmax(6rem,1fr)] items-center gap-3 md:grid-cols-[minmax(0,17rem)_minmax(10rem,1fr)]">
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                aria-hidden="true"
                className="hidden size-8 shrink-0 items-center justify-center border border-border-strong bg-bg-secondary text-brand-ember sm:flex"
              >
                <Music2 className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-mono text-[0.65rem] font-bold uppercase tracking-[0.14em] text-text-primary">
                  Trilha da dungeon
                </p>
                <p className="hidden truncate text-xs text-text-muted sm:block">
                  {needsGesture ? "Clique na página para liberar som" : "Volume máximo"}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="hidden w-10 shrink-0 font-mono text-2xs text-text-muted md:block">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={progressMax}
                step={0.1}
                value={Math.min(currentTime, progressMax)}
                onChange={(event) => seek(event.currentTarget.value)}
                aria-label="Progresso da trilha"
                aria-valuetext={`${formatTime(currentTime)} de ${formatTime(TRACK_DURATION_S)}`}
                className="h-1 min-w-0 flex-1 cursor-pointer accent-brand-accent"
              />
              <span className="hidden w-10 shrink-0 text-right font-mono text-2xs text-text-muted md:block">
                {formatTime(TRACK_DURATION_S)}
              </span>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Ativar som" : "Silenciar trilha"}
              className="flex size-9 items-center justify-center border border-border-strong bg-bg-secondary text-text-secondary transition-colors hover:border-brand-accent hover:text-brand-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              {muted || volume === 0 ? (
                <VolumeX className="size-4" aria-hidden="true" />
              ) : (
                <Volume2 className="size-4" aria-hidden="true" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(event) => changeVolume(event.currentTarget.value)}
              aria-label="Volume da trilha"
              className="hidden h-1 w-20 cursor-pointer accent-brand-accent lg:block"
            />
          </div>
        </div>
      </Container>
    </aside>
  );
}
