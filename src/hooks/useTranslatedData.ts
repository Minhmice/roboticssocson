import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Hook to get translated fields from data objects
 * Automatically selects field based on current locale
 * 
 * @example
 * const { getField } = useTranslatedData();
 * <h1>{getField(heroData, "headline")}</h1>
 * // Returns heroData.headline_vi or heroData.headline_en based on locale
 */
export function useTranslatedData() {
  const { locale } = useLanguage();

  const getField = <T extends Record<string, any>>(
    obj: T,
    fieldPrefix: string
  ): string => {
    const key = `${fieldPrefix}_${locale}`;
    return obj[key] || obj[`${fieldPrefix}_vi`] || "";
  };

  return { getField, locale };
}
