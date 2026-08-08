"use client";

import { ExamResponse } from "@/lib/api/school/common/exam/response";
import { TableColumnsType } from "antd";
import { TableColumnClassSubjectUnit } from "../../../column/school/column-class-subject-unit";
import { TableIndexExamType } from "../../../indexes/school/common/index-exam";
import { TableColumnYear } from "../../../column/school/column-year";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { EXAM_STATUS_ONLINE } from "@/lib/constants/school/common/exam";
import {
  TableColumnObject,
  TableColumnStatus,
} from "@/components/table/column/column-types";
import { TableColumnClassLevelDomain } from "@/components/table/column/school/column-class-level-domain";
import { useTranslations } from "next-intl";

export function TableColumsExam(
  props: TableColumnsProps
): TableColumnsType<ExamResponse> {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.exam.status");

  return [
    ...TableColumnID<ExamResponse>({ ...props }),
    ...TableColumnSchool<ExamResponse>(props.schoolType),
    ...TableColumnYear<ExamResponse>(props.yearID),
    ...TableColumnClassSubjectUnit<ExamResponse>({
      schoolType: props.schoolType,
      showSemester: true,
      showSequence: true,
    }),
    ...TableColumnClassLevelDomain<ExamResponse>({
      schoolType: props.schoolType,
      isClassSubjectUnit: true,
    }),
    ...TableColumnObject<ExamResponse>({
      ...props,
      title: tWords("type"),
      render(record) {
        return <TableIndexExamType record={record?.type ?? undefined} />;
      },
    }),
    ...TableColumnStatus<ExamResponse>({
      ...props,
      sorter: true,
      render(record) {
        return tEnums(record?.status ?? "");
      },
      renderColor(record) {
        return record?.status === EXAM_STATUS_ONLINE ? "success" : "default";
      },
    }),
    ...TableColumnUpdatedAt<ExamResponse>({ ...props }),
  ];
}
