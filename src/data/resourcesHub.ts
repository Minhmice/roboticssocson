import type { Localized } from "@/lib/i18n/localized";
import { getArticleBySlug, type ResourceArticle } from "@/data/resources";

export interface LearningPath {
  id: string;
  title: Localized<string>;
  blurb: Localized<string>;
  articles: readonly ResourceArticle[];
}

function path(id: string, title: Localized<string>, blurb: Localized<string>, keys: readonly string[]): LearningPath {
  const articles = keys.map((key) => {
    const [categoryId, slug] = key.split("/");
    const article = getArticleBySlug(categoryId, slug);
    if (!article) throw new Error(`Learning path "${id}" points at missing article ${key}`);
    return article;
  });
  return { id, title, blurb, articles };
}

export const LEARNING_PATHS: readonly LearningPath[] = [
  path(
    "newcomer",
    { vi: "Mới vào đội", en: "New to the team" },
    {
      vi: "Bắt đầu từ luật chơi và phần cứng cốt lõi, rồi học cách làm việc an toàn trong xưởng và khu pit.",
      en: "Start with how a match works and the core hardware, then learn to work safely in the shop and the pit.",
    },
    [
      "ftc-knowledge/match-structure-and-scoring",
      "ftc-components/control-and-expansion-hub",
      "robotics-general/mechanical-fasteners-and-structures",
      "robotics-general/electrical-wiring-safety",
      "ftc-components/drivetrain-mechanisms",
      "ftc-knowledge/safety-captain-and-pit-management",
    ],
  ),
  path(
    "build",
    { vi: "Chế tạo cơ khí", en: "Mechanical build" },
    {
      vi: "Từ vật liệu và gia công đến tỉ số truyền, thanh trượt, cơ cấu gắp và đầu kẹp.",
      en: "From materials and machining to gear ratios, slides, intakes and grippers.",
    },
    [
      "robotics-general/aluminum-vs-polycarbonate-machining",
      "robotics-general/bearing-types-and-shaft-clamping",
      "robotics-general/gear-ratios-and-torque-calculations",
      "ftc-components/motors-and-servos",
      "ftc-components/linear-slides-and-rigging",
      "ftc-components/intake-and-transfer-systems",
      "ftc-components/end-effector-and-grippers",
    ],
  ),
  path(
    "code",
    { vi: "Lập trình tự hành", en: "Autonomous programming" },
    {
      vi: "Dựng môi trường Java, lái bằng encoder, điều khiển PID, máy trạng thái, rồi tới thị giác và quỹ đạo.",
      en: "Set up Java, drive on encoders, tune PID, write state machines, then move on to vision and trajectories.",
    },
    [
      "programming/ftc-java-environment-setup",
      "programming/teleop-driving-and-gamepad-mapping",
      "programming/autonomous-encoder-driving",
      "robotics-general/pid-and-motion-fundamentals",
      "programming/finite-state-machines-in-robotics",
      "programming/apriltag-and-computer-vision",
      "programming/road-runner-motion-profiling",
    ],
  ),
  path(
    "electrical",
    { vi: "Điện và độ ổn định", en: "Electrical reliability" },
    {
      vi: "Phân phối nguồn, chăm pin, chống nhiễu và đọc cảm biến để robot không chết giữa trận.",
      en: "Power distribution, battery care, noise control and sensor reading so the robot survives a match.",
    },
    [
      "ftc-components/power-distribution-and-battery-wiring",
      "robotics-general/battery-maintenance-and-internal-resistance",
      "robotics-general/signal-noise-and-i2c-shielding",
      "ftc-components/sensors-guide",
      "programming/color-sensor-and-distance-logic",
    ],
  ),
  path(
    "compete",
    { vi: "Thi đấu và giám khảo", en: "Competition and judging" },
    {
      vi: "Lập kế hoạch mùa giải, scouting, chọn liên minh và chuẩn bị hồ sơ, buổi phỏng vấn.",
      en: "Plan the season, scout, pick alliances and prepare the portfolio and the judging interview.",
    },
    [
      "ftc-knowledge/season-timeline-and-milestone-planning",
      "ftc-knowledge/scouting-and-match-strategy",
      "ftc-knowledge/alliance-selection-dynamics",
      "ftc-knowledge/engineering-portfolio-guide",
      "ftc-knowledge/judging-presentation-skills",
      "ftc-knowledge/ftc-awards-criteria-breakdown",
    ],
  ),
];

export interface GlossaryTerm {
  term: string;
  definition: Localized<string>;
}

export const GLOSSARY: readonly GlossaryTerm[] = [
  { term: "Alliance", definition: { vi: "Liên minh hai đội cùng thi đấu một trận và chia sẻ điểm số.", en: "Two teams that play a match together and share one score." } },
  { term: "Autonomous", definition: { vi: "Giai đoạn 30 giây đầu trận, robot tự chạy bằng chương trình, không có tay cầm điều khiển.", en: "The opening 30 seconds of a match, when the robot runs a program with no driver input." } },
  { term: "Brownout", definition: { vi: "Điện áp tụt thấp làm bộ điều khiển khởi động lại hoặc ngắt, thường do động cơ hút dòng quá lớn.", en: "A voltage dip that resets or cuts the controller, usually from motors drawing too much current." } },
  { term: "Control Hub", definition: { vi: "Bộ điều khiển Android của REV chạy ứng dụng Robot Controller và có sẵn cổng motor, servo, cảm biến.", en: "REV's Android-based controller that runs the Robot Controller app and has motor, servo and sensor ports built in." } },
  { term: "Coopertition", definition: { vi: "Tinh thần vừa cạnh tranh vừa hỗ trợ lẫn nhau của FIRST, kể cả với đối thủ.", en: "FIRST's idea of competing hard while still helping one another, rivals included." } },
  { term: "Cycle time", definition: { vi: "Thời gian robot hoàn thành một chu trình ghi điểm: lấy vật, di chuyển, thả, quay lại.", en: "How long the robot needs for one scoring loop: pick up, travel, score, return." } },
  { term: "Dead wheel", definition: { vi: "Bánh đo không có động cơ, chỉ gắn encoder để đo quãng đường robot đã đi, ít bị trượt hơn bánh dẫn động.", en: "An unpowered wheel with an encoder that measures travel, less prone to slip than a drive wheel." } },
  { term: "Encoder", definition: { vi: "Cảm biến đếm vòng quay trục động cơ hoặc bánh, đơn vị đếm là tick.", en: "A sensor that counts shaft or wheel rotation, measured in ticks." } },
  { term: "Engineering Portfolio", definition: { vi: "Hồ sơ kỹ thuật tối đa 15 trang đội nộp cho ban giám khảo, ghi lại quá trình thiết kế và kết quả.", en: "The judged document of up to 15 pages that records a team's design process and results." } },
  { term: "Feedforward", definition: { vi: "Thành phần điều khiển cộng sẵn dựa trên mô hình, ví dụ bù trọng lực cho tay đòn, để PID chỉ sửa phần sai lệch còn lại.", en: "A model-based term added up front, such as gravity compensation on an arm, so PID only fixes what is left." } },
  { term: "Gracious Professionalism", definition: { vi: "Giá trị cốt lõi của FIRST: làm việc chất lượng cao, tôn trọng người khác và cộng đồng.", en: "A FIRST core value: high-quality work that respects others and the community." } },
  { term: "I2C", definition: { vi: "Giao thức hai dây (SDA, SCL) mà nhiều cảm biến FTC dùng để nói chuyện với hub.", en: "A two-wire protocol (SDA, SCL) many FTC sensors use to talk to the hub." } },
  { term: "IMU", definition: { vi: "Cảm biến quán tính trong Control Hub, cho góc xoay (yaw) của robot.", en: "The inertial sensor in the Control Hub that reports the robot's heading (yaw)." } },
  { term: "Inspection", definition: { vi: "Bước kiểm tra robot trước khi thi đấu để chắc chắn đúng kích thước, an toàn điện và luật.", en: "The pre-event check that the robot meets size, electrical safety and rule requirements." } },
  { term: "Inspire Award", definition: { vi: "Giải thưởng cao nhất do giám khảo trao, ghi nhận đội làm tốt toàn diện.", en: "The top judged award, given to the team that is strong across the board." } },
  { term: "Kickoff", definition: { vi: "Sự kiện công bố trò chơi mới của mùa giải, mở đầu cho giai đoạn thiết kế và chế tạo.", en: "The event where the season's new game is revealed, starting design and build." } },
  { term: "Linear slide", definition: { vi: "Thanh trượt nhiều tầng giúp cơ cấu vươn dài rồi thu gọn trong giới hạn kích thước.", en: "A multi-stage slide that extends a mechanism and collapses inside the size limit." } },
  { term: "Mecanum", definition: { vi: "Bánh có con lăn nghiêng 45 độ, cho phép robot đi ngang mà không cần xoay thân.", en: "A wheel with 45-degree rollers that lets a robot strafe sideways without turning." } },
  { term: "OpMode", definition: { vi: "Một chương trình robot (TeleOp hoặc Autonomous) được chọn và chạy từ Driver Station.", en: "One robot program, TeleOp or Autonomous, that you select and run from the Driver Station." } },
  { term: "Odometry", definition: { vi: "Ước tính vị trí và hướng robot trên sân từ dữ liệu encoder và IMU.", en: "Estimating the robot's field position and heading from encoder and IMU data." } },
  { term: "PID", definition: { vi: "Bộ điều khiển dùng ba thành phần tỉ lệ, tích phân, đạo hàm để đưa giá trị đo về giá trị mong muốn.", en: "A controller that combines proportional, integral and derivative terms to drive a measurement to its target." } },
  { term: "Pit", definition: { vi: "Khu vực của đội trong sự kiện, nơi sửa chữa, sạc pin và chuẩn bị robot giữa các trận.", en: "A team's work area at an event, used for repairs, charging and prep between matches." } },
  { term: "Servo", definition: { vi: "Động cơ có điều khiển vị trí, dùng cho cơ cấu cần góc chính xác như kẹp hoặc nghiêng.", en: "A position-controlled actuator for mechanisms that need a precise angle, such as claws or tilts." } },
  { term: "Stall current", definition: { vi: "Dòng điện động cơ hút khi bị giữ cứng không quay; rất lớn và là nguyên nhân hay gặp của quá nhiệt, sụt áp.", en: "The current a motor draws when held still. It is very high and a common cause of overheating and voltage drops." } },
  { term: "TeleOp", definition: { vi: "Giai đoạn 2 phút lái robot bằng tay cầm do người điều khiển.", en: "The 2-minute period driven by hand with gamepads." } },
  { term: "Torque", definition: { vi: "Mô-men xoắn, khả năng tạo lực quay của động cơ; tăng tỉ số truyền thì tăng torque nhưng giảm tốc độ.", en: "Rotational force. A higher gear reduction raises torque and lowers speed." } },
];

export interface ChecklistItem {
  id: string;
  group: Localized<string>;
  text: Localized<string>;
}

const G_POWER: Localized<string> = { vi: "Nguồn điện", en: "Power" };
const G_MECH: Localized<string> = { vi: "Cơ khí", en: "Mechanical" };
const G_CODE: Localized<string> = { vi: "Phần mềm", en: "Software" };
const G_TEAM: Localized<string> = { vi: "Đội ngũ", en: "Team" };

export const PREMATCH_CHECKLIST: readonly ChecklistItem[] = [
  { id: "battery-charged", group: G_POWER, text: { vi: "Pin đã sạc đầy và đo điện áp đạt yêu cầu", en: "Battery fully charged and voltage measured" } },
  { id: "spare-battery", group: G_POWER, text: { vi: "Có pin dự phòng đã sạc", en: "A charged spare battery is ready" } },
  { id: "switch-fuse", group: G_POWER, text: { vi: "Công tắc nguồn chính hoạt động và cầu chì còn tốt", en: "Main switch works and the fuse is intact" } },
  { id: "wires", group: G_POWER, text: { vi: "Dây điện được cố định, không có chỗ hở hoặc bị kẹp", en: "Wires are secured with no exposed or pinched spots" } },
  { id: "bolts", group: G_MECH, text: { vi: "Bu-lông, ốc khóa và collar đã siết lại", en: "Bolts, locknuts and collars re-tightened" } },
  { id: "slides", group: G_MECH, text: { vi: "Thanh trượt chạy êm, dây cước căng đều", en: "Slides move freely and cords are evenly tensioned" } },
  { id: "size", group: G_MECH, text: { vi: "Robot nằm trong khung kích thước cho phép", en: "Robot fits inside the allowed size box" } },
  { id: "pairing", group: G_CODE, text: { vi: "Driver Station và tay cầm đã ghép đúng", en: "Driver Station and gamepads are paired correctly" } },
  { id: "opmode", group: G_CODE, text: { vi: "Đã chọn đúng OpMode Autonomous và TeleOp", en: "The right Autonomous and TeleOp OpModes are selected" } },
  { id: "sensors", group: G_CODE, text: { vi: "Cảm biến và encoder trả về giá trị hợp lý", en: "Sensors and encoders report sensible values" } },
  { id: "roles", group: G_TEAM, text: { vi: "Driver, coach và người đặt robot biết rõ vai trò", en: "Driver, coach and robot placer know their roles" } },
  { id: "alliance", group: G_TEAM, text: { vi: "Đã trao đổi chiến thuật với đội liên minh", en: "Strategy agreed with the alliance partner" } },
];
