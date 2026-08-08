import { SectionResponse } from "@/lib/api/school/highschool/section/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexSection({
  record,
}: {
  record?: SectionResponse;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.name}</TableIndexText>
    </div>
  );
}
