"use client";

import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
  SCHOOL_TYPES,
} from "@/lib/constants/school/common/school";
import { TableColumnsType } from "antd";
import TableIndexSequence from "../../indexes/school/highschool/index-sequence";
import TableIndexSubject from "../../indexes/school/highschool/index-subject";
import TableIndexSemester from "../../indexes/school/university/index-semester";
import TableIndexUnit from "../../indexes/school/university/index-unit";
import { useTranslations } from "next-intl";

export function TableColumnClassSubjectUnit<T>(props: {
  schoolType?: string;
  showSemester?: boolean;
  showSequence?: boolean;
  isExam?: boolean;
}): TableColumnsType<T> {
  // Next hooks
  const tWords = useTranslations("Words");

  const columns: TableColumnsType<T> =
    props.schoolType && SCHOOL_TYPES.includes(props.schoolType)
      ? [
          props.schoolType === SCHOOL_TYPE_HIGHSCHOOL
            ? {
                title: tWords("subject"),
                dataIndex: "classSubject",
                sorter: false,
                ellipsis: {
                  showTitle: false,
                },
                render: (_, record) => (
                  <TableIndexSubject
                    record={
                      props.isExam === true
                        ? (record as any)?.exam?.classSubject?.subject ||
                          undefined
                        : (record as any)?.classSubject?.subject || undefined
                    }
                  />
                ),
              }
            : {
                title: tWords("unit"),
                dataIndex: "unit",
                sorter: false,
                ellipsis: {
                  showTitle: false,
                },
                render: (_, record) => (
                  <TableIndexUnit
                    record={
                      props.isExam === true
                        ? (record as any)?.exam?.unit || undefined
                        : (record as any)?.unit || undefined
                    }
                  />
                ),
              },
        ]
      : [
          {
            title: tWords("subject"),
            dataIndex: "classSubject",
            sorter: false,
            ellipsis: {
              showTitle: false,
            },
            render: (_, record) => (
              <TableIndexSubject
                record={
                  props.isExam === true
                    ? (record as any)?.exam?.classSubject?.subject || undefined
                    : (record as any)?.classSubject?.subject || undefined
                }
              />
            ),
          },
          {
            title: tWords("unit"),
            dataIndex: "unit",
            sorter: false,
            ellipsis: {
              showTitle: false,
            },
            render: (_, record) => (
              <TableIndexUnit
                record={
                  props.isExam === true
                    ? (record as any)?.exam?.unit || undefined
                    : (record as any)?.unit || undefined
                }
              />
            ),
          },
        ];

  if (
    props.schoolType === SCHOOL_TYPE_HIGHSCHOOL &&
    props.showSequence === true
  ) {
    columns.push({
      title: tWords("sequence"),
      dataIndex: "sequence",
      sorter: false,
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => (
        <TableIndexSequence
          record={
            props.isExam === true
              ? (record as any)?.exam?.sequence || undefined
              : (record as any)?.sequence || undefined
          }
        />
      ),
    });
  }
  if (
    (props.schoolType === SCHOOL_TYPE_UNIVERSITY && props.showSemester) === true
  ) {
    columns.push({
      title: tWords("semester"),
      dataIndex: "semester",
      sorter: false,
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => (
        <TableIndexSemester
          record={
            props.isExam === true
              ? (record as any)?.exam?.unit?.semester || undefined
              : (record as any)?.unit?.semester || undefined
          }
        />
      ),
    });
  }
  return columns;
}
