"use client";

import { SectionResponse } from "@/lib/api/school/highschool/section/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelSection(props: { item?: SectionResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.name ||
            tWords("invalidLabel", { label: tWords("section") })}
        </Text>
      </div>
    </div>
  );
}
