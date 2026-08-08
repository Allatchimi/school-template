"use client";

import { formatDateTime } from "@/helpers/date/format";
import { QuizResponse } from "@/lib/api/school/common/quiz/response";
import { DescriptionsProps } from "antd";
import { DescriptionQuizQuestions } from "./description-quiz-question";
import { useTranslations } from "next-intl";

export function DescriptionQuiz(
  item?: QuizResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.quiz");

  return [
    {
      key: "id",
      label: tWords("id"),
      children: item?.id,
    },
    {
      key: "title",
      label: tWords("title"),
      children: item?.title,
    },
    {
      key: "description",
      label: tWords("description"),
      children: item?.description,
    },
    {
      key: "status",
      label: tWords("status"),
      children: item?.status ? tEnums(`status.${item?.status}`) : "",
    },
    {
      key: "questions",
      label: "Questions",
      children: DescriptionQuizQuestions({
        items: item?.questions ?? undefined,
      }),
    },
    {
      key: "createdAt",
      label: tWords("createdAt"),
      children: formatDateTime(item?.createdAt?.toString()),
    },
    {
      key: "updatedAt",
      label: tWords("updatedAt"),
      children: formatDateTime(item?.updatedAt?.toString()),
    },
  ];
}
