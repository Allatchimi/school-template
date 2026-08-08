"use client";

import { PermissionResponse } from "@/lib/api/user/permission/response";
import { TableIndexText } from "../table-index";
import { useTranslations } from "next-intl";

export default function TableIndexPermission({
  record,
}: {
  record?: PermissionResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>
        {record?.tableName || tWords("invalidLabel", { label: tWords("table") })}{" "}
        ({record?.create === true ? "c" : "-"}
        {record?.read === true ? "r" : "-"}
        {record?.update === true ? "u" : "-"}
        {record?.delete === true ? "d" : "-"})
      </TableIndexText>
    </div>
  );
}
