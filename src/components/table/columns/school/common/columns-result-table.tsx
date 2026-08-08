"use client";

import { ResultTableResponse } from "@/lib/api/school/common/result/response";
import { TableColumnsType } from "antd";
import { TableColumnClassSubjectUnit } from "../../../column/school/column-class-subject-unit";
import { TableIndexExam } from "../../../indexes/school/common/index-exam";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnYear } from "../../../column/school/column-year";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnObject,
  TableColumnStatus,
} from "@/components/table/column/column-types";
import { RESULT_STATUS_PUBLISHED } from "@/lib/constants/school/common/result";
import { TableColumnClassLevelDomain } from "@/components/table/column/school/column-class-level-domain";
import { useTranslations } from "next-intl";

export function TableColumsResultTable(
  props: TableColumnsProps
): TableColumnsType<ResultTableResponse> {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.result.status");

  return [
    ...TableColumnID<ResultTableResponse>({ ...props }),
    ...TableColumnSchool<ResultTableResponse>(props.schoolType),
    ...TableColumnYear<ResultTableResponse>(props.yearID, false, true),
    ...TableColumnClassSubjectUnit<ResultTableResponse>({
      schoolType: props.schoolType,
      showSemester: true,
      showSequence: true,
      isExam: true,
    }),
    ...TableColumnClassLevelDomain<ResultTableResponse>({
      schoolType: props.schoolType,
      isClassSubjectUnit: true,
      isExam: true,
    }),
    ...TableColumnObject<ResultTableResponse>({
      ...props,
      title: tWords("exam"),
      render(record) {
        return <TableIndexExam record={record?.exam ?? undefined} />;
      },
    }),
    ...TableColumnStatus<ResultTableResponse>({
      ...props,
      sorter: true,
      render(record) {
        return record?.status ? tEnums(record?.status) : "";
      },
      renderColor(record) {
        return record?.status === RESULT_STATUS_PUBLISHED
          ? "success"
          : "default";
      },
    }),
    ...TableColumnUpdatedAt<ResultTableResponse>({ ...props }),
  ];
}
