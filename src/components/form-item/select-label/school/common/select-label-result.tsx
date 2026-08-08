"use client";

import { ResultResponse } from "@/lib/api/school/common/result/response";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelResult(props: { item?: ResultResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.exam?.type?.name ||
            tWords("invalidLabel", { label: tWords("type") })}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.exam?.school?.type === SCHOOL_TYPE_UNIVERSITY
            ? props.item.exam?.unit?.name ||
              tWords("invalidLabel", { label: tWords("unit") })
            : props.item?.exam?.classSubject?.subject?.name ||
              tWords("invalidLabel", { label: tWords("subject") })}
        </Text>
      </div>
    </div>
  );
}
