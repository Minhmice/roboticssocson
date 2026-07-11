"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getMcuDiagramNode,
  getPathsForNode,
  MCU_DIAGRAM_COLORS,
  MCU_DIAGRAM_LABEL_Y,
  MCU_DIAGRAM_LAYOUT,
  MCU_DIAGRAM_NODES,
  MCU_DIAGRAM_PATHS,
  MCU_DIAGRAM_TIMING,
  MCU_DIAGRAM_VIEWBOX,
  type McuDiagramNode,
  type McuDiagramNodeId,
  type McuDiagramPath,
} from "@/components/course/deck/diagrams/mcuFlowDiagramData";
import { cn } from "@/lib/utils";

type McuFlowDiagramProps = {
  className?: string;
  /** Override accessible title */
  title?: string;
};

type EdgePoint = { x: number; y: number };

/** Pulses travel node-center to node-center */
function pathEndpoints(path: McuDiagramPath): { start: EdgePoint; end: EdgePoint } {
  const from = getMcuDiagramNode(path.from);
  const to = getMcuDiagramNode(path.to);
  return { start: { x: from.cx, y: from.cy }, end: { x: to.cx, y: to.cy } };
}


/** Split long labels so they stay inside node boxes at projection scale */
function nodeTitleLines(title: string, isMcu: boolean): string[] {
  if (isMcu) {
    return title.length > 14 ? ["Micro-", "controller"] : [title];
  }
  if (title.includes("/")) {
    const [left, right] = title.split("/").map((part) => part.trim());
    if (left && right) return [`${left} /`, right];
  }
  const space = title.indexOf(" ");
  if (space > 0 && title.length > 9) {
    return [title.slice(0, space), title.slice(space + 1)];
  }
  return [title];
}

const ICON_SIZE = 28;

function ModuleIcon({ nodeId }: { nodeId: McuDiagramNodeId }) {
  const stroke = MCU_DIAGRAM_COLORS.mcuStroke;
  const fill = MCU_DIAGRAM_COLORS.pulse;
  const scale = ICON_SIZE / 24;

  return (
    <g aria-hidden transform={`scale(${scale})`}>
      {(() => {
        switch (nodeId) {
          case "distance":
            return (
              <>
                <path d="M8 14 L8 10 M12 14 L12 10 M16 14 L16 10" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" />
                <path d="M6 14 C6 10, 18 10, 18 14" stroke={stroke} strokeWidth="1.75" fill="none" />
              </>
            );
          case "light":
            return (
              <>
                <circle cx="12" cy="12" r="4" stroke={stroke} strokeWidth="1.75" fill="none" />
                <path d="M12 3 L12 5 M12 19 L12 21 M3 12 L5 12 M19 12 L21 12" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" />
              </>
            );
          case "button":
            return (
              <>
                <rect x="7" y="8" width="10" height="8" rx="2" stroke={stroke} strokeWidth="1.75" fill="none" />
                <path d="M12 16 L12 19" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" />
              </>
            );
          case "mcu":
            return (
              <>
                <rect x="4" y="6" width="16" height="12" rx="1.5" stroke={stroke} strokeWidth="1.75" fill={MCU_DIAGRAM_COLORS.mcuFill} />
                {[8, 12, 16].map((x) => (
                  <rect key={x} x={x - 0.75} y="4" width="1.5" height="2" fill={fill} rx="0.3" />
                ))}
                {[8, 12, 16].map((x) => (
                  <rect key={`b-${x}`} x={x - 0.75} y="18" width="1.5" height="2" fill={fill} rx="0.3" />
                ))}
              </>
            );
          case "motor":
            return (
              <>
                <circle cx="12" cy="12" r="5" stroke={stroke} strokeWidth="1.75" fill="none" />
                <circle cx="12" cy="12" r="1.5" fill={fill} />
              </>
            );
          case "servo":
            return (
              <>
                <rect x="5" y="9" width="14" height="8" rx="1.5" stroke={stroke} strokeWidth="1.75" fill="none" />
                <path d="M12 9 L15 5 L9 5 Z" fill={fill} opacity="0.85" />
              </>
            );
          case "led":
            return (
              <>
                <path d="M10 16 L14 16 M12 16 L12 19" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" />
                <path d="M8 10 C8 6, 16 6, 16 10 L14 14 L10 14 Z" stroke={stroke} strokeWidth="1.75" fill={fill} fillOpacity="0.25" />
              </>
            );
          default:
            return null;
        }
      })()}
    </g>
  );
}

function DiagramModule({
  node,
  active,
  lit,
  hovered,
  onHover,
  onLeave,
}: {
  node: McuDiagramNode;
  active: boolean;
  lit: boolean;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const x = node.cx - node.width / 2;
  const y = node.cy - node.height / 2;
  const isMcu = node.role === "mcu";
  const titleSize = isMcu ? 28 : 24;
  const subtitleSize = isMcu ? 20 : 18;
  const titleLines = nodeTitleLines(node.title, isMcu);
  const lineHeight = titleSize * 1.12;
  const iconY = y + (isMcu ? 16 : 12);
  const subtitleY = y + node.height - (isMcu ? 14 : 12);
  const titleStartY =
    subtitleY - subtitleSize - (titleLines.length - 1) * lineHeight - (isMcu ? 10 : 8);
  const emphasized = hovered || active || lit;

  return (
    <g
      data-testid={`mcu-node-${node.id}`}
      role="button"
      tabIndex={0}
      aria-label={`${node.title}: ${node.subtitle}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className="cursor-default outline-none"
    >
      <motion.rect
        data-testid="mcu-node-box"
        x={x}
        y={y}
        width={node.width}
        height={node.height}
        rx={isMcu ? 16 : 12}
        fill={isMcu ? MCU_DIAGRAM_COLORS.mcuFill : MCU_DIAGRAM_COLORS.moduleFill}
        stroke={
          emphasized
            ? isMcu
              ? MCU_DIAGRAM_COLORS.mcuStrokeActive
              : MCU_DIAGRAM_COLORS.mcuStroke
            : MCU_DIAGRAM_COLORS.moduleStroke
        }
        strokeWidth={emphasized ? 3 : 2.25}
        animate={
          active && isMcu
            ? {
                filter: [
                  "drop-shadow(0 0 0px rgba(37,99,235,0))",
                  "drop-shadow(0 0 22px rgba(37,99,235,0.55))",
                  "drop-shadow(0 0 10px rgba(37,99,235,0.3))",
                ],
              }
            : lit
              ? { filter: "drop-shadow(0 0 10px rgba(37,99,235,0.28))" }
              : hovered
                ? { filter: "drop-shadow(0 6px 16px rgba(15,23,42,0.14))" }
                : { filter: "drop-shadow(0 3px 8px rgba(15,23,42,0.08))" }
        }
        transition={{ duration: MCU_DIAGRAM_TIMING.mcuGlowDuration, ease: [0.16, 1, 0.3, 1] }}
      />
      <g transform={`translate(${node.cx - ICON_SIZE / 2}, ${iconY})`}>
        <ModuleIcon nodeId={node.id} />
      </g>
      <text
        data-testid="mcu-node-title"
        x={node.cx}
        y={titleStartY}
        textAnchor="middle"
        fill={MCU_DIAGRAM_COLORS.text}
        fontSize={titleSize}
        fontWeight={700}
        fontFamily="var(--font-inter, system-ui, sans-serif)"
      >
        {titleLines.map((line, index) => (
          <tspan key={line} x={node.cx} dy={index === 0 ? 0 : lineHeight}>
            {line}
          </tspan>
        ))}
      </text>
      <text
        data-testid="mcu-node-subtitle"
        x={node.cx}
        y={subtitleY}
        textAnchor="middle"
        fill={MCU_DIAGRAM_COLORS.textMuted}
        fontSize={subtitleSize}
        fontWeight={600}
        fontFamily="var(--font-inter, system-ui, sans-serif)"
      >
        {node.subtitle}
      </text>
    </g>
  );
}

function WirePath({
  path,
  highlighted,
  reducedMotion,
  dashPhase,
  showFeedback,
}: {
  path: McuDiagramPath;
  highlighted: boolean;
  reducedMotion: boolean;
  dashPhase: ReturnType<typeof useMotionValue<number>>;
  showFeedback: boolean;
}) {
  const isFeedback = path.kind === "feedback";
  if (isFeedback && !showFeedback && !highlighted) {
    return null;
  }

  const stroke = highlighted
    ? MCU_DIAGRAM_COLORS.pulse
    : isFeedback
      ? MCU_DIAGRAM_COLORS.wireMuted
      : MCU_DIAGRAM_COLORS.wireBase;

  const baseWidth = isFeedback ? 2 : 2.75;
  const activeWidth = isFeedback ? 2.5 : 3;

  const baseOpacity = highlighted ? 1 : isFeedback ? 0.4 : reducedMotion ? 0.85 : 0.55;
  const dashOpacity = highlighted ? 1 : isFeedback ? 0.35 : reducedMotion ? 0.7 : 0.25;

  return (
    <g>
      <path
        d={path.d}
        fill="none"
        stroke={MCU_DIAGRAM_COLORS.wireDim}
        strokeWidth={baseWidth}
        strokeLinecap="round"
        opacity={baseOpacity}
      />
      <motion.path
        d={path.d}
        fill="none"
        stroke={stroke}
        strokeWidth={activeWidth}
        strokeLinecap="round"
        strokeDasharray={isFeedback ? "6 8" : "8 6"}
        strokeOpacity={dashOpacity}
        style={reducedMotion ? undefined : { strokeDashoffset: dashPhase }}
      />
      {highlighted ? (
        <path
          d={path.d}
          fill="none"
          stroke={MCU_DIAGRAM_COLORS.pulseGlow}
          strokeWidth={activeWidth + 2}
          strokeLinecap="round"
          opacity={0.22}
        />
      ) : null}
    </g>
  );
}

function PulseParticle({
  path,
  runId,
  delay,
  duration,
  reducedMotion,
  glowFilterId,
  onTravelStart,
  onTravelEnd,
}: {
  path: McuDiagramPath;
  runId: number;
  delay: number;
  duration: number;
  reducedMotion: boolean;
  glowFilterId: string;
  onTravelStart: (pathId: string, fromId: McuDiagramNodeId, toId: McuDiagramNodeId) => void;
  onTravelEnd: () => void;
}) {
  const { start, end } = pathEndpoints(path);
  const cx = useMotionValue(start.x);
  const cy = useMotionValue(start.y);
  const opacity = useMotionValue(0);
  const glowOpacity = useTransform(opacity, (v) => v * 0.65);
  const coreScale = useMotionValue(1);

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    const mid = {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2,
    };

    const run = async () => {
      await new Promise((r) => setTimeout(r, delay * 1000));
      if (cancelled) return;

      onTravelStart(path.id, path.from, path.to);
      cx.set(start.x);
      cy.set(start.y);
      opacity.set(0);
      coreScale.set(0.6);

      await Promise.all([
        animate(opacity, 1, { duration: 0.18, ease: [0.16, 1, 0.3, 1] }),
        animate(coreScale, 1, { duration: 0.18, ease: [0.16, 1, 0.3, 1] }),
        animate(cx, [start.x, mid.x, end.x], { duration, ease: [0.22, 1, 0.36, 1] }),
        animate(cy, [start.y, mid.y, end.y], { duration, ease: [0.22, 1, 0.36, 1] }),
      ]);

      if (cancelled) return;
      await animate(opacity, 0, { duration: 0.28, ease: [0.4, 0, 0.6, 1] });
      onTravelEnd();
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [
    runId,
    delay,
    duration,
    reducedMotion,
    start.x,
    start.y,
    end.x,
    end.y,
    cx,
    cy,
    opacity,
    coreScale,
    path.id,
    path.from,
    path.to,
    onTravelStart,
    onTravelEnd,
  ]);

  if (reducedMotion) return null;

  return (
    <g filter={`url(#${glowFilterId})`}>
      <motion.circle
        r={13}
        fill={MCU_DIAGRAM_COLORS.pulseGlow}
        style={{ cx, cy, opacity: glowOpacity }}
      />
      <motion.circle
        r={7}
        fill={MCU_DIAGRAM_COLORS.pulse}
        style={{ cx, cy, opacity, scale: coreScale }}
      />
    </g>
  );
}

/**
 * Animated Input → MCU → Output schematic for deck slide 4.
 */
export function McuFlowDiagram({
  className,
  title = "Input, microcontroller, and output signal flow",
}: McuFlowDiagramProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const titleId = useId();
  const descId = useId();
  const glowFilterId = useId().replace(/:/g, "");
  const [hoveredId, setHoveredId] = useState<McuDiagramNodeId | null>(null);
  const [mcuActive, setMcuActive] = useState(reducedMotion);
  const [activePathId, setActivePathId] = useState<string | null>(null);
  const [litNodeIds, setLitNodeIds] = useState<Set<McuDiagramNodeId>>(() => new Set());
  const [showFeedback, setShowFeedback] = useState(reducedMotion);
  const [runId, setRunId] = useState(0);
  const pausedRef = useRef(false);
  const dashPhase = useMotionValue(0);

  const inputPaths = useMemo(
    () => MCU_DIAGRAM_PATHS.filter((p) => p.kind === "input").sort((a, b) => a.sequenceIndex - b.sequenceIndex),
    [],
  );
  const outputPaths = useMemo(
    () => MCU_DIAGRAM_PATHS.filter((p) => p.kind === "output").sort((a, b) => a.sequenceIndex - b.sequenceIndex),
    [],
  );
  const feedbackPaths = useMemo(() => MCU_DIAGRAM_PATHS.filter((p) => p.kind === "feedback"), []);

  const highlightedPathIds = useMemo(() => {
    if (hoveredId) return new Set(getPathsForNode(hoveredId).map((p) => p.id));
    if (activePathId) return new Set([activePathId]);
    return null;
  }, [hoveredId, activePathId]);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  const handleTravelStart = useCallback(
    (pathId: string, fromId: McuDiagramNodeId, toId: McuDiagramNodeId) => {
      setActivePathId(pathId);
      setLitNodeIds(new Set([fromId, toId]));
    },
    [],
  );

  const handleTravelEnd = useCallback(() => {
    setActivePathId(null);
    setLitNodeIds(new Set());
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    const t = MCU_DIAGRAM_TIMING;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const tick = () => {
          if (cancelled) return;
          if (!pausedRef.current) {
            if (performance.now() - start >= ms) resolve();
            else requestAnimationFrame(tick);
          } else {
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);
      });

    const loop = async () => {
      while (!cancelled) {
        setShowFeedback(false);
        setRunId((n) => n + 1);

        for (let i = 0; i < inputPaths.length; i += 1) {
          await wait(t.inputStagger * 1000);
          if (cancelled) break;
          setMcuActive(true);
          await wait(t.inputToMcuDuration * 1000);
          await wait(t.mcuProcessHold * 1000);
          setMcuActive(false);
        }

        for (let i = 0; i < outputPaths.length; i += 1) {
          await wait(t.outputStagger * 1000);
          if (cancelled) break;
          await wait(t.mcuToOutputDuration * 1000);
        }

        setShowFeedback(true);
        for (let i = 0; i < feedbackPaths.length; i += 1) {
          await wait(t.feedbackDuration * 1000);
        }

        await wait(t.pauseBetweenCycles * 1000);
      }
    };

    void loop();
    return () => {
      cancelled = true;
    };
  }, [reducedMotion, inputPaths, outputPaths, feedbackPaths]);

  useEffect(() => {
    if (reducedMotion) return;
    const controls = animate(dashPhase, -56, {
      duration: 2.8,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [reducedMotion, dashPhase]);

  return (
    <figure
      data-testid="mcu-flow-diagram"
      className={cn(
        "relative aspect-video h-full min-h-0 w-full overflow-hidden rounded-2xl border-2 border-border/80 bg-white shadow-[0_16px_48px_rgba(15,23,42,0.1)]",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${MCU_DIAGRAM_VIEWBOX.width} ${MCU_DIAGRAM_VIEWBOX.height}`}
        className="h-full w-full"
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descId}
        preserveAspectRatio="xMidYMid meet"
      >
        <title id={titleId}>{title}</title>
        <desc id={descId}>
          Sensors send signals to a central microcontroller which processes data and drives motors, servos, and
          indicators. Animated pulses show signal flow; hover a module to highlight its connections.
        </desc>

        <defs>
          <filter id={glowFilterId} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Column labels — shared baseline, bolder for projection */}
        {(
          [
            ["INPUT", MCU_DIAGRAM_LAYOUT.inputCx],
            ["MCU", MCU_DIAGRAM_LAYOUT.mcuCx],
            ["OUTPUT", MCU_DIAGRAM_LAYOUT.outputCx],
          ] as const
        ).map(([label, x]) => (
          <text
            key={label}
            x={x}
            y={MCU_DIAGRAM_LABEL_Y}
            textAnchor="middle"
            fill={MCU_DIAGRAM_COLORS.label}
            fontSize={24}
            fontWeight={800}
            letterSpacing="0.08em"
            fontFamily="var(--font-inter, system-ui, sans-serif)"
          >
            {label}
          </text>
        ))}

        {MCU_DIAGRAM_PATHS.map((path) => (
          <WirePath
            key={path.id}
            path={path}
            highlighted={highlightedPathIds?.has(path.id) ?? false}
            reducedMotion={reducedMotion}
            dashPhase={dashPhase}
            showFeedback={showFeedback}
          />
        ))}

        {!reducedMotion
          ? MCU_DIAGRAM_PATHS.map((path) => {
              const isInput = path.kind === "input";
              const isOutput = path.kind === "output";
              const isFeedback = path.kind === "feedback";
              let delay = 0;
              let duration: number = MCU_DIAGRAM_TIMING.inputToMcuDuration;

              if (isInput) {
                delay = path.sequenceIndex * MCU_DIAGRAM_TIMING.inputStagger;
              } else if (isOutput) {
                delay =
                  inputPaths.length * MCU_DIAGRAM_TIMING.inputStagger +
                  inputPaths.length * (MCU_DIAGRAM_TIMING.inputToMcuDuration + MCU_DIAGRAM_TIMING.mcuProcessHold) +
                  path.sequenceIndex * MCU_DIAGRAM_TIMING.outputStagger +
                  0.2;
                duration = MCU_DIAGRAM_TIMING.mcuToOutputDuration;
              } else if (isFeedback) {
                delay =
                  inputPaths.length * MCU_DIAGRAM_TIMING.inputStagger +
                  inputPaths.length * (MCU_DIAGRAM_TIMING.inputToMcuDuration + MCU_DIAGRAM_TIMING.mcuProcessHold) +
                  outputPaths.length * MCU_DIAGRAM_TIMING.outputStagger +
                  outputPaths.length * MCU_DIAGRAM_TIMING.mcuToOutputDuration +
                  0.35;
                duration = MCU_DIAGRAM_TIMING.feedbackDuration;
              }

              return (
                <PulseParticle
                  key={`${path.id}-${runId}`}
                  path={path}
                  runId={runId}
                  delay={delay}
                  duration={duration}
                  reducedMotion={false}
                  glowFilterId={glowFilterId}
                  onTravelStart={handleTravelStart}
                  onTravelEnd={handleTravelEnd}
                />
              );
            })
          : null}

        {MCU_DIAGRAM_NODES.map((node) => (
          <DiagramModule
            key={node.id}
            node={node}
            active={node.id === "mcu" && mcuActive}
            lit={litNodeIds.has(node.id)}
            hovered={hoveredId === node.id}
            onHover={() => {
              setHoveredId(node.id);
              pause();
            }}
            onLeave={() => {
              setHoveredId(null);
              resume();
            }}
          />
        ))}
      </svg>
    </figure>
  );
}
