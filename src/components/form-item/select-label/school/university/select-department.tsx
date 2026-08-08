"use client";

import { DepartmentResponse } from "@/lib/api/school/university/department/response";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelDepartment(props: {
  item?: DepartmentResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.name ||
            tWords("invalidLabel", { label: tWords("department") })}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.faculty?.name ||
            tWords("invalidLabel", { label: tWords("faculty") })}
        </Text>
      </div>
    </div>
  );
}
