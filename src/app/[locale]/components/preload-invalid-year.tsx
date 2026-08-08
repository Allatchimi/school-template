"use client";

import LogoHeader from "@/components/header/logo-header";
import { SchoolConfig } from "@/config/school";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { antdTheme, Button, Text, Title } from "@/ui/antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PreloadInvalidYear() {
  // Next hooks
  const tPage = useTranslations("Pages.preloadInvalidYear");
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div className="w-full flex items-center justify-center mt-12">
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
            {tPage("title")}
          </Title>
          <Text className="text-center">{tPage("subtitle")}</Text>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-2">
          <Link
            href={
              SchoolConfig.schoolType() === SCHOOL_TYPE_HIGHSCHOOL
                ? "/common/preenroll/classes"
                : SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY
                  ? "/common/preenroll/level-domains"
                  : "/404"
            }
          >
            <Button className="w-full">{tWords("preEnroll")}</Button>
          </Link>
          <Link
            href={
              SchoolConfig.schoolID()
                ? "/common/help#contact"
                : "/help/home#contact"
            }
          >
            <Button type="primary" className="w-full">
              {tWords("contact")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
