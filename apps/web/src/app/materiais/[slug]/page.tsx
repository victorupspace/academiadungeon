import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Gauge, ScrollText } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { getMaterialCategory, getPublishedMaterials } from "@/lib/content";
import { contentIcons } from "@/lib/icons";
import { difficultyLabels, formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPublishedMaterials().map((material) => ({ slug: material.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const material = getPublishedMaterials().find((m) => m.slug === slug);
  if (!material) return {};
  return {
    title: material.title,
    description: material.excerpt,
    alternates: { canonical: `/materiais/${material.slug}` },
  };
}

export default async function MaterialPage({ params }: PageProps) {
  const { slug } = await params;
  const material = getPublishedMaterials().find((m) => m.slug === slug);
  if (!material) notFound();

  const category = getMaterialCategory(material.category);
  const Icon = contentIcons[material.icon];
  const body = material.body ?? [
    {
      heading: "Resumo do material",
      paragraphs: [material.excerpt],
    },
  ];

  return (
    <main id="conteudo" className="relative overflow-hidden">
      <section className="relative border-b border-border-faint bg-bg-primary pt-[calc(var(--ad-header-height)+3.5rem)]">
        <div aria-hidden="true" className="dungeon-grid absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute right-0 top-20 h-120 w-120 translate-x-1/3 rounded-full bg-blood/16 blur-[120px]"
        />

        <Container className="relative pb-14 sm:pb-20">
          <Button href="/materiais" variant="ghost" size="sm" className="-ml-3 mb-8">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Biblioteca
          </Button>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-end">
            <div>
              <Badge tone={category.tone} dot>
                {category.label}
              </Badge>
              <h1 className="mt-6 max-w-4xl text-balance font-display text-display-2xl font-semibold text-text-primary">
                {material.title}
              </h1>
              <p className="mt-5 max-w-3xl text-pretty text-base/7 text-text-secondary">
                {material.excerpt}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {material.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border-subtle bg-surface-primary/80 p-6 shadow-card backdrop-blur-sm">
              <div className="flex size-12 items-center justify-center rounded-lg border border-border-brand-soft bg-surface-elevated text-brand-ember">
                <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-border-faint pb-4">
                  <dt className="inline-flex items-center gap-2 text-sm text-text-muted">
                    <Clock className="size-4" aria-hidden="true" />
                    Leitura
                  </dt>
                  <dd className="text-sm font-semibold text-text-primary">
                    {material.readingTimeMinutes} min
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-border-faint pb-4">
                  <dt className="inline-flex items-center gap-2 text-sm text-text-muted">
                    <Gauge className="size-4" aria-hidden="true" />
                    Nível
                  </dt>
                  <dd className="text-sm font-semibold text-text-primary">
                    {difficultyLabels[material.difficulty]}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="inline-flex items-center gap-2 text-sm text-text-muted">
                    <ScrollText className="size-4" aria-hidden="true" />
                    Publicado
                  </dt>
                  <dd className="text-sm font-semibold text-text-primary">
                    {formatDate(material.publishedAt)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <article className="bg-bg-secondary py-section-sm">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,44rem)_1fr]">
          <div className="space-y-11">
            {body.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-display-md font-semibold text-text-primary">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base/8 text-text-secondary">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm/6 text-text-secondary">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-ember" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <aside className="lg:pl-6">
            <div className="sticky top-[calc(var(--ad-header-height)+1.5rem)] rounded-xl border border-border-subtle bg-surface-primary p-6 shadow-card">
              <p className="eyebrow">Uso na mesa</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-text-primary">
                Leia com uma sessão em mente.
              </h2>
              <p className="mt-3 text-sm/6 text-text-secondary">
                Anote uma cena, uma decisão e uma consequência que você pode levar para a próxima
                aventura. O material rende mais quando vira procedimento.
              </p>
              <Button href="/#newsletter" variant="secondary" className="mt-6 w-full">
                Receber novos materiais
              </Button>
            </div>
          </aside>
        </Container>
      </article>
    </main>
  );
}
