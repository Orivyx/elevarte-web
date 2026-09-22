import { useTranslation } from "react-i18next";
import type { Project } from "../../data/projects";
import { Composition } from "../Composition";

// All projects share the AOL frame, including the second photograph.
const heading = "md:top-[13%] md:h-[70%] md:w-[29%] short:top-[17%]";
const visual = "top-[36%] [container-type:size] md:top-[16%] md:left-[36%]";
const frame = "inset-0 h-full w-full";
const layouts = [
  {
    panel: "c-nogueira z-2 bg-[#101311] text-[#ecebe3] [--case-accent:#e33431]",
    heading, visual,
    title: "mt-5 leading-none md:mt-[42px] short:mt-[22px]",
    sector: "mt-3 text-sm",
    cover: `c-n-cover z-3 ${frame}`,
    detail: `c-n-detail z-4 ${frame} motion-reduce:hidden`,
  },
  {
    panel: "c-aol z-10 bg-[#e7e6df] text-[#242820] [--case-accent:#303b31]",
    heading, visual,
    title: "mt-[18px] text-[27vw] leading-[.87] tracking-[-.09em] md:mt-[42px] md:text-[calc(15*var(--design-vw))] short:mt-[22px] short:text-[calc(14*var(--design-vw))]",
    sector: "absolute right-0 bottom-[15%] mt-3 text-[10px] md:static md:mt-4 md:text-[11px]",
    cover: `c-aol-image z-2 ${frame}`,
    detail: "",
  },
  {
    panel: "c-tatiana z-11 bg-[#ead8d0] text-[#b98990] [--case-accent:#b98990] [--case-photo-bg:#ead8d0]",
    heading, visual,
    title: "mt-4 leading-none md:mt-[42px] short:mt-[22px]",
    sector: "mt-3 text-sm",
    cover: `c-t-cover z-3 ${frame} motion-reduce:hidden`,
    detail: `c-t-detail z-4 ${frame}`,
  },
];
function Photo({
  src,
  alt,
  className,
  eager = false,
  detail = false,
  fit = "cover",
}: {
  src: string;
  alt: string;
  className: string;
  eager?: boolean;
  detail?: boolean;
  fit?: "cover" | "contain";
}) {
  return (
    <figure
      className={`c-surface absolute m-0 grid place-items-center overflow-hidden ${fit === "contain" ? "bg-[var(--case-photo-bg,#141515)]" : "bg-transparent"} ${className}`}
    >
      <img
        className={`absolute inset-0 block h-full min-h-0 max-h-none w-full min-w-0 max-w-none ${fit === "contain" ? "absolute inset-0 min-h-0 min-w-0 object-contain" : "object-cover"} ${detail ? "object-[center_53%] md:object-center" : "object-center"}`}
        src={src}
        alt={alt}
        width="1536"
        height="1024"
        loading={eager ? "eager" : "lazy"}
      />
    </figure>
  );
}
export function ProjectCase({
  project,
  index: i,
}: {
  project: Project;
  index: number;
}) {
  const { t } = useTranslation();
  const layout = layouts[i];
  return (
    <article
      id={["projetos", "aol", "tatiana"][i]}
      className={`case-panel absolute inset-0 overflow-hidden motion-reduce:relative motion-reduce:inset-auto motion-reduce:h-svh motion-reduce:min-h-svh ${layout.panel}`}
    >
      <Composition>
        <div
          className={`case-heading absolute top-[12%] left-[6vw] h-[23%] w-[88%] md:left-[calc(4*var(--design-vw))] ${layout.heading}`}
        >
          <h2
            className={`mb-0 text-center font-sans font-medium tracking-[-.065em] md:text-left ${layout.title}`}
          >
            {i === 0 ? (
              <img src="/assets/nogueira-logo-original.svg" alt="Nogueira Despachante" width="510" height="162" className="mx-auto block h-auto w-[75vw] max-w-full md:mx-0 md:w-full" />
            ) : i === 2 ? (
              <img src="/assets/tatiana-logo-original.svg" alt="Dra. Tatiana Sanchez — farmacêutica esteta" className="mx-auto block h-auto w-[65vw] max-w-full md:mx-0 md:w-full" />
            ) : (
              ["Nogueira", "AOL"][i]
            )}
          </h2>
          {i === 1 && <p className={`case-sector mb-0 opacity-65 ${layout.sector}`}>
            {t(`caseStudies.${i}.sector`)}
          </p>}

            <div
              className="case-description absolute inset-x-0 bottom-[5%] hidden w-full border-t border-current/20 pt-[30px] md:block"
            >
              <span
                className={`case-direction block leading-[1.08] font-normal tracking-[-.035em] ${i === 1 ? "max-w-[280px] text-[calc(3.6*var(--design-vw))] short:text-[calc(2.5*var(--design-vw))]" : "text-[calc(3.6*var(--design-vw))] short:text-[calc(2.5*var(--design-vw))]"}`}
              >
                {t(`caseStudies.${i}.direction`)}
              </span>
              <p className={`my-[15px] max-w-[240px] text-[11px] leading-[1.6] short:hidden ${i === 2 ? "opacity-100" : "opacity-60"}`}>
                {t(`caseStudies.${i}.description`)}
              </p>
            </div>
        </div>
        <div
          className={`case-visual absolute inset-x-[6vw] bottom-[15%] overflow-hidden md:inset-x-[calc(4*var(--design-vw))] md:bottom-[13%] ${layout.visual}`}
        >
          <div
            className={`case-material absolute inset-x-0 top-[70%] bottom-0 h-[30%] w-full flex-col justify-between overflow-hidden bg-(--case-accent) p-3.5 text-[#171b17] md:top-0 md:right-auto md:h-full md:w-[32%] md:p-6 hidden`}
            aria-hidden="true"
          >
            <span className="z-1 text-[6px] tracking-[.13em] md:text-[8px]">
              ELEVARTE
            </span>
            <div className="case-swatches absolute right-3.5 bottom-3.5 flex h-[18%] w-[24%] md:right-6 md:bottom-[45px] md:left-6 md:h-[9%] md:w-auto">
              <i className="flex-1 origin-bottom bg-[#161b18]" />
              <i className="flex-1 origin-bottom bg-[#eaeee3]" />
              <i className="flex-1 origin-bottom bg-[#b32927]" />
            </div>
            <small className="z-1 text-[6px] tracking-[.13em] md:text-[8px]">
              {t("cinema.visualStudy")}
            </small>
          </div>
          <Photo
            className={layout.cover}
            fit="cover"
            src={project.cover}
            alt={t(`caseStudies.${i}.coverAlt`)}
            eager={i === 0}
          />
          {i !== 1 && (
            <Photo
              className={layout.detail}
              fit="cover"
              src={i === 0 ? project.assets.identity : project.assets.digital}
              alt={t(`caseStudies.${i}.detailAlt`)}
              detail={i === 0}
            />
          )}
        </div>
        <div className="case-colophon absolute inset-x-[6vw] bottom-[11%] flex justify-between border-t border-current pt-2.5 text-[10px] leading-normal tracking-[.06em] md:inset-x-[calc(4*var(--design-vw))] md:bottom-[9%] md:pt-3.5 md:text-xs">
          <span>{t("cinema.study")}</span>
          <span className="hidden md:inline">
            {t(`caseStudies.${i}.colophon`)}
          </span>
          <span>ELEVARTE</span>
          <i className="absolute -top-px left-0 h-0.5 w-full origin-left bg-(--case-accent)" />
        </div>
      </Composition>
    </article>
  );
}
