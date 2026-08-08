"use client";

import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function DefaultTableHeaderInfo(props: {
  showSelection?: boolean;
  selectedItemsCount?: number;
  currentPage?: number;
  totalPages?: number;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
      {props.showSelection === true ? (
        <Text code className="maw-w-[300px] text-ellipsis line-clamp-1">
          {props.selectedItemsCount ?? 0} {tWords("selectedItems")}
        </Text>
      ) : (
        <div></div>
      )}
      <Text code className="maw-w-[300px] text-ellipsis line-clamp-1">
        {tWords("page")} {props.currentPage ?? 1}/{props.totalPages ?? 1}
      </Text>
    </div>
  );
}
