"use client";

import { SemesterResponse } from "@/lib/api/school/university/semester/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelSemester(props: {
  item?: SemesterResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.name ||
            tWords("invalidLabel", { label: tWords("semester") })}
        </Text>
      </div>
    </div>
  );
}
