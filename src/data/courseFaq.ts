import type { LocalizedText } from "@/lib/course/getLocalized";

export type CourseFAQItem = {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
};

export const courseFaq: CourseFAQItem[] = [
  {
    id: "faq-no-experience",
    question: {
      vi: "Học sinh chưa biết lập trình có học được không?",
      en: "Can students with no coding experience join?",
    },
    answer: {
      vi: "Có. Khóa bắt đầu từ Scratch và khối lệnh trực quan — không yêu cầu kinh nghiệm trước. Giáo viên hướng dẫn từng bước và phân tầng cấp 1–2 trong cùng lớp.",
      en: "Yes. The course starts with Scratch and visual blocks — no prior experience required. Teachers guide step-by-step with Level 1 and Level 2 tracks in the same class.",
    },
  },
  {
    id: "faq-mixed-levels",
    question: {
      vi: "Cấp 1 và cấp 2 học chung có bị lệch trình độ không?",
      en: "Won't Level 1 and Level 2 students hold each other back?",
    },
    answer: {
      vi: "Mỗi buổi có sản phẩm chung và challenge riêng cho từng cấp. Cấp 1 hoàn thành theo hướng dẫn; cấp 2 giải thích logic, debug và mở rộng bài.",
      en: "Each session has a shared product plus level-specific challenges. Level 1 follows guided steps; Level 2 explains logic, debugs, and extends the task.",
    },
  },
  {
    id: "faq-component-cost",
    question: {
      vi: "Chi phí mua linh kiện Arduino có đắt không?",
      en: "Is buying Arduino parts expensive?",
    },
    answer: {
      vi: "Arduino là nền tảng mã nguồn mở phổ biến — linh kiện giá từ vài nghìn đến vài chục nghìn mỗi cảm biến. Bộ dùng trong lớp được cung cấp; nếu mua thêm để thực hành tại nhà, chúng tôi gửi danh sách shop uy tín khi đăng ký khóa học.",
      en: "Arduino is a widely used open platform — parts cost from a few thousand to tens of thousands of VND per sensor. Class kits are provided; if you buy extras for home practice, we share trusted shop lists when you register for the course.",
    },
  },
  {
    id: "faq-myopia",
    question: {
      vi: "Học cái này có làm con bị cận thị nặng hơn không?",
      en: "Will this make my child's nearsightedness worse?",
    },
    answer: {
      vi: "Với Arduino, mắt thay đổi tiêu cự liên tục: nhìn màn hình máy tính, cúi tìm linh kiện, quan sát robot chạy. Đây là bài tập vận động mắt tự nhiên hơn việc ôm điện thoại một khoảng cách cố định.",
      en: "With Arduino, eyes shift focus often: screen, parts box, robot on the floor. That natural focal exercise is gentler than holding a phone at one fixed distance.",
    },
  },
  {
    id: "faq-hyperactive",
    question: {
      vi: "Trẻ hiếu động, không ngồi yên có học được không?",
      en: "Can active kids who won't sit still learn this?",
    },
    answer: {
      vi: "Arduino là môn học động: tháo, lắp, cắm dây, chạy theo robot. Phù hợp trẻ thích vận động và học qua thao tác — không phải ngồi nghe lý thuyết dài.",
      en: "Arduino is hands-on: wire, build, unplug, chase a robot. It suits kids who learn by moving — not long passive lectures.",
    },
  },
  {
    id: "faq-after-course",
    question: {
      vi: "Sau khóa học con có tự chơi tiếp được không?",
      en: "Can my child keep building after the course?",
    },
    answer: {
      vi: "Khóa dạy cách tự tìm dự án mới và tham gia cộng đồng sáng tạo Arduino. Hệ sinh thái giá rẻ, tài liệu mở — con có thể tiếp tục mà không phụ thuộc lớp.",
      en: "The course teaches how to find new projects and join the Arduino maker community. Cheap parts and open docs mean students can keep going without the class.",
    },
  },
  {
    id: "faq-free-trial",
    question: {
      vi: "Nếu con không hứng thú thì sao?",
      en: "What if my child isn't interested?",
    },
    answer: {
      vi: "Đăng ký khóa học để trao đổi về lộ trình và buổi trải nghiện khi mở khóa — phụ huynh và con làm quen quy trình làm sản phẩm trước khi quyết định học dài hạn.",
      en: "Register for the course to discuss the curriculum and trial sessions when a cohort opens — parents and students can experience the product-building flow before committing long-term.",
    },
  },
  {
    id: "faq-capstone",
    question: {
      vi: "Khóa học có sản phẩm cuối khóa không?",
      en: "Is there a final project?",
    },
    answer: {
      vi: "Có. Buổi 16 là đấu trường robot: cùng khung xe Arduino, tự chọn cơ cấu (bắn / kéo / đẩy), rồi thi đấu và giải thích chiến thuật trước lớp.",
      en: "Yes. Session 16 is the robot arena: shared Arduino chassis, choose a mechanism (shoot / pull / push), then compete and explain tactics to the class.",
    },
  },
  {
    id: "faq-ai",
    question: {
      vi: "AI được dùng như thế nào?",
      en: "How is AI used in the course?",
    },
    answer: {
      vi: "AI hỗ trợ hỏi lỗi, gợi ý flowchart, checklist lắp mạch và câu hỏi ôn tập. Học sinh không được dùng AI để làm hộ toàn bộ bài.",
      en: "AI helps with error hints, flowchart scaffolds, wiring checklists, and review questions. Students must not use AI to complete entire assignments.",
    },
  },
  {
    id: "faq-format",
    question: {
      vi: "Học online hay offline?",
      en: "Online or in-person?",
    },
    answer: {
      vi: "Ưu tiên học trực tiếp để thao tác phần cứng an toàn. Lịch và địa điểm cụ thể sẽ xác nhận khi đăng ký — liên hệ qua email hoặc số điện thoại trên trang đăng ký.",
      en: "In-person is preferred for safe hands-on hardware. Schedule and venue are confirmed at registration — contact us by email or phone on the registration page.",
    },
  },
];

export const courseFaqSectionCopy = {
  title: {
    vi: "Câu hỏi thường gặp",
    en: "Frequently asked questions",
  },
  subtitle: {
    vi: "Phụ huynh thường hỏi trước khi đăng ký — chúng tôi trả lời ngắn gọn ở đây.",
    en: "What parents ask before signing up — short answers here.",
  },
} as const;
