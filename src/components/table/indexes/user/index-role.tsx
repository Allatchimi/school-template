import { RoleResponse } from "@/lib/api/user/role/response";
import { TableIndexText } from "../table-index";

export default function TableIndexRole({ record }: { record?: RoleResponse }) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.name}</TableIndexText>
    </div>
  );
}
