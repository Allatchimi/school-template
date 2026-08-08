"use client";

import TableIndexDepartment from "@/components/table/indexes/school/university/index-department";
import { DomainResponse } from "@/lib/api/school/university/domain/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnObject,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsDomain(
  props: TableColumnsProps
): TableColumnsType<DomainResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<DomainResponse>({ ...props }),
    ...TableColumnSchool<DomainResponse>(props.schoolType),
    ...TableColumnObject<DomainResponse>({
      ...props,
      title: tWords("department"),
      render(record) {
        return (
          <TableIndexDepartment record={record?.department ?? undefined} />
        );
      },
    }),
    ...TableColumnStringNumber<DomainResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnStringNumber<DomainResponse>({
      ...props,
      title: tWords("description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<DomainResponse>({ ...props }),
  ];
}
