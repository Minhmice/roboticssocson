import type { CourseConsultFormValues } from "@/lib/google-form-map";
import { EMPTY_CONSULT_FORM } from "@/lib/google-form-map";

const STORAGE_KEY = "roboticssocson:course-consult-draft";

export type ConsultFormDraft = {
  step: 1 | 2;
  values: CourseConsultFormValues;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function readConsultFormDraft(): ConsultFormDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || !isRecord(parsed.values)) return null;
    const step = parsed.step === 2 ? 2 : 1;
    const values = { ...EMPTY_CONSULT_FORM, ...parsed.values };
    return { step, values };
  } catch {
    return null;
  }
}

export function writeConsultFormDraft(draft: ConsultFormDraft): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Quota or private mode — ignore
  }
}

export function clearConsultFormDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
