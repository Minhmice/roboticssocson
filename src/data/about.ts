/**
 * About section data
 * Mission statement and team members
 */

export interface TeamMember {
  readonly name: string;
  readonly role:
    | "President"
    | "Vice President"
    | "Head of Engineering"
    | "Head of Programming"
    | "Head of Media Design"
    | "Captain"
    | "Vice Captain"
    | "Member";
  readonly avatar?: string;
  readonly bio?: string;
}

export const aboutMissionData = {
  mission_vi: "Phát triển năng lực khoa học – kỹ thuật của học sinh thông qua trải nghiệm thực tiễn, đồng thời lan tỏa tinh thần STEM đến cộng đồng học sinh tại Sóc Sơn và khu vực lân cận.",
  mission_en: "Develop students' scientific and technical abilities through hands-on experience, while promoting the spirit of STEM within the student community in Sóc Sơn and surrounding areas.",
  values: ["Năng động / Dynamic", "Sáng tạo / Creative", "Không ngừng khám phá / Driven to Discover"],
} as const;

export const teamMembers: readonly TeamMember[] = [
  { name: "Ngọc", role: "President" },
  { name: "Dung", role: "Vice President" },
  { name: "Nguyễn Thành Đạt", role: "Head of Engineering" },
  { name: "Võ Danh Sơn", role: "Head of Programming" },
  { name: "Chí Huy", role: "Head of Media Design" },
  { name: "Lê Quang Trình", role: "Member" },
  { name: "Đoàn Thị Thuỳ Ngân", role: "Member" },
  { name: "Trần Minh Hiếu", role: "Member" },
  { name: "Nguyễn Hoàng Anh", role: "Member" },
  { name: "Nguyễn Anh Duy", role: "Member" },
  { name: "Nguyễn Đoàn Duy Phong", role: "Member" },
  { name: "Nguyễn Ngọc Thảo", role: "Member" },
  { name: "Phạm Đức Vinh", role: "Member" },
] as const;

export const aboutMeta = {
  foundedYear: "2023",
  school: "Trường THPT Sóc Sơn, Hà Nội"
} as const;

export const missionBadges = ["STEM", "Teamwork", "Innovation"] as const;

