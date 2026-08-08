"use client";

import { ReactNode } from "react";
import CardContainer from "./card-container";
import { antdTheme, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

interface CardBasicProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  extra?: ReactNode;
}

export default function CardBasic(props: CardBasicProps) {
  // Next hooks
  const tSentences = useTranslations("Sentences");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <CardContainer>
      <div className="flex items-center gap-3">
        {props.icon ? (
          <div
            style={{
              backgroundColor: theme.colorPrimary,
            }}
            className="w-8 h-8 p-[6px] inline-flex items-center justify-center rounded-full flex-shrink-0"
          >
            {props.icon}
          </div>
        ) : undefined}
        <Title level={5} ellipsis style={{ margin: "0px" }}>
          {props.title || tSentences("invalidTitle")}
        </Title>
      </div>
      <div className="flex flex-col flex-grow">
        <Text style={{ fontSize: theme.fontSizeLG }}>
          {props.description || tSentences("invalidDescription")}
        </Text>
      </div>
      {props.extra ? <div>{props.extra}</div> : undefined}
    </CardContainer>
  );
}
