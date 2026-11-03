"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

/** Web image first; swaps to the local fallback if the remote host fails or hotlink-blocks. */
export function CoverImage({ src, fallback, alt }: { src: string | null; fallback: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const useRemote = !!src && !failed;

  // The request can fail before hydration, so onError never fires; re-check on mount.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <Image
      ref={ref}
      src={useRemote ? src : fallback}
      alt={alt}
      fill
      sizes={SIZES}
      unoptimized={useRemote}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
    />
  );
}
