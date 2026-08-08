import { SemesterResponse } from "@/lib/api/school/university/semester/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexSemester({
  record,
}: {
  record?: SemesterResponse;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.name}</TableIndexText>
    </div>
  );
}
