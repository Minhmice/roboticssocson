import type { LocalizedText, LocalizedStringList } from "@/lib/course/getLocalized";

export type CourseProject = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  components: LocalizedStringList;
  logic: LocalizedStringList;
  skills: LocalizedStringList;
  imageSrc?: string;
  imageAlt?: LocalizedText;
};

export const courseProjects: CourseProject[] = [
  {
    id: "project-smart-bin",
    title: {
      vi: "Thùng rác thông minh",
      en: "Smart trash bin",
    },
    description: {
      vi: "Cảm biến siêu âm phát hiện tay đưa vào — servo mở nắp tự động, đóng sau vài giây.",
      en: "Ultrasonic sensor detects a hand — servo opens the lid automatically and closes after a few seconds.",
    },
    components: {
      vi: [
        "Arduino / mBlock",
        "Cảm biến siêu âm HC-SR04",
        "Servo SG90",
        "Nguồn 5V, dây jumper",
        "Khung thùng rác mô hình",
      ],
      en: [
        "Arduino / mBlock",
        "HC-SR04 ultrasonic sensor",
        "SG90 servo",
        "5V power, jumper wires",
        "Model bin frame",
      ],
    },
    logic: {
      vi: [
        "Đo khoảng cách liên tục",
        "Nếu tay < ngưỡng → mở nắp (servo 90°)",
        "Chờ 2–3 giây → đóng nắp",
        "Lặp lại vòng đo",
      ],
      en: [
        "Measure distance continuously",
        "If hand < threshold → open lid (servo 90°)",
        "Wait 2–3 seconds → close lid",
        "Repeat measurement loop",
      ],
    },
    skills: {
      vi: [
        "Đọc cảm biến siêu âm",
        "Điều khiển servo",
        "Điều kiện if/else",
        "Vòng lặp forever",
        "Trình bày demo sản phẩm",
      ],
      en: [
        "Read ultrasonic sensor",
        "Control servo",
        "If/else conditions",
        "Forever loop",
        "Present a product demo",
      ],
    },
  },
  {
    id: "project-parking-warning",
    title: {
      vi: "Cảnh báo lùi xe",
      en: "Reverse parking warning",
    },
    description: {
      vi: "Khoảng cách càng gần vật cản — LED nhấp nháy hoặc buzzer kêu càng nhanh.",
      en: "The closer to an obstacle — LEDs blink or buzzer beeps faster.",
    },
    components: {
      vi: [
        "Arduino / mBlock",
        "Cảm biến siêu âm",
        "LED đỏ / vàng / xanh",
        "Buzzer (tuỳ chọn)",
        "Breadboard và điện trở",
      ],
      en: [
        "Arduino / mBlock",
        "Ultrasonic sensor",
        "Red / yellow / green LEDs",
        "Buzzer (optional)",
        "Breadboard and resistors",
      ],
    },
    logic: {
      vi: [
        "Đo khoảng cách phía sau",
        "Xa: LED xanh sáng ổn định",
        "Trung bình: LED vàng nhấp chậm",
        "Gần: LED đỏ + buzzer nhấp nhanh",
      ],
      en: [
        "Measure rear distance",
        "Far: steady green LED",
        "Medium: slow yellow blink",
        "Close: fast red LED + buzzer",
      ],
    },
    skills: {
      vi: [
        "Map khoảng cách → mức cảnh báo",
        "PWM / nhịp nhấp LED",
        "Điều kiện nhiều nhánh",
        "Debug ngưỡng cảm biến",
        "Giải thích an toàn thực tế",
      ],
      en: [
        "Map distance → warning level",
        "PWM / LED blink timing",
        "Multi-branch conditions",
        "Debug sensor thresholds",
        "Explain real-world safety",
      ],
    },
  },
];
