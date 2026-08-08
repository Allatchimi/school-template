"use client";

import { CustomContainerMd } from "@/components/container/custom-container";
import LogoHeader from "@/components/header/logo-header";
import { antdTheme, Button, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PageContent() {
  // Next hooks
  const tPages = useTranslations("Pages.preEnroll.success");
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center">
      <CustomContainerMd>
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
            <Title level={2}>{tPages("title")}</Title>
            <Text className="text-center">{tPages("description")}</Text>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-2">
            <Link href="/">
              <Button type="primary" className="w-full">
                {tWords("back")}
              </Button>
            </Link>
          </div>
        </div>
      </CustomContainerMd>
    </div>
  );
}
