import { notFound } from "next/navigation";
import { courseSurfacesEnabled } from "@/data/courseRegistration";

/**
 * 404s public course routes when the surface switch is off.
 * Reopen by setting `courseRegistrationConfig.enabled = true`.
 */
export function assertCourseEnabled(): void {
  if (!courseSurfacesEnabled) {
    notFound();
  }
}
