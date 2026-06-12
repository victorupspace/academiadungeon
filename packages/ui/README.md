# @academia-dungeon/ui

Biblioteca futura de componentes reutilizáveis da Academia Dungeon.

## Por que existe desde já

O app `web` nasceu com os componentes dentro de `apps/web/src/components`. Quando o `apps/admin` (backoffice) entrar em desenvolvimento, os componentes base (Button, Badge, Tag, Card, Logo, inputs de formulário) serão promovidos para este pacote, evitando duplicação.

## Stack planejada

- **Vite em lib mode** para o build (ESM + tipos via `vite-plugin-dts`);
- **Storybook (builder Vite)** como playground e documentação viva;
- **Vitest** para testes de componente;
- Tokens via `@academia-dungeon/tokens` (peer dependency de CSS).

O Vite vive aqui — isolado do Next.js — exatamente para não competir com o bundler do App Router. Microfrontends e ferramentas internas independentes também devem nascer neste formato.

## Critério de promoção de componente

Um componente sai de `apps/web` para cá quando:

1. For necessário em mais de um app; e
2. Tiver API estável (props tipadas, estados de interação completos); e
3. Não depender de nada específico do Next.js (Link/Image são injetáveis via props).
