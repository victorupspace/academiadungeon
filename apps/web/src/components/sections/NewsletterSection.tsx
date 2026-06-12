import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";

const PROMISES = [
  "Conte o que você procura: materiais, parceria, comunidade, aulas ou projetos especiais.",
  "A mensagem abre direto no WhatsApp da Academia, sem cadastro e sem captura escondida.",
  "Respondemos por ordem de chegada com o próximo passo mais adequado para você.",
] as const;

/**
 * Seção de contato "Faça parte": painel chanfrado com canto de acento.
 * O id `faca-parte` é a âncora dos CTAs de contato e lista de espera.
 */
export function NewsletterSection() {
  return (
    <section
      id="faca-parte"
      aria-labelledby="faca-parte-title"
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
                    <span className="text-brand-ember">{"// "}</span>AD_FacaParte
                  </p>
                  <h2
                    id="faca-parte-title"
                    className="mt-4 text-balance font-display text-display-lg font-black uppercase font-stretch-expanded text-text-primary"
                  >
                    Faça parte da{" "}
                    <span className="text-brand-secondary">Academia Dungeon.</span>
                  </h2>
                  <p className="mt-5 max-w-xl text-pretty text-base/7 text-text-secondary">
                    Quer conversar sobre materiais, comunidade, cursos, parcerias ou uma demanda
                    específica para sua mesa? Envie uma mensagem direta e diga onde a Academia pode
                    ajudar.
                  </p>
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
