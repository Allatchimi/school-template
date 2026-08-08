import { FacultyResponse } from "@/lib/api/school/university/faculty/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexFaculty({
  record,
}: {
  record?: FacultyResponse;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.name}</TableIndexText>
    </div>
  );
}
