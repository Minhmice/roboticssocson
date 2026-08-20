"use client";

/**
 * Recruitment is a focused application task inside the site's light briefing-room system.
 * The flow preserves one question per screen while keeping local recovery and submission
 * states explicit for students completing the form on desktop or mobile.
 */

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock3, Loader2, ShieldCheck, X } from "lucide-react";
import { useBootAnimationReady } from "@/contexts/BootRevealContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { captureEvent } from "@/lib/posthog/client";
import { AnalyticsEvents } from "@/lib/posthog/events";
import {
  buildRecruitmentFormPayload,
  EMPTY_RECRUITMENT_FORM,
  getRecruitmentDiscoverySourceLabel,
  getRecruitmentDivisionCopy,
  RECRUITMENT_DISCOVERY_SOURCES,
  RECRUITMENT_DIVISIONS,
  RECRUITMENT_FORM_POST_URL,
  type RecruitmentDiscoverySource,
  type RecruitmentDivision,
  type RecruitmentFormValues,
} from "@/lib/recruitment-form-map";
import {
  hasRecruitmentErrors,
  validateRecruitmentForm,
  type RecruitmentFieldErrors,
  type RecruitmentFieldKey,
} from "@/lib/recruitment-form-validation";
import { cn } from "@/lib/utils";

const DRAFT_KEY = "robotics-soc-son:recruitment-draft:v2";
const REVIEW_INDEX = 10;
const SUBMISSION_TIMEOUT_MS = 15_000;
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const displayType = "text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15] tracking-[-0.02em]";
/** Question prompts stay below display — Operate density over marketing scale. */
const promptType = "text-[clamp(1.375rem,3vw,1.875rem)] leading-[1.25] tracking-[-0.015em]";
const orientationDisplayType =
  "text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.08] tracking-[-0.03em]";
type DivisionKey = "mechanical" | "code" | "media";

const DIVISION_KEY: Record<RecruitmentDivision, DivisionKey> = {
  "Cơ khí - Thiết kế": "mechanical",
  "Code - Điện tử": "code",
  "Truyền thông": "media",
};

const BRANCH_FIELDS: Record<
  RecruitmentDivision,
  readonly [
    RecruitmentFieldKey,
    RecruitmentFieldKey,
    RecruitmentFieldKey,
    RecruitmentFieldKey,
  ]
> = {
  "Cơ khí - Thiết kế": [
    "mechanicalExperience",
    "mechanicalTools",
    "mechanicalDebugging",
    "mechanicalExpectations",
  ],
  "Code - Điện tử": [
    "codeExperience",
    "electronicsExperience",
    "codeDebugging",
    "codeExpectations",
  ],
  "Truyền thông": [
    "mediaStrengths",
    "mediaTools",
    "mediaCommitment",
    "mediaExpectations",
  ],
};

const copyByLocale = {
  vi: {
    orientationTitle: "Đơn tuyển thành viên RBS 4.0",
    orientationTitleLines: ["Đơn tuyển thành viên", "RBS 4.0"] as const,
    orientationBody:
      "Trả lời lần lượt từng câu hỏi để đăng ký thành viên Robotics Sóc Sơn. Chọn một ban phù hợp với thế mạnh của bạn.",
    orientationMeta: "Thông tin sẽ được gửi về ban quản trị để xét duyệt.",
    orientationPrivacy: "Thông tin được gửi về ban quản trị để xét duyệt.",
    orientationEffortLabel: "Thời gian",
    orientationEffortValue: "Khoảng 10-15 phút",
    orientationEffortDetail: "Một câu hỏi mỗi màn hình. Bạn có thể quay lại chỉnh trước khi gửi.",
    orientationPrivacyLabel: "Xét duyệt",
    orientationPrivacyDetail: "Bản nháp lưu trên thiết bị này đến khi gửi thành công.",
    orientationNextLabel: "Sau khi gửi",
    orientationNextValue: "Đội đọc đơn và liên hệ qua điện thoại hoặc email.",
    orientationDivisionsIntro: "Ba ban bạn có thể đăng ký",
    orientationDivisions: [
      {
        name: "Cơ khí - Thiết kế",
        blurb: "CAD, lắp ráp và xử lý chi tiết cơ khí trên robot.",
      },
      {
        name: "Code - Điện tử",
        blurb: "Lập trình, mạch điện và cảm biến điều khiển robot.",
      },
      {
        name: "Truyền thông",
        blurb: "Thiết kế, nội dung và hình ảnh kể câu chuyện của đội.",
      },
    ] as const,
    start: "Bắt đầu",
    progress: "Tiến độ đơn",
    exit: "Về trang đội",
    next: "Tiếp tục",
    back: "Quay lại",
    review: "Kiểm tra lại đơn",
    edit: "Chỉnh sửa",
    previousQuestion: "Câu hỏi cuối",
    submit: "Gửi đơn",
    sending: "Đang gửi...",
    incomplete: "Hãy hoàn thành câu hỏi này để tiếp tục.",
    dateFormat: "Ngày / tháng / năm",
    characters: (count: number) => `${count} ký tự`,
    submissionError:
      "Chưa thể gửi đơn. Kiểm tra kết nối rồi thử lại. Câu trả lời của bạn vẫn được giữ.",
    offlineError: "Bạn đang ngoại tuyến. Kết nối lại rồi gửi lại. Câu trả lời vẫn được giữ.",
    timeoutError: "Gửi đơn mất nhiều thời gian hơn dự kiến. Kiểm tra kết nối rồi thử lại.",
    notProvided: "Chưa có thông tin",
    successTitle: "Đã gửi đơn thành công.",
    successBody: "Đội sẽ đọc đơn và liên hệ với bạn qua điện thoại hoặc email.",
    successAgain: "Điền đơn mới",
    successHome: "Về trang đội",
    labels: {
      fullName: "Họ và tên",
      classCohort: "Lớp và khóa",
      birthDate: "Ngày sinh",
      phone: "Số điện thoại",
      email: "Email",
      facebook: "Link Facebook",
      discoveryOther: "Ghi rõ nguồn khác",
    },
    prompts: {
      identity: "Bạn tên là gì?",
      identitySecond: "Bạn học lớp nào?",
      birth: "Bạn sinh ngày nào?",
      origin: "Bạn biết đến Robotics Sóc Sơn qua đâu?",
      contact: "Bạn muốn đội liên hệ với bạn bằng cách nào?",
      role: "Bạn muốn đăng ký ban nào?",
      drive: "Điều gì khiến bạn muốn trở thành một phần của Robotics Sóc Sơn?",
    },
    branch: {
      mechanical: {
        q1: "Bạn đã từng có kinh nghiệm thiết kế 3D (CAD) hay thao tác gia công, lắp ráp cơ khí thực tế nào chưa?",
        a1: "Có thể là bài học ở trường, một dự án nhỏ, hoặc chưa từng thử.",
        q2: "Kỹ năng hoặc công cụ thiết kế/phần mềm nào bạn thành thạo nhất?",
        a2: "Nếu chưa thành thạo, hãy nêu công cụ hoặc phần mềm bạn muốn học đầu tiên.",
        q3: "Khi một chi tiết cơ khí bị lệch/hỏng trong quá trình lắp ráp thực tế, bạn sẽ ưu tiên xử lý tình huống đó như thế nào?",
        a3: "Kể các bước bạn sẽ quan sát và thử để tìm nguyên nhân.",
        q4: "Bạn mong muốn nhận được điều gì khi tham gia ban Cơ khí - Thiết kế của Robotics Sóc Sơn?",
        a4: "Ghi ngắn thôi, đội đọc để sắp xếp người hướng dẫn.",
      },
      code: {
        q1: "Bạn đã từng làm quen với ngôn ngữ lập trình nào (C/C++, Python,...), các vi điều khiển nào (Arduino, ESP32,...) chưa?",
        a1: "Một bài học nhỏ, Arduino, ESP32, hoặc “chưa từng thử” đều là câu trả lời tốt.",
        q2: "Bạn đã có kinh nghiệm thực tế về đấu nối mạch điện, sử dụng cảm biến/mạch động cơ chưa?",
        a2: "Nối dây, cảm biến, động cơ. Nếu chưa, điều gì khiến bạn muốn học?",
        q3: "Khi robot chạy không đúng thuật toán hoặc gặp sự cố cháy/chập mạch, bạn sẽ debug và xử lý lỗi như thế nào?",
        a3: "Kể cách bạn kiểm tra từng bước để khoanh vùng lỗi.",
        q4: "Bạn mong muốn nhận được điều gì khi tham gia ban Code - Điện tử của Robotics Sóc Sơn?",
        a4: "Ghi ngắn thôi, đội đọc để sắp xếp người hướng dẫn.",
      },
      media: {
        q1: "Thế mạnh chính của bạn nằm ở mảng nào: thiết kế, quay phim chụp ảnh hay viết lách lên ý tưởng?",
        a1: "Thiết kế, quay phim chụp ảnh, viết lách hoặc lên ý tưởng. Chưa có kinh nghiệm cũng không sao.",
        q2: "Hiện tại bạn đang dùng phần mềm nào để thiết kế? (VD: Canva, Figma, Illustrator, Photoshop,...)",
        a2: "Canva, Figma, Illustrator, Photoshop, hoặc một công cụ bạn muốn học.",
        q3: "Mức độ sẵn sàng học hỏi và lượng thời gian bạn có thể cam kết đồng hành cùng Ban Truyền thông RBS mỗi tuần là bao nhiêu?",
        a3: "Chia sẻ khoảng thời gian bạn có thể dành cho đội mỗi tuần.",
        q4: "Bạn mong muốn nhận được điều gì khi tham gia ban Truyền thông của Robotics Sóc Sơn?",
        a4: "Ghi ngắn thôi, đội đọc để sắp xếp người hướng dẫn.",
      },
    },
  },
  en: {
    orientationTitle: "RBS 4.0 member application",
    orientationTitleLines: ["RBS 4.0 member", "application"] as const,
    orientationBody:
      "Answer one question at a time to apply for Robotics Sóc Sơn. Choose the division that fits your strengths.",
    orientationMeta: "Your information will be sent to the team administrators for review.",
    orientationPrivacy: "Sent to the team administrators for review.",
    orientationEffortLabel: "Time needed",
    orientationEffortValue: "About 10-15 minutes",
    orientationEffortDetail: "One question per screen. You can go back and edit before sending.",
    orientationPrivacyLabel: "Review",
    orientationPrivacyDetail: "A draft stays on this device until the application is sent successfully.",
    orientationNextLabel: "After you send",
    orientationNextValue: "The team reads your answers and contacts you by phone or email.",
    orientationDivisionsIntro: "Three divisions you can join",
    orientationDivisions: [
      {
        name: "Mechanical - Design",
        blurb: "CAD, assembly, and hands-on mechanical problem solving.",
      },
      {
        name: "Code - Electronics",
        blurb: "Programming, circuits, and sensors that drive the robot.",
      },
      {
        name: "Media",
        blurb: "Design, writing, and visuals that tell the team's story.",
      },
    ] as const,
    start: "Start",
    progress: "Application progress",
    exit: "Back to the team",
    next: "Continue",
    back: "Back",
    review: "Check your application",
    edit: "Edit",
    previousQuestion: "Last question",
    submit: "Send application",
    sending: "Sending...",
    incomplete: "Complete this question to continue.",
    dateFormat: "Day / month / year",
    characters: (count: number) => `${count} characters`,
    submissionError:
      "We could not send your application. Check your connection and try again. Your answers are still saved.",
    offlineError: "You are offline. Reconnect, then send again. Your answers are still saved.",
    timeoutError: "Sending is taking longer than expected. Check your connection and try again.",
    notProvided: "Not provided",
    successTitle: "Your application was sent.",
    successBody: "The team will read it and contact you by phone or email.",
    successAgain: "Start another application",
    successHome: "Back to the team",
    labels: {
      fullName: "Full name",
      classCohort: "Class and cohort",
      birthDate: "Date of birth",
      phone: "Phone number",
      email: "Email",
      facebook: "Facebook link",
      discoveryOther: "Specify the other source",
    },
    prompts: {
      identity: "What is your name?",
      identitySecond: "Which class are you in?",
      birth: "When were you born?",
      origin: "How did you hear about Robotics Sóc Sơn?",
      contact: "How should the team contact you?",
      role: "Which division would you like to apply for?",
      drive: "What makes you want to become part of Robotics Sóc Sơn?",
    },
    branch: {
      mechanical: {
        q1: "Have you had any experience with 3D design (CAD) or practical machining and mechanical assembly?",
        a1: "A school project, a small personal attempt, or nothing yet.",
        q2: "Which design skill or software tool are you most comfortable with?",
        a2: "If none, name the tool or software you want to learn first.",
        q3: "When a mechanical part is misaligned or broken during real assembly, how would you prioritize handling that situation?",
        a3: "Describe what you would observe and test to find the cause.",
        q4: "What do you hope to gain by joining the Mechanical - Design division of Robotics Sóc Sơn?",
        a4: "Keep it short; the team reads this to match you with a mentor.",
      },
      code: {
        q1: "Have you worked with any programming languages (C/C++, Python, ...) or microcontrollers (Arduino, ESP32, ...)?",
        a1: "A small lesson, Arduino, ESP32, or “not yet” are all good answers.",
        q2: "Do you have hands-on experience wiring circuits or using sensors and motor modules?",
        a2: "Wiring, sensors, motors. If not, what makes you curious?",
        q3: "When the robot does not follow the algorithm or you face a short/burn fault, how would you debug and fix it?",
        a3: "Describe how you would check step by step to isolate the fault.",
        q4: "What do you hope to gain by joining the Code - Electronics division of Robotics Sóc Sơn?",
        a4: "Keep it short; the team reads this to match you with a mentor.",
      },
      media: {
        q1: "Where is your main strength: design, filming/photography, or writing and ideation?",
        a1: "Design, photo/video, writing, or ideation. No experience is fine.",
        q2: "Which design software do you currently use? (e.g. Canva, Figma, Illustrator, Photoshop, ...)",
        a2: "Canva, Figma, Illustrator, Photoshop, or a tool you want to learn.",
        q3: "How ready are you to learn, and how much time can you commit each week with the RBS Communications division?",
        a3: "Share the time you could reasonably give the team each week.",
        q4: "What do you hope to gain by joining the Communications division of Robotics Sóc Sơn?",
        a4: "Keep it short; the team reads this to match you with a mentor.",
      },
    },
  },
} as const;

type FlowCopy = (typeof copyByLocale)[keyof typeof copyByLocale];

type FieldSpec = {
  key: RecruitmentFieldKey;
  label: string;
  kind: "text" | "email" | "tel" | "url" | "date" | "textarea";
  required: boolean;
  autoComplete?: string;
  placeholder?: string;
  revealAfter?: RecruitmentFieldKey;
  counter?: boolean;
};

type BeatSpec = {
  id: string;
  prompt: string;
  aside?: string;
  fields: FieldSpec[];
  choice?: "division" | "discoverySource";
  isFinal?: boolean;
};

function buildBeats(copy: FlowCopy, division: RecruitmentDivision | ""): BeatSpec[] {
  const branch = division ? copy.branch[DIVISION_KEY[division]] : copy.branch.mechanical;
  const branchKeys = division ? BRANCH_FIELDS[division] : BRANCH_FIELDS["Cơ khí - Thiết kế"];

  return [
    {
      id: "identity",
      prompt: copy.prompts.identity,
      fields: [
        {
          key: "fullName",
          label: copy.labels.fullName,
          kind: "text",
          required: true,
          autoComplete: "name",
        },
        {
          key: "classCohort",
          label: copy.labels.classCohort,
          kind: "text",
          required: true,
          autoComplete: "off",
          revealAfter: "fullName",
        },
      ],
    },
    {
      id: "birth",
      prompt: copy.prompts.birth,
      fields: [
        {
          key: "birthDate",
          label: copy.labels.birthDate,
          kind: "date",
          required: true,
          autoComplete: "bday",
        },
      ],
    },
    {
      id: "origin",
      prompt: copy.prompts.origin,
      choice: "discoverySource",
      fields: [
        {
          key: "discoverySourceOther",
          label: copy.labels.discoveryOther,
          kind: "text",
          required: true,
        },
      ],
    },
    {
      id: "contact",
      prompt: copy.prompts.contact,
      fields: [
        {
          key: "phone",
          label: copy.labels.phone,
          kind: "tel",
          required: true,
          autoComplete: "tel",
        },
        {
          key: "email",
          label: copy.labels.email,
          kind: "email",
          required: true,
          autoComplete: "email",
        },
        {
          key: "facebook",
          label: copy.labels.facebook,
          kind: "url",
          required: true,
          autoComplete: "url",
          placeholder: "https://facebook.com/...",
          revealAfter: "email",
        },
      ],
    },
    {
      id: "role",
      prompt: copy.prompts.role,
      choice: "division",
      fields: [],
    },
    {
      id: "drive",
      prompt: copy.prompts.drive,
      fields: [{ key: "motivation", label: "", kind: "textarea", required: true, counter: true }],
    },
    {
      id: "branch-1",
      prompt: branch.q1,
      aside: branch.a1,
      fields: [{ key: branchKeys[0], label: "", kind: "textarea", required: true }],
    },
    {
      id: "branch-2",
      prompt: branch.q2,
      aside: branch.a2,
      fields: [{ key: branchKeys[1], label: "", kind: "textarea", required: true }],
    },
    {
      id: "branch-3",
      prompt: branch.q3,
      aside: branch.a3,
      fields: [{ key: branchKeys[2], label: "", kind: "textarea", required: true }],
    },
    {
      id: "close",
      prompt: branch.q4,
      aside: branch.a4,
      isFinal: true,
      fields: [{ key: branchKeys[3], label: "", kind: "textarea", required: false }],
    },
  ];
}

function clearDraft() {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
    draftCache = null;
  } catch {
    // Draft storage is an enhancement; submission must still work without it.
  }
}

type RecruitmentDraft = { values: RecruitmentFormValues; beatIndex: number };

function parseDraft(): RecruitmentDraft | null {
  try {
    const stored = window.localStorage.getItem(DRAFT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as {
      values?: Partial<RecruitmentFormValues>;
      beatIndex?: number;
    };
    const hasContent = Object.values(parsed.values ?? {}).some(
      (value) => typeof value === "string" && value.trim().length > 0,
    );
    if (!hasContent || !parsed.values) return null;

    const values = { ...EMPTY_RECRUITMENT_FORM, ...parsed.values } as RecruitmentFormValues;
    if (values.division && !RECRUITMENT_DIVISIONS.includes(values.division)) values.division = "";
    if (
      values.discoverySource &&
      !RECRUITMENT_DISCOVERY_SOURCES.includes(values.discoverySource)
    ) {
      values.discoverySource = "";
    }
    return {
      values,
      beatIndex:
        typeof parsed.beatIndex === "number"
          ? Math.max(0, Math.min(parsed.beatIndex, REVIEW_INDEX))
          : 0,
    };
  } catch {
    clearDraft();
    return null;
  }
}

/**
 * Storage is read once per page load and cached, so `getSnapshot` stays referentially
 * stable and the browser state arrives without a post-mount state cascade.
 */
let draftCache: RecruitmentDraft | null | undefined;

function getDraftSnapshot(): RecruitmentDraft | null {
  if (draftCache === undefined) draftCache = parseDraft();
  return draftCache;
}

const subscribeToNothing = () => () => undefined;
const alwaysTrue = () => true;
const alwaysNull = () => null;

const controlBase =
  "w-full px-3.5 py-2.5 text-base leading-normal outline-none transition-[border-color,box-shadow] duration-200";
const lightControl =
  "rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/25";
export function RecruitmentFlow() {
  const { locale, setLocale } = useLanguage();
  const copy = copyByLocale[locale];
  const reduceMotion = useReducedMotion();
  const scopeId = useId();
  /** A route wipe can still cover this surface; hold the terminal line until it lifts. */
  const shellRevealed = useBootAnimationReady();

  const hiddenFormRef = useRef<HTMLFormElement>(null);
  const submissionStartedRef = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const advanceTimerRef = useRef(0);

  const [edits, setEdits] = useState<Partial<RecruitmentFormValues>>({});
  const [errors, setErrors] = useState<RecruitmentFieldErrors>({});
  const [beatOverride, setBeatOverride] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [hiddenPairs, setHiddenPairs] = useState<Array<{ name: string; value: string }>>([]);
  const [draftDiscarded, setDraftDiscarded] = useState(false);
  const [pendingChoice, setPendingChoice] = useState<string | null>(null);
  const [orientationSeen, setOrientationSeen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [failureKind, setFailureKind] = useState<"generic" | "timeout">("generic");

  const storedDraft = useSyncExternalStore(subscribeToNothing, getDraftSnapshot, alwaysNull);
  const draft = draftDiscarded ? null : storedDraft;
  const hydrated = useSyncExternalStore(subscribeToNothing, alwaysTrue, () => false);
  const orientationActive = orientationSeen || Boolean(draft);

  const values = useMemo<RecruitmentFormValues>(
    () => ({ ...EMPTY_RECRUITMENT_FORM, ...draft?.values, ...edits }),
    [draft, edits],
  );

  const beats = useMemo(() => buildBeats(copy, values.division), [copy, values.division]);
  const total = beats.length;
  const activeIndex = Math.min(beatOverride ?? draft?.beatIndex ?? 0, REVIEW_INDEX);
  const beat = beats[Math.min(activeIndex, total - 1)];
  const isReview = activeIndex === REVIEW_INDEX;

  const fieldId = useCallback((key: string) => `${scopeId}-${key}`, [scopeId]);

  /**
   * `AnimatePresence` in wait mode mounts a beat only after the previous one has
   * left, so the entry control claims focus as it attaches rather than on a timer.
   */
  const focusInteractive = shellRevealed && status === "idle" && orientationActive;
  const claimFocus = useCallback(
    (node: HTMLElement | null) => {
      if (!node || !focusInteractive) return;
      node.focus({ preventScroll: true });
    },
    [focusInteractive],
  );

  useEffect(() => () => window.clearTimeout(advanceTimerRef.current), []);

  useEffect(() => {
    const updateOnlineState = () => setIsOnline(window.navigator.onLine);
    updateOnlineState();
    window.addEventListener("online", updateOnlineState);
    window.addEventListener("offline", updateOnlineState);
    return () => {
      window.removeEventListener("online", updateOnlineState);
      window.removeEventListener("offline", updateOnlineState);
    };
  }, []);

  useEffect(() => {
    if (!hydrated || status === "success") return;
    const timer = window.setTimeout(() => {
      try {
        const hasContent = Object.values(values).some(
          (value) => typeof value === "string" && value.trim().length > 0,
        );
          if (!hasContent) {
          clearDraft();
          return;
        }
        window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ values, beatIndex: activeIndex }));
        draftCache = { values, beatIndex: activeIndex };
      } catch {
        // Continue without draft persistence when storage is unavailable.
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [activeIndex, hydrated, status, values]);

  useEffect(() => {
    if (status !== "success") return;
    const frame = window.requestAnimationFrame(() => successRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [status]);

  useEffect(() => {
    if (status !== "submitting" || hiddenPairs.length === 0) return;
    const hiddenForm = hiddenFormRef.current;
    if (!hiddenForm) return;

    const submitTimer = window.setTimeout(() => {
      try {
        submissionStartedRef.current = true;
        hiddenForm.submit();
      } catch {
        submissionStartedRef.current = false;
        setFailureKind("generic");
        setStatus("error");
      }
    }, 50);
    const timeoutTimer = window.setTimeout(() => {
      submissionStartedRef.current = false;
      setFailureKind("timeout");
      setStatus("error");
    }, SUBMISSION_TIMEOUT_MS);

    return () => {
      window.clearTimeout(submitTimer);
      window.clearTimeout(timeoutTimer);
    };
  }, [hiddenPairs, status]);

  const setField = useCallback(
    <K extends keyof RecruitmentFormValues>(key: K, value: RecruitmentFormValues[K]) => {
      setEdits((previous) => ({ ...previous, [key]: value }));
      setErrors((previous) => {
        if (!previous[key]) return previous;
        const next = { ...previous };
        delete next[key];
        return next;
      });
    },
    [],
  );

  const visibleFields = useMemo(
    () =>
      beat.fields.filter((field) => {
        if (field.key === "discoverySourceOther") return values.discoverySource === "Khác";
        if (!field.revealAfter) return true;
        return values[field.revealAfter].trim().length > 0;
      }),
    [beat, values],
  );

  const beatFilled =
    visibleFields
      .filter((field) => field.required)
      .every((field) => values[field.key].trim().length > 0) &&
    (beat.choice !== "discoverySource" || values.discoverySource !== "") &&
    (beat.choice !== "division" || values.division !== "");

  const goBack = useCallback(() => {
    window.clearTimeout(advanceTimerRef.current);
    setErrors({});
    setPendingChoice(null);
    setBeatOverride(Math.max(0, activeIndex - 1));
  }, [activeIndex]);

  const editReviewField = useCallback((fieldIndex: number) => {
    window.clearTimeout(advanceTimerRef.current);
    setBeatOverride(fieldIndex);
    setErrors({});
  }, []);

  const submit = useCallback(() => {
    if (status === "submitting") return;
    captureEvent(AnalyticsEvents.RECRUITMENT_SUBMIT_CLICKED, {
      surface: "/recruitment",
      division: values.division,
    });
    const nextErrors = validateRecruitmentForm(values, locale);
    if (hasRecruitmentErrors(nextErrors)) {
      setErrors(nextErrors);
      const firstInvalid = Object.keys(nextErrors)[0] as RecruitmentFieldKey;
      const target = beats.findIndex(
        (item) =>
          item.fields.some((field) => field.key === firstInvalid) ||
          (item.choice === "discoverySource" && firstInvalid === "discoverySource") ||
          (item.choice === "division" && firstInvalid === "division"),
      );
      setBeatOverride(target >= 0 ? target : 0);
      return;
    }
    if (!isOnline || !window.navigator.onLine) {
      setFailureKind("generic");
      setStatus("error");
      return;
    }
    setFailureKind("generic");
    setHiddenPairs(buildRecruitmentFormPayload(values));
    setStatus("submitting");
  }, [beats, isOnline, locale, status, values]);

  const advance = useCallback(() => {
    if (status === "submitting") return;

    const allErrors = validateRecruitmentForm(values, locale);
    const scopedKeys: RecruitmentFieldKey[] = [
      ...visibleFields.filter((field) => field.required).map((field) => field.key),
      ...(beat.choice === "discoverySource"
        ? (["discoverySource", "discoverySourceOther"] as RecruitmentFieldKey[])
        : []),
      ...(beat.choice === "division" ? (["division"] as RecruitmentFieldKey[]) : []),
    ];
    const scoped = Object.fromEntries(
      scopedKeys.filter((key) => allErrors[key]).map((key) => [key, allErrors[key]]),
    ) as RecruitmentFieldErrors;

    if (hasRecruitmentErrors(scoped)) {
      setErrors(scoped);
      const firstInvalid = scopedKeys.find((key) => scoped[key]);
      if (firstInvalid) document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    if (beat.isFinal) {
      setErrors({});
      setBeatOverride(REVIEW_INDEX);
      return;
    }
    setErrors({});
    setBeatOverride(Math.min(total - 1, activeIndex + 1));
  }, [activeIndex, beat, fieldId, locale, status, total, values, visibleFields]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (status !== "idle" && status !== "error") return;
      if (activeIndex === 0) return;
      event.preventDefault();
      goBack();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, goBack, status]);

  const focusNextField = (currentKey: RecruitmentFieldKey) => {
    const order = visibleFields.map((field) => field.key);
    const next = order[order.indexOf(currentKey) + 1];
    if (!next) return false;
    const element = document.getElementById(fieldId(next));
    if (!element) return false;
    element.focus();
    return true;
  };

  const handleFieldEnter = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: FieldSpec,
  ) => {
    if (event.key !== "Enter") return;
    if (field.kind === "textarea" && event.shiftKey) return;
    event.preventDefault();
    if (field.kind !== "textarea" && focusNextField(field.key)) return;
    advance();
  };

  const queueAdvance = (delay: number) => {
    window.clearTimeout(advanceTimerRef.current);
    advanceTimerRef.current = window.setTimeout(() => {
      setPendingChoice(null);
      setBeatOverride((currentIndex) =>
        currentIndex === activeIndex ? Math.min(total - 1, activeIndex + 1) : currentIndex,
      );
    }, delay);
  };

  const selectDivision = (division: RecruitmentDivision) => {
    window.clearTimeout(advanceTimerRef.current);
    setField("division", division);
    setPendingChoice(division);
    queueAdvance(reduceMotion ? 80 : 420);
  };

  const selectDiscoverySource = (source: RecruitmentDiscoverySource) => {
    window.clearTimeout(advanceTimerRef.current);
    setField("discoverySource", source);
    // The revealed free-text field claims focus itself as it mounts.
    if (source === "Khác") return;
    setPendingChoice(source);
    queueAdvance(reduceMotion ? 80 : 320);
  };

  const reset = () => {
    window.clearTimeout(advanceTimerRef.current);
    clearDraft();
    setDraftDiscarded(true);
    setEdits({});
    setErrors({});
    setHiddenPairs([]);
    setFailureKind("generic");
    setStatus("idle");
    setBeatOverride(0);
  };

  const handleSubmissionLoad = () => {
    if (!submissionStartedRef.current) return;
    submissionStartedRef.current = false;
    clearDraft();
    captureEvent(AnalyticsEvents.RECRUITMENT_SUBMITTED, {
      surface: "/recruitment",
      division: values.division,
    });
    setStatus("success");
  };

  const handleSubmissionError = () => {
    if (!submissionStartedRef.current) return;
    submissionStartedRef.current = false;
    setFailureKind("generic");
    setStatus("error");
  };

  const submissionMessage = !isOnline
    ? copy.offlineError
    : failureKind === "timeout"
      ? copy.timeoutError
      : copy.submissionError;

  const showAction = !beat.choice || beat.isFinal || values.discoverySource === "Khác";
  const actionBlocked = (!beatFilled && !beat.isFinal) || status === "submitting";
  /** An untouched question is not yet incomplete, so the nudge waits for a first answer. */
  const beatStarted = visibleFields.some((field) => values[field.key].trim().length > 0);
  const isOrientationScreen = status !== "success" && !orientationActive;
  const progressRatio =
    status === "success" ? 1 : isOrientationScreen ? 0 : (activeIndex + 1) / (REVIEW_INDEX + 1);

  return (
    <div className="relative flex h-dvh min-h-0 flex-col overflow-hidden bg-slate-50 text-blue-950">

      <iframe
        name="recruitment-google-form-target"
        title="Application form submission"
        className="hidden"
        aria-hidden
        tabIndex={-1}
        onLoad={handleSubmissionLoad}
        onError={handleSubmissionError}
      />
      <form
        ref={hiddenFormRef}
        action={RECRUITMENT_FORM_POST_URL}
        method="POST"
        target="recruitment-google-form-target"
        className="hidden"
        aria-hidden
      >
        {hiddenPairs.map((pair) => (
          <input
            key={`${pair.name}-${pair.value}`}
            type="hidden"
            name={pair.name}
            value={pair.value}
            readOnly
          />
        ))}
      </form>

      {status === "submitting" || status === "error" ? (
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {status === "submitting" ? copy.sending : submissionMessage}
        </p>
      ) : null}

      <div className="relative z-10 shrink-0">
        <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2.5 sm:gap-4 sm:px-10 sm:py-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 sm:px-3"
          >
            <X className="h-4 w-4 shrink-0" strokeWidth={1.8} />
            <span className="truncate">{copy.exit}</span>
          </Link>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="text-sm font-semibold text-slate-900">RBS</span>
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
              {(["vi", "en"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  aria-pressed={locale === code}
                  className={cn(
                    "min-h-11 rounded-md px-3 text-sm uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40",
                    locale === code
                      ? "bg-white font-semibold text-blue-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-900",
                  )}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </header>
        <div
          role="progressbar"
          aria-label={copy.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressRatio * 100)}
          className="h-1 w-full overflow-hidden bg-slate-200"
        >
          <div
            className={cn(
              "h-full origin-left bg-blue-600",
              reduceMotion
                ? ""
                : "transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
            )}
            style={{ transform: `scaleX(${progressRatio})` }}
          />
        </div>
      </div>

      <main className="relative z-10 flex min-h-0 flex-1 overflow-hidden px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-10 sm:pb-6 sm:pt-5">
        {isOrientationScreen ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(37,99,235,0.08),transparent_55%)]"
          />
        ) : null}
        <div className="relative mx-auto flex h-full min-h-0 w-full min-w-0 max-w-6xl flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
            <AnimatePresence mode="wait">
              {status === "success" ? (
              <motion.div
                key="success"
                ref={successRef}
                role="status"
                tabIndex={-1}
                initial={reduceMotion ? false : { opacity: 0, transform: "translateY(10px)" }}
                animate={{ opacity: 1, transform: "translateY(0)" }}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE_OUT }}
                className="mx-auto my-auto w-full max-w-xl py-8 text-center outline-none"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Check className="h-6 w-6" strokeWidth={2} />
                </span>
                <h1 className={cn("mt-8 font-semibold text-blue-950", displayType)}>{copy.successTitle}</h1>
                <p className="mx-auto mt-5 max-w-[46ch] text-lg leading-relaxed text-slate-600">
                  {copy.successBody}
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex min-h-12 items-center rounded-lg bg-blue-600 px-6 text-base font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-blue-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 focus-visible:ring-offset-2"
                  >
                    {copy.successAgain}
                  </button>
                  <Link
                    href="/"
                    className="inline-flex min-h-12 items-center rounded-lg border border-slate-300 bg-white px-6 text-base font-medium text-slate-700 transition-colors duration-200 hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40"
                  >
                    {copy.successHome}
                  </Link>
                </div>
              </motion.div>
            ) : !orientationActive ? (
              <motion.div
                key="orientation"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, transform: "translateY(14px) scale(0.98)" }
                }
                animate={{ opacity: 1, transform: "translateY(0) scale(1)" }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, transform: "translateY(-10px) scale(0.99)" }
                }
                transition={{ duration: reduceMotion ? 0.18 : 0.48, ease: EASE_OUT }}
                className="mx-auto my-auto w-full max-w-5xl py-2 sm:py-4"
              >
                <div className="w-full rounded-2xl bg-slate-100/90 p-1 ring-1 ring-slate-200/90 sm:rounded-[1.35rem] sm:p-1.5">
                <section className="grid w-full gap-6 rounded-[calc(1rem-0.125rem)] border border-slate-200/80 bg-white px-4 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:gap-8 sm:rounded-[calc(1.35rem-0.375rem)] sm:px-8 sm:py-9 lg:grid-cols-12 lg:items-stretch lg:gap-10 lg:px-10 lg:py-10">
                  <div className="flex min-w-0 flex-col lg:col-span-6">
                    <h1
                      className={cn(
                        "max-w-[18ch] text-left font-black text-blue-950",
                        orientationDisplayType,
                      )}
                    >
                      <span className="sr-only">{copy.orientationTitle}</span>
                      {copy.orientationTitleLines.map((line, index) => (
                        <span key={line} aria-hidden className="block overflow-hidden pb-1">
                          <motion.span
                            className="block will-change-transform"
                            initial={
                              reduceMotion
                                ? false
                                : { opacity: 0, transform: "translateY(110%)" }
                            }
                            animate={{ opacity: 1, transform: "translateY(0%)" }}
                            transition={{
                              duration: reduceMotion ? 0.16 : 0.55,
                              delay: reduceMotion ? 0 : 0.08 + index * 0.08,
                              ease: EASE_OUT,
                            }}
                          >
                            {line}
                          </motion.span>
                        </span>
                      ))}
                    </h1>
                    <motion.p
                      initial={
                        reduceMotion ? false : { opacity: 0, transform: "translateY(10px)" }
                      }
                      animate={{ opacity: 1, transform: "translateY(0px)" }}
                      transition={{
                        duration: reduceMotion ? 0.16 : 0.42,
                        delay: reduceMotion ? 0 : 0.28,
                        ease: EASE_OUT,
                      }}
                      className="mt-3 max-w-[42ch] text-left text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg"
                    >
                      {copy.orientationBody}
                    </motion.p>
                    <motion.button
                      type="button"
                      onClick={() => setOrientationSeen(true)}
                      aria-label={copy.start}
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, transform: "translateY(10px) scale(0.96)" }
                      }
                      animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                      transition={{
                        duration: reduceMotion ? 0.16 : 0.45,
                        delay: reduceMotion ? 0 : 0.4,
                        ease: EASE_OUT,
                      }}
                      className="group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-2.5 pl-6 pr-2.5 text-base font-semibold text-white shadow-[0_4px_14px_0_rgba(37,99,235,0.22)] transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 focus-visible:ring-offset-2 active:scale-[0.98] sm:mt-9 sm:w-fit sm:min-h-14 sm:justify-start sm:pl-7 sm:text-lg [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-px [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_8px_24px_0_rgba(37,99,235,0.28)]"
                    >
                      <span>{copy.start}</span>
                      <span
                        aria-hidden
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] sm:h-10 sm:w-10 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                      >
                        <ArrowRight className="h-5 w-5" strokeWidth={2} />
                      </span>
                    </motion.button>
                  </div>

                  <motion.div
                    initial={
                      reduceMotion ? false : { opacity: 0, transform: "translateY(12px)" }
                    }
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    transition={{
                      duration: reduceMotion ? 0.16 : 0.45,
                      delay: reduceMotion ? 0 : 0.34,
                      ease: EASE_OUT,
                    }}
                    className="flex min-w-0 flex-col gap-4 sm:gap-5 lg:col-span-6"
                  >
                    <dl className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-slate-50/80">
                      <div className="flex gap-3 px-3.5 py-3 sm:px-5 sm:py-4">
                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700 ring-1 ring-slate-200">
                          <Clock3 className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <dt className="text-sm font-semibold text-blue-950">
                            {copy.orientationEffortLabel}
                          </dt>
                          <dd className="mt-1 text-sm leading-relaxed text-slate-600">
                            <span className="font-medium text-slate-800">{copy.orientationEffortValue}</span>
                            <span className="mt-1 block">{copy.orientationEffortDetail}</span>
                          </dd>
                        </div>
                      </div>
                      <div className="flex gap-3 px-3.5 py-3 sm:px-5 sm:py-4">
                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700 ring-1 ring-slate-200">
                          <ShieldCheck className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <dt className="text-sm font-semibold text-blue-950">
                            {copy.orientationPrivacyLabel}
                          </dt>
                          <dd className="mt-1 text-sm leading-relaxed text-slate-600">
                            <span className="font-medium text-slate-800">{copy.orientationMeta}</span>
                            <span className="mt-1 block">{copy.orientationPrivacyDetail}</span>
                          </dd>
                        </div>
                      </div>
                      <div className="px-3.5 py-3 sm:px-5 sm:py-4">
                        <dt className="text-sm font-semibold text-blue-950">
                          {copy.orientationNextLabel}
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-slate-600">
                          {copy.orientationNextValue}
                        </dd>
                      </div>
                    </dl>

                    <div>
                      <p className="text-sm font-semibold text-blue-950">
                        {copy.orientationDivisionsIntro}
                      </p>
                      <ul className="mt-2.5 space-y-2 sm:mt-3">
                        {copy.orientationDivisions.map((division) => (
                          <li
                            key={division.name}
                            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3"
                          >
                            <p className="text-sm font-semibold text-blue-950">{division.name}</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">
                              {division.blurb}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </section>
                </div>
              </motion.div>
            ) : isReview ? (
              <motion.section
                key="review"
                initial={reduceMotion ? false : { opacity: 0, transform: "translateY(8px)" }}
                animate={{ opacity: 1, transform: "translateY(0)" }}
                exit={{ opacity: 0, transform: "translateY(-8px)" }}
                transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE_OUT }}
                className="mx-auto my-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-10"
              >
                <div className="border-b border-slate-200 pb-5 sm:pb-6">
                  <h1 className="text-2xl font-bold tracking-tight text-blue-950 sm:text-4xl">{copy.review}</h1>
                  <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-slate-600 sm:mt-3">{copy.orientationPrivacy}</p>
                </div>
                <dl className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
                  {[
                    [copy.labels.fullName, values.fullName, 0],
                    [copy.labels.classCohort, values.classCohort, 0],
                    [copy.labels.birthDate, values.birthDate, 1],
                    [copy.labels.phone, values.phone, 3],
                    [copy.labels.email, values.email, 3],
                    [copy.labels.facebook, values.facebook || copy.notProvided, 3],
                    [copy.prompts.origin, values.discoverySource === "Khác" ? values.discoverySourceOther : getRecruitmentDiscoverySourceLabel(values.discoverySource as RecruitmentDiscoverySource, locale), 2],
                    [copy.prompts.role, values.division ? getRecruitmentDivisionCopy(values.division, locale).label : copy.notProvided, 4],
                    [copy.prompts.drive, values.motivation, 5],
                  ].map(([label, value, fieldIndex]) => (
                    <div key={String(label)} className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 p-3.5 sm:p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
                          <dd className="mt-2 break-words whitespace-pre-wrap text-sm leading-relaxed text-blue-950">{value}</dd>
                        </div>
                        <button type="button" onClick={() => editReviewField(Number(fieldIndex))} className="min-h-11 shrink-0 rounded-md px-3 text-sm font-semibold text-blue-700 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40">
                          {copy.edit}
                        </button>
                      </div>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-end">
                  <button type="button" onClick={goBack} className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 sm:w-auto">
                    {copy.previousQuestion}
                  </button>
                  <button type="button" onClick={submit} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition-[background-color,transform] hover:bg-blue-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 focus-visible:ring-offset-2 sm:w-auto">
                    {copy.submit}<ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>
              </motion.section>
            ) : (
              <motion.div
                key={beat.id}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(8px)" }}
                animate={{ opacity: 1, transform: "translateY(0)" }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(-8px)" }}
                transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: EASE_OUT }}
                className="mx-auto my-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm sm:p-8"
              >
                <h1
                  id={`${scopeId}-prompt`}
                  className={cn("max-w-[32ch] font-semibold text-blue-950", promptType)}
                >
                  {beat.prompt}
                </h1>
                {beat.aside ? (
                  <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-slate-600">
                    {beat.aside}
                  </p>
                ) : null}

                {beat.choice === "division" ? (
                  <div
                    role="radiogroup"
                    aria-labelledby={`${scopeId}-prompt`}
                    className="mt-5 grid gap-2.5 sm:mt-6 md:grid-cols-3"
                    onKeyDown={(event) => {
                      // Arrows move focus only: selecting advances the flow, so it stays explicit.
                      const keys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"];
                      if (!keys.includes(event.key)) return;
                      const cards = Array.from(
                        event.currentTarget.querySelectorAll<HTMLButtonElement>("[role='radio']"),
                      );
                      const current = cards.indexOf(document.activeElement as HTMLButtonElement);
                      const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
                      const next = cards[(current + delta + cards.length) % cards.length];
                      if (next) {
                        event.preventDefault();
                        next.focus();
                      }
                    }}
                  >
                    {RECRUITMENT_DIVISIONS.map((division, index) => {
                      const divisionCopy = getRecruitmentDivisionCopy(division, locale);
                      const selected = values.division === division;
                      const dimmed = pendingChoice !== null && pendingChoice !== division;
                      const claims = selected || (!values.division && index === 0);
                      return (
                        <button
                          key={division}
                          type="button"
                          aria-label={divisionCopy.label}

                          role="radio"
                          ref={claims ? claimFocus : undefined}
                          aria-checked={selected}
                          tabIndex={claims ? 0 : -1}
                          data-autofocus={claims ? "true" : undefined}
                          onClick={() => selectDivision(division)}
                          className={cn(
                            "flex min-h-[7.5rem] flex-col items-start justify-center rounded-xl border p-4 text-left transition-[border-color,background-color,transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] sm:min-h-40 sm:p-5",
                            "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 active:scale-[0.99]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40",
                            selected ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white",
                            dimmed && "opacity-50",
                          )}
                        >
                          <span className="text-lg font-semibold leading-snug tracking-[-0.02em] text-blue-950 sm:text-xl">
                            {divisionCopy.label}
                          </span>
                          <span className="mt-2 text-sm leading-relaxed text-slate-600">
                            {divisionCopy.description}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {beat.choice === "discoverySource" ? (
                  <div
                    role="radiogroup"
                    aria-labelledby={`${scopeId}-prompt`}
                    className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-2.5"
                  >
                    {RECRUITMENT_DISCOVERY_SOURCES.map((source, index) => {
                      const selected = values.discoverySource === source;
                      const dimmed = pendingChoice !== null && pendingChoice !== source;
                      const claims = selected || (!values.discoverySource && index === 0);
                      return (
                        <button
                          key={source}
                          type="button"
                          role="radio"
                          aria-label={getRecruitmentDiscoverySourceLabel(source, locale)}
                          ref={claims ? claimFocus : undefined}
                          aria-checked={selected}
                          tabIndex={claims ? 0 : -1}
                          data-autofocus={claims ? "true" : undefined}
                          onClick={() => selectDiscoverySource(source)}
                          className={cn(
                            "min-h-12 rounded-lg border px-5 text-base transition-[border-color,background-color,color,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                            "hover:border-blue-300 hover:bg-blue-50 hover:text-blue-950 active:scale-[0.98]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40",
                            selected
                              ? "border-blue-600 bg-blue-50 text-blue-950"
                              : "border-slate-200 bg-white text-slate-700",
                            dimmed && "opacity-35",
                          )}
                        >
                          {getRecruitmentDiscoverySourceLabel(source, locale)}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                <div className={cn(beat.choice ? "mt-4" : "mt-5", "w-full max-w-xl space-y-4")}>
                  {visibleFields.map((field, index) => {
                    const id = fieldId(field.key);
                    const error = errors[field.key];
                    const autoFocus =
                      (!beat.choice && index === 0) || field.key === "discoverySourceOther"
                        ? "true"
                        : undefined;

                    if (field.kind === "textarea") {
                      return (
                        <div key={field.key}>
                          {field.label ? (
                            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-800">
                              {field.label}
                              {field.required ? <span className="ml-1 text-blue-700">*</span> : null}
                            </label>
                          ) : null}
                          <div className="relative">
                            <textarea
                              id={id}
                              ref={autoFocus ? claimFocus : undefined}
                              data-autofocus={autoFocus}
                              value={values[field.key]}
                              onChange={(event) => setField(field.key, event.target.value)}
                              onKeyDown={(event) => handleFieldEnter(event, field)}
                              rows={4}
                              maxLength={2000}
                              aria-labelledby={field.label ? undefined : `${scopeId}-prompt`}
                              aria-required={field.required}
                              aria-invalid={Boolean(error)}
                              aria-describedby={cn(
                                error ? `${id}-error` : undefined,
                                field.counter ? `${id}-count` : undefined,
                              ) || undefined}
                              className={cn(controlBase, lightControl, "min-h-[7.5rem] resize-y")}
                            />
                          </div>
                          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            {error ? (
                              <p id={`${id}-error`} role="alert" className="text-sm text-red-700">
                                {error}
                              </p>
                            ) : null}
                            {field.counter ? (
                              <span id={`${id}-count`} className="text-sm tabular-nums text-slate-500">
                                {copy.characters(values[field.key].trim().length)}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={field.key}>
                        <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-800">
                          {field.key === "classCohort" && !values.classCohort
                            ? copy.prompts.identitySecond
                            : field.label}
                          {field.required ? <span className="ml-1 text-blue-700">*</span> : null}
                        </label>
                        <div className="relative">
                          <input
                            id={id}
                            ref={autoFocus ? claimFocus : undefined}
                            data-autofocus={autoFocus}
                            type={field.kind}
                            value={values[field.key]}
                            onChange={(event) => setField(field.key, event.target.value)}
                            onKeyDown={(event) => handleFieldEnter(event, field)}
                            placeholder={field.placeholder}
                            autoComplete={field.autoComplete}
                            maxLength={field.kind === "url" ? 500 : 120}
                            max={field.key === "birthDate" ? new Date().toISOString().slice(0, 10) : undefined}
                            min={field.key === "birthDate" ? "1900-01-01" : undefined}
                            aria-invalid={Boolean(error)}
                            aria-describedby={cn(
                              error ? `${id}-error` : undefined,
                              field.key === "birthDate" ? `${id}-hint` : undefined,
                            ) || undefined}
                            className={cn(controlBase, lightControl)}
                          />
                          {field.key === "birthDate" ? (
                            <p id={`${id}-hint`} className="mt-2 text-sm text-slate-500">{copy.dateFormat}</p>
                          ) : null}
                        </div>
                        {error ? (
                          <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-700">
                            {error}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                {status === "error" ? (
                  <div
                    role="alert"
                    className="mt-6 max-w-[62ch] rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-800 sm:mt-8"
                  >
                    <p>{submissionMessage}</p>
                    <button
                      type="button"
                      onClick={submit}
                      className="mt-3 min-h-11 rounded-md border border-red-300 bg-white px-3 font-semibold text-red-800 transition-colors duration-150 hover:border-red-400 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40"
                    >
                      {copy.submit}
                    </button>
                  </div>
                ) : null}

                {showAction || activeIndex > 0 ? (
                  <div className="mt-5 flex w-full max-w-xl flex-col items-stretch gap-2 sm:mt-6">
                    {showAction && !beatFilled && !beat.isFinal && beatStarted ? (
                      <p
                        id={`${scopeId}-incomplete`}
                        className="max-w-[40ch] text-sm leading-snug text-slate-600"
                      >
                        {copy.incomplete}
                      </p>
                    ) : null}
                    <div className="flex w-full flex-col-reverse gap-2.5 sm:flex-row sm:items-center sm:justify-start sm:gap-3">
                      {activeIndex > 0 ? (
                        <button
                          type="button"
                          onClick={goBack}
                          disabled={status === "submitting"}
                          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-base font-medium text-slate-700 transition-colors duration-200 hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-11 sm:w-auto sm:rounded-lg sm:px-5"
                        >
                          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
                          {copy.back}
                        </button>
                      ) : null}
                      {showAction ? (
                        <button
                          type="button"
                          onClick={advance}
                          disabled={actionBlocked}
                          aria-describedby={
                            !beatFilled && !beat.isFinal && beatStarted
                              ? `${scopeId}-incomplete`
                              : undefined
                          }
                          className={cn(
                            "group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-base font-semibold transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] sm:min-h-11 sm:w-auto sm:rounded-lg",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40 focus-visible:ring-offset-2",
                            actionBlocked
                              ? "cursor-not-allowed bg-slate-100 text-slate-400"
                              : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]",
                          )}
                        >
                          {status === "submitting" ? (
                            <>
                              <Loader2
                                className={cn("h-4 w-4", !reduceMotion && "animate-spin")}
                                strokeWidth={2}
                              />
                              {copy.sending}
                            </>
                          ) : (
                            <>
                              {beat.isFinal ? copy.submit : copy.next}
                              <ArrowRight
                                className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                                strokeWidth={2}
                              />
                            </>
                          )}
                        </button>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </div>
      </main>

    </div>
  );
}
