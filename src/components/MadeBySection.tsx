import { motion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { Globe, Linkedin, Mail } from "lucide-react";
import esmailImage from "@/assets/esmail.jpg";
import fazilImage from "@/assets/fazil.jpeg";
import { SectionFadeBottom, SectionFadeTop } from "@/components/SectionFade";

type Maker = {
  name: string;
  role: string;
  image: string;
  imagePosition?: string;
  links: {
    linkedin: string;
    portfolio: string;
    contact: string;
  };
};

const makers: Maker[] = [
  {
    name: "Esmail Shabbir",
    role: "Co-Founder",
    image: esmailImage,
    links: {
      linkedin: "https://www.linkedin.com/in/esmail-shabbir-319b25402/",
      portfolio: "https://esmaildev.netlify.app/",
      contact: "mailto:esmalishabbir576@gmail.com",
    },
  },
  {
    name: "Fazil Shahbaz",
    role: "Co-Founder",
    image: fazilImage,
    imagePosition: "object-[center_12%]",
    links: {
      linkedin: "https://www.linkedin.com/in/fazil-shahbaz-5278a1325/",
      portfolio: "https://fazil-portfolio-kappa.vercel.app/",
      contact: "mailto:fazilmohdshahbaz@gmail.com",
    },
  },
];

function TiltCard({ maker }: { maker: Maker }) {
  const tiltFactor = 15;
  const perspective = 1000;
  const borderRadius = 24;
  const shadowColor = "rgba(0, 0, 0, 0.2)";
  const shadowIntensity = 0.5;
  const transitionDuration = 0.2;
  const hoverScale = 1.05;
  const glareIntensity = 0.5;
  const glarePosition = 50;
  const glareSize = 80;

  const [isHovered, setIsHovered] = useState(false);
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !isHovered) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 100;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 100;
      setMousePosition({ x, y });
      const tiltX = -(y / 50) * tiltFactor;
      const tiltY = (x / 50) * tiltFactor;
      setTiltValues({ x: tiltX, y: tiltY });
    },
    [isHovered, tiltFactor],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTiltValues({ x: 0, y: 0 });
  }, []);

  const glareX = useMemo(
    () => (isHovered ? 50 + mousePosition.x / 2 : glarePosition),
    [glarePosition, isHovered, mousePosition.x],
  );
  const glareY = useMemo(
    () => (isHovered ? 50 + mousePosition.y / 2 : glarePosition),
    [glarePosition, isHovered, mousePosition.y],
  );

  const logButtonClick = useCallback(
    (button: "linkedin" | "portfolio" | "contact", url: string) => {
      console.log(`[MadeBySection] ${maker.name} ${button} clicked`, { name: maker.name, button, url });
    },
    [maker.name],
  );

  return (
    <motion.article
      ref={cardRef}
      className="relative aspect-[4/5] max-h-[460px] w-full overflow-hidden sm:aspect-auto sm:h-[420px]"
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        borderRadius: `${borderRadius}px`,
        willChange: "transform",
      }}
      animate={{ scale: isHovered ? hoverScale : 1 }}
      transition={{ duration: transitionDuration, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius: `${borderRadius}px`,
          backgroundColor: "#FFFFFF",
          transformStyle: "preserve-3d",
          boxShadow: `0 10px 30px -10px ${shadowColor}`,
        }}
        animate={{
          rotateX: tiltValues.x,
          rotateY: tiltValues.y,
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0, 0, 0, ${shadowIntensity})`
            : `0 10px 30px -10px ${shadowColor}`,
        }}
        transition={{ duration: transitionDuration, ease: "easeOut" }}
      >
        <img
          src={maker.image}
          alt={maker.name}
          className={`h-full w-full object-cover ${maker.imagePosition ?? "object-[center_8%]"}`}
          loading="lazy"
          decoding="async"
        />
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            borderRadius: `${borderRadius}px`,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${
              isHovered ? glareIntensity : 0
            }) 0%, rgba(255, 255, 255, 0) ${glareSize}%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: transitionDuration }}
        />
        <div className="absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-black/92 via-black/55 to-transparent p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/85">Made by</p>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-white [text-shadow:0_3px_14px_rgba(0,0,0,0.65)] sm:text-3xl">
            {maker.name}
          </h3>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/90">{maker.role}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={maker.links.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => logButtonClick("linkedin", maker.links.linkedin)}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3.5 py-2 text-xs font-medium tracking-wide text-white transition hover:bg-white/25"
            >
              <Linkedin size={14} aria-hidden />
              LinkedIn
            </a>
            <a
              href={maker.links.portfolio}
              target="_blank"
              rel="noreferrer"
              onClick={() => logButtonClick("portfolio", maker.links.portfolio)}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3.5 py-2 text-xs font-medium tracking-wide text-white transition hover:bg-white/25"
            >
              <Globe size={14} aria-hidden />
              Portfolio
            </a>
            <a
              href={maker.links.contact}
              onClick={() => logButtonClick("contact", maker.links.contact)}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3.5 py-2 text-xs font-medium tracking-wide text-white transition hover:bg-white/25"
            >
              <Mail size={14} aria-hidden />
              Contact
            </a>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function MadeBySection() {
  return (
    <section
      id="made-by"
      className="section-seam section-padding section-surface-sand relative overflow-hidden"
      aria-label="Made by"
    >
      <SectionFadeTop from="sand" />
      <SectionFadeBottom to="sandStrong" />
      <motion.div className="section-container relative z-10">
        <motion.div className="section-header">
          <span className="section-eyebrow">Creators</span>
          <h2 className="section-title">Made by passionate builders</h2>
        </motion.div>

        <motion.div className="mx-auto grid max-w-md gap-6 md:max-w-none md:grid-cols-2">
          {makers.map((maker) => (
            <TiltCard key={maker.name} maker={maker} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
