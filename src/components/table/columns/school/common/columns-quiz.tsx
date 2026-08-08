"use client";

import { QuizResponse } from "@/lib/api/school/common/quiz/response";
import { TableColumnsType } from "antd";
import { TableColumnClassSubjectUnit } from "../../../column/school/column-class-subject-unit";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnYear } from "../../../column/school/column-year";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnStatus,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import {
  QUIZ_STATUS_CLOSED,
  QUIZ_STATUS_PUBLISHED,
  QUIZ_STATUS_RESULT,
} from "@/lib/constants/school/common/quiz";
import { TableColumnClassLevelDomain } from "@/components/table/column/school/column-class-level-domain";
import { useTranslations } from "next-intl";

export function TableColumsQuiz(
  props: TableColumnsProps
): TableColumnsType<QuizResponse> {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.quiz.status");

  return [
    ...TableColumnID<QuizResponse>({ ...props }),
    ...TableColumnSchool<QuizResponse>(props.schoolType),
    ...TableColumnYear<QuizResponse>(props.yearID),
    ...TableColumnClassSubjectUnit<QuizResponse>({
      schoolType: props.schoolType,
    }),
    ...TableColumnClassLevelDomain<QuizResponse>({
      schoolType: props.schoolType,
      isClassSubjectUnit: true,
    }),
    ...TableColumnStringNumber<QuizResponse>({
      ...props,
      title: tWords("title"),
      dataIndex: "title",
      key: "title",
      sorter: true,
    }),
    ...TableColumnStatus<QuizResponse>({
      ...props,
      sorter: true,
      render(record) {
        return tEnums(record?.status ?? "");
      },
      renderColor(record) {
        return record?.status === QUIZ_STATUS_RESULT
          ? "success"
          : record?.status === QUIZ_STATUS_PUBLISHED
            ? "processing"
            : record?.status === QUIZ_STATUS_CLOSED
              ? "error"
              : "default";
      },
    }),
    ...TableColumnUpdatedAt<QuizResponse>({ ...props }),
  ];
}
