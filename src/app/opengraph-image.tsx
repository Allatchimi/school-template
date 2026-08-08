import { COLOR_SCHEME } from "@/lib/constants/others/color";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };

export default function OpenGraphImage() {
  const title = process.env.NEXT_PUBLIC_APP_NAME || "";

  const baseFontSize = 64;
  const maxChars = 20;
  const fontSize =
    title.length <= maxChars
      ? baseFontSize
      : Math.max(24, baseFontSize * (maxChars / title.length)); // minimum 24px

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLOR_SCHEME.primary,
          padding: 40,
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/assets/images/logos/logo-white.png`}
          width={300}
          height={300}
          alt="Logo"
        />
        <h1
          style={{
            color: "white",
            fontSize,
            fontWeight: "bold",
            marginTop: 24,
            lineHeight: 1.2,
            wordWrap: "break-word",
            maxWidth: "90%",
          }}
        >
          {title}
        </h1>
      </div>
    ),
    { ...size }
  );
}
