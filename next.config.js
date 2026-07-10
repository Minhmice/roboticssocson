/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  skipTrailingSlashRedirect: true,
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
      // Former sponsorship surfaces archived in src/legacy.
      { source: "/sponsor", destination: "/", permanent: true },
      { source: "/sponsorship", destination: "/", permanent: true },
      { source: "/sponsor/:path*", destination: "/", permanent: true },
      { source: "/sponsorship/:path*", destination: "/", permanent: true },
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
    ];
  },
};

module.exports = {
  ...nextConfig,
  allowedDevOrigins: ["100.79.102.99","100.90.108.8"],
};
