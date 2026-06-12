"use server";

import { newsletterSchema } from "@/lib/validation";

export type NewsletterResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Inscreve um e-mail na newsletter.
 *
 * Integração futura (Supabase):
 *   await supabase.from("newsletter_subscribers").insert({
 *     name, email, source: "home", created_at: new Date().toISOString(),
 *   });
 * com unique constraint em `email` e dupla confirmação via e-mail.
 */
export async function subscribeToNewsletter(input: unknown): Promise<NewsletterResult> {
  const parsed = newsletterSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "Revise os campos e tente novamente." };
  }

  // Honeypot preenchido = bot. Finge sucesso e descarta.
  if (parsed.data.guild) {
    return { ok: true };
  }

  // Simula a latência de persistência até o Supabase entrar.
  await new Promise((resolve) => setTimeout(resolve, 900));
  console.info("[newsletter] novo inscrito:", parsed.data.email);

  return { ok: true };
}
