/** Editable animation + layout constants for Slide 4 MCU flow diagram */

export const MCU_DIAGRAM_TIMING = {
  /** Full loop length in seconds — slower for classroom projection */
  loopDuration: 9.5,
  /** Delay between each input pulse start */
  inputStagger: 0.7,
  /** Input → MCU travel time */
  inputToMcuDuration: 1.05,
  /** MCU core glow after pulse arrival */
  mcuProcessHold: 0.55,
  mcuGlowDuration: 0.45,
  /** Delay between output pulses */
  outputStagger: 0.6,
  /** MCU → output travel time */
  mcuToOutputDuration: 0.95,
  /** Subtle feedback path (output → sensor) */
  feedbackDuration: 1.4,
  /** Idle gap before next loop */
  pauseBetweenCycles: 0.85,
} as const;

export const MCU_DIAGRAM_COLORS = {
  wireBase: "#94A3B8",
  wireMuted: "#CBD5E1",
  wireDim: "#E2E8F0",
  pulse: "#2563EB",
  pulseGlow: "#38BDF8",
  text: "#0F172A",
  textMuted: "#334155",
  label: "#1E40AF",
  moduleFill: "#FFFFFF",
  moduleStroke: "#64748B",
  mcuFill: "#EFF6FF",
  mcuStroke: "#2563EB",
  mcuStrokeActive: "#1D4ED8",
  pinActive: "#2563EB",
} as const;

/** Shared label baseline for INPUT / MCU / OUTPUT */
export const MCU_DIAGRAM_LABEL_Y = 46;

export const MCU_DIAGRAM_LAYOUT = {
  inputCx: 168,
  outputCx: 792,
  mcuCx: 480,
  mcuCy: 262,
  ioNodeWidth: 188,
  ioNodeHeight: 104,
  mcuWidth: 252,
  mcuHeight: 152,
  /** Edge-to-edge vertical gap between I/O nodes */
  ioGap: 28,
} as const;

export type McuDiagramNodeId =
  | "distance"
  | "light"
  | "button"
  | "mcu"
  | "motor"
  | "servo"
  | "led";

export type McuDiagramNodeRole = "input" | "mcu" | "output";

export interface McuDiagramNode {
  id: McuDiagramNodeId;
  role: McuDiagramNodeRole;
  title: string;
  subtitle: string;
  /** Center x/y in viewBox coordinates */
  cx: number;
  cy: number;
  width: number;
  height: number;
}

export interface McuDiagramPath {
  id: string;
  from: McuDiagramNodeId;
  to: McuDiagramNodeId;
  /** SVG path `d` in viewBox space */
  d: string;
  kind: "input" | "output" | "feedback";
  /** Sequence index for staggered animation */
  sequenceIndex: number;
  /** Which output this input chain drives (for highlight on hover) */
  linkedOutputId?: McuDiagramNodeId;
}

/** Tighter crop — diagram fills ~88% of the card */
export const MCU_DIAGRAM_VIEWBOX = { width: 960, height: 520 } as const;

const { inputCx, outputCx, mcuCx, mcuCy, ioNodeWidth, ioNodeHeight, mcuWidth, mcuHeight, ioGap } =
  MCU_DIAGRAM_LAYOUT;

const ioStep = ioNodeHeight + ioGap;
const ioCyTop = mcuCy - ioStep;
const ioCyBottom = mcuCy + ioStep;

export const MCU_DIAGRAM_NODES: McuDiagramNode[] = [
  {
    id: "distance",
    role: "input",
    title: "Distance",
    subtitle: "Ultrasonic",
    cx: inputCx,
    cy: ioCyTop,
    width: ioNodeWidth,
    height: ioNodeHeight,
  },
  {
    id: "light",
    role: "input",
    title: "Light",
    subtitle: "LDR / Color",
    cx: inputCx,
    cy: mcuCy,
    width: ioNodeWidth,
    height: ioNodeHeight,
  },
  {
    id: "button",
    role: "input",
    title: "Push button",
    subtitle: "Digital in",
    cx: inputCx,
    cy: ioCyBottom,
    width: ioNodeWidth,
    height: ioNodeHeight,
  },
  {
    id: "mcu",
    role: "mcu",
    title: "Microcontroller",
    subtitle: "Read → Process → Decide",
    cx: mcuCx,
    cy: mcuCy,
    width: mcuWidth,
    height: mcuHeight,
  },
  {
    id: "motor",
    role: "output",
    title: "Motor",
    subtitle: "DC drive",
    cx: outputCx,
    cy: ioCyTop,
    width: ioNodeWidth,
    height: ioNodeHeight,
  },
  {
    id: "servo",
    role: "output",
    title: "Servo",
    subtitle: "Joint / grip",
    cx: outputCx,
    cy: mcuCy,
    width: ioNodeWidth,
    height: ioNodeHeight,
  },
  {
    id: "led",
    role: "output",
    title: "LED / Buzzer",
    subtitle: "Indicator",
    cx: outputCx,
    cy: ioCyBottom,
    width: ioNodeWidth,
    height: ioNodeHeight,
  },
];

function curveBetween(
  from: { cx: number; cy: number },
  to: { cx: number; cy: number },
): string {
  const dx = to.cx - from.cx;
  if (Math.abs(from.cy - to.cy) < 1) {
    return `M ${from.cx} ${from.cy} L ${to.cx} ${to.cy}`;
  }
  const c1x = from.cx + dx * 0.42;
  const c2x = to.cx - dx * 0.42;
  return `M ${from.cx} ${from.cy} C ${c1x} ${from.cy}, ${c2x} ${to.cy}, ${to.cx} ${to.cy}`;
}

const mcuNode = MCU_DIAGRAM_NODES.find((n) => n.id === "mcu")!;
const distanceNode = MCU_DIAGRAM_NODES.find((n) => n.id === "distance")!;
const lightNode = MCU_DIAGRAM_NODES.find((n) => n.id === "light")!;
const buttonNode = MCU_DIAGRAM_NODES.find((n) => n.id === "button")!;
const motorNode = MCU_DIAGRAM_NODES.find((n) => n.id === "motor")!;
const servoNode = MCU_DIAGRAM_NODES.find((n) => n.id === "servo")!;
const ledNode = MCU_DIAGRAM_NODES.find((n) => n.id === "led")!;

export const MCU_DIAGRAM_PATHS: McuDiagramPath[] = [
  {
    id: "in-distance",
    from: "distance",
    to: "mcu",
    d: curveBetween(distanceNode, mcuNode),
    kind: "input",
    sequenceIndex: 0,
    linkedOutputId: "motor",
  },
  {
    id: "in-light",
    from: "light",
    to: "mcu",
    d: curveBetween(lightNode, mcuNode),
    kind: "input",
    sequenceIndex: 1,
    linkedOutputId: "servo",
  },
  {
    id: "in-button",
    from: "button",
    to: "mcu",
    d: curveBetween(buttonNode, mcuNode),
    kind: "input",
    sequenceIndex: 2,
    linkedOutputId: "led",
  },
  {
    id: "out-motor",
    from: "mcu",
    to: "motor",
    d: curveBetween(mcuNode, motorNode),
    kind: "output",
    sequenceIndex: 0,
  },
  {
    id: "out-servo",
    from: "mcu",
    to: "servo",
    d: curveBetween(mcuNode, servoNode),
    kind: "output",
    sequenceIndex: 1,
  },
  {
    id: "out-led",
    from: "mcu",
    to: "led",
    d: curveBetween(mcuNode, ledNode),
    kind: "output",
    sequenceIndex: 2,
  },
  {
    id: "feedback-motor-distance",
    from: "motor",
    to: "distance",
    d: `M ${motorNode.cx} ${motorNode.cy} C ${motorNode.cx + 40} ${motorNode.cy - 88}, ${distanceNode.cx - 40} ${distanceNode.cy - 88}, ${distanceNode.cx} ${distanceNode.cy}`,
    kind: "feedback",
    sequenceIndex: 0,
  },
];

export function getMcuDiagramNode(id: McuDiagramNodeId): McuDiagramNode {
  const node = MCU_DIAGRAM_NODES.find((n) => n.id === id);
  if (!node) throw new Error(`Unknown diagram node: ${id}`);
  return node;
}

/** Paths connected to a node (for hover highlight) */
export function getPathsForNode(nodeId: McuDiagramNodeId): McuDiagramPath[] {
  return MCU_DIAGRAM_PATHS.filter((p) => p.from === nodeId || p.to === nodeId);
}
