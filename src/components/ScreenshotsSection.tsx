import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import homeScreenVideo from "@/assets/homescreen.mp4";
import exploreScreenVideo from "@/assets/explore.mp4";
import aiPlanVideo from "@/assets/aiplan.mp4";
import khalidVideo from "@/assets/khalid.mp4";
import communityVideo from "@/assets/community.mp4";
import homeScreenPoster from "@/assets/home page.png";
import exploreScreenPoster from "@/assets/explore page.png";
import planScreenPoster from "@/assets/plan screen.png";
import khalidScreenPoster from "@/assets/explore page.png";
import communityScreenPoster from "@/assets/commmunity .png";
import { AppScreenMotionCard } from "@/components/AppScreenMotionCard";
import { SectionFadeBottom, SectionFadeTop } from "@/components/SectionFade";

type DemoId = "home" | "explore" | "plan" | "khalid" | "community";

const videoScreens: {
  id: DemoId;
  label: string;
  video: string;
  poster: string;
  completeSubtitle: string;
}[] = [
  {
    id: "home",
    label: "Home",
    video: homeScreenVideo,
    poster: homeScreenPoster,
    completeSubtitle: "You've seen the home experience",
  },
  {
    id: "explore",
    label: "Explore",
    video: exploreScreenVideo,
    poster: exploreScreenPoster,
    completeSubtitle: "You've seen the explore experience",
  },
  {
    id: "plan",
    label: "Plan",
    video: aiPlanVideo,
    poster: planScreenPoster,
    completeSubtitle: "You've seen the AI planner experience",
  },
  {
    id: "khalid",
    label: "Khalid",
    video: khalidVideo,
    poster: khalidScreenPoster,
    completeSubtitle: "You've met Khalid, your AI guide",
  },
  {
    id: "community",
    label: "Community",
    video: communityVideo,
    poster: communityScreenPoster,
    completeSubtitle: "You've seen the community experience",
  },
];

export function ScreenshotsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [activeDemo, setActiveDemo] = useState<DemoId | null>(null);

  return (
    <section
      id="screenshots"
      className="section-seam section-padding section-surface-base relative overflow-hidden scroll-mt-24"
      aria-label="App Screenshots"
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-48 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,oklch(0.55_0.14_25/0.07),transparent_70%)]"
        aria-hidden
      />
      <SectionFadeTop from="base" />
      <SectionFadeBottom to="sand" />

      <motion.div ref={ref} className="section-container section-container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <span className="section-eyebrow">Preview</span>
          <h2 className="section-title">
            <span className="gradient-text">Siyaha BH</span> in motion
          </h2>
          <p className="section-desc mx-auto max-w-xl">
            Every screen loops live in the preview — tap any card to watch the full demo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto grid w-full max-w-[min(78vw,240px)] grid-cols-1 justify-items-center gap-10 sm:max-w-none sm:grid-cols-3 sm:gap-3 md:grid-cols-5 md:gap-3 lg:gap-3"
        >
          {videoScreens.map((screen, i) => (
            <motion.div
              key={screen.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              whileHover={{ y: -10, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full min-w-0 sm:max-w-none"
            >
              <AppScreenMotionCard
                label={screen.label}
                video={screen.video}
                poster={screen.poster}
                completeSubtitle={screen.completeSubtitle}
                open={activeDemo === screen.id}
                onOpenChange={(open) => setActiveDemo(open ? screen.id : null)}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          
        </motion.div>
      </motion.div>
    </section>
  );
}
