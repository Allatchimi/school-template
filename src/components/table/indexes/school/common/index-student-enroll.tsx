"use client";

import { StudentEnrollResponse } from "@/lib/api/school/common/student/response";
import AvatarUser from "@/components/avatar/avatar-user";
import { TableIndexText } from "../../table-index";
import { useTranslations } from "next-intl";

export default function TableIndexStudentEnroll({
  record,
}: {
  record?: StudentEnrollResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  const fullName = `${record?.student?.user?.info?.firstName || ""} ${record?.student?.user?.info?.lastName || ""}`;

  const firstNameSub =
    (record?.student?.user?.info?.firstName?.length ?? 0) > 0
      ? `${record?.student?.user?.info?.firstName?.substring(0, 1)}`
      : "";

  const lastNameSub =
    (record?.student?.user?.info?.lastName?.length ?? 0) > 0
      ? `${record?.student?.user?.info?.lastName?.substring(0, 1)}`
      : "";

  return (
    <div className="w-auto flex items-center gap-2">
      <AvatarUser
        fallbackText={`${firstNameSub}${lastNameSub}`.trim().toUpperCase()}
      />
      <TableIndexText maxWidth={"500px"}>
        {record?.student?.uid ||
          tWords("invalidLabel", { label: tWords("uid") })}{" "}
        -{" "}
        {fullName.trim().length < 1
          ? tWords("invalidLabel", { label: tWords("name") })
          : fullName}
      </TableIndexText>
    </div>
  );
}
