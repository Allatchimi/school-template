import { SubjectResponse } from "@/lib/api/school/highschool/subject/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexSubject({
  record,
}: {
  record?: SubjectResponse;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.name}</TableIndexText>
    </div>
  );
}
