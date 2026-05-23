export type SocialProfile = {
  name: string;
  href: string;
  detail?: string;
};

export type SocialPlatform = "linkedin" | "WhatsApp";

/** Per-founder links — replace `#` placeholders when URLs are ready. */
export const teamSocialProfiles: Record<SocialPlatform, SocialProfile[]> = {
  linkedin: [
    {
      name: "Esmail Shabbir",
      href: "https://www.linkedin.com/in/esmail-shabbir-319b25402/",
      detail: "LinkedIn",
    },
    {
      name: "Fazil Shahbaz",
      href: "https://www.linkedin.com/in/fazil-shahbaz-5278a1325/",
      detail: "LinkedIn",
    },
  ],
  WhatsApp: [
    { name: "Esmail Shabbir",href: "https://wa.me/97337121297", detail: "+973 37121297"},
    { name: "Fazil Shahbaz", href: "https://wa.me/97334543703", detail: "+973 34543703" },
  ],
};
