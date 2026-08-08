import { RequestResponse } from "@/lib/api/school/common/request/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexRequest({
  record,
}: {
  record?: RequestResponse;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.title}</TableIndexText>
    </div>
  );
}
