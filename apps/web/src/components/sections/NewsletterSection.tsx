import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";

const PROMISES = [
  "Um grimório por semana: guias, tabelas e achados da redação",
  "Materiais novos antes de todo mundo, direto da forja",
  "Zero spam — palavra de mestre; cancele com um clique",
] as const;

/**
 * Captura de e-mail (prompt §17, v2): painel chanfrado com canto de
 * acento. O id `newsletter` é a âncora dos CTAs "Entrar na Academia"
 * e da lista de espera da comunidade.
 */
export function NewsletterSection() {
  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-title"
      className="scroll-mt-header pb-section pt-section-sm"
    >
      <Container>
        <Reveal>
          <div data-reveal className="relative">
            {/* placa de fundo deslocada */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 h-full w-full border border-border-strong"
            />
            <div aria-hidden="true" className="absolute -bottom-3 -right-3 h-12 w-12 bg-brand-accent" />

            <div className="clip-notch relative overflow-hidden border-2 border-border-strong bg-surface-primary p-8 sm:p-12 lg:p-14">
              <div aria-hidden="true" className="dungeon-grid absolute inset-0" />
              <div aria-hidden="true" className="blob -right-24 -top-24 h-72 w-72 opacity-45" />

              <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
                <div>
                  <p className="eyebrow">
                    <span className="text-brand-ember">{"// "}</span>AD_Newsletter
                  </p>
                  <h2
                    id="newsletter-title"
                    className="mt-4 text-balance font-display text-display-lg font-black uppercase font-stretch-expanded text-text-primary"
                  >
                    Grimórios, guias e notícias{" "}
                    <span className="text-brand-secondary">direto da dungeon.</span>
                  </h2>
                  <ul className="mt-8 space-y-0">
                    {PROMISES.map((promise, index) => (
                      <li
                        key={promise}
                        className="flex items-start gap-3 border-t border-border-faint py-3 last:border-b"
                      >
                        <span className="mt-0.5 font-mono text-2xs font-bold text-brand-ember">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm/6 text-text-secondary">{promise}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <NewsletterForm className="lg:pt-2" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
