"use client";

import { ClassResponse } from "@/lib/api/school/highschool/class/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelClass(props: { item?: ClassResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.name ||
            tWords("invalidLabel", { label: tWords("class") })}{" "}
          -{" "}
          {props.item?.specialty?.name ||
            tWords("invalidLabel", { label: tWords("class") })}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.specialty?.section?.name ||
            tWords("invalidLabel", { label: tWords("section") })}
        </Text>
      </div>
    </div>
  );
}
