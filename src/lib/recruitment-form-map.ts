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
  personal: ["fullName", "birthDate", "classCohort", "phone", "email", "facebook"],
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
  const pairs: Array<{ name: string; value: string }> = [
    { name: E.fullName, value: values.fullName.trim() },
    { name: E.birthDate, value: values.birthDate.trim() },
    { name: E.classCohort, value: values.classCohort.trim() },
    { name: E.phone, value: values.phone.trim() },
    { name: E.email, value: values.email.trim() },
    { name: E.facebook, value: values.facebook.trim() },
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
