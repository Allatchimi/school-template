import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${process.env.NEXT_PUBLIC_WEBSITE_TITLE ?? ""}`,
    short_name: `${process.env.NEXT_PUBLIC_APP_NAME ?? ""}`,
    description: `${process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION ?? ""}`,
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      { src: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      {
        src: "/assets/images/logos/logo.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/assets/images/logos/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/images/logos/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
