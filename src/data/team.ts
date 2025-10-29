/**
 * Team roster for About page
 * Current team members with roles from Sponsorship2.md
 * 14 members total: 1 Captain, 1 Vice Captain, 12 Members
 */

export type TeamMember = { 
  name: string; 
  role: string; 
  avatar?: string 
};

export const team: readonly TeamMember[] = [
  { name: "Lê Quang Trình", role: "Captain" },
  { name: "Đoàn Thị Thuỳ Ngân", role: "Vice Captain" },
  { name: "Võ Danh Sơn", role: "Member" },
  { name: "Phạm Đức Vinh", role: "Member" },
  { name: "Phùng An Phong", role: "Member" },
  { name: "Đoàn Dũng", role: "Member" },
  { name: "Nguyễn Hồng Hà", role: "Member" },
  { name: "Cao Linh Hương", role: "Member" },
  { name: "Trần Minh Hiếu", role: "Member" },
  { name: "Nguyễn Anh Duy", role: "Member" },
  { name: "Vũ Hải Anh", role: "Member" },
  { name: "Nguyễn Đoàn Duy Phong", role: "Member" },
  { name: "Nguyễn Ngọc Thảo", role: "Member" },
  { name: "Đỗ Ngô Thiện Nhân", role: "Member" },
] as const;

