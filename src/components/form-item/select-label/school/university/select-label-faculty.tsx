"use client";

import { FacultyResponse } from "@/lib/api/school/university/faculty/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelFaculty(props: { item?: FacultyResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.name ||
            tWords("invalidLabel", { label: tWords("faculty") })}
        </Text>
      </div>
    </div>
  );
}
