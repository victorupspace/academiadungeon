import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import type { NeonTone } from "@/types/content";

interface ComingSoonProps {
  badge?: string;
  badgeTone?: NeonTone | "brand";
  title: string;
  description: string;
  /** Eyebrow acima do título (ex.: nome da ala). */
  eyebrow?: string;
  /** Esconde o CTA de aviso por e-mail (ex.: na Área do Mestre). */
  withNewsletterCta?: boolean;
}

/**
 * Template das rotas futuras (prompt §25): páginas reais, na voz da
 * casa, no lugar de links mortos — cada ala anuncia o que está sendo
 * forjado e conduz de volta ao salão principal.
 */
export function ComingSoon({
  badge = "Em construção",
  badgeTone = "amber",
  title,
  description,
  eyebrow,
  withNewsletterCta = true,
}: ComingSoonProps) {
  return (
    <main id="conteudo" className="relative flex min-h-dvh items-center overflow-hidden">
      <div aria-hidden="true" className="dungeon-grid absolute inset-0" />
      <div aria-hidden="true" className="blob blob-drift -right-20 top-1/4 h-96 w-96 opacity-50" />

      <Container className="relative py-[calc(var(--ad-header-height)+4rem)]">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div data-reveal>
            <LogoMark className="h-16 w-16 text-text-secondary" />
          </div>
          <div data-reveal className="mt-7">
            <Badge tone={badgeTone} dot pulse>
              {badge}
            </Badge>
          </div>
          {eyebrow && (
            <p data-reveal className="eyebrow mt-7">
              <span className="text-brand-ember">{"// "}</span>
              {eyebrow}
            </p>
          )}
          <h1
            data-reveal
            className="mt-4 text-balance font-display text-display-xl font-black uppercase font-stretch-expanded text-text-primary"
          >
            {title}
          </h1>
          <p data-reveal className="mt-6 text-pretty text-base/7 text-text-secondary">
            {description}
          </p>
          <div data-reveal className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/">Voltar ao salão principal</Button>
            {withNewsletterCta && (
              <Button href="/#newsletter" variant="secondary">
                Ser avisado quando abrir
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </main>
  );
}
