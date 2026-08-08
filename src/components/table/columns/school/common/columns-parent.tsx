"use client";

import { ParentResponse } from "@/lib/api/school/common/parent/response";
import { TableColumnsType } from "antd";
import TableIndexUser from "../../../indexes/user/index-user";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnObject } from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsParent(
  props: TableColumnsProps
): TableColumnsType<ParentResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<ParentResponse>({ ...props }),
    ...TableColumnObject<ParentResponse>({
      ...props,
      title: tWords("user"),
      render(record) {
        return <TableIndexUser record={record?.user ?? undefined} />;
      },
    }),
    ...TableColumnSchool<ParentResponse>(props.schoolType),
    ...TableColumnUpdatedAt<ParentResponse>({ ...props }),
  ];
}
