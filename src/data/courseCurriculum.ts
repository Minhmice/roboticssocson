import type { LocalizedText } from "@/lib/course/getLocalized";

/**
 * TODO(curriculum): Marketing promises 16 sessions (`coursePricingConfig.sessionCount`).
 * `courseLessons` below defines 12 lessons only — add sessions 13–16 before launch.
 */

export type CoursePart = "scratch" | "hardware" | "capstone";

export type CoursePartMeta = {
  id: CoursePart;
  label: LocalizedText;
  description: LocalizedText;
};

export const coursePartOrder: readonly CoursePart[] = [
  "scratch",
  "hardware",
  "capstone",
] as const;

export const coursePartMeta: readonly CoursePartMeta[] = [
  {
    id: "scratch",
    label: { vi: "Scratch", en: "Scratch" },
    description: {
      vi: "Buổi 1–6 · Làm quen khối lệnh và logic cơ bản",
      en: "Sessions 1–6 · Block logic and programming foundations",
    },
  },
  {
    id: "hardware",
    label: { vi: "Phần cứng", en: "Hardware" },
    description: {
      vi: "Buổi 7–11 · Mạch điện, Arduino và cảm biến",
      en: "Sessions 7–11 · Circuits, Arduino, and sensors",
    },
  },
  {
    id: "capstone",
    label: { vi: "Dự án cuối", en: "Capstone" },
    description: {
      vi: "Buổi 16 · Tổng hợp lập trình và phần cứng",
      en: "Session 16 · Combine programming and hardware",
    },
  },
];

export const curriculumFieldLabels = {
  goal: { vi: "Mục tiêu", en: "Goal" },
  primaryLevel: { vi: "Cấp 1", en: "Level 1" },
  secondaryLevel: { vi: "Cấp 2", en: "Level 2" },
  challenge: { vi: "Thử thách", en: "Challenge" },
  detailsToggle: { vi: "Xem chi tiết", en: "Details" },
  hideDetailsToggle: { vi: "Thu gọn", en: "Hide details" },
  detailsAriaLabel: {
    vi: "Xem chi tiết buổi {session}: {title}",
    en: "Show details for session {session}: {title}",
  },
  hideDetailsAriaLabel: {
    vi: "Thu gọn chi tiết buổi {session}: {title}",
    en: "Hide details for session {session}: {title}",
  },
  phaseNavLabel: { vi: "Giai đoạn khóa học", en: "Course phases" },
  progressLabel: {
    vi: "Tiến độ buổi {current} trên {total}",
    en: "Session {current} of {total}",
  },
  lessonsListLabel: {
    vi: "Danh sách 16 buổi học",
    en: "List of 16 sessions",
  },
} as const;

export type CourseLesson = {
  id: number;
  part: CoursePart;
  title: LocalizedText;
  goal: LocalizedText;
  product: LocalizedText;
  primaryLevel: LocalizedText;
  secondaryLevel: LocalizedText;
  challenge: LocalizedText;
};

export const courseLessons: readonly CourseLesson[] = [
  {
    id: 1,
    part: "scratch",
    title: { vi: "Làm quen Scratch", en: "Getting Started with Scratch" },
    goal: {
      vi: "Làm quen giao diện Scratch và khối lệnh cơ bản.",
      en: "Get familiar with the Scratch interface and basic blocks.",
    },
    product: {
      vi: "Nhân vật nói xin chào và di chuyển trên sân khấu.",
      en: "A sprite that says hello and moves on the stage.",
    },
    primaryLevel: {
      vi: "Kéo thả khối di chuyển và hiển thị lời nói.",
      en: "Drag motion and say blocks to animate one character.",
    },
    secondaryLevel: {
      vi: "Thêm nhân vật thứ hai và đổi trang phục.",
      en: "Add a second sprite and customize costumes.",
    },
    challenge: {
      vi: "Tạo đoạn hội thoại ngắn giữa hai nhân vật.",
      en: "Create a short dialogue between two characters.",
    },
  },
  {
    id: 2,
    part: "scratch",
    title: { vi: "Lệnh tuần tự", en: "Sequential Commands" },
    goal: {
      vi: "Hiểu thứ tự thực thi từ trên xuống trong chương trình.",
      en: "Understand top-to-bottom execution order in a program.",
    },
    product: {
      vi: "Câu chuyện mini 3–4 bước với lời thoại và chuyển cảnh.",
      en: "A 3–4 step mini story with dialogue and scene changes.",
    },
    primaryLevel: {
      vi: "Xếp khối lệnh theo đúng thứ tự kể chuyện.",
      en: "Stack blocks in the correct storytelling order.",
    },
    secondaryLevel: {
      vi: "Thêm hiệu ứng chờ giữa các bước.",
      en: "Add wait blocks between story beats.",
    },
    challenge: {
      vi: "Viết flowchart 4 bước rồi chuyển sang Scratch.",
      en: "Draw a 4-step flowchart then implement it in Scratch.",
    },
  },
  {
    id: 3,
    part: "scratch",
    title: { vi: "Vòng lặp lặp mãi", en: "Forever Loop" },
    goal: {
      vi: "Dùng vòng lặp vô hạn để lặp hành động liên tục.",
      en: "Use a forever loop to repeat actions continuously.",
    },
    product: {
      vi: "Nhân vật nhảy hoặc xoay không ngừng trên sân khấu.",
      en: "A sprite that jumps or spins continuously on stage.",
    },
    primaryLevel: {
      vi: "Đặt khối forever bao quanh một hành động đơn giản.",
      en: "Wrap a simple action inside a forever block.",
    },
    secondaryLevel: {
      vi: "Kết hợp hai hành động trong cùng vòng lặp.",
      en: "Combine two actions inside the same loop.",
    },
    challenge: {
      vi: "Tạo hiệu ứng nhấp nháy bằng đổi trang phục trong forever.",
      en: "Make a blinking effect by switching costumes in forever.",
    },
  },
  {
    id: 4,
    part: "scratch",
    title: { vi: "Lặp lệnh + hoạt hình", en: "Repeat + Animation" },
    goal: {
      vi: "Dùng khối repeat để lặp số lần cố định và tạo animation.",
      en: "Use repeat blocks for fixed counts and simple animation.",
    },
    product: {
      vi: "Animation đi bộ hoặc vẫy tay lặp đúng số lần.",
      en: "A walking or waving animation that repeats a set number of times.",
    },
    primaryLevel: {
      vi: "Lặp 5–10 lần một chuỗi di chuyển ngắn.",
      en: "Repeat a short motion sequence 5–10 times.",
    },
    secondaryLevel: {
      vi: "Thêm âm thanh đồng bộ với từng bước animation.",
      en: "Sync sound effects with each animation step.",
    },
    challenge: {
      vi: "Vẽ flowchart repeat rồi kiểm tra số lần lặp trên Scratch.",
      en: "Draw a repeat flowchart and verify loop count in Scratch.",
    },
  },
  {
    id: 5,
    part: "scratch",
    title: { vi: "Nhánh if/else + va chạm", en: "If/else + Collision" },
    goal: {
      vi: "Ra quyết định với if/else và phát hiện va chạm.",
      en: "Make decisions with if/else and detect collisions.",
    },
    product: {
      vi: "Nhân vật đổi hướng hoặc phản ứng khi chạm vật cản.",
      en: "A sprite that turns or reacts when touching an obstacle.",
    },
    primaryLevel: {
      vi: "Dùng if touching để đổi hướng đơn giản.",
      en: "Use if touching to change direction simply.",
    },
    secondaryLevel: {
      vi: "Thêm else để có hai phản ứng khác nhau.",
      en: "Add else branches for two different reactions.",
    },
    challenge: {
      vi: "Thiết kế mê cung mini với một điểm đích.",
      en: "Design a mini maze with one goal point.",
    },
  },
  {
    id: 6,
    part: "scratch",
    title: {
      vi: "Biến điểm số + game mini",
      en: "Score Variable + Mini Game",
    },
    goal: {
      vi: "Dùng biến để lưu điểm và điều kiện thắng/thua.",
      en: "Use variables for score and win/lose conditions.",
    },
    product: {
      vi: "Game bắt vật phẩm hoặc tránh chướng ngại với điểm số.",
      en: "A catch-or-dodge mini game with a score display.",
    },
    primaryLevel: {
      vi: "Tạo biến điểm và tăng khi chạm vật phẩm.",
      en: "Create a score variable and increment on item touch.",
    },
    secondaryLevel: {
      vi: "Thêm điều kiện kết thúc khi đạt mục tiêu điểm.",
      en: "Add an end condition when reaching a target score.",
    },
    challenge: {
      vi: "Giải thích bằng lời vì sao biến cần thiết trong game.",
      en: "Explain in words why a variable is needed in the game.",
    },
  },
  {
    id: 7,
    part: "hardware",
    title: { vi: "Điện cơ bản", en: "Basic Electricity" },
    goal: {
      vi: "Hiểu mạch đóng, cực dương/âm và an toàn khi lắp ráp.",
      en: "Understand closed circuits, polarity, and safe wiring basics.",
    },
    product: {
      vi: "Mạch LED đơn nối đúng cực trên breadboard.",
      en: "A single LED circuit wired with correct polarity on a breadboard.",
    },
    primaryLevel: {
      vi: "Nối LED, điện trở và nguồn 5V theo sơ đồ.",
      en: "Wire LED, resistor, and 5V source following a diagram.",
    },
    secondaryLevel: {
      vi: "Vẽ sơ đồ mạch trước khi lắp thật.",
      en: "Sketch the circuit diagram before building.",
    },
    challenge: {
      vi: "Giải thích vì sao cần điện trở cho LED.",
      en: "Explain why the LED needs a resistor.",
    },
  },
  {
    id: 8,
    part: "hardware",
    title: { vi: "LED chớp", en: "Blinking LED" },
    goal: {
      vi: "Lập trình Arduino/mBlock để nhấp nháy LED.",
      en: "Program Arduino/mBlock to blink an LED.",
    },
    product: {
      vi: "LED nhấp nháy theo chu kỳ 1 giây.",
      en: "An LED blinking on a 1-second cycle.",
    },
    primaryLevel: {
      vi: "Dùng khối digital write và delay cơ bản.",
      en: "Use basic digital write and delay blocks.",
    },
    secondaryLevel: {
      vi: "Đổi tốc độ nhấp nháy bằng tham số delay.",
      en: "Change blink speed by adjusting delay values.",
    },
    challenge: {
      vi: "Vẽ flowchart on/off rồi đối chiếu với code khối.",
      en: "Draw an on/off flowchart and match it to block code.",
    },
  },
  {
    id: 9,
    part: "hardware",
    title: { vi: "Đèn giao thông", en: "Traffic Light" },
    goal: {
      vi: "Điều khiển nhiều LED theo trình tự logic.",
      en: "Control multiple LEDs in a logical sequence.",
    },
    product: {
      vi: "Mô hình đèn đỏ–vàng–xanh chuyển đúng thứ tự.",
      en: "A red–yellow–green traffic light model in sequence.",
    },
    primaryLevel: {
      vi: "Lập trình ba LED lần lượt bật/tắt.",
      en: "Program three LEDs to turn on/off in order.",
    },
    secondaryLevel: {
      vi: "Thêm thời gian chờ khác nhau cho từng đèn.",
      en: "Add different wait times for each light.",
    },
    challenge: {
      vi: "Mô tả trình tự đèn bằng flowchart trước khi code.",
      en: "Describe the light sequence in a flowchart before coding.",
    },
  },
  {
    id: 10,
    part: "hardware",
    title: { vi: "Nút nhấn", en: "Push Button" },
    goal: {
      vi: "Đọc tín hiệu nút nhấn và phản hồi bằng LED hoặc buzzer.",
      en: "Read a push button input and respond with LED or buzzer.",
    },
    product: {
      vi: "Nhấn nút để bật/tắt LED hoặc kêu buzzer.",
      en: "Press a button to toggle an LED or trigger a buzzer.",
    },
    primaryLevel: {
      vi: "Dùng khối đọc digital input cho nút nhấn.",
      en: "Use digital input blocks to read the button.",
    },
    secondaryLevel: {
      vi: "Thêm debounce đơn giản bằng delay ngắn.",
      en: "Add simple debounce with a short delay.",
    },
    challenge: {
      vi: "Viết flowchart if nút được nhấn thì bật LED.",
      en: "Write a flowchart: if button pressed, turn LED on.",
    },
  },
  {
    id: 11,
    part: "hardware",
    title: {
      vi: "Cảm biến siêu âm + servo",
      en: "Ultrasonic Sensor + Servo",
    },
    goal: {
      vi: "Đọc khoảng cách và điều khiển servo theo ngưỡng.",
      en: "Read distance and control a servo based on thresholds.",
    },
    product: {
      vi: "Servo quay khi vật đến gần cảm biến siêu âm.",
      en: "A servo rotates when an object comes near the ultrasonic sensor.",
    },
    primaryLevel: {
      vi: "Hiển thị khoảng cách và quay servo một góc cố định.",
      en: "Show distance and rotate servo to one fixed angle.",
    },
    secondaryLevel: {
      vi: "Đặt hai ngưỡng khoảng cách cho hai góc servo khác nhau.",
      en: "Set two distance thresholds for two servo angles.",
    },
    challenge: {
      vi: "Giải thích logic if/else trên flowchart trước lớp.",
      en: "Explain the if/else logic on a flowchart to the class.",
    },
  },
  {
    id: 12,
    part: "capstone",
    title: { vi: "Dự án cuối khóa", en: "Capstone Project" },
    goal: {
      vi: "Tổng hợp khung xe Arduino, cảm biến và cơ cấu tự chọn vào trận đấu sân.",
      en: "Combine the Arduino chassis, sensors, and a chosen mechanism into a live match.",
    },
    product: {
      vi: "Robot đấu trường (bắn bóng / kéo co / đâm bóng / đẩy hộp) — thi đấu trước lớp.",
      en: "Arena robot (ball launch / tug-of-war / balloon / box push) — compete in class.",
    },
    primaryLevel: {
      vi: "Xe chạy được bằng joystick và hoàn thành một cơ cấu chính (bắn, kéo hoặc đẩy).",
      en: "Drive with the joystick and finish one main mechanism (shoot, pull, or push).",
    },
    secondaryLevel: {
      vi: "Thêm cảm biến hỗ trợ (siêu âm khoảng cách, LED sẵn sàng, hoặc Shield).",
      en: "Add an assist sensor (range, ready LED, or shield).",
    },
    challenge: {
      vi: "Thi đấu 3 phút + giải thích chiến thuật: vì sao chọn cơ cấu đó và luật if/else chính.",
      en: "3-minute match + explain tactics: why that mechanism and the key if/else rules.",
    },
  },
] as const;
