"use client";

import { ScheduleResponse } from "@/lib/api/school/common/schedule/response";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelSchedule(props: {
  item?: ScheduleResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.startTime?.toString() ||
            tWords("invalidLabel", { label: tWords("startTime") })}{" "}
          -{" "}
          {props.item?.endTime?.toString() ||
            tWords("invalidLabel", { label: tWords("endTime") })}{" "}
          {props.item?.type ||
            tWords("invalidLabel", { label: tWords("type") })}
          {tWords("every")}{" "}
          {props.item?.dayOfTheWeek ||
            tWords("invalidLabel", { label: tWords("dayOfTheWeek") })}
          ({tWords("repeat")} {props.item?.repeatCount} {tWords("times")}{" "}
          {props.item?.repeatType})
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.school?.type === SCHOOL_TYPE_UNIVERSITY
            ? props.item.unit?.name ||
              tWords("invalidLabel", { label: tWords("unit") })
            : props.item?.classSubject?.subject?.name ||
              tWords("invalidLabel", { label: tWords("subject") })}
        </Text>
      </div>
    </div>
  );
}
