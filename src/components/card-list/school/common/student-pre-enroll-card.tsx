"use client";

import { StudentPreEnrollResponse } from "@/lib/api/school/common/student/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import AdmissionIcon from "@/components/icon/material/admission";
import { formatDate } from "@/helpers/date/format";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CardListCardTemplate, { CardListCardProps } from "../../card-list";
import { SchoolConfig } from "@/config/school";
import { antdTheme, Text } from "@/ui/antd";
import {
  STUDENT_PRE_ENROLL_STATUS_ENROLLED,
  STUDENT_PRE_ENROLL_STATUS_INITIATED,
  STUDENT_PRE_ENROLL_STATUS_PENDING,
  STUDENT_PRE_ENROLL_STATUS_REJECTED,
} from "@/lib/constants/school/common/student";
import { useTranslations } from "next-intl";

export default function StudentPreEnrollCard(
  props: CardListCardProps<StudentPreEnrollResponse>
) {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.student");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Params
  const icon = <AdmissionIcon width={30} height={30} color={theme.colorText} />;
  const title =
    props.item?.year?.name || tWords("invalidLabel", { label: tWords("year") });
  const subtitle =
    SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY
      ? props.item?.levelDomain?.domain?.department?.faculty?.name ||
        tWords("invalidLabel", { label: tWords("faculty") })
      : props.item?.class?.specialty?.name ||
        tWords("invalidLabel", { label: tWords("specialty") });
  const createdAt = props.item?.createdAt ?? undefined;
  const updatedAt = props.item?.updatedAt ?? undefined;
  const status = props.item?.status
    ? tEnums(`preEnrollStatus.${props.item.status}`)
    : tWords("invalidLabel", { label: tWords("status") });
  const statusColor =
    props.item?.status === STUDENT_PRE_ENROLL_STATUS_REJECTED
      ? "error"
      : props.item?.status === STUDENT_PRE_ENROLL_STATUS_PENDING
        ? "processing"
        : props.item?.status === STUDENT_PRE_ENROLL_STATUS_ENROLLED
          ? "success"
          : "default";

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
      canUpdate={
        props.canUpdate === true &&
        props.item?.status === STUDENT_PRE_ENROLL_STATUS_INITIATED
      }
      canDelete={
        props.canDelete === true &&
        props.item?.status === STUDENT_PRE_ENROLL_STATUS_INITIATED
      }
    >
      <div className="w-full flex gap-2">
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex items-center gap-2">
            <UserOutlined />{" "}
            <Text className="text-ellipsis line-clamp-1">
              {props.item?.firstName ||
                tWords("invalidLabel", { label: tWords("firstName") })}
            </Text>
          </div>
          <div className="w-full flex items-center gap-2">
            <UserOutlined />{" "}
            <Text className="text-ellipsis line-clamp-1">
              {props.item?.lastName ||
                tWords("invalidLabel", { label: tWords("lastName") })}
            </Text>
          </div>
          <div className="w-full flex items-center gap-2">
            <CalendarOutlined />{" "}
            <Text className="text-ellipsis line-clamp-1">
              {formatDate(props.item?.birthday?.toString() || "") ||
                tWords("invalidLabel", { label: tWords("birthday") })}
            </Text>
          </div>
          <div className="w-full flex items-center gap-2">
            <EnvironmentOutlined />{" "}
            <Text className="text-ellipsis line-clamp-1">
              {props.item?.birthLocation ||
                tWords("invalidLabel", { label: tWords("birthLocation") })}
            </Text>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <Text className="text-ellipsis line-clamp-2 mt-2">
          {SchoolConfig.schoolType() === SCHOOL_TYPE_HIGHSCHOOL
            ? `${
                props.item?.class?.name ||
                tWords("invalidLabel", { label: tWords("title") })
              } - ${props.item?.class?.specialty?.name || tWords("invalidLabel", { label: tWords("specialty") })}`
            : SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY
              ? `${props.item?.levelDomain?.level?.name || tWords("invalidLabel", { label: tWords("level") })} - ${
                  props.item?.levelDomain?.domain?.name ||
                  tWords("invalidLabel", { label: tWords("domain") })
                }`
              : ""}
        </Text>
        {SchoolConfig.schoolType() === SCHOOL_TYPE_HIGHSCHOOL ? (
          <Text type="secondary" className="text-ellipsis line-clamp-3">
            {props.item?.class?.description}
          </Text>
        ) : SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY ? (
          <Text type="secondary" className="text-ellipsis line-clamp-3">
            {props.item?.levelDomain?.domain?.description}
          </Text>
        ) : undefined}
      </div>
    </CardListCardTemplate>
  );
}
