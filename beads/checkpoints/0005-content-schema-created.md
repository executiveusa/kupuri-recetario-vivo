---
id: bead-0005
timestamp: 2026-06-25T22:38:00Z
actor: claude-code
phase: data
repo: executiveusa/kupuri-recetario-vivo
branch: claude/exciting-hopper-uqtpx9
files_changed: [src/lib/types.ts, src/data/recipes.ts, src/lib/currency.ts]
decision: Created full TypeScript data model and 12 sample recipes
reason: Source PDF not in repo; representative data enables full UI development
rollback_command: git checkout HEAD -- src/lib/types.ts src/data/recipes.ts
risks: [Sample data not from actual PDF extraction]
next_action: Build UI components
human_needed: false
---

## Content Schema

### Types Created
- Cookbook, CookbookLicense, CookbookSection, CookbookPage
- Recipe, RecipeHeroMeta, RecipeIngredient, RecipeStep, RecipeTimer, RecipeTip
- Locale type: "en" | "es-MX"

### Sample Recipes (12)
1. Huevos Revueltos con Jitomate
2. Toronja al Gratinador
3. Omelette
4. Hotcakes de Plátano
5. Muffins de Chocolate y Calabacita
6. Scones Integrales de Jalapeño y Queso
7. Barras de Granola con Crema de Cacahuate
8. Dal (Lentejas al Estilo Indio)
9. Sopa de Elote
10. Elotes Callejeros
11. Tacos de Coliflor
12. Torta de Huevo con Champiñones

### Currency Constants
- USD_TO_MXN_SNAPSHOT: 17.6139
- DISPLAY_DAILY_BUDGET_MXN: 70
- SAFE_DAILY_BUDGET_COPY: "menos de 80 pesos al día"
