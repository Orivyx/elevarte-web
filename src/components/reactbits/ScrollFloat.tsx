/**
 * Adapted from React Bits ScrollFloat by David Haz.
 * Source and license: ./upstream/ScrollFloat.tsx.txt and ./LICENSE.md.
 * Elevarte: external GSAP timeline, semantic inline wrapper, accessible text.
 */
import { useMemo } from "react";
import { gsap } from "../../animations/engine";

export function addScrollFloat(
  timeline: gsap.core.Timeline,
  elements: NodeListOf<Element>,
  position = 0,
) {
  timeline.fromTo(
    elements,
    {
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: "50% 0%",
    },
    {
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      duration: 0.8,
      ease: "back.out(1.35)",
      stagger: { amount: 0.45, from: "start" },
    },
    position,
  );
}

export default function ScrollFloat({ children }: { children: string }) {
  const characters = useMemo(() => Array.from(children), [children]);
  return (
    <span
      className="rb-scroll-float -my-[.14em] block overflow-hidden py-[.14em] whitespace-nowrap"
      aria-label={children}
      data-react-bits="ScrollFloat"
    >
      <span
        className="rb-float-text inline-block p-0 whitespace-nowrap"
        aria-hidden="true"
      >
        {characters.map((char, index) => (
          <span
            className="rb-float-char inline-block p-0 whitespace-pre"
            key={index}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </span>
  );
}
