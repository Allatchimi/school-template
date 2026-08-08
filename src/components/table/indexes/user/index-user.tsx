"use client";

import { UserResponse } from "@/lib/api/user/user/response";
import AvatarUser from "@/components/avatar/avatar-user";
import { TableIndexText } from "../table-index";
import { useTranslations } from "next-intl";

export default function TableIndexUser({ record }: { record?: UserResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  const fullName = `${record?.info?.firstName || ""} ${record?.info?.lastName || ""}`;

  return (
    <div className="w-auto flex items-center gap-2">
      <AvatarUser item={record ?? undefined} />
      <TableIndexText maxWidth={"500px"}>
        {fullName.trim().length < 1
          ? tWords("invalidLabel", { label: tWords("name") })
          : fullName}
      </TableIndexText>
    </div>
  );
}
