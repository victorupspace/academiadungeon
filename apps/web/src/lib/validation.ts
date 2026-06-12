import { z } from "zod";

/**
 * Schemas compartilhados entre client (React Hook Form) e server actions.
 */
export const newsletterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Diga como devemos te chamar.")
    .max(80, "Esse nome é longo demais para o grimório."),
  email: z.email("Esse e-mail não parece válido."),
  /** Honeypot anti-bot: humano nunca preenche. */
  guild: z.string().max(0, "").optional().or(z.literal("")),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
