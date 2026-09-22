import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
export const CINEMA_DURATION = 21.6;

let navigation: gsap.core.Tween | undefined;
let detachNavigation: (() => void) | undefined;

/** Anchors target timeline positions rather than pin-spacer offsets. */
export function navigateTo(id: string) {
  const cinema = ScrollTrigger.getById("cinema");
  const cinemaStops: Record<string, number> = {
    inicio: 0,
    projetos: 4.6,
    aol: 12.8,
    tatiana: 18,
  };
  const inCinema = cinema && id in cinemaStops;
  const trigger = ScrollTrigger.getById(id);
  const target = document.getElementById(id);
  if (!target) return;
  const top = inCinema
    ? cinema.start + (cinema.end - cinema.start) * (cinemaStops[id] / CINEMA_DURATION)
    : trigger
      ? (id === "contato" ? trigger.end : trigger.start) +
        (id === "projetos" ? (trigger.end - trigger.start) * 0.58 : 1)
      : target.getBoundingClientRect().top + window.scrollY;
  navigation?.kill();
  detachNavigation?.();
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, top);
    return;
  }
  const position = { y: window.scrollY };
  const cancel = () => {
    navigation?.kill();
    detachNavigation?.();
  };
  detachNavigation = () => {
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
  };
  window.addEventListener("wheel", cancel, { passive: true, once: true });
  window.addEventListener("touchstart", cancel, { passive: true, once: true });
  navigation = gsap.to(position, {
    y: top,
    duration: 0.85,
    ease: "power2.inOut",
    onUpdate: () => window.scrollTo(0, position.y),
    onComplete: () => detachNavigation?.(),
  });
}
