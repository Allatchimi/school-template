"use client";

import { LevelDomainResponse } from "@/lib/api/school/university/level/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelLevelDomain(props: {
  item?: LevelDomainResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.level?.name ||
            tWords("invalidLabel", { label: tWords("level") })}{" "}
          {props.item?.domain?.name ||
            tWords("invalidLabel", { label: tWords("domain") })}{" "}
          -{" "}
          {props.item?.domain?.department?.name ||
            tWords("invalidLabel", { label: tWords("department") })}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.domain?.department?.faculty?.name ||
            tWords("invalidLabel", { label: tWords("faculty") })}
        </Text>
      </div>
    </div>
  );
}
