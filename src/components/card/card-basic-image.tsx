"use client";

import { ReactNode } from "react";
import CardContainer from "./card-container";
import ImageFallback from "../image/image-fallback";
import { antdTheme, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

interface CardBasicProps {
  imageSrc?: string;
  title?: string;
  description?: string;
  extra?: ReactNode;
}

export default function CardBasicImage(props: CardBasicProps) {
  // Next hooks
  const tSentences = useTranslations("Sentences");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <CardContainer padding="16px">
      <div
        style={{
          width: "100%",
          height: "200px",
        }}
      >
        <ImageFallback size={200} src={props.imageSrc} />
      </div>
      <div className="flex flex-col gap-2">
        <Title level={5} ellipsis style={{ margin: "0px" }} className="text-lg">
          {props.title || tSentences("invalidTitle")}
        </Title>
        <Text style={{ fontSize: theme.fontSizeLG }}>
          {props.description || tSentences("invalidDescription")}
        </Text>
      </div>
      {props.extra ? <div>{props.extra}</div> : undefined}
    </CardContainer>
  );
}
