"use client";

import { antdTheme, Text, Title } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function PageContent() {
  // Next hooks
  const tPage = useTranslations("Pages.about");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const data = [
    {
      groupName: tPage("row1.groupName"),
      lines: [
        tPage("row1.line1"),
        tPage("row1.line2"),
        tPage("row1.line3"),
        tPage("row1.line4"),
        tPage("row1.line5"),
      ],
    },
    {
      groupName: tPage("row2.groupName"),
      lines: [
        tPage("row2.line1"),
        tPage("row2.line2"),
        tPage("row2.line3"),
        tPage("row2.line4"),
      ],
    },
    {
      groupName: tPage("row3.groupName"),
      lines: [
        tPage("row3.line1"),
        tPage("row3.line2"),
        tPage("row3.line3"),
        tPage("row3.line4"),
        tPage("row3.line5"),
        tPage("row3.line6"),
        tPage("row3.line7"),
      ],
    },
  ];

  return (
    <>
      <div className="w-full flex flex-col items-center gap-12 p-4 lg:p-6">
        <Title level={2} className="w-auto text-center">
          {tPage("title")}{" "}
          <span
            style={{
              color: theme.colorPrimary,
            }}
          >
            {process.env.NEXT_PUBLIC_APP_NAME}
          </span>{" "}
        </Title>
        <div className="w-full">
          <article className="w-full">
            {data.map((item, index) => {
              return (
                <div key={index} className="w-full flex flex-col gap-4 mt-4">
                  <Title level={4} className="w-auto text-justify">
                    {item.groupName}
                  </Title>
                  <div className="w-full flex flex-col gap-1">
                    {item.lines.map((lItem, lIndex) => {
                      return (
                        <Text
                          key={lIndex}
                          style={{ fontSize: theme.fontSizeLG }}
                          className="w-auto mx-4"
                        >
                          {lItem}
                        </Text>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </article>
        </div>
      </div>
    </>
  );
}
