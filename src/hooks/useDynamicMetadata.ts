"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MetadataConfig {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

const metadataTranslations: Record<"vi" | "en", MetadataConfig> = {
  vi: {
    title: "RBS - Trang Tài trợ",
    description:
      "Trao quyền cho thế hệ đổi mới tiếp theo. Đội robotics trung học từ Hà Nội thi đấu FIRST Tech Challenge.",
    ogTitle: "RBS - Trang Tài trợ",
    ogDescription: "Trao quyền cho thế hệ đổi mới tiếp theo thông qua robotics.",
    twitterTitle: "Robotics Sóc Sơn",
    twitterDescription: "Trao quyền cho thế hệ đổi mới tiếp theo.",
  },
  en: {
    title: "RBS - Sponsorship Site",
    description:
      "Empower the next generation of innovators. High school robotics team from Hanoi competing in FIRST Tech Challenge.",
    ogTitle: "RBS - Sponsorship Site",
    ogDescription: "Empower the next generation of innovators through robotics.",
    twitterTitle: "Robotics Sóc Sơn",
    twitterDescription: "Empower the next generation of innovators.",
  },
};

/**
 * Hook to dynamically update page metadata based on current locale
 * Updates document.title and meta tags when language changes
 */
export function useDynamicMetadata() {
  const { locale } = useLanguage();

  useEffect(() => {
    const config = metadataTranslations[locale];

    // Update document title
    if (config.title) {
      document.title = config.title;
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", config.description);
    } else {
      // Create if doesn't exist
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = config.description;
      document.head.appendChild(meta);
    }

    // Update Open Graph tags
    const updateMetaTag = (property: string, content: string) => {
      const existing = document.querySelector(`meta[property="${property}"]`);
      if (existing) {
        existing.setAttribute("content", content);
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("property", property);
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    if (config.ogTitle) {
      updateMetaTag("og:title", config.ogTitle);
    }
    if (config.ogDescription) {
      updateMetaTag("og:description", config.ogDescription);
    }

    // Update Twitter tags
    const updateTwitterTag = (name: string, content: string) => {
      const existing = document.querySelector(`meta[name="${name}"]`);
      if (existing) {
        existing.setAttribute("content", content);
      } else {
        const meta = document.createElement("meta");
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    if (config.twitterTitle) {
      updateTwitterTag("twitter:title", config.twitterTitle);
    }
    if (config.twitterDescription) {
      updateTwitterTag("twitter:description", config.twitterDescription);
    }

    // Update html lang attribute
    document.documentElement.lang = locale;
  }, [locale]);
}

