"use client";

import { RequestResponse } from "@/lib/api/school/common/request/response";
import { TableColumnsType } from "antd";
import { TableColumnClassSubjectUnit } from "../../../column/school/column-class-subject-unit";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnYear } from "../../../column/school/column-year";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnEnum,
  TableColumnObject,
  TableColumnStatus,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import {
  REQUEST_STATUS_COMPLETED,
  REQUEST_STATUS_PENDING,
  REQUEST_STATUS_REJECTED,
} from "@/lib/constants/school/common/request";
import TableIndexStudent from "@/components/table/indexes/school/common/index-student";
import { TableColumnClassLevelDomain } from "@/components/table/column/school/column-class-level-domain";
import { useTranslations } from "next-intl";

export function TableColumsRequest(
  props: TableColumnsProps
): TableColumnsType<RequestResponse> {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.request");

  return [
    ...TableColumnID<RequestResponse>({ ...props }),
    ...TableColumnObject<RequestResponse>({
      ...props,
      title: tWords("student"),
      render(record) {
        return <TableIndexStudent record={record?.student ?? undefined} />;
      },
    }),
    ...TableColumnSchool<RequestResponse>(props.schoolType),
    ...TableColumnYear<RequestResponse>(props.yearID),
    ...TableColumnClassSubjectUnit<RequestResponse>({
      schoolType: props.schoolType,
      showSemester: true,
      showSequence: true,
    }),
    ...TableColumnClassLevelDomain<RequestResponse>({
      schoolType: props.schoolType,
      isClassSubjectUnit: true,
    }),
    ...TableColumnStringNumber<RequestResponse>({
      ...props,
      title: tWords("title"),
      dataIndex: "title",
      key: "title",
      sorter: true,
    }),
    ...TableColumnStatus<RequestResponse>({
      ...props,
      sorter: true,
      render(record) {
        return tEnums(record?.status ?? "");
      },
      renderColor(record) {
        return record?.status === REQUEST_STATUS_COMPLETED
          ? "success"
          : record?.status === REQUEST_STATUS_PENDING
            ? "processing"
            : record?.status === REQUEST_STATUS_REJECTED
              ? "error"
              : "default";
      },
    }),
    ...TableColumnEnum<RequestResponse>({
      ...props,
      title: tWords("audience"),
      dataIndex: "audience",
      key: "audience",
      sorter: true,
      render(value) {
        return value ? tEnums(`audience.${value}`) : "";
      },
    }),
    ...TableColumnUpdatedAt<RequestResponse>({ ...props }),
  ];
}
