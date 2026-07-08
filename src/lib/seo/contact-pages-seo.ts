import { buildMetadata } from "@/lib/seo/metadata";

export const courseRegisterFormSeo = {
  vi: {
    title: "Đăng ký tư vấn khóa học | Robotics Sóc Sơn",
    description:
      "Đăng ký tư vấn khóa Scratch → Arduino với Robotics Sóc Sơn. Form 2 bước — phản hồi trong 24–48 giờ.",
    keywords: [
      "đăng ký khóa học robotics",
      "tư vấn STEM",
      "Scratch",
      "Arduino",
      "Sóc Sơn",
    ],
    canonicalPath: "/course-register-form",
  },
  en: {
    title: "Course consultation registration | Robotics Sóc Sơn",
    description:
      "Book a Scratch → Arduino course consultation with Robotics Sóc Sơn. Two-step form — reply within 24–48 hours.",
    keywords: [
      "robotics course registration",
      "STEM consultation",
      "Scratch",
      "Arduino",
      "Soc Son",
    ],
    canonicalPath: "/course-register-form",
  },
};

export const contactUsSeo = {
  vi: {
    title: "Liên hệ | Robotics Sóc Sơn",
    description:
      "Liên hệ Robotics Sóc Sơn — email, Messenger hoặc gửi tin nhắn qua form. Đội FTC Sóc Sơn, Hà Nội.",
    keywords: ["liên hệ robotics sóc sơn", "FTC", "Messenger"],
    canonicalPath: "/contact-us",
  },
  en: {
    title: "Contact us | Robotics Sóc Sơn",
    description:
      "Contact Robotics Sóc Sơn — email, Messenger, or send a message. FTC team from Soc Son, Hanoi.",
    keywords: ["contact robotics soc son", "FTC", "Messenger"],
    canonicalPath: "/contact-us",
  },
};

export function courseRegisterFormMetadata() {
  return buildMetadata(courseRegisterFormSeo.vi);
}

export function contactUsMetadata() {
  return buildMetadata(contactUsSeo.vi);
}
