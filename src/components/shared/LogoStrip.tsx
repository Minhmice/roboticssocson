import Image from "next/image";
import { cn } from "@/lib/utils";

interface Logo {
  src: string;
  alt: string;
  href?: string;
}

interface LogoStripProps {
  logos: Logo[];
  className?: string;
}

export const LogoStrip: React.FC<LogoStripProps> = ({ logos, className }) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-8 px-4 py-6",
        className
      )}
    >
      {logos.map((logo, index) => (
        <div
          key={index}
          className="transition-all duration-300 hover:scale-110 grayscale hover:grayscale-0"
        >
          {logo.href ? (
            <a href={logo.href} target="_blank" rel="noopener noreferrer">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={60}
                sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 120px"
                className="h-auto max-h-16 w-auto opacity-70 hover:opacity-100"
              />
            </a>
          ) : (
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={60}
              sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 120px"
              className="h-auto max-h-16 w-auto opacity-70"
            />
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * Usage example:
 * 
 * <LogoStrip logos={[
 *   { src: "/logos/fpt.png", alt: "FPT University", href: "https://fpt.edu.vn" },
 *   { src: "/logos/ftc.png", alt: "FIRST Tech Challenge" },
 * ]} />
 */

