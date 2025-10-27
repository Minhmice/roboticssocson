/**
 * Metrics data for landing page highlights section
 */

export type MetricItem = {
  readonly value: string;
  readonly label_vi: string;
  readonly label_en: string;
  readonly icon?: string; // optional lucide icon name e.g. "Trophy", "Users"
};

export const metrics: readonly MetricItem[] = [
  { 
    value: "2023 → nay", 
    label_vi: "Năm hoạt động", 
    label_en: "Years active", 
    icon: "Calendar" 
  },
  { 
    value: "4+", 
    label_vi: "Giải đấu cấp quốc gia", 
    label_en: "Major competitions", 
    icon: "Trophy" 
  },
  { 
    value: "Sóc Sơn • Hà Nội", 
    label_vi: "Tác động cộng đồng", 
    label_en: "Community impact", 
    icon: "Users" 
  },
  { 
    value: "1000+", 
    label_vi: "Học sinh tiếp cận STEM*", 
    label_en: "Students reached*", 
    icon: "Sparkles" 
  },
] as const;

