import { useLayoutEffect, useRef } from "react";
import { gsap } from "../animations/engine";
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);
  return (
    <div
      className="page-progress pointer-events-none fixed inset-y-0 right-0 z-60 w-0.5 bg-white/4 motion-reduce:hidden"
      aria-hidden="true"
    >
      <div
        ref={ref}
        className="h-full origin-top bg-[linear-gradient(#00a99d,#45e8bf)]"
      />
    </div>
  );
}
