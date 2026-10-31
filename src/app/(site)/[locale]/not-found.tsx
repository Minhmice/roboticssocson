"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { StatusBoard } from "@/components/shared/StatusBoard";
import { courseSurfacesEnabled } from "@/data/courseRegistration";

export default function NotFound() {
  const { locale } = useLanguage();
  const vi = locale === "vi";

  return (
    <StatusBoard
      code="404"
      signal={vi ? "Tín hiệu mất — route không có trên sân" : "Signal lost — route off the field"}
      title={vi ? "Không tìm thấy trang" : "Page not found"}
      description={
        vi
          ? courseSurfacesEnabled
            ? "Đường dẫn không tồn tại hoặc đã được chuyển đi. Quay lại trang chủ hoặc mở khóa học STEM."
            : "Đường dẫn không tồn tại hoặc đã được chuyển đi. Quay lại trang chủ để tiếp tục."
          : courseSurfacesEnabled
            ? "This path does not exist or has moved. Head home, or open the STEM course."
            : "This path does not exist or has moved. Head home to continue."
      }
      actions={[
        {
          label: vi ? "Về trang chủ" : "Back home",
          href: "/",
          variant: "primary",
        },
        ...(courseSurfacesEnabled
          ? [
              {
                label: vi ? "Xem khóa học" : "View course",
                href: "/course",
                variant: "secondary" as const,
              },
            ]
          : []),
      ]}
    />
  );
}
