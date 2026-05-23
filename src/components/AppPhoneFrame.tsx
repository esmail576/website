import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AppPhoneFrameProps = {
  src?: string;
  video?: string;
  poster?: string;
  alt?: string;
  className?: string;
  /** Controls bezel width and corner radius */
  size?: "compact" | "card";
};

const sizeClasses = {
  compact: {
    root: "w-[min(100%,9.75rem)] sm:w-[10.5rem]",
    shell:
      "rounded-[1.65rem] border-[7px] p-[2px] shadow-[0_14px_36px_-16px_rgba(15,23,42,0.32)]",
    notch: "top-[8px] h-[16px] w-[52px]",
    screen: "rounded-[1.25rem]",
  },
  card: {
    root: "w-[min(100%,10.5rem)] sm:w-[11.25rem]",
    shell:
      "rounded-[1.85rem] border-[8px] p-[2px] shadow-[0_18px_44px_-18px_rgba(15,23,42,0.34)]",
    notch: "top-[9px] h-[18px] w-[60px]",
    screen: "rounded-[1.45rem]",
  },
} as const;

export function AppPhoneFrame({
  src,
  video,
  poster,
  alt = "",
  className,
  size = "card",
}: AppPhoneFrameProps) {
  const s = sizeClasses[size];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!video) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    void el.play().catch(() => {});
  }, [video]);

  return (
    <div className={cn("app-phone-frame relative mx-auto", s.root, className)} aria-hidden={!alt}>
      <div
        className={cn(
          "relative border-slate-900 bg-slate-900 ring-1 ring-black/[0.08]",
          s.shell,
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-slate-900",
            s.notch,
          )}
          aria-hidden
        />
        <div className={cn("overflow-hidden bg-white", s.screen)}>
          {video ? (
            <video
              ref={videoRef}
              src={video}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={alt}
              className="aspect-[9/19.5] w-full object-cover object-top"
            />
          ) : (
            <img
              src={src}
              alt={alt}
              className="aspect-[9/19.5] w-full object-cover object-top"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
