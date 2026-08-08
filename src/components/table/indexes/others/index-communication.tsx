"use client";

import { CommunicationResponse } from "@/lib/api/others/communication/response";
import { TableIndexText } from "../table-index";
import { useTranslations } from "next-intl";

export default function TableIndexCommunication({
  record,
}: {
  record?: CommunicationResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>
        {record?.subject ||
          tWords("invalidLabel", {
            label: tWords("topic").toLowerCase(),
          })}{" "}
        (
        {record?.role?.name ||
          tWords("invalidLabel", { label: tWords("audience").toLowerCase() })}
        )
      </TableIndexText>
    </div>
  );
}
