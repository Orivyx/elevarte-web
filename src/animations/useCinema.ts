import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, CINEMA_DURATION } from "./engine";
import type { Language } from "../i18n";

/** One camera, four compositions. The scrollbar owns every frame. */
export function useCinema(
  root: RefObject<HTMLElement | null>,
  language: Language,
) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        mobile: "(max-width:767px)",
      },
      (ctx) => {
        if (!ctx.conditions?.motion) return;
        const mobile = !!ctx.conditions.mobile;
        const q = gsap.utils.selector(root);
        gsap.set(q(".hero-sculpture"), {
          rotate: -14,
          transformPerspective: 1200,
        });
        gsap.set(q(".c-headline"), {
          transformPerspective: 1200,
          transformOrigin: "58% 65%",
        });
        gsap.set(q(".c-letter"), { transformPerspective: 900 });
        gsap.set(q(".case-panel"), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(q(".c-n-detail,.c-t-detail"), {
          clipPath: "inset(0% 0% 100% 0%)",
        });
        gsap.set(q(".cinema-index,.c-exhibit-label"), { autoAlpha: 0 });
        gsap.set(q(".c-end"), { autoAlpha: 0 });

        let activeProject = 0;
        let light = false;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "cinema",
            trigger: root.current,
            start: "top top",
            end: () => "+=" + innerHeight * (mobile ? 12 : 15) * (CINEMA_DURATION / 28),
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const time = self.progress * CINEMA_DURATION;
              root.current?.dispatchEvent(
                new CustomEvent("cinema-frame", { detail: { time } }),
              );
              const project = time < 10.8 ? 1 : time < 16.4 ? 2 : 3;
              if (activeProject !== project) {
                activeProject = project;
                root.current?.setAttribute("data-project", String(project));
              }
              const nextLight = time > 11.6 && time < 20.9;
              if (light !== nextLight) {
                light = nextLight;
                document.body.classList.toggle("cinema-light", light);
              }
            },
            onLeave: () => {
              light = false;
              document.body.classList.remove("cinema-light");
            },
            onLeaveBack: () => {
              light = false;
              document.body.classList.remove("cinema-light");
            },
          },
        });

        tl.fromTo(
          q(".rb-aurora"),
          { opacity: 0.1, yPercent: -25 },
          { opacity: 0.6, yPercent: 8, duration: 1.7 },
          0,
        ).to(
          q(".rb-aurora"),
          { opacity: 0, yPercent: -15, duration: 1.8 },
          1.7,
        );
        tl.to(
          q(".hero-sculpture"),
          {
            xPercent: -75,
            yPercent: 50,
            scale: 1.55,
            rotationY: -28,
            rotate: 18,
            duration: 1.65,
            ease: "power1.inOut",
          },
          0,
        )
          .to(
            q(".hero-sculpture"),
            {
              xPercent: -115,
              yPercent: -10,
              scale: 3.2,
              rotate: -25,
              opacity: 0,
              duration: 1.65,
              ease: "power2.inOut",
            },
            1.65,
          )
          .to(
            q(".hero-kicker"),
            { clipPath: "inset(0% 0% 100% 0%)", yPercent: -25, duration: 0.75 },
            0.25,
          );
        // Preserve the hero, then open one fixed photographic frame.
        tl.addLabel("hero", 0)
          .to(
            q(".c-recede"),
            { yPercent: -65, scale: 0.88, opacity: 0.08, duration: 1.5 },
            0,
          )
          .to(
            q(".c-headline"),
            {
              scale: mobile ? 2.2 : 2.65,
              yPercent: -16,
              duration: 2.65,
              ease: "power2.in",
            },
            0.55,
          )
          .fromTo(
            q(".c-type-light"),
            { clipPath: "polygon(-30% 0, -10% 0, -30% 100%, -50% 100%)" },
            {
              clipPath: "polygon(130% 0, 150% 0, 130% 100%, 110% 100%)",
              duration: 1.8,
            },
            0.75,
          )
          .to(
            q(".c-letter"),
            {
              xPercent: (i) => (i - 3) * 95,
              yPercent: (i) => (i % 2 ? 115 : -115),
              rotationX: (i) => (i % 2 ? 48 : -48),
              rotationZ: (i) => (i - 3) * 3,
              duration: 1.4,
              stagger: { amount: 0.18, from: "center" },
              ease: "power2.in",
            },
            1.8,
          )
          .to(
            q(".c-hero-meta"),
            { yPercent: 50, opacity: 0, duration: 0.7 },
            0.6,
          )
          .fromTo(
            q(".c-hero-glow"),
            { xPercent: -40, opacity: 0 },
            { xPercent: 40, opacity: 0.6, duration: 2 },
            0.3,
          )
          .to(q(".c-hero-glow"), { opacity: 0, duration: 0.6 }, 2.3)
          .to(
            q(".c-nogueira"),
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7 },
            2.5,
          )
          .set(q(".c-headline"), { autoAlpha: 0 }, 3.5)
          .to(q(".cinema-index"), { autoAlpha: 1, duration: 0.4 }, 4)
          .addLabel("nogueira", 4.6)
          .to(
            q(".c-n-detail"),
            { clipPath: "inset(0% 0% 0% 0%)", duration: 2.2 },
            6.4,
          )
          .to(
            q(".c-aol"),
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3 },
            10.8,
          )
          .addLabel("aol", 12.8)
          .to(
            q(".c-tatiana"),
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5 },
            16.4,
          )
          .addLabel("tatiana", 18)
          .to(
            q(".c-t-detail"),
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1 },
            19.2,
          )
         .to(q(".cinema-index"), { autoAlpha: 0, duration: 0.45 }, 20.9)
          .to(
            q(".c-end"),
            {
              autoAlpha: 1,
              duration: 0.45,
              ease: "power2.inOut",
            },
            20.9,
          )
          .to(q(".c-end img"), { scale: 0.8, opacity: 0, duration: 0.25 }, 21.35)
          .to(q(".c-end span"), { opacity: 0, duration: 0.25 }, 21.35);
        // A measured opening, an identity study, then the photographic detail.
        const starts = [2.5, 10.8, 16.4];
        const spans = [8.3, 5.6, 4.5];
        q(".case-panel").forEach((panel: Element, i: number) => {
          const title = panel.querySelector(".case-heading h2");
          const visual = panel.querySelector(".case-visual");
          // Logo study: the same scroll timeline owns reveal and reverse playback.
          const logo = panel.querySelector(".case-heading h2 img");
          if (logo) {
            tl.fromTo(
              logo,
              {
                clipPath: i === 0 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 100% 0%)",
                scale: 0.92,
                y: 12,
                transformOrigin: i === 0 ? "left center" : "center center",
              },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                y: 0,
                duration: i === 0 ? 1.4 : 1.15,
                ease: "power2.inOut",
              },
              starts[i] + (i === 0 ? 0.7 : 0.45),
            );
          }

          if (i === 1) {
          tl.fromTo(
            title,
            { clipPath: "inset(0% 100% 0% 0%)", x: mobile ? 0 : -32 },
            { clipPath: "inset(0% 0% 0% 0%)", x: 0, duration: 1.15 },
            starts[i] + 0.25,
          );
          }
          tl.fromTo(
            visual,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 },
            starts[i] + 0.35,
          );
          tl.fromTo(
            panel.querySelector(".case-colophon i"),
            { scaleX: 0 },
            { scaleX: 1, duration: spans[i] - 1.5 },
            starts[i] + 1.5,
          );
          tl.fromTo(
            panel.querySelectorAll(".case-swatches i"),
            { scaleY: 0 },
            { scaleY: 1, duration: 1.25, stagger: 0.13 },
            starts[i] + 1.6,
          );
        });
        const meters = q(".cinema-index i");
        [
          [4, 6.8],
          [10.8, 5.6],
          [16.4, 4.5],
        ].forEach(([start, duration], i) => {
          tl.fromTo(meters[i], { scaleX: 0 }, { scaleX: 1, duration }, start);
        });
        ScrollTrigger.refresh();
      },
      root,
    );
    return () => {
      mm.revert();
      document.body.classList.remove("cinema-light");
    };
  }, [root, language]);
}
