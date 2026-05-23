export const CONTACT_EMAIL = "info@siyahabh.com";

export type ContactFormPayload = {
  name: string;
  email: string;
  message: string;
};

export type SendContactResult =
  | { ok: true; method: "mailto" }
  | { ok: false; error: string };

/**
 * Opens the visitor's email client with a pre-filled message to the SiyahaBH inbox.
 * For server-side delivery without a mail client, wire an API (e.g. Formspree) here later.
 */
export async function sendContactEmail(payload: ContactFormPayload): Promise<SendContactResult> {
  const { name, email, message } = payload;

  if (!message.trim()) {
    return { ok: false, error: "Message is required." };
  }

  const subject = encodeURIComponent(`SiyahaBH website — message from ${name}`);
  const body = encodeURIComponent(
    `You received a message via the SiyahaBH contact form.\n\n` +
      `Name: ${name}\n` +
      `Reply-to: ${email}\n\n` +
      `Message:\n${message}\n`,
  );

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  const opened = window.open(mailto, "_self");
  if (opened === null) {
    window.location.href = mailto;
  }

  return { ok: true, method: "mailto" };
}
