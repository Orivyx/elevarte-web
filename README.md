# Elevarte Design

A portfolio website built with React, TypeScript, Vite, Tailwind CSS, GSAP ScrollTrigger, and Swiper.

## Development

```sh
npm install
npm run dev
```

Run npm run build to check TypeScript and create the production bundle. Run npm run preview to serve the production build locally.

## Structure

- src/sections: page sections.
- src/components: reusable components and local Tailwind styling.
- src/animations: scroll timelines and navigation.
- src/i18n/locales: Portuguese and English translations.
- src/data/projects.ts: project metadata and asset references.
- src/data/testimonials.ts: testimonials supplied by the user.
- public/assets: selected production media only.
- ASSETS.md: media inventory and provenance.
- refs, descarte, and artifacts: local files excluded from Git.

Nogueira and Tatiana use supplied original logos and mockups. AOL uses one conceptual image. Scrolling replaces the first photograph with the second; the Tatiana video has been removed. Testimonials use an automatic Swiper carousel without visible controls.

## Contact

The form prepares a message and opens WhatsApp at +55 11 98194-0728. The visitor confirms sending it in WhatsApp. Instagram: @elevarte.design.

## Git and deployment

The primary branch is master. The origin remote is git@github.com:Orivyx/elevarte-web.git. Write documentation, comments, and Conventional Commit messages in English.

Dependencies, builds, references, discarded media, working artifacts, and environment files are excluded through .gitignore.

Before deploying to the final domain, update canonical and og:url in index.html. Vite publishes the active contents of public and dependencies imported by the application.
