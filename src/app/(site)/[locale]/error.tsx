"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { StatusBoard } from "@/components/shared/StatusBoard";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale } = useLanguage();
  const vi = locale === "vi";

  useEffect(() => {
    // TODO: wire Sentry or equivalent — console.error only until SDK is installed
    console.error("[app-error]", error);
  }, [error]);

  return (
    <StatusBoard
      code="500"
      signal={
        error.digest
          ? `digest · ${error.digest.slice(0, 10)}`
          : vi
            ? "Hệ thống gặp sự cố tạm thời"
            : "Temporary system fault"
      }
      title={vi ? "Đã xảy ra lỗi" : "Something went wrong"}
      description={
        vi
          ? "Thử tải lại trang. Nếu lỗi tiếp tục, về trang chủ hoặc liên hệ đội qua Messenger."
          : "Try reloading. If it keeps happening, head home or message the team on Messenger."
      }
      actions={[
        {
          label: vi ? "Thử lại" : "Retry",
          onClick: () => reset(),
          variant: "primary",
        },
        {
          label: vi ? "Trang chủ" : "Home",
          href: "/",
          variant: "secondary",
        },
        {
          label: "Messenger",
          href: "https://m.me/roboticssocson",
          variant: "secondary",
          target: "_blank",
        },
      ]}
    />
  );
}
