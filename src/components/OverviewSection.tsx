import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AppPhoneShowcase } from "@/components/AppPhoneShowcase";
import { BusinessLaptopShowcase } from "@/components/BusinessLaptopShowcase";
import { SectionFadeBottom } from "@/components/SectionFade";

export function OverviewSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="overview"
      className="section-seam section-padding section-surface-base relative isolate z-20 overflow-x-clip overflow-y-visible scroll-mt-20"
      aria-label="Overview"
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-1/3 z-0 h-[420px] bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,oklch(0.55_0.14_25/0.06),transparent_70%)]"
        aria-hidden
      />
      <SectionFadeBottom to="sand" />

      <motion.div
        ref={ref}
        className="section-container relative z-10 w-full max-w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header !mb-6 px-0 text-center md:!mb-10"
        >
          <span className="section-eyebrow">Overview</span>
          <h2 className="section-title mx-auto max-w-[20ch] text-pretty sm:max-w-none">
            What is <span className="gradient-text">Siyaha BH</span>?
          </h2>
          <p className="section-desc mx-auto max-w-[min(100%,34rem)] text-pretty text-center">
            Bahrain&apos;s AI-powered tourism platform—discover places, plan your trip, and explore
            with Khalid, your local guide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex w-full min-w-0 max-w-full flex-col items-center gap-10 overflow-x-clip lg:grid lg:grid-cols-2 lg:items-start lg:gap-14"
        >
          <motion.div className="w-full min-w-0 max-w-[min(100%,36rem)] space-y-5 text-center lg:max-w-none lg:text-left">
            <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              <span className="font-medium text-foreground">Siyaha BH</span> is an intelligent
              tourism platform for Bahrain that integrates a mobile application with a business
              owner web portal. The system helps users discover places, restaurants, and events
              while promoting local businesses across the Kingdom.
            </p>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              The mobile app lets you browse business posts and detailed profiles, explore nearby
              spots through AR, and connect with the community. AI itinerary generation builds
              personalized travel plans from your preferences, while{" "}
              <span className="font-medium text-foreground">Khalid</span>—your virtual tourist
              guide—offers real-time recommendations and assistance whenever you need them.
            </p>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              On the business side, owners use the web portal to create and manage profiles,
              publish posts, and organize events. Built with React Native, Supabase, OpenAI, and
              Pinecone, <span className="font-medium text-foreground">Siyaha BH</span> delivers a
              unified, scalable solution for travelers and local businesses.
            </p>
          </motion.div>

          <motion.div className="flex w-full min-w-0 max-w-full justify-center overflow-x-clip lg:justify-end">
            <div className="w-full max-w-full overflow-x-clip max-lg:mx-auto max-lg:flex max-lg:justify-center lg:max-w-none">
              <div className="origin-top max-lg:scale-[0.78] sm:max-lg:scale-[0.88] lg:scale-100">
                <AppPhoneShowcase />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mt-12 w-full max-w-full md:mt-20 lg:mt-24 lg:left-1/2 lg:w-screen lg:max-w-[100vw] lg:-translate-x-1/2"
        >
          <div className="w-full px-0 sm:px-2 lg:px-8">
            <BusinessLaptopShowcase />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
