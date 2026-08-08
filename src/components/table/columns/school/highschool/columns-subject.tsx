"use client";

import { SubjectResponse } from "@/lib/api/school/highschool/subject/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnStringNumber } from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsSubject(
  props: TableColumnsProps
): TableColumnsType<SubjectResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<SubjectResponse>({ ...props }),
    ...TableColumnSchool<SubjectResponse>(props.schoolType),
    ...TableColumnStringNumber<SubjectResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnStringNumber<SubjectResponse>({
      ...props,
      title: tWords("description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<SubjectResponse>({ ...props }),
  ];
}
