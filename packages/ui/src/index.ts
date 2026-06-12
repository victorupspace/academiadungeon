/**
 * @academia-dungeon/ui
 *
 * Pacote reservado para a futura biblioteca de componentes compartilhados
 * entre apps/web e apps/admin. Plano (ver README):
 *
 * 1. Promover componentes estáveis de apps/web/src/components/ui para cá;
 * 2. Build com Vite (lib mode) + vite-plugin-dts;
 * 3. Playground/documentação com Storybook (builder Vite);
 * 4. Consumo via `transpilePackages` no Next.js durante o desenvolvimento.
 *
 * Por enquanto exporta apenas a versão para validar o wiring do workspace.
 */
export const UI_PACKAGE_VERSION = "0.1.0";
