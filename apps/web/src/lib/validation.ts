import { z } from "zod";

/**
 * Schemas compartilhados entre client (React Hook Form) e server actions.
 */
export const participationSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais sobre por que você quer fazer parte.")
    .max(1200, "A mensagem ficou longa demais para enviar pelo WhatsApp."),
  /** Honeypot anti-bot: humano nunca preenche. */
  guild: z.string().max(0, "").optional().or(z.literal("")),
});

export type ParticipationInput = z.infer<typeof participationSchema>;
