"use client";

import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPES,
} from "@/lib/constants/school/common/school";
import { TableColumnsType } from "antd";
import TableIndexClass from "../../indexes/school/highschool/index-class";
import TableIndexLevelDomain from "../../indexes/school/university/index-level domain";
import { useTranslations } from "next-intl";

export function TableColumnClassLevelDomain<T>(props: {
  schoolType?: string;
  isStudentEnroll?: boolean;
  isClassSubjectUnit?: boolean;
  isExam?: boolean;
}): TableColumnsType<T> {
  // Next hooks
  const tWords = useTranslations("Words");

  const columns: TableColumnsType<T> =
    props.schoolType && SCHOOL_TYPES.includes(props.schoolType)
      ? [
          props.schoolType === SCHOOL_TYPE_HIGHSCHOOL
            ? {
                title: tWords("class"),
                sorter: false,
                ellipsis: {
                  showTitle: false,
                },
                render: (_, tempRecord) => {
                  const record =
                    props.isExam === true
                      ? (tempRecord as any)?.exam
                      : tempRecord;
                  return (
                    <TableIndexClass
                      record={
                        props.isStudentEnroll === true
                          ? (record as any)?.studentEnroll?.class || undefined
                          : props.isClassSubjectUnit === true
                            ? (record as any)?.classSubject?.class || undefined
                            : (record as any)?.class || undefined
                      }
                    />
                  );
                },
              }
            : {
                title: tWords("levelDomain"),
                sorter: false,
                ellipsis: {
                  showTitle: false,
                },
                render: (_, tempRecord) => {
                  const record =
                    props.isExam === true
                      ? (tempRecord as any)?.exam
                      : tempRecord;
                  return (
                    <TableIndexLevelDomain
                      record={
                        props.isStudentEnroll === true
                          ? (record as any)?.studentEnroll?.levelDomain ||
                            undefined
                          : props.isClassSubjectUnit === true
                            ? (record as any)?.unit?.levelDomain || undefined
                            : (record as any)?.levelDomain || undefined
                      }
                    />
                  );
                },
              },
        ]
      : [
          {
            title: tWords("class"),
            sorter: false,
            ellipsis: {
              showTitle: false,
            },
            render: (_, tempRecord) => {
              const record =
                props.isExam === true ? (tempRecord as any)?.exam : tempRecord;
              return (
                <TableIndexClass
                  record={
                    props.isStudentEnroll === true
                      ? (record as any)?.studentEnroll?.class || undefined
                      : props.isClassSubjectUnit === true
                        ? (record as any)?.classSubject?.class || undefined
                        : (record as any)?.class || undefined
                  }
                />
              );
            },
          },
          {
            title: tWords("levelDomain"),
            sorter: false,
            ellipsis: {
              showTitle: false,
            },
            render: (_, tempRecord) => {
              const record =
                props.isExam === true ? (tempRecord as any)?.exam : tempRecord;
              return (
                <TableIndexLevelDomain
                  record={
                    props.isStudentEnroll === true
                      ? (record as any)?.studentEnroll?.levelDomain || undefined
                      : props.isClassSubjectUnit === true
                        ? (record as any)?.unit?.levelDomain || undefined
                        : (record as any)?.levelDomain || undefined
                  }
                />
              );
            },
          },
        ];

  return columns;
}
