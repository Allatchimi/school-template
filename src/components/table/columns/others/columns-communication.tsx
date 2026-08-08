"use client";

import { CommunicationResponse } from "@/lib/api/others/communication/response";
import { TableColumnsType } from "antd";
import TableIndexRole from "../../indexes/user/index-role";
import { TableColumnSchool } from "../../column/school/column-school";
import { TableColumnsProps } from "../../column.type";
import { TableColumnID } from "../../column/column-id";
import { TableColumnUpdatedAt } from "../../column/column-updated-at";
import {
  TableColumnObject,
  TableColumnStringNumber,
} from "../../column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsCommunication(
  props: TableColumnsProps
): TableColumnsType<CommunicationResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<CommunicationResponse>({ ...props }),
    ...TableColumnSchool<CommunicationResponse>(props.schoolType),
    ...TableColumnObject<CommunicationResponse>({
      ...props,
      title: tWords("audience"),
      render(record) {
        return <TableIndexRole record={record?.role ?? undefined} />;
      },
    }),
    ...TableColumnStringNumber<CommunicationResponse>({
      ...props,
      title: tWords("topic"),
      dataIndex: "subject",
      key: "subject",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<CommunicationResponse>({ ...props }),
  ];
}
