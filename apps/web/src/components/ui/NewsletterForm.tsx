"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckSquare, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";
import { newsletterSchema, type NewsletterInput } from "@/lib/validation";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

const labelClasses = "font-mono text-2xs font-bold uppercase tracking-[0.14em] text-text-secondary";

/**
 * Captura de e-mail (design.md §16): estados idle → loading → success |
 * error, validação Zod inline, honeypot anti-bot e aria-live para
 * leitores de tela. Persistência futura: Supabase via server action.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { name: "", email: "", guild: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    setStatus("loading");
    try {
      const result = await subscribeToNewsletter(data);
      setStatus(result.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex h-full flex-col items-start justify-center gap-3 border-[1.5px] border-neon-green/40 bg-neon-green/8 p-6",
          className
        )}
      >
        <CheckSquare className="size-6 text-neon-green" aria-hidden="true" />
        <p className="font-mono text-sm font-bold uppercase tracking-[0.08em] text-text-primary">
          Acesso concedido. O portão abriu.
        </p>
        <p className="text-sm/6 text-text-secondary">
          Você entrou para a Academia. O primeiro grimório chega à sua caixa de entrada em breve —
          confira também o spam, às vezes os corvos se perdem.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("flex flex-col gap-4", className)}>
      {/* honeypot — invisível para humanos, irresistível para bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="newsletter-guild">Não preencha este campo</label>
        <input
          id="newsletter-guild"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("guild")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="newsletter-name" className={labelClasses}>
          Nome
        </label>
        <input
          id="newsletter-name"
          type="text"
          autoComplete="name"
          placeholder="Como te chamam na mesa"
          disabled={status === "loading"}
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? "newsletter-name-error" : undefined}
          className="field-input"
          {...register("name")}
        />
        {errors.name && (
          <p
            id="newsletter-name-error"
            className="font-mono text-2xs uppercase tracking-[0.06em] text-neon-red"
            role="alert"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="newsletter-email" className={labelClasses}>
          E-mail
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="voce@taverna.com"
          disabled={status === "loading"}
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "newsletter-email-error" : undefined}
          className="field-input"
          {...register("email")}
        />
        {errors.email && (
          <p
            id="newsletter-email-error"
            className="font-mono text-2xs uppercase tracking-[0.06em] text-neon-red"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <p className="mb-3 flex items-start gap-2 border border-neon-red/40 bg-neon-red/8 px-3.5 py-2.5 font-mono text-2xs/4 uppercase tracking-[0.04em] text-neon-red">
            <TriangleAlert className="mt-px size-3.5 shrink-0" aria-hidden="true" />
            O ritual falhou. Verifique sua conexão e tente de novo.
          </p>
        )}
        <Button type="submit" size="lg" loading={status === "loading"} className="w-full">
          {status === "loading" ? "Abrindo o portão…" : "Entrar para a Academia"}
        </Button>
      </div>

      <p className="font-mono text-2xs/4 uppercase tracking-[0.04em] text-text-muted">
        Sem spam, sem maldições. Cancele com um clique.
      </p>
    </form>
  );
}
