import { AnimatePresence, motion, useInView } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import openaiSymbol from "@/assets/openai-symbol.svg";
import pineconeSymbol from "@/assets/pinecone-symbol.svg";

type TechItem = {
  name: string;
  logo: string;
  wide?: boolean;
  description?: string;
};

export type TechLayer = {
  id: string;
  label: string;
  /** Shorter tab label on small screens when the full label would clip */
  mobileLabel?: string;
  subtitle: string;
  description: string;
  items: TechItem[];
};

export const techLayers: TechLayer[] = [
  {
    id: "frontend",
    label: "Frontend",
    subtitle: "Mobile app",
    description:
      "The traveler-facing experience — built with React Native and Expo for iOS and Android, with a fast, native-feel UI across Bahrain.",
    items: [
      {
        name: "React Native",
        logo: "https://reactnative.dev/img/header_logo.svg",
        description: "Cross-platform mobile framework",
      },
      {
        name: "Expo",
        logo: "https://cdn.simpleicons.org/expo/000020",
        description: "Build, ship, and iterate faster",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    subtitle: "API layer",
    description:
      "RESTful APIs that power feeds, profiles, itineraries, and business tools — Node.js on the server with Express for routing and middleware.",
    items: [
      {
        name: "Node.js",
        logo: "https://cdn.simpleicons.org/nodedotjs/339933",
        description: "JavaScript runtime",
      },
      {
        name: "Express.js",
        logo: "https://cdn.simpleicons.org/express/000000",
        description: "Web framework for APIs",
      },
    ],
  },
  {
    id: "database",
    label: "Database",
    subtitle: "Storage",
    description:
      "Structured data for users, businesses, posts, and events — PostgreSQL for relational storage with Supabase for auth, realtime, and storage.",
    items: [
      {
        name: "PostgreSQL",
        logo: "https://cdn.simpleicons.org/postgresql/4169E1",
        description: "Relational database",
      },
      {
        name: "Supabase",
        logo: "https://cdn.simpleicons.org/supabase/3ECF8E",
        description: "Backend-as-a-service",
      },
    ],
  },
  {
    id: "ai",
    label: "AI",
    subtitle: "Intelligence",
    description:
      "Large language models drive Khalid, itinerary generation, and smart recommendations — tuned for Bahraini context and travel planning.",
    items: [
      {
        name: "OpenAI",
        logo: openaiSymbol,
        wide: true,
        description: "GPT models for chat & planning",
      },
    ],
  },
  {
    id: "vector",
    label: "Vector DB",
    mobileLabel: "Vector",
    subtitle: "RAG",
    description:
      "Embeddings and semantic search power retrieval-augmented generation — matching user intent to the right places, events, and local knowledge.",
    items: [
      {
        name: "Pinecone",
        logo: pineconeSymbol,
        wide: true,
        description: "Vector search for RAG",
      },
    ],
  },
];

function LayerDetailCard({ layer }: { layer: TechLayer }) {
  return (
    <article
      className="flex min-h-0 w-full min-w-0 max-w-full flex-col overflow-x-clip rounded-2xl border border-black/6 bg-white p-4 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.15)] max-lg:rounded-2xl sm:p-10 lg:min-h-[520px] lg:rounded-3xl lg:p-12 lg:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.18)]"
      aria-live="polite"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm sm:tracking-[0.24em]">
        {layer.subtitle}
      </p>
      <h3 className="mt-1 text-balance text-xl font-semibold tracking-tight text-foreground sm:mt-2 sm:text-4xl lg:text-5xl">
        {layer.label}
      </h3>
      <p className="mt-2 max-w-2xl text-pretty text-sm leading-snug text-muted-foreground sm:mt-4 sm:text-base sm:leading-relaxed lg:text-lg">
        {layer.description}
      </p>

      <motion.div
        layout
        className="mt-4 grid min-w-0 gap-2.5 sm:mt-auto sm:grid-cols-2 sm:gap-5 sm:pt-10"
      >
        {layer.items.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.06, duration: 0.35 }}
            className="flex min-w-0 items-center gap-2.5 rounded-xl border border-black/6 bg-[#F8FAFC] p-3 sm:gap-4 sm:rounded-2xl sm:p-6"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white p-2 shadow-sm ring-1 ring-black/5 sm:size-16 sm:rounded-xl sm:p-2.5">
              <img
                src={item.logo}
                alt={`${item.name} logo`}
                className={
                  item.wide
                    ? "h-6 w-auto max-w-[3.25rem] object-contain sm:h-8 sm:max-w-[4.5rem]"
                    : "h-7 w-7 object-contain sm:h-9 sm:w-9"
                }
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground sm:text-lg">{item.name}</span>
              {item.description ? (
                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground sm:text-sm">
                  {item.description}
                </span>
              ) : null}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </article>
  );
}

function LayerSelector({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ul
      className="flex w-full min-w-0 flex-nowrap justify-center gap-1 max-lg:overflow-visible max-lg:pb-0 sm:gap-1.5 lg:flex-col lg:justify-center lg:gap-3"
      role="list"
    >
      {techLayers.map((layer) => {
        const isActive = activeId === layer.id;
        const tabLabel = layer.mobileLabel ?? layer.label;

        return (
          <li
            key={layer.id}
            className="min-w-0 flex-1 basis-0 lg:w-full lg:flex-none"
          >
            <button
              type="button"
              onClick={() => onSelect(layer.id)}
              className={`flex h-full min-h-[2.65rem] w-full min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg border px-1 py-1.5 text-center transition-all duration-300 sm:min-h-[3.75rem] sm:gap-1 sm:rounded-xl sm:px-1.5 sm:py-2.5 lg:min-h-0 lg:flex-row lg:items-center lg:justify-start lg:gap-4 lg:rounded-3xl lg:px-6 lg:py-5 lg:text-left ${
                isActive
                  ? "border-primary/20 bg-primary text-primary-foreground shadow-[0_12px_32px_-14px_rgba(200,16,46,0.45)]"
                  : "border-black/6 bg-white hover:border-black/10 hover:shadow-sm"
              }`}
              aria-current={isActive ? "true" : undefined}
              aria-label={layer.label}
            >
              <span
                className={`size-2.5 shrink-0 rounded-full border-2 sm:size-3 lg:size-5 ${
                  isActive ? "border-white bg-white" : "border-primary/30 bg-white"
                }`}
                aria-hidden
              />
              <span className="min-w-0 px-0.5 lg:flex-1 lg:px-0">
                <span className="block max-w-full truncate text-center text-[0.625rem] font-semibold leading-tight sm:text-[clamp(0.6875rem,2.2vw,0.8125rem)] lg:hidden">
                  {tabLabel}
                </span>
                <span className="hidden max-w-full break-words text-center text-[0.6875rem] font-semibold leading-tight sm:text-[clamp(0.75rem,2.4vw,0.875rem)] lg:block lg:text-left lg:text-base xl:text-lg">
                  {layer.label}
                </span>
                <span
                  className={`mt-0.5 hidden text-sm lg:mt-0 lg:block ${
                    isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {layer.subtitle}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function TechStackLayers() {
  const containerRef = useRef<HTMLDivElement>(null);
  useInView(containerRef, { once: true, amount: 0.2 });
  const [activeId, setActiveId] = useState("frontend");

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="grid w-full min-w-0 max-w-full items-stretch gap-3 max-lg:gap-3 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:gap-14 xl:gap-16"
    >
      <div className="order-2 min-w-0 max-w-full lg:order-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-w-0 max-w-full"
          >
            <LayerDetailCard layer={techLayers.find((l) => l.id === activeId) ?? techLayers[0]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="order-1 min-w-0 w-full max-w-full lg:order-2">
        <div className="max-lg:sticky max-lg:top-[calc(4rem+0.125rem)] max-lg:z-30 max-lg:overflow-visible max-lg:rounded-xl max-lg:border max-lg:border-black/10 max-lg:bg-[color-mix(in_oklch,var(--surface-base)_88%,transparent)] max-lg:p-1.5 max-lg:shadow-[0_8px_28px_-18px_rgba(0,0,0,0.15)] max-lg:backdrop-blur-md sm:max-lg:top-[calc(4.5rem+0.25rem)] sm:max-lg:p-2 lg:static lg:z-auto lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none">
          <LayerSelector activeId={activeId} onSelect={handleSelect} />
        </div>
      </div>
    </motion.div>
  );
}
