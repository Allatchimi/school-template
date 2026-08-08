import { DomainResponse } from "@/lib/api/school/university/domain/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexDomain({
  record,
}: {
  record?: DomainResponse;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.name}</TableIndexText>
    </div>
  );
}
