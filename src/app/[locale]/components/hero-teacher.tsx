"use client";

import {
  MotionRevealFromTop,
  MotionRevealFromBottom,
} from "@/components/motion/reveal";
import CardBasicImage from "@/components/card/card-basic-image";
import { antdTheme, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function HeroTeacher() {
  // Next hooks
  const tPage = useTranslations("Pages.home.heroTeacher");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const items = [
    {
      image: tPage("card1.image"),
      title: tPage("card1.title"),
      description: tPage("card1.description"),
    },
    {
      image: tPage("card2.image"),
      title: tPage("card2.title"),
      description: tPage("card2.description"),
    },
    {
      image: tPage("card3.image"),
      title: tPage("card3.title"),
      description: tPage("card3.description"),
    },
    {
      image: tPage("card4.image"),
      title: tPage("card4.title"),
      description: tPage("card4.description"),
    },
  ];

  return (
    <section>
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <MotionRevealFromTop>
          <div className="w-full max-w-[600px] flex flex-col gap-6">
            <Text
              style={{
                color: theme.colorPrimary,
              }}
              className="font-bold underline underline-offset-8"
            >
              {tPage("title")}
            </Text>
            <Text style={{ fontSize: theme.fontSizeLG }}>
              {tPage("description")}
            </Text>
          </div>
        </MotionRevealFromTop>
        <MotionRevealFromBottom>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {items.map((item, index) => (
              <CardBasicImage
                key={index}
                imageSrc={item.image}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </MotionRevealFromBottom>
      </div>
    </section>
  );
}
