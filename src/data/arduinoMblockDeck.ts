import type { LocalizedText } from "@/lib/course/getLocalized";

export type DeckSlideLayout =
  | "cover-hero"
  | "section-split-right"
  | "editorial-image-right"
  | "editorial-image-left"
  | "compare-panels-side"
  | "mosaic-four-up"
  | "mosaic-three-row"
  | "section-image-bottom"
  | "center-stack-image"
  | "flow-diagram-side"
  | "image-hero-top"
  | "showcase-trio"
  | "section-band-image"
  | "split-dual-images"
  | "caption-over-image"
  | "section-compact"
  | "diagram-card-image"
  | "bridge-compare"
  | "section-wide-image"
  | "pillars-horizontal"
  | "loop-vertical"
  | "feature-wide-image"
  | "example-card-side"
  | "example-image-top"
  | "section-emotive-bg"
  | "action-image-major"
  | "debug-checklist"
  | "trophy-showcase"
  | "recap-three-col"
  | "closing-qr";

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

export const DECK_TOTAL_SLIDES = 26;

export const arduinoMblockDeckSlides: DeckSlide[] = [
  {
    "id": 1,
    "layout": "cover-hero",
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
    "layout": "section-split-right",
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
    },
    "mediaAlt": [
      {
        "vi": "Đội Robotics Sóc Sơn giới thiệu phần thông tin cơ bản về robot",
        "en": "Robotics Sóc Sơn team introducing core robotics concepts"
      }
    ]
  },
  {
    "id": 3,
    "layout": "editorial-image-right",
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
    "layout": "editorial-image-left",
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
    "layout": "compare-panels-side",
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
    },
    "mediaAlt": [
      {
        "vi": "Sơ đồ kết nối cảm biến và cơ cấu chấp hành lên mạch Arduino trên robot",
        "en": "Diagram of sensors and actuators wired to an Arduino board on a robot"
      }
    ]
  },
  {
    "id": 6,
    "layout": "mosaic-four-up",
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
    "layout": "mosaic-three-row",
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
    "layout": "section-image-bottom",
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
    },
    "mediaAlt": [
      {
        "vi": "Học sinh lập trình hành vi robot bằng khối lệnh mBlock",
        "en": "Student programming robot behavior with mBlock blocks"
      }
    ]
  },
  {
    "id": 9,
    "layout": "center-stack-image",
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
        "vi": "Giao diện mBlock — môi trường lập trình khối lệnh cho robot",
        "en": "mBlock interface — block programming environment for robots"
      }
    ]
  },
  {
    "id": 10,
    "layout": "flow-diagram-side",
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
    ],
    "mediaAlt": [
      {
        "vi": "Sơ đồ luồng: cảm biến đọc tín hiệu, khối If–Then quyết định, rồi ra lệnh motor",
        "en": "Flow diagram: sensor reads signal, If–Then block decides, then motor command"
      },
      {
        "vi": "Robot FTC trên sân thi đấu — hành vi được điều khiển bởi cảm biến và khối lệnh",
        "en": "FTC robot on the competition field — behavior driven by sensors and command blocks"
      }
    ]
  },
  {
    "id": 13,
    "layout": "section-band-image",
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
    },
    "mediaAlt": [
      {
        "vi": "Học sinh thực hành lắp robot Arduino trong buổi giảng dạy",
        "en": "Students assembling an Arduino robot during a teaching session"
      }
    ]
  },
  {
    "id": 14,
    "layout": "split-dual-images",
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
    "layout": "caption-over-image",
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
    "layout": "section-compact",
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
    },
    "mediaAlt": [
      {
        "vi": "Giao diện mBlock với các khối lệnh robot kéo thả trực quan",
        "en": "mBlock interface showing drag-and-drop robot programming blocks"
      }
    ]
  },
  {
    "id": 17,
    "layout": "diagram-card-image",
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
    "layout": "bridge-compare",
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
    },
    "mediaAlt": [
      {
        "vi": "Robot FTC lập trình bằng khối lệnh mBlock trong chế độ kéo thả",
        "en": "FTC robot programmed with mBlock in drag-and-drop block mode"
      },
      {
        "vi": "Robot FTC cùng mạch, minh họa chuyển sang mã Arduino C++ chuyên nghiệp",
        "en": "Same FTC robot illustrating switch to professional Arduino C++ code"
      }
    ]
  },
  {
    "id": 19,
    "layout": "section-wide-image",
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
    },
    "mediaAlt": [
      {
        "vi": "Robot thi đấu FTC với khung cơ khí, mạch điện và code hoạt động phối hợp",
        "en": "Competition FTC robot with mechanics, electronics, and code working together"
      }
    ]
  },
  {
    "id": 20,
    "layout": "pillars-horizontal",
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
    ],
    "mediaAlt": [
      {
        "vi": "Robot hoàn chỉnh minh họa ba trụ cột: cơ khí, điện tử và công nghệ thông tin",
        "en": "Complete robot illustrating the three pillars: mechanics, electronics, and computing"
      }
    ]
  },
  {
    "id": 22,
    "layout": "feature-wide-image",
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
    "layout": "example-card-side",
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
    "layout": "example-image-top",
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
    "layout": "section-emotive-bg",
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
    },
    "mediaAlt": [
      {
        "vi": "Học sinh vui mừng khi robot tự chuyển động sau khi lắp ráp và lập trình",
        "en": "Students excited as their robot moves after building and programming it"
      }
    ]
  },
  {
    "id": 26,
    "layout": "action-image-major",
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
    "layout": "debug-checklist",
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
    },
    "mediaAlt": [
      {
        "vi": "Học sinh kiểm tra dây và khối lệnh khi robot chạy sai hướng",
        "en": "Student checking wires and logic blocks when the robot goes the wrong way"
      }
    ]
  },
  {
    "id": 28,
    "layout": "trophy-showcase",
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
    "id": 30,
    "layout": "closing-qr",
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
        "vi": "Mã QR đăng ký khóa học tại roboticssocson.minhmice.com/course",
        "en": "Course registration QR for roboticssocson.minhmice.com/course"
      }
    ],
    "notes": {
      "vi": "End slide — QR hoặc link đăng ký",
      "en": "End slide — QR or registration link"
    }
  }
];
