# @academia-dungeon/tokens

Design tokens da Academia Dungeon — fonte única de verdade para cor, tipografia, espaçamento, radius, sombras, bordas, motion e camadas.

## Uso

```css
/* em qualquer app/pacote do monorepo */
@import "@academia-dungeon/tokens";
```

No app `web`, os tokens são mapeados para utilities do Tailwind v4 via `@theme inline` em `apps/web/src/app/globals.css`.

## Regras

- Nenhum componente deve usar valores crus de cor/sombra/radius — sempre tokens.
- Mudanças aqui afetam todos os apps; revisar contra `docs/design.md` antes de alterar.
- Futuro: gerar `tokens.ts` (JS/TS) a partir deste CSS para uso em runtime (gráficos, canvas, e-mails).
