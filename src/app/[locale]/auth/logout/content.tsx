"use client";

import { CustomContainerFullHeight } from "@/components/container/custom-container";
import LogoHeader from "@/components/header/logo-header";
import { antdTheme, Button, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PageContent() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Next hooks
  const tPages = useTranslations("Pages.auth.logout");
  const tWords = useTranslations("Words");

  return (
    <CustomContainerFullHeight>
      <div
        style={{
          backgroundColor: theme.colorBgContainer,
          borderRadius: theme.borderRadius,
          borderWidth: "0.5px",
          borderColor: theme.colorBorder,
        }}
        className="w-full max-w-[450px] flex flex-col gap-6 items-center justify-center p-8"
      >
        <LogoHeader />
        <div className="w-full flex flex-col items-center justify-center">
          <Title level={2} className="text-center">
            {tPages("title")}
          </Title>
          <Text className="text-center">
            {tPages("description", {
              label: process.env.NEXT_PUBLIC_APP_NAME || "",
            })}
          </Text>
        </div>

        <Link href="/auth/login">
          <Button type="primary" className="w-full">
            {tWords("login")}
          </Button>
        </Link>
      </div>
      <div className="w-full flex item-center justify-center mt-4">
        <Link href="/">
          <Button color="primary" variant="filled">
            {tWords("backToHome")}
          </Button>
        </Link>
      </div>
    </CustomContainerFullHeight>
  );
}
