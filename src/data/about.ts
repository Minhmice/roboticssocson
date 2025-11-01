/**
 * About section data
 * Mission statement and team members
 */

export interface TeamMember {
  readonly name: string;
  readonly role: "Captain" | "Vice Captain" | "Member";
  readonly avatar?: string;
  readonly bio?: string;
}

export const aboutMissionData = {
  mission_vi: "Phát triển năng lực khoa học – kỹ thuật của học sinh thông qua trải nghiệm thực tiễn, đồng thời lan tỏa tinh thần STEM đến cộng đồng học sinh tại Sóc Sơn và khu vực lân cận.",
  mission_en: "Develop students' scientific and technical abilities through hands-on experience, while promoting the spirit of STEM within the student community in Sóc Sơn and surrounding areas.",
  values: ["Năng động / Dynamic", "Sáng tạo / Creative", "Không ngừng khám phá / Driven to Discover"],
} as const;

export const teamMembers: readonly TeamMember[] = [
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
  { name: "Nguyễn Văn A", role: "Member" },
] as const;

export const sponsorshipLetter = {
  vi: `I.\tThư ngỏ tài trợ (Sponsorship Letter)

\t\t\tKính gửi Quý nhà tài trợ,
Chúng em là Robotics Sóc Sơn, đội tuyển robotics được thành lập năm 2023, trực thuộc Trường THPT Sóc Sơn, Hà Nội. Từ khi thành lập, chúng em đã nuôi dưỡng niềm đam mê sâu sắc với khoa học – công nghệ và khao khát được tham gia các sân chơi robotics quốc tế, khám phá tri thức STEM, rèn luyện kỹ năng sáng tạo, tư duy phản biện và hợp tác nhóm.
Sau khi tham gia một số sân chơi robotics học sinh uy tín, chúng em chính thức bước vào FIRST Tech Challenge (FTC) từ mùa giải 2024–2025 và hiện đang tích cực chuẩn bị cho mùa giải năm nay. Tuy nhiên, với nguồn lực hạn chế về tài chính, chúng em gặp khó khăn trong việc hoàn thiện robot, trang trải phí đăng ký và các hoạt động STEM đi kèm, điều này đang là rào cản để đội có thể phát triển trọn vẹn tiềm năng.
Chúng em rất mong nhận được sự đồng hành từ Quý nhà tài trợ để vượt qua những rào cản này, tiếp tục phát triển đội và tham gia đầy đủ mùa giải FTC. Sự tài trợ của Quý vị sẽ không chỉ tạo cơ giúp học sinh nâng cao năng lực kỹ thuật, góp phần thúc đẩy giáo dục và phát triển cộng đồng, đồng thời mang lại cơ hội quảng bá thương hiệu rộng rãi trong cộng đồng học sinh, giáo viên và các sự kiện quốc tế của FIRST.
Chúng em cam kết sử dụng mọi hỗ trợ minh bạch, hiệu quả và duy trì liên lạc thường xuyên về tiến trình, kết quả và thành tích của đội. Sự đồng hành của Quý vị sẽ là nguồn động lực lớn để Robotics Sóc Sơn tiếp tục chinh phục thử thách, đổi mới sáng tạo và góp phần phát triển cộng đồng STEM tại Việt Nam.
Xin trân trọng cảm ơn và mong nhận được sự hợp tác từ Quý nhà tài trợ!
Đội Robotics Sóc Sơn
___________________________________________________________________________`,
  en: `Dear Sponsors,
We are Robotics Sóc Sơn, a robotics team established in 2023 under Sóc Sơn High School, Hanoi. Since our founding, we have nurtured a deep passion for science and technology and a strong desire to participate in international robotics competitions, explore STEM knowledge, and develop creativity, critical thinking, and teamwork skills.
After participating in several reputable student robotics competitions, we officially joined the FIRST Tech Challenge (FTC) in the 2024–2025 season and are now actively preparing for this year's competition. However, with limited financial resources, we face challenges in completing our robot, covering registration fees, and participating fully in STEM-related activities, which currently limits our ability to reach our full potential.
We sincerely hope for the support of your organization to overcome these barriers, continue developing our team, and fully participate in the FTC season. Your sponsorship will not only help students enhance their technical skills, but also contribute to advancing education and supporting the community, while providing opportunities for brand visibility within the student community, educators, and international FIRST events.
We commit to using all support transparently and effectively, providing regular updates on our progress, achievements, and results. Your partnership will be a tremendous source of motivation for Robotics Sóc Sơn to continue conquering challenges, innovating, and contributing to the growth of the STEM community in Vietnam.
With sincere thanks and anticipation of your support,
Robotics Sóc Sơn Team`
} as const;

export const aboutMeta = {
  foundedYear: "2023",
  school: "Trường THPT Sóc Sơn, Hà Nội"
} as const;

export const missionBadges = ["STEM", "Teamwork", "Innovation"] as const;

