"use client";

import CourseIcon from "@/components/icon/material/course";
import { CourseResponse } from "@/lib/api/school/common/course/response";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import CardListCardTemplate, { CardListCardProps } from "../../card-list";
import { SchoolConfig } from "@/config/school";
import { antdTheme, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function CourseCard(props: CardListCardProps<CourseResponse>) {
  // Next hooks
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Params
  const icon = <CourseIcon width={30} height={30} color={theme.colorText} />;
  const title =
    SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY
      ? props.item?.unit?.name ||
        tWords("invalidLabel", { label: tWords("unit") })
      : props.item?.classSubject?.subject?.name ||
        tWords("invalidLabel", { label: tWords("subject") });
  const subtitle =
    SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY
      ? `${
          props.item?.unit?.semester?.name ||
          tWords("invalidLabel", { label: tWords("semester") })
        }`
      : tWords("course");
  const createdAt = props.item?.createdAt ?? undefined;
  const updatedAt = props.item?.updatedAt ?? undefined;
  const status = undefined;
  const statusColor = undefined;

  return (
    <CardListCardTemplate
      {...props}
      icon={icon}
      title={title}
      subtitle={subtitle}
      createdAt={createdAt}
      updatedAt={updatedAt}
      showStatus={false}
      status={status}
      statusColor={statusColor}
      clickable={true}
      onClickHref={`/dashboard/common/courses/${props.item?.id || -1}`}
    >
      <Text className="text-ellipsis line-clamp-1">
        {props.item?.title ||
          tWords("invalidLabel", { label: tWords("title") })}
      </Text>
      <Text type="secondary" className="text-ellipsis line-clamp-3">
        {props.item?.description}
      </Text>
    </CardListCardTemplate>
  );
}
