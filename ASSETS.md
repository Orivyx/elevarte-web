# Website media

## Active selection

Vite publishes the files in public/assets and public/favicon.svg.

| File | Dimensions |
| --- | --- |
| aol-cover.webp | 1536 × 1024 |
| elevarte-logo.webp | 600 × 138 |
| elevarte-symbol.webp | 480 × 335 |
| nogueira-logo-original.svg | 510 × 162 |
| nogueira-original-caneca.webp | 3000 × 1692 |
| nogueira-original-cartoes.webp | 2000 × 1128 |
| tatiana-logo-original.svg | 1169 × 524 |
| tatiana-original-cartoes.webp | 3000 × 2000 |
| tatiana-original-cosmetico.webp | 5460 × 3642 |

## Provenance

- Nogueira: business cards and mug extracted from pages 31 and 32 of Manual IDV - Despachante Nogueira.pdf in refs/id-visuais. Converted to WebP without upscaling. The original logo was extracted as SVG from Logo/RGB/Logo Horizontal/PDF/Modelo 1.pdf.
- Tatiana: cosmetic mockup from Behance/Mockup 1.jpg and business cards from Behance/Mockup 2.jpg in the supplied Tatiana identity folder. Converted to WebP at native resolution. The logo was extracted from Illustrator/cmkyLogo escura-sem fundo.pdf.
- AOL: aol-cover.webp is the previously generated conceptual mockup, retained at the user's request. There is no second photograph.
- Elevarte: official supplied signature and symbol. The vector favicon is also used by the animated brand effect.

## Archived selection

- refs/: original supplied materials, preserved and excluded from Git.
- descarte/midia/: 12 unused media files, including the removed video and older variants. No media was deleted.
- descarte/inventario.json: filenames, sizes, and previous locations.
- descarte/codigo-video/: previous video components, outside the active source tree.
- descarte/ASSETS-anterior.md: historical provenance notes and generation prompts.
- artifacts/: working files and QA screenshots, excluded from Git.

The descarte directory is outside public and excluded from Git, so it is not published. To restore an asset, copy it into public/assets and update its reference in the component or src/data/projects.ts.
