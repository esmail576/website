import { motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { Sparkles, Scan } from "lucide-react";

import homescreenVideo from "@/assets/homescreen.mp4";
import homeScreenPoster from "@/assets/home page.png";
const phoneWidthClass =
  "w-[min(100%,200px)] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px]";

function HeroPhoneShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    void vid.play().catch(() => {});
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`relative z-10 mx-auto md:ml-auto md:mr-0 [perspective:1400px] ${phoneWidthClass}`}
    >
      <div
        className="relative origin-center will-change-transform [transform-style:preserve-3d] max-md:[transform:none] md:[transform:rotateY(-28deg)_rotateX(10deg)] md:origin-[50%_92%]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="pointer-events-none absolute -bottom-6 left-1/2 z-0 h-10 w-[72%] -translate-x-1/2 rounded-[100%] bg-slate-900/20 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -inset-4 rounded-[3.5rem] bg-slate-900/[0.04] blur-3xl max-md:hidden md:-inset-8"
          aria-hidden
        />
        <div className="relative rounded-[2.75rem] border-[11px] border-slate-950 bg-slate-950 p-[3px] shadow-[0_48px_90px_-28px_rgba(15,23,42,0.4)]">
          <div
            className="pointer-events-none absolute left-1/2 top-[12px] z-20 h-[24px] w-[84px] -translate-x-1/2 rounded-full bg-slate-950"
            aria-hidden
          />
          <div className="overflow-hidden rounded-[2.1rem] bg-white">
            <video
              ref={videoRef}
              src={homescreenVideo}
              poster={homeScreenPoster}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Siyaha BH app home screen"
              className="aspect-[9/19.5] w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}


function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-7">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-7">
      <path fill="#00D0FF" d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12 3.84 21.85C3.34 21.61 3 21.09 3 20.5Z" />
      <path fill="#FFC800" d="M16.81 15.12 6.05 21.34 14.54 12.85 16.81 15.12Z" />
      <path fill="#FF3A44" d="M3.84 2.15 13.69 12 3.84 21.85 6.05 21.34 16.81 8.88 14.54 12.85 6.05 2.66 3.84 2.15Z" />
      <path fill="#00F076" d="M16.81 8.88 6.05 2.66 14.54 12.85 16.81 8.88Z" />
    </svg>
  );
}

function HeroCopy({ onNotify }: { onNotify: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="flex w-full min-w-0 max-w-full flex-col items-center gap-5 text-center max-md:order-1 sm:gap-6 md:items-start md:text-left lg:gap-7"
    >
      <header className="w-full space-y-3 text-center max-sm:space-y-3.5 sm:space-y-4 md:text-left lg:space-y-5">
        <h1 className="text-balance text-[clamp(2rem,8vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-foreground xl:text-[clamp(3.25rem,6.5vw,6rem)]">
          Explore Bahrain with AI &amp; AR.
        </h1>
        <p className="text-balance text-[clamp(1.5rem,5.5vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-[var(--brand-red)] xl:text-[clamp(2.25rem,4.5vw,4.25rem)]">
          Plan smarter. Travel deeper.
        </p>
      </header>

      <p className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm sm:gap-x-2.5 sm:px-5 sm:py-2.5 sm:text-base md:justify-start">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 sm:text-sm">
          Powered by
        </span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
          <Sparkles className="size-4 text-[var(--brand-red)] sm:size-5" aria-hidden />
          AI
        </span>
        <span className="text-muted-foreground/50" aria-hidden>
          &amp;
        </span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
          <Scan className="size-4 text-[var(--brand-red)] sm:size-5" aria-hidden />
          AR
        </span>
      </p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
        className="flex w-full max-w-sm flex-col items-center gap-2.5 md:max-w-none md:items-start"
      >
        <div className="flex w-full flex-row flex-nowrap items-stretch justify-center gap-2 sm:gap-3 md:justify-start">
          <StoreButton
            sublabel="Download on the"
            label="App Store"
            icon={<AppleIcon />}
            onNotify={onNotify}
          />
          <StoreButton
            sublabel="Get it on"
            label="Google Play"
            icon={<PlayStoreIcon />}
            onNotify={onNotify}
          />
        </div>
        <p className="text-base text-muted-foreground sm:text-lg">
          Coming soon on iOS &amp; Android — tap a store to get notified.
        </p>
      </motion.div>
    </motion.div>
  );
}

function HeroPhoneStage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.18, ease: "easeOut" }}
      className="relative mx-auto flex w-full max-w-[min(100%,280px)] justify-center max-md:order-2 max-md:pb-2 sm:max-w-[min(100%,340px)] md:ml-auto md:mr-0 md:max-w-none md:justify-self-end md:overflow-visible md:pr-0 lg:pr-2 xl:pr-4"
      aria-label="App preview"
    >
      <div className="relative mx-auto flex w-full max-w-[320px] items-center justify-center md:ml-auto md:mr-0 md:max-w-[360px] md:justify-end lg:max-w-[400px]">
        <HeroPhoneShowcase />
      </div>
    </motion.div>
  );
}

function StoreButton({
  label,
  sublabel,
  icon,
  onNotify,
}: {
  label: string;
  sublabel: string;
  icon: ReactNode;
  onNotify: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onNotify}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative inline-flex h-11 min-w-0 flex-1 max-w-[9.75rem] cursor-pointer items-center gap-2 rounded-full bg-slate-900 px-3.5 text-white shadow-[0_12px_32px_-14px_rgba(15,23,42,0.45)] sm:h-14 sm:max-w-none sm:flex-none sm:min-w-[11.75rem] sm:gap-3 sm:px-6"
      aria-label={`${label} — coming soon. Tap to get notified.`}
    >
      <span className="absolute -right-1 -top-2 rounded-full bg-[var(--brand-red)] px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-wide text-white shadow-sm">
        Soon
      </span>
      <span className="flex shrink-0 opacity-95 [&_svg]:size-6 sm:[&_svg]:size-7">{icon}</span>
      <span className="min-w-0 flex flex-col items-start leading-tight text-left">
        <span className="text-[0.58rem] text-white/70 sm:text-[0.65rem]">{sublabel}</span>
        <span className="text-xs font-semibold sm:text-[0.9375rem]">{label}</span>
      </span>
    </motion.button>
  );
}

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      className="hero-section-height relative flex flex-col overflow-x-clip bg-white max-sm:pb-10 max-sm:pt-[var(--mobile-hero-pt)] sm:bg-[#f6f7f8] sm:pt-[calc(4.5rem+1rem)]"
      aria-label="Hero"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col justify-start px-5 pb-4 sm:justify-center sm:px-8 sm:pb-6 lg:px-10"
      >
        <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.18, ease: "easeOut" }}
        className="grid w-full min-w-0 grid-cols-1 items-center justify-items-center gap-6 max-md:max-w-full max-sm:gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:justify-items-stretch md:gap-8 lg:gap-10 xl:gap-12"
      >
          <HeroCopy onNotify={scrollToContact} />
          <HeroPhoneStage />
        </motion.div>
      </motion.div>
    </section>
  );
}
