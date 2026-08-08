"use client";

import { DomainResponse } from "@/lib/api/school/university/domain/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelDomain(props: { item?: DomainResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.name ||
            tWords("invalidLabel", { label: tWords("domain") })}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.department?.name ||
            tWords("invalidLabel", { label: tWords("department") })}
        </Text>
      </div>
    </div>
  );
}
