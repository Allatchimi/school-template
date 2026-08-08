"use client";

import AvatarUser from "@/components/avatar/avatar-user";
import { formatDateTimeToSince } from "@/helpers/date/format";
import { CourseCommentResponse } from "@/lib/api/school/common/course/response";
import {
  FEATURE_ADMIN,
  FEATURE_DIRECTOR,
  FEATURE_TEACHER,
} from "@/lib/constants/user/feature";
import { antdTheme, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

import "../../../../../../../styles/svg.css";

export default function CourseMessageRow(props: {
  item?: CourseCommentResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const fullName = `${props.item?.user?.info?.firstName ?? ""} ${props.item?.user?.info?.lastName ?? ""}`;
  const username = props.item?.user?.info?.username ?? "";
  const unknowUser =
    (props.item?.user?.id ?? 0) > 0
      ? `${tWords("user")}${props.item?.user?.id}`
      : tWords("unknownUser");
  return (
    <div className="w-full flex justify-between gap-2.5 px-2.5 py-1.5">
      <div className="w-auto">
        {props.item?.user?.role?.feature === FEATURE_ADMIN ||
        FEATURE_DIRECTOR ||
        FEATURE_TEACHER ? (
          <AvatarUser
            item={props.item?.user ?? undefined}
            style={{
              borderColor: theme.colorPrimary,
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          />
        ) : (
          <AvatarUser item={props.item?.user ?? undefined} />
        )}
      </div>
      <div className="w-full flex flex-col gap-1.5">
        <div className="w-full flex items-center justify-between gap-8">
          <Text strong className="text-ellipsis line-clamp-1">
            {fullName.trim().length > 0
              ? fullName
              : username.trim().length > 0
                ? username
                : unknowUser}
            <span className="w-auto text-ellipsis opacity-50 text-xs font-light ml-2">
              {props.item?.user?.role?.name ||
                tWords("invalidLabel", { label: tWords("role") })}
            </span>
          </Text>
          <Text type="secondary" className="text-ellipsis line-clamp-1">
            {formatDateTimeToSince(props.item?.updatedAt?.toString() ?? "")}
          </Text>
        </div>
        <div className="">
          <Text className="text-ellipsis line-clamp-100">
            {props.item?.message}
          </Text>
        </div>
      </div>
    </div>
  );
}
