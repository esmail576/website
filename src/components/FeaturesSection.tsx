import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Clock,
  Layers,
  Map,
  MessageCircleQuestion,
  Route,
  Smartphone,
  Store,
  Users,
  ArrowRight,
} from "lucide-react";
import { ProblemArcGallery, type ArcProblem } from "@/components/ProblemArcGallery";
import { SectionFadeBottom, SectionFadeTop } from "@/components/SectionFade";

const problems: ArcProblem[] = [
  {
    icon: Layers,
    title: "Scattered tourism information",
    desc: "Users must search across multiple websites and apps to find attractions, restaurants, and events.",
  },
  {
    icon: Route,
    title: "Difficult trip planning",
    desc: "People struggle to create organized travel plans that match their interests and schedules.",
  },
  {
    icon: Map,
    title: "Lack of personalized recommendations",
    desc: "Most platforms provide generic suggestions instead of recommendations based on user preferences.",
  },
  {
    icon: Clock,
    title: "Limited real-time discovery",
    desc: "Tourists often miss live events, trending places, and nearby attractions happening around them.",
  },
  {
    icon: Users,
    title: "Weak local interaction",
    desc: "Visitors cannot easily access authentic reviews, experiences, and local recommendations from the community.",
  },
  {
    icon: Store,
    title: "Small businesses lack visibility",
    desc: "Local restaurants, attractions, and event organizers struggle to promote themselves effectively online.",
  },
  {
    icon: MessageCircleQuestion,
    title: "No intelligent tourism assistant",
    desc: "Users cannot quickly ask questions like:",
    highlight: "“What should I do this weekend in Bahrain?”",
  },
  {
    icon: Smartphone,
    title: "Traditional tourism apps feel outdated",
    desc: "Most existing tourism platforms lack AI, AR exploration, and interactive user experiences.",
  },
];

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      id="problem"
      className="section-seam section-padding section-surface-sand relative overflow-x-clip overflow-y-visible"
      aria-label="Problems travelers face"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,oklch(0.55_0.12_25/0.05),transparent_60%)]"
        aria-hidden
      />
      <SectionFadeTop from="sand" />
      <SectionFadeBottom to="base" />

      <motion.div ref={ref} className="relative z-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="section-header section-header--tight"
          >
            <span className="section-eyebrow section-eyebrow-problem">The challenge</span>
            <h2 className="section-title">
              Problems travelers face in{" "}
              <span className="gradient-text">Bahrain</span>
            </h2>
            <p className="section-desc">
              Tourists and residents still rely on scattered information, outdated platforms, and
              social media to discover places, events, and experiences in Bahrain.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="problem-divider mx-auto mb-5 max-w-md origin-center"
            aria-hidden
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-3 text-center text-sm font-medium tracking-wide text-muted-foreground"
          >
            Scroll through the friction points travelers still run into today.
          </motion.p>
        </div>

        <motion.div className="problem-arc-bleed">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProblemArcGallery problems={problems} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="section-container mt-8 flex flex-col items-center gap-4 text-center md:mt-10"
        >
          <a href="#solution" className="problem-cta group inline-flex items-center gap-2">
            See how we solve this
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
