"use client";

import { StudentEnrollResponse } from "@/lib/api/school/common/student/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import AdmissionIcon from "@/components/icon/material/admission";
import { formatDate } from "@/helpers/date/format";
import ImageFallback from "@/components/image/image-fallback";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CardListCardTemplate, { CardListCardProps } from "../../card-list";
import { SchoolConfig } from "@/config/school";
import { antdTheme, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function StudentEnrollCard(
  props: CardListCardProps<StudentEnrollResponse>
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
  const origin = props.item?.origin
    ? tEnums(`enrollOrigin.${props.item.origin}`)
    : tWords("invalidLabel", { label: tWords("origin") });

  return (
    <CardListCardTemplate
      {...props}
      icon={icon}
      title={title}
      subtitle={subtitle}
      titleExtra={origin}
      createdAt={createdAt}
      updatedAt={updatedAt}
    >
      <div className="w-full flex gap-2">
        <div className="w-[150px] h-[100px]">
          <ImageFallback
            src={props.item?.student?.user?.info?.image ?? undefined}
            borderRadius={theme.borderRadius}
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex items-center gap-2">
            <UserOutlined />{" "}
            <Text className="text-ellipsis line-clamp-1">
              {props.item?.student?.user?.info?.firstName ||
                tWords("invalidLabel", { label: tWords("firstName") })}
            </Text>
          </div>
          <div className="w-full flex items-center gap-2">
            <UserOutlined />{" "}
            <Text className="text-ellipsis line-clamp-1">
              {props.item?.student?.user?.info?.lastName ||
                tWords("invalidLabel", { label: tWords("lastName") })}
            </Text>
          </div>
          <div className="w-full flex items-center gap-2">
            <CalendarOutlined />{" "}
            <Text className="text-ellipsis line-clamp-1">
              {formatDate(
                props.item?.student?.user?.info?.birthday?.toString() || ""
              ) || tWords("invalidLabel", { label: tWords("birthday") })}
            </Text>
          </div>
          <div className="w-full flex items-center gap-2">
            <EnvironmentOutlined />{" "}
            <Text className="text-ellipsis line-clamp-1">
              {props.item?.student?.user?.info?.birthLocation ||
                tWords("invalidLabel", { label: tWords("birthLocation") })}
            </Text>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <Text className="text-ellipsis line-clamp-2 mt-2">
          {SchoolConfig.schoolType() === SCHOOL_TYPE_HIGHSCHOOL
            ? `${
                props.item?.class?.name && props.item?.class?.name.length > 0
                  ? props.item?.class?.name
                  : tWords("invalidLabel", { label: tWords("class") })
              } - ${
                props.item?.class?.specialty?.name &&
                props.item?.class?.specialty?.name.length > 0
                  ? props.item?.class?.specialty?.name
                  : tWords("invalidLabel", { label: tWords("specialty") })
              }`
            : SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY
              ? `${props.item?.levelDomain?.level?.name || tWords("invalidLabel", { label: tWords("level") })} - ${
                  props.item?.levelDomain?.domain?.name ||
                  tWords("invalidLabel", { label: tWords("domain") })
                }`
              : undefined}
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
