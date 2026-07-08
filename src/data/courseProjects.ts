import type { LocalizedText, LocalizedStringList } from "@/lib/course/getLocalized";

/** Optional path under /public — leave empty to show MediaPlaceholder. */
export type CapstoneMedia = {
  src?: string;
  alt: LocalizedText;
  caption: LocalizedText;
};

export type CapstoneVariant = {
  id: string;
  title: LocalizedText;
  tagline: LocalizedText;
  setup: LocalizedText;
  creative: LocalizedStringList;
  gameplay: LocalizedText;
  media: CapstoneMedia;
};

export type CapstoneArena = {
  title: LocalizedText;
  subtitle: LocalizedText;
  badge: LocalizedText;
  heroMedia: CapstoneMedia;
  platformTitle: LocalizedText;
  platformItems: LocalizedStringList;
  platformMedia: CapstoneMedia;
  arenaTitle: LocalizedText;
  arenaSetup: LocalizedText;
  arenaRules: LocalizedStringList;
  arenaMedia: CapstoneMedia;
  variantsTitle: LocalizedText;
  variantsLead: LocalizedText;
  variants: CapstoneVariant[];
};

/**
 * Capstone = shared drive base + student-chosen mechanisms + live arena demo.
 * Media `src` empty → UI shows “Ảnh sẽ được cập nhật” until assets land.
 */
export const courseCapstone: CapstoneArena = {
  title: {
    vi: "Dự án cuối khóa: Đấu trường robot",
    en: "Capstone: Robot arena challenge",
  },
  subtitle: {
    vi: "Mỗi đội nhận cùng một khung xe Arduino. Học sinh tự chọn cơ cấu gạt và chiến thuật — rồi tranh đẩy hộp về căn cứ trước lớp.",
    en: "Every team starts with the same Arduino chassis. Students choose pusher designs and tactics — then race to push boxes home in a live class match.",
  },
  badge: {
    vi: "Capstone",
    en: "Capstone",
  },
  heroMedia: {
    src: "/Images/Course/capstone-hero.webp",
    alt: {
      vi: "Robot thi đấu trên sân đấu trường đang nâng khối vàng trước khán giả",
      en: "Competition robot on the arena floor lifting a yellow block before spectators",
    },
    caption: {
      vi: "Demo / thi đấu trên đấu trường — đích đến cuối khóa",
      en: "Live arena competition — the course end goal",
    },
  },
  platformTitle: {
    vi: "Khung nền tảng (cả hai đội đều có)",
    en: "Shared platform (both teams)",
  },
  platformItems: {
    vi: [
      "Hệ thống di chuyển: khung xe bánh đà, Arduino Uno, mạch công suất điều khiển động cơ",
      "Hệ thống điều khiển: tay cầm Bluetooth / joystick — lái xe tới vị trí thuận lợi",
    ],
    en: [
      "Drive system: wheeled chassis, Arduino Uno, and a motor-driver board",
      "Control system: Bluetooth / joystick controller — drive to a good shooting position",
    ],
  },
  platformMedia: {
    src: "/Images/Course/capstone-chassis.webp",
    alt: {
      vi: "Khung xe robot 4 bánh acrylic với cảm biến siêu âm và cảm biến dò đường",
      en: "Four-wheel acrylic robot chassis with ultrasonic head and line sensors",
    },
    caption: {
      vi: "Khung nền tảng — chassis học sinh dùng làm điểm xuất phát",
      en: "Shared platform — the chassis every team starts with",
    },
  },
  arenaTitle: {
    vi: "Trận chính: Đẩy hộp về căn cứ",
    en: "Main match: Box to base",
  },
  arenaSetup: {
    vi: "Sân phẳng, nhiều hộp giấy màu ở giữa và vòng giới hạn vẽ sẵn. Mỗi đội bốc ngẫu nhiên một màu. Thời gian: 3 phút.",
    en: "Flat field, colored paper boxes in the center, and a marked boundary ring. Each team draws a color at random. Match length: 3 minutes.",
  },
  arenaRules: {
    vi: [
      "Xuất phát hai phía — lái xe và gạt hộp đúng màu về căn cứ",
      "Hộp đúng màu về căn cứ: +3 điểm",
      "Chạm được hộp đúng màu nhưng chưa về căn cứ: +1 điểm",
      "Hết giờ — đội nhiều điểm hơn thắng",
    ],
    en: [
      "Start from opposite sides — drive and push your color boxes home",
      "Your color box reaches base: +3 points",
      "Touch your color box but it is not home yet: +1 point",
      "At time-up — higher score wins",
    ],
  },
  arenaMedia: {
    src: "",
    alt: {
      vi: "Sơ đồ sân đẩy hộp về căn cứ",
      en: "Box-to-base arena field diagram",
    },
    caption: {
      vi: "Ảnh / sơ đồ sân đẩy hộp — sẽ cập nhật",
      en: "Box-pusher field photo / diagram — coming soon",
    },
  },
  variantsTitle: {
    vi: "Đẩy hộp về căn cứ",
    en: "Box to base",
  },
  variantsLead: {
    vi: "Một thử thách cuối khóa — lái xe, gạt đúng hộp, ghi điểm trước lớp.",
    en: "One capstone challenge — drive, push the right boxes, and score live in class.",
  },
  variants: [
    {
      id: "box-pusher",
      title: {
        vi: "Đẩy hộp về căn cứ",
        en: "Box to base",
      },
      tagline: {
        vi: "Lái xe, gạt hộp, ghi điểm — dễ hiểu, dễ hồi hộp",
        en: "Drive, push, score — easy to follow, hard to look away",
      },
      setup: {
        vi: "Nhiều hộp giấy màu khác nhau giữa sân; vòng giới hạn vẽ sẵn. Mỗi đội bốc ngẫu nhiên một màu.",
        en: "Colored paper boxes in the center; a marked boundary ring. Each team draws a color at random.",
      },
      creative: {
        vi: [
          "Cơ khí: tấm gạt rộng (như xe ủi) hoặc cánh tay đẩy từ bên hông",
          "Code: cảm biến màu để tìm hộp đúng màu đội mình",
          "Chiến thuật: chặn đường đối thủ hoặc đẩy hộp sai màu ra xa căn cứ",
        ],
        en: [
          "Hardware: a wide bulldozer blade or a side-mounted pusher arm",
          "Code: color sensing to find your team’s assigned box color",
          "Tactics: block the rival’s lane or knock the wrong-color box away from base",
        ],
      },
      gameplay: {
        vi: "Xuất phát hai phía — tranh đẩy hộp đúng màu về căn cứ trước khi hết giờ.",
        en: "Start from opposite sides — race to push your color boxes back to base before time is up.",
      },
      media: {
        src: "",
        alt: { vi: "Robot đẩy hộp về căn cứ", en: "Box-pusher robots" },
        caption: {
          vi: "Ảnh đẩy hộp — sẽ cập nhật",
          en: "Box pusher photo — coming soon",
        },
      },
    },
  ],
};
