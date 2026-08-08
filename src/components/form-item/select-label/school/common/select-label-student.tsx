"use client";

import AvatarUser from "@/components/avatar/avatar-user";
import { StudentEnrollResponse } from "@/lib/api/school/common/student/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelStudentEnroll(props: {
  item?: StudentEnrollResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  const classLevelDomainFull =
    props.item?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
      ? `${
          props.item?.class?.name ||
          tWords("invalidLabel", { label: tWords("class") })
        } - ${
          props.item?.class?.specialty?.name ||
          tWords("invalidLabel", { label: tWords("specialty") })
        }, ${props.item?.class?.specialty?.section?.name || tWords("invalidLabel", { label: tWords("section") })}`
      : props.item?.school?.type === SCHOOL_TYPE_UNIVERSITY
        ? `${props.item?.levelDomain?.level?.name || tWords("invalidLabel", { label: tWords("level") })} ${
            props.item?.levelDomain?.domain?.name ||
            tWords("invalidLabel", { label: tWords("domain") })
          } - ${
            props.item?.levelDomain?.domain?.department?.name ||
            tWords("invalidLabel", { label: tWords("department") })
          }, ${
            props.item?.levelDomain?.domain?.department?.faculty?.name ||
            tWords("invalidLabel", { label: tWords("faculty") })
          }`
        : tWords("invalidLabel", { label: tWords("classLevelDomain") });
  const year =
    props.item?.year?.name || tWords("invalidLabel", { label: tWords("year") });
  return (
    <div className="w-auto flex items-center gap-2">
      <AvatarUser item={props.item ?? undefined} />
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.student?.uid ||
            tWords("invalidLabel", { label: tWords("uid") })}{" "}
          - {props.item?.student?.user?.info?.firstName}{" "}
          {props.item?.student?.user?.info?.lastName}
        </Text>
        <Text ellipsis type="secondary">
          {classLevelDomainFull}
        </Text>
        <div>
          <span className="w-auto text-ellipsis opacity-50 text-xs">
            {year}
          </span>
        </div>
      </div>
    </div>
  );
}
