"use client";

import { LevelResponse } from "@/lib/api/school/university/level/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelLevel(props: { item?: LevelResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.name ||
            tWords("invalidLabel", { label: tWords("level") })}
        </Text>
      </div>
    </div>
  );
}
