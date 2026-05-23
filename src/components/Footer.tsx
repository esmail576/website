import type { ComponentType, SVGProps } from "react";
import { Linkedin, Mail } from "lucide-react";
import { SiyahaLogo } from "@/components/SiyahaLogo";

type SocialIcon = ComponentType<{ className?: string; size?: number }>;

const EMAIL = "info@siyahabh.com";

const legalLinks = [
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Cookies", href: "#" },
] as const;

const navLinks = [
  { label: "Explore", href: "#screens" },
  { label: "AI Planner", href: "#ai-architecture" },
  { label: "Events", href: "#problem" },
  { label: "Restaurants", href: "#problem" },
  { label: "Places", href: "#overview" },
  { label: "About", href: "#overview" },
  { label: "Contact", href: "#contact" },
  { label: "Support", href: "#contact" },
] as const;

function IconWhatsApp({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "WhatsApp", href: "https://wa.me/97334543703", icon: IconWhatsApp },
] as const;

const linkBase =
  "text-[13px] font-medium text-slate-600 transition-colors duration-200 hover:text-[#C8102E]";
const legalLinkBase =
  "text-[12px] text-slate-500 transition-colors duration-200 hover:text-[#C8102E]";

function SocialButton({
  label,
  href,
  icon: Icon,
}: {
  label: string;
  href: string;
  icon: SocialIcon;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-500 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C8102E]/25 hover:bg-[#C8102E] hover:text-white hover:shadow-[0_8px_20px_-8px_rgba(200,16,46,0.45)]"
    >
      <Icon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
    </a>
  );
}

export function Footer() {
  return (
    <footer
      className="relative border-t border-slate-200/80 bg-white shadow-[0_-1px_0_rgba(15,23,42,0.03),0_-12px_40px_-24px_rgba(15,23,42,0.08)]"
      aria-label="Site footer"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8102E]/35 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Brand & legal */}
          <div className="flex flex-col items-center text-center lg:col-span-3 lg:items-start lg:text-left">
            <a
              href="#top"
              className="inline-block transition-opacity duration-200 hover:opacity-90"
            >
              <SiyahaLogo size="compact" showTagline={false} className="items-start" />
            </a>
            <p className="mt-3 text-[13px] font-medium text-slate-500">
              © {new Date().getFullYear()} SiyahaBH
            </p>
            <nav
              className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 lg:justify-start"
              aria-label="Legal"
            >
              {legalLinks.map((link) => (
                <a key={link.label} href={link.href} className={legalLinkBase}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Center navigation */}
          <nav
            className="lg:col-span-6 lg:px-4"
            aria-label="Footer navigation"
          >
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 lg:text-left">
              Discover Bahrain
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-4 lg:gap-x-8">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={`${linkBase} block py-0.5`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social & email */}
          <div className="flex flex-col items-center lg:col-span-3 lg:items-end">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Connect
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <SocialButton
                  key={social.label}
                  label={social.label}
                  href={social.href}
                  icon={social.icon}
                />
              ))}
            </div>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-slate-50/80 px-4 py-2.5 text-[13px] font-medium text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-[#C8102E]/20 hover:bg-white hover:text-[#C8102E] hover:shadow-[0_8px_24px_-12px_rgba(200,16,46,0.2)]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C8102E]/10 text-[#C8102E] transition-colors duration-300 group-hover:bg-[#C8102E] group-hover:text-white">
                <Mail size={15} strokeWidth={2} />
              </span>
              {EMAIL}
            </a>
          </div>
        </div>

        <p className="mt-12 border-t border-slate-100 pt-6 text-center text-[12px] leading-relaxed text-slate-400 lg:text-left">
          AI-powered tourism for the Kingdom of Bahrain — discover places, plan journeys, and
          explore with confidence.
        </p>
      </div>
    </footer>
  );
}
