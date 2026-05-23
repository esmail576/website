import type { SVGProps } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { BahrainMapGraphic } from "@/components/BahrainMapGraphic";
import { SiyahaLogo } from "@/components/SiyahaLogo";
import { SocialProfilePicker } from "@/components/SocialProfilePicker";
import { CONTACT_EMAIL } from "@/lib/sendContactEmail";
import { teamSocialProfiles } from "@/lib/teamSocialProfiles";
const TAGLINE = "AI & AR Powered Tourism Platform for Bahrain";

const PHONE_NUMBERS = [
  { label: "+973 34543703", href: "tel:+97334543703" },
  { label: "+973 37121297", href: "tel:+97337121297" },
] as const;

const quickLinksCol1 = [
  { label: "Home", href: "#top" },
  { label: "The problem", href: "#problem" },
  { label: "Screenshots", href: "#screenshots" },
  { label: "AI & AR", href: "#ai-architecture" },
  { label: "Architecture", href: "#tech" },
] as const;

const quickLinksCol2 = [
  { label: "Team", href: "#made-by" },
  { label: "Download", href: "#contact" },
  { label: "Overview", href: "#overview" },
  { label: "Contact", href: "#contact" },
] as const;

const quickLinksAll = [...quickLinksCol1, ...quickLinksCol2] as const;

const footerLinkClass =
  "text-sm text-white/75 transition-colors duration-200 hover:text-white";

const footerQuickLinkPill =
  "inline-flex min-h-[40px] max-w-full items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-white/[0.07] px-3.5 py-2 text-center text-xs font-medium leading-tight text-white/90 shadow-sm transition-colors duration-200 hover:border-white/35 hover:bg-white/12 hover:text-white";

function IconWhatsApp({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const socialPickers = [
  { platform: "linkedin" as const, label: "LinkedIn", icon: Linkedin },
  { platform: "whatsapp" as const, label: "WhatsApp", icon: IconWhatsApp },
];

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section className="relative bg-[var(--brand-red)]" aria-label="Site footer">
      <motion.footer className="bg-[var(--brand-red)] text-white">
        <motion.div
          ref={ref}
          className="mx-auto max-w-7xl px-6 pb-6 pt-2 sm:px-8 sm:pb-8 md:pt-4 lg:px-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Site map & footer info */}
            <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-12 lg:gap-6 xl:gap-8">
              {/* Brand */}
              <motion.div className="flex w-full max-w-full flex-col items-center text-center sm:w-fit sm:items-start sm:text-left lg:col-span-3">
                <a href="#top" className="inline-block transition-opacity hover:opacity-90">
                  <SiyahaLogo size="compact" showTagline={false} crop variant="default" />
                </a>
                <p className="mt-2.5 max-w-[220px] text-sm leading-snug text-white/80">{TAGLINE}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {socialPickers.map(({ platform, label, icon }) => (
                    <SocialProfilePicker
                      key={platform}
                      label={label}
                      icon={icon}
                      profiles={teamSocialProfiles[platform]}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Quick links */}
              <nav
                className="min-w-0 sm:col-span-1 lg:col-span-3"
                aria-label="Quick links"
              >
                <h3 className="mb-3 text-center text-sm font-bold uppercase tracking-wide text-white sm:mb-4 sm:text-left">
                  Quick Links
                </h3>
                {/* Mobile: one flowing row (wraps) — no two-column stack */}
                <ul className="flex max-w-full flex-wrap justify-center gap-2 sm:hidden">
                  {quickLinksAll.map((link) => (
                    <li key={link.label} className="min-w-0">
                      <a href={link.href} className={footerQuickLinkPill}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="hidden sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-2">
                  <ul className="space-y-2">
                    {quickLinksCol1.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className={footerLinkClass}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2">
                    {quickLinksCol2.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className={footerLinkClass}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              {/* Contact details */}
              <div className="min-w-0 sm:col-span-1 lg:col-span-3">
                <h3 className="mb-3 text-center text-sm font-bold uppercase tracking-wide text-white sm:mb-4 sm:text-left">
                  Contact Us
                </h3>
                <ul className="flex flex-col items-center gap-2.5 text-center sm:block sm:space-y-3 sm:text-left">
                  <li className="w-full min-w-0 max-w-full">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="inline-flex max-w-full items-center justify-center gap-2 break-all text-sm text-white/85 transition-colors hover:text-white sm:justify-start sm:break-normal"
                    >
                      <Mail size={16} className="shrink-0 text-white/70" aria-hidden />
                      {CONTACT_EMAIL}
                    </a>
                  </li>
                  {PHONE_NUMBERS.map((phone) => (
                    <li key={phone.href}>
                      <a
                        href={phone.href}
                        className="inline-flex w-full items-center justify-center gap-2 text-sm text-white/85 transition-colors hover:text-white sm:justify-start"
                      >
                        <Phone size={16} className="shrink-0 text-white/70" aria-hidden />
                        {phone.label}
                      </a>
                    </li>
                  ))}
                  <li className="inline-flex w-full items-center justify-center gap-2 text-sm text-white/85 sm:justify-start">
                    <MapPin size={16} className="shrink-0 text-white/70" aria-hidden />
                    Bahrain
                  </li>
                </ul>
              </div>

              {/* Map accent */}
              <div className="hidden items-center justify-center lg:col-span-3 lg:flex">
                <BahrainMapGraphic className="h-40 w-auto opacity-90" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copyright bar */}
        <div className="border-t border-white/10 bg-[var(--brand-red-dark)]">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 py-3 text-center sm:flex-row sm:justify-between sm:px-8 sm:py-3.5 sm:text-left lg:px-10">
            <p className="text-xs text-white/75 sm:text-[13px]">
              © {new Date().getFullYear()} SiyahaBH. All rights reserved.
            </p>
            <p className="text-xs text-white/65 sm:text-[13px]">
              Made by{" "}
              <a
                href="#made-by"
                className="font-medium text-white/85 transition-colors hover:text-white"
              >
                Esmail Shabbir
              </a>{" "}
              and{" "}
              <a
                href="#made-by"
                className="font-medium text-white/85 transition-colors hover:text-white"
              >
                Fazil Hakim
              </a>
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hidden break-all text-xs font-medium text-white/90 transition-colors hover:text-white sm:inline sm:text-[13px]"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </motion.footer>
    </section>
  );
}
