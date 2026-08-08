"use client";

import { ReactNode, useState } from "react";
import HelpIcon from "@/components/icon/material/help";
import VideoSettingsIcon from "@/components/icon/material/video-settings";
import SegmentStart from "./segment-start";
import SegmentFAQ from "./segment-faq";
import { Segmented, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function HeroOptions() {
  // React hooks
  const [segmentValue, setSegmentValue] = useState<string | number>();

  // Next hooks
  const tWords = useTranslations("Words");

  const segmentedItems = [
    {
      label: (
        <SegmentedLabel
          item={{
            icon: <VideoSettingsIcon />,
            label: tWords("getStarted"),
          }}
        />
      ),
      value: "start",
    },
    {
      label: (
        <SegmentedLabel
          item={{
            icon: <HelpIcon />,
            label: tWords("faq"),
          }}
        />
      ),
      value: "faq",
    },
  ];
  return (
    <section className="w-full">
      <div className="w-full flex flex-col items-center justify-center gap-12">
        <Segmented
          options={segmentedItems}
          block
          onChange={setSegmentValue}
          className="w-full"
        />
        {segmentValue === "faq" ? <SegmentFAQ /> : <SegmentStart />}
      </div>
    </section>
  );
}

function SegmentedLabel(props: {
  item?: {
    icon?: ReactNode;
    label?: string;
  };
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      {props.item?.icon}
      <Text ellipsis>{props.item?.label}</Text>
    </div>
  );
}
