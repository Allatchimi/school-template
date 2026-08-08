import { YearResponse } from "@/lib/api/school/common/year/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexYear({ record }: { record?: YearResponse }) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.name}</TableIndexText>
    </div>
  );
}
