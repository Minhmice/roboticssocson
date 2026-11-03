import type { Localized } from "@/lib/i18n/localized";

export type ResourceStatus = "ready" | "soon";

export interface ResourceCategory {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
}

export interface ResourceArticle {
  slug: string;
  categoryId: string;
  title: Localized<string>;
  summary: Localized<string>;
  status: ResourceStatus;
  tags: readonly string[];
  lastUpdated: string;
  previewTopics?: Localized<readonly string[]>;
}

export const RESOURCE_CATEGORIES: readonly ResourceCategory[] = [
  {
    id: "rules",
    title: { vi: "Rules", en: "Rules" },
    description: {
      vi: "Tra cứu sổ tay FIRST® Tech Challenge. Bản dịch cộng đồng tiếng Việt; văn bản tiếng Anh của FIRST là căn cứ chính thức.",
      en: "Search the FIRST® Tech Challenge manual. Vietnamese community translation; FIRST’s English text remains authoritative.",
    },
  },
  {
    id: "ftc-components",
    title: { vi: "FTC Components", en: "FTC Components" },
    description: {
      vi: "Phần cứng robot FTC: hub điều khiển, động cơ, servo, cảm biến và hệ truyền động.",
      en: "FTC robot hardware: control hubs, motors, servos, sensors and drivetrains.",
    },
  },
  {
    id: "ftc-knowledge",
    title: { vi: "Kiến thức FTC", en: "FTC Knowledge" },
    description: {
      vi: "Tìm hiểu trận đấu, hồ sơ kỹ thuật và phỏng vấn ban giám khảo.",
      en: "Understand matches, engineering portfolios and judging interviews.",
    },
  },
  {
    id: "robotics-general",
    title: { vi: "Robotics tổng quát", en: "General Robotics" },
    description: {
      vi: "Nền tảng cơ khí, điện và điều khiển dành cho người mới bắt đầu.",
      en: "Mechanical, electrical and control fundamentals for new builders.",
    },
  },
  {
    id: "programming",
    title: { vi: "Lập trình FTC", en: "FTC Programming" },
    description: {
      vi: "Kiến trúc phần mềm FTC Java, thuật toán tự hành, thị giác máy tính AprilTag và điều khiển chuyển động.",
      en: "FTC Java software architecture, autonomous algorithms, AprilTag computer vision and motion control.",
    },
  },
];

export const RESOURCE_ARTICLES: readonly ResourceArticle[] = [
  // FTC Components (10 articles)
  {
    slug: "control-and-expansion-hub",
    categoryId: "ftc-components",
    title: {
      vi: "REV Control Hub & Expansion Hub: Kiến trúc điều khiển FTC",
      en: "REV Control Hub & Expansion Hub: FTC Control Architecture",
    },
    summary: {
      vi: "Phân tích cổng kết nối, cấp nguồn 12V, giao tiếp RS-485, motor port và module I2C/Digital/Analog an toàn cho robot.",
      en: "Port breakdown, 12V power distribution, RS-485 communication, motor ports and safe I2C/Digital/Analog wiring for FTC robots.",
    },
    status: "ready",
    tags: ["Hardware", "REV", "Control Hub", "Electronics"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "motors-and-servos",
    categoryId: "ftc-components",
    title: {
      vi: "Động cơ giảm tốc & Smart Servo: Lựa chọn lực kéo và tốc độ",
      en: "Planetary Gearmotors & Smart Servos: Torque vs. Speed Selection",
    },
    summary: {
      vi: "So sánh tỉ số truyền REV UltraPlanetary, goBILDA Yellow Jacket, cách tính lực nâng tay đòn và bảo vệ servo không cháy.",
      en: "Comparing gear ratios for REV UltraPlanetary and goBILDA Yellow Jacket, arm torque calculations, and servo burnout protection.",
    },
    status: "ready",
    tags: ["Motors", "Servos", "Mechanisms", "goBILDA", "REV"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "sensors-guide",
    categoryId: "ftc-components",
    title: {
      vi: "Cảm biến trong FTC: Màu sắc, khoảng cách ToF và Touch Sensor",
      en: "FTC Sensors Guide: Color, Time-of-Flight Distance & Touch Sensors",
    },
    summary: {
      vi: "Hướng dẫn tích hợp cảm biến REV Color Sensor v3, cảm biến khoảng cách 2m và micro switch vào chiến thuật tự hành.",
      en: "Integration guide for REV Color Sensor v3, 2-meter distance sensors, and limit switches for robust autonomous routines.",
    },
    status: "ready",
    tags: ["Sensors", "I2C", "Autonomous", "Electronics"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "drivetrain-mechanisms",
    categoryId: "ftc-components",
    title: {
      vi: "Hệ thống bánh gầm Mecanum: Cấu tạo và nguyên lý di chuyển đa hướng",
      en: "Mecanum Drivetrains: Geometry and Holonomic Motion Principles",
    },
    summary: {
      vi: "Nguyên lý con lăn 45 độ, bố trí trọng tâm robot, tính góc xoay và giảm rung chấn khi leo chướng ngại vật.",
      en: "45-degree roller mechanics, robot center-of-gravity placement, rotation kinematics and vibration damping over field obstacles.",
    },
    status: "ready",
    tags: ["Drivetrain", "Mecanum", "Kinematics", "Chassis"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "odometry-and-dead-wheels",
    categoryId: "ftc-components",
    title: {
      vi: "Hệ thống bánh đo Odometry: Định vị tuyệt đối trên sân thi đấu",
      en: "Dead Wheel Odometry Pods: Absolute Robot Field Localization",
    },
    summary: {
      vi: "Cấu tạo module dead wheel có lò xo ép sàn, quang trở xoay encoder quang học và bài toán chống trôi bánh Mecanum.",
      en: "Spring-loaded unpowered tracking wheel pods, optical encoders, and eliminating wheel slip drift in FTC.",
    },
    status: "ready",
    tags: ["Odometry", "Encoders", "Localization", "Sensors"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "linear-slides-and-rigging",
    categoryId: "ftc-components",
    title: {
      vi: "Thanh trượt mở rộng (Linear Slides): Cấu trúc tầng và đi dây cước",
      en: "Linear Slide Cascades: Multi-Stage Extension and Rigging",
    },
    summary: {
      vi: "So sánh cơ cấu Continuous vs Cascade rigging, dây cước UHMWPE / Kevlar và kỹ thuật gia cố chống võng nhôm ray.",
      en: "Continuous vs Cascade rigging trade-offs, UHMWPE/Kevlar cord routing, and deflection prevention on stage extensions.",
    },
    status: "ready",
    tags: ["Mechanisms", "Linear Slides", "Rigging", "goBILDA"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "intake-and-transfer-systems",
    categoryId: "ftc-components",
    title: {
      vi: "Cơ cấu gắp (Intake) và chuyển giao (Transfer) mẫu vật FTC",
      en: "FTC Intake and Transfer Mechanisms: Roller Geometries and Compliant Wheels",
    },
    summary: {
      vi: "Kỹ thuật dùng bánh xe mềm Compliant wheel, ống lăn cao su silicone, góc tiếp xúc tối ưu và cảm biến chống kẹt mẫu vật.",
      en: "Compliant wheel durometer selection, silicone surgical tubing rollers, contact angles, and anti-jam sensor logic.",
    },
    status: "ready",
    tags: ["Intake", "Mechanisms", "Compliant Wheels", "Game Strategy"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "smart-robot-servo-axon-rev",
    categoryId: "ftc-components",
    title: {
      vi: "So sánh Servo thông minh: REV Smart Robot Servo và Axon Mini/Max",
      en: "Smart Servo Comparison: REV SRS vs Axon Mini & Axon Max",
    },
    summary: {
      vi: "Thông số lực kéo, bánh răng titan, điện áp vận hành 6V vs 12V, lập trình góc quay và bảo vệ quá dòng BEC.",
      en: "Torque specs, titanium geartrains, 6V vs 12V power rails, programmable limits, and BEC current protection.",
    },
    status: "ready",
    tags: ["Servos", "Axon", "REV", "Electronics"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "power-distribution-and-battery-wiring",
    categoryId: "ftc-components",
    title: {
      vi: "Phân phối nguồn và dây dẫn ắc quy 12V: Tiêu chuẩn an toàn điện FTC",
      en: "12V Power Distribution & Battery Harnessing: FTC Electrical Safety Standards",
    },
    summary: {
      vi: "Quy chuẩn công tắc nguồn chính, cầu chì 20A, dây silicon AWG14, đầu nối XT30/Anderson và chống sụt áp khi khởi động motor.",
      en: "Main power switch rules, 20A fuse inspection, AWG14 high-strand silicon wires, XT30/Anderson, and brownout mitigation.",
    },
    status: "ready",
    tags: ["Power", "Battery", "Safety", "Wiring"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "end-effector-and-grippers",
    categoryId: "ftc-components",
    title: {
      vi: "Đầu gắp (End-Effector): Cơ cấu kẹp, hút chân không và con lăn",
      en: "End-Effector Design: Claws, Passive Latching, and Active Rollers",
    },
    summary: {
      vi: "Thiết kế kẹp kẹp chủ động, cơ cấu ngàm tự khóa thụ động, vật liệu mút PU tăng ma sát và servo tích hợp encoder.",
      en: "Active pinch claws, passive latch geometry, high-friction PU foam pads, and servo positioning precision.",
    },
    status: "ready",
    tags: ["Mechanisms", "Grippers", "CAD", "End-Effector"],
    lastUpdated: "2026-11-03",
  },

  // FTC Knowledge (10 articles)
  {
    slug: "match-structure-and-scoring",
    categoryId: "ftc-knowledge",
    title: {
      vi: "Cấu trúc trận đấu FTC & Chiến thuật tối ưu điểm số liên minh",
      en: "FTC Match Structure & Alliance Scoring Strategy",
    },
    summary: {
      vi: "Phân chia 30s Tự động (Autonomous), 2 phút Điều khiển bằng tay (Driver-Controlled) và 30s Kết thúc (Endgame).",
      en: "Deep dive into 30s Autonomous, 2-minute Driver-Controlled period, and 30s Endgame scoring optimization.",
    },
    status: "ready",
    tags: ["Strategy", "Scoring", "Alliance", "Competition"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "engineering-portfolio-guide",
    categoryId: "ftc-knowledge",
    title: {
      vi: "Hướng dẫn xây dựng Sổ tay Kỹ thuật (Engineering Portfolio) 15 trang",
      en: "Building a Winning 15-Page FTC Engineering Portfolio",
    },
    summary: {
      vi: "Cấu trúc trình bày quy trình thiết kế kỹ thuật, bài học thất bại, quản lý ngân sách và hoạt động lan tỏa cộng đồng (Outreach).",
      en: "Structuring the engineering design process, iterative failures, budget management and outreach documentation in 15 pages.",
    },
    status: "ready",
    tags: ["Portfolio", "Judging", "Documentation", "Outreach"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "judging-presentation-skills",
    categoryId: "ftc-knowledge",
    title: {
      vi: "Kỹ năng thuyết trình trước Ban Giám khảo (Judging Interview)",
      en: "Mastering the FTC Judging Interview Presentation",
    },
    summary: {
      vi: "Cách chuẩn bị bài thuyết trình 5 phút ấn tượng, phân công vai trò thành viên và phản xạ trả lời câu hỏi chuyên sâu.",
      en: "Crafting a memorable 5-minute presentation, role delegation among members, and handling technical Q&A gracefully.",
    },
    status: "ready",
    tags: ["Judging", "Presentation", "Soft Skills", "Interview"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "scouting-and-match-strategy",
    categoryId: "ftc-knowledge",
    title: {
      vi: "Phương pháp Scouting dữ liệu và chiến thuật chọn liên minh FTC",
      en: "FTC Quantitative Match Scouting & Alliance Selection Strategy",
    },
    summary: {
      vi: "Thu thập số liệu OPR (Offensive Power Rating), ghi chép độ ổn định tự hành, phỏng vấn pit và lập danh sách Pick List.",
      en: "Quantitative OPR tracking, autonomous consistency scoring, pit scouting interviews, and building data-driven pick lists.",
    },
    status: "ready",
    tags: ["Scouting", "Data", "Strategy", "Alliance"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "gracious-professionalism-and-core-values",
    categoryId: "ftc-knowledge",
    title: {
      vi: "Tinh thần Gracious Professionalism® và Coopertition® trong FIRST",
      en: "Gracious Professionalism® & Coopertition® in the FIRST Ecosystem",
    },
    summary: {
      vi: "Văn hóa hỗ trợ đối thủ sửa robot trong khu vực Pit, chia sẻ linh kiện và thái độ ứng xử chuẩn mực trên sân đấu quốc tế.",
      en: "Lending parts and technical support to rivals in the pits, mutual respect, and sportsmanship on the international stage.",
    },
    status: "ready",
    tags: ["Core Values", "Culture", "FIRST", "Ethics"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "alliance-selection-dynamics",
    categoryId: "ftc-knowledge",
    title: {
      vi: "Quy trình Chọn liên minh vòng Playoff: Bí quyết cho Captain và Pick",
      en: "Playoff Alliance Selection Dynamics: Secrets for Captains and Picks",
    },
    summary: {
      vi: "Luật chọn liên minh 1-8, chiến thuật từ chối lời mời (Decline), phân tích sự bổ trợ giữa robot ghi điểm và robot phòng thủ.",
      en: "1-8 snake draft rules, strategic declines, compatibility between high-cycle scorers and defensive anchors.",
    },
    status: "ready",
    tags: ["Alliance", "Playoffs", "Strategy", "Rules"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "ftc-awards-criteria-breakdown",
    categoryId: "ftc-knowledge",
    title: {
      vi: "Tiêu chí các giải thưởng FTC: Inspire, Think, Connect, Innovate, Design",
      en: "Comprehensive Breakdown of FTC Judged Awards",
    },
    summary: {
      vi: "Giải mã thang điểm giám khảo cho giải Inspire danh giá nhất, giải thiết kế Design, giải sáng tạo Innovate và kết nối cộng đồng Connect.",
      en: "Deconstructing rubric expectations for the Inspire Award, Think, Innovate, Design, Connect, and Motivate accolades.",
    },
    status: "ready",
    tags: ["Awards", "Inspire", "Judging", "Rubrics"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "safety-captain-and-pit-management",
    categoryId: "ftc-knowledge",
    title: {
      vi: "Quản lý khu vực Pit và vai trò Đội trưởng An toàn (Safety Captain)",
      en: "Pit Station Management and the Vital Role of the Safety Captain",
    },
    summary: {
      vi: "Bố trí không gian kỹ thuật 3x3m gọn gàng, kiểm soát kính bảo hộ, hộp sơ cứu, bình chữa cháy và kiểm tra robot trước mỗi trận.",
      en: "Organizing a 10x10ft pit garage, eye protection protocols, battery safety charging stations, and pre-match inspection checklists.",
    },
    status: "ready",
    tags: ["Safety", "Pit Management", "Operations", "Team Roles"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "engineering-notebook-vs-portfolio",
    categoryId: "ftc-knowledge",
    title: {
      vi: "So sánh Engineering Notebook (Dày) và Engineering Portfolio (15 trang)",
      en: "Engineering Notebook vs Engineering Portfolio: Understanding the Evolution",
    },
    summary: {
      vi: "Lịch sử chuyển đổi tài liệu kỹ thuật trong FIRST, cách lưu trữ toàn bộ nhật ký chế tạo và cô đọng tinh hoa vào 15 trang nộp giám khảo.",
      en: "The structural evolution from massive multi-binder notebooks to high-impact 15-page portfolios and digital archives.",
    },
    status: "ready",
    tags: ["Portfolio", "Notebook", "Documentation", "Judging"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "season-timeline-and-milestone-planning",
    categoryId: "ftc-knowledge",
    title: {
      vi: "Lập kế hoạch tiến độ mùa giải FTC: Từ Kickoff đến Giải Vô địch",
      en: "FTC Season Roadmap: From September Kickoff to Championship Finals",
    },
    summary: {
      vi: "Khung thời gian 6 tháng chia giai đoạn: Brainstorming, chế tạo nguyên mẫu (Prototyping), Robot v1, Freeze code và tập lái Driver Practice.",
      en: "6-month sprint milestones: Game reveal analysis, rapid prototyping, baseline robot freeze, driver drills, and tournament readiness.",
    },
    status: "ready",
    tags: ["Planning", "Season", "Project Management", "Milestones"],
    lastUpdated: "2026-11-03",
  },

  // General Robotics (10 articles)
  {
    slug: "mechanical-fasteners-and-structures",
    categoryId: "robotics-general",
    title: {
      vi: "Vật liệu, bu-lông và kết cấu cơ khí chính xác trong chế tạo robot",
      en: "Materials, Fasteners & Structural Rigidity in Robotics Fabrication",
    },
    summary: {
      vi: "Lựa chọn nhôm 6061, nhựa Polycarbonate (Lexan), phân biệt ốc M3/M4, ốc chống trôi Nyloc và kỹ thuật gia cố chống vặn xoắn.",
      en: "Selecting 6061 aluminum, Polycarbonate (Lexan), M3/M4 fastener sizing, Nyloc locknuts and anti-torsion bracing methods.",
    },
    status: "ready",
    tags: ["Mechanics", "Materials", "Hardware", "Fasteners"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "electrical-wiring-safety",
    categoryId: "robotics-general",
    title: {
      vi: "Tiêu chuẩn đi dây điện, bấm cos và an toàn nguồn điện một chiều",
      en: "Electrical Wiring Standards, Crimping & DC Power Safety",
    },
    summary: {
      vi: "Quy chuẩn tiết diện dây AWG, đầu nối Anderson Powerpole, XT30 và kỹ thuật bó dây gọn gàng chống vướng kẹt cơ cấu.",
      en: "Wire gauge AWG ratings, Anderson Powerpole, XT30 connectors, and cable management to avoid mechanical pinch points.",
    },
    status: "ready",
    tags: ["Electronics", "Safety", "Wiring", "Power"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "pid-and-motion-fundamentals",
    categoryId: "robotics-general",
    title: {
      vi: "Nhập môn điều khiển PID và chuyển động mượt mà trong Robotics",
      en: "Introduction to PID Control & Smooth Motion Profiles in Robotics",
    },
    summary: {
      vi: "Giải thích trực quan về hệ số Tỉ lệ (P), Tích phân (I), Vi phân (D) cùng bộ tạo quỹ đạo hình thang (Trapezoidal Motion Profile).",
      en: "Intuitive explanation of Proportional, Integral, Derivative gains paired with Trapezoidal Motion Profiling for robot arms and drives.",
    },
    status: "ready",
    tags: ["Control Theory", "PID", "Motion", "Math"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "aluminum-vs-polycarbonate-machining",
    categoryId: "robotics-general",
    title: {
      vi: "Gia công Nhôm tấm 6061 vs Polycarbonate (Lexan): Cắt CNC và khoan lỗ",
      en: "Machining 6061-T6 Aluminum vs Polycarbonate (Lexan): CNC and Tooling",
    },
    summary: {
      vi: "So sánh độ dẻo dai chống va đập, tốc độ cắt router CNC, tưới nguội nhôm và lý do tuyệt đối không dùng nhựa Acrylic (Mica).",
      en: "Impact fracture toughness, feeds and speeds for CNC routers, lubrication, and why brittle acrylic must never be used.",
    },
    status: "ready",
    tags: ["Materials", "Machining", "CNC", "Fabrication"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "3d-printing-filaments-for-robotics",
    categoryId: "robotics-general",
    title: {
      vi: "In 3D trong Robotics: So sánh vật liệu PLA+, PETG, TPU và Nylon CF",
      en: "3D Printing for Competitive Robotics: PLA+, PETG, TPU vs Carbon-Fiber Nylon",
    },
    summary: {
      vi: "Độ bền liên kết lớp (layer adhesion), độ hấp thụ va đập của bánh xe TPU, bánh răng nhông và nhiệt độ bàn in tối ưu.",
      en: "Interlayer bond strength, shock-absorbing TPU intake fingers, high-stress gears, and heated chamber requirements.",
    },
    status: "ready",
    tags: ["3D Printing", "Materials", "Prototyping", "Hardware"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "bearing-types-and-shaft-clamping",
    categoryId: "robotics-general",
    title: {
      vi: "Vòng bi và khóa trục: Trục tròn vs Trục lục giác REX / Hex 8mm",
      en: "Bearings and Shaft Retention: Round vs 8mm REX / Hex Shafts",
    },
    summary: {
      vi: "Vòng bi có gờ (Flanged bearings), đai ốc kẹp trục Clamping collar, chốt then (Keyway) và chống lệch hướng tâm khi quay tốc độ cao.",
      en: "Flanged radial ball bearings, two-piece clamping collars, keyed hubs, and eliminating radial runout under heavy load.",
    },
    status: "ready",
    tags: ["Bearings", "Shafts", "Mechanics", "Power Transmission"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "battery-maintenance-and-internal-resistance",
    categoryId: "robotics-general",
    title: {
      vi: "Bảo dưỡng ắc quy robot: Nội trở, chu kỳ sạc và phòng ngừa chai pin",
      en: "Robotics Battery Health: Internal Resistance, Cycle Degradation, and Peak Discharge",
    },
    summary: {
      vi: "Đo nội trở mOhm của cell pin 12V NiMH, dòng xả cực đại (C-rating), quy trình sạc chậm trickle và loại bỏ pin phồng nguy hiểm.",
      en: "Measuring internal resistance in mOhms, peak current draw limits, delta-peak smart charging, and retiring compromised packs.",
    },
    status: "ready",
    tags: ["Battery", "Maintenance", "Electronics", "Safety"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "signal-noise-and-i2c-shielding",
    categoryId: "robotics-general",
    title: {
      vi: "Nhiễu điện từ (EMI) và chống rớt kết nối I2C/USB trên robot",
      en: "Electromagnetic Interference (EMI) Mitigation and I2C/USB Stability",
    },
    summary: {
      vi: "Nguyên nhân motor chổi than phát tia lửa điện gây sập bus cảm biến, vòng khử từ Ferrite bead và quy tắc tách dây tín hiệu khỏi dây nguồn.",
      en: "Brushed motor sparking, inductor kickback, ferrite choke placement, and running sensor cables away from high-current motor leads.",
    },
    status: "ready",
    tags: ["Electronics", "EMI", "I2C", "Debugging"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "gear-ratios-and-torque-calculations",
    categoryId: "robotics-general",
    title: {
      vi: "Tính toán Tỉ số truyền và Mô-men xoắn: Chọn động cơ nâng cánh tay",
      en: "Gear Ratio and Arm Torque Calculations for Mechanism Sizing",
    },
    summary: {
      vi: "Công thức lực cánh tay đòn $\\tau = F \\times r$, hệ số an toàn ma sát, dòng kẹt motor stall và chọn tỉ số hộp số hành tinh.",
      en: "Torque equations, accounting for joint friction, mechanical advantage, motor stall current curves, and planetary stages.",
    },
    status: "ready",
    tags: ["Physics", "Mechanics", "Calculations", "Motors"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "pneumatics-and-air-cylinders-basics",
    categoryId: "robotics-general",
    title: {
      vi: "Nhập môn Khí nén trong Robotics: Bình chứa khí, van solenoid và xi lanh",
      en: "Introduction to Pneumatics in Robotics: Reservoirs, Solenoids, and Actuators",
    },
    summary: {
      vi: "Nguyên lý truyền lực tức thời bằng áp suất khí nén (60-120 psi), van điều áp, van đảo chiều và trường hợp ứng dụng vượt trội so với servo.",
      en: "High instantaneous force via pneumatic pressure (60-120 psi), regulators, double-acting cylinders, and when air beats servos.",
    },
    status: "ready",
    tags: ["Pneumatics", "Mechanisms", "Actuators", "Fluid Power"],
    lastUpdated: "2026-11-03",
  },

  // Programming (10 articles)
  {
    slug: "ftc-java-environment-setup",
    categoryId: "programming",
    title: {
      vi: "Cài đặt môi trường lập trình FTC: Android Studio, Git và SDK",
      en: "FTC Programming Setup: Android Studio, Git, and the Robot Controller SDK",
    },
    summary: {
      vi: "Tải repo FtcRobotController, cấu hình JDK 17, kết nối Wi-Fi Direct hoặc adb over Wi-Fi nạp code vào Control Hub.",
      en: "Cloning FtcRobotController, configuring JDK 17, pairing via Wi-Fi Direct or wireless adb, and deploying your first OpMode.",
    },
    status: "ready",
    tags: ["Java", "Android Studio", "SDK", "Setup"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "teleop-driving-and-gamepad-mapping",
    categoryId: "programming",
    title: {
      vi: "Lập trình TeleOp: Điều khiển bánh Mecanum và gán nút tay cầm Gamepad",
      en: "TeleOp Programming: Field-Centric Mecanum Drive and Gamepad Mapping",
    },
    summary: {
      vi: "Thuật toán lái hướng trường (Field-Centric Drive) kết hợp IMU con quay hồi chuyển, hàm làm mịn joystick và phân tầng nút bấm.",
      en: "Field-centric drive equations using Control Hub IMU yaw, cubic joystick input curves, and driver button ergonomics.",
    },
    status: "ready",
    tags: ["TeleOp", "Mecanum", "IMU", "Gamepad"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "autonomous-encoder-driving",
    categoryId: "programming",
    title: {
      vi: "Tự hành cơ bản bằng Encoder: RunToPosition và đo khoảng cách cm",
      en: "Baseline Autonomous with Encoders: RunToPosition and Unit Conversion",
    },
    summary: {
      vi: "Quy đổi xung encoder (Ticks) sang cm di chuyển thực tế, xử lý gia tốc dừng chống vọt lố (overshoot) và vòng lặp LinearOpMode.",
      en: "Converting motor tick counts to centimeters, handling deceleration ramps, and avoiding blocking loop pitfalls in LinearOpMode.",
    },
    status: "ready",
    tags: ["Autonomous", "Encoders", "LinearOpMode", "Java"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "apriltag-and-computer-vision",
    categoryId: "programming",
    title: {
      vi: "Thị giác máy tính AprilTag: Nhận diện vị trí robot bằng Webcam USB",
      en: "AprilTag Computer Vision: Pose Estimation with USB Webcams in FTC",
    },
    summary: {
      vi: "Tích hợp thư viện AprilTagProcessor, lấy tọa độ X, Y, Yaw để tự động căn chỉnh robot vào trạm nạp và cọc tiêu sân đấu.",
      en: "Leveraging AprilTagProcessor, extracting 3D coordinate vectors (X, Y, Yaw), and auto-aligning to field scoring targets.",
    },
    status: "ready",
    tags: ["Vision", "AprilTag", "Webcam", "Autonomous"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "road-runner-motion-profiling",
    categoryId: "programming",
    title: {
      vi: "Điều hướng quỹ đạo nâng cao với Road Runner: Spline và Odometry",
      en: "Advanced Trajectory Following with Road Runner: Splines & Three-Wheel Odometry",
    },
    summary: {
      vi: "Cài đặt Road Runner 0.5.x/1.0, chạy tuning follower, vẽ đường cong Spline mượt mà giúp robot di chuyển tốc độ tối đa không trượt.",
      en: "Installing Road Runner, tuning velocity PID and feedforward constants, and executing continuous spline trajectories.",
    },
    status: "ready",
    tags: ["Road Runner", "Motion Profiling", "Splines", "Odometry"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "finite-state-machines-in-robotics",
    categoryId: "programming",
    title: {
      vi: "Lập trình Máy trạng thái hữu hạn (FSM) điều khiển cơ cấu tự động",
      en: "Finite State Machines (FSM) for Non-Blocking Robotic Subsystems",
    },
    summary: {
      vi: "Loại bỏ hàm delay/sleep() gây treo robot, xây dựng enum State và switch-case điều khiển đồng thời intake, nâng và nhả mẫu vật.",
      en: "Eliminating blocking sleep() calls, implementing enum State machines, and sequencing concurrent multi-mechanism actions.",
    },
    status: "ready",
    tags: ["FSM", "State Machine", "Architecture", "Software"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "pidf-controller-tuning-in-ftc",
    categoryId: "programming",
    title: {
      vi: "Tuning bộ điều khiển PIDF trong Java: Bù trọng lực cho tay đòn",
      en: "Tuning PIDF Controllers in Java: Feedforward Gravity Compensation for Arms",
    },
    summary: {
      vi: "Cài đặt class PIDFController, bổ sung hệ số Feedforward kF = $\\cos(\\theta)$ giữ nguyên vị trí cánh tay đòn không tốn công suất động cơ.",
      en: "Writing custom PIDFController classes, adding angle-dependent feedforward to cancel gravitational torque on heavy pivots.",
    },
    status: "ready",
    tags: ["PIDF", "Control", "Java", "Math"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "ftc-dashboard-and-telemetry-debugging",
    categoryId: "programming",
    title: {
      vi: "Gỡ lỗi trực quan với FTC Dashboard: Đồ thị PID và camera stream qua trình duyệt",
      en: "Visual Telemetry & Debugging with FTC Dashboard: Live Graphs and Camera Feeds",
    },
    summary: {
      vi: "Cài đặt FTC Dashboard, tinh chỉnh hệ số biến trực tiếp trên web UI không cần re-flash code và xem camera thời gian thực.",
      en: "Configuring FTC Dashboard, dynamically tuning PID constants over browser web sockets, and streaming real-time vision pipelines.",
    },
    status: "ready",
    tags: ["FTC Dashboard", "Telemetry", "Debugging", "Tools"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "git-version-control-for-robotics",
    categoryId: "programming",
    title: {
      vi: "Quản lý mã nguồn nhóm bằng Git & GitHub: Branching và Merge an toàn",
      en: "Team Git Version Control for Robotics: Branching Strategies and Conflict Resolution",
    },
    summary: {
      vi: "Mô hình nhánh feature branches, bảo vệ nhánh main trước ngày thi đấu, xử lý merge conflict file XML Android Studio.",
      en: "Feature branch workflows, locking release branches before tournament inspections, and resolving Android Studio project merge conflicts.",
    },
    status: "ready",
    tags: ["Git", "GitHub", "Teamwork", "DevOps"],
    lastUpdated: "2026-11-03",
  },
  {
    slug: "color-sensor-and-distance-logic",
    categoryId: "programming",
    title: {
      vi: "Xử lý dữ liệu Cảm biến Màu sắc & Khoảng cách: Lọc nhiễu và phân loại",
      en: "Color Sensor & Distance Sensor Logic: Noise Filtering and Sample Classification",
    },
    summary: {
      vi: "Thuật toán đọc không gian màu HSV từ RGB, bộ lọc trung bình trượt (Moving Average) và tự động dừng intake khi phát hiện vật phẩm.",
      en: "Converting raw RGB to HSV color space, implementing running average filters, and auto-stopping intake motors on sample detection.",
    },
    status: "ready",
    tags: ["Sensors", "Color Sensor", "Java", "Algorithms"],
    lastUpdated: "2026-11-03",
  },
] as const;

export function getCategoryById(id: string): ResourceCategory | undefined {
  return RESOURCE_CATEGORIES.find((c) => c.id === id);
}

export function getArticlesByCategory(categoryId: string): readonly ResourceArticle[] {
  return RESOURCE_ARTICLES.filter((a) => a.categoryId === categoryId);
}

export function getArticleBySlug(
  categoryId: string,
  slug: string,
): ResourceArticle | undefined {
  return RESOURCE_ARTICLES.find(
    (a) => a.categoryId === categoryId && a.slug === slug,
  );
}
