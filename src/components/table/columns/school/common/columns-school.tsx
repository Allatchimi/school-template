"use client";

import { SchoolResponse } from "@/lib/api/school/common/school/response";
import { TableColumnsType } from "antd";
import TableIndexSchool, {
  TableIndexSchoolDeployment,
} from "../../../indexes/school/common/index-school";
import { SCHOOL_STATUS_ENABLED } from "@/lib/constants/school/common/school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnObject,
  TableColumnStatus,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsSchool(
  props: TableColumnsProps
): TableColumnsType<SchoolResponse> {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.status");

  return [
    ...TableColumnID<SchoolResponse>({ ...props }),
    ...TableColumnObject<SchoolResponse>({
      ...props,
      title: tWords("name"),
      key: "name",
      sorter: true,
      render(record) {
        return <TableIndexSchool record={record} />;
      },
    }),
    ...TableColumnStringNumber<SchoolResponse>({
      ...props,
      title: tWords("type"),
      dataIndex: "type",
      key: "type",
      sorter: true,
    }),
    ...TableColumnStringNumber<SchoolResponse>({
      ...props,
      title: tWords("fullName"),
      dataIndex: ["info", "fullName"],
    }),
    ...TableColumnStatus<SchoolResponse>({
      ...props,
      sorter: true,
      render(record) {
        return record?.status ? tEnums(record?.status) : "";
      },
      renderColor(record) {
        return record?.status === SCHOOL_STATUS_ENABLED ? "success" : "error";
      },
    }),
    ...TableColumnObject<SchoolResponse>({
      ...props,
      title: tWords("deployment"),
      render(record) {
        return <TableIndexSchoolDeployment record={record} />;
      },
    }),
    ...TableColumnUpdatedAt<SchoolResponse>({ ...props }),
  ];
}
