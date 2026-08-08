import { ResultResponse } from "@/lib/api/school/common/result/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexResult({
  record,
}: {
  record?: ResultResponse;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.score}</TableIndexText>
    </div>
  );
}

export function TableIndexResultPercentage({
  record,
}: {
  record?: ResultResponse;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.exam?.percentage}%</TableIndexText>
    </div>
  );
}

export function TableIndexResultScore({ record }: { record?: ResultResponse }) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>
        {record?.score}/{record?.exam?.notation}
      </TableIndexText>
    </div>
  );
}
