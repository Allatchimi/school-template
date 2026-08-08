import { QuarterResponse } from "@/lib/api/school/highschool/quarter/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexQuarter({
  record,
}: {
  record?: QuarterResponse;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.name}</TableIndexText>
    </div>
  );
}
