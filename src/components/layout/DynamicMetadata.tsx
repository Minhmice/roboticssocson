"use client";

import { useDynamicMetadata } from "@/hooks/useDynamicMetadata";

/**
 * Client component that updates page metadata dynamically based on language
 * Must be used within LanguageProvider
 */
export function DynamicMetadata() {
  useDynamicMetadata();
  return null;
}

