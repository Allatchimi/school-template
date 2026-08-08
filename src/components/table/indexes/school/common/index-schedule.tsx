"use client";

import { ScheduleResponse } from "@/lib/api/school/common/schedule/response";
import { TableIndexText } from "../../table-index";
import { useTranslations } from "next-intl";

export default function TableIndexSchedule({
  record,
}: {
  record?: ScheduleResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  const type =
    record?.type ||
    tWords("invalidLabel", {
      label: tWords("type"),
    });
  const dayOfTheWeek =
    record?.dayOfTheWeek ||
    tWords("invalidLabel", {
      label: tWords("dayOfTheWeek"),
    });
  const repeatCount =
    record?.repeatCount ||
    tWords("invalidLabel", {
      label: tWords("repeatCount"),
    });
  const repeatType =
    record?.repeatType ||
    tWords("invalidLabel", {
      label: tWords("repeatType"),
    });
  const startTime =
    record?.startTime?.toString() ||
    tWords("invalidLabel", {
      label: tWords("startTime"),
    });
  const endTime =
    record?.endTime?.toString() ||
    tWords("invalidLabel", {
      label: tWords("endTime"),
    });
  return (
    <div className="w-auto flex flex-col gap-2">
      <TableIndexText>
        {type} ({tWords("every")} {dayOfTheWeek} {tWords("repeat")}{" "}
        {repeatCount} {tWords("times")} {repeatType})
      </TableIndexText>
      <TableIndexText type="secondary">
        {startTime} - {endTime}
      </TableIndexText>
    </div>
  );
}
