"use client";

import {
  ScheduleResponse,
  ScheduleWeeklyViewResponse,
} from "@/lib/api/school/common/schedule/response";
import { TableColumnsType } from "antd";
import { TableColumnClassSubjectUnit } from "../../../column/school/column-class-subject-unit";
import {
  TableIndexScheduleWeeklyViewItemList,
  TableIndexScheduleWeeklyViewTime,
} from "../../../indexes/school/common/index-schedule-weekly-view";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnYear } from "../../../column/school/column-year";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnEnum,
  TableColumnObject,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { TableColumnClassLevelDomain } from "@/components/table/column/school/column-class-level-domain";
import { useTranslations } from "next-intl";

export function TableColumsSchedule(
  props: TableColumnsProps
): TableColumnsType<ScheduleResponse> {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.schedule");

  return [
    ...TableColumnID<ScheduleResponse>({ ...props }),
    ...TableColumnSchool<ScheduleResponse>(props.schoolType),
    ...TableColumnYear<ScheduleResponse>(props.yearID),
    ...TableColumnClassSubjectUnit<ScheduleResponse>({
      schoolType: props.schoolType,
    }),
    ...TableColumnClassLevelDomain<ScheduleResponse>({
      schoolType: props.schoolType,
      isClassSubjectUnit: true,
    }),
    ...TableColumnEnum<ScheduleResponse>({
      ...props,
      title: tWords("type"),
      dataIndex: "type",
      key: "type",
      sorter: true,
      render(value) {
        return value ? tEnums(`type.${value}`) : "";
      },
    }),
    ...TableColumnEnum<ScheduleResponse>({
      ...props,
      title: tWords("dayOfTheWeek"),
      dataIndex: "dayOfTheWeek",
      key: "day_of_the_week",
      sorter: true,
      render(value) {
        return value ? tEnums(`dayOfTheWeek.${value}`) : "";
      },
    }),
    ...TableColumnStringNumber<ScheduleResponse>({
      ...props,
      title: tWords("startTime"),
      dataIndex: "startTime",
      key: "start_time",
      sorter: true,
    }),
    ...TableColumnStringNumber<ScheduleResponse>({
      ...props,
      title: tWords("endTime"),
      dataIndex: "endTime",
      key: "end_time",
      sorter: true,
    }),
    ...TableColumnUpdatedAt<ScheduleResponse>({ ...props }),
  ];
}

export function TableColumsScheduleWeeklyView(
  props: TableColumnsProps
): TableColumnsType<ScheduleWeeklyViewResponse> {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    ...TableColumnObject<ScheduleWeeklyViewResponse>({
      ...props,
      title: tWords("time"),
      render(record) {
        return <TableIndexScheduleWeeklyViewTime record={record} />;
      },
    }),
    ...TableColumnObject<ScheduleWeeklyViewResponse>({
      ...props,
      title: tWords("monday"),
      render(record) {
        return (
          <TableIndexScheduleWeeklyViewItemList
            record={record?.monday ?? undefined}
          />
        );
      },
    }),
    ...TableColumnObject<ScheduleWeeklyViewResponse>({
      ...props,
      title: tWords("tuesday"),
      render(record) {
        return (
          <TableIndexScheduleWeeklyViewItemList
            record={record?.tuesday ?? undefined}
          />
        );
      },
    }),
    ...TableColumnObject<ScheduleWeeklyViewResponse>({
      ...props,
      title: tWords("wednesday"),
      render(record) {
        return (
          <TableIndexScheduleWeeklyViewItemList
            record={record?.wednesday ?? undefined}
          />
        );
      },
    }),
    ...TableColumnObject<ScheduleWeeklyViewResponse>({
      ...props,
      title: tWords("thursday"),
      render(record) {
        return (
          <TableIndexScheduleWeeklyViewItemList
            record={record?.thursday ?? undefined}
          />
        );
      },
    }),
    ...TableColumnObject<ScheduleWeeklyViewResponse>({
      ...props,
      title: tWords("friday"),
      render(record) {
        return (
          <TableIndexScheduleWeeklyViewItemList
            record={record?.friday ?? undefined}
          />
        );
      },
    }),
    ...TableColumnObject<ScheduleWeeklyViewResponse>({
      ...props,
      title: tWords("saturday"),
      render(record) {
        return (
          <TableIndexScheduleWeeklyViewItemList
            record={record?.saturday ?? undefined}
          />
        );
      },
    }),
    ...TableColumnObject<ScheduleWeeklyViewResponse>({
      ...props,
      title: tWords("sunday"),
      render(record) {
        return (
          <TableIndexScheduleWeeklyViewItemList
            record={record?.sunday ?? undefined}
          />
        );
      },
    }),
  ];
}
