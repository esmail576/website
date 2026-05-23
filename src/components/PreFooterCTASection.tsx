import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import bahviewImg from "@/assets/bahview.webp";
import homeScreenImg from "@/assets/home page.png";
import planScreenImg from "@/assets/plan screen.png";
import { SectionFadeTop } from "@/components/SectionFade";

function TrustPhoneFrame() {
  return (
    <motion.div
      className="relative mx-auto w-[min(100%,220px)] sm:w-[248px] lg:mx-0 lg:ml-auto lg:mr-8"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="relative origin-[50%_100%] [transform-style:preserve-3d] [transform:rotateY(-8deg)_rotateX(4deg)]"
        aria-hidden
      >
        <div
          className="pointer-events-none absolute -bottom-5 left-1/2 z-0 h-8 w-[70%] -translate-x-1/2 rounded-[100%] bg-slate-900/15 blur-xl"
          aria-hidden
        />
        <motion.div className="relative rounded-[2.35rem] border-[9px] border-slate-900 bg-slate-900 p-[3px] shadow-[0_28px_60px_-20px_rgba(15,23,42,0.35)]">
          <div
            className="pointer-events-none absolute left-1/2 top-[11px] z-20 h-[22px] w-[72px] -translate-x-1/2 rounded-full bg-slate-900"
            aria-hidden
          />
          <div className="overflow-hidden rounded-[1.85rem] bg-white">
            <img
              src={homeScreenImg}
              alt="SiyahaBH app home screen showing explore and plan features"
              className="aspect-[9/19.5] w-full object-cover object-top"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function PreFooterCTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} aria-label="Download app and trust highlights" className="relative">
      {/* Trust highlight — white two-column block */}
      <motion.div className="relative overflow-hidden bg-white pb-6 pt-2 sm:pb-10 sm:pt-4 lg:pb-12">
        <SectionFadeTop from="elevated" />
        <div className="section-container section-container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16"
          >
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <motion.div
                className="relative overflow-hidden rounded-3xl shadow-[0_24px_60px_-28px_rgba(15,23,42,0.22)]"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={bahviewImg}
                  alt="Bahrain skyline view with the SiyahaBH app"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-2 top-2 w-[min(34%,128px)] min-[480px]:w-[min(38%,150px)] sm:right-4 sm:top-4 sm:w-[188px]"
                  aria-label="Planned — your Bahrain day is ready in the SiyahaBH app"
                >
                  <div className="relative rounded-[1.65rem] border-[7px] border-slate-900 bg-slate-900 p-[2px] shadow-[0_16px_48px_-20px_rgba(15,23,42,0.35)]">
                    <div
                      className="pointer-events-none absolute left-1/2 top-[9px] z-20 h-[18px] w-[60px] -translate-x-1/2 rounded-full bg-slate-900"
                      aria-hidden
                    />
                    <div className="overflow-hidden rounded-[1.2rem] bg-white">
                      <img
                        src={planScreenImg}
                        alt="SiyahaBH plan screen — your Bahrain day is ready"
                        className="aspect-[9/19.5] w-full object-cover object-top"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="text-center lg:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.12] tracking-tight text-foreground"
              >
                Explore Bahrain{" "}
                <span className="text-foreground">confidently</span>{" "}
                <span className="font-semibold text-slate-400">with SiyahaBH</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground lg:mx-0"
              >
                Your plans, preferences, and saved places stay protected with modern sign-in and
                secure infrastructure—so you can focus on discovering the Kingdom, not managing
                scattered tabs and apps.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA banner — brand red, phone overlaps upward */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-t-[2.5rem] bg-[var(--brand-red)] sm:rounded-t-[3rem] lg:overflow-visible md:rounded-t-[3.5rem]"
      >
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-t-[inherit] text-[clamp(5rem,16vw,12rem)] font-bold lowercase tracking-tight text-white/[0.07] select-none"
          aria-hidden
        >
          siyahabh
        </span>

        <motion.div className="section-container section-container-wide relative z-10 px-6 pb-10 pt-10 sm:px-8 sm:pb-12 sm:pt-12 md:pb-14 lg:px-10">
          <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-6">
            <div className="text-center lg:pb-6 lg:text-left">
              <p className="text-sm font-medium text-white/85 sm:text-[15px]">
                Join the travel revolution — simple, smart, inspiring
              </p>
              <h3 className="mt-3 text-[clamp(1.65rem,3.8vw,2.65rem)] font-bold leading-tight tracking-tight text-white">
                Start Exploring Bahrain with SiyahaBH Today
              </h3>
              <a
                href="#contact"
                className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[var(--brand-red)] shadow-[0_8px_30px_-8px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_rgba(0,0,0,0.3)] active:translate-y-0"
              >
                Get the App
              </a>
            </div>

            <motion.div className="hidden lg:flex lg:justify-end">
              <div className="-mt-52 lg:mr-4 xl:-mt-56">
                <TrustPhoneFrame />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
