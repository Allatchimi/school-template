import { UnitResponse } from "@/lib/api/school/university/unit/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexUnit({ record }: { record?: UnitResponse }) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.name}</TableIndexText>
    </div>
  );
}
