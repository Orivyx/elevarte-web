import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/a11y";
import { normalizeLanguage } from "../i18n";
import { testimonials } from "../data/testimonials";

export function Testimonials() {
  const { t, i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage);
  const root = useRef<HTMLElement>(null);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [reduced, setReduced] = useState(() => matchMedia("(prefers-reduced-motion:reduce)").matches);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(() => !document.hidden);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion:reduce)");
    const preference = () => setReduced(motion.matches);
    const visibility = () => setActiveTab(!document.hidden);
    motion.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    if (root.current) observer.observe(root.current);
    return () => {
      motion.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!swiper || swiper.destroyed) return;
    if (!reduced && visible && activeTab) swiper.autoplay.start();
    else swiper.autoplay.stop();
  }, [swiper, reduced, visible, activeTab]);

  return (
    <section ref={root} id="depoimentos" aria-labelledby="testimonials-heading"
      className="relative border-t border-white/10 bg-[#0d1511] px-(--frame-edge) py-16 text-[#ecebe3] md:py-20">
      <div className="mb-9 md:mb-12">
        <p className="mb-4 text-xs font-medium tracking-[.12em] text-[#91a598] uppercase">{t("testimonials.label")}</p>
        <h2 id="testimonials-heading" className="m-0 text-[clamp(32px,4vw,58px)] leading-[1.08] font-medium tracking-[-.05em]">{t("testimonials.title")}</h2>
      </div>
      <Swiper
        key={reduced ? "reduced" : "animated"}
        modules={[Autoplay, A11y, Keyboard]}
        onSwiper={setSwiper}
        slidesPerView={1}
        spaceBetween={32}
        breakpoints={{ 768: { slidesPerView: 2, spaceBetween: 56 } }}
        loop
        speed={reduced ? 0 : 14000}
        autoplay={reduced ? false : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        a11y={{ containerMessage: t("testimonials.label"), containerRoleDescriptionMessage: t("testimonials.carousel") }}
        className="[&_.swiper-wrapper]:items-stretch [&_.swiper-wrapper]:ease-linear [&_.swiper-slide]:h-auto"
      >
        {testimonials.map(entry => (
          <SwiperSlide key={entry.id}>
            <figure className="m-0 flex h-full min-w-0 flex-col border-t border-[#527563] pt-6">
              <blockquote className="m-0 mb-7 flex-1 text-[18px] leading-[1.55] tracking-[-.015em] text-[#d5e4da] md:text-[21px]">
                <p>{entry.quote[language]}</p>
              </blockquote>
              <figcaption className="border-l border-[#00a99d] pl-4">
                <p className="text-sm font-medium">{entry.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#97aa9d]">{entry.role[language]}</p>
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
