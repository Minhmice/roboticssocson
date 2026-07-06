import {
  AlertTriangle,
  Blocks,
  Bot,
  Bug,
  CircuitBoard,
  Cpu,
  Gamepad2,
  GraduationCap,
  Lightbulb,
  ListChecks,
  MessageCircle,
  Presentation,
  Puzzle,
  Recycle,
  Smartphone,
  Sparkles,
  Target,
  Workflow,
  Zap,
  Circle,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  Blocks,
  Bot,
  Bug,
  CircuitBoard,
  Cpu,
  Gamepad2,
  GraduationCap,
  Lightbulb,
  ListChecks,
  MessageCircle,
  Presentation,
  Puzzle,
  Recycle,
  Smartphone,
  Sparkles,
  Target,
  Workflow,
  Zap,
};

export function getLucideIcon(name: string): LucideIcon {
  return iconMap[name] ?? Circle;
}
