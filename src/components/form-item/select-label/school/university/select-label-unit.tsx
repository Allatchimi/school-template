"use client";

import { UnitResponse } from "@/lib/api/school/university/unit/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelUnit(props: { item?: UnitResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.name ||
            tWords("invalidLabel", { label: tWords("unit") })}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.levelDomain?.level?.name ||
            tWords("invalidLabel", { label: tWords("level") })}{" "}
          {props.item?.levelDomain?.domain?.name ||
            tWords("invalidLabel", { label: tWords("domain") })}{" "}
          -{" "}
          {props.item?.levelDomain?.domain?.department?.name ||
            tWords("invalidLabel", { label: tWords("department") })}{" "}
        </Text>
        <div>
          <span className="w-auto text-ellipsis opacity-50 text-xs">
            {props.item?.levelDomain?.domain?.department?.faculty?.name ||
              tWords("invalidLabel", { label: tWords("faculty") })}
          </span>
        </div>
      </div>
    </div>
  );
}
