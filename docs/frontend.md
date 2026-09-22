# Frontend conventions

## Translations

The i18next instance is initialized in src/i18n/index.ts before React renders. Components read translations through react-i18next useTranslation; do not pass language props or add Portuguese/English ternaries. Add matching keys to src/i18n/locales/pt.json and en.json. Brand names stay unchanged.

Language detection checks elevarte-language in localStorage, then the browser language, with Portuguese as fallback. The languageChanged listener updates the document lang and direction. Changing language rebuilds text-dependent GSAP timelines through their effect dependencies.

## Styling

Tailwind CSS v4 is compiled by @tailwindcss/vite. src/styles/index.css declares theme tokens and base styles. Use utility classes in components for ordinary layout, spacing, controls and responsive states. Header and ContactForm are migrated examples. Base rules must stay in the base layer so they do not override utilities.

src/styles/index.css is the only application CSS file. It contains the Tailwind import, theme tokens, two variants, and global base rules. All visual, responsive, reduced-motion, canvas and cinematic composition styles live in their React components as Tailwind utilities. Hero, ProjectCase, and ProjectIndex are in src/components/cinema; Composition owns the shared 1600px artboard. Semantic classes are only GSAP/test hooks, not external CSS selectors. Do not add section stylesheets or move utility strings into a global styles map.

## Verification

Start npm run dev before running browser checks. The scripts currently use the locally installed Edge executable on Windows.

- npm run build — TypeScript and production bundle.
- npm run test:i18n — catalogue parity, language switching and persistence, fallback, form retention and localized message composition, computed Tailwind styles and reduced motion. Form navigation is prevented; this test sends no message.
- npm run test:responsive — 390, 1440, 2560, 3440 and 5120px layouts.
- npm run test:visual — cinematic reversibility, navigation and reduced motion.

Historical scripts may contain assertions for earlier layouts or the removed video. Update their expectations against the current timeline before relying on them.
