"use client";

import { StudentPreEnrollResponse } from "@/lib/api/school/common/student/response";
import AvatarUser from "@/components/avatar/avatar-user";
import { TableIndexText } from "../../table-index";
import { useTranslations } from "next-intl";

export default function TableIndexStudentPreEnroll({
  record,
}: {
  record?: StudentPreEnrollResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  const fullName = `${record?.firstName || ""} ${record?.lastName || ""}`;

  const firstNameSub =
    (record?.firstName?.length ?? 0) > 0
      ? `${record?.firstName?.substring(0, 1)}`
      : "";

  const lastNameSub =
    (record?.lastName?.length ?? 0) > 0
      ? `${record?.lastName?.substring(0, 1)}`
      : "";

  return (
    <div className="w-auto flex items-center gap-2">
      <AvatarUser
        fallbackText={`${firstNameSub}${lastNameSub}`.trim().toUpperCase()}
      />
      <TableIndexText maxWidth={"500px"}>
        {fullName.trim().length < 1
          ? tWords("invalidLabel", { label: tWords("name") })
          : fullName}
      </TableIndexText>
    </div>
  );
}
