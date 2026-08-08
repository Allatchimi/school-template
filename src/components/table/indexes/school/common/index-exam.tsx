import {
  ExamResponse,
  ExamTypeResponse,
} from "@/lib/api/school/common/exam/response";
import { TableIndexText } from "../../table-index";

export function TableIndexExam({ record }: { record?: ExamResponse }) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.type?.name}</TableIndexText>
    </div>
  );
}

export function TableIndexExamType({ record }: { record?: ExamTypeResponse }) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.name}</TableIndexText>
    </div>
  );
}

export function TableIndexExamPercentage({
  record,
}: {
  record?: ExamResponse;
}) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.percentage}%</TableIndexText>
    </div>
  );
}

export function TableIndexExamNotation({ record }: { record?: ExamResponse }) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>/{record?.notation}</TableIndexText>
    </div>
  );
}
