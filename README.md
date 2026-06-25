# Recetario Vivo

**Come Bien con 70 Pesos al Día**

Un recetario interactivo en español mexicano que convierte un libro de cocina en una experiencia viva: páginas animadas, recetas guiadas, voz, fotos, listas y modo cocinar.

## About

Recetario Vivo is a reusable cookbook transformation engine. The first cookbook experience is based on *Good and Cheap: Eat Well on $4/Day* by Leanne Brown.

> Recipes, text, and most photographs by Leanne Brown.
> Based on Good and Cheap: Eat Well on $4/Day.
> Used under Creative Commons Attribution-NonCommercial-ShareAlike 4.0.
> This interactive adaptation is noncommercial and educational.

## Why Noncommercial

The source cookbook is licensed under CC BY-NC-SA 4.0. This app honors that license: no ads, no affiliate links, no subscriptions, no paid exports. Future cookbooks must pass a rights check before publishing.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Extract Cookbook Assets

```bash
npm run cookbook:extract
npm run cookbook:build
npm run cookbook:validate
```

## Quality Gates

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Deploy to Vercel

```bash
npm run build
npx vercel --prod
```

## Voice Browser Support

Voice features use the Web Speech API (SpeechRecognition + SpeechSynthesis). Supported in Chrome, Edge, and Safari. Firefox has partial support. A text input fallback is provided for unsupported browsers.

## Adding a Future Cookbook

1. Place the source PDF in `cookbooks/[cookbook-name]/`
2. Run the extraction pipeline
3. Verify license compatibility (must be rights-cleared for noncommercial use)
4. Add recipe data to `src/data/`
5. Run quality gates

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- react-pageflip (StPageFlip wrapper)
- Web Speech API
- Fuse.js (search)
- Zod (validation)

## License

This interactive adaptation is licensed under CC BY-NC-SA 4.0, consistent with the source material. The application code is MIT licensed where it does not contain cookbook content.
