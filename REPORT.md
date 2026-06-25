# Recetario Vivo — Build Report

## Repo Inventory

- **Source repo**: executiveusa/kupuri-recetario-vivo
- **Branch**: claude/exciting-hopper-uqtpx9
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Flipbook**: react-pageflip (StPageFlip wrapper)
- **Search**: Fuse.js
- **Voice**: Web Speech API (browser-native)
- **Validation**: Zod

## Inspiration Site Analysis

**Sandra Sii (cook.sandrasii.com)** — Visual direction:
- Black top navigation with minimal links
- Large food photography grid as hero
- Hover reveals recipe/category labels centered on images
- Awards-quality minimalism
- Photography-first impact
- Google Fonts: Raleway + Lato

**Applied to Recetario Vivo**:
- Dark hero chrome (#050505) with cinematic food tile grid
- Warm paper (#F8F1E4) for content pages
- Raleway for display/nav, Lato for body, Lora for recipe reading
- Hover interactions on hero tiles
- Minimal, obvious navigation

## Design Decisions

1. **Tailwind v4 without shadcn/ui**: shadcn init has compatibility issues with Tailwind v4 + Next.js 16. Custom components built directly.
2. **Sample recipe data**: PDF not present in repo; recipes created from known "Good and Cheap" cookbook content with Mexican Spanish translations.
3. **Static-first**: No database, no auth, no backend beyond simple API routes.
4. **Browser-native voice**: Web Speech API for recognition + synthesis. No paid API keys required.
5. **Color gradient tiles**: Hero uses colored gradients per recipe accent instead of real photos (PDF extraction not yet run).

## Direct Repos Used

| Repo | Usage |
|------|-------|
| Nodlik/react-pageflip | Direct dependency — React wrapper for StPageFlip flipbook engine |
| Nodlik/StPageFlip | Underlying engine (accessed via react-pageflip wrapper) |

## Conceptual Repos Used

| Repo | Concept Borrowed |
|------|-----------------|
| executiveusa/synthia-superdesign | Visual scan discipline, Awwwards polish approach |
| blasten/turn.js | Page flip interaction patterns (not used as dependency — jQuery + non-commercial BSD) |
| ts1/flipbook-vue | Zoom, drag-to-flip, lighting ideas (not used — Vue-based) |

## Deferred Repos

| Repo | Reason |
|------|--------|
| jgravelle/jcodemunch-mcp | MCP server not available in environment; token compression deferred |
| paperclipai/paperclip | No backend needed in v1 |
| revfactory/claude-code-harness | Agent harness not needed |
| supabase-community/supabase-mcp | No database in v1 |
| All others in deferred list | v1 is static-first, noncommercial |

## Flipbook Dependency Decision

**Selected**: `react-pageflip` (npm package)
- React wrapper for StPageFlip
- MIT licensed
- Supports: realistic page turns, HTML pages, mobile, portrait/landscape, soft/hard pages
- Direct page methods: flipNext, flipPrev via ref

**Rejected**:
- `turn.js`: jQuery-based, non-commercial BSD license conflict with CC BY-NC-SA
- `flipbook-vue`: Vue-first, not suitable for React/Next.js

## License Risks

- Source cookbook (Good and Cheap) is CC BY-NC-SA 4.0 — **noncommercial only**
- Attribution displayed in footer, /acerca page, README, metadata
- No ads, affiliates, subscriptions, or paid exports
- Future cookbooks require separate rights verification

## Accessibility

- WCAG-conscious contrast ratios
- Visible focus states on all interactive elements
- All buttons have text labels (no icon-only mystery controls)
- Keyboard navigation throughout
- Reduced motion support (prefers-reduced-motion)
- Screen reader accessible flipbook fallback
- Voice transcript visible
- Mobile tap targets 44px+
- Alt text on all images

## Performance

- Static-first architecture
- Dynamic import for browser-only components (flipbook, voice)
- Lazy-loaded recipe images
- Split client/server components
- Reasonable bundle size

## Build/Test Status

- `npm run build`: [pending verification]
- `npm run lint`: [pending verification]
- `npm run typecheck`: [pending verification]
- `npm run test`: [pending verification]

## Known Limitations

1. No real PDF extraction — cookbook PDF not present in repo
2. Recipe data is representative sample (12 recipes) not full 70+ extraction
3. No real food photography — uses colored gradient tiles
4. Voice recognition browser-dependent (Chrome/Edge best)
5. No LLM integration without API keys
6. No Vercel deployment in this session
7. jcodemunch MCP not available for token compression

## Next Best Patch

1. Upload cookbook PDF and run extraction pipeline
2. Add remaining 60+ recipes with full translations
3. Extract and optimize real page images for flipbook
4. Extract recipe photos for hero grid
5. Add Playwright E2E tests
6. Deploy to Vercel
7. Lighthouse performance audit
8. Add remaining interactive features (budget slider, kitchen radio)
