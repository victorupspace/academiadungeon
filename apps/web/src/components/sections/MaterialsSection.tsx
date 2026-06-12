"use client";

import { useMemo, useRef, useState } from "react";
import { BookX } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ContentCard } from "@/components/ui/ContentCard";
import { Grid } from "@/components/ui/Grid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getMaterialCategories, getMaterialCategory, getPublishedMaterials } from "@/lib/content";
import { EASE, prefersReducedMotion, registerGsap } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { MaterialCategorySlug } from "@/types/content";

registerGsap();

type Filter = "todos" | MaterialCategorySlug;

/**
 * Biblioteca editorial (prompt §14): grid de artefatos com filtros
 * quadrados em mono. A troca de filtro anima com stagger curto (e fica
 * estática sob reduced-motion).
 */
export function MaterialsSection() {
  const [filter, setFilter] = useState<Filter>("todos");
  const gridRef = useRef<HTMLDivElement>(null);

  const allMaterials = useMemo(() => getPublishedMaterials(), []);
  const categories = useMemo(() => getMaterialCategories(), []);

  const visibleMaterials = useMemo(
    () => (filter === "todos" ? allMaterials : allMaterials.filter((m) => m.category === filter)),
    [allMaterials, filter]
  );

  useGSAP(
    () => {
      if (!gridRef.current || prefersReducedMotion()) return;
      gsap.fromTo(
        gridRef.current.querySelectorAll("[data-card]"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, ease: EASE.out, stagger: 0.04, clearProps: "transform" }
      );
    },
    { dependencies: [filter], scope: gridRef }
  );

  const filterButton = (value: Filter, label: string) => {
    const active = filter === value;
    return (
      <button
        key={value}
        type="button"
        onClick={() => setFilter(value)}
        aria-pressed={active}
        className={cn(
          "shrink-0 whitespace-nowrap border px-3.5 py-2",
          "font-mono text-2xs font-bold uppercase tracking-widest",
          "transition-colors duration-150 ease-out-soft",
          active
            ? "border-brand-accent bg-brand-accent text-white"
            : "border-border-strong bg-transparent text-text-secondary hover:border-border-subtle hover:text-text-primary"
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <section aria-labelledby="materiais-title" className="py-section">
      <Container>
        <Reveal>
          <SectionHeader
            index="02"
            eyebrow="Materiais e guias"
            title={<span id="materiais-title">A biblioteca do mestre</span>}
            description="Checklists, tabelas, métodos e guias de preparação — escritos para serem usados na mesa, não apenas lidos."
            action={
              <Button href="/materiais" variant="ghost" className="-mr-2 text-xs uppercase tracking-[0.12em]">
                Ver biblioteca completa <span aria-hidden="true">→</span>
              </Button>
            }
          />

          <div data-reveal className="mt-8">
            <div
              role="group"
              aria-label="Filtrar materiais por categoria"
              className="scroll-x -mx-container gap-2 px-container pb-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0 lg:mask-none"
            >
              {filterButton("todos", "Todos")}
              {categories.map((category) => filterButton(category.slug, category.label))}
            </div>
          </div>

          <div data-reveal ref={gridRef} className="mt-8">
            {visibleMaterials.length > 0 ? (
              <Grid cols={3}>
                {visibleMaterials.map((material) => (
                  <div key={material.id} data-card className="flex">
                    <ContentCard
                      material={material}
                      category={getMaterialCategory(material.category)}
                      className="flex-1"
                    />
                  </div>
                ))}
              </Grid>
            ) : (
              /* estado vazio na voz da casa (design.md §15) */
              <div className="flex flex-col items-center gap-3 border border-border-strong bg-surface-primary px-6 py-16 text-center">
                <BookX className="size-8 text-text-muted" aria-hidden="true" />
                <p className="font-mono text-sm font-bold uppercase tracking-[0.08em] text-text-primary">
                  Nenhum material nesta ala — ainda.
                </p>
                <p className="max-w-sm text-sm/6 text-text-secondary">
                  Os escribas estão trabalhando. Volte ao filtro{" "}
                  <button
                    type="button"
                    onClick={() => setFilter("todos")}
                    className="font-bold text-brand-ember underline-offset-4 hover:underline"
                  >
                    Todos
                  </button>{" "}
                  para ver o acervo completo.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
