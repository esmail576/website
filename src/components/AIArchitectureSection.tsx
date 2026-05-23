import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AIArchitectureDiagram } from "@/components/AIArchitectureDiagram";
import { SectionFadeBottom, SectionFadeTop } from "@/components/SectionFade";

export function AIArchitectureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="ai-architecture"
      className="section-seam section-surface-base relative overflow-x-clip overflow-y-visible"
      aria-label="AI model architecture"
    >
      <SectionFadeTop from="base" />
      <SectionFadeBottom to="sand" />
      <motion.div ref={ref} className="relative z-10 section-padding !pt-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header relative z-10 !mb-8"
        >
          <h2 className="section-title">
            <span className="gradient-text">Architecture</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative w-full"
        >
          <AIArchitectureDiagram />
        </motion.div>
      </motion.div>
    </section>
  );
}
