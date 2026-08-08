import { SpecialtyResponse } from "@/lib/api/school/highschool/specialty/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexSpecialty({
  record,
}: {
  record?: SpecialtyResponse;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.name}</TableIndexText>
    </div>
  );
}
