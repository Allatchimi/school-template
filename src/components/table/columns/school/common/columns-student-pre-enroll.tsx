"use client";

import TableIndexStudentPreEnroll from "@/components/table/indexes/school/common/index-student-pre-enroll";
import { StudentPreEnrollResponse } from "@/lib/api/school/common/student/response";
import { TableColumnsType } from "antd";
import { TableColumnClassLevelDomain } from "../../../column/school/column-class-level-domain";
import {
  STUDENT_PRE_ENROLL_STATUS_ENROLLED,
  STUDENT_PRE_ENROLL_STATUS_PENDING,
  STUDENT_PRE_ENROLL_STATUS_REJECTED,
} from "@/lib/constants/school/common/student";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnYear } from "../../../column/school/column-year";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnObject,
  TableColumnStatus,
} from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsStudentPreEnroll(
  props: TableColumnsProps
): TableColumnsType<StudentPreEnrollResponse> {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.student.preEnrollStatus");

  return [
    ...TableColumnID<StudentPreEnrollResponse>({ ...props }),
    ...TableColumnObject<StudentPreEnrollResponse>({
      ...props,
      title: tWords("user"),
      render(record) {
        return <TableIndexStudentPreEnroll record={record} />;
      },
    }),
    ...TableColumnSchool<StudentPreEnrollResponse>(props.schoolType),
    ...TableColumnYear<StudentPreEnrollResponse>(props.yearID),
    ...TableColumnClassLevelDomain<StudentPreEnrollResponse>({
      schoolType: props.schoolType,
    }),
    ...TableColumnStatus<StudentPreEnrollResponse>({
      ...props,
      sorter: true,
      render(record) {
        return tEnums(record?.status ?? "");
      },
      renderColor(record) {
        return record?.status === STUDENT_PRE_ENROLL_STATUS_ENROLLED
          ? "success"
          : record?.status === STUDENT_PRE_ENROLL_STATUS_PENDING
            ? "processing"
            : record?.status === STUDENT_PRE_ENROLL_STATUS_REJECTED
              ? "error"
              : "default";
      },
    }),
    ...TableColumnUpdatedAt<StudentPreEnrollResponse>({ ...props }),
  ];
}
