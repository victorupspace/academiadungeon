"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckSquare, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { participationSchema, type ParticipationInput } from "@/lib/validation";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

const WHATSAPP_NUMBER = "5511970557813";
const labelClasses = "font-mono text-2xs font-bold uppercase tracking-[0.14em] text-text-secondary";

/**
 * Formulário de contato: validação Zod inline, honeypot anti-bot e
 * envio por WhatsApp com mensagem pré-preenchida.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParticipationInput>({
    resolver: zodResolver(participationSchema),
    defaultValues: { reason: "", guild: "" },
  });

  const onSubmit = handleSubmit((data) => {
    setStatus("loading");
    try {
      if (data.guild) {
        setStatus("success");
        return;
      }

      const text = `Olá! Quero fazer parte da Academia Dungeon.\n\n${data.reason}`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      setStatus("success");
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
          Mensagem pronta no WhatsApp.
        </p>
        <p className="text-sm/6 text-text-secondary">
          A conversa foi aberta com sua mensagem preenchida. Revise e envie quando estiver tudo
          certo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("flex flex-col gap-4", className)}>
      {/* honeypot — invisível para humanos, irresistível para bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="participation-guild">Não preencha este campo</label>
        <input
          id="participation-guild"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("guild")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="participation-reason" className={labelClasses}>
          Pq você quer fazer parte
        </label>
        <textarea
          id="participation-reason"
          rows={7}
          placeholder="Conte em poucas linhas como a Academia Dungeon pode te ajudar."
          disabled={status === "loading"}
          aria-invalid={errors.reason ? "true" : undefined}
          aria-describedby={errors.reason ? "participation-reason-error" : undefined}
          className="field-input min-h-44 resize-y py-3"
          {...register("reason")}
        />
        {errors.reason && (
          <p
            id="participation-reason-error"
            className="font-mono text-2xs uppercase tracking-[0.06em] text-neon-red"
            role="alert"
          >
            {errors.reason.message}
          </p>
        )}
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <p className="mb-3 flex items-start gap-2 border border-neon-red/40 bg-neon-red/8 px-3.5 py-2.5 font-mono text-2xs/4 uppercase tracking-[0.04em] text-neon-red">
            <TriangleAlert className="mt-px size-3.5 shrink-0" aria-hidden="true" />
            Não conseguimos abrir o WhatsApp. Tente novamente.
          </p>
        )}
        <Button type="submit" size="lg" loading={status === "loading"} className="w-full">
          {status === "loading" ? "Abrindo WhatsApp..." : "Enviar mensagem"}
        </Button>
      </div>

      <p className="font-mono text-2xs/4 uppercase tracking-[0.04em] text-text-muted">
        A mensagem abre no WhatsApp e fica pronta para você enviar.
      </p>
    </form>
  );
}
