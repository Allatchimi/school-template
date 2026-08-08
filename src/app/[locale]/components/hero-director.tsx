"use client";

import CardBasic from "@/components/card/card-basic";
import ImageFallback from "@/components/image/image-fallback";
import {
  MotionRevealFromBottom,
  MotionRevealFromTop,
} from "@/components/motion/reveal";
import { antdTheme, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function HeroDirector() {
  // Next hooks
  const tPage = useTranslations("Pages.home.heroDirector");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <section>
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
            <CardBasic
              title={tPage("card1.title")}
              description={tPage("card1.description")}
            />
          </MotionRevealFromTop>

          <MotionRevealFromTop delay={0.25}>
            <CardBasic
              title={tPage("card2.title")}
              description={tPage("card2.description")}
            />
          </MotionRevealFromTop>
        </div>
        <MotionRevealFromBottom>
          <div className="w-full flex items-center justify-center">
            <div className="w-full max-w-[1280px] h-[300px] lg:h-[400px] xl:h-[600px] 2xl:h-[800px]">
              <ImageFallback
                objectFit="contain"
                size={1280}
                src={"/assets/images/pages/home/director.png"}
                style={{
                  objectPosition: "50% 50%",
                }}
              />
            </div>
          </div>
        </MotionRevealFromBottom>
      </div>
    </section>
  );
}
