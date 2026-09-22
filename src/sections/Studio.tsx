import { Composition } from "../components/Composition";
import ScrollFloat, {
  addScrollFloat,
} from "../components/reactbits/ScrollFloat";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../animations/engine";
import { useTranslation } from "react-i18next";
import { normalizeLanguage } from "../i18n";
export function Studio() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage);
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const pinnedDistance = () => innerHeight * (innerWidth < 768 ? 0.85 : 1.15);
        // Pinning begins at the top; animation already runs during the approach.
        ScrollTrigger.create({
          id: "estudio",
          trigger: root.current,
          start: "top top",
          end: () => "+=" + pinnedDistance(),
          pin: true,
          invalidateOnRefresh: true,
        });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "estudio-motion",
            trigger: root.current,
            start: "top bottom",
            end: () => "+=" + (innerHeight + pinnedDistance()),
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        addScrollFloat(tl, root.current!.querySelectorAll(".rb-float-char"), 0);
        tl.fromTo(
          ".studio-statement > .rb-scroll-float:first-child",
          { xPercent: -14 },
          { xPercent: 0, duration: 1.3, ease: "power1.inOut" },
          0,
        )
          .fromTo(
            ".studio-statement > .rb-scroll-float:last-child",
            { xPercent: 25 },
            { xPercent: 0, duration: 1.3, ease: "power1.inOut" },
            0,
          )
          .to(
            ".studio-statement",
            { yPercent: -18, scale: 0.94, duration: 0.9, ease: "power2.inOut" },
            1.3,
          )
          .fromTo(
            ".studio-copy",
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.9,
              ease: "power2.inOut",
            },
            1.5,
          )
          .to({}, { duration: 0.4 }, 2.4);
      },
      root,
    );
    return () => mm.revert();
  }, [language]);
  return (
    <section
      id="estudio"
      className="scene studio relative -mt-[65svh] h-svh overflow-hidden bg-[#090b0b] motion-reduce:mt-0 motion-reduce:min-h-svh"
      ref={root}
    >
      <Composition mode="studio">
        <span className="section-label absolute top-[16vh] left-[calc(6*var(--design-vw))] text-xs font-normal leading-[1.65] tracking-[.045em] text-[#a3aba5] uppercase motion-reduce:top-[10vh]">
          {t("nav.1")}
        </span>
        <h2 className="studio-statement absolute top-[34%] left-[calc(4*var(--design-vw))] z-3 m-0 text-[10.4vw] leading-[.93] font-medium tracking-[-.06em] md:top-[31%] md:text-[calc(9.2*var(--design-vw))] [&>.rb-scroll-float:last-child]:pl-[calc(13*var(--design-vw))]">
          <ScrollFloat>{t("statement.0")}</ScrollFloat>
          <ScrollFloat>{t("statement.1")}</ScrollFloat>
        </h2>
        <div className="studio-copy absolute inset-x-[calc(4*var(--design-vw))] bottom-[10vh] flex items-start gap-[22px] motion-reduce:opacity-100 md:items-center md:gap-[calc(8*var(--design-vw))]">
          <img
            className="h-[30px] w-[38px] shrink-0 object-contain md:h-[50px] md:w-[70px]"
            src="/assets/elevarte-symbol.webp"
            width="70"
            height="50"
            alt=""
          />
          <p className="m-0 max-w-[550px] text-base leading-normal md:text-[21px]">
            {t("about")}
          </p>
          <span className="ml-auto hidden text-xs font-normal leading-[1.65] tracking-[.045em] text-[#929c95] md:block">
            ELEVARTE
            <br />
            BRANDING & DIGITAL DESIGN
          </span>
        </div>
      </Composition>
    </section>
  );
}
