import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import homeScreenImg from "@/assets/home page.png";
import exploreScreenImg from "@/assets/explore page.png";
import planScreenImg from "@/assets/plan screen.png";
import skylineImg from "@/assets/bahrain-skyline.jpg";

const phones = [
  {
    position: "left" as const,
    image: homeScreenImg,
    alt: "SiyahaBH home and explore screen",
  },
  {
    position: "center" as const,
    image: planScreenImg,
    alt: "SiyahaBH AI itinerary planner screen",
  },
  {
    position: "right" as const,
    image: exploreScreenImg,
    alt: "SiyahaBH explore and AI assistant screen",
  },
];

type PhonePosition = "left" | "center" | "right";

type PhoneMockupProps = {
  image: string;
  alt: string;
  position: PhonePosition;
  delay?: number;
  inView: boolean;
};

const phoneWidth =
  "w-[min(32vw,128px)] min-[480px]:w-[150px] sm:w-[168px] md:w-[215px] lg:w-[228px]";

function PhoneFrame({ image, alt }: { image: string; alt: string }) {
  return (
    <div className={`relative ${phoneWidth} [transform-style:preserve-3d]`}>
      <div className="rounded-[1.85rem] border-[6px] border-slate-900 bg-slate-900 p-[2px] shadow-[0_16px_40px_-16px_rgba(15,23,42,0.32)] ring-1 ring-black/[0.08] sm:rounded-[2.35rem] sm:border-[9px] sm:p-[3px] sm:shadow-[0_20px_50px_-18px_rgba(15,23,42,0.35),0_8px_20px_-10px_rgba(15,23,42,0.15)]">
        <div
          className="pointer-events-none absolute left-1/2 top-[8px] z-20 h-[14px] w-[48px] -translate-x-1/2 rounded-full bg-slate-900 sm:top-[11px] sm:h-[22px] sm:w-[72px]"
          aria-hidden
        />
        <div className="overflow-hidden rounded-[1.45rem] bg-white sm:rounded-[1.85rem]">
          <img
            src={image}
            alt={alt}
            className="aspect-[9/19.5] w-full object-cover object-top"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

function PhoneMockup({ image, alt, position, delay = 0, inView }: PhoneMockupProps) {
  const isCenter = position === "center";
  const rotateY = position === "left" ? 22 : position === "right" ? -22 : 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 48,
        rotateY: position === "left" ? 28 : position === "right" ? -28 : 0,
        z: isCenter ? 40 : -40,
        scale: 1,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: isCenter ? -6 : 0,
              rotateY,
              z: isCenter ? 60 : -40,
              scale: 1,
            }
          : {}
      }
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d" }}
      className={[
        "relative flex flex-col items-center [transform-style:preserve-3d]",
        isCenter ? "z-30" : "z-10",
        position === "left" && "-mr-2 sm:-mr-8 md:-mr-10 lg:-mr-14",
        position === "right" && "-ml-2 sm:-ml-8 md:-ml-10 lg:-ml-14",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <PhoneFrame image={image} alt={alt} />
    </motion.div>
  );
}

export function AppPhoneShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative mt-8 overflow-visible lg:mt-0">
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 -z-10 h-10 w-[min(92%,340px)] -translate-x-1/2 rounded-[100%] bg-slate-900/[0.12] blur-2xl sm:bottom-8 sm:h-12 sm:w-[400px] md:bottom-10 md:w-[520px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-4 left-1/2 -z-10 h-4 w-[min(88%,280px)] -translate-x-1/2 rounded-[100%] bg-slate-900/20 blur-md sm:bottom-6 sm:w-[360px] md:w-[460px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 overflow-hidden opacity-[0.08] sm:h-32"
        aria-hidden
      >
        <img src={skylineImg} alt="" className="h-full w-full object-cover object-bottom" />
      </div>

      <div
        className="relative mx-auto flex min-h-[220px] w-full max-w-[780px] flex-row items-end justify-center gap-0 px-2 pb-4 sm:min-h-[320px] sm:px-1 md:min-h-[400px] md:pb-6"
        style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
      >
        {phones.map((phone, index) => (
          <PhoneMockup
            key={phone.position}
            {...phone}
            inView={inView}
            delay={0.1 + index * 0.1}
          />
        ))}
      </div>

    </div>
  );
}
