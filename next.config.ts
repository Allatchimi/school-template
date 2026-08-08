import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [25, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.digitcore.cm",
        port: "",
        pathname: "/api/v1/images/*",
        search: "",
      },
      {
        protocol: "https",
        hostname: "staging.cdn.digitcore.cm",
        port: "",
        pathname: "/api/v1/images/*",
        search: "",
      },
      {
        protocol: "https",
        hostname: "dev.cdn.digitcore.cm",
        port: "",
        pathname: "/api/v1/images/*",
        search: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
      {
        source: "/cdn-api/:path*",
        destination: `${process.env.CDN_URL}/:path*`,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: ["./messages/en.json", "./messages/fr.json"],
  },
});
export default withNextIntl(nextConfig);
