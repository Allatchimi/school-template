"use client";

import { ExamResponse } from "@/lib/api/school/common/exam/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelExam(props: { item?: ExamResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.type?.name ||
            tWords("invalidLabel", { label: tWords("type") })}{" "}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
            ? `${props.item?.classSubject?.subject?.name || tWords("invalidLabel", { label: tWords("subject") })} ${
                props.item?.classSubject?.class?.name ||
                tWords("invalidLabel", { label: tWords("class") })
              }`
            : props.item?.school?.type === SCHOOL_TYPE_UNIVERSITY
              ? `${props.item.unit?.name || tWords("invalidLabel", { label: tWords("unit") })} - ${
                  props.item.unit?.levelDomain?.level?.name ||
                  tWords("invalidLabel", { label: tWords("level") })
                } ${
                  props.item.unit?.levelDomain?.domain?.name ||
                  tWords("invalidLabel", { label: tWords("domain") })
                }, ${
                  props.item.unit?.levelDomain?.domain?.department?.name ||
                  tWords("invalidLabel", { label: tWords("department") })
                }`
              : tWords("invalidLabel", { label: tWords("subjectUnit") })}
        </Text>
        <div>
          <span className="w-auto text-ellipsis opacity-50 text-xs">
            {props.item?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
              ? props.item.sequence?.name ||
                tWords("invalidLabel", { label: tWords("sequence") })
              : props.item?.school?.type === SCHOOL_TYPE_UNIVERSITY
                ? props.item?.unit?.semester?.name ||
                  tWords("invalidLabel", { label: tWords("semester") })
                : tWords("invalidLabel", {
                    label: tWords("sequenceSemester"),
                  })}{" "}
            {props.item?.year?.name ||
              tWords("invalidLabel", { label: tWords("year") })}
          </span>
        </div>
      </div>
    </div>
  );
}
