"use server";

import { participationSchema } from "@/lib/validation";

export type ParticipationResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Registra intenção de participação.
 *
 * Integração futura (Supabase):
 *   await supabase.from("participation_requests").insert({
 *     reason, source: "home", created_at: new Date().toISOString(),
 *   });
 */
export async function registerParticipationInterest(input: unknown): Promise<ParticipationResult> {
  const parsed = participationSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "Revise os campos e tente novamente." };
  }

  // Honeypot preenchido = bot. Finge sucesso e descarta.
  if (parsed.data.guild) {
    return { ok: true };
  }

  // Simula a latência de persistência até o Supabase entrar.
  await new Promise((resolve) => setTimeout(resolve, 900));
  console.info("[participation] nova mensagem:", parsed.data.reason);

  return { ok: true };
}
