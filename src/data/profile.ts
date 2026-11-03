import type { Localized } from "@/lib/i18n/localized";

export type PeopleGroup = { title: string; lead?: string; names: string[] };

export type ProfileBlock =
  | { type: "p"; text: Localized<string> }
  | { type: "h"; text: Localized<string> }
  | { type: "list"; items: Localized<string[]> }
  | { type: "table"; head: Localized<string[]>; rows: Localized<string[][]> }
  | { type: "people"; groups: Localized<PeopleGroup[]> }
  | { type: "note"; text: Localized<string> }
  | { type: "image"; src: string; alt: Localized<string>; caption: Localized<string> };

export type ProfileSection = {
  id: string;
  title: Localized<string>;
  blocks: ProfileBlock[];
};

const same = <T,>(v: T): Localized<T> => ({ vi: v, en: v });

const codeTeam = {
  lead: "Võ Danh Sơn",
  names: ["Lê Quang Trình", "Phạm Đức Vinh", "Nguyễn Thanh Phong", "Nguyễn Đức Hoàng Lâm", "Lê Đức Anh", "Đào Nhật Tùng", "Đỗ Hải Châu Anh", "Nguyễn Hoàng Anh"],
};
const mechTeam = {
  lead: "Nguyễn Thành Đạt",
  names: ["Nguyễn Trọng Hùng", "Nguyễn Anh Duy", "Nguyễn Đoàn Duy Phong", "Nguyễn Bảo Ngọc", "Trần Thanh Tùng", "Phạm Kiến Huy", "Nguyễn Quốc Phong", "Đoàn Thùy Ngân"],
};
// Hai người trùng tên Nguyễn Bảo Ngọc: chỉ người ở ban Truyền thông là chủ tịch.
const mediaTeam = (president: string) => ({
  lead: "Đoàn Chí Huy",
  names: [`Nguyễn Bảo Ngọc (${president})`, "Nguyễn Ngọc Thảo", "Vũ Hải Anh", "Nguyễn Quỳnh Anh", "Trần Thu Hà", "Nguyễn Thị Ngân Hà", "Lại Thảo Anh"],
});

export const PROFILE_EMAIL = "roboticssocson@gmail.com";
export const PROFILE_UPDATED = "29/10/2026";

export const profileMeta = {
  title: {
    vi: "Hồ sơ CLB Robotics Sóc Sơn",
    en: "Robotics Sóc Sơn Club Profile",
  },
  lead: {
    vi: "Tài liệu đọc dành cho nhà tài trợ và đối tác, thay thế bản PDF. Mọi mục chưa được xác nhận đều ghi rõ là chưa xác nhận hoặc dự kiến.",
    en: "A reading document for sponsors and partners, replacing the PDF. Anything not yet confirmed is marked as unconfirmed or planned.",
  },
  updated: { vi: "Cập nhật", en: "Updated" },
  toc: { vi: "Mục lục", en: "Contents" },
  print: { vi: "In / lưu PDF", en: "Print / save PDF" },
} satisfies Record<string, Localized<string>>;

export const profileSeo = {
  vi: {
    title: "Hồ sơ CLB Robotics Sóc Sơn | Tài liệu dành cho nhà tài trợ",
    description:
      "Hồ sơ đầy đủ của CLB Robotics Sóc Sơn: Lịch sử, con người, thành tích, mùa giải FTC 2026–2027, ngân sách và gói đồng hành.",
    canonicalPath: "/profile",
    keywords: ["hồ sơ Robotics Sóc Sơn", "tài trợ FTC", "Robotics Sóc Sơn", "FIRST Tech Challenge"],
  },
  en: {
    title: "Robotics Sóc Sơn Club Profile | For Sponsors",
    description:
      "Full profile of Robotics Sóc Sơn: History, people, achievements, FTC 2026–2027 season, budget and sponsorship options.",
    canonicalPath: "/profile",
    keywords: ["Robotics Soc Son profile", "FTC sponsorship", "Robotics Soc Son", "FIRST Tech Challenge"],
  },
};

export const profileSections: ProfileSection[] = [
  {
    id: "clb-robotics-soc-son",
    title: { vi: "1. Câu lạc bộ Robotics Sóc Sơn", en: "1. Robotics Sóc Sơn Club" },
    blocks: [
      {
        type: "p",
        text: {
          vi: "Robotics Sóc Sơn là câu lạc bộ khoa học – công nghệ trực thuộc Trường THPT Sóc Sơn, Hà Nội. CLB hình thành từ niềm đam mê công nghệ và khát vọng chinh phục những đấu trường robot của một nhóm học sinh. Sau gần 5 năm hoạt động, CLB không ngừng mở rộng hoạt động sáng tạo, là nơi các thành viên cùng nhau học hỏi, chia sẻ kiến thức và tạo ra giá trị tích cực cho nhà trường và cộng đồng.",
          en: "Robotics Sóc Sơn is a science and technology club of Sóc Sơn High School, Hanoi. It grew from a group of students passionate about technology and competition arenas. After nearly 5 years of operation, the club continuously expands creative activities, serving as a platform where members learn, share knowledge, and create positive value for the school and community.",
        },
      },
      {
        type: "image",
        src: "/Images/Profile/team-stage-arms-crossed.webp",
        alt: { vi: "Các thành viên đội trong đồng phục xếp hàng trên sân khấu", en: "Team members in matching jerseys lined up on stage" },
        caption: { vi: "Các thành viên Robotics Sóc Sơn.", en: "Robotics Sóc Sơn members." },
      },
      {
        type: "table",
        head: { vi: ["Mục", "Nội dung"], en: ["Item", "Details"] },
        rows: {
          vi: [
            ["Tên CLB", "Robotics Sóc Sơn (Robotics Soc Son)"],
            ["Trực thuộc", "CLB khoa học – công nghệ, Trường THPT Sóc Sơn"],
            ["Thời gian hoạt động", "Gần 5 năm"],
            ["Website", "[roboticssocson.minhmice.com](https://roboticssocson.minhmice.com)"],
            ["Email", `[${PROFILE_EMAIL}](mailto:${PROFILE_EMAIL})`],
            [
              "Mạng xã hội",
              "Facebook: [Robotics Sóc Sơn](https://www.facebook.com/roboticssocson/) • Instagram: [@roboticssocson](https://www.instagram.com/roboticssocson/) • TikTok: [@roboticssocson](https://www.tiktok.com/@roboticssocson)",
            ],
          ],
          en: [
            ["Club name", "Robotics Sóc Sơn (Robotics Soc Son)"],
            ["Parent organisation", "Science & technology club, Sóc Sơn High School"],
            ["Operation time", "Nearly 5 years"],
            ["Website", "[roboticssocson.minhmice.com](https://roboticssocson.minhmice.com)"],
            ["Email", `[${PROFILE_EMAIL}](mailto:${PROFILE_EMAIL})`],
            [
              "Social",
              "Facebook: [Robotics Sóc Sơn](https://www.facebook.com/roboticssocson/) • Instagram: [@roboticssocson](https://www.instagram.com/roboticssocson/) • TikTok: [@roboticssocson](https://www.tiktok.com/@roboticssocson)",
            ],
          ],
        },
      },
      { type: "h", text: { vi: "Giá trị cốt lõi", en: "Core values" } },
      {
        type: "list",
        items: {
          vi: [
            "Sáng tạo: Không ngừng tìm tòi, hiện thực hóa ý tưởng mới.",
            "Năng động: Chủ động học hỏi, tích cực trải nghiệm và thử thách.",
            "Đột phá: Vượt qua giới hạn, tạo nên giá trị khác biệt.",
          ],
          en: [
            "Creativity: Keep exploring and turning new ideas into reality.",
            "Dynamism: Learn proactively, embrace experience and challenge.",
            "Breakthrough: Push past limits and create distinct value.",
          ],
        },
      },
      { type: "h", text: { vi: "Lĩnh vực hoạt động", en: "Areas of activity" } },
      {
        type: "list",
        items: {
          vi: [
            "Code – điện tử; Cơ khí – thiết kế",
            "Nghiên cứu và chế tạo robot",
            "Tham gia các cuộc thi robot",
            "Kết nối, chia sẻ kiến thức tới cộng đồng",
          ],
          en: [
            "Code and electronics; mechanical design",
            "Robot research and building",
            "Robotics competitions",
            "Sharing knowledge with the community",
          ],
        },
      },
    ],
  },
  {
    id: "muc-tieu-dinh-huong",
    title: {
      vi: "2. Mục tiêu và định hướng phát triển",
      en: "2. Goals and Development Orientation",
    },
    blocks: [
      {
        type: "h",
        text: {
          vi: "Môi trường sáng tạo và kết nối",
          en: "Creative and connected environment",
        },
      },
      {
        type: "p",
        text: {
          vi: "Robotics Sóc Sơn hướng tới xây dựng một môi trường học tập, sáng tạo và kết nối dành cho những học sinh có chung niềm đam mê với khoa học, công nghệ và Robotics. Câu lạc bộ không chỉ là nơi các thành viên giao lưu, chia sẻ kiến thức và kinh nghiệm mà còn là sân chơi để cùng nhau khám phá, nghiên cứu, thử nghiệm và hiện thực hóa những ý tưởng sáng tạo trong lĩnh vực cơ khí, thiết kế và lập trình.",
          en: "Robotics Sóc Sơn aims to build a learning, creative, and connected environment for students who share a passion for science, technology, and robotics. The club is not only a place for members to interact and exchange knowledge and experience, but also a platform to explore, research, test, and realize innovative ideas in mechanics, design, and programming.",
        },
      },
      {
        type: "image",
        src: "/Images/Profile/robot-33518-assembly-workshop-session.webp",
        alt: { vi: "Thành viên lắp ráp khung robot 33518 quanh bàn thực hành", en: "Members assembling the robot 33518 chassis around a workshop table" },
        caption: { vi: "Buổi thực hành lắp ráp robot của CLB.", en: "A club robot assembly session." },
      },
      {
        type: "h",
        text: {
          vi: "Phát triển năng lực và chinh phục cuộc thi",
          en: "Capacity building and competition pursuit",
        },
      },
      {
        type: "p",
        text: {
          vi: "Bên cạnh việc phát triển kiến thức và kỹ năng chuyên môn, câu lạc bộ đặt mục tiêu xây dựng đội thi Robotics có năng lực, tích cực tham gia các sân chơi khoa học kỹ thuật từ cấp khu vực đến toàn quốc, từng bước chinh phục những thành tích mới, mang lại niềm tự hào cho nhà trường và câu lạc bộ.",
          en: "Alongside cultivating specialized knowledge and practical skills, the club aims to develop a capable robotics competition team that actively participates in regional and national STEM arenas, steadily achieving new milestones and bringing pride to the school and club.",
        },
      },
      {
        type: "h",
        text: {
          vi: "Lan tỏa kiến thức và trải nghiệm STEM",
          en: "Spreading STEM knowledge and experience",
        },
      },
      {
        type: "p",
        text: {
          vi: "Không chỉ giới hạn trong hoạt động nội bộ, Robotics Sóc Sơn còn mong muốn trở thành cầu nối đưa khoa học và công nghệ đến gần hơn với học sinh và cộng đồng. Thông qua việc tổ chức các workshop và hoạt động trải nghiệm thực tế, câu lạc bộ hướng tới khơi dậy niềm yêu thích khoa học kỹ thuật và mở rộng cơ hội tiếp cận Robotics cho thế hệ trẻ trong khu vực.",
          en: "Beyond internal club activities, Robotics Sóc Sơn strives to bridge science and technology with students and the wider community. By hosting hands-on workshops and experiential activities, the club aims to inspire a passion for engineering and expand access to robotics for local youth.",
        },
      },
      {
        type: "h",
        text: {
          vi: "Xây dựng cộng đồng gắn kết",
          en: "Building a cohesive community",
        },
      },
      {
        type: "p",
        text: {
          vi: "Với những định hướng đó, Robotics Sóc Sơn không chỉ mong muốn tạo ra những sản phẩm robot hay chinh phục các giải thưởng, mà còn hướng tới xây dựng một cộng đồng nơi mọi người kết nối, chia sẻ và cùng nhau sáng tạo.",
          en: "With these directions, Robotics Sóc Sơn aspires not only to build robots or win awards, but to foster an enduring community where people connect, share, and innovate together.",
        },
      },
    ],
  },
  {
    id: "thpt-soc-son",
    title: { vi: "3. Trường THPT Sóc Sơn", en: "3. Sóc Sơn High School" },
    blocks: [
      {
        type: "p",
        text: {
          vi: "Trường THPT Sóc Sơn là đơn vị chủ quản của CLB, trực thuộc Sở GD&ĐT Hà Nội. Trường bắt nguồn từ phân hiệu Phù Lỗ của THPT Kim Anh (19/09/1983), chính thức thành lập năm học 1984–1985, đạt chuẩn quốc gia năm 2014 và được công nhận lại năm 2021. Nhà trường tạo điều kiện cơ sở vật chất với phòng thực hành STEM để học sinh nghiên cứu, chế tạo và rèn luyện kỹ năng thực tiễn.",
          en: "Sóc Sơn High School is the governing institution of the club, under the Hanoi Department of Education and Training. Originating from the Phù Lỗ branch of Kim Anh High School (19/09/1983), the school was officially founded in the 1984–1985 academic year, accredited to national standards in 2014, and re-certified in 2021. The school provides facilities including an on-campus STEM lab for students to research, build, and practice practical skills.",
        },
      },
      {
        type: "table",
        head: { vi: ["Mục", "Nội dung"], en: ["Item", "Details"] },
        rows: {
          vi: [
            ["Tên trường", "Trường THPT Sóc Sơn, Sở GD&ĐT Hà Nội"],
            ["Địa chỉ", "Quốc lộ 2, xã Sóc Sơn, TP. Hà Nội"],
            ["Hiệu trưởng", "Cô Nguyễn Thị Diệu Thanh (Bí thư Chi bộ, Hiệu trưởng)"],
            ["Lịch sử thành lập", "Thành lập năm học 1984–1985 (tiền thân phân hiệu Phù Lỗ, 1983)"],
            ["Quy mô (2024–2025)", "43 lớp, gần 2.000 học sinh, 86 cán bộ, giáo viên, nhân viên"],
            ["Danh hiệu", "Đạt chuẩn quốc gia năm 2014, công nhận lại năm 2021"],
            ["Cơ sở vật chất STEM", "Phòng thực hành STEM đặt tại trường"],
            ["Liên hệ văn phòng", "(024) 3884 1042 • c3socson@hanoiedu.vn"],
          ],
          en: [
            ["School name", "Sóc Sơn High School, Hanoi Department of Education and Training"],
            ["Address", "National Road 2, Sóc Sơn commune, Hanoi"],
            ["Principal", "Ms. Nguyễn Thị Diệu Thanh (Party Secretary, Principal)"],
            ["Founding history", "Established in 1984–1985 school year (originally Phù Lỗ branch, 1983)"],
            ["School size (2024–2025)", "43 classes, nearly 2,000 students, 86 staff"],
            ["Accreditation", "National standard in 2014, re-certified in 2021"],
            ["STEM facilities", "On-campus STEM practice lab"],
            ["Office contact", "(024) 3884 1042 • c3socson@hanoiedu.vn"],
          ],
        },
      },
      {
        type: "image",
        src: "/Images/Profile/club-members-teachers-school-courtyard.webp",
        alt: { vi: "Thành viên câu lạc bộ chụp ảnh cùng giáo viên tại sân trường", en: "Club members with teachers in the school courtyard" },
        caption: { vi: "Thành viên CLB cùng giáo viên tại sân Trường THPT Sóc Sơn.", en: "Club members with teachers in the Sóc Sơn High School courtyard." },
      },
    ],
  },
  {
    id: "hanh-trinh",
    title: { vi: "4. Hành trình", en: "4. Journey" },
    blocks: [
      {
        type: "p",
        text: {
          vi: "CLB Robotics Sóc Sơn hình thành và hoạt động gần 5 năm, trải qua các cột mốc thi đấu và phát triển nổi bật dưới đây.",
          en: "Robotics Sóc Sơn has been operating for nearly 5 years, marked by key competition milestones and achievements below.",
        },
      },
      {
        type: "table",
        head: { vi: ["Mốc", "Nội dung"], en: ["Milestone", "Details"] },
        rows: {
          vi: [
            ["2023", "Top 3 Vietnam Robot Challenge (VRC) 2023"],
            ["2024", "Top 10 Vietnam Open Robotics Challenge (VORC) 2024"],
            ["2024–2025", "Top 11 FIRST Tech Challenge Việt Nam, đội #28762"],
            ["2025", "Á quân Motions in Fire tại STEAMESE Festival 2025"],
            ["2025–2026", "Tham gia FIRST Tech Challenge Việt Nam lần thứ hai"],
            ["2026–2027", "Chuẩn bị mùa BIOBUZZ, đội #39256 (xem mục 8)"],
          ],
          en: [
            ["2023", "Top 3, Vietnam Robot Challenge (VRC) 2023"],
            ["2024", "Top 10, Vietnam Open Robotics Challenge (VORC) 2024"],
            ["2024–2025", "Top 11, FIRST Tech Challenge Vietnam, team #28762"],
            ["2025", "Runner-up, Motions in Fire at STEAMESE Festival 2025"],
            ["2025–2026", "Second participation in FIRST Tech Challenge Vietnam"],
            ["2026–2027", "Preparing for BIOBUZZ, team #39256 (see section 8)"],
          ],
        },
      },
      {
        type: "note",
        text: {
          vi: "Chưa có dữ liệu được xác nhận về tên từng thế hệ và năm thành lập chính xác của CLB; sẽ bổ sung khi có.",
          en: "Names of individual generations and the exact founding year are not yet confirmed; they will be added when available.",
        },
      },
      {
        type: "image",
        src: "/Images/Profile/robocon-bac-ninh-team-pennant.webp",
        alt: { vi: "Đội cùng robot và cờ lưu niệm Giải Robocon Bắc Ninh Mở rộng 2024", en: "Team with a robot and the Bac Ninh Open Robocon 2024 pennant" },
        caption: { vi: "Đội cùng robot và cờ lưu niệm Giải Robocon Bắc Ninh Mở rộng 2024.", en: "Team with a robot and the Bac Ninh Open Robocon 2024 pennant." },
      },
    ],
  },
  {
    id: "con-nguoi",
    title: { vi: "5. Con người", en: "5. People" },
    blocks: [
      {
        type: "people",
        groups: {
          vi: [
            { title: "Giáo viên phụ trách", names: ["Trần Kim Anh"] },
            { title: "Mentor", names: ["Nguyễn Minh Nghĩa", "Trần Tuệ Minh", "Nguyễn Minh Nam"] },
            { title: "Chủ tịch", names: ["Nguyễn Bảo Ngọc"] },
            { title: "Phó chủ tịch", names: ["Nguyễn Thùy Dung"] },
          ],
          en: [
            { title: "Teacher in charge", names: ["Trần Kim Anh"] },
            { title: "Mentors", names: ["Nguyễn Minh Nghĩa", "Trần Tuệ Minh", "Nguyễn Minh Nam"] },
            { title: "President", names: ["Nguyễn Bảo Ngọc"] },
            { title: "Vice president", names: ["Nguyễn Thùy Dung"] },
          ],
        },
      },
      { type: "h", text: { vi: "Các ban chuyên môn", en: "Departments" } },
      {
        type: "people",
        groups: {
          vi: [
            { title: "Code – Điện tử", ...codeTeam },
            { title: "Cơ khí – Thiết kế", ...mechTeam },
            { title: "Truyền thông", ...mediaTeam("Chủ tịch") },
          ],
          en: [
            { title: "Code and Electronics", ...codeTeam },
            { title: "Mechanical and Design", ...mechTeam },
            { title: "Communications", ...mediaTeam("President") },
          ],
        },
      },
    ],
  },
  {
    id: "thanh-tich",
    title: { vi: "6. Thành tích", en: "6. Achievements" },
    blocks: [
      {
        type: "table",
        head: { vi: ["Năm", "Cuộc thi", "Kết quả"], en: ["Year", "Competition", "Result"] },
        rows: {
          vi: [
            ["2023", "Vietnam Robot Challenge", "Top 3"],
            ["2024", "Vietnam Open Robotics Challenge", "Top 10"],
            ["2024–2025", "FIRST Tech Challenge Việt Nam", "Top 11"],
            ["2025", "Motions in Fire, STEAMESE Festival", "Á quân"],
            ["2025–2026", "FIRST Tech Challenge Việt Nam", "Tham gia lần thứ hai"],
          ],
          en: [
            ["2023", "Vietnam Robot Challenge", "Top 3"],
            ["2024", "Vietnam Open Robotics Challenge", "Top 10"],
            ["2024–2025", "FIRST Tech Challenge Vietnam", "Top 11"],
            ["2025", "Motions in Fire, STEAMESE Festival", "Runner-up"],
            ["2025–2026", "FIRST Tech Challenge Vietnam", "Second participation"],
          ],
        },
      },
      {
        type: "p",
        text: {
          vi: "Bằng chứng: CLB lưu 28 tệp ảnh tư liệu gồm ảnh nhận giải, bảng kết quả của Ban tổ chức, robot trên sân và bản vẽ thiết kế.",
          en: "Evidence: The club keeps 28 archive photos including award photos, organiser result boards, robots on the field and design drawings.",
        },
      },
      {
        type: "image",
        src: "/Images/Achievements/VRC/IMG_0663.webp",
        alt: { vi: "Đội nhận giải tại Vietnam Robot Challenge", en: "Team receiving an award at Vietnam Robot Challenge" },
        caption: { vi: "Ảnh nhận giải, VRC.", en: "Award photo, VRC." },
      },
      {
        type: "image",
        src: "/Images/Profile/ftc-vietnam-competition-drive-team.webp",
        alt: { vi: "Đội điều khiển robot bên sân đấu FIRST Tech Challenge Vietnam", en: "Drive team beside the FIRST Tech Challenge Vietnam field" },
        caption: { vi: "Đội điều khiển robot tại FIRST Tech Challenge Vietnam.", en: "Drive team at FIRST Tech Challenge Vietnam." },
      },
    ],
  },
  {
    id: "giao-duc-cong-dong",
    title: { vi: "7. Giáo dục và cộng đồng", en: "7. Education and community" },
    blocks: [
      { type: "h", text: { vi: "Đã thực hiện", en: "Done" } },
      {
        type: "list",
        items: {
          vi: [
            "Workshop giao lưu, chia sẻ kiến thức và kinh nghiệm với các CLB Robotics lân cận.",
            "Dự án lớp học lập trình cơ bản cho các em nhỏ.",
          ],
          en: [
            "Exchange workshops sharing knowledge and experience with neighbouring robotics clubs.",
            "A basic programming class project for young children.",
          ],
        },
      },
      { type: "h", text: { vi: "Dự kiến", en: "Planned" } },
      {
        type: "list",
        items: {
          vi: [
            "Khóa học “Từ Khối Lệnh Đến Phần Cứng”: Hành trình 6+ bài từ Scratch đến mBlock/Arduino, dùng AI và flowchart draw.io để dạy giải quyết vấn đề. Chưa mở chính thức.",
            "Mở rộng workshop và hoạt động trải nghiệm STEM cho học sinh trong khu vực.",
          ],
          en: [
            "Course “From Blocks to Hardware”: A 6+ lesson journey from Scratch to mBlock/Arduino, using AI and draw.io flowcharts to teach problem solving. Not officially open yet.",
            "More workshops and hands-on STEM activities for students in the area.",
          ],
        },
      },
    ],
  },
  {
    id: "mua-2026-2027",
    title: { vi: "8. Mùa 2026–2027", en: "8. Season 2026–2027" },
    blocks: [
      {
        type: "p",
        text: {
          vi: "Mùa FIRST CANOPY với trò chơi BIOBUZZ presented by RTX. Đội đã khởi tạo hồ sơ đội #39256; chưa ghi nhận lịch thi đấu cụ thể. Mục tiêu: Dự giải FTC Việt Nam và cạnh tranh một trong 2 suất dự FIRST Championship.",
          en: "FIRST CANOPY season with the game BIOBUZZ presented by RTX. The team has created profile #39256; no specific match schedule is recorded yet. Goal: Compete in FTC Vietnam and contend for one of 2 FIRST Championship slots.",
        },
      },
      {
        type: "table",
        head: { vi: ["Mục", "Thông tin"], en: ["Item", "Details"] },
        rows: {
          vi: [
            ["Kickoff toàn cầu", "12/09/2026"],
            ["Đơn vị tổ chức tại Việt Nam", "Trường Đại học FPT; lễ phát động sáng 09/10/2026"],
            ["Quy mô dự kiến", "40 đội (5–7 đội quốc tế), miễn lệ phí, 27 giải thưởng"],
            ["Suất thi đấu thế giới", "2 suất FIRST Championship, Houston, Mỹ, 28/04–01/05/2027"],
            ["Thể thức trận", "2 phút 30 giây: 30 giây tự hành, 2 phút điều khiển tay"],
            ["Kích thước robot ban đầu", "Trong khối 18×18×18 inch"],
            ["Lịch thi đấu tại Việt Nam", "Chưa công bố. Mốc 05/02 và 15/02/2027 chỉ là dự kiến"],
            ["Hạn đăng ký thi đấu", "Chưa có thông báo chính thức"],
          ],
          en: [
            ["Global kickoff", "12/09/2026"],
            ["Vietnam organiser", "FPT University; launch ceremony morning of 09/10/2026"],
            ["Expected scale", "40 teams (5–7 international), free entry, 27 awards"],
            ["World slots", "2 FIRST Championship slots, Houston, USA, 28/04–01/05/2027"],
            ["Match format", "2 min 30 s: 30 s autonomous, 2 min driver-controlled"],
            ["Starting robot size", "Within an 18×18×18 inch cube"],
            ["Vietnam schedule", "Not announced. 05/02 and 15/02/2027 are tentative only"],
            ["Registration deadline", "No official announcement yet"],
          ],
        },
      },
      {
        type: "note",
        text: {
          vi: "Nhu cầu chính của mùa: Mua phần cứng thi đấu (mục 9). Tiến độ: Đợt mua 1 trước 20/11/2026, đợt 2 trước 05/12/2026. Số tiền mặt và hiện vật CLB đang có chưa được xác nhận.",
          en: "Main need this season: Competition hardware (section 9). Timeline: Purchase batch 1 by 20/11/2026, batch 2 by 05/12/2026. Cash and in-kind assets the club already holds are not yet confirmed.",
        },
      },
    ],
  },
  {
    id: "ngan-sach",
    title: { vi: "9. Ngân sách", en: "9. Budget" },
    blocks: [
      {
        type: "table",
        head: {
          vi: ["STT", "Hạng mục", "SL", "Đơn giá (VNĐ)", "Thành tiền (VNĐ)"],
          en: ["No.", "Item", "Qty", "Unit price (VND)", "Amount (VND)"],
        },
        rows: same([
          ["1", "REV Control Hub", "1", "11.716.000", "11.716.000"],
          ["2", "goBILDA Viper Slide Kit 4 tầng / 4-stage", "1", "5.830.000", "5.830.000"],
          ["3", "REV 12V Slim NiMH battery", "2", "2.028.000", "4.056.000"],
          ["4", "goBILDA 5202 Yellow Jacket motor", "2", "1.372.500", "2.745.000"],
          ["5", "REV UltraPlanetary HD Hex motor", "2", "1.639.000", "3.278.000"],
          ["6", "Logitech C920 camera", "1", "1.850.000", "1.850.000"],
          ["7", "Wera hex key set", "1", "850.000", "850.000"],
          ["8", "Wowstick 1F+ electric screwdriver", "1", "650.000", "650.000"],
          ["", "Tổng phần cứng / Hardware total (11 devices)", "11", "", "30.975.000"],
          ["", "Dự phòng kỹ thuật và tỷ giá / Contingency and FX", "", "", "3.000.000"],
          ["", "Tổng mục tiêu / Total target", "", "", "33.975.000"],
        ]),
      },
      {
        type: "list",
        items: {
          vi: [
            "Đợt 1 (trước 20/11/2026): Control Hub và Viper Slide, 17.546.000 VNĐ.",
            "Đợt 2 (trước 05/12/2026): Thiết bị còn lại, 16.429.000 VNĐ.",
            "Tỷ giá tính toán 25.800 VNĐ/USD; giá goBILDA đã áp mã giảm 25% cho đội FTC; đã gồm vận chuyển, thuế, VAT nhập khẩu.",
            "Chưa gồm: Vật tư gia công thử nghiệm, in 3D, đồng phục, di chuyển, kinh phí dự thi quốc tế tại Mỹ.",
            "Nguồn đã có: Chưa xác nhận số tiền mặt và hiện vật CLB đang có.",
          ],
          en: [
            "Batch 1 (by 20/11/2026): Control Hub and Viper Slide, 17,546,000 VND.",
            "Batch 2 (by 05/12/2026): Remaining devices, 16,429,000 VND.",
            "Exchange rate 25,800 VND/USD; goBILDA prices use the 25% FTC team discount; shipping, import tax and VAT included.",
            "Not included: Prototyping materials, 3D printing, uniforms, travel, international event costs in the USA.",
            "Existing funds: Cash and in-kind assets held by the club are not yet confirmed.",
          ],
        },
      },
    ],
  },
  {
    id: "dong-hanh",
    title: { vi: "10. Giá trị đồng hành và kết nối", en: "10. Partnership and connection value" },
    blocks: [
      {
        type: "h",
        text: {
          vi: "01. Giá trị dành cho học sinh",
          en: "01. Value for students",
        },
      },
      {
        type: "p",
        text: {
          vi: "Robotics Sóc Sơn mang đến môi trường học tập và sáng tạo, nơi mỗi thành viên có thể khám phá đam mê công nghệ, phát triển kỹ năng và tích lũy những trải nghiệm thực tế.",
          en: "Robotics Sóc Sơn provides a learning and creative environment where every member can explore a passion for technology, develop skills, and gain practical experience.",
        },
      },
      {
        type: "list",
        items: {
          vi: [
            "Kiến thức chuyên môn và trải nghiệm thực tiễn: Thông qua các hoạt động nghiên cứu, thiết kế và chế tạo robot, các thành viên có cơ hội tiếp cận và ứng dụng kiến thức về cơ khí, thiết kế 3D, điện tử và lập trình vào thực tế, từ đó tích lũy kinh nghiệm và nâng cao năng lực chuyên môn.",
            "Khả năng tự học: Với sự định hướng và chia sẻ kinh nghiệm từ các thế hệ đi trước, mỗi thành viên chủ động tìm tòi, nghiên cứu và tự khám phá kiến thức trước khi cùng nhau trao đổi, ứng dụng vào thực tế. Cách tiếp cận này giúp hình thành tư duy học tập độc lập, nâng cao khả năng giải quyết vấn đề và tạo nền tảng cho sự phát triển lâu dài.",
            "Kỹ năng làm việc nhóm và tư duy phản biện: Thông qua quá trình cùng nhau nghiên cứu và thực hiện các dự án, mỗi thành viên được rèn luyện khả năng phối hợp, lắng nghe và trao đổi ý tưởng. Những buổi thảo luận, tranh luận và tìm kiếm giải pháp cũng giúp mọi người phát triển tư duy phản biện và biết đánh giá vấn đề từ nhiều góc độ.",
            "Cơ hội phát triển và kết nối: Các cuộc thi Robotics và hoạt động giao lưu mở ra môi trường để thành viên thử thách bản thân, học hỏi từ những đội thi khác và kết nối với cộng đồng yêu thích khoa học công nghệ.",
            "Lan tỏa STEM và đam mê công nghệ: Thông qua các hoạt động, Robotics Sóc Sơn mong muốn đưa khoa học kỹ thuật đến gần hơn với học sinh trong trường, khơi dậy niềm đam mê công nghệ và mở rộng cơ hội tiếp cận trong lĩnh vực STEM.",
          ],
          en: [
            "Technical knowledge and practical experience: Through robot research, design, and manufacturing, members gain hands-on access to mechanics, 3D design, electronics, and programming, enhancing specialized expertise.",
            "Self-learning capability: Guided by experienced seniors, members proactively explore and research concepts before collaborating on practical applications, cultivating independent problem-solving mindsets.",
            "Teamwork and critical thinking: Collaborating on projects sharpens communication, active listening, and constructive debate, fostering multi-perspective problem evaluation.",
            "Growth and networking opportunities: Robotics tournaments and exchange events provide avenues to test capabilities, learn from peer teams, and network with the STEM community.",
            "Spreading STEM passion: Through outreach, the club brings science and technology closer to fellow students, sparking interest and broadening STEM access.",
          ],
        },
      },
      {
        type: "h",
        text: {
          vi: "02. Giá trị đối với đối tác & nhà tài trợ",
          en: "02. Value for partners and sponsors",
        },
      },
      {
        type: "p",
        text: {
          vi: "Sự đồng hành của các đối tác và nhà tài trợ không chỉ góp phần tạo điều kiện cho Robotics Sóc Sơn phát triển mà còn mở ra cơ hội hợp tác, kết nối và cùng lan tỏa những giá trị tích cực trong lĩnh vực giáo dục STEM. Thông qua các hoạt động của câu lạc bộ, hai bên có thể cùng xây dựng mối quan hệ hợp tác ý nghĩa và lâu dài.",
          en: "Sponsorship fosters mutual growth and collaborative connections, spreading positive impact across STEM education and building sustainable partnerships.",
        },
      },
      {
        type: "list",
        items: {
          vi: [
            "Lan tỏa hình ảnh và thương hiệu: Robotics Sóc Sơn cam kết đảm bảo quyền lợi truyền thông cho nhà tài trợ thông qua việc quảng bá và nhận diện thương hiệu trên các sản phẩm merchandise, nền tảng truyền thông số và các chiến dịch, chuỗi hoạt động truyền thông của câu lạc bộ.",
            "Mở rộng kết nối cộng đồng: Việc hợp tác với Robotics Sóc Sơn tạo cơ hội để các đối tác mở rộng mối quan hệ với học sinh, giáo viên, các câu lạc bộ Robotics và cộng đồng yêu thích STEM.",
            "Đồng hành phát triển thế hệ trẻ: Sự hỗ trợ từ các nhà tài trợ góp phần tạo điều kiện để học sinh tiếp cận công nghệ, phát triển kỹ năng và phát huy khả năng sáng tạo.",
            "Kiến tạo giá trị bền vững: Thông qua các dự án, workshop và hoạt động STEM, đối tác sẽ cùng câu lạc bộ lan tỏa kiến thức và tạo ra những giá trị thiết thực cho nhà trường và cộng đồng.",
            "Danh xưng khi truyền thông: “Nhà tài trợ của Đội #39256”. Không dùng “Nhà tài trợ chính thức của FIRST”.",
          ],
          en: [
            "Brand visibility and awareness: Robotics Sóc Sơn guarantees promotional benefits across merchandise, digital media channels, and public campaign activities.",
            "Community engagement: Partnership opens avenues to connect directly with students, teachers, robotics clubs, and the broader STEM community.",
            "Youth development support: Sponsor contributions enable students to access advanced equipment, develop essential skills, and unleash creativity.",
            "Sustainable value creation: Partnering on workshops and STEM initiatives delivers tangible benefits to schools and local communities.",
            "Wording: “Sponsor of Team #39256”. Do not use “Official FIRST sponsor”.",
          ],
        },
      },
      { type: "h", text: { vi: "Hình thức hỗ trợ", en: "Ways to support" } },
      {
        type: "list",
        items: {
          vi: [
            "Tài trợ tiền theo mục tiêu ngân sách ở mục 9.",
            "Hỗ trợ hiện vật: Linh kiện, thiết bị, vật tư, in 3D, đồng phục.",
            "Hỗ trợ chuyên môn: Mentor, hướng dẫn kỹ thuật, workshop.",
          ],
          en: [
            "Cash sponsorship toward the budget target in section 9.",
            "In-kind support: Components, equipment, materials, 3D printing, uniforms.",
            "Expertise: Mentoring, technical guidance, workshops.",
          ],
        },
      },
      {
        type: "note",
        text: {
          vi: "Các hạng gói tài trợ và mức tiền cụ thể chưa chốt trong hồ sơ này. Vui lòng liên hệ để trao đổi theo nhu cầu của đơn vị.",
          en: "Sponsorship tiers and amounts are not finalised in this profile. Please get in touch to discuss what fits your organisation.",
        },
      },
    ],
  },
  {
    id: "minh-bach-lien-he",
    title: { vi: "11. Minh bạch và liên hệ", en: "11. Transparency and contact" },
    blocks: [
      {
        type: "list",
        items: {
          vi: [
            "Tiếp nhận: Liên hệ qua email, CLB phản hồi và thống nhất hình thức hỗ trợ.",
            "Sử dụng: Mọi khoản tiền được chi theo các hạng mục ở mục 9.",
            "Báo cáo: CLB công khai kết quả mua sắm và mùa giải cho nhà tài trợ. Quy trình và tần suất báo cáo chi tiết chưa chốt.",
          ],
          en: [
            "Intake: Contact us by email; the club replies and agrees the form of support.",
            "Use of funds: All money is spent on the items in section 9.",
            "Reporting: The club shares purchase and season results with sponsors. Detailed process and frequency are not yet finalised.",
          ],
        },
      },
      {
        type: "table",
        head: { vi: ["Kênh", "Thông tin"], en: ["Channel", "Details"] },
        rows: {
          vi: [
            ["Email", `[${PROFILE_EMAIL}](mailto:${PROFILE_EMAIL})`],
            ["Website", "[roboticssocson.minhmice.com](https://roboticssocson.minhmice.com)"],
            ["Facebook", "[Robotics Sóc Sơn](https://www.facebook.com/roboticssocson/)"],
            ["Instagram", "[@roboticssocson](https://www.instagram.com/roboticssocson/)"],
            ["TikTok", "[@roboticssocson](https://www.tiktok.com/@roboticssocson)"],
          ],
          en: [
            ["Email", `[${PROFILE_EMAIL}](mailto:${PROFILE_EMAIL})`],
            ["Website", "[roboticssocson.minhmice.com](https://roboticssocson.minhmice.com)"],
            ["Facebook", "[Robotics Sóc Sơn](https://www.facebook.com/roboticssocson/)"],
            ["Instagram", "[@roboticssocson](https://www.instagram.com/roboticssocson/)"],
            ["TikTok", "[@roboticssocson](https://www.tiktok.com/@roboticssocson)"],
          ],
        },
      },
      {
        type: "note",
        text: {
          vi: "Thông tin thanh toán chính thức chưa được chốt, nên chưa đăng ở đây. Vui lòng liên hệ qua email để nhận thông tin chuyển khoản đã xác nhận.",
          en: "Official payment details are not finalised and are therefore not published here. Please email us to receive confirmed transfer details.",
        },
      },
    ],
  },
];
