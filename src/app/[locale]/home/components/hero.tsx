"use client";

import CarouselImage from "@/components/carousel/carousel-image";
import { SchoolConfig } from "@/config/school";
import { Title, Text, antdTheme } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function Hero() {
  // Next hooks
  const tPage = useTranslations("Pages.homeSchool.hero");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const images = [
    {
      src: SchoolConfig.schoolData()?.info?.image1 ?? "",
    },
  ];
  if ((SchoolConfig.schoolData()?.info?.image2 ?? "").length > 0) {
    images.push({
      src: SchoolConfig.schoolData()?.info?.image2 ?? "",
    });
  }
  if ((SchoolConfig.schoolData()?.info?.image3 ?? "").length > 0) {
    images.push({
      src: SchoolConfig.schoolData()?.info?.image3 ?? "",
    });
  }
  if ((SchoolConfig.schoolData()?.info?.image4 ?? "").length > 0) {
    images.push({
      src: SchoolConfig.schoolData()?.info?.image4 ?? "",
    });
  }
  if ((SchoolConfig.schoolData()?.info?.image5 ?? "").length > 0) {
    images.push({
      src: SchoolConfig.schoolData()?.info?.image5 ?? "",
    });
  }

  return (
    <section
      style={{
        backgroundColor: `${theme.colorPrimary}1F`,
        borderRadius: theme.borderRadius,
      }}
      className="w-full mt-6 p-4 lg:p-6"
    >
      <div className="w-full flex flex-col items-center justify-center pt-6">
        <div className="w-full max-w-[700px] flex flex-col items-center justify-center text-center gap-2">
          <Title
            level={2}
            style={{ margin: "0px" }}
            className="w-full max-w-3xl text-ellipsis line-clamp-2"
          >
            {tPage("title", { appName: process.env.NEXT_PUBLIC_APP_NAME ?? "" })}
          </Title>
          <Text
            style={{ fontSize: theme.fontSizeLG }}
            className="w-auto max-w-3xl text-ellipsis line-clamp-3"
          >
            {tPage("description")}
          </Text>
        </div>
        <div className="w-full max-w-[900px] h-[300px] lg:h-[400px] xl:h-[500px]">
          <CarouselImage items={images} />
        </div>
      </div>
    </section>
  );
}
