/**
 * Partner/competition logos data
 * Placeholder paths - replace with actual logo files in /public/logos
 */

export type LogoItem = { 
  readonly src: string; 
  readonly alt: string;
};

export const partnerLogos: readonly LogoItem[] = [
  { 
    src: "/logos/ftc.svg",  
    alt: "FIRST Tech Challenge" 
  },
  { 
    src: "/logos/vorc.svg", 
    alt: "Vietnam Open Robotics Challenge" 
  },
  { 
    src: "/logos/vrc.svg",  
    alt: "VEX Robotics Competition" 
  },
  { 
    src: "/logos/first.svg",
    alt: "FIRST Robotics" 
  },
] as const;

