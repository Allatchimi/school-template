"use client";

import TableIndexSpecialty from "@/components/table/indexes/school/highschool/index-specialty";
import { ClassResponse } from "@/lib/api/school/highschool/class/response";
import { TableColumnsType } from "antd";
import { Text } from "@/ui/antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnBoolean,
  TableColumnObject,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsClass(
  props: TableColumnsProps
): TableColumnsType<ClassResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<ClassResponse>({ ...props }),
    ...TableColumnSchool<ClassResponse>(props.schoolType),
    ...TableColumnObject<ClassResponse>({
      ...props,
      title: tWords("specialty"),
      render(record) {
        return <TableIndexSpecialty record={record?.specialty ?? undefined} />;
      },
    }),
    ...TableColumnStringNumber<ClassResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnObject<ClassResponse>({
      ...props,
      title: tWords("fees"),
      key: "fees",
      sorter: true,
      render(record) {
        return (
          <Text
            ellipsis
          >{`${record?.fees || 0} ${record?.school?.currency?.toUpperCase() || ""}`}</Text>
        );
      },
    }),
    ...TableColumnBoolean<ClassResponse>({
      ...props,
      title: tWords("isValid"),
      dataIndex: "isValid",
      key: "is_valid",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<ClassResponse>({ ...props }),
  ];
}
