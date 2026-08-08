"use client";

import { SchoolResponse } from "@/lib/api/school/common/school/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelSchool(props: { item?: SchoolResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.type");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.name ||
            tWords("invalidLabel", { label: tWords("school") })}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.type
            ? tEnums(props.item.type)
            : tWords("invalidLabel", { label: tWords("type") })}
        </Text>
      </div>
    </div>
  );
}
