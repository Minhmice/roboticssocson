import { buildMetadata } from "@/lib/seo/metadata";

export const courseRegisterFormSeo = {
  vi: {
    title: "Đăng ký khóa học | Robotics Sóc Sơn",
    description:
      "Đăng ký khóa Scratch → Arduino với Robotics Sóc Sơn. Form 2 bước — phản hồi trong 24–48 giờ.",
    keywords: [
      "đăng ký khóa học robotics",
      "khóa học STEM",
      "Scratch",
      "Arduino",
      "Sóc Sơn",
    ],
    canonicalPath: "/course-register-form",
  },
  en: {
    title: "Course registration | Robotics Sóc Sơn",
    description:
      "Register for the Scratch → Arduino course with Robotics Sóc Sơn. Two-step form — reply within 24–48 hours.",
    keywords: [
      "robotics course registration",
      "STEM course",
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

export const courseRegisterSuccessSeo = {
  vi: {
    title: "Đăng ký thành công | Robotics Sóc Sơn",
    description:
      "Đăng ký khóa học đã được ghi nhận. Robotics Sóc Sơn sẽ liên hệ trong 24–48 giờ.",
    keywords: [
      "đăng ký thành công",
      "khóa học robotics",
      "STEM",
      "Sóc Sơn",
    ],
    canonicalPath: "/course-register-form/success",
  },
  en: {
    title: "Registration successful | Robotics Sóc Sơn",
    description:
      "Your course registration was received. Robotics Sóc Sơn will reply within 24–48 hours.",
    keywords: [
      "registration successful",
      "robotics course",
      "STEM course",
      "Soc Son",
    ],
    canonicalPath: "/course-register-form/success",
  },
};

export function courseRegisterSuccessMetadata() {
  return buildMetadata(courseRegisterSuccessSeo.vi);
}

export function courseRegisterFormMetadata() {
  return buildMetadata(courseRegisterFormSeo.vi);
}

export function contactUsMetadata() {
  return buildMetadata(contactUsSeo.vi);
}
