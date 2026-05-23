import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navBarLinks, navLinks } from "@/config/navigation";
import { siyahaLogoSrc } from "@/components/SiyahaLogo";
import { cn } from "@/lib/utils";

function getSectionDocumentBounds(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  return { top, bottom: top + rect.height };
}

function useActiveSection(linkHrefs: string[], resyncTrigger?: unknown) {
  const [activeHref, setActiveHref] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      return window.location.hash;
    }
    return linkHrefs[0] ?? "#top";
  });

  useEffect(() => {
    const sections = linkHrefs
      .map((href) => {
        const id = href.replace(/^#/, "");
        const el = id ? document.getElementById(id) : null;
        return el ? { id, el } : null;
      })
      .filter((s): s is { id: string; el: HTMLElement } => Boolean(s));

    if (sections.length === 0) return;

    const getScrollOffset = () => {
      const header = document.querySelector("header");
      return (header?.getBoundingClientRect().height ?? 72) + 24;
    };

    const updateActive = () => {
      const offset = getScrollOffset();
      const scrollLine = window.scrollY + offset;
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;

      if (atBottom) {
        setActiveHref(`#${sections[sections.length - 1].id}`);
        return;
      }

      // Last section whose bounds contain the scroll line (handles tall Preview before Screens)
      let match: (typeof sections)[number] | null = null;
      for (const section of sections) {
        const { top, bottom } = getSectionDocumentBounds(section.el);
        if (scrollLine >= top && scrollLine < bottom) {
          match = section;
        }
      }

      // Between sections: use the last section that has started
      if (!match) {
        match = sections[0];
        for (const section of sections) {
          const { top } = getSectionDocumentBounds(section.el);
          if (top <= scrollLine) {
            match = section;
          } else {
            break;
          }
        }
      }

      setActiveHref(`#${match.id}`);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    window.addEventListener("hashchange", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      window.removeEventListener("hashchange", updateActive);
    };
  }, [linkHrefs, resyncTrigger]);

  return { activeHref, setActiveHref };
}

const SCROLL_TOP_THRESHOLD = 72;
const SCROLL_DIRECTION_THRESHOLD = 8;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();
  const navHrefs = navLinks.map((l) => l.href);
  const { activeHref, setActiveHref } = useActiveSection(navHrefs, menuOpen);

  const isHeroStyle = overHero;

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);

    if (menuOpen || y <= SCROLL_TOP_THRESHOLD) {
      setNavVisible(true);
      lastScrollY.current = y;
      return;
    }

    const delta = y - lastScrollY.current;
    if (delta > SCROLL_DIRECTION_THRESHOLD) {
      setNavVisible(false);
    } else if (delta < -SCROLL_DIRECTION_THRESHOLD) {
      setNavVisible(true);
    }

    lastScrollY.current = y;
  });

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) {
      setOverHero(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0.05 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleNavClick = useCallback(
    (href: string) => {
      setActiveHref(href);
      closeMenu();
    },
    [setActiveHref, closeMenu],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: navVisible ? 0 : "-100%",
          opacity: navVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[70] border-b transition-[background-color,border-color,box-shadow] duration-300 max-sm:pt-[calc(var(--mobile-safe-top)+var(--mobile-nav-inset))]",
          !navVisible && "pointer-events-none",
          isHeroStyle
            ? "border-transparent bg-transparent shadow-none"
            : cn(
                "border-border/80 bg-white/90 shadow-[0_4px_24px_-16px_rgba(15,23,42,0.12)] backdrop-blur-xl backdrop-saturate-150",
                scrolled && "shadow-[0_10px_40px_-18px_rgba(15,23,42,0.18)]",
              ),
        )}
      >
        <motion.div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 max-sm:h-[var(--mobile-nav-bar)] max-sm:min-h-0 max-sm:py-0 sm:h-[4.5rem] sm:px-8 sm:py-0 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10">
          <a
            href="#top"
            className="group flex min-w-0 shrink-0 items-center rounded-lg outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary lg:justify-self-start"
          >
            <img
              src={siyahaLogoSrc}
              alt="SiyahaBH"
              className="h-10 w-auto max-w-[min(100%,12.5rem)] object-contain object-left sm:h-11"
              decoding="async"
            />
          </a>

          <nav
            className="hidden items-center justify-center gap-1 lg:col-start-2 lg:flex lg:justify-self-center"
            aria-label="Main navigation"
          >
            {navBarLinks.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : isHeroStyle
                        ? "text-muted-foreground hover:text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <motion.div className="ml-auto flex shrink-0 items-center justify-end gap-2 sm:gap-3 lg:col-start-3 lg:ml-0 lg:justify-self-end">
            <motion.a
              href="#screenshots"
              className={cn(
                "hidden h-10 items-center justify-center rounded-full border px-5 text-sm font-semibold transition-all sm:inline-flex",
                isHeroStyle
                  ? "border-slate-300 bg-transparent text-foreground hover:border-slate-400 hover:bg-white"
                  : "border-border bg-transparent text-foreground hover:bg-muted",
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Demo
            </motion.a>
            <motion.a
              href="#contact"
              className={cn(
                "hidden h-10 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-bold transition-all sm:inline-flex",
                "bg-[var(--brand-red)] text-white shadow-md hover:bg-[var(--brand-red-dark)]",
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Coming Soon
            </motion.a>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((prev) => !prev)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 sm:h-11 sm:w-11",
                isHeroStyle
                  ? "border-border/60 bg-white/80 text-foreground hover:border-primary/30 hover:bg-white"
                  : "border-border bg-background text-foreground hover:border-primary/30 hover:bg-muted",
              )}
            >
              {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
            </button>
          </motion.div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[65] bg-[#0f172a]/55 backdrop-blur-[2px]"
              onClick={closeMenu}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="fixed inset-y-0 right-0 z-[75] flex w-full max-w-[min(100%,380px)] flex-col overflow-hidden bg-[var(--brand-red)] shadow-[-24px_0_60px_-20px_rgba(0,0,0,0.45)]"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.18),transparent_42%),radial-gradient(circle_at_90%_80%,rgba(0,0,0,0.15),transparent_40%)]"
                aria-hidden
              />

              <div className="relative flex items-center justify-between border-b border-white/12 px-6 py-5">
                <a href="#top" onClick={closeMenu} className="flex items-center rounded-lg bg-white/95 px-2 py-1">
                  <img
                    src={siyahaLogoSrc}
                    alt="SiyahaBH"
                    className="h-9 w-auto max-w-[11.5rem] object-contain"
                    decoding="async"
                  />
                </a>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-white/90 transition-colors hover:bg-white/12 hover:text-white"
                >
                  <X size={24} strokeWidth={2} />
                </button>
              </div>

              <nav className="relative flex-1 overflow-y-auto px-6 py-6">
                <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/45">
                  Explore
                </p>
                <ul className="relative flex flex-col gap-1">
                  {navLinks.map((link, index) => {
                    const isActive = activeHref === link.href;
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + index * 0.035, duration: 0.28 }}
                        className="relative"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="mobile-nav-active-bar"
                            className="absolute inset-0 rounded-xl bg-white/14"
                            transition={{ type: "spring", stiffness: 400, damping: 34 }}
                            aria-hidden
                          />
                        )}
                        <a
                          href={link.href}
                          onClick={() => handleNavClick(link.href)}
                          className={cn(
                            "relative z-10 flex items-center justify-between rounded-xl px-4 py-3.5 text-[1.05rem] font-semibold tracking-tight transition-colors",
                            isActive
                              ? "text-white"
                              : "text-white/55 hover:bg-white/8 hover:text-white/90",
                          )}
                        >
                          {link.label}
                          {isActive && (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" aria-hidden />
                          )}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="relative flex flex-col gap-3 border-t border-white/12 px-6 py-6">
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white text-sm font-bold text-[var(--brand-red-dark)] shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Coming Soon
                </a>
                <a
                  href="#screenshots"
                  onClick={closeMenu}
                  className="inline-flex h-12 items-center justify-center rounded-full border-2 border-white/30 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  View Demo
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
