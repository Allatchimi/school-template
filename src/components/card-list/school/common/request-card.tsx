"use client";

import { RequestResponse } from "@/lib/api/school/common/request/response";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import {
  REQUEST_STATUS_COMPLETED,
  REQUEST_STATUS_INITIATED,
  REQUEST_STATUS_PENDING,
  REQUEST_STATUS_REJECTED,
} from "@/lib/constants/school/common/request";
import CardListCardTemplate, { CardListCardProps } from "../../card-list";
import { SchoolConfig } from "@/config/school";
import HelpIcon from "@/components/icon/material/help";
import { antdTheme, Button, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function RequestCard(
  props: {
    canResolve?: boolean;
    canUpdateStatus?: boolean;
    onUpdateStatusRequested?: (value?: RequestResponse) => void;
  } & CardListCardProps<RequestResponse>
) {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.request");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Params
  const icon = <HelpIcon width={30} height={30} color={theme.colorText} />;
  const title =
    props.item?.title || tWords("invalidLabel", { label: tWords("title") });
  const subtitle =
    props.item?.year?.name || tWords("invalidLabel", { label: tWords("year") });
  const createdAt = props.item?.createdAt ?? undefined;
  const updatedAt = props.item?.updatedAt ?? undefined;
  const status = props.item?.status
    ? tEnums(`status.${props.item.status}`)
    : tWords("invalidLabel", { label: tWords("status") });
  const statusColor =
    props.item?.status === REQUEST_STATUS_REJECTED
      ? "error"
      : props.item?.status === REQUEST_STATUS_PENDING
        ? "processing"
        : props.item?.status === REQUEST_STATUS_COMPLETED
          ? "success"
          : "default";

  return (
    <CardListCardTemplate
      {...props}
      icon={icon}
      title={title}
      subtitle={subtitle}
      titleExtra={
        props.item?.audience ||
        tWords("invalidLabel", { label: tWords("audience") })
      }
      createdAt={createdAt}
      updatedAt={updatedAt}
      showStatus={true}
      status={status}
      statusColor={statusColor}
      canUpdate={
        props.canUpdate === true &&
        props.item?.status === REQUEST_STATUS_INITIATED
      }
      canDelete={
        props.canDelete === true &&
        props.item?.status === REQUEST_STATUS_INITIATED
      }
    >
      <div className="w-full h-full flex flex-col justify-between gap-4">
        <div className="w-full">
          <Text className="text-ellipsis line-clamp-2">
            {SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY
              ? `${
                  props.item?.unit?.name ||
                  tWords("invalidLabel", { label: tWords("unit") })
                } - ${
                  props.item?.unit?.semester?.name ||
                  tWords("invalidLabel", { label: tWords("semester") })
                }`
              : `${props.item?.classSubject?.class?.name || tWords("invalidLabel", { label: tWords("class") })} - ${
                  props.item?.classSubject?.subject?.name ||
                  tWords("invalidLabel", { label: tWords("subject") })
                }`}
          </Text>
          <Text type="secondary" className="text-ellipsis line-clamp-3">
            {props.item?.message ? props.item?.message : tWords("noMessage")}
          </Text>
        </div>
        <div className="w-full flex flex-wrap items-center justify-end gap-2">
          {props.canUpdateStatus === true ? (
            <Button
              onClick={() => {
                if (props.onUpdateStatusRequested) {
                  props.onUpdateStatusRequested(props.item);
                }
              }}
              className="z-20"
            >
              {tWords("resolve")}
            </Button>
          ) : undefined}
        </div>
      </div>
    </CardListCardTemplate>
  );
}
