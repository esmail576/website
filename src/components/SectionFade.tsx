import type { CSSProperties } from "react";

/** Surface tokens for seamless section transitions */
export const sectionBlend = {
  dark: "oklch(0.06 0.015 260)",
  base: "var(--surface-base)",
  sand: "color-mix(in oklch, var(--bahrain-sand) 40%, var(--surface-base))",
  sandMid: "color-mix(in oklch, var(--bahrain-sand) 55%, var(--surface-base))",
  sandStrong: "color-mix(in oklch, var(--bahrain-sand) 50%, var(--surface-warm))",
  muted: "var(--surface-muted)",
  warm: "var(--surface-warm)",
  elevated: "var(--surface-elevated)",
} as const;

export type SectionBlendKey = keyof typeof sectionBlend;

function resolveColor(color: SectionBlendKey | string) {
  return color in sectionBlend ? sectionBlend[color as SectionBlendKey] : color;
}

/** Softens the top edge when the previous section uses a different background */
export function SectionFadeTop({ from }: { from: SectionBlendKey | string }) {
  return (
    <div
      aria-hidden
      className="section-fade-bridge section-fade-bridge--top"
      style={{ "--fade-color": resolveColor(from) } as CSSProperties}
    />
  );
}

/** Softens the bottom edge into the next section (same effect as the original hero fade) */
export function SectionFadeBottom({ to }: { to: SectionBlendKey | string }) {
  return (
    <div
      aria-hidden
      className="section-fade-bridge section-fade-bridge--bottom"
      style={{ "--fade-color": resolveColor(to) } as CSSProperties}
    />
  );
}
