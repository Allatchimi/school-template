"use client";

import CardBasic from "@/components/card/card-basic";
import ImageFallback from "@/components/image/image-fallback";
import {
  MotionRevealFromTop,
  MotionRevealFromBottom,
} from "@/components/motion/reveal";
import { antdTheme, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function HeroStudent() {
  // Next hooks
  const tPage = useTranslations("Pages.home.heroStudent");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <section>
      <div className="w-full flex flex-col items-center justify-center gap-8">
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

        <div className="grid gap-8 md:grid-cols-2 items-center lg:gap-6">
          <MotionRevealFromBottom>
            <div
              style={{
                width: "100%",
                height: "200px",
              }}
            >
              <ImageFallback
                objectFit="scale-down"
                size={500}
                src={undefined}
              />
            </div>
          </MotionRevealFromBottom>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MotionRevealFromBottom>
              <CardBasic
                title={tPage("card1.title")}
                description={tPage("card1.description")}
              />
            </MotionRevealFromBottom>

            <MotionRevealFromBottom delay={0.25}>
              <CardBasic
                title={tPage("card2.title")}
                description={tPage("card2.description")}
              />
            </MotionRevealFromBottom>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MotionRevealFromTop>
              <CardBasic
                title={tPage("card3.title")}
                description={tPage("card3.description")}
              />
            </MotionRevealFromTop>

            <MotionRevealFromTop delay={0.25}>
              <CardBasic
                title={tPage("card4.title")}
                description={tPage("card4.description")}
              />
            </MotionRevealFromTop>
          </div>
          <MotionRevealFromBottom>
            <div
              style={{
                width: "100%",
                height: "200px",
              }}
            >
              <ImageFallback
                objectFit="scale-down"
                size={500}
                src={undefined}
              />
            </div>
          </MotionRevealFromBottom>
        </div>
      </div>
    </section>
  );
}
