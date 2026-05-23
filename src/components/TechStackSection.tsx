import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TechStackLayers } from "@/components/TechStackLayers";
import { SectionFadeBottom, SectionFadeTop } from "@/components/SectionFade";

export function TechStackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="tech"
      className="section-seam section-surface-tech relative overflow-x-visible overflow-y-visible"
      aria-label="Technology Stack"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,var(--surface-base)_0%,var(--surface-muted)_45%,var(--surface-base)_100%)]"
        aria-hidden
      />
      <SectionFadeTop from="sand" />
      <SectionFadeBottom to="base" />

      <motion.div
        ref={ref}
        className="section-container section-container-wide relative z-10 px-[clamp(1rem,4vw,2rem)] pb-[clamp(4.5rem,8vw,6.5rem)] pt-[clamp(2rem,3.5vw,3rem)] max-lg:px-4 max-lg:pb-8 max-lg:pt-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header max-lg:!mb-3 max-lg:flex max-lg:flex-col max-lg:items-center max-lg:px-1 max-lg:text-center"
        >
          <span className="section-eyebrow max-lg:text-[0.7rem] max-lg:tracking-[0.18em]">Technology</span>
          <h2 className="section-title max-lg:!mt-1 max-lg:max-w-full max-lg:!text-[1.5rem] max-lg:leading-tight max-lg:text-pretty">
            Under the hood of <span className="gradient-text">Siyaha BH</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <TechStackLayers />
        </motion.div>
      </motion.div>
    </section>
  );
}
