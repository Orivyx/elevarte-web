import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { normalizeLanguage } from "../i18n";
import { projects } from "../data/projects";
import { useCinema } from "../animations/useCinema";
import { Hero } from "../components/cinema/Hero";
import { ProjectCase } from "../components/cinema/ProjectCase";
import { ProjectIndex } from "../components/cinema/ProjectIndex";
export function Cinema() {
  const { t, i18n } = useTranslation();
  const root = useRef<HTMLElement>(null);
  useCinema(root, normalizeLanguage(i18n.resolvedLanguage));
  return (
    <section
      className="cinema group/cinema relative h-svh bg-[#090b0b] motion-reduce:h-auto"
      data-design-version="component-tailwind-08"
      id="inicio"
      ref={root}
      aria-label={t("cinema.label")}
    >
      <div className="cinema-stage relative isolate h-full w-full overflow-hidden motion-reduce:h-auto">
        <Hero />
        {projects.map((project, index) => (
          <ProjectCase key={project.slug} project={project} index={index} />
        ))}
        <div className="c-end absolute inset-0 z-15 flex flex-col items-center justify-center gap-[30px] bg-[#090b0b] motion-reduce:hidden">
          <img
            className="h-auto w-[60px]"
            src="/assets/elevarte-symbol.webp"
            alt=""
            width="60"
            height="42"
          />
          <span className="px-6 text-center text-sm md:text-base font-normal leading-[1.65] tracking-[.045em] text-[#b0c3b6]">
            ELEVARTE — {t("cinema.end")}
          </span>
        </div>
        <ProjectIndex />
        <div className="c-exhibit-label hidden">{t("cinema.concept")}</div>
      </div>
    </section>
  );
}
