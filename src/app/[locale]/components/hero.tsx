"use client";

import ImageFallback from "@/components/image/image-fallback";
import { getDashboardPath } from "@/lib/links/dashboard";
import { useSession } from "next-auth/react";
import { antdTheme, Button, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Hero() {
  // Next hooks
  const session = useSession();
  const tPage = useTranslations("Pages.home.hero");
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const handleDashboardPath = () => {
    const feature = session?.data?.user.feature;
    if (session.status == "authenticated") {
      return getDashboardPath(feature ?? "");
    }
    return "/auth/login";
  };

  return (
    <section
      style={{
        backgroundColor: `${theme.colorPrimary}1F`,
        borderRadius: theme.borderRadius,
      }}
      className="w-full mt-6 p-4 lg:p-6"
    >
      <div className="w-full flex flex-col items-center justify-center gap-8 pt-6">
        <div className="w-full max-w-[700px] flex flex-col items-center justify-center text-center gap-2">
          <Title
            level={1}
            style={{ margin: "0px" }}
            className="w-full hidden lg:block"
          >
            {tPage("title")}
          </Title>
          <Title
            level={2}
            style={{ margin: "0px" }}
            className="w-full lg:hidden"
          >
            {tPage("title")}
          </Title>
          <Text style={{ fontSize: theme.fontSizeLG }} className="w-auto">
            {tPage("description")}
          </Text>
        </div>
        <div className="w-auto flex items-center justify-center gap-4">
          <Link href={handleDashboardPath()}>
            <Button
              size="large"
              type="primary"
              loading={session.status === "loading"}
              className="transition-all duration-200 ease-in-out"
            >
              {session.status === "loading"
                ? tWords("loading")
                : session.status === "authenticated"
                  ? tWords("dashboard")
                  : tWords("login")}
            </Button>
          </Link>
          <Link href="/help/home">
            <Button size="large">{tWords("getStarted")}</Button>
          </Link>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <div className="w-full h-[300px] lg:h-[400px] xl:h-[600px] 2xl:h-[800px]">
            <ImageFallback
              objectFit="cover"
              borderRadius={theme.borderRadius}
              backgroundColor="transparent"
              size={1080}
              src={tPage("image")}
              priority={true}
              style={{
                objectPosition: "0% 0%",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
