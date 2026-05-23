import siyahaLogo from "@/assets/siyahalogo nobg.png";

export const siyahaLogoSrc = siyahaLogo;

type SiyahaLogoProps = {
  className?: string;
  showTagline?: boolean;
  size?: "default" | "compact" | "icon";
  imgClassName?: string;
  /** Tight crop for assets with baked-in whitespace (e.g. footer on red) */
  crop?: boolean;
  /** Glass frame for dark / gradient footers instead of solid white */
  variant?: "default" | "glass";
};

const sizeClasses: Record<NonNullable<SiyahaLogoProps["size"]>, string> = {
  icon: "h-11 w-auto sm:h-12",
  compact: "h-12 w-auto sm:h-14",
  default: "h-16 w-auto sm:h-[4.25rem] md:h-[4.75rem]",
};

export function SiyahaLogo({
  className = "",
  showTagline = false,
  size = "default",
  imgClassName = "",
  crop = false,
  variant = "default",
}: SiyahaLogoProps) {
  const logoImage = (
    <img
      src={siyahaLogo}
      alt="SiyahaBH"
      width={480}
      height={120}
      className={`object-contain object-left ${sizeClasses[size]} ${imgClassName}`}
      decoding="async"
    />
  );

  return (
    <div
      className={`flex flex-col ${size === "compact" ? "items-start" : "items-center"} ${className}`}
      aria-label="SiyahaBH"
    >
      {crop ? (
        <div
          className={`inline-flex shrink-0 items-center rounded-xl ${
            variant === "glass"
              ? "border border-white/25 bg-white/10 px-2 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.15)] backdrop-blur-sm"
              : "border border-slate-200/80 bg-white px-2.5 py-2 shadow-[0_4px_14px_rgba(15,23,42,0.12)]"
          }`}
        >
          {logoImage}
        </div>
      ) : (
        logoImage
      )}
      {showTagline && (
        <p
          className={`mt-2 text-sm leading-relaxed text-muted-foreground ${
            size === "compact" ? "text-left" : "text-center"
          }`}
        >
          Bahrain tourism, powered by AI
        </p>
      )}
    </div>
  );
}
