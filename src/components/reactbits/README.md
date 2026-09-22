# React Bits components

Integrated from https://github.com/DavidHDev/react-bits on 2026-09-18.
Copyright (c) 2026 David Haz. License: MIT + Commons Clause; see LICENSE.md.
Original TypeScript source snapshots are stored in upstream/.

- Aurora: original shader, Elevarte palette, GSAP-controlled time, demand rendering,
  WebGL fallback, reduced-motion handling, ResizeObserver and context cleanup.
- ScrollFloat: original character split and stretch animation, attached to the
  existing studio timeline instead of an additional independent ScrollTrigger.
  Semantic inline wrappers and accessible unsplit labels.
- Magnet: original component with fine-pointer and reduced-motion guards; used
  on the contact form submit button.

No additional animation library is needed; Aurora uses ogl.

## Editorial revision

MetallicPaint was added from the same official repository on 2026-09-18.
The original shader and image-depth algorithm are retained in upstream/MetallicPaint.tsx.txt.
The Elevarte adapter uses the original SVG symbol, cached depth processing capped at
512px, capped device pixel ratio, demand rendering driven by the cinema timeline,
a static fallback and full reduced-motion/resource cleanup.
