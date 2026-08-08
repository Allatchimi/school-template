"use client";

import AssignmentIcon from "@/components/icon/material/assignment";
import { formatDateTime, formatDateTimeToUnix } from "@/helpers/date/format";
import { ExamResponse } from "@/lib/api/school/common/exam/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import CardListCardTemplate, { CardListCardProps } from "../../card-list";
import { SchoolConfig } from "@/config/school";
import { antdTheme, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function ExamCard(props: CardListCardProps<ExamResponse>) {
  // Next hooks
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Params
  const icon = (
    <AssignmentIcon width={30} height={30} color={theme.colorText} />
  );
  const title =
    SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY
      ? props.item?.unit?.name ||
        tWords("invalidLabel", { label: tWords("unit") })
      : props.item?.classSubject?.subject?.name ||
        tWords("invalidLabel", { label: tWords("subject") });
  const subtitle =
    props.item?.type?.name || tWords("invalidLabel", { label: tWords("type") });
  const createdAt = props.item?.createdAt ?? undefined;
  const updatedAt = props.item?.updatedAt ?? undefined;
  const isStarted =
    formatDateTimeToUnix() >
    formatDateTimeToUnix(props.item?.startDate?.toString());

  const isEnded =
    formatDateTimeToUnix() >
    formatDateTimeToUnix(props.item?.endDate?.toString());
  const status = isEnded
    ? tWords("ended")
    : isStarted
      ? tWords("started")
      : tWords("upcoming");
  const statusColor = isEnded ? "error" : isStarted ? "warning" : "default";

  return (
    <CardListCardTemplate
      {...props}
      icon={icon}
      title={title}
      subtitle={subtitle}
      createdAt={createdAt}
      updatedAt={updatedAt}
      showStatus={true}
      status={status}
      statusColor={statusColor}
    >
      {rowDetails(
        tWords("starts"),
        formatDateTime(props.item?.startDate?.toString() ?? ""),
        true,
        theme.colorBorder
      )}
      {rowDetails(
        tWords("ends"),
        formatDateTime(props.item?.endDate?.toString() ?? ""),
        true,
        theme.colorBorder
      )}
      {rowDetails(
        tWords("description"),
        props.item?.description ?? "",
        true,
        theme.colorBorder
      )}
      {SchoolConfig.schoolType() === SCHOOL_TYPE_HIGHSCHOOL &&
        rowDetails(
          tWords("coefficient"),
          props.item?.classSubject?.coefficient?.toString() ?? "",
          true,
          theme.colorBorder
        )}
      {SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY &&
        rowDetails(
          tWords("credit"),
          props.item?.unit?.credit?.toString() ?? "",
          true,
          theme.colorBorder
        )}
      {rowDetails(
        tWords("percentage"),
        props.item?.percentage ? props.item?.percentage?.toString() + "%" : "",
        true,
        theme.colorBorder
      )}
      {rowDetails(
        tWords("locationType"),
        props.item?.locationType ?? "",
        true,
        theme.colorBorder
      )}
      {rowDetails(
        tWords("locationDetails"),
        props.item?.locationDetails ?? "",
        true,
        theme.colorBorder
      )}
      {rowDetails(
        tWords("requirements"),
        props.item?.requirements ?? "",
        true,
        theme.colorBorder
      )}
      {rowDetails(
        tWords("allowedItems"),
        props.item?.allowedItems ?? "",
        true,
        theme.colorBorder
      )}
    </CardListCardTemplate>
  );
}

function rowDetails(
  title: string,
  value: React.ReactNode,
  bordered?: boolean,
  borderColor?: string
) {
  return (
    <div
      style={{
        borderTop: bordered === true ? "1px solid" : "none",
        borderColor: borderColor,
      }}
      className="w-full grid grid-cols-3 gap-2 pt-1"
    >
      <div className="w-full col-span-1">
        <Text type="secondary" className="text-ellipsis line-clamp-1">
          {title}
        </Text>
      </div>
      <div className="w-full col-span-2">
        <Text className="text-ellipsis line-clamp-3">{value}</Text>
      </div>
    </div>
  );
}
