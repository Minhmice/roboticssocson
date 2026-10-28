/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  skipTrailingSlashRedirect: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-tabs",
      "@radix-ui/react-slot",
      "framer-motion",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  async redirects() {
    return [
      // Former sponsorship surfaces redirect to active fundraising page.
      { source: "/sponsor", destination: "/fundraising", permanent: false },
      { source: "/sponsorship", destination: "/fundraising", permanent: false },
      { source: "/sponsor/:path*", destination: "/fundraising", permanent: false },
      { source: "/sponsorship/:path*", destination: "/fundraising", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // CSP deferred: Next.js App Router + inline scripts need careful allowlists.
          // TODO: add Content-Security-Policy at Cloudflare/nginx edge once nonce/hash strategy is ready.
        ],
      },
      {
        source: "/Images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/Logo/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = {
  ...nextConfig,
  allowedDevOrigins: ["100.79.102.99","100.90.108.8"],
};
