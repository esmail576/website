import type { CSSProperties } from "react";
import { ChevronRight } from "lucide-react";
import openaiSymbol from "@/assets/openai-symbol.svg";
import pineconeSymbol from "@/assets/pinecone-symbol.svg";
import { siyahaLogoSrc as siyahaLogo } from "@/components/SiyahaLogo";

const FLOW_STEPS = [
  { label: "You share preferences", color: "#3b82f6" },
  { label: "Businesses list places", color: "#10b981" },
  { label: "AI finds best matches", color: "#f59e0b" },
  { label: "You get your trip", color: "#C8102E" },
] as const;

const LOGOS = {
  openai: openaiSymbol,
  pinecone: pineconeSymbol,
  supabase: "https://cdn.simpleicons.org/supabase/3ECF8E",
  reactNative: "https://cdn.simpleicons.org/react/087EA4",
  web: "https://cdn.simpleicons.org/react/087EA4",
} as const;

const VB = { w: 800, h: 500 } as const;

/** Node centers on a symmetric grid (viewBox coordinates) */
const C = {
  mobile: { x: 148, y: 88 },
  openai: { x: 400, y: 88 },
  business: { x: 652, y: 88 },
  pinecone: { x: 400, y: 232 },
  supabase: { x: 148, y: 392 },
  gpt: { x: 652, y: 392 },
  itinerary: { x: 400, y: 392 },
} as const;

type Pt = { x: number; y: number };

type NodeDef = {
  id: string;
  label: string;
  sub: string;
  center: Pt;
  logo: string;
  accent: string;
  logoTone?: "dark" | "color" | "symbol";
  logoVariant?: "siyaha";
  hub?: boolean;
  delay: number;
};

const nodes: NodeDef[] = [
  {
    id: "user",
    label: "Mobile app",
    sub: "User preferences",
    center: C.mobile,
    logo: LOGOS.reactNative,
    accent: "#3b82f6",
    logoTone: "color",
    delay: 0,
  },
  {
    id: "openai",
    label: "OpenAI",
    sub: "Embedding model",
    center: C.openai,
    logo: LOGOS.openai,
    accent: "#8b5cf6",
    logoTone: "symbol",
    delay: 0.1,
  },
  {
    id: "business",
    label: "Business portal",
    sub: "Profiles & events",
    center: C.business,
    logo: LOGOS.web,
    accent: "#10b981",
    logoTone: "color",
    delay: 0.15,
  },
  {
    id: "pinecone",
    label: "Pinecone",
    sub: "Vector search",
    center: C.pinecone,
    logo: LOGOS.pinecone,
    accent: "#f59e0b",
    logoTone: "symbol",
    hub: true,
    delay: 0.25,
  },
  {
    id: "supabase",
    label: "Supabase",
    sub: "PostgreSQL data",
    center: C.supabase,
    logo: LOGOS.supabase,
    accent: "#14b8a6",
    logoTone: "color",
    delay: 0.35,
  },
  {
    id: "gpt",
    label: "GPT-4o mini",
    sub: "Itinerary AI",
    center: C.gpt,
    logo: LOGOS.openai,
    accent: "#C8102E",
    logoTone: "symbol",
    delay: 0.45,
  },
  {
    id: "plan",
    label: "Itinerary",
    sub: "Personalized trip",
    center: C.itinerary,
    logo: siyahaLogo,
    accent: "#C8102E",
    logoVariant: "siyaha",
    delay: 0.55,
  },
];

/** Straight line between two points */
function line(a: Pt, b: Pt): string {
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}

/** Single 90° bend: horizontal first, then vertical */
function elbowH(a: Pt, b: Pt): string {
  if (a.x === b.x || a.y === b.y) return line(a, b);
  return `M ${a.x} ${a.y} L ${b.x} ${a.y} L ${b.x} ${b.y}`;
}

/** Single 90° bend: vertical first, then horizontal */
function elbowV(a: Pt, b: Pt): string {
  if (a.x === b.x || a.y === b.y) return line(a, b);
  return `M ${a.x} ${a.y} L ${a.x} ${b.y} L ${b.x} ${b.y}`;
}

function mid(a: Pt, b: Pt): Pt {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function labelOnSegment(a: Pt, b: Pt, offset = 0): { lx: number; ly: number } {
  const m = mid(a, b);
  return { lx: m.x, ly: m.y + offset };
}

type EdgeDef = {
  id: string;
  d: string;
  label: string;
  lx: number;
  ly: number;
  color: string;
  delay: number;
};

const edges: EdgeDef[] = [
  {
    id: "e1",
    d: line(C.mobile, C.openai),
    label: "User preferences",
    ...labelOnSegment(C.mobile, C.openai, -10),
    color: "#3b82f6",
    delay: 0.6,
  },
  {
    id: "e2",
    d: line(C.business, C.openai),
    label: "Business profiles",
    ...labelOnSegment(C.business, C.openai, -10),
    color: "#10b981",
    delay: 0.75,
  },
  {
    id: "e3",
    d: line(C.openai, C.pinecone),
    label: "Create embeddings",
    lx: C.openai.x + 14,
    ly: (C.openai.y + C.pinecone.y) / 2,
    color: "#8b5cf6",
    delay: 0.9,
  },
  {
    id: "e4",
    d: elbowV(C.supabase, C.pinecone),
    label: "Fetch business data",
    lx: (C.supabase.x + C.pinecone.x) / 2 - 8,
    ly: C.pinecone.y + 18,
    color: "#14b8a6",
    delay: 1.05,
  },
  {
    id: "e5",
    d: elbowH(C.pinecone, C.gpt),
    label: "Top matched spots",
    lx: (C.pinecone.x + C.gpt.x) / 2,
    ly: C.pinecone.y - 12,
    color: "#f59e0b",
    delay: 1.2,
  },
  {
    id: "e6",
    d: line(C.supabase, C.itinerary),
    label: "Enrich context",
    ...labelOnSegment(C.supabase, C.itinerary, -12),
    color: "#06b6d4",
    delay: 1.35,
  },
  {
    id: "e7",
    d: line(C.gpt, C.itinerary),
    label: "Generate plan",
    ...labelOnSegment(C.gpt, C.itinerary, -12),
    color: "#C8102E",
    delay: 1.5,
  },
];

function ArchNodeCard({ node }: { node: NodeDef }) {
  const labelAside = node.id === "openai";

  return (
    <div
      className={`arch-node ${node.hub ? "arch-node--hub" : ""} ${labelAside ? "arch-node--label-side" : ""}`}
      style={
        {
          left: `${(node.center.x / VB.w) * 100}%`,
          top: `${(node.center.y / VB.h) * 100}%`,
          "--accent": node.accent,
          "--delay": `${node.delay}s`,
        } as CSSProperties
      }
    >
      <div className="arch-node__icon-col">
        <div className="arch-node__glow" aria-hidden />
        <div className="arch-node__card">
          <div
            className={`arch-node__logo-wrap arch-node__logo-wrap--${node.logoVariant ?? node.logoTone ?? "color"}`}
          >
            {node.logoVariant === "siyaha" ? (
              <div className="arch-node__brand-crop" aria-hidden>
                <img src={node.logo} alt="" className="arch-node__logo arch-node__logo--siyaha" />
              </div>
            ) : (
              <img
                src={node.logo}
                alt=""
                className="arch-node__logo"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>
      </div>
      <div className={labelAside ? "arch-node__copy arch-node__copy--side" : "arch-node__copy"}>
        <p className="arch-node__title">{node.label}</p>
        <p className="arch-node__sub">{node.sub}</p>
      </div>
    </div>
  );
}

function EdgeLabel({ edge }: { edge: EdgeDef }) {
  const padX = 7;
  const padY = 4;
  const w = edge.label.length * 6.4 + padX * 2;
  const h = 15 + padY * 2;
  return (
    <g>
      <rect
        x={edge.lx - w / 2}
        y={edge.ly - h / 2}
        width={w}
        height={h}
        rx={5}
        className="arch-edge-label__bg"
      />
      <text x={edge.lx} y={edge.ly} className="arch-edge-label" fill={edge.color}>
        {edge.label}
      </text>
    </g>
  );
}

export function AIArchitectureDiagram() {
  return (
    <div className="arch-canvas" role="img" aria-label="SiyahaBH AI architecture flow">
      <div className="arch-canvas__bg" aria-hidden />
      <div className="arch-canvas__grid" aria-hidden />

      <div className="arch-canvas__diagram">
        <svg
          className="arch-svg"
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="crispEdges"
          aria-hidden
        >
          {edges.map((e) => (
            <g
              key={e.id}
              className="arch-edge-group"
              style={{ "--edge-color": e.color, "--edelay": `${e.delay}s` } as CSSProperties}
            >
              <path d={e.d} className="arch-edge arch-edge--track" vectorEffect="non-scaling-stroke" />
              <path
                d={e.d}
                className="arch-edge arch-edge--flow"
                stroke={e.color}
                vectorEffect="non-scaling-stroke"
              />
              <EdgeLabel edge={e} />
            </g>
          ))}
        </svg>

        {nodes.map((node) => (
          <ArchNodeCard key={node.id} node={node} />
        ))}
      </div>

      <div className="arch-flow-bar" aria-label="How the AI flow works">
        {FLOW_STEPS.map((step, i) => (
          <span key={step.label} className="arch-flow-bar__item">
            <span className="arch-flow-bar__pill">
              <span className="arch-flow-bar__dot" style={{ backgroundColor: step.color }} aria-hidden />
              {step.label}
            </span>
            {i < FLOW_STEPS.length - 1 && (
              <ChevronRight className="arch-flow-bar__chev" aria-hidden />
            )}
          </span>
        ))}
      </div>

      <style>{`
        .arch-canvas {
          position: relative;
          width: 100%;
          min-height: clamp(28rem, 72vh, 42rem);
          aspect-ratio: ${VB.w} / ${VB.h};
          overflow: hidden;
          padding-bottom: 3.5rem;
          margin-top: -1px;
        }
        .arch-flow-bar {
          position: absolute;
          bottom: 0.85rem;
          left: 50%;
          z-index: 3;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0.35rem 0.5rem;
          width: min(96%, 44rem);
          transform: translateX(-50%);
          padding: 0.55rem 0.75rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid rgba(226, 232, 240, 0.95);
          box-shadow: 0 8px 28px -10px rgba(15, 23, 42, 0.18);
          backdrop-filter: blur(10px);
        }
        .arch-flow-bar__item {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .arch-flow-bar__pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.68rem;
          font-weight: 600;
          color: #1e293b;
          white-space: nowrap;
        }
        @media (min-width: 768px) {
          .arch-flow-bar__pill {
            font-size: 0.78rem;
          }
        }
        .arch-flow-bar__dot {
          width: 0.45rem;
          height: 0.45rem;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .arch-flow-bar__chev {
          width: 0.85rem;
          height: 0.85rem;
          color: #94a3b8;
          flex-shrink: 0;
        }
        .arch-canvas__bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% 42%, rgba(139, 92, 246, 0.06) 0%, transparent 65%),
            radial-gradient(ellipse 40% 35% at 18% 78%, rgba(20, 184, 166, 0.06) 0%, transparent 55%),
            radial-gradient(ellipse 40% 35% at 82% 78%, rgba(200, 16, 46, 0.05) 0%, transparent 55%),
            linear-gradient(180deg, var(--surface-base) 0%, var(--surface-muted) 100%);
        }
        .arch-canvas__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(148, 163, 184, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.045) 1px, transparent 1px);
          background-size: 50px 50px;
          background-position: center center;
        }

        .arch-canvas__diagram {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .arch-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .arch-edge-group {
          --dash-track: 6 10;
          --dash-flow: 7 11;
          --stroke-track: 2px;
          --stroke-flow: 2px;
        }
        .arch-edge {
          fill: none;
          stroke-linejoin: miter;
          stroke-linecap: butt;
        }
        .arch-edge--track {
          stroke: var(--edge-color);
          stroke-width: var(--stroke-track);
          stroke-dasharray: var(--dash-track);
          opacity: 0.22;
        }
        .arch-edge--flow {
          stroke-width: var(--stroke-flow);
          stroke-dasharray: var(--dash-flow);
          opacity: 0.92;
          animation: arch-flow 2s linear infinite;
          animation-delay: var(--edelay, 0s);
        }
        .arch-edge-label__bg {
          fill: rgba(255, 255, 255, 0.95);
          stroke: rgba(226, 232, 240, 0.85);
          stroke-width: 1;
          shape-rendering: geometricPrecision;
        }
        .arch-edge-label {
          font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          text-anchor: middle;
          dominant-baseline: middle;
          shape-rendering: geometricPrecision;
        }

        .arch-node {
          position: absolute;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 112px;
          transform: translate(-50%, -50%);
          text-align: center;
          animation: arch-node-in 0.6s ease-out backwards;
          animation-delay: var(--delay, 0s);
        }
        .arch-node__icon-col {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .arch-node__copy {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .arch-node--label-side {
          flex-direction: row;
          align-items: center;
          gap: 0.6rem;
          width: max-content;
          transform: translate(calc(-2rem - 12px), -50%);
          text-align: left;
        }
        .arch-node--label-side .arch-node__copy--side {
          align-items: flex-start;
          text-align: left;
          white-space: nowrap;
        }
        .arch-node--label-side .arch-node__title {
          margin-top: 0;
        }
        .arch-node--hub { width: 124px; }
        .arch-node--hub .arch-node__card {
          width: 4.75rem;
          height: 4.75rem;
        }
        .arch-node--hub .arch-node__logo-wrap {
          width: 3.35rem;
          height: 3.35rem;
        }
        .arch-node__glow {
          position: absolute;
          top: 8px;
          left: 50%;
          width: 62%;
          height: 44%;
          transform: translateX(-50%);
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.16;
          filter: blur(18px);
        }
        .arch-node__card {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 4rem;
          height: 4rem;
          border-radius: 16px;
          background: linear-gradient(165deg, #ffffff 0%, #f8fafc 100%);
          border: 1.5px solid color-mix(in srgb, var(--accent) 18%, #e2e8f0);
          box-shadow:
            0 2px 4px rgba(15, 23, 42, 0.06),
            0 10px 28px -8px color-mix(in srgb, var(--accent) 22%, transparent);
        }
        .arch-node__logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.85rem;
          height: 2.85rem;
          border-radius: 11px;
          background: color-mix(in srgb, var(--accent) 14%, #ffffff);
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }
        .arch-node__logo-wrap--dark {
          background: color-mix(in srgb, var(--accent) 10%, #f1f5f9);
        }
        .arch-node__logo-wrap--symbol {
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.1);
        }
        .arch-node__logo-wrap--symbol .arch-node__logo {
          width: 2.25rem;
          height: 2.25rem;
          filter: contrast(1.2) saturate(0);
        }
        .arch-node__logo-wrap--siyaha {
          padding: 0;
          overflow: hidden;
          background: linear-gradient(145deg, #ffffff 0%, #fff5f5 100%);
          border: 1.5px solid color-mix(in srgb, #c8102e 28%, #e2e8f0);
        }
        .arch-node__brand-crop {
          position: relative;
          width: 2.85rem;
          height: 2.85rem;
          overflow: hidden;
          border-radius: 9px;
        }
        .arch-node__logo {
          width: 2.15rem;
          height: 2.15rem;
          object-fit: contain;
          filter: contrast(1.2) saturate(1.25)
            drop-shadow(0 1px 2px rgba(15, 23, 42, 0.12));
        }
        .arch-node__logo--siyaha {
          position: absolute;
          left: 50%;
          top: 50%;
          width: auto;
          height: 175%;
          max-width: none;
          transform: translate(-50%, -50%);
          object-fit: contain;
          object-position: center;
          filter: contrast(1.1) saturate(1.15);
        }
        .arch-node__logo-wrap--dark .arch-node__logo {
          filter: contrast(1.35) saturate(0)
            drop-shadow(0 1.5px 3px rgba(15, 23, 42, 0.2));
        }
        .arch-node__logo-wrap--color .arch-node__logo {
          filter: contrast(1.25) saturate(1.35)
            drop-shadow(0 1.5px 3px rgba(15, 23, 42, 0.15));
        }
        .arch-node__title {
          margin-top: 0.45rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.01em;
        }
        .arch-node__sub {
          margin-top: 0.08rem;
          font-size: 0.62rem;
          color: #64748b;
        }

        @keyframes arch-flow {
          to { stroke-dashoffset: -36; }
        }
        @keyframes arch-node-in {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.94); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        @media (max-width: 768px) {
          .arch-canvas {
            min-height: clamp(24rem, 80vw, 32rem);
            aspect-ratio: ${VB.w} / ${VB.h};
            padding-bottom: 4.25rem;
          }
          .arch-canvas__diagram {
            transform: scale(1.12);
            transform-origin: 50% 42%;
          }
          .arch-node { width: 84px; }
          .arch-node--hub { width: 96px; }
          .arch-node--hub .arch-node__card {
            width: 3.75rem;
            height: 3.75rem;
          }
          .arch-node--hub .arch-node__logo-wrap {
            width: 2.6rem;
            height: 2.6rem;
          }
          .arch-node__card {
            width: 3.1rem;
            height: 3.1rem;
            border-radius: 12px;
          }
          .arch-node__logo-wrap {
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 8px;
          }
          .arch-node__logo-wrap--symbol .arch-node__logo {
            width: 1.7rem;
            height: 1.7rem;
          }
          .arch-node__brand-crop {
            width: 2.2rem;
            height: 2.2rem;
          }
          .arch-node__logo {
            width: 1.65rem;
            height: 1.65rem;
          }
          .arch-node__title { font-size: 0.66rem; margin-top: 0.32rem; }
          .arch-node__sub { font-size: 0.55rem; }
          .arch-node--label-side {
            flex-direction: column;
            align-items: center;
            gap: 0;
            width: 84px;
            transform: translate(-50%, -50%);
            text-align: center;
          }
          .arch-node--label-side .arch-node__copy--side {
            align-items: center;
            text-align: center;
            white-space: normal;
          }
          .arch-edge-label { font-size: 8px; }
          .arch-flow-bar {
            width: min(96%, 30rem);
            padding: 0.4rem 0.55rem;
            gap: 0.2rem 0.3rem;
          }
          .arch-flow-bar__pill { font-size: 0.6rem; gap: 0.3rem; }
          .arch-flow-bar__chev { width: 0.7rem; height: 0.7rem; }
          .arch-flow-bar__dot { width: 0.38rem; height: 0.38rem; }
        }
        @media (max-width: 480px) {
          .arch-canvas { min-height: clamp(22rem, 95vw, 28rem); padding-bottom: 5rem; }
          .arch-canvas__diagram {
            transform: scale(1.16);
            transform-origin: 50% 40%;
          }
          .arch-node { width: 70px; }
          .arch-node--hub { width: 78px; }
          .arch-node--hub .arch-node__card { width: 3rem; height: 3rem; }
          .arch-node--hub .arch-node__logo-wrap { width: 2.1rem; height: 2.1rem; }
          .arch-node__card { width: 2.55rem; height: 2.55rem; border-radius: 10px; }
          .arch-node__logo-wrap { width: 1.8rem; height: 1.8rem; border-radius: 7px; }
          .arch-node__brand-crop { width: 1.8rem; height: 1.8rem; }
          .arch-node__logo { width: 1.35rem; height: 1.35rem; }
          .arch-node__logo-wrap--symbol .arch-node__logo { width: 1.4rem; height: 1.4rem; }
          .arch-node__title { font-size: 0.6rem; margin-top: 0.25rem; }
          .arch-node__sub { font-size: 0.5rem; }
          .arch-edge-label { font-size: 7px; }
          .arch-flow-bar { width: 96%; gap: 0.15rem 0.2rem; }
          .arch-flow-bar__pill { font-size: 0.55rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .arch-edge--flow, .arch-node { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
