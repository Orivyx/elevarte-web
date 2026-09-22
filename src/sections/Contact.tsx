import { useLayoutEffect, useRef } from "react";
import { gsap, navigateTo } from "../animations/engine";
import { useTranslation } from "react-i18next";
import { ContactForm } from "../components/ContactForm";
export function Contact() {
  const { t } = useTranslation();

  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id: "contato",
              trigger: root.current,
              start: "top 65%",
              end: "top top",
              scrub: true,
            },
          })
          .fromTo(
            ".contact-headline span:first-child",
            { xPercent: -12, opacity: 0.2 },
            { xPercent: 0, opacity: 1, duration: 1 },
            0,
          )
          .fromTo(
            ".contact-headline span:last-child",
            { xPercent: 12, opacity: 0.2 },
            { xPercent: 0, opacity: 1, duration: 1 },
            0,
          );
      },
      root,
    );
    return () => mm.revert();
  }, []);
  return (
    <section
      id="contato"
      className="contact relative min-h-svh overflow-hidden border-t border-[#45615355] bg-[#101914] px-[6vw] pt-[20vh] md:grid md:grid-cols-2 md:items-start md:gap-x-[calc(6*var(--design-vw))] md:px-(--contact-edge) md:pt-[22vh]"
      ref={root}
    >
      <span className="section-label absolute top-[10vh] left-[6vw] text-xs font-normal leading-[1.65] tracking-[.045em] text-[#a3aba5] uppercase md:left-(--contact-edge)">
        {t("nav.3")}
      </span>
      <h2 className="contact-headline m-0 text-[11.5vw] leading-[.96] font-medium tracking-[-.06em] md:text-[calc(6.4*var(--design-vw))]">
        <span className="block">{t("contact.0")}</span>
        <span className="mt-3 block text-left text-[#71bca4]">
          {t("contact.1")}
        </span>
      </h2>
      <ContactForm />
      <div className="final-light col-span-full mx-auto h-px w-full bg-[linear-gradient(90deg,transparent,#45e8bf66,transparent)]" />
      <footer className="col-span-full grid gap-6 py-9 text-xs font-normal leading-[1.65] tracking-[.045em] text-[#adb5ae] md:flex md:min-h-[140px] md:items-center md:justify-between md:gap-5 md:py-[30px] md:text-[10px]">
        <a
          className="mx-auto flex min-h-11 items-center md:mx-0"
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            navigateTo("inicio");
          }}
          aria-label={t("common.home")}
        >
          <img
            className="h-auto w-[132px] md:w-[145px]"
            src="/assets/elevarte-logo.webp"
            alt="Elevarte Design"
            width="145"
            height="43"
          />
        </a>
        <div className="flex flex-col items-center gap-1 md:contents">
        <a
          className="footer-phone flex min-h-11 items-center justify-center whitespace-nowrap md:min-h-0"
          href="https://wa.me/5511981940728"
          target="_blank"
          rel="noopener noreferrer"
        >
          +55 11 98194-0728
        </a>
        <a
          className="instagram-link flex min-h-11 items-center justify-center md:min-h-0"
          href="https://www.instagram.com/elevarte.design/"
          target="_blank"
          rel="noopener noreferrer"
        >
          INSTAGRAM
        </a>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-[10px] md:contents">
        <span className="whitespace-nowrap">© {new Date().getFullYear()} ELEVARTE</span>
        <button
          className="min-h-11 cursor-pointer text-right md:min-h-0 md:text-left"
          onClick={() => navigateTo("inicio")}
        >
          {t("back")}
        </button>
        </div>
      </footer>
    </section>
  );
}
