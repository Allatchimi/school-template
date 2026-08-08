"use client";

import { ClassSubjectResponse } from "@/lib/api/school/highschool/class/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelClassSubject(props: {
  item?: ClassSubjectResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.subject?.name ||
            tWords("invalidLabel", { label: tWords("subject") })}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.class?.name ||
            tWords("invalidLabel", { label: tWords("class") })}{" "}
          {props.item?.class?.specialty?.name ||
            tWords("invalidLabel", { label: tWords("specialty") })}
        </Text>
        <div>
          <span className="w-auto text-ellipsis opacity-50 text-xs">
            {props.item?.class?.specialty?.section?.name ||
              tWords("invalidLabel", { label: tWords("section") })}
          </span>
        </div>
      </div>
    </div>
  );
}
