"use client";

import { QuizResponse } from "@/lib/api/school/common/quiz/response";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelQuiz(props: { item?: QuizResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.title ||
            tWords("invalidLabel", { label: tWords("title") })}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.school?.type === SCHOOL_TYPE_UNIVERSITY
            ? props.item.unit?.name ||
              tWords("invalidLabel", { label: tWords("unit") })
            : props.item?.classSubject?.subject?.name ||
              tWords("invalidLabel", { label: tWords("subject") })}
        </Text>
      </div>
    </div>
  );
}
