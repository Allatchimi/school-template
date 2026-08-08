"use client";

import { QuarterResponse } from "@/lib/api/school/highschool/quarter/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelQuarter(props: { item?: QuarterResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.name ||
            tWords("invalidLabel", { label: tWords("quarter") })}
        </Text>
      </div>
    </div>
  );
}
