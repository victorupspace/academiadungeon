/**
 * Coordenação da splash screen.
 *
 * - A splash roda 1x por sessão (sessionStorage). Um script inline no
 *   layout marca `data-splash-seen` no <html> antes do primeiro paint,
 *   para não haver flash em visitas subsequentes.
 * - O hero aguarda `waitForSplashDone()` antes de animar a entrada,
 *   com timeout de segurança para nunca prender o conteúdo.
 */

export const SPLASH_SESSION_KEY = "ad:splash";
const DONE_EVENT = "ad:splash:done";
const SAFETY_TIMEOUT_MS = 4500;

/**
 * Por enquanto a splash roda em TODA visita (fase de ajuste fino).
 * Voltar para `false` para restaurar o comportamento 1x por sessão —
 * o gate do layout (script inline) e o runtime leem daqui.
 */
export const SPLASH_EVERY_VISIT = true;

let done = false;

export function isSplashSkipped(): boolean {
  if (SPLASH_EVERY_VISIT) return false;
  if (typeof document === "undefined") return false;
  return document.documentElement.hasAttribute("data-splash-seen");
}

export function markSplashSeen(): void {
  try {
    sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
  } catch {
    // navegação privada/iframe: sem persistência, sem problema
  }
}

export function signalSplashDone(): void {
  done = true;
  window.dispatchEvent(new Event(DONE_EVENT));
}

export function waitForSplashDone(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (done || isSplashSkipped()) return Promise.resolve();
  return new Promise((resolve) => {
    const timer = window.setTimeout(resolve, SAFETY_TIMEOUT_MS);
    window.addEventListener(
      DONE_EVENT,
      () => {
        window.clearTimeout(timer);
        resolve();
      },
      { once: true }
    );
  });
}
