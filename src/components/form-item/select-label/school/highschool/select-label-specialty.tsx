"use client";

import { SpecialtyResponse } from "@/lib/api/school/highschool/specialty/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelSpecialty(props: {
  item?: SpecialtyResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.name ||
            tWords("invalidLabel", { label: tWords("specialty") })}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.section?.name ||
            tWords("invalidLabel", { label: tWords("section") })}
        </Text>
      </div>
    </div>
  );
}
