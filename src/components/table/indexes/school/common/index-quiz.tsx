import { QuizResponse } from "@/lib/api/school/common/quiz/response";
import { TableIndexText } from "../../table-index";

export default function TableIndexQuiz({ record }: { record?: QuizResponse }) {
  return (
    <div className="w-auto flex items-center gap-2">
      <TableIndexText>{record?.title}</TableIndexText>
    </div>
  );
}
