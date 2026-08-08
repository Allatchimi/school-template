"use client";

import { SequenceResponse } from "@/lib/api/school/highschool/sequence/response";
import { TableColumnsType } from "antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import { TableColumnStringNumber } from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsSequence(
  props: TableColumnsProps
): TableColumnsType<SequenceResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<SequenceResponse>({ ...props }),
    ...TableColumnSchool<SequenceResponse>(props.schoolType),
    ...TableColumnStringNumber<SequenceResponse>({
      ...props,
      title: tWords("name"),
      dataIndex: "name",
      key: "name",
      sorter: true,
    }),
    ...TableColumnStringNumber<SequenceResponse>({
      ...props,
      title: tWords("description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<SequenceResponse>({ ...props }),
  ];
}
