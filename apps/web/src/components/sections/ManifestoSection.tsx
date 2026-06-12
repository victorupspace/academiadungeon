import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

const PILLARS = [
  {
    title: "Estudo como afiação",
    text: "Sistemas, técnicas e teoria de jogo destrinchados em linguagem de mesa.",
  },
  {
    title: "Preparação como ritual",
    text: "Métodos e ferramentas para chegar à sessão com a faca amolada.",
  },
  {
    title: "Mesa como comunidade",
    text: "Narrar é um ofício coletivo — ninguém atravessa a masmorra sozinho.",
  },
] as const;

/**
 * Manifesto (prompt §9.8, v2): a proposta de valor como cartaz
 * tipográfico, com os verbos do juramento em crimson, sustentada por
 * três pilares numerados.
 */
export function ManifestoSection() {
  return (
    <section aria-labelledby="manifesto-title" className="relative overflow-hidden py-section">
      <div aria-hidden="true" className="blob left-1/2 top-1/2 h-104 w-144 -translate-x-1/2 -translate-y-1/2 opacity-35" />

      <Container className="relative">
        <Reveal>
          <h2 id="manifesto-title" className="sr-only">
            Manifesto da Academia Dungeon
          </h2>

          <p data-reveal className="eyebrow">
            <span className="text-brand-ember">{"// "}</span>O juramento da Academia
          </p>

          <blockquote data-reveal className="mt-8">
            <p className="max-w-5xl font-display text-display-lg font-black uppercase font-stretch-expanded text-text-primary">
              Preparação vira <span className="text-brand-secondary">ritual</span>. Improviso vira{" "}
              <span className="text-brand-secondary">técnica</span>. Sessões comuns viram{" "}
              <span className="text-outline">histórias que duram anos</span>.
            </p>
          </blockquote>

          <div className="mt-12 grid grid-cols-1 border-t-2 border-border-strong sm:grid-cols-3">
            {PILLARS.map((pillar, index) => (
              <div
                key={pillar.title}
                data-reveal
                className="border-b border-border-faint py-6 sm:border-b-0 sm:border-r sm:border-border-faint sm:px-6 sm:first:pl-0 sm:last:border-r-0"
              >
                <p className="font-mono text-2xs font-bold uppercase tracking-[0.18em] text-brand-ember">
                  {String(index + 1).padStart(2, "0")} {"//"}
                </p>
                <h3 className="mt-3 text-sm font-bold uppercase tracking-[0.06em] text-text-primary">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm/6 text-text-secondary">{pillar.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
