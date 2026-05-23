import { motion, useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bot,
  CalendarDays,
  Compass,
  Layers,
  MapPinned,
  Sparkles,
  Store,
  Users,
  UtensilsCrossed,
  ArrowRight,
} from "lucide-react";
import { AppPhoneFrame } from "@/components/AppPhoneFrame";
import { SectionFadeBottom, SectionFadeTop } from "@/components/SectionFade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

import imgPlan from "@/assets/plan screen.png";
import imgExplore from "@/assets/explore page.png";
import imgCommunity from "@/assets/commmunity .png";
import imgHome from "@/assets/home page.png";
import imgBusiness from "@/assets/Business1.png";
import khalidVideo from "@/assets/khalid.mp4";
import khalidPoster from "@/assets/explore page.png";

const unifiedCategories = [
  { icon: UtensilsCrossed, label: "Restaurants" },
  { icon: MapPinned, label: "Places" },
  { icon: CalendarDays, label: "Events" },
] as const;

const solutions = [
  {
    icon: Layers,
    image: imgHome,
    title: "Everything in one place",
    desc: "Stop jumping between apps and social feeds. Browse restaurants, attractions, and live events from a single Bahrain-focused platform.",
    tag: "Unified discovery",
  },
  {
    icon: Sparkles,
    image: imgPlan,
    title: "AI-powered trip plans",
    desc: "Tell us your interests, budget, and schedule—Siyaha builds a smart day-by-day itinerary with timings, routes, and spots you'll love.",
    tag: "Smart planning",
  },
  {
    icon: Compass,
    image: imgExplore,
    title: "Search what's nearby",
    desc: "Quickly filter and explore areas around you—trending cafés, hidden gems, weekend events, and attractions on an interactive map.",
    tag: "Live discovery",
  },
  {
    icon: Bot,
    video: khalidVideo,
    poster: khalidPoster,
    title: "Meet Khalid, your AI guide",
    desc: "Ask natural questions like “What should I do this weekend?” and get personalized answers, tips, and recommendations in real time.",
    tag: "Intelligent assistant",
  },
  {
    icon: Users,
    image: imgCommunity,
    title: "A real tourism community",
    desc: "Read authentic reviews, share experiences, follow local posts, and discover Bahrain through people who actually live and visit here.",
    tag: "Local voices",
  },
  {
    icon: Store,
    image: imgBusiness,
    title: "Visibility for local businesses",
    desc: "Owners manage profiles, publish posts, and promote events through the business portal—reaching travelers where they're already planning.",
    tag: "Business portal",
  },
] as const;

const AUTOPLAY_MS = 5500;

export function SolutionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselOpts = useMemo(
    () => ({
      loop: true,
      align: isMobile ? ("center" as const) : ("start" as const),
      slidesToScroll: 1,
    }),
    [isMobile],
  );

  const onSelect = useCallback(() => {
    if (!carouselApi) return;
    setActiveIndex(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi, onSelect]);

  useEffect(() => {
    if (!carouselApi || reducedMotion || !inView) return;
    const timer = window.setInterval(() => carouselApi.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [carouselApi, reducedMotion, inView]);

  useEffect(() => {
    carouselApi?.reInit();
  }, [carouselApi, isMobile]);

  return (
    <section
      id="solution"
      className="section-seam section-padding section-surface-base relative overflow-hidden scroll-mt-24"
      aria-label="Our solution"
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-56 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,oklch(0.55_0.14_25/0.08),transparent_70%)]"
        aria-hidden
      />
      <SectionFadeTop from="base" />
      <SectionFadeBottom to="sand" />

      <motion.div ref={ref} className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <span className="section-eyebrow section-eyebrow-solution">Our solution</span>
          <h2 className="section-title">
            One platform that{" "}
            <span className="gradient-text">solves it all</span>
          </h2>
          <p className="section-desc">
            Siyaha BH brings scattered tourism information together—then layers AI planning,
            nearby discovery, and community insight so exploring Bahrain feels effortless.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="solution-hub mx-auto mb-12 max-w-3xl md:mb-14"
        >
          <p className="solution-hub-label">We unify</p>
          <div className="solution-hub-categories">
            {unifiedCategories.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                whileHover={{ y: -4 }}
                className="solution-hub-pill"
              >
                <span className="solution-hub-pill-icon" aria-hidden>
                  <Icon size={20} strokeWidth={2} />
                </span>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
          <div className="solution-hub-connector" aria-hidden>
            <span className="solution-hub-line" />
            <span className="solution-hub-core">
              <Layers size={22} strokeWidth={2} aria-hidden />
              <span>One Siyaha BH platform</span>
            </span>
            <span className="solution-hub-line" />
          </div>
          <p className="solution-hub-caption">
            Discover, plan, and experience Bahrain without switching between websites, maps, and
            social apps.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="solution-slider"
        >
          <Carousel
            setApi={setCarouselApi}
            opts={carouselOpts}
            className="solution-slider-carousel"
            aria-label="Siyaha BH app features"
          >
            <div className="solution-slider-stage">
              <CarouselPrevious
                variant="outline"
                size="icon"
                className="solution-slider-nav-btn solution-slider-nav-btn--prev"
              />
              <CarouselContent className="solution-slider-track -ml-[0.85rem]">
                {solutions.map((solution) => {
                  const Icon = solution.icon;
                  return (
                    <CarouselItem
                      key={solution.title}
                      className="solution-slider-item !basis-[85%] pl-[0.85rem] sm:!basis-1/2 lg:!basis-1/3"
                    >
                      <motion.article
                        className="solution-card"
                        whileHover={reducedMotion ? undefined : { y: -4 }}
                        transition={{ duration: 0.35 }}
                      >
                        <div className="solution-card-media solution-card-media--phone">
                          <AppPhoneFrame
                            src={"image" in solution ? solution.image : undefined}
                            video={"video" in solution ? solution.video : undefined}
                            poster={"poster" in solution ? solution.poster : undefined}
                            alt={solution.title}
                            size="card"
                          />
                          <span className="solution-card-icon" aria-hidden>
                            <Icon size={20} strokeWidth={2} />
                          </span>
                        </div>
                        <div className="solution-card-body">
                          <span className="solution-card-tag">{solution.tag}</span>
                          <h3 className="solution-card-title">{solution.title}</h3>
                          <p className="solution-card-desc">{solution.desc}</p>
                        </div>
                      </motion.article>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselNext
                variant="outline"
                size="icon"
                className="solution-slider-nav-btn solution-slider-nav-btn--next"
              />
            </div>

            <div className="solution-slider-dots" role="tablist" aria-label="Feature slides">
              {solutions.map((solution, index) => (
                <button
                  key={solution.title}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Go to ${solution.title}`}
                  className="solution-slider-dot"
                  data-active={index === activeIndex ? "true" : "false"}
                  onClick={() => carouselApi?.scrollTo(index)}
                />
              ))}
            </div>
          </Carousel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-3 text-center md:mt-12"
        >
          <p className="max-w-lg text-sm text-muted-foreground">
            From your first search to a full weekend itinerary—personalized, local, and powered by
            AI.
          </p>
          <a href="#screenshots" className="problem-cta group inline-flex items-center gap-2">
            See it in action
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
