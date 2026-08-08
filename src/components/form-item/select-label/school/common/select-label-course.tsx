"use client";

import { CourseResponse } from "@/lib/api/school/common/course/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelCourse(props: { item?: CourseResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.title ||
            tWords("invalidLabel", { label: tWords("title") })}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
            ? `${props.item?.classSubject?.subject?.name || tWords("invalidLabel", { label: tWords("subject") })} ${
                props.item?.classSubject?.class?.name ||
                tWords("invalidLabel", { label: tWords("class") })
              }`
            : props.item?.school?.type === SCHOOL_TYPE_UNIVERSITY
              ? props.item.unit?.name ||
                tWords("invalidLabel", { label: tWords("unit") })
              : tWords("invalidLabel", { label: tWords("subjectUnit") })}
        </Text>
        <div>
          <span className="w-auto text-ellipsis opacity-50 text-xs">
            {props.item?.year?.name ||
              tWords("invalidLabel", { label: tWords("year") })}
          </span>
        </div>
      </div>
    </div>
  );
}
