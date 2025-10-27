/**
 * Team roster for About page
 * Current team members with roles
 */

export type TeamMember = { 
  name: string; 
  role: string; 
  avatar?: string 
};

export const team: readonly TeamMember[] = [
  { name: "Nguyễn Minh Nam", role: "Team Leader — Coding" },
  { name: "Mầu Tuấn Kiệt", role: "Engineering" },
  { name: "Lê Khắc Huy", role: "Engineering" },
  { name: "Vương Thị Như Quỳnh", role: "Engineering" },
  { name: "Nguyễn Phan Trà My", role: "Media — Design" },
  { name: "Vũ Hải Anh", role: "Engineering" },
  { name: "Lê Quang Trình", role: "Coding" },
  { name: "Nguyễn Ngọc Thảo", role: "Media — Design" },
  { name: "Nguyễn Bảo Chi", role: "Media — Design" },
] as const;

