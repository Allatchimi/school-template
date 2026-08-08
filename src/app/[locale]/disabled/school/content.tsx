"use client";

import { CustomContainerFullHeight } from "@/components/container/custom-container";
import LogoHeader from "@/components/header/logo-header";
import { antdTheme, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function PageContent() {
  // Next hooks
  const tPage = useTranslations("Pages.disabled.school");

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
          <Text className="text-center">
            {tPage("description")}
          </Text>
        </div>
      </div>
    </CustomContainerFullHeight>
  );
}
