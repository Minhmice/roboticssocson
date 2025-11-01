/**
 * Logo data for partners and sponsors
 * Central source of truth for all partner logos displayed throughout the site
 */

export interface PartnerLogo {
  readonly src: string;
  readonly alt: string;
  readonly href?: string;
}

/**
 * Partner logos to display in the Partners section
 * Update this array with actual partner/sponsor logos
 */
export const partnerLogos: readonly PartnerLogo[] = [
  // Add partner logos here
  // Example:
  // {
  //   src: "/logos/fpt.png",
  //   alt: "FPT University",
  //   href: "https://fpt.edu.vn",
  // },
  // {
  //   src: "/logos/ftc.png",
  //   alt: "FIRST Tech Challenge",
  //   href: "https://www.firstinspires.org",
  // },
] as const;

