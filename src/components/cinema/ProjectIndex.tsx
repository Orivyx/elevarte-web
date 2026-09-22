import { useTranslation } from "react-i18next";
import { navigateTo } from "../../animations/engine";
const active = [
  "group-data-[project=1]/cinema:opacity-100",
  "group-data-[project=2]/cinema:opacity-100",
  "group-data-[project=3]/cinema:opacity-100",
];
export function ProjectIndex() {
  const { t } = useTranslation();
  return (
    <nav
      className="cinema-index absolute bottom-[4%] left-(--frame-edge) z-20 flex w-[calc(var(--composition-width)-2*var(--frame-gutter))] gap-4 text-[9px] font-normal leading-[1.65] tracking-[.045em] motion-reduce:hidden md:bottom-[calc((100svh-var(--composition-height))/2+var(--composition-height)*.03)] md:gap-[calc(4*var(--design-vw))] group-data-[project=2]/cinema:text-[#342c2e] group-data-[project=3]/cinema:text-[#b98990]"
      aria-label={t("cinema.index")}
    >
      {[
        ["projetos", "NOGUEIRA"],
        ["aol", "AOL"],
        ["tatiana", "DRA. TATIANA"],
      ].map(([id, name], i) => (
        <a
          key={id}
          className={`relative flex min-w-0 flex-1 gap-[5px] py-[7px] text-xs opacity-65 hover:opacity-100 md:min-w-[130px] md:flex-none md:gap-2 md:text-sm ${active[i]}`}
          href={"#" + id}
          onClick={(e) => {
            e.preventDefault();
            navigateTo(id);
          }}
        >
          <span>{name}</span>
          <i
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-current [transform:scaleX(0)]"
            aria-hidden="true"
          />
        </a>
      ))}
    </nav>
  );
}
