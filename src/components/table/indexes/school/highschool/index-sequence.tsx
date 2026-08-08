import { SequenceResponse } from "@/lib/api/school/highschool/sequence/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexSequence({
  record,
}: {
  record?: SequenceResponse;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.name}</TableIndexText>
    </div>
  );
}
