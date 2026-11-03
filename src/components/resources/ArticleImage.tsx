"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

export function ArticleImage({
  src,
  alt,
  ...props
}: React.ComponentProps<"img">) {
  const [error, setError] = useState(false);

  return (
    <figure className="my-6">
      {error ? (
        <div className="flex min-h-32 w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
          <ImageOff aria-hidden className="size-6 text-muted-foreground/60" />
          <p className="mt-2 text-xs text-muted-foreground">
            {alt || "Hình ảnh kỹ thuật đang cập nhật"}
          </p>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt || "Tài liệu kỹ thuật"}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setError(true)}
          className="max-h-[440px] w-full rounded-xl border border-border bg-muted object-cover shadow-sm"
          {...props}
        />
      )}
      {!error && alt && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
