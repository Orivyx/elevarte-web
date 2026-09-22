import { useTranslation } from "react-i18next";
import Aurora from "../reactbits/Aurora";
import MetallicPaint from "../reactbits/MetallicPaint";
import { Composition } from "../Composition";
import { navigateTo } from "../../animations/engine";
export function Hero() {
  const { t } = useTranslation();
  return (
    <div className="c-hero absolute inset-0 z-1 bg-[#070b0a] motion-reduce:relative motion-reduce:h-svh motion-reduce:overflow-hidden">
      <Composition>
        <Aurora />
        <MetallicPaint />
        <div className="hero-kicker absolute top-[17%] left-[6vw] z-4 text-[8px] font-normal leading-[1.65] tracking-[.12em] md:left-[calc(4*var(--design-vw))] md:text-[10px]">
          <span className="text-[#6db7a2]">ELEVARTE — BRANDING & DIGITAL</span>
          <p className="mt-[15px] text-xs leading-[1.45] tracking-[-.015em] whitespace-pre-line text-[#a7b4aa] md:mt-[22px] md:text-[15px]">
            {t("cinema.kicker")}
          </p>
        </div>
        <div
          className="c-hero-glow pointer-events-none absolute inset-x-[-20%] inset-y-[8%] bg-[radial-gradient(ellipse_at_center,#235e493b,transparent_62%)] opacity-0 will-change-[transform,opacity] motion-reduce:hidden"
          aria-hidden="true"
        />
        <h1 className="c-headline absolute top-[58%] inset-x-[5vw] z-3 m-0 origin-[50%_60%] [transform:translateY(-50%)] text-[12vw] leading-none font-semibold tracking-[-.075em] md:inset-x-[calc(3*var(--design-vw))] md:text-[calc(11.8*var(--design-vw))] md:leading-[.9] md:tracking-[-.065em]">
          <span className="c-recede block whitespace-nowrap text-[#b8c2b8]">
            {t("hero.0")}
          </span>
          <span className="c-elevate block text-left text-[21.5vw] whitespace-nowrap md:mt-[-.025em] md:text-[calc(20.5*var(--design-vw))]">
            {Array.from(t("hero.1")).map((letter, i) => (
              <span className="c-letter inline-block" key={i}>
                {letter}
              </span>
            ))}
          </span>
          <span className="c-type-light hidden" aria-hidden="true">
            {t("hero.1")}
          </span>
        </h1>
        <div className="c-hero-meta absolute inset-x-[6vw] bottom-[6vh] flex items-end justify-between text-[8px] font-normal leading-[1.65] tracking-[.1em] text-[#b2bab3] md:inset-x-[calc(4*var(--design-vw))] md:bottom-[4vh] md:items-center md:text-[9px]">
          <span>
            {t("explore")}
            <i className="mt-3 block h-[30px] w-px bg-[linear-gradient(#45e8bf,transparent)] shadow-[0_0_12px_#45e8bf33]" />
          </span>
          <p className="mr-auto ml-[calc(16*var(--design-vw))] hidden max-w-[270px] text-left text-[9px] leading-[1.7] md:block">
            {t("studio")}
            <br />
            BRANDING · ART DIRECTION · DIGITAL
          </p>
          <a
            className="hero-project-link flex items-center gap-[15px] border-b border-[#9aae9b66] pt-4 pb-[9px] hover:text-[#69e4ba] md:gap-[26px] md:pb-4"
            href="#projetos"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("projetos");
            }}
          >
            {t("cinema.explore")}
          </a>
        </div>
      </Composition>
    </div>
  );
}
