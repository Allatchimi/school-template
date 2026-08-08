"use client";

import { ResultResponse } from "@/lib/api/school/common/result/response";
import { TableColumnsType } from "antd";
import { TableColumnClassSubjectUnit } from "../../../column/school/column-class-subject-unit";
import TableIndexStudent from "../../../indexes/school/common/index-student";
import { TableIndexExam } from "../../../indexes/school/common/index-exam";
import {
  TableIndexResultPercentage,
  TableIndexResultScore,
} from "@/components/table/indexes/school/common/index-result";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnYear } from "../../../column/school/column-year";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnObject } from "@/components/table/column/column-types";
import { TableColumnClassLevelDomain } from "@/components/table/column/school/column-class-level-domain";
import { useTranslations } from "next-intl";

export function TableColumsResult(
  props: TableColumnsProps
): TableColumnsType<ResultResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<ResultResponse>({ ...props }),
    ...TableColumnObject<ResultResponse>({
      ...props,
      title: tWords("student"),
      render(record) {
        return <TableIndexStudent record={record?.student ?? undefined} />;
      },
    }),
    ...TableColumnSchool<ResultResponse>(props.schoolType),
    ...TableColumnYear<ResultResponse>(props.yearID, false, true),
    ...TableColumnClassSubjectUnit<ResultResponse>({
      schoolType: props.schoolType,
      showSemester: true,
      showSequence: true,
      isExam: true,
    }),
    ...TableColumnClassLevelDomain<ResultResponse>({
      schoolType: props.schoolType,
      isClassSubjectUnit: true,
      isExam: true,
    }),
    ...TableColumnObject<ResultResponse>({
      ...props,
      title: tWords("exam"),
      render(record) {
        return <TableIndexExam record={record?.exam ?? undefined} />;
      },
    }),
    ...TableColumnObject<ResultResponse>({
      ...props,
      title: tWords("score"),
      key: "score",
      sorter: true,
      render(record) {
        return <TableIndexResultScore record={record ?? undefined} />;
      },
    }),
    ...TableColumnObject<ResultResponse>({
      ...props,
      title: tWords("percentage"),
      render(record) {
        return <TableIndexResultPercentage record={record ?? undefined} />;
      },
    }),
    ...TableColumnUpdatedAt<ResultResponse>({ ...props }),
  ];
}
