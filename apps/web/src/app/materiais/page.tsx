import type { Metadata } from "next";
import { BookOpen, Clock, Library, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ContentCard } from "@/components/ui/ContentCard";
import { Grid } from "@/components/ui/Grid";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { getMaterialCategories, getMaterialCategory, getPublishedMaterials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Materiais",
  description:
    "Biblioteca de materiais para mestres de RPG: checklists, tabelas, guias de preparação, narrativa, worldbuilding e ferramentas.",
  alternates: { canonical: "/materiais" },
};

const statCards: Array<{
  icon: LucideIcon;
  label: string;
  getValue: (total: number, minutes: number, categories: number) => string;
}> = [
  {
    icon: Library,
    label: "Materiais publicados",
    getValue: (total: number) => total.toString().padStart(2, "0"),
  },
  {
    icon: Clock,
    label: "Minutos de leitura",
    getValue: (_total: number, minutes: number) => `${minutes}+`,
  },
  {
    icon: Sparkles,
    label: "Categorias ativas",
    getValue: (_total: number, _minutes: number, categories: number) => categories.toString(),
  },
];

export default function MateriaisPage() {
  const materials = getPublishedMaterials();
  const featured = materials.filter((material) => material.featured);
  const regular = materials.filter((material) => !material.featured);
  const categories = getMaterialCategories();
  const totalReadingMinutes = materials.reduce(
    (total, material) => total + material.readingTimeMinutes,
    0
  );

  return (
    <main id="conteudo" className="relative overflow-hidden">
      <section className="relative border-b border-border-faint bg-bg-primary pt-[calc(var(--ad-header-height)+4rem)]">
        <div aria-hidden="true" className="dungeon-grid absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute -right-36 top-16 h-[28rem] w-[28rem] rounded-full bg-blood/16 blur-[120px]"
        />

        <Container className="relative pb-16 sm:pb-20">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <div data-reveal className="mb-7">
                  <Badge tone="brand" dot>
                    Biblioteca aberta
                  </Badge>
                </div>
                <h1
                  data-reveal
                  className="max-w-3xl text-balance font-display text-display-2xl font-semibold text-text-primary"
                >
                  Materiais prontos para levar atrás do escudo.
                </h1>
                <p data-reveal className="mt-5 max-w-2xl text-pretty text-base/7 text-text-secondary">
                  Checklists, guias, tabelas e procedimentos para preparar melhor, improvisar com
                  consistência e conduzir aventuras com mais textura.
                </p>
                <div data-reveal className="scroll-x -mx-container mt-8 gap-2.5 px-container pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0 lg:mask-none">
                  {categories.map((category) => (
                    <Tag key={category.slug} tone={category.tone}>
                      {category.label}
                    </Tag>
                  ))}
                </div>
              </div>

              <div data-reveal className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {statCards.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border-subtle bg-surface-primary/70 p-5 shadow-card backdrop-blur-sm"
                    >
                      <Icon className="size-5 text-brand-ember" aria-hidden="true" />
                      <p className="mt-4 font-display text-4xl font-semibold text-text-primary">
                        {stat.getValue(materials.length, totalReadingMinutes, categories.length)}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-label text-text-muted">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {featured.length > 0 && (
        <section aria-labelledby="destaques-title" className="py-section-sm">
          <Container>
            <Reveal>
              <div className="mb-9 max-w-2xl">
                <p className="eyebrow" data-reveal>
                  <span aria-hidden="true" className="mr-2 opacity-70">
                    ◆
                  </span>
                  Comece por aqui
                </p>
                <h2
                  id="destaques-title"
                  data-reveal
                  className="mt-4 text-balance font-display text-display-lg font-semibold text-text-primary"
                >
                  Destaques da biblioteca
                </h2>
              </div>
              <Grid cols={2}>
                {featured.map((material) => (
                  <ContentCard
                    key={material.id}
                    material={material}
                    category={getMaterialCategory(material.category)}
                  />
                ))}
              </Grid>
            </Reveal>
          </Container>
        </section>
      )}

      <section aria-labelledby="acervo-title" className="bg-bg-secondary py-section">
        <Container>
          <Reveal>
            <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow" data-reveal>
                  <span aria-hidden="true" className="mr-2 opacity-70">
                    ◆
                  </span>
                  Acervo completo
                </p>
                <h2
                  id="acervo-title"
                  data-reveal
                  className="mt-4 text-balance font-display text-display-lg font-semibold text-text-primary"
                >
                  Tudo que já está publicado
                </h2>
              </div>
              <p data-reveal className="max-w-md text-sm/6 text-text-secondary">
                Os materiais aparecem em ordem editorial, dos volumes mais recentes aos arquivos
                mais antigos da biblioteca.
              </p>
            </div>

            <Grid cols={3}>
              {regular.map((material) => (
                <ContentCard
                  key={material.id}
                  material={material}
                  category={getMaterialCategory(material.category)}
                />
              ))}
            </Grid>
          </Reveal>
        </Container>
      </section>

      <section className="py-section-sm">
        <Container>
          <Reveal>
            <div
              data-reveal
              className="rounded-xl border border-border-brand-soft bg-surface-primary px-6 py-8 shadow-card sm:px-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <BookOpen className="size-6 text-brand-ember" aria-hidden="true" />
                  <h2 className="mt-4 font-display text-display-md font-semibold text-text-primary">
                    Novos volumes entram em catalogacao continuamente.
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm/6 text-text-secondary">
                    A newsletter avisa quando a biblioteca receber novos guias, tabelas ou
                    ferramentas prontas para mesa.
                  </p>
                </div>
                <Button
                  href="/#newsletter"
                  variant="secondary"
                  className="shrink-0"
                >
                  Entrar na lista
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
