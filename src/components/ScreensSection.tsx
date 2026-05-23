import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, MapPin, Bot, UtensilsCrossed, Theater, BarChart3, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionFadeBottom, SectionFadeTop } from "@/components/SectionFade";

import imgHome from "@/assets/home page.png";
import imgPlan from "@/assets/plan screen.png";
import imgKhalid from "@/assets/business2.png";
import imgPlacesDining from "@/assets/al-fateh-grand-mosque.jpg";
import imgFood from "@/assets/FOOD.jpeg";
import imgPartner from "@/assets/Business1.png";
import imgProfile from "@/assets/user profile.png";

const screens: { title: string; desc: string; icon: LucideIcon; image: string }[] = [
  {
    title: "Home & explore feed",
    desc: "The heart of Siyaha BH—scroll places, plates, and moments as the island shares them.",
    icon: Home,
    image: imgHome,
  },
  {
    title: "AI planner",
    desc: "Shape interests and hours into itineraries that feel bespoke, not copy-pasted.",
    icon: MapPin,
    image: imgPlan,
  },
  {
    title: "Khalid assistant",
    desc: "Your conversational layer inside Siyaha BH for quick answers and confident next steps.",
    icon: Bot,
    image: imgKhalid,
  },
  {
    title: "Places & dining",
    desc: "Rich profiles with reviews, hours, and context—so every reservation or detour is informed.",
    icon: UtensilsCrossed,
    image: imgPlacesDining,
  },
  {
    title: "Events",
    desc: "Culture, sport, nightlife: see what is live in Bahrain and lock it into your plan.",
    icon: Theater,
    image: imgFood,
  },
  {
    title: "Partner dashboard",
    desc: "Operators publish and refine their presence without leaving the Siyaha BH ecosystem.",
    icon: BarChart3,
    image: imgPartner,
  },
  {
    title: "Profile & saves",
    desc: "Carry preferences, bookmarks, and your evolving story with Siyaha BH across visits.",
    icon: User,
    image: imgProfile,
  },
];

/** Auto-spin (deg/s). Higher = faster. ~10.5°/s ≈ one full turn in ~34s */
const AUTO_ROTATE_DEG_PER_SEC = 10.5;

/** Very flat perspective so ~5 panels read clearly across an 80vw stage */
const STAGE_PERSPECTIVE_PX = 6400;
const STAGE_ROTATE_X_DEG = 2;
const STAGE_TRANSLATE_Z_PX = -90;
const STAGE_SCALE = 1;

function cardFocusOpacity(rotateDeg: number, index: number, angleStep: number, singleFocus: boolean) {
  if (!singleFocus) return 1;
  const total = ((rotateDeg + index * angleStep) % 360 + 360) % 360;
  const dist = Math.min(total, 360 - total);
  if (dist < angleStep * 0.45) return 1;
  if (dist < angleStep * 0.95) return 0.22;
  return 0;
}

function CarouselCard3D({
  item,
  index,
  angleStep,
  radius,
  cardWidth,
  cardHeight,
  rotateY,
  singleFocus,
}: {
  item: (typeof screens)[number];
  index: number;
  angleStep: number;
  radius: number;
  cardWidth: number;
  cardHeight: number;
  rotateY: ReturnType<typeof useMotionValue<number>>;
  singleFocus: boolean;
}) {
  const Icon = item.icon;
  const angle = index * angleStep;
  const opacity = useTransform(rotateY, (r) => cardFocusOpacity(r, index, angleStep, singleFocus));
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none"));

  return (
    <motion.div
      className="polaroid-card product-map-polaroid group absolute box-border flex cursor-default flex-col overflow-hidden"
      style={{
        left: "50%",
        top: "50%",
        width: cardWidth,
        height: cardHeight,
        marginLeft: -cardWidth / 2,
        marginTop: -cardHeight / 2,
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        opacity,
        pointerEvents,
      }}
    >
      <div className="polaroid-photo mb-0 min-h-0 shrink-0 basis-[40%] sm:basis-[42%]">
        <div className="polaroid-photo-inner relative h-full min-h-0">
          <img
            src={item.image}
            alt=""
            className="polaroid-photo-img"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div className="polaroid-photo-scrim" aria-hidden />
          <span className="polaroid-badge" aria-hidden />
          <div className="polaroid-icon-float">
            <Icon size={20} strokeWidth={2.2} className="text-primary" aria-hidden />
          </div>
        </div>
      </div>
      <div
        className={`polaroid-caption flex min-h-0 flex-1 flex-col justify-center px-0.5 text-center ${
          singleFocus ? "overflow-hidden" : "overflow-y-auto overscroll-contain"
        }`}
      >
        <h3 className="polaroid-title text-pretty">{item.title}</h3>
        <p className="polaroid-body text-pretty">
          <span className={singleFocus ? "line-clamp-4" : "line-clamp-3 sm:line-clamp-5"}>
            {item.desc}
          </span>
        </p>
      </div>
    </motion.div>
  );
}

function ProductMapCarousel3D({ inView }: { inView: boolean }) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [radius, setRadius] = useState(360);
  const [cardWidth, setCardWidth] = useState(280);
  const rotateY = useMotionValue(0);
  const lastPointerX = useRef(0);
  const dragging = useRef(false);
  const snapAnim = useRef<ReturnType<typeof animate> | null>(null);
  /** Unbounded step counter so last→first swipes animate one step, not a full spin-back */
  const virtualIndexRef = useRef(0);
  const dragStartY = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const n = screens.length;
  const angleStep = 360 / n;
  const singleFocus = isMobile;

  const snapToVirtualIndex = useCallback(
    (virtualIndex: number) => {
      virtualIndexRef.current = virtualIndex;
      const normalized = ((virtualIndex % n) + n) % n;
      setActiveIndex(normalized);
      const target = -virtualIndex * angleStep;
      snapAnim.current?.stop();
      if (reduceMotion) {
        rotateY.set(target);
        return;
      }
      snapAnim.current = animate(rotateY, target, {
        type: "spring",
        stiffness: 260,
        damping: 32,
        mass: 0.85,
      });
    },
    [angleStep, n, reduceMotion, rotateY],
  );

  const snapToIndex = useCallback(
    (index: number) => {
      const normalized = ((index % n) + n) % n;
      const currentVirtual = virtualIndexRef.current;
      const currentMod = ((currentVirtual % n) + n) % n;
      let delta = normalized - currentMod;
      if (delta > n / 2) delta -= n;
      if (delta < -n / 2) delta += n;
      snapToVirtualIndex(currentVirtual + delta);
    },
    [n, snapToVirtualIndex],
  );

  const snapToNearest = useCallback(() => {
    const current = rotateY.get();
    const dragDelta = current - dragStartY.current;
    let virtualIndex = Math.round(-current / angleStep);

    if (Math.abs(dragDelta) > angleStep * 0.1) {
      if (dragDelta < 0) {
        virtualIndex = Math.ceil(-current / angleStep - 1e-4);
      } else {
        virtualIndex = Math.floor(-current / angleStep + 1e-4);
      }
    }

    snapToVirtualIndex(virtualIndex);
  }, [angleStep, rotateY, snapToVirtualIndex]);

  useEffect(() => {
    const ro = () => {
      const vw = window.innerWidth;
      const mobile = vw < 768;
      if (mobile) {
        const nextCardWidth = Math.min(240, Math.round(vw * 0.56));
        const nextRadius = Math.round(nextCardWidth * 0.42);
        setCardWidth(nextCardWidth);
        setRadius(nextRadius);
        return;
      }
      const isSm = vw < 640;
      const band = vw * (isSm ? 0.86 : 0.8);
      const floor = isSm ? 150 : 232;
      const factor = isSm ? 0.5 : 0.46;
      const nextRadius = Math.round(Math.min(520, Math.max(floor, band * factor)));
      const nextCardWidth = Math.min(420, Math.round(2 * nextRadius * Math.sin(Math.PI / n) * 0.88));
      setRadius(nextRadius);
      setCardWidth(nextCardWidth);
    };
    ro();
    window.addEventListener("resize", ro);
    return () => window.removeEventListener("resize", ro);
  }, [n]);

  const cardHeight = Math.min(
    singleFocus ? 260 : 340,
    Math.max(singleFocus ? 160 : 180, Math.round(cardWidth * 1.05)),
  );

  useEffect(() => {
    if (reduceMotion || !inView || singleFocus) return;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!dragging.current) {
        const deltaSec = (now - last) / 1000;
        last = now;
        let next = rotateY.get() + AUTO_ROTATE_DEG_PER_SEC * deltaSec;
        if (next >= 360) next -= 360;
        rotateY.set(next);
      } else {
        last = now;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, inView, rotateY, singleFocus]);

  useEffect(() => {
    if (!singleFocus) return;
    snapToVirtualIndex(virtualIndexRef.current);
  }, [singleFocus, cardWidth, snapToVirtualIndex]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    snapAnim.current?.stop();
    dragStartY.current = rotateY.get();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragging.current = true;
    lastPointerX.current = e.clientX;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || reduceMotion) return;
    const dx = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;
    const sensitivity = singleFocus ? 0.55 : 0.45;
    let next = rotateY.get() + dx * sensitivity;
    if (!singleFocus) {
      next = ((next % 360) + 360) % 360;
    }
    rotateY.set(next);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.currentTarget as HTMLElement).hasPointerCapture?.(e.pointerId)) {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    }
    dragging.current = false;
    if (singleFocus) snapToNearest();
  };

  const ringSize = radius * 2;
  /**
   * The ring is a large square in 3D space; using that as layout height leaves a huge empty band.
   * Flow height ≈ visible card band + hint — ring is absolutely centered so it does not stretch the section.
   */
  const stageFlowMinHeight = Math.min(
    singleFocus ? 280 : 400,
    Math.max(singleFocus ? 150 : 180, Math.round(cardHeight * 1.08 + (singleFocus ? 28 : 44))),
  );

  return (
    <div
      className="relative mx-auto mt-0 w-full max-w-[94vw] select-none sm:max-w-[80vw]"
      style={{
        perspective: singleFocus ? 2200 : STAGE_PERSPECTIVE_PX,
        perspectiveOrigin: "50% 50%",
      }}
    >
      <div
        className={`product-map-stage relative mx-auto w-full max-w-[94vw] cursor-grab active:cursor-grabbing sm:max-w-[80vw] ${
          singleFocus ? "touch-none overflow-hidden" : "overflow-x-clip overflow-y-visible"
        }`}
        style={{ minHeight: stageFlowMinHeight, overscrollBehavior: "contain" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-[48%] z-0"
          style={{
            width: ringSize,
            height: ringSize,
            marginLeft: -ringSize / 2,
            marginTop: -ringSize / 2,
            transform: `rotateX(${STAGE_ROTATE_X_DEG}deg) translateZ(${STAGE_TRANSLATE_Z_PX}px) scale(${STAGE_SCALE})`,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className={`pointer-events-auto relative ${singleFocus ? "touch-none" : "touch-pan-y"}`}
            style={{
              width: ringSize,
              height: ringSize,
              rotateY: rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            {screens.map((s, i) => (
              <CarouselCard3D
                key={s.title}
                item={s}
                index={i}
                angleStep={angleStep}
                radius={radius}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                rotateY={rotateY}
                singleFocus={singleFocus}
              />
            ))}
          </motion.div>
        </div>
      </div>
      {singleFocus ? (
        <div
          className="product-map-dots relative z-10 mt-3 flex justify-center gap-1.5"
          role="tablist"
          aria-label="Product map modules"
        >
          {screens.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show ${s.title}`}
              className="product-map-dot"
              data-active={i === activeIndex ? "true" : "false"}
              onClick={() => snapToIndex(i)}
            />
          ))}
        </div>
      ) : null}
      <p
        className={`relative z-10 mx-auto max-w-xl px-2 text-center text-[11px] leading-snug text-muted-foreground sm:text-xs ${
          singleFocus ? "pt-2 pb-1" : "pb-1 pt-2"
        }`}
      >
        {singleFocus ? "Swipe or tap a dot to explore each module" : null}
      </p>
    </div>
  );
}

export function ScreensSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <section
      id="screens"
      className="section-seam section-surface-sand relative overflow-x-clip overflow-y-visible px-[clamp(1rem,4vw,2rem)] pb-[clamp(1.35rem,3vw,2.1rem)] pt-[clamp(2.1rem,3.75vw,3.1rem)]"
      aria-label="Screens & Modules"
    >
      <SectionFadeTop from="sand" />
      <SectionFadeBottom to="muted" />
      <div ref={ref} className="section-container relative z-10">
        <motion.div
          style={{ y: headerY }}
          className="section-header section-header--tight !mb-5 max-lg:!mb-5 sm:!mb-14 md:!mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="section-eyebrow">Product map</span>
            <h2 className="section-title !mt-2">
              How <span className="gradient-text">Siyaha BH</span> is laid out
            </h2>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="product-map-wrap relative left-1/2 mt-6 w-[94vw] max-w-[94vw] -translate-x-1/2 overflow-hidden px-0 pb-1 pt-2 sm:mt-8 sm:w-[80vw] sm:max-w-[80vw] sm:overflow-x-clip sm:overflow-y-visible sm:pt-4 md:mt-10"
          role="region"
          aria-roledescription="carousel"
          aria-label="Product map modules in 3D carousel"
        >
          <ProductMapCarousel3D inView={inView} />
        </motion.div>
      </div>
    </section>
  );
}
