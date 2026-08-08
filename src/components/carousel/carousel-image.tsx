"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { antdTheme } from "@/ui/antd";
import ImageFallback from "../image/image-fallback";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "../../styles/swiper.css";

interface CarouselItemType {
  src?: string;
  alt?: string;
  size?: number;
}

export interface CarouselImageProps {
  items: CarouselItemType[];
}

export default function CarouselImage(props: CarouselImageProps) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      style={{
        "--swiper-pagination-color": theme.colorPrimary,
        "--swiper-navigation-color": theme.colorPrimary,
        ...(theme as any),
        margin: "0px",
        padding: "16px 0px 0px 0px",
      }}
      className="w-full h-full"
    >
      {props.items?.map((item, index) => (
        <SwiperSlide key={index} className="w-full h-full pb-2">
          <ImageFallback
            objectFit="cover"
            backgroundColor={theme.colorWhite}
            borderRadius={theme.borderRadius}
            src={item?.src || ""}
            size={item?.size || 500}
            style={{
              borderWidth: "0.5px",
              borderColor: theme.colorBorder,
            }}
            className="shadow-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
