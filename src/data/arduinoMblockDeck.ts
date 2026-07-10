import type { LocalizedText } from "@/lib/course/getLocalized";

export type DeckSlideLayout =
  | "title"
  | "section"
  | "headline-bullets"
  | "two-column"
  | "grid-4"
  | "grid-3"
  | "diagram"
  | "split-media"
  | "example"
  | "summary"
  | "closing";

export interface DeckColumn {
  label: LocalizedText;
  items: LocalizedText[];
}

export interface DeckSlide {
  id: number;
  layout: DeckSlideLayout;
  section?: LocalizedText;
  title: LocalizedText;
  subtitle?: LocalizedText;
  bullets?: LocalizedText[];
  left?: DeckColumn;
  right?: DeckColumn;
  diagram?: LocalizedText[];
  mediaAlt?: LocalizedText[];
  notes?: LocalizedText;
}

export const DECK_TOTAL_SLIDES = 30;

export const arduinoMblockDeckSlides: DeckSlide[] = [
  {
    "id": 1,
    "layout": "title",
    "title": {
      "vi": "Arduino & mBlock trong Robotics",
      "en": "Arduino & mBlock in Robotics"
    },
    "subtitle": {
      "vi": "Góc nhìn học sinh — từ khối lệnh đến robot thật",
      "en": "A student view — from blocks to real robots"
    },
    "mediaAlt": [
      {
        "vi": "[HERO: robot lắp ráp + màn hình mBlock]",
        "en": "Hero: assembled robot and mBlock screen"
      }
    ],
    "notes": {
      "vi": "Cover — logo Robotics Sóc Sơn góc dưới",
      "en": "Cover — logo Robotics Sóc Sơn góc dưới"
    }
  },
  {
    "id": 2,
    "layout": "section",
    "title": {
      "vi": "Thông tin cơ bản",
      "en": "Core concepts"
    },
    "section": {
      "vi": "Phần 1",
      "en": "Part 1"
    },
    "subtitle": {
      "vi": "Dưới góc nhìn Robotics",
      "en": "Through a robotics lens"
    }
  },
  {
    "id": 3,
    "layout": "headline-bullets",
    "title": {
      "vi": "Arduino — \"Bộ não\" và \"Hệ thần kinh\" của Robot",
      "en": "Arduino — the robot \"brain\" and \"nervous system\""
    },
    "section": {
      "vi": "1.1",
      "en": "1.1"
    },
    "bullets": [
      {
        "vi": "Microcontroller — mạch điều khiển trung tâm",
        "en": "Microcontroller — central control board"
      },
      {
        "vi": "Tiếp nhận tín hiệu môi trường → xử lý → ra lệnh cơ khí",
        "en": "Reads environment signals → processes → drives mechanics"
      }
    ],
    "mediaAlt": [
      {
        "vi": "[IMAGE: Arduino Uno + dây cảm biến/động cơ]",
        "en": "Arduino Uno with sensors and motors"
      }
    ]
  },
  {
    "id": 4,
    "layout": "headline-bullets",
    "title": {
      "vi": "Vai trò trung tâm",
      "en": "Central role"
    },
    "section": {
      "vi": "1.1",
      "en": "1.1"
    },
    "bullets": [
      {
        "vi": "Chịu trách nhiệm tiếp nhận thông tin từ môi trường",
        "en": "Receives information from the environment"
      },
      {
        "vi": "Xử lý dữ liệu vật lý (khoảng cách, màu, góc nghiêng…)",
        "en": "Processes physical data (distance, color, tilt…)"
      },
      {
        "vi": "Điều khiển các bộ phận cơ khí hoạt động",
        "en": "Controls mechanical parts"
      }
    ],
    "mediaAlt": [
      {
        "vi": "[DIAGRAM: Input → MCU → Output]",
        "en": "Diagram: Input → MCU → Output"
      }
    ]
  },
  {
    "id": 5,
    "layout": "two-column",
    "title": {
      "vi": "Kết nối phần cứng Robot",
      "en": "Robot hardware connections"
    },
    "section": {
      "vi": "1.1",
      "en": "1.1"
    },
    "left": {
      "label": {
        "vi": "Cảm biến — Giác quan",
        "en": "Sensors — senses"
      },
      "items": [
        {
          "vi": "Siêu âm",
          "en": "Ultrasonic"
        },
        {
          "vi": "Dò đường",
          "en": "Line tracking"
        },
        {
          "vi": "Màu sắc",
          "en": "Color"
        },
        {
          "vi": "Góc nghiêng",
          "en": "Tilt"
        }
      ]
    },
    "right": {
      "label": {
        "vi": "Cơ cấu chấp hành — Cơ bắp",
        "en": "Actuators — muscles"
      },
      "items": [
        {
          "vi": "Động cơ DC",
          "en": "DC motor"
        },
        {
          "vi": "Servo",
          "en": "Servo"
        },
        {
          "vi": "Động cơ bước",
          "en": "Stepper motor"
        }
      ]
    }
  },
  {
    "id": 6,
    "layout": "grid-4",
    "title": {
      "vi": "Hệ thống cảm biến (Sensors)",
      "en": "Sensor system"
    },
    "section": {
      "vi": "1.1",
      "en": "1.1"
    },
    "bullets": [
      {
        "vi": "Siêu âm — tránh vật cản",
        "en": "Ultrasonic — obstacle avoidance"
      },
      {
        "vi": "Dò đường — bám vạch",
        "en": "Line — follow the track"
      },
      {
        "vi": "Màu sắc — nhận biết vùng",
        "en": "Color — zone detection"
      },
      {
        "vi": "Góc nghiêng — giữ thăng bằng",
        "en": "Tilt — balance"
      }
    ],
    "mediaAlt": [
      {
        "vi": "[ICON: ultrasonic]",
        "en": "Ultrasonic icon"
      },
      {
        "vi": "[ICON: line]",
        "en": "Line sensor icon"
      },
      {
        "vi": "[ICON: color]",
        "en": "Color sensor icon"
      },
      {
        "vi": "[ICON: tilt]",
        "en": "Tilt sensor icon"
      }
    ]
  },
  {
    "id": 7,
    "layout": "grid-3",
    "title": {
      "vi": "Cơ cấu chấp hành (Actuators)",
      "en": "Actuators"
    },
    "section": {
      "vi": "1.1",
      "en": "1.1"
    },
    "bullets": [
      {
        "vi": "DC — bánh xe di chuyển",
        "en": "DC — wheel drive"
      },
      {
        "vi": "Servo — khớp cánh tay gắp, khớp chân",
        "en": "Servo — arm grip, leg joints"
      },
      {
        "vi": "Bước — độ chính xác cao",
        "en": "Stepper — high precision"
      }
    ],
    "mediaAlt": [
      {
        "vi": "[PHOTO: DC motor]",
        "en": "DC motor photo"
      },
      {
        "vi": "[PHOTO: servo]",
        "en": "Servo photo"
      },
      {
        "vi": "[PHOTO: stepper]",
        "en": "Stepper motor photo"
      }
    ]
  },
  {
    "id": 8,
    "layout": "section",
    "title": {
      "vi": "mBlock — \"Tư duy\" và \"Hành vi\"",
      "en": "mBlock — \"thinking\" and \"behavior\""
    },
    "section": {
      "vi": "1.2",
      "en": "1.2"
    },
    "subtitle": {
      "vi": "Phần mềm định hình cách robot hành xử",
      "en": "Software that shapes how the robot acts"
    }
  },
  {
    "id": 9,
    "layout": "headline-bullets",
    "title": {
      "vi": "Vai trò phần mềm",
      "en": "Software role"
    },
    "section": {
      "vi": "1.2",
      "en": "1.2"
    },
    "bullets": [
      {
        "vi": "Môi trường xây dựng thuật toán cho robot",
        "en": "Environment to build robot algorithms"
      },
      {
        "vi": "Định nghĩa logic: \"Gặp vật cản thì lùi\"",
        "en": "Define logic: \"If obstacle, reverse\""
      },
      {
        "vi": "\"Thấy vạch đen thì bám theo\"",
        "en": "\"If black line seen, follow it\""
      }
    ],
    "mediaAlt": [
      {
        "vi": "[SCREENSHOT: mBlock workspace]",
        "en": "mBlock workspace screenshot"
      }
    ]
  },
  {
    "id": 10,
    "layout": "diagram",
    "title": {
      "vi": "Ví dụ hành vi robot",
      "en": "Example robot behavior"
    },
    "section": {
      "vi": "1.2",
      "en": "1.2"
    },
    "diagram": [
      {
        "vi": "Cảm biến đọc tín hiệu",
        "en": "Sensor reads signal"
      },
      {
        "vi": "↓",
        "en": "↓"
      },
      {
        "vi": "Khối Nếu… Thì… quyết định",
        "en": "If…Then block decides"
      },
      {
        "vi": "↓",
        "en": "↓"
      },
      {
        "vi": "Lệnh điều khiển motor / servo",
        "en": "Motor / servo command"
      }
    ]
  },
  {
    "id": 11,
    "layout": "headline-bullets",
    "title": {
      "vi": "Thư viện Robotics chuyên dụng",
      "en": "Robotics extension library"
    },
    "section": {
      "vi": "1.2",
      "en": "1.2"
    },
    "bullets": [
      {
        "vi": "Extension dành riêng cho Robot",
        "en": "Extensions built for robots"
      },
      {
        "vi": "\"Di chuyển tiến với tốc độ X\"",
        "en": "\"Move forward at speed X\""
      },
      {
        "vi": "\"Quay Servo góc Y độ\"",
        "en": "\"Turn servo to angle Y\""
      }
    ],
    "mediaAlt": [
      {
        "vi": "[UI: khối motor mBlock]",
        "en": "mBlock motor blocks UI"
      }
    ]
  },
  {
    "id": 12,
    "layout": "grid-3",
    "title": {
      "vi": "Hệ sinh thái robot giáo dục",
      "en": "Educational robot ecosystem"
    },
    "section": {
      "vi": "1.2",
      "en": "1.2"
    },
    "bullets": [
      {
        "vi": "mBot",
        "en": "mBot"
      },
      {
        "vi": "mBot Ranger",
        "en": "mBot Ranger"
      },
      {
        "vi": "Ultimate Robot Kit",
        "en": "Ultimate Robot Kit"
      }
    ],
    "mediaAlt": [
      {
        "vi": "[PRODUCT: mBot]",
        "en": "mBot product"
      },
      {
        "vi": "[PRODUCT: Ranger]",
        "en": "Ranger product"
      },
      {
        "vi": "[PRODUCT: Ultimate]",
        "en": "Ultimate Kit product"
      }
    ],
    "notes": {
      "vi": "Lõi Arduino — lập trình chung một nền tảng",
      "en": "Arduino core — one platform for all"
    }
  },
  {
    "id": 13,
    "layout": "section",
    "title": {
      "vi": "Ưu điểm khi ứng dụng vào giảng dạy",
      "en": "Teaching advantages"
    },
    "section": {
      "vi": "Phần 2",
      "en": "Part 2"
    },
    "subtitle": {
      "vi": "Phần cứng tự do + phần mềm đơn giản",
      "en": "Flexible hardware + simple software"
    }
  },
  {
    "id": 14,
    "layout": "split-media",
    "title": {
      "vi": "Arduino — Tùy biến cơ khí tự do",
      "en": "Arduino — free mechanical customization"
    },
    "section": {
      "vi": "2.1",
      "en": "2.1"
    },
    "bullets": [
      {
        "vi": "Không bị giới hạn một hình dáng cố định",
        "en": "Not locked to one fixed shape"
      },
      {
        "vi": "Một mạch → xe 2 bánh, robot nhện, cánh tay, tàu mini",
        "en": "One board → 2-wheel car, spider bot, arm, mini boat"
      }
    ],
    "mediaAlt": [
      {
        "vi": "[COLLAGE: 4 hình dạng robot DIY]",
        "en": "Collage: four DIY robot forms"
      }
    ]
  },
  {
    "id": 15,
    "layout": "headline-bullets",
    "title": {
      "vi": "Tiếp cận cơ điện tử thực tế",
      "en": "Hands-on mechatronics"
    },
    "section": {
      "vi": "2.1",
      "en": "2.1"
    },
    "bullets": [
      {
        "vi": "Đấu nối mạch điện thật",
        "en": "Wire real circuits"
      },
      {
        "vi": "Phân biệt cổng Analog / Digital",
        "en": "Learn Analog vs Digital pins"
      },
      {
        "vi": "Hiểu động cơ, bánh răng — nền tảng mechatronics",
        "en": "Understand motors and gears — mechatronics foundation"
      }
    ],
    "mediaAlt": [
      {
        "vi": "[PHOTO: học sinh đấu dây breadboard]",
        "en": "Student wiring a breadboard"
      }
    ]
  },
  {
    "id": 16,
    "layout": "section",
    "title": {
      "vi": "mBlock — Đơn giản hóa thuật toán Robot",
      "en": "mBlock — simpler robot algorithms"
    },
    "section": {
      "vi": "2.2",
      "en": "2.2"
    },
    "subtitle": {
      "vi": "Tư duy logic không bị ngợp cú pháp",
      "en": "Logic thinking without syntax overload"
    }
  },
  {
    "id": 17,
    "layout": "diagram",
    "title": {
      "vi": "Lập trình bằng khối hình",
      "en": "Block-based programming"
    },
    "section": {
      "vi": "2.2",
      "en": "2.2"
    },
    "diagram": [
      {
        "vi": "Forever { đọc cảm biến }",
        "en": "Forever { read sensor }"
      },
      {
        "vi": "  → If (vật cản) { lùi }",
        "en": "  → If (obstacle) { reverse }"
      },
      {
        "vi": "  → Else { tiến }",
        "en": "  → Else { forward }"
      },
      {
        "vi": "Giải mê cung · né vật cản · tự động hóa",
        "en": "Maze solving · avoidance · automation"
      }
    ],
    "mediaAlt": [
      {
        "vi": "[UI: khối If / Else / Forever]",
        "en": "If / Else / Forever blocks UI"
      }
    ]
  },
  {
    "id": 18,
    "layout": "two-column",
    "title": {
      "vi": "Cầu nối lên C++ chuyên nghiệp",
      "en": "Bridge to professional C++"
    },
    "section": {
      "vi": "2.2",
      "en": "2.2"
    },
    "notes": {
      "vi": "Một nút chuyển đổi — không học lại từ đầu",
      "en": "One-click switch — no relearning from scratch"
    },
    "left": {
      "label": {
        "vi": "Chế độ khối",
        "en": "Block mode"
      },
      "items": [
        {
          "vi": "Kéo thả trực quan",
          "en": "Visual drag-and-drop"
        },
        {
          "vi": "Phù hợp người mới",
          "en": "Great for beginners"
        }
      ]
    },
    "right": {
      "label": {
        "vi": "Chế độ mã nguồn",
        "en": "Source code mode"
      },
      "items": [
        {
          "vi": "Arduino C++",
          "en": "Arduino C++"
        },
        {
          "vi": "Thuật toán nâng cao",
          "en": "Advanced algorithms"
        }
      ]
    }
  },
  {
    "id": 19,
    "layout": "section",
    "title": {
      "vi": "Bổ trợ qua lại trong dự án Robotics",
      "en": "Working together in a robotics project"
    },
    "section": {
      "vi": "Phần 3",
      "en": "Part 3"
    },
    "subtitle": {
      "vi": "Giải bài toán Cơ khí + Điện tử + CNTT",
      "en": "Mechanics + electronics + computing"
    }
  },
  {
    "id": 20,
    "layout": "diagram",
    "title": {
      "vi": "Ba trụ cột của một robot",
      "en": "Three pillars of a robot"
    },
    "section": {
      "vi": "3",
      "en": "3"
    },
    "diagram": [
      {
        "vi": "Cơ khí (khung, bánh, khớp)",
        "en": "Mechanics (frame, wheels, joints)"
      },
      {
        "vi": "↔ Điện tử (Arduino, cảm biến, motor)",
        "en": "↔ Electronics (Arduino, sensors, motors)"
      },
      {
        "vi": "↔ CNTT (mBlock, thuật toán, AI)",
        "en": "↔ Computing (mBlock, algorithms, AI)"
      }
    ]
  },
  {
    "id": 21,
    "layout": "diagram",
    "title": {
      "vi": "Vòng lặp xử lý thời gian thực",
      "en": "Real-time processing loop"
    },
    "section": {
      "vi": "3",
      "en": "3"
    },
    "diagram": [
      {
        "vi": "Arduino thu khoảng cách tới tường",
        "en": "Arduino reads distance to wall"
      },
      {
        "vi": "→ mBlock xử lý logic",
        "en": "→ mBlock processes logic"
      },
      {
        "vi": "→ Lệnh dừng motor ngay lập tức",
        "en": "→ Stop motor immediately"
      },
      {
        "vi": "Robot không va chạm",
        "en": "Robot avoids collision"
      }
    ],
    "mediaAlt": [
      {
        "vi": "[ANIMATION: sense-think-act loop]",
        "en": "Sense-think-act loop animation"
      }
    ]
  },
  {
    "id": 22,
    "layout": "headline-bullets",
    "title": {
      "vi": "Tích hợp AI & IoT",
      "en": "AI & IoT integration"
    },
    "section": {
      "vi": "3",
      "en": "3"
    },
    "bullets": [
      {
        "vi": "Robot Arduino truyền thống + tính năng thông minh",
        "en": "Classic Arduino robot + smart features"
      },
      {
        "vi": "Camera + AI nhận diện",
        "en": "Camera + AI recognition"
      },
      {
        "vi": "Micro + điều khiển giọng nói",
        "en": "Microphone + voice control"
      }
    ],
    "mediaAlt": [
      {
        "vi": "[BADGE: AI] [BADGE: IoT]",
        "en": "AI badge"
      }
    ]
  },
  {
    "id": 23,
    "layout": "example",
    "title": {
      "vi": "Robot nhận diện khuôn mặt",
      "en": "Face recognition robot"
    },
    "section": {
      "vi": "3",
      "en": "3"
    },
    "bullets": [
      {
        "vi": "Camera máy tính nhận diện người quen (AI mBlock)",
        "en": "PC camera recognizes familiar faces (mBlock AI)"
      },
      {
        "vi": "Kích hoạt Arduino mở chốt cửa",
        "en": "Triggers Arduino to unlock a door latch"
      }
    ],
    "mediaAlt": [
      {
        "vi": "[FLOW: face → unlock]",
        "en": "Flow: face → unlock"
      }
    ]
  },
  {
    "id": 24,
    "layout": "example",
    "title": {
      "vi": "Robot điều khiển bằng giọng nói",
      "en": "Voice-controlled robot"
    },
    "section": {
      "vi": "3",
      "en": "3"
    },
    "bullets": [
      {
        "vi": "mBlock tiếp nhận giọng nói qua micro",
        "en": "mBlock receives voice via microphone"
      },
      {
        "vi": "Chuyển thành lệnh dòng điện trên Arduino",
        "en": "Converts to current commands on Arduino"
      },
      {
        "vi": "Robot di chuyển theo ý muốn",
        "en": "Robot moves as intended"
      }
    ],
    "mediaAlt": [
      {
        "vi": "[FLOW: voice → command → move]",
        "en": "Flow: voice → command → move"
      }
    ]
  },
  {
    "id": 25,
    "layout": "section",
    "title": {
      "vi": "Tại sao hoàn hảo cho trẻ em?",
      "en": "Why is it perfect for kids?"
    },
    "section": {
      "vi": "Phần 4",
      "en": "Part 4"
    },
    "subtitle": {
      "vi": "Học Robotics qua trải nghiệm thật",
      "en": "Learn robotics through real experience"
    }
  },
  {
    "id": 26,
    "layout": "split-media",
    "title": {
      "vi": "Trực quan hóa kết quả — Học qua hành động",
      "en": "See results — learn by doing"
    },
    "section": {
      "vi": "4",
      "en": "4"
    },
    "bullets": [
      {
        "vi": "Không chỉ nhân vật ảo trên màn hình",
        "en": "Not only virtual characters on screen"
      },
      {
        "vi": "Tự lắp ráp + viết code → robot chuyển động thật",
        "en": "Build + code → a real robot moves in space"
      },
      {
        "vi": "Kích thích trí tò mò cực đại",
        "en": "Sparks intense curiosity"
      }
    ],
    "mediaAlt": [
      {
        "vi": "[VIDEO STILL: học sinh chạy robot]",
        "en": "Video still: student running a robot"
      }
    ]
  },
  {
    "id": 27,
    "layout": "two-column",
    "title": {
      "vi": "Rèn luyện Debugging thực tế",
      "en": "Real-world debugging practice"
    },
    "section": {
      "vi": "4",
      "en": "4"
    },
    "notes": {
      "vi": "Robot sai hướng → tự tìm nguyên nhân",
      "en": "Robot goes wrong → find the cause yourself"
    },
    "left": {
      "label": {
        "vi": "Lỗi phần cứng?",
        "en": "Hardware issue?"
      },
      "items": [
        {
          "vi": "Dây động cơ cắm nhầm",
          "en": "Motor wires plugged wrong"
        },
        {
          "vi": "Cảm biến bị lệch",
          "en": "Sensor misaligned"
        }
      ]
    },
    "right": {
      "label": {
        "vi": "Lỗi phần mềm?",
        "en": "Software issue?"
      },
      "items": [
        {
          "vi": "Khối logic sai",
          "en": "Wrong logic block"
        },
        {
          "vi": "Điều kiện If không đúng",
          "en": "If condition incorrect"
        }
      ]
    }
  },
  {
    "id": 28,
    "layout": "headline-bullets",
    "title": {
      "vi": "Chuẩn bị cho sân chơi công nghệ",
      "en": "Ready for tech competitions"
    },
    "section": {
      "vi": "4",
      "en": "4"
    },
    "bullets": [
      {
        "vi": "Sáng tạo Thanh thiếu niên nhi đồng",
        "en": "Youth creativity contests"
      },
      {
        "vi": "MakeX · WRO · các cuộc thi Robotics học sinh",
        "en": "MakeX · WRO · student robotics events"
      },
      {
        "vi": "Tư duy máy tính vững — tự tin tham gia STEM",
        "en": "Strong computational thinking — confident in STEM"
      }
    ],
    "mediaAlt": [
      {
        "vi": "[LOGOS: cuộc thi]",
        "en": "Competition logos"
      }
    ]
  },
  {
    "id": 29,
    "layout": "summary",
    "title": {
      "vi": "Tóm tắt",
      "en": "Summary"
    },
    "bullets": [
      {
        "vi": "Arduino = não & thần kinh — cảm biến + động cơ thật",
        "en": "Arduino = brain & nerves — real sensors + motors"
      },
      {
        "vi": "mBlock = tư duy & hành vi — khối lệnh → C++",
        "en": "mBlock = thinking & behavior — blocks → C++"
      },
      {
        "vi": "Kết hợp = robot hoàn chỉnh, sẵn sàng cho cuộc thi",
        "en": "Together = complete robot, competition-ready"
      }
    ]
  },
  {
    "id": 30,
    "layout": "closing",
    "title": {
      "vi": "Từ Khối Lệnh Đến Phần Cứng",
      "en": "From Blocks to Hardware"
    },
    "subtitle": {
      "vi": "Robotics Sóc Sơn — Khóa học STEM thực hành",
      "en": "Robotics Sóc Sơn — hands-on STEM course"
    },
    "mediaAlt": [
      {
        "vi": "[CTA: Đăng ký /course]",
        "en": "CTA: Register at /course"
      }
    ],
    "notes": {
      "vi": "End slide — QR hoặc link đăng ký",
      "en": "End slide — QR or registration link"
    }
  }
];
