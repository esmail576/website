import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { CONTACT_EMAIL, sendContactEmail } from "@/lib/sendContactEmail";
import { SectionFadeBottom, SectionFadeTop } from "@/components/SectionFade";

const inputClass =
  "w-full min-h-[44px] rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-foreground shadow-sm outline-none transition-all duration-200 placeholder:text-muted-foreground hover:border-slate-300 focus:border-[#C8102E]/50 focus:ring-2 focus:ring-[#C8102E]/15 sm:text-sm";

const messageClass =
  "w-full min-h-[140px] resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-foreground shadow-sm outline-none transition-all duration-200 placeholder:text-muted-foreground hover:border-slate-300 focus:border-[#C8102E]/50 focus:ring-2 focus:ring-[#C8102E]/15 sm:text-sm";

const inputErrorClass =
  "border-red-400 focus:border-red-400 focus:ring-red-200/40";

export function ContactFormSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [messageError, setMessageError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!message) {
      setMessageError("Message cannot be empty. Please type your message before sending.");
      return;
    }

    setMessageError(null);

    if (!name || !email) {
      setFormError("Please fill in your name and email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendContactEmail({ name, email, message });

      if (!result.ok) {
        setFormError(result.error);
        return;
      }

      e.currentTarget.reset();
      setFormSuccess(
        `Your message is ready to send to ${CONTACT_EMAIL}. Complete sending in your email app.`,
      );
    } catch {
      setFormError(
        `Something went wrong. Please try again or email us directly at ${CONTACT_EMAIL}.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-seam section-padding section-surface-contact relative overflow-hidden"
      aria-label="Contact form"
    >
      <SectionFadeTop from="warm" />
      <SectionFadeBottom to="elevated" />
      <div className="section-container section-container-wide relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="section-container section-container-narrow !max-w-3xl"
        >
          <motion.div className="text-center sm:text-left">
            <p className="section-eyebrow">Get in touch</p>
            <h2 className="section-title !text-2xl sm:!text-3xl md:!text-4xl">
              Send us a message
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Questions about SiyahaBH, partnerships, or the app? We read every note.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-flex max-w-full items-center gap-2 break-all text-sm font-medium text-[#C8102E] transition-colors hover:text-[#9B0C23] sm:break-normal"
            >
              <Mail size={16} className="shrink-0" aria-hidden />
              {CONTACT_EMAIL}
            </a>
          </motion.div>

          <form
            onSubmit={handleSubmit}
            className="luxury-card mt-8 p-6 sm:p-8"
            noValidate
          >
            {formError && (
              <p
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-800"
              >
                {formError}
              </p>
            )}
            {formSuccess && (
              <p
                role="status"
                className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800"
              >
                {formSuccess}
              </p>
            )}

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="sr-only" htmlFor="contact-name">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your Name *"
                  className={inputClass}
                  disabled={isSubmitting}
                />
                <label className="sr-only" htmlFor="contact-email">
                  Your Mail
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your Mail *"
                  className={inputClass}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="contact-message">
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Your Message *"
                  rows={4}
                  aria-invalid={messageError ? true : undefined}
                  aria-describedby={messageError ? "contact-message-error" : undefined}
                  className={`${messageClass} ${messageError ? inputErrorClass : ""}`}
                  disabled={isSubmitting}
                  onChange={() => {
                    if (messageError) setMessageError(null);
                  }}
                />
                {messageError && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="mt-2 text-sm font-medium text-red-600"
                  >
                    {messageError}
                  </p>
                )}
              </div>

              <div className="flex justify-center sm:justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-8 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#A50D24] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {isSubmitting ? "Sending…" : "Send"}
                  {!isSubmitting && <Send size={16} strokeWidth={2.5} aria-hidden />}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
