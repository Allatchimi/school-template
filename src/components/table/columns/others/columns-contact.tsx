"use client";

import { ContactResponse } from "@/lib/api/others/contact/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../column/school/column-school";
import { TableColumnsProps } from "../../column.type";
import { TableColumnID } from "../../column/column-id";
import { TableColumnUpdatedAt } from "../../column/column-updated-at";
import { TableColumnStringNumber } from "../../column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsContact(
  props: TableColumnsProps
): TableColumnsType<ContactResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<ContactResponse>({ ...props }),
    ...TableColumnSchool<ContactResponse>(props.schoolType),
    ...TableColumnStringNumber<ContactResponse>({
      ...props,
      title: tWords("email"),
      dataIndex: "email",
      key: "email",
      sorter: true,
    }),
    ...TableColumnStringNumber<ContactResponse>({
      ...props,
      title: tWords("topic"),
      dataIndex: "subject",
      key: "subject",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<ContactResponse>({ ...props }),
  ];
}
