"use client";

import AvatarUser from "@/components/avatar/avatar-user";
import { TeacherResponse } from "@/lib/api/school/common/teacher/response";
import { TableIndexText } from "../../table-index";
import { useTranslations } from "next-intl";

export default function TableIndexTeacher({
  record,
}: {
  record?: TeacherResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  const fullName = `${record?.user?.info?.firstName || ""} ${record?.user?.info?.lastName || ""}`;

  return (
    <div className="w-auto flex items-center gap-2">
      <AvatarUser item={record?.user ?? undefined} />
      <TableIndexText maxWidth={"500px"}>
        {record?.uid ||
          tWords("invalidLabel", { label: tWords("uid") })}{" "}
        -{" "}
        {fullName.trim().length < 1
          ? tWords("invalidLabel", { label: tWords("name") })
          : fullName}
      </TableIndexText>
    </div>
  );
}
