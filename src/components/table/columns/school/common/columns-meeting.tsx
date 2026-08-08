"use client";

import { MeetingResponse } from "@/lib/api/school/common/meeting/response";
import { TableColumnsType } from "antd";
import { TableColumnClassSubjectUnit } from "../../../column/school/column-class-subject-unit";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnBoolean,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { TableColumnClassLevelDomain } from "@/components/table/column/school/column-class-level-domain";
import { useTranslations } from "next-intl";

export function TableColumsMeeting(
  props: TableColumnsProps
): TableColumnsType<MeetingResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnID<MeetingResponse>({ ...props }),
    ...TableColumnSchool<MeetingResponse>(props.schoolType),
    ...TableColumnClassSubjectUnit<MeetingResponse>({
      schoolType: props.schoolType,
    }),
    ...TableColumnClassLevelDomain<MeetingResponse>({
      schoolType: props.schoolType,
      isClassSubjectUnit: true,
    }),
    ...TableColumnStringNumber<MeetingResponse>({
      ...props,
      title: tWords("apiRoomID"),
      dataIndex: "apiRoomID",
      key: "api_room_id",
      sorter: true,
    }),
    ...TableColumnBoolean<MeetingResponse>({
      ...props,
      title: tWords("isRunning"),
      dataIndex: "isRunning",
      key: "is_running",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<MeetingResponse>({ ...props }),
  ];
}
