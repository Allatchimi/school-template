"use client";

import { ExamTypeResponse } from "@/lib/api/school/common/exam/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnStringNumber } from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsExamType(
  props: TableColumnsProps
): TableColumnsType<ExamTypeResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<ExamTypeResponse>({ ...props }),
    ...TableColumnSchool<ExamTypeResponse>(props.schoolType),
    ...TableColumnStringNumber<ExamTypeResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnStringNumber<ExamTypeResponse>({
      ...props,
      title: tWords("description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<ExamTypeResponse>({ ...props }),
  ];
}
