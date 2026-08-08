import { ClassResponse } from "@/lib/api/school/highschool/class/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexClass({
  record,
}: {
  record?: ClassResponse;
}) {
  const specialty = record?.specialty?.name ?? "";
  const section = record?.specialty?.section?.name ?? "";
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>
        {record?.name}
        {specialty.length > 0 ? " - " + specialty : ""}
        {section.length > 0 ? ", " + section : ""}
      </TableIndexText>
    </div>
  );
}
