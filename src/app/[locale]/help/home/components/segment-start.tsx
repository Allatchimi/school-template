"use client";

import { ReactNode } from "react";
import ManageAccountsIcon from "@/components/icon/material/manage-accounts";
import { antdTheme, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SegmentStart() {
  // Next hooks
  const tPage = useTranslations("Pages.help.segmentStart");
  const tWords = useTranslations("Words");

  return (
    <div className="w-full mt-6">
      <div className="w-full min-h-[600px] flex flex-col items-center gap-8">
        <Title level={3} className="text-center">
          {tWords("features")}
        </Title>
        <div className="w-full grid grid-cols-1 items-center justify-center gap-4">
          <Card
            title={tWords("director")}
            descriptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(
              (item) => {
                return {
                  title: tPage(`director.row${item}.title`),
                  description: tPage(`director.row${item}.description`),
                };
              }
            )}
            icon={<ManageAccountsIcon />}
          />
        </div>
      </div>
    </div>
  );
}

function Card(props: {
  title: string;
  descriptions: { title?: string; description: string }[];
  icon: ReactNode;
  action?: ReactNode;
}) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div
      style={{
        backgroundColor: theme.colorFillQuaternary,
        borderRadius: theme.borderRadius,
        borderWidth: "0.5px",
        borderColor: theme.colorBorder,
      }}
      className="w-full h-full flex flex-col gap-4 p-4 hover:shadow-lg transition-all"
    >
      <div className="w-full h-full flex flex-col justify-between gap-6">
        <div className="w-full flex flex-col gap-4">
          {props.descriptions.map((description, index) => (
            <div key={index} className="w-full flex flex-col gap-2">
              <Text style={{ fontSize: theme.fontSizeLG }}>
                {description.title}
              </Text>
              <Text type="secondary">{description.description}</Text>
            </div>
          ))}
        </div>
        <div>{props.action}</div>
      </div>
    </div>
  );
}
