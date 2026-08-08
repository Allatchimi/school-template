"use client";

import VideoCameraIcon from "@/components/icon/material/video-camera";
import { MeetingResponse } from "@/lib/api/school/common/meeting/response";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import Link from "next/link";
import CardListCardTemplate, { CardListCardProps } from "../../card-list";
import { SchoolConfig } from "@/config/school";
import { antdTheme } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function MeetingCard(props: CardListCardProps<MeetingResponse>) {
  // Next hooks
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Params
  const icon = (
    <VideoCameraIcon width={30} height={30} color={theme.colorText} />
  );
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
      : tWords("meeting");
  const createdAt = props.item?.createdAt ?? undefined;
  const updatedAt = props.item?.updatedAt ?? undefined;
  const status =
    props.item?.isRunning === true ? tWords("online") : tWords("offline");
  const statusColor = props.item?.isRunning === true ? "success" : "default";

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
      <Link
        href={`/api/meetings/join/${props.item?.apiRoomID}`}
        target="_blank"
        className="text-ellipsis line-clamp-1"
      >
        {tWords("joinMeeting")}
      </Link>
    </CardListCardTemplate>
  );
}
