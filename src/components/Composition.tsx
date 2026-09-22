import type { ReactNode } from "react";
export function Composition({
  children,
  mode = "centered",
}: {
  children: ReactNode;
  mode?: "centered" | "flow" | "studio";
}) {
  const placement =
    mode === "flow"
      ? "flex items-center justify-center motion-reduce:min-h-[60svh]"
      : "top-1/2 [transform:translateY(-50%)]";
  const reduced =
    mode === "studio"
      ? "motion-reduce:top-auto motion-reduce:h-auto motion-reduce:min-h-svh motion-reduce:transform-none"
      : "";
  return (
    <div
      className={`composition relative mx-auto h-(--composition-height) w-[min(100%,var(--composition-width))] ${placement} ${reduced}`}
    >
      {children}
    </div>
  );
}
