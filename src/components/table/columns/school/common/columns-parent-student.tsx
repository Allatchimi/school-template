"use client";

import { ParentStudentResponse } from "@/lib/api/school/common/parent/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnObject } from "@/components/table/column/column-types";
import TableIndexStudent from "@/components/table/indexes/school/common/index-student";
import TableIndexParent from "@/components/table/indexes/school/common/index-parent";
import { useTranslations } from "next-intl";

export function TableColumsParentStudent(
  props: TableColumnsProps
): TableColumnsType<ParentStudentResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<ParentStudentResponse>({ ...props }),
    ...TableColumnSchool<ParentStudentResponse>(props.schoolType),
    ...TableColumnObject<ParentStudentResponse>({
      ...props,
      title: tWords("parent"),
      render(record) {
        return <TableIndexParent record={record?.parent ?? undefined} />;
      },
    }),
    ...TableColumnObject<ParentStudentResponse>({
      ...props,
      title: tWords("student"),
      render(record) {
        return <TableIndexStudent record={record?.student ?? undefined} />;
      },
    }),
    ...TableColumnUpdatedAt<ParentStudentResponse>({ ...props }),
  ];
}
