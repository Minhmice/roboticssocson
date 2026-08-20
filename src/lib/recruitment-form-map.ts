/**
 * Google Form contract for “Đơn tuyển thành viên RBS 4.0”.
 * Entry IDs and branch page history were verified against the live form.
 */

export const RECRUITMENT_FORM_POST_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeSAXuG0pgn3FBPWivF2vv0tv9vq_ClOR1077u60ty6VqXT7g/formResponse";

export const RECRUITMENT_FORM_PAGE_HISTORY = {
  "Cơ khí - Thiết kế": "0,1,2,4",
  "Code - Điện tử": "0,1,2,5",
  "Truyền thông": "0,1,2,3",
} as const;

export const RECRUITMENT_FORM_ENTRIES = {
  fullName: "entry.1127873484",
  birthDate: "entry.534416113",
  classCohort: "entry.952588014",
  phone: "entry.1768765027",
  email: "entry.2123959947",
  facebook: "entry.786538111",
  discoverySource: "entry.693192888",
  motivation: "entry.1553603559",
  division: "entry.257043496",
  mechanicalExperience: "entry.1135024330",
  mechanicalTools: "entry.1834134384",
  mechanicalDebugging: "entry.95469653",
  mechanicalExpectations: "entry.16566794",
  codeExperience: "entry.39280287",
  electronicsExperience: "entry.137445187",
  codeDebugging: "entry.2098738445",
  codeExpectations: "entry.127288015",
  mediaStrengths: "entry.520928889",
  mediaTools: "entry.60109928",
  mediaCommitment: "entry.1560722900",
  mediaExpectations: "entry.375391113",
} as const;

export const RECRUITMENT_DIVISIONS = [
  "Cơ khí - Thiết kế",
  "Code - Điện tử",
  "Truyền thông",
] as const;

export const RECRUITMENT_DISCOVERY_SOURCES = [
  "Qua fanpage, các nền tảng mạng xã hội",
  "Qua người thân, họ hàng",
  "Qua bạn bè",
  "Khác",
] as const;

export type RecruitmentDivision = (typeof RECRUITMENT_DIVISIONS)[number];
export type RecruitmentDiscoverySource =
  (typeof RECRUITMENT_DISCOVERY_SOURCES)[number];
export type RecruitmentLocale = "vi" | "en";

export const RECRUITMENT_DIVISION_COPY = {
  "Cơ khí - Thiết kế": {
    vi: {
      label: "Cơ khí - Thiết kế",
      description: "Thiết kế chi tiết, lắp ráp và biến ý tưởng thành cơ cấu hoạt động.",
    },
    en: {
      label: "Mechanical - Design",
      description: "Design parts, assemble mechanisms, and turn ideas into working hardware.",
    },
  },
  "Code - Điện tử": {
    vi: {
      label: "Code - Điện tử",
      description: "Lập trình robot, kết nối cảm biến và tìm nguyên nhân khi hệ thống chưa chạy đúng.",
    },
    en: {
      label: "Code - Electronics",
      description: "Program the robot, connect sensors, and trace why a system is not working yet.",
    },
  },
  "Truyền thông": {
    vi: {
      label: "Truyền thông",
      description: "Kể câu chuyện của đội qua nội dung, hình ảnh, video và hoạt động cộng đồng.",
    },
    en: {
      label: "Communications",
      description: "Tell the team story through writing, visuals, video, and community activities.",
    },
  },
} as const satisfies Record<
  RecruitmentDivision,
  Record<RecruitmentLocale, { label: string; description: string }>
>;

export const RECRUITMENT_DISCOVERY_SOURCE_LABELS = {
  "Qua fanpage, các nền tảng mạng xã hội": {
    vi: "Qua fanpage, các nền tảng mạng xã hội",
    en: "Fanpage or social media",
  },
  "Qua người thân, họ hàng": {
    vi: "Qua người thân, họ hàng",
    en: "Family or relatives",
  },
  "Qua bạn bè": {
    vi: "Qua bạn bè",
    en: "Friends",
  },
  "Khác": {
    vi: "Khác",
    en: "Other",
  },
} as const satisfies Record<
  RecruitmentDiscoverySource,
  Record<RecruitmentLocale, string>
>;

export function getRecruitmentDivisionCopy(
  division: RecruitmentDivision,
  locale: RecruitmentLocale,
) {
  return RECRUITMENT_DIVISION_COPY[division][locale];
}

export function getRecruitmentDiscoverySourceLabel(
  source: RecruitmentDiscoverySource,
  locale: RecruitmentLocale,
): string {
  return RECRUITMENT_DISCOVERY_SOURCE_LABELS[source][locale];
}

export type RecruitmentFormValues = {
  fullName: string;
  birthDate: string;
  classCohort: string;
  phone: string;
  email: string;
  facebook: string;
  discoverySource: RecruitmentDiscoverySource | "";
  discoverySourceOther: string;
  motivation: string;
  division: RecruitmentDivision | "";
  mechanicalExperience: string;
  mechanicalTools: string;
  mechanicalDebugging: string;
  mechanicalExpectations: string;
  codeExperience: string;
  electronicsExperience: string;
  codeDebugging: string;
  codeExpectations: string;
  mediaStrengths: string;
  mediaTools: string;
  mediaCommitment: string;
  mediaExpectations: string;
};

export const EMPTY_RECRUITMENT_FORM: RecruitmentFormValues = {
  fullName: "",
  birthDate: "",
  classCohort: "",
  phone: "",
  email: "",
  facebook: "",
  discoverySource: "",
  discoverySourceOther: "",
  motivation: "",
  division: "",
  mechanicalExperience: "",
  mechanicalTools: "",
  mechanicalDebugging: "",
  mechanicalExpectations: "",
  codeExperience: "",
  electronicsExperience: "",
  codeDebugging: "",
  codeExpectations: "",
  mediaStrengths: "",
  mediaTools: "",
  mediaCommitment: "",
  mediaExpectations: "",
};

export const RECRUITMENT_REQUIRED_FIELDS = {
  personal: ["fullName", "birthDate", "classCohort", "phone", "email"],
  common: ["discoverySource", "motivation", "division"],
  mechanical: [
    "mechanicalExperience",
    "mechanicalTools",
    "mechanicalDebugging",
  ],
  code: ["codeExperience", "electronicsExperience", "codeDebugging"],
  media: ["mediaStrengths", "mediaTools", "mediaCommitment"],
} as const;

export function getRecruitmentBranchFields(
  division: RecruitmentDivision,
): readonly string[] {
  if (division === "Cơ khí - Thiết kế") return RECRUITMENT_REQUIRED_FIELDS.mechanical;
  if (division === "Code - Điện tử") return RECRUITMENT_REQUIRED_FIELDS.code;
  return RECRUITMENT_REQUIRED_FIELDS.media;
}

export function buildRecruitmentFormPayload(
  values: RecruitmentFormValues,
): Array<{ name: string; value: string }> {
  if (!values.division) return [];

  const E = RECRUITMENT_FORM_ENTRIES;
  const birthDate = /^\d{4}-\d{2}-\d{2}$/.test(values.birthDate)
    ? values.birthDate.split("-").reverse().join("/")
    : values.birthDate.trim();
  const pairs: Array<{ name: string; value: string }> = [
    { name: E.fullName, value: values.fullName.trim() },
    { name: E.birthDate, value: birthDate },
    { name: E.classCohort, value: values.classCohort.trim() },
    { name: E.phone, value: values.phone.trim() },
    { name: E.email, value: values.email.trim() },
    {
      name: E.facebook,
      value:
        values.facebook.trim() ||
        "Không sử dụng Facebook - liên hệ qua email hoặc số điện thoại",
    },
    { name: E.discoverySource, value: values.discoverySource === "Khác" ? "__other_option__" : values.discoverySource },
    { name: E.motivation, value: values.motivation.trim() },
    { name: E.division, value: values.division },
    { name: "pageHistory", value: RECRUITMENT_FORM_PAGE_HISTORY[values.division] },
    { name: "fvv", value: "1" },
  ];

  if (values.discoverySource === "Khác") {
    pairs.push({
      name: `${E.discoverySource}.other_option_response`,
      value: values.discoverySourceOther.trim(),
    });
  }

  const branchFields = {
    "Cơ khí - Thiết kế": [
      [E.mechanicalExperience, values.mechanicalExperience],
      [E.mechanicalTools, values.mechanicalTools],
      [E.mechanicalDebugging, values.mechanicalDebugging],
      [E.mechanicalExpectations, values.mechanicalExpectations],
    ],
    "Code - Điện tử": [
      [E.codeExperience, values.codeExperience],
      [E.electronicsExperience, values.electronicsExperience],
      [E.codeDebugging, values.codeDebugging],
      [E.codeExpectations, values.codeExpectations],
    ],
    "Truyền thông": [
      [E.mediaStrengths, values.mediaStrengths],
      [E.mediaTools, values.mediaTools],
      [E.mediaCommitment, values.mediaCommitment],
      [E.mediaExpectations, values.mediaExpectations],
    ],
  } satisfies Record<RecruitmentDivision, readonly (readonly [string, string])[]>;

  for (const [name, value] of branchFields[values.division]) {
    if (value.trim()) pairs.push({ name, value: value.trim() });
  }

  return pairs;
}
