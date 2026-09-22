import { Composition } from "../components/Composition";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/engine";
import { useTranslation } from "react-i18next";
import { normalizeLanguage } from "../i18n";
export function Services() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage);
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const scenes = gsap.utils.toArray<HTMLElement>(
          ".discipline",
          root.current!,
        );

        // Each panel physically replaces the previous one inside a fixed stage.
        gsap.set(scenes, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(scenes.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "servicos",
            trigger: root.current,
            start: "top top",
            end: () => "+=" + innerHeight * (innerWidth < 768 ? 3.5 : 4.5),
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        scenes.forEach((scene, i) => {
          const at = i * 1.5;
          const title = scene.querySelector("h3");
          if (i > 0) {
            tl.to(
              scene,
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.8,
                ease: "power2.inOut",
              },
              at - 0.8,
            ).to(
              scenes[i - 1].querySelector("h3"),
              {
                yPercent: -65,
                duration: 0.8,
                ease: "power2.inOut",
              },
              at - 0.8,
            );
          }
          tl.fromTo(
            title,
            { xPercent: i % 2 ? -14 : 14, yPercent: 0 },
            { xPercent: 0, duration: 0.8, ease: "power2.out" },
            Math.max(0, at - 0.7),
          );
          // A reading interval between transitions is part of the scroll timeline.
          tl.to({}, { duration: 0.7 }, at);
        });
      },
      root,
    );
    return () => mm.revert();
  }, [language]);
  return (
    <section
      id="servicos"
      className="scene services relative isolate h-svh overflow-hidden bg-[#0b0e0d] motion-reduce:h-auto motion-reduce:pt-40 motion-reduce:pb-[50px]"
      ref={root}
    >
      <h2 className="section-label absolute top-[16vh] left-(--frame-edge) z-10 text-xs font-normal leading-[1.65] tracking-[.045em] text-[#a3aba5] uppercase motion-reduce:top-[10vh]">
        {t("nav.2")} — ELEVARTE
      </h2>
      {(t("services", { returnObjects: true }) as string[]).map((name, i) => (
        <article
          className="discipline absolute inset-0 flex items-center justify-center overflow-hidden bg-[#0b0e0d] even:bg-[#111a16] motion-reduce:relative motion-reduce:min-h-[65svh]"
          key={i}
        >
          <Composition mode="flow">
            <h3
              className={`relative z-2 m-0 max-w-[95vw] text-center leading-[.95] font-medium tracking-[-.06em] will-change-transform motion-reduce:will-change-auto md:max-w-none md:leading-none md:whitespace-nowrap ${i >= 3 ? "text-[calc(8.3*var(--design-vw))]" : "text-[13vw] motion-reduce:text-[calc(10*var(--design-vw))] md:text-[calc(11*var(--design-vw))]"}`}
            >
              {name}
            </h3>
            <p className="absolute right-[calc(6*var(--design-vw))] bottom-[9vh] max-w-[360px] text-left text-xs text-[#bec6c0] motion-reduce:bottom-[5vh] md:text-base">
              {t(`serviceDescriptions.${i}`)}
            </p>
          </Composition>
        </article>
      ))}
    </section>
  );
}
