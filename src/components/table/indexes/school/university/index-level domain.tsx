import { LevelDomainResponse } from "@/lib/api/school/university/level/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexLevelDomain({
  record,
}: {
  record?: LevelDomainResponse;
}) {
  const department = record?.domain?.department?.name ?? "";
  const faculty = record?.domain?.department?.faculty?.name ?? "";
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>
        {record?.level?.name} {record?.domain?.name}
        {department.length > 0 ? " - " + department : ""}
        {faculty.length > 0 ? ", " + faculty : ""}
      </TableIndexText>
    </div>
  );
}
