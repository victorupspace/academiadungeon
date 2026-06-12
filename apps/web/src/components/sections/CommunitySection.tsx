import { Lock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { contentIcons } from "@/lib/icons";
import { getCommunityFeatures } from "@/lib/content";

/**
 * Comunidade selada (prompt §16, v2): banda full-width com listra de
 * risco, carimbo "SELADA" em marca d'água e o índice de recursos
 * planejados em linhas técnicas. CTA ancorado na seção "Faça parte".
 */
export function CommunitySection() {
  const features = getCommunityFeatures();

  return (
    <section
      aria-labelledby="comunidade-title"
      className="relative overflow-hidden border-y-2 border-border-strong bg-bg-secondary"
    >
      {/* listra de risco no topo da banda */}
      <div aria-hidden="true" className="hazard-strip absolute inset-x-0 top-0 h-2 opacity-70" />
      <div aria-hidden="true" className="dungeon-grid absolute inset-0" />
      <div aria-hidden="true" className="blob blob-drift -right-32 bottom-0 h-96 w-96 opacity-40" />

      {/* carimbo em marca d'água */}
      <p
        aria-hidden="true"
        className="text-outline-faint pointer-events-none absolute -bottom-6 right-4 select-none font-display text-[clamp(4rem,14vw,11rem)] font-black uppercase leading-none font-stretch-expanded"
      >
        Selada
      </p>

      <Container className="relative py-section">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div data-reveal className="flex flex-wrap items-center gap-4">
                <Badge tone="amber" dot pulse>
                  Em construção
                </Badge>
                <span className="font-mono text-2xs uppercase tracking-[0.18em] text-text-muted">
                  04 {"// Comunidade"}
                </span>
              </div>

              <h2
                id="comunidade-title"
                data-reveal
                className="mt-6 text-balance font-display text-display-xl font-black uppercase font-stretch-expanded text-text-primary"
              >
                A comunidade ainda está{" "}
                <span className="text-brand-secondary">selada atrás da porta.</span>
              </h2>

              <p data-reveal className="mt-5 max-w-xl text-pretty text-base/7 text-text-secondary">
                Em breve, mestres poderão divulgar mesas, trocar materiais, encontrar jogadores,
                compartilhar campanhas e construir reputação dentro da Academia Dungeon.
              </p>

              <div data-reveal className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/#faca-parte" size="lg">
                  <Lock className="size-3.5" aria-hidden="true" />
                  Entrar na lista de espera
                </Button>
                <p className="font-mono text-2xs uppercase tracking-widest text-text-muted">
                  Avisaremos quando a porta abrir.
                </p>
              </div>
            </div>

            {/* índice de recursos planejados */}
            <div data-reveal className="lg:col-span-5">
              <p className="border-b-2 border-border-strong pb-3 font-mono text-2xs font-bold uppercase tracking-[0.18em] text-text-muted">
                Registro de obras {"// Planejado"}
              </p>
              <ul aria-label="Recursos planejados da comunidade">
                {features.map((feature, index) => {
                  const Icon = contentIcons[feature.icon];
                  return (
                    <li
                      key={feature.id}
                      className="flex items-center gap-4 border-b border-border-faint py-3.5"
                    >
                      <span className="font-mono text-2xs text-brand-ember">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Icon className="size-4 shrink-0 text-text-muted" aria-hidden="true" />
                      <span className="text-sm font-medium text-text-secondary">
                        {feature.label}
                      </span>
                      <Lock
                        className="ml-auto size-3.5 shrink-0 text-text-muted/60"
                        aria-hidden="true"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
