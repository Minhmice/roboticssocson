import type { LocalizedText } from "@/lib/course/getLocalized";

export type CourseCard = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon?: string;
};

export type CourseSectionCopy = {
  title: LocalizedText;
  titleLine2?: LocalizedText;
  subtitle: LocalizedText;
  badge?: LocalizedText;
  progressLabel?: LocalizedText;
  stepsListLabel?: LocalizedText;
  stepAriaLabel?: LocalizedText;
};

export type CourseMethodPhase = {
  id: string;
  title: LocalizedText;
  stepIds: string[];
};

export const courseSectionCopy = {
  problem: {
    title: {
      vi: "Vấn đề phụ huynh thường gặp",
      en: "What parents often see",
    },
    subtitle: {
      vi: "Con học trên màn hình nhiều nhưng chưa hiểu logic, chưa làm được sản phẩm thật — và dễ sa đà vào nội dung ngắn.",
      en: "Kids spend time on screens but still lack logic skills and real products — and short-form content pulls attention away.",
    },
    badge: { vi: "Vì sao cần khóa học", en: "Why this course" },
  },
  solution: {
    title: {
      vi: "Biến con thành người",
      en: "Turn your child",
    },
    titleLine2: {
      vi: "làm chủ công nghệ",
      en: "into a tech master",
    },
    subtitle: {
      vi: "Thay vì chỉ tiêu thụ nội dung, con dùng khối lệnh Scratch và mBlock để hiểu cách công nghệ hoạt động — rồi đưa chương trình ra LED, cảm biến và robot thật.",
      en: "Instead of only consuming content, your child uses Scratch and mBlock to see how technology works — then brings programs to real LEDs, sensors, and robots.",
    },
  },
  outcomes: {
    title: {
      vi: "Học sinh nhận được gì",
      en: "What students gain",
    },
    subtitle: {
      vi: "Kỹ năng lập trình, phần cứng và tập trung sâu — thói quen học đúng lúc còn trẻ sẽ theo con lâu dài.",
      en: "Programming, hardware, and deep focus — learning habits formed early stay with your child.",
    },
  },
  method: {
    title: {
      vi: "7 bước",
      en: "7 steps",
    },
    titleLine2: {
      vi: "mỗi buổi học",
      en: "each session",
    },
    subtitle: {
      vi: "Từ tình huống thực tế đến challenge — học sinh hiểu, làm theo, thử nghiệm và tự debug.",
      en: "From real scenarios to challenge — understand, follow along, experiment, and debug independently.",
    },
    progressLabel: {
      vi: "Tiến độ quy trình buổi học: bước {current} trên {total}",
      en: "Session flow progress: step {current} of {total}",
    },
    stepsListLabel: {
      vi: "Quy trình bảy bước mỗi buổi học",
      en: "Seven-step session flow",
    },
    stepAriaLabel: {
      vi: "Bước {current} — {title}",
      en: "Step {current} — {title}",
    },
  },
  leveling: {
    title: {
      vi: "Phân tầng cấp 1 – 2",
      en: "Level 1 vs Level 2",
    },
    subtitle: {
      vi: "Học chung một lớp nhưng mỗi học sinh có lộ trình và thử thách phù hợp trình độ.",
      en: "One class, two tracks — every student gets the right challenge for their level.",
    },
  },
  ai: {
    title: {
      vi: "Vai trò AI & flowchart",
      en: "AI and flowcharts",
    },
    subtitle: {
      vi: "AI là trợ lý học tập — không thay thế tư duy của học sinh.",
      en: "AI assists learning — it does not replace student thinking.",
    },
  },
  curriculum: {
    title: { vi: "Lộ trình", en: "12-session" },
    titleLine2: { vi: "12 buổi", en: "curriculum" },
    subtitle: {
      vi: "Từ Scratch đến Arduino — mỗi buổi có mục tiêu, sản phẩm và thử thách riêng.",
      en: "From Scratch to Arduino — each session has goals, products, and challenges.",
    },
  },
} as const satisfies Record<string, CourseSectionCopy>;

export const courseProblemCards: CourseCard[] = [
  {
    id: "problem-drag-drop",
    icon: "Puzzle",
    title: {
      vi: "Chỉ kéo thả, chưa hiểu logic",
      en: "Drag-and-drop without real logic",
    },
    description: {
      vi: "Học sinh làm được game nhưng không giải thích được vì sao chương trình chạy theo thứ tự đó.",
      en: "Students can build games but cannot explain why the program runs in that order.",
    },
  },
  {
    id: "problem-no-product",
    icon: "AlertTriangle",
    title: {
      vi: "Nhiều lý thuyết, ít sản phẩm thật",
      en: "Too much theory, too few real products",
    },
    description: {
      vi: "Khóa học dừng ở màn hình máy tính, thiếu trải nghiệm lắp mạch và điều khiển phần cứng.",
      en: "Courses stop at the screen — missing hands-on circuits and hardware control.",
    },
  },
  {
    id: "problem-no-debug",
    icon: "Bug",
    title: {
      vi: "Không biết debug",
      en: "Cannot debug independently",
    },
    description: {
      vi: "Gặp lỗi thì chờ giáo viên sửa — chưa có thói quen đọc flowchart, kiểm tra từng bước.",
      en: "When errors appear they wait for the teacher — no habit of reading flowcharts or checking each step.",
    },
  },
  {
    id: "problem-screen-time",
    icon: "Smartphone",
    title: {
      vi: "Màn hình thụ động chiếm quá nhiều thời gian",
      en: "Too much passive screen time",
    },
    description: {
      vi: "Video ngắn và game kéo sự chú ý liên tục — khó ngồi tập trung làm việc cần kiên nhẫn.",
      en: "Short videos and games pull attention constantly — making it hard to focus on patient, hands-on work.",
    },
  },
];

export const courseProblemProse: LocalizedText = {
  vi: "Nhiều ứng dụng dùng phần thưởng bất ngờ — não quen nhịp độ nhanh và khó tập trung lâu. Khóa học chuyển năng lượng đó sang dự án thực: tìm lỗi mạch, chờ robot chạy, tự sửa code — rèn sự kiên nhẫn và tập trung sâu.",
  en: "Many apps use variable rewards — brains get used to fast pace and struggle with sustained focus. This course channels that energy into real projects: finding circuit errors, waiting for robots to run, fixing code — building patience and deep attention.",
};

export const courseProblemCapstone = {
  icon: "Lightbulb",
  title: {
    vi: "Hệ quả với con",
    en: "The impact on your child",
  },
  description: courseProblemProse,
} as const;

export const courseProblemHumanImage = {
  src: "/Images/Mission/Image (2).webp",
  alt: {
    vi: "Học sinh tập trung lắp mạch và lập trình trong lớp",
    en: "Student focused on building circuits and coding in class",
  },
} as const;

export const courseSolutionProse: LocalizedText = {
  vi: "Thay vì chỉ tiêu thụ nội dung, học sinh dùng khối lệnh Scratch và mBlock để hiểu cách công nghệ hoạt động — rồi đưa chương trình ra LED, cảm biến và robot thật. Máy tính là công cụ; phần lớn thời gian là tay, mắt và tư duy.",
  en: "Instead of only consuming content, students use Scratch and mBlock blocks to see how technology works — then bring programs to real LEDs, sensors, and robots. The computer is a tool; most of the time is hands, eyes, and thinking.",
};

export const courseSolutionCards: CourseCard[] = [
  {
    id: "solution-scratch",
    icon: "Blocks",
    title: {
      vi: "Scratch — học logic trực quan",
      en: "Scratch — visual logic first",
    },
    description: {
      vi: "Event, vòng lặp, điều kiện và biến qua khối lệnh dễ hiểu.",
      en: "Events, loops, conditions, and variables through intuitive blocks.",
    },
  },
  {
    id: "solution-flowchart",
    icon: "Workflow",
    title: {
      vi: "Flowchart — hiểu tư duy thuật toán",
      en: "Flowcharts — algorithmic thinking",
    },
    description: {
      vi: "Vẽ sơ đồ trước khi code — học sinh thấy rõ luồng xử lý.",
      en: "Draw diagrams before coding — students see the flow clearly.",
    },
  },
  {
    id: "solution-hardware",
    icon: "Cpu",
    title: {
      vi: "mBlock & Arduino — phần cứng thật",
      en: "mBlock & Arduino — real hardware",
    },
    description: {
      vi: "LED, nút nhấn, cảm biến, servo — sản phẩm có thể chạm và trình bày.",
      en: "LEDs, buttons, sensors, servos — products you can touch and present.",
    },
  },
  {
    id: "solution-ai",
    icon: "Bot",
    title: {
      vi: "AI hỗ trợ học tập",
      en: "AI as a learning assistant",
    },
    description: {
      vi: "Hỏi lỗi, kiểm tra ý tưởng, gợi ý cải tiến — không làm hộ bài.",
      en: "Ask about errors, test ideas, get improvement hints — not done-for-you answers.",
    },
  },
  {
    id: "solution-capstone",
    icon: "Target",
    title: {
      vi: "Dự án cuối khóa",
      en: "Capstone projects",
    },
    description: {
      vi: "Đấu trường robot — khung xe chung, tự chọn cơ cấu, thi đấu trước lớp.",
      en: "Robot arena — shared chassis, chosen mechanisms, live class match.",
    },
  },
];

export const courseOutcomeCards: CourseCard[] = [
  {
    id: "outcome-logic",
    icon: "Lightbulb",
    title: {
      vi: "Hiểu event, loop, if/else, biến, hàm",
      en: "Events, loops, if/else, variables, functions",
    },
    description: {
      vi: "Nền tảng vững từ Scratch sang mBlock — và thói quen tập trung 30–45 phút khi debug mạch.",
      en: "Solid foundations from Scratch to mBlock — plus a habit of 30–45 minutes of focused work when debugging circuits.",
    },
  },
  {
    id: "outcome-flowchart",
    icon: "Workflow",
    title: {
      vi: "Tự vẽ flowchart",
      en: "Draw flowcharts independently",
    },
    description: {
      vi: "Mô tả bài toán bằng sơ đồ trước khi viết code.",
      en: "Describe problems with diagrams before writing code.",
    },
  },
  {
    id: "outcome-game",
    icon: "Gamepad2",
    title: {
      vi: "Dùng AI để giải quyết vấn đề",
      en: "Use AI to solve problems",
    },
    description: {
      vi: "Dùng AI để gỡ lỗi, tìm hướng giải và cải tiến — hoàn thiện dự án Scratch.",
      en: "Use AI to debug, solve problems, and iterate — complete Scratch projects.",
    },
  },
  {
    id: "outcome-hardware",
    icon: "CircuitBoard",
    title: {
      vi: "Lắp và điều khiển một số thiết bị cơ bản",
      en: "Assemble and control basic devices",
    },
    description: {
      vi: "Hiểu nguyên lý điện cơ bản và điều khiển linh kiện.",
      en: "Basic electronics and component control.",
    },
  },
  {
    id: "outcome-capstone",
    icon: "Trophy",
    title: {
      vi: "Thi đấu đấu trường robot cuối khóa",
      en: "Compete in the robot arena capstone",
    },
    description: {
      vi: "Lái xe Arduino, tự “độ” cơ cấu bắn/kéo/đẩy, ghi điểm trước lớp.",
      en: "Drive an Arduino bot, customize shoot/pull/push, score live in class.",
    },
  },
  {
    id: "outcome-present",
    icon: "Presentation",
    title: {
      vi: "Trình bày sản phẩm",
      en: "Present their work",
    },
    description: {
      vi: "Giải thích logic, demo và trả lời câu hỏi — kỹ năng STEM thực chiến.",
      en: "Explain logic, demo, and answer questions — real STEM communication.",
    },
  },
];

export const courseMethodPhases: CourseMethodPhase[] = [
  {
    id: "phase-prepare",
    title: { vi: "Chuẩn bị", en: "Prepare" },
    stepIds: ["method-1", "method-2", "method-3"],
  },
  {
    id: "phase-build",
    title: { vi: "Thực hành", en: "Build" },
    stepIds: ["method-4", "method-5"],
  },
  {
    id: "phase-extend",
    title: { vi: "Mở rộng", en: "Extend" },
    stepIds: ["method-6", "method-7"],
  },
];

export const courseMethodSteps: CourseCard[] = [
  {
    id: "method-1",
    icon: "Lightbulb",
    title: { vi: "Tình huống thực tế", en: "Real-world scenario" },
    description: {
      vi: "Đặt bài toán gần gũi: đèn giao thông, thùng rác, cảnh báo xe.",
      en: "Relatable problems: traffic lights, bins, vehicle warnings.",
    },
  },
  {
    id: "method-2",
    icon: "Workflow",
    title: { vi: "Flowchart", en: "Flowchart" },
    description: {
      vi: "Vẽ sơ đồ logic trước khi mở phần mềm.",
      en: "Diagram the logic before opening software.",
    },
  },
  {
    id: "method-3",
    icon: "Presentation",
    title: { vi: "Demo", en: "Demo" },
    description: {
      vi: "Giáo viên/minh hoạ chạy mẫu để học sinh thấy kết quả mong đợi.",
      en: "Teacher demo so students see the expected outcome.",
    },
  },
  {
    id: "method-4",
    icon: "ListChecks",
    title: { vi: "Làm theo", en: "Follow along" },
    description: {
      vi: "Học sinh lắp ráp hoặc code từng bước có hướng dẫn.",
      en: "Students build or code step-by-step with guidance.",
    },
  },
  {
    id: "method-5",
    icon: "Puzzle",
    title: { vi: "Biến thể", en: "Variations" },
    description: {
      vi: "Thay đổi tham số, màu, tốc độ — khám phá trong phạm vi an toàn.",
      en: "Change parameters, colors, speed — safe exploration.",
    },
  },
  {
    id: "method-6",
    icon: "Bug",
    title: { vi: "Debug", en: "Debug" },
    description: {
      vi: "Đọc flowchart, kiểm tra dây, hỏi AI có hướng dẫn — tự sửa lỗi.",
      en: "Read flowcharts, check wiring, use guided AI — fix errors yourself.",
    },
  },
  {
    id: "method-7",
    icon: "Zap",
    title: { vi: "Challenge", en: "Challenge" },
    description: {
      vi: "Nhiệm vụ mở rộng theo cấp 1 hoặc cấp 2.",
      en: "Extension tasks matched to Level 1 or Level 2.",
    },
  },
];

export const courseLevelingCards: CourseCard[] = [
  {
    id: "level-primary",
    icon: "GraduationCap",
    title: { vi: "Cấp 1", en: "Level 1" },
    description: {
      vi: "Làm sản phẩm trực quan, hiểu khối lệnh cơ bản, hoàn thành theo hướng dẫn.",
      en: "Visual products, basic blocks, guided completion.",
    },
  },
  {
    id: "level-secondary",
    icon: "Zap",
    title: { vi: "Cấp 2", en: "Level 2" },
    description: {
      vi: "Giải thích logic, debug, dùng biến, điều kiện, hàm và nguyên lý điện.",
      en: "Explain logic, debug, use variables, conditions, functions, and electronics.",
    },
  },
];

export const courseAiUsageCards: CourseCard[] = [
  {
    id: "ai-debug",
    icon: "Bug",
    title: { vi: "Hỏi lỗi code", en: "Ask about code errors" },
    description: {
      vi: "Gợi ý hướng kiểm tra — học sinh vẫn tự sửa.",
      en: "Hints on what to check — students still fix it themselves.",
    },
  },
  {
    id: "ai-checklist",
    icon: "ListChecks",
    title: { vi: "Tạo checklist lắp mạch", en: "Wiring checklists" },
    description: {
      vi: "Danh sách kiểm tra trước khi cấp nguồn.",
      en: "Pre-power checklists before turning circuits on.",
    },
  },
  {
    id: "ai-flowchart",
    icon: "Workflow",
    title: { vi: "Gợi ý flowchart", en: "Flowchart suggestions" },
    description: {
      vi: "Khung sơ đồ để học sinh điền và chỉnh sửa.",
      en: "Scaffolded diagrams for students to fill and refine.",
    },
  },
  {
    id: "ai-quiz",
    icon: "MessageCircle",
    title: { vi: "Đặt câu hỏi kiểm tra", en: "Quiz-style questions" },
    description: {
      vi: "Ôn lại khái niệm sau mỗi buổi.",
      en: "Review concepts after each session.",
    },
  },
  {
    id: "ai-improve",
    icon: "Sparkles",
    title: { vi: "Gợi ý cải tiến dự án", en: "Project improvement ideas" },
    description: {
      vi: "Ý tưởng mở rộng — học sinh chọn và thực hiện.",
      en: "Extension ideas — students choose and implement.",
    },
  },
];

export const courseAiClosingLine: LocalizedText = {
  vi: "Không dùng AI để làm hộ toàn bộ bài — AI chỉ hỗ trợ tư duy và kiểm tra.",
  en: "AI never does the whole assignment — it supports thinking and checking only.",
};
