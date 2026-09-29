# PRDF - kupuri-recetario-vivo (Production Readiness & Design Findings)

Inspected: 2026-09-28. Method: real code, real build, real tests - README ignored per owner order. Benchmark: Collins protocol + gauntlet skills. Verdict scale: production-ready distance.

## VERDICT: TIER 1 - CLOSEST TO PRODUCTION (ship-ready after minor fixes)
Live: https://kupuri-recetario-vivo.vercel.app (200). Next.js 16.3.5 / React 19, es-MX-first bilingual, voice-guided cookbook built on the open-licensed "Good and Cheap" (Leanne Brown) with proper attribution page.

## EVIDENCE (verified this inspection)
- `npm ci` clean; `npm run build` PASSES - 11 routes render (recetas, recetas/[slug], tecnicas, libro, despensa, ingredientes, voz, acerca, api/health, api/chat).
- `tsc --noEmit` CLEAN. `vitest run` 9/9 PASS.
- Real content: 5 cookbook sections, 47 recipe-data markers with real MXN/USD costs; no lorem/TODO/FIXME anywhere in src; input "placeholder" hits are legitimate search-field UX text in Mexican Spanish.
- License attribution component + acerca page disclose the source book and the currency-conversion caveat (honest math, honest scope).
- Voice assistant is browser-native Web Speech API (es-MX), zero external dependencies, privacy-clean.
- Metadata present: real title/description + OG in layout.

## VIOLATIONS / GAPS (severity + standard broken)
1. MED - Lint gate dead: `npx eslint .` crashes inside eslint-config-next (dist/index.js load error). Code ships with no style gate. Fix: pin/repair eslint-config-next version or replace config; add lint to CI. (Gauntlet: automated-gates requirement.)
2. MED - Dead e2e promise: package.json advertises `test:e2e` (playwright) but no playwright.config and no e2e specs exist. Fix: add config + 3 smoke specs (home, receta detail, voice page) or remove the script. (Truth-in-tooling.)
3. LOW - Orphaned API stub: /api/chat returns "not_configured" and no component calls it. Harmless but dead surface. Fix: wire the assistant or delete the route. (Collins 2.4: no dead ends.)
4. LOW - Test coverage thin: 1 test file / 9 tests for 44 source modules (voice, flipbook, pantry logic untested). Fix: unit-test currency + search + commands first.
5. LOW - Hardcoded FX rate (17.6139 MXN/USD) in user-facing copy; will go stale. Fix: constant + "rate as of <date>" label.
6. LOW - No Dockerfile / self-host path; Vercel-only. Fix: add Dockerfile for the old-box lane if desired.
7. INFO - Collins design gate: visual/UX passed no formal review (no design tokens doc, no a11y audit run); axe/Lighthouse audit recommended before calling it done.

## FIX LIST TO PRODUCTION-READY (ordered)
1 (30m) repair eslint; 2 (1h) playwright smoke or remove; 3 (15m) wire or delete /api/chat; 4 (2h) unit tests for currency/search/commands; 5 (10m) FX constant + date label; 7 (1h) axe + Lighthouse pass, fix criticals. Estimated: half a day.

## PORTFOLIO ROLE
Strong consumer-product proof: bilingual UX, voice interaction, licensing integrity, honest cost math. Keep in the top five.
