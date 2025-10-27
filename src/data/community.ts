/**
 * Community section data
 * Events, workshops, and community activities
 */

export interface CommunityEvent {
  readonly title: string;
  readonly date: string;
  readonly location: string;
  readonly status: "completed" | "upcoming";
  readonly description?: string;
  readonly participants?: string;
}

export const communityEvents: readonly CommunityEvent[] = [
  {
    title: "STEM Workshop 2024",
    date: "2024-01-15",
    location: "Trường THPT Sóc Sơn",
    status: "completed",
    description: "Workshop về robotics cho học sinh địa phương",
    participants: "50+ học sinh",
  },
  {
    title: "Robot Demo Day",
    date: "2024-06-10",
    location: "Trường THPT Sóc Sơn",
    status: "completed",
    description: "Trình diễn robot cho cộng đồng",
    participants: "100+ người tham gia",
  },
  {
    title: "STEM Day 2025",
    date: "2025-03-20",
    location: "Hà Nội",
    status: "upcoming",
    description: "Sự kiện STEM quy mô lớn",
  },
  {
    title: "Community Outreach Program",
    date: "2025-05-15",
    location: "Sóc Sơn",
    status: "upcoming",
    description: "Chương trình mở rộng cộng đồng",
  },
] as const;

export const communityRoadmap: readonly CommunityEvent[] = [
  {
    title: "Workshop Series",
    date: "2025 Q1",
    location: "TBA",
    status: "upcoming",
    description: "Series workshop robotics cho học sinh",
  },
  {
    title: "Open House",
    date: "2025 Q2",
    location: "Trường THPT Sóc Sơn",
    status: "upcoming",
    description: "Mở cửa để cộng đồng tham quan đội",
  },
] as const;

