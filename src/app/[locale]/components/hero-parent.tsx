"use client";

import { ReactNode } from "react";
import CardContainer from "@/components/card/card-container";
import ImageFallback from "@/components/image/image-fallback";
import {
  MotionRevealFromTop,
  MotionRevealFromBottom,
} from "@/components/motion/reveal";
import { antdTheme, Button, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HeroParent() {
  // Next hooks
  const tPage = useTranslations("Pages.home.heroParent");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <section className="">
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <MotionRevealFromTop>
            <div className="w-full flex flex-col items-center justify-center text-center gap-6">
              <Text
                style={{
                  color: theme.colorPrimary,
                }}
                underline
                className="font-bold text-center underline underline-offset-8"
              >
                {tPage("title")}
              </Text>
            </div>
          </MotionRevealFromTop>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MotionRevealFromTop>
              <HeroParentCard
                title={tPage("card1.title")}
                subtitle={tPage("card1.subtitle")}
                imageSrc={tPage("card1.image")}
                descriptions={[
                  tPage("card1.description1"),
                  tPage("card1.description2"),
                  tPage("card1.description3"),
                  tPage("card1.description4"),
                ]}
                extra={
                  <Link href={tPage("card1.buttonHref")}>
                    <Button size="large" className="w-auto">
                      {tPage("card1.button")}
                    </Button>
                  </Link>
                }
              />
            </MotionRevealFromTop>
            <MotionRevealFromBottom>
              <HeroParentCard
                title={tPage("card2.title")}
                subtitle={tPage("card2.subtitle")}
                imageSrc={tPage("card2.image")}
                descriptions={[
                  tPage("card2.description1"),
                  tPage("card2.description2"),
                  tPage("card2.description3"),
                  tPage("card2.description4"),
                ]}
                extra={
                  <Link href={tPage("card2.buttonHref")}>
                    <Button size="large" className="w-auto">
                      {tPage("card2.button")}
                    </Button>
                  </Link>
                }
              />
            </MotionRevealFromBottom>
          </div>
        </div>
      </div>
    </section>
  );
}

interface HeroParentCardProps {
  title?: string;
  subtitle?: string;
  descriptions?: string[];
  imageSrc?: string;
  extra?: ReactNode;
}

function HeroParentCard(props: HeroParentCardProps) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <CardContainer>
      <div className="w-full flex flex-col lg:flex-row gap-3">
        <div className="w-full flex flex-col justify-between gap-3">
          <div className="w-full flex flex-col gap-2">
            <Text
              style={{
                color: theme.colorPrimary,
              }}
            >
              {props.title}
            </Text>
            <Title level={5}>{props.subtitle}</Title>
            <ul className="list-disc ml-4">
              {props.descriptions?.map((item, index) => {
                return (
                  <li key={index}>
                    <Text style={{ fontSize: theme.fontSizeLG }}>{item}</Text>
                  </li>
                );
              })}
            </ul>
          </div>
          {props.extra ? <div>{props.extra}</div> : undefined}
        </div>
        <div
          style={{
            backgroundColor: theme.colorFillTertiary,
            borderRadius: theme.borderRadius,
          }}
          className="w-full h-[300px] lg:h-[350px] 2xl:h-[400px] flex items-center justify-center p-4"
        >
          <ImageFallback objectFit="cover" size={500} src={props.imageSrc} />
        </div>
      </div>
    </CardContainer>
  );
}
