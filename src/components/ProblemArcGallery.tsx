import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

export type ArcProblem = {
  icon: LucideIcon;
  title: string;
  desc: string;
  highlight?: string;
};

/** Fixed small rotations per slot — “tossed Polaroid” look (deterministic, not random). */
const SCATTER_DEG = [-2.5, 1.9, -1.4, 2.4, -2.2, 1.6, -1.9, 2.1] as const;

function scatterForIndex(index: number) {
  return SCATTER_DEG[index % SCATTER_DEG.length];
}

type PolaroidCardProps = {
  problem: ArcProblem;
  itemWidth: number;
  scatterDeg: number;
  reduced: boolean;
};

function PolaroidCard({ problem, itemWidth, scatterDeg, reduced }: PolaroidCardProps) {
  const Icon = problem.icon;
  const hover = !reduced;

  return (
    <motion.article
      className="polaroid-card problem-card shrink-0"
      style={{ width: itemWidth, rotate: reduced ? 0 : scatterDeg }}
      whileHover={
        hover
          ? { rotate: 0, scale: 1.05, zIndex: 30, transition: { type: "spring", stiffness: 400, damping: 26 } }
          : undefined
      }
    >
      <div className="problem-card-icon" aria-hidden>
        <Icon size={28} strokeWidth={2.2} className="text-primary" />
      </div>
      <div className="polaroid-caption problem-card-caption">
        <h3 className="polaroid-title">{problem.title}</h3>
        <p className="polaroid-body">
          <span className="line-clamp-4 sm:line-clamp-6">{problem.desc}</span>
          {problem.highlight ? (
            <span className="polaroid-highlight line-clamp-2 sm:line-clamp-3">
              {problem.highlight}
            </span>
          ) : null}
        </p>
      </div>
    </motion.article>
  );
}

type ProblemArcGalleryProps = {
  problems: ArcProblem[];
};

const DRIFT_PX_PER_FRAME = 1.05;

export function ProblemArcGallery({ problems }: ProblemArcGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollX = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(800);
  const reducedMotion = useReducedMotion();

  const minWidth = containerWidth < 480 ? 220 : 260;
  const itemWidth = Math.round(Math.min(320, Math.max(minWidth, containerWidth * 0.32)));
  const spacing = containerWidth < 480 ? 22 : 34;
  const stride = itemWidth + spacing;
  const n = problems.length;
  const singleSetWidth = n * stride;

  const triple = useMemo(() => {
    if (n === 0) return [];
    return [...problems, ...problems, ...problems];
  }, [problems, n]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerWidth(el.offsetWidth));
    ro.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const trackX = useTransform(scrollX, (v) => -v);

  useEffect(() => {
    if (reducedMotion || n === 0) {
      scrollX.set(singleSetWidth);
      return;
    }
    scrollX.set(singleSetWidth);
    let raf = 0;
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      let v = scrollX.get() + DRIFT_PX_PER_FRAME;
      if (v >= singleSetWidth * 2) v -= singleSetWidth;
      else if (v <= singleSetWidth * 0.5) v += singleSetWidth;
      scrollX.set(v);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion, singleSetWidth, n, scrollX]);

  const pad = Math.max(0, containerWidth / 2 - itemWidth / 2);
  const innerWidth = pad * 2 + triple.length * itemWidth + Math.max(0, triple.length - 1) * spacing;

  return (
    <div
      ref={containerRef}
      className="polaroid-stage problem-arc-root relative w-full overflow-x-clip overflow-y-visible py-8 md:py-11"
      role="region"
      aria-roledescription="carousel"
      aria-label="Problems travelers face in Bahrain, auto-advancing"
    >
      <motion.div
        className="polaroid-track flex items-center will-change-transform"
        style={{
          width: innerWidth,
          minHeight: "clamp(220px, 32vw, 300px)",
          paddingLeft: pad,
          paddingRight: pad,
          gap: spacing,
          x: trackX,
        }}
      >
        {triple.map((problem, index) => (
          <PolaroidCard
            key={`${problem.title}-${index}`}
            problem={problem}
            itemWidth={itemWidth}
            scatterDeg={scatterForIndex(index)}
            reduced={!!reducedMotion}
          />
        ))}
      </motion.div>
    </div>
  );
}
