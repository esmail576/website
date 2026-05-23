import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Hand, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type AppScreenMotionCardProps = {
  label: string;
  video: string;
  poster: string;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showLabel?: boolean;
  completeTitle?: string;
  completeSubtitle?: string;
  gestureHint?: string;
};

export function AppScreenMotionCard({
  label,
  video,
  poster,
  className,
  open: controlledOpen,
  onOpenChange,
  showLabel = true,
  completeTitle = "Demo complete",
  completeSubtitle,
  gestureHint = "Swipe up to explore",
}: AppScreenMotionCardProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [finished, setFinished] = useState(false);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const subtitle =
    completeSubtitle ?? `You've seen the ${label.toLowerCase()} experience`;

  const handleOpen = useCallback(() => {
    setFinished(false);
    setOpen(true);
  }, [setOpen]);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    el.muted = true;
    void el.play().catch(() => {});
  }, [video]);

  useEffect(() => {
    if (!open) return;

    const el = modalVideoRef.current;
    if (!el) return;

    setFinished(false);

    const startPlayback = () => {
      el.currentTime = 0;
      void el.play().catch(() => {});
    };

    if (el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      startPlayback();
      return;
    }

    el.addEventListener("canplay", startPlayback, { once: true });
    el.load();

    return () => {
      el.removeEventListener("canplay", startPlayback);
    };
  }, [open, video]);

  const handleEnded = useCallback(() => {
    setFinished(true);
  }, []);

  const handleReplay = useCallback(() => {
    const el = modalVideoRef.current;
    if (!el) return;
    setFinished(false);
    el.currentTime = 0;
    void el.play().catch(() => {});
  }, []);

  const handleDialogChange = useCallback(
    (next: boolean) => {
      if (!next) {
        modalVideoRef.current?.pause();
        setFinished(false);
      }
      setOpen(next);
    },
    [setOpen],
  );

  return (
    <>
      <motion.div className={cn("group w-full", className)}>
        <button
          type="button"
          onClick={handleOpen}
          className="relative w-full cursor-pointer overflow-hidden rounded-[1.75rem] border-2 border-[var(--brand-red)]/30 bg-white p-2 text-left shadow-[0_8px_32px_-12px_oklch(0.55_0.14_25/0.25)] transition-shadow duration-300 group-hover:border-[var(--brand-red)]/50 group-hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-red)] focus-visible:ring-offset-2 md:p-2.5"
          aria-label={`Play ${label} screen demo`}
        >
          <video
            ref={previewRef}
            src={video}
            poster={previewPlaying ? undefined : poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onPlaying={() => setPreviewPlaying(true)}
            className="aspect-[9/19.5] h-auto w-full rounded-[1.25rem] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-[var(--brand-red)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            Live
          </span>
        </button>
        {showLabel && (
          <p className="mt-3 text-center text-xs font-semibold tracking-tight text-foreground">
            {label}
          </p>
        )}
      </motion.div>

      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DialogContent
          className={cn(
            "left-1/2 top-[50%] z-50 w-[min(72vw,13rem)] max-w-none -translate-x-1/2 -translate-y-1/2 gap-0 overflow-hidden border-0 bg-black p-0",
            "max-h-[min(58dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-4.5rem))]",
            "sm:w-full sm:max-w-sm sm:rounded-[2rem]",
            "[&>button]:fixed [&>button]:right-3 [&>button]:top-[max(0.75rem,env(safe-area-inset-top))] [&>button]:z-[110]",
            "[&>button]:flex [&>button]:h-11 [&>button]:w-11 [&>button]:items-center [&>button]:justify-center",
            "[&>button]:rounded-full [&>button]:border [&>button]:border-white/35 [&>button]:bg-[var(--brand-red)] [&>button]:text-white [&>button]:shadow-lg",
            "[&>button]:opacity-100 [&>button]:hover:bg-[var(--brand-red-dark)]",
          )}
        >
          <DialogTitle className="sr-only">{label} screen demo</DialogTitle>
          <DialogDescription className="sr-only">
            Full-screen recording of the Siyaha BH {label.toLowerCase()} screen
          </DialogDescription>

          <motion.div
            className="relative mx-auto flex aspect-[9/19.5] h-auto w-full max-h-[min(54dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-5rem))] min-h-0 items-center justify-center bg-black sm:max-h-[min(75dvh,32rem)]"
            layout
          >
            {open && (
              <video
                key={video}
                ref={modalVideoRef}
                src={video}
                autoPlay
                playsInline
                muted
                preload="auto"
                className="h-full w-full object-contain object-center"
                onEnded={handleEnded}
              />
            )}

            <AnimatePresence>
              {finished && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/70 px-6 text-center backdrop-blur-[2px]"
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-red)] shadow-lg shadow-[var(--brand-red)]/40"
                  >
                    <Check className="h-7 w-7 text-white" strokeWidth={2.5} aria-hidden />
                  </motion.div>

                  <motion.div className="space-y-1">
                    <p className="text-base font-semibold text-white">{completeTitle}</p>
                    <p className="text-sm text-white/75">{subtitle}</p>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-1 text-white/85"
                    aria-hidden
                  >
                    <Hand className="h-6 w-6 rotate-[-24deg]" />
                    <span className="text-xs font-medium tracking-wide">{gestureHint}</span>
                  </motion.div>

                  <button
                    type="button"
                    onClick={handleReplay}
                    className="mt-1 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden />
                    Watch again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
