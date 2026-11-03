import type { Localized } from "@/lib/i18n/localized";

export type ProfileBlock =
  | { type: "p"; text: Localized<string> }
  | { type: "h"; text: Localized<string> }
  | { type: "list"; items: Localized<string[]> }
  | { type: "table"; head: Localized<string[]>; rows: Localized<string[][]> }
  | { type: "note"; text: Localized<string> }
  | { type: "image"; src: string; alt: Localized<string>; caption: Localized<string> };

export type ProfileSection = {
  id: string;
  title: Localized<string>;
  blocks: ProfileBlock[];
};

const same = <T,>(v: T): Localized<T> => ({ vi: v, en: v });

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
      "Hồ sơ đầy đủ của CLB Robotics Sóc Sơn: lịch sử, con người, thành tích, mùa giải FTC 2026–2027, ngân sách và gói đồng hành.",
    canonicalPath: "/profile",
    keywords: ["hồ sơ Robotics Sóc Sơn", "tài trợ FTC", "Robotics Sóc Sơn", "FIRST Tech Challenge"],
  },
  en: {
    title: "Robotics Sóc Sơn Club Profile | For Sponsors",
    description:
      "Full profile of Robotics Sóc Sơn: history, people, achievements, FTC 2026–2027 season, budget and sponsorship options.",
    canonicalPath: "/profile",
    keywords: ["Robotics Soc Son profile", "FTC sponsorship", "Robotics Soc Son", "FIRST Tech Challenge"],
  },
};

export const profileSections: ProfileSection[] = [
  {
    id: "tong-quan",
    title: { vi: "1. Tổng quan", en: "1. Overview" },
    blocks: [
      {
        type: "p",
        text: {
          vi: "Robotics Sóc Sơn là câu lạc bộ khoa học – công nghệ trực thuộc Trường THPT Sóc Sơn, Hà Nội. CLB hình thành từ niềm đam mê công nghệ của một nhóm học sinh và đã hoạt động gần 5 năm. CLB không chỉ chế tạo robot và đi thi, mà còn là nơi các thành viên học hỏi, chia sẻ kiến thức và tạo giá trị cho nhà trường và cộng đồng.",
          en: "Robotics Sóc Sơn is a science and technology club of Sóc Sơn High School, Hanoi. It grew from a group of students passionate about technology and has run for nearly 5 years. The club does more than build robots and compete: members learn, share knowledge and create value for the school and community.",
        },
      },
      {
        type: "table",
        head: { vi: ["Mục", "Nội dung"], en: ["Item", "Details"] },
        rows: {
          vi: [
            ["Tên CLB", "Robotics Sóc Sơn (Robotics Soc Son)"],
            ["Đơn vị chủ quản", "Trường THPT Sóc Sơn, Sở GD&ĐT Hà Nội"],
            ["Địa chỉ trường", "Quốc lộ 2, xã Sóc Sơn, TP. Hà Nội"],
            ["Quy mô trường (2024–2025)", "43 lớp, gần 2.000 học sinh, 86 cán bộ, giáo viên, nhân viên"],
            ["Website", "roboticssocson.minhmice.com"],
            ["Email", PROFILE_EMAIL],
            ["Mạng xã hội", "Facebook: Robotics Sóc Sơn • Instagram và TikTok: @roboticssocson"],
          ],
          en: [
            ["Club name", "Robotics Sóc Sơn (Robotics Soc Son)"],
            ["Parent organisation", "Sóc Sơn High School, Hanoi Department of Education and Training"],
            ["School address", "National Road 2, Sóc Sơn commune, Hanoi"],
            ["School size (2024–2025)", "43 classes, nearly 2,000 students, 86 staff"],
            ["Website", "roboticssocson.minhmice.com"],
            ["Email", PROFILE_EMAIL],
            ["Social", "Facebook: Robotics Sóc Sơn • Instagram and TikTok: @roboticssocson"],
          ],
        },
      },
      { type: "h", text: { vi: "Giá trị cốt lõi", en: "Core values" } },
      {
        type: "list",
        items: {
          vi: [
            "Sáng tạo: không ngừng tìm tòi, hiện thực hóa ý tưởng mới.",
            "Năng động: chủ động học hỏi, tích cực trải nghiệm và thử thách.",
            "Đột phá: vượt qua giới hạn, tạo nên giá trị khác biệt.",
          ],
          en: [
            "Creativity: keep exploring and turning new ideas into reality.",
            "Dynamism: learn proactively, embrace experience and challenge.",
            "Breakthrough: push past limits and create distinct value.",
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
    id: "hanh-trinh",
    title: { vi: "2. Hành trình", en: "2. Journey" },
    blocks: [
      {
        type: "p",
        text: {
          vi: "Trường THPT Sóc Sơn bắt nguồn từ phân hiệu Phù Lỗ của THPT Kim Anh (19/09/1983), chính thức thành lập năm học 1984–1985, đạt chuẩn quốc gia năm 2014 và được công nhận lại năm 2021. CLB Robotics hình thành và hoạt động gần 5 năm, theo các mùa thi đấu dưới đây.",
          en: "Sóc Sơn High School began as the Phù Lỗ branch of Kim Anh High School (19/09/1983), was formally founded in the 1984–1985 school year, reached national standard in 2014 and was re-certified in 2021. The robotics club has run for nearly 5 years, through the seasons below.",
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
            ["2026–2027", "Chuẩn bị mùa BIOBUZZ, đội #39256 (xem mục 7)"],
          ],
          en: [
            ["2023", "Top 3, Vietnam Robot Challenge (VRC) 2023"],
            ["2024", "Top 10, Vietnam Open Robotics Challenge (VORC) 2024"],
            ["2024–2025", "Top 11, FIRST Tech Challenge Vietnam, team #28762"],
            ["2025", "Runner-up, Motions in Fire at STEAMESE Festival 2025"],
            ["2025–2026", "Second participation in FIRST Tech Challenge Vietnam"],
            ["2026–2027", "Preparing for BIOBUZZ, team #39256 (see section 7)"],
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
    ],
  },
  {
    id: "con-nguoi",
    title: { vi: "3. Con người", en: "3. People" },
    blocks: [
      {
        type: "table",
        head: { vi: ["Vai trò", "Họ tên"], en: ["Role", "Name"] },
        rows: {
          vi: [
            ["Giáo viên phụ trách", "Trần Kim Anh"],
            ["Mentor", "Nguyễn Minh Nghĩa, Trần Tuệ Minh, Nguyễn Minh Nam"],
            ["Chủ tịch", "Nguyễn Bảo Ngọc"],
            ["Phó chủ tịch", "Nguyễn Thùy Dung"],
          ],
          en: [
            ["Teacher in charge", "Trần Kim Anh"],
            ["Mentors", "Nguyễn Minh Nghĩa, Trần Tuệ Minh, Nguyễn Minh Nam"],
            ["President", "Nguyễn Bảo Ngọc"],
            ["Vice president", "Nguyễn Thùy Dung"],
          ],
        },
      },
      { type: "h", text: { vi: "Các ban chuyên môn", en: "Departments" } },
      {
        type: "table",
        head: { vi: ["Ban", "Trưởng ban", "Thành viên"], en: ["Department", "Lead", "Members"] },
        rows: {
          vi: [
            [
              "Code – Điện tử",
              "Sơn",
              "Quang Trình, Đức Vinh, Thanh Phong, Hoàng Lâm, Đức Anh, Nhật Tùng, Châu Anh",
            ],
            [
              "Cơ khí – Thiết kế",
              "Đạt",
              "Trọng Hùng, Anh Duy, Duy Phong, Bảo Ngọc, Thanh Tùng, Kiến Huy, Quốc Phong, Thùy Ngân",
            ],
            ["Truyền thông", "Chí Huy", "Ngọc Thảo, Hải Anh, Quỳnh Anh, Thu Hà, Ngân Hà, Thảo Anh"],
          ],
          en: [
            [
              "Code and Electronics",
              "Sơn",
              "Quang Trình, Đức Vinh, Thanh Phong, Hoàng Lâm, Đức Anh, Nhật Tùng, Châu Anh",
            ],
            [
              "Mechanical and Design",
              "Đạt",
              "Trọng Hùng, Anh Duy, Duy Phong, Bảo Ngọc, Thanh Tùng, Kiến Huy, Quốc Phong, Thùy Ngân",
            ],
            ["Communications", "Chí Huy", "Ngọc Thảo, Hải Anh, Quỳnh Anh, Thu Hà, Ngân Hà, Thảo Anh"],
          ],
        },
      },
    ],
  },
  {
    id: "robot-du-an",
    title: { vi: "4. Robot và dự án", en: "4. Robots and projects" },
    blocks: [
      {
        type: "p",
        text: {
          vi: "Đội thiết kế và chế tạo robot cho từng cuộc thi, từ bản vẽ CAD 2D/3D, cơ khí, điện tử đến lập trình điều khiển. Mùa 2024–2025 đội thi FTC với robot #28762.",
          en: "The team designs and builds a robot for each competition, from 2D/3D CAD to mechanics, electronics and control software. In 2024–2025 the team competed in FTC with robot #28762.",
        },
      },
      {
        type: "image",
        src: "/Images/Achievements/FTC 2024-2025/Image  (1).webp",
        alt: { vi: "Robot FTC #28762 của Robotics Sóc Sơn", en: "Robotics Sóc Sơn FTC robot #28762" },
        caption: { vi: "Robot FTC #28762, mùa 2024–2025.", en: "FTC robot #28762, 2024–2025 season." },
      },
      {
        type: "note",
        text: {
          vi: "Mô tả chi tiết bài toán, đóng góp kỹ thuật của từng thành viên và kết quả đo được của từng robot chưa được xác nhận; sẽ bổ sung khi đội hoàn tất tổng hợp.",
          en: "Detailed problem statements, per-member technical contributions and measured results for each robot are not yet confirmed and will be added once compiled.",
        },
      },
    ],
  },
  {
    id: "thanh-tich",
    title: { vi: "5. Thành tích", en: "5. Achievements" },
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
          en: "Evidence: the club keeps 28 archive photos including award photos, organiser result boards, robots on the field and design drawings.",
        },
      },
      {
        type: "image",
        src: "/Images/Achievements/VRC/IMG_0663.webp",
        alt: { vi: "Đội nhận giải tại Vietnam Robot Challenge", en: "Team receiving an award at Vietnam Robot Challenge" },
        caption: { vi: "Ảnh nhận giải, VRC.", en: "Award photo, VRC." },
      },
    ],
  },
  {
    id: "giao-duc-cong-dong",
    title: { vi: "6. Giáo dục và cộng đồng", en: "6. Education and community" },
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
            "Khóa học “Từ Khối Lệnh Đến Phần Cứng”: hành trình 6+ bài từ Scratch đến mBlock/Arduino, dùng AI và flowchart draw.io để dạy giải quyết vấn đề. Chưa mở chính thức.",
            "Mở rộng workshop và hoạt động trải nghiệm STEM cho học sinh trong khu vực.",
          ],
          en: [
            "Course “From Blocks to Hardware”: a 6+ lesson journey from Scratch to mBlock/Arduino, using AI and draw.io flowcharts to teach problem solving. Not officially open yet.",
            "More workshops and hands-on STEM activities for students in the area.",
          ],
        },
      },
    ],
  },
  {
    id: "mua-2026-2027",
    title: { vi: "7. Mùa 2026–2027", en: "7. Season 2026–2027" },
    blocks: [
      {
        type: "p",
        text: {
          vi: "Mùa FIRST CANOPY với trò chơi BIOBUZZ presented by RTX. Đội đã khởi tạo hồ sơ đội #39256; chưa ghi nhận lịch thi đấu cụ thể. Mục tiêu: dự giải FTC Việt Nam và cạnh tranh một trong 2 suất dự FIRST Championship.",
          en: "FIRST CANOPY season with the game BIOBUZZ presented by RTX. The team has created profile #39256; no specific match schedule is recorded yet. Goal: compete in FTC Vietnam and contend for one of 2 FIRST Championship slots.",
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
          vi: "Nhu cầu chính của mùa: mua phần cứng thi đấu (mục 8). Tiến độ: đợt mua 1 trước 20/11/2026, đợt 2 trước 05/12/2026. Số tiền mặt và hiện vật CLB đang có chưa được xác nhận.",
          en: "Main need this season: competition hardware (section 8). Timeline: purchase batch 1 by 20/11/2026, batch 2 by 05/12/2026. Cash and in-kind assets the club already holds are not yet confirmed.",
        },
      },
    ],
  },
  {
    id: "ngan-sach",
    title: { vi: "8. Ngân sách", en: "8. Budget" },
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
            "Đợt 2 (trước 05/12/2026): thiết bị còn lại, 16.429.000 VNĐ.",
            "Tỷ giá tính toán 25.800 VNĐ/USD; giá goBILDA đã áp mã giảm 25% cho đội FTC; đã gồm vận chuyển, thuế, VAT nhập khẩu.",
            "Chưa gồm: vật tư gia công thử nghiệm, in 3D, đồng phục, di chuyển, kinh phí dự thi quốc tế tại Mỹ.",
            "Nguồn đã có: chưa xác nhận số tiền mặt và hiện vật CLB đang có.",
          ],
          en: [
            "Batch 1 (by 20/11/2026): Control Hub and Viper Slide, 17,546,000 VND.",
            "Batch 2 (by 05/12/2026): remaining devices, 16,429,000 VND.",
            "Exchange rate 25,800 VND/USD; goBILDA prices use the 25% FTC team discount; shipping, import tax and VAT included.",
            "Not included: prototyping materials, 3D printing, uniforms, travel, international event costs in the USA.",
            "Existing funds: cash and in-kind assets held by the club are not yet confirmed.",
          ],
        },
      },
    ],
  },
  {
    id: "dong-hanh",
    title: { vi: "9. Đồng hành", en: "9. Partnership" },
    blocks: [
      { type: "h", text: { vi: "Quyền lợi cho đối tác", en: "Benefits for partners" } },
      {
        type: "list",
        items: {
          vi: [
            "Nhận diện thương hiệu trên merchandise, nền tảng truyền thông số và các chiến dịch của CLB.",
            "Kết nối với học sinh, giáo viên, các CLB Robotics và cộng đồng STEM.",
            "Đồng hành phát triển thế hệ trẻ, cùng lan tỏa các dự án và workshop STEM.",
            "Danh xưng khi truyền thông: “Nhà tài trợ của Đội #39256”. Không dùng “Nhà tài trợ chính thức của FIRST”.",
          ],
          en: [
            "Brand visibility on merchandise, digital platforms and club campaigns.",
            "Connection with students, teachers, robotics clubs and the STEM community.",
            "Support young talent and spread STEM projects and workshops together.",
            "Wording: “Sponsor of Team #39256”. Do not use “Official FIRST sponsor”.",
          ],
        },
      },
      { type: "h", text: { vi: "Hình thức hỗ trợ", en: "Ways to support" } },
      {
        type: "list",
        items: {
          vi: [
            "Tài trợ tiền theo mục tiêu ngân sách ở mục 8.",
            "Hỗ trợ hiện vật: linh kiện, thiết bị, vật tư, in 3D, đồng phục.",
            "Hỗ trợ chuyên môn: mentor, hướng dẫn kỹ thuật, workshop.",
          ],
          en: [
            "Cash sponsorship toward the budget target in section 8.",
            "In-kind support: components, equipment, materials, 3D printing, uniforms.",
            "Expertise: mentoring, technical guidance, workshops.",
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
    title: { vi: "10. Minh bạch và liên hệ", en: "10. Transparency and contact" },
    blocks: [
      {
        type: "list",
        items: {
          vi: [
            "Tiếp nhận: liên hệ qua email, CLB phản hồi và thống nhất hình thức hỗ trợ.",
            "Sử dụng: mọi khoản tiền được chi theo các hạng mục ở mục 8.",
            "Báo cáo: CLB công khai kết quả mua sắm và mùa giải cho nhà tài trợ. Quy trình và tần suất báo cáo chi tiết chưa chốt.",
          ],
          en: [
            "Intake: contact us by email; the club replies and agrees the form of support.",
            "Use of funds: all money is spent on the items in section 8.",
            "Reporting: the club shares purchase and season results with sponsors. Detailed process and frequency are not yet finalised.",
          ],
        },
      },
      {
        type: "table",
        head: { vi: ["Kênh", "Thông tin"], en: ["Channel", "Details"] },
        rows: {
          vi: [
            ["Email", PROFILE_EMAIL],
            ["Website", "roboticssocson.minhmice.com"],
            ["Facebook", "Robotics Sóc Sơn"],
            ["Instagram, TikTok", "@roboticssocson"],
          ],
          en: [
            ["Email", PROFILE_EMAIL],
            ["Website", "roboticssocson.minhmice.com"],
            ["Facebook", "Robotics Sóc Sơn"],
            ["Instagram, TikTok", "@roboticssocson"],
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
