import { Container } from "@/components/layout/Container";

/** Divisor rúnico entre seções (design.md, Apêndice B). */
export function SectionDivider() {
  return (
    <Container aria-hidden="true">
      <div className="rune-divider" />
    </Container>
  );
}
