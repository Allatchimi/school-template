"use client";

import { DirectorResponse } from "@/lib/api/school/common/director/response";
import { TableColumnsType } from "antd";
import TableIndexUser from "../../../indexes/user/index-user";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnObject } from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsDirector(
  props: TableColumnsProps
): TableColumnsType<DirectorResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<DirectorResponse>({ ...props }),
    ...TableColumnObject<DirectorResponse>({
      ...props,
      title: tWords("user"),
      render(record) {
        return <TableIndexUser record={record?.user ?? undefined} />;
      },
    }),
    ...TableColumnSchool<DirectorResponse>(props.schoolType),
    ...TableColumnUpdatedAt<DirectorResponse>({ ...props }),
  ];
}
