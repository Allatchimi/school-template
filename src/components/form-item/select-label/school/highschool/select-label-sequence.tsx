"use client";

import { SequenceResponse } from "@/lib/api/school/highschool/sequence/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelSequence(props: {
  item?: SequenceResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.name ||
            tWords("invalidLabel", { label: tWords("sequence") })}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.quarter?.name ||
            tWords("invalidLabel", { label: tWords("quarter") })}
        </Text>
      </div>
    </div>
  );
}
