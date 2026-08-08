"use client";

import { SubjectResponse } from "@/lib/api/school/highschool/subject/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelSubject(props: { item?: SubjectResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.name ||
            tWords("invalidLabel", { label: tWords("subject") })}
        </Text>
      </div>
    </div>
  );
}
