"use client";

import { CustomContainerFullHeight } from "@/components/container/custom-container";
import LogoHeader from "@/components/header/logo-header";
import { SchoolConfig } from "@/config/school";
import { antdTheme, Button, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PageContent() {
  // Next hooks
  const tPage = useTranslations("Pages.disabled.user");
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

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
        <div className="w-full flex flex-col items-center justify-center text-center">
          <Title level={2} className="text-center">
            {tPage("title")}
          </Title>
          <Text className="text-center">{tPage("description")}</Text>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-2">
          <Link
            href={
              SchoolConfig.schoolID() ? "/common/help#contact" : "/help#contact"
            }
          >
            <Button type="primary" htmlType="submit" className="w-full">
              {tWords("contact")}
            </Button>
          </Link>

          <Link href="/">
            <Button className="w-full">{tWords("backToHome")}</Button>
          </Link>
        </div>
      </div>
    </CustomContainerFullHeight>
  );
}
