"use client";

import { ExamTypeResponse } from "@/lib/api/school/common/exam/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelExamType(props: {
  item?: ExamTypeResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.name ||
            tWords("invalidLabel", { label: tWords("name") })}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.school?.name ||
            tWords("invalidLabel", { label: tWords("school") })}
        </Text>
      </div>
    </div>
  );
}
