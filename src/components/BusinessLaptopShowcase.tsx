import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import business1Img from "@/assets/Business1.png";
import business3Img from "@/assets/business3.png";
import business4Img from "@/assets/business4.png";

/** Matches the cream tone in the business portal screenshots */
const SCREEN_BG = "#FDF8F3";

type LaptopPosition = "left" | "center" | "right";

const laptops = [
  {
    position: "left" as const,
    image: business1Img,
    alt: "SiyahaBH business owner dashboard — location marquee",
    objectPosition: "top center",
  },
  {
    position: "center" as const,
    image: business4Img,
    alt: "SiyahaBH business profile management — footer and listing",
    objectPosition: "bottom center",
  },
  {
    position: "right" as const,
    image: business3Img,
    alt: "SiyahaBH business owner portal — food type filters",
    objectPosition: "top center",
  },
] as const;

function useMdUp() {
  const [mdUp, setMdUp] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setMdUp(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return mdUp;
}

type LaptopMockupProps = {
  image: string;
  alt: string;
  objectPosition: string;
  position: LaptopPosition;
  delay: number;
  inView: boolean;
  tiltEnabled: boolean;
};

function LaptopMockup({
  image,
  alt,
  objectPosition,
  position,
  delay,
  inView,
  tiltEnabled,
}: LaptopMockupProps) {
  const isCenter = position === "center";
  const rotateY = tiltEnabled
    ? position === "left"
      ? 20
      : position === "right"
        ? -20
        : 0
    : 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 36,
        rotateY: tiltEnabled
          ? position === "left"
            ? 24
            : position === "right"
              ? -24
              : 0
          : 0,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              rotateY,
              z: tiltEnabled ? (isCenter ? 24 : -16) : 0,
            }
          : {}
      }
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d" }}
      className={[
        "flex w-full min-w-0 flex-col [transform-style:preserve-3d]",
        isCenter ? "z-20" : "z-10",
      ].join(" ")}
    >
      <div className="relative w-full shadow-[0_24px_56px_-24px_rgba(15,23,42,0.32)]">
        {/* Screen lid — single overflow clip, no border seam at bottom */}
        <div
          className="overflow-hidden rounded-t-xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-800 p-[3px] pb-0 sm:rounded-t-2xl sm:p-1 sm:pb-0"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)" }}
        >
          <div
            className="relative aspect-[5/3] w-full overflow-hidden rounded-t-[5px] sm:rounded-t-md"
            style={{ backgroundColor: SCREEN_BG }}
          >
            <img
              src={image}
              alt={alt}
              className="block h-full w-full object-contain object-center"
              style={{ objectPosition }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Hinge — flush with screen, no white gap */}
        <div
          className="h-[2px] w-full bg-gradient-to-b from-slate-600 to-slate-500 sm:h-[3px]"
          aria-hidden
        />

        {/* Base / keyboard */}
        <div className="relative overflow-hidden rounded-b-lg bg-gradient-to-b from-slate-300 to-slate-400 px-3 pb-2 pt-1.5 sm:rounded-b-xl sm:px-4 sm:pb-2.5 sm:pt-2">
          <div
            className="mx-auto h-0.5 w-10 rounded-full bg-slate-500/45 sm:h-1 sm:w-14"
            aria-hidden
          />
        </div>
      </div>
    </motion.div>
  );
}

export function BusinessLaptopShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const tiltEnabled = useMdUp();

  return (
    <div ref={ref} className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mb-6 text-center sm:mb-8 md:mb-10"
      >
        <span className="section-eyebrow">For business owners</span>
        <h3 className="section-title !text-xl sm:!text-2xl md:!text-3xl lg:!text-4xl">
          Business owner profile portal
        </h3>
        <p className="section-desc !mt-2 !text-sm sm:!mt-3 sm:!text-base">
          Manage your listing, posts, and events from a dedicated web dashboard built for local
          businesses across Bahrain.
        </p>
      </motion.div>

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-12 w-[90%] -translate-x-1/2 rounded-[100%] bg-slate-900/[0.08] blur-2xl"
        aria-hidden
      />

      <div
        className="mx-auto grid w-full max-w-[420px] grid-cols-1 gap-4 overflow-visible sm:max-w-none sm:grid-cols-3 sm:gap-4 md:gap-5 lg:gap-6"
        style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
      >
        {laptops.map((laptop, index) => (
          <LaptopMockup
            key={laptop.alt}
            {...laptop}
            inView={inView}
            tiltEnabled={tiltEnabled}
            delay={0.12 + index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}
