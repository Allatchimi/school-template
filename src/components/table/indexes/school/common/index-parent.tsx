"use client";

import { ParentResponse } from "@/lib/api/school/common/parent/response";
import AvatarUser from "@/components/avatar/avatar-user";
import { TableIndexText } from "../../table-index";
import { useTranslations } from "next-intl";

export default function TableIndexParent({
  record,
}: {
  record?: ParentResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  const fullName = `${record?.user?.info?.firstName || ""} ${record?.user?.info?.lastName || ""}`;

  return (
    <div className="w-auto flex items-center gap-2">
      <AvatarUser item={record?.user ?? undefined} />
      <TableIndexText maxWidth={"500px"}>
        {fullName.trim().length < 1
          ? tWords("invalidLabel", {
              label: tWords("name"),
            })
          : fullName}
      </TableIndexText>
    </div>
  );
}
