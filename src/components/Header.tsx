import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { normalizeLanguage } from "../i18n";
import { navigateTo } from "../animations/engine";
const ids = ["projetos", "estudio", "servicos", "contato"];
export function Header() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage);
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector("a")?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const links = [
          toggle.current,
          ...Array.from(menu.current?.querySelectorAll("a") ?? []),
        ].filter(Boolean) as HTMLElement[];
        const first = links[0],
          last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <>
      <a
        className="skip-link fixed -top-[100px] left-5 z-[200] bg-[#090b0b] p-4 focus:top-2.5"
        href="#main"
      >
        {t("common.skip")}
      </a>
      <header
        data-menu-open={open}
        className="cinema-light:bg-[linear-gradient(#efeaded6,transparent)] cinema-light:data-[menu-open=true]:bg-[#101412] cinema-light:data-[menu-open=true]:bg-none cinema-light:data-[menu-open=true]:[&_button]:text-white site-header fixed inset-x-0 top-0 z-50 flex h-[78px] items-center justify-between bg-[linear-gradient(#090b0bc9,transparent)] px-(--frame-edge) py-5 md:h-[92px] md:py-[26px] md:font-medium"
      >
        <a
          className="brand flex min-h-10 w-[38px] items-center md:w-[46px] [&>img]:h-auto [&>img]:w-full"
          href="#inicio"
          aria-label={t("common.home")}
          onClick={(e) => {
            e.preventDefault();
            navigateTo("inicio");
            setOpen(false);
          }}
        >
          <img
            src="/assets/elevarte-symbol.webp"
            alt="Elevarte Design"
            width="48"
            height="35"
          />
        </a>
        <nav
          aria-label={t("common.main")}
          className="cinema-light:[&>a]:text-[#333b34] desktop-nav hidden gap-[calc(2.4*var(--design-vw))] md:flex [&>a]:relative [&>a]:py-2 [&>a]:text-[10px] [&>a]:tracking-[.13em] [&>a]:uppercase [&>a]:text-[#b0b4b1] [&>a]:after:absolute [&>a]:after:inset-x-0 [&>a]:after:bottom-0 [&>a]:after:h-px [&>a]:after:origin-left [&>a]:after:scale-x-0 [&>a]:after:bg-accent [&>a]:after:transition-transform [&>a:hover]:after:scale-x-100"
        >
          {ids.map((id, i) => (
            <a
              key={id}
              href={"#" + id}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(id);
              }}
            >
              {t(`nav.${i}`)}
            </a>
          ))}
        </nav>
        <div className="header-end flex items-center gap-[22px] md:gap-2.5">
          <div
            className="cinema-light:[&>button]:text-[#333b34] cinema-light:[&>button[aria-pressed=true]]:text-[#111712] language flex items-center gap-2.5 text-xs uppercase tracking-[.055em] text-[#b0b4b1] [&>button]:py-2 [&>button]:text-[#777e79] [&>button[aria-pressed=true]]:text-white"
            aria-label={t("common.language")}
          >
            <button
              aria-pressed={language === "pt"}
              onClick={() => i18n.changeLanguage("pt")}
            >
              BR
            </button>
            <span>/</span>
            <button
              aria-pressed={language === "en"}
              onClick={() => i18n.changeLanguage("en")}
            >
              EN
            </button>
          </div>
          <button
            ref={toggle}
            className="cinema-light:text-[#333b34] menu-toggle text-xs uppercase tracking-[.055em] text-[#b0b4b1] md:hidden [&>span]:ml-2"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {t(open ? "common.close" : "common.menu")}{" "}
            <span>{open ? "−" : "+"}</span>
          </button>
        </div>
      </header>
      <nav
        ref={menu}
        id="mobile-nav"
        aria-label={t("common.mobileMenu")}
        className={
          "mobile-nav fixed inset-0 z-40 flex flex-col justify-center bg-[#101412] px-[6vw] py-[90px] text-ink transition-[clip-path] duration-500 motion-reduce:transition-none md:hidden [&>a]:flex [&>a]:items-baseline [&>a]:gap-5 [&>a]:border-b [&>a]:border-white/12 [&>a]:py-5 [&>a]:text-[10vw] [&_small]:text-xs [&_small]:text-accent [&_a>span]:ml-auto " +
          (open
            ? "is-open [clip-path:inset(0)]"
            : "[clip-path:inset(0_0_100%_0)]")
        }
        inert={!open}
      >
        {ids.map((id, i) => (
          <a
            key={id}
            href={"#" + id}
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              requestAnimationFrame(() => navigateTo(id));
              toggle.current?.focus();
            }}
          >
            {t(`nav.${i}`)}
          </a>
        ))}
      </nav>
    </>
  );
}
