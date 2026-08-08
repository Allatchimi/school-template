import { CourseResponse } from "@/lib/api/school/common/course/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexCourse({
  record,
}: {
  record?: CourseResponse;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.title}</TableIndexText>
    </div>
  );
}
