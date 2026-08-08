import { LevelResponse } from "@/lib/api/school/university/level/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexLevel({
  record,
}: {
  record?: LevelResponse;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.name}</TableIndexText>
    </div>
  );
}
