"use client";

import {
  StudentListResponse,
  StudentResponse,
} from "@/lib/api/school/common/student/response";
import StudentCard from "./student-card";
import { CardListProps } from "../../card-list";

export default function StudentList(
  props: {
    onAssignClicked?: (value?: StudentResponse) => void;
  } & CardListProps<StudentResponse, StudentListResponse>,
) {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 custom3xl:grid-cols-6 gap-2.5">
      {props.data?.data?.map((item, index) => {
        return (
          <StudentCard
            key={index}
            item={item}
            onAssignClicked={props.onAssignClicked}
          />
        );
      })}
    </div>
  );
}
