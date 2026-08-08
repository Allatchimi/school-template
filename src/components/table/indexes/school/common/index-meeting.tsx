import { MeetingResponse } from "@/lib/api/school/common/meeting/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexMeeting({
  record,
}: {
  record?: MeetingResponse;
}) {
  const classSubjectUnit =
    record?.classSubject?.subject?.name || record?.unit?.name;
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{classSubjectUnit}</TableIndexText>
    </div>
  );
}
