"use client";

import { QuizQuestionOptionResponse } from "@/lib/api/school/common/quiz/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelQuizOption(props: {
  item?: QuizQuestionOptionResponse;
}) {
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
          {props.item?.description}
        </Text>
      </div>
    </div>
  );
}
