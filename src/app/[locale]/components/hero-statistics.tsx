"use client";

import { CustomContainer } from "@/components/container/custom-container";
import { antdTheme, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function HeroStatistics() {
  // Next hooks
  const tPage = useTranslations("Pages.home.heroStatistics");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <section
      style={{
        backgroundColor: theme.colorPrimary,
        color: "#fff",
      }}
      className="w-full py-12"
    >
      <CustomContainer>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 items-center justify-center gap-6">
          <TableIndexText label={tPage("schools")} count={10} />
          <TableIndexText label={tPage("teachers")} count={145} />
          <TableIndexText label={tPage("students")} count={8000} />
          <TableIndexText label={tPage("parents")} count={200} />
        </div>
      </CustomContainer>
    </section>
  );
}

function TableIndexText(props: { count?: number; label?: string }) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div className="w-full flex lg:flex-col items-center justify-center gap-4 lg:gap-2">
      <Title
        level={1}
        ellipsis
        style={{
          margin: "0px",
          color: theme.colorWhite,
        }}
        className="w-1/2 text-right lg:text-center"
      >
        +{props.count}
      </Title>
      <Text
        ellipsis
        style={{
          color: theme.colorWhite,
          fontSize: theme.fontSizeLG,
        }}
        className="w-1/2 text-left lg:text-center"
      >
        {props.label}
      </Text>
    </div>
  );
}
