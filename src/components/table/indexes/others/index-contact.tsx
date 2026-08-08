"use client";

import { ContactResponse } from "@/lib/api/others/contact/response";
import { TableIndexText } from "../table-index";
import { useTranslations } from "next-intl";

export default function TableIndexContact({
  record,
}: {
  record?: ContactResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>
        {record?.subject ||
          tWords("invalidLabel", { label: tWords("topic").toLowerCase() })}
      </TableIndexText>
    </div>
  );
}
