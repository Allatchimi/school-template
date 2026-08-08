"use client";

import TableIndexStudent from "@/components/table/indexes/school/common/index-student";
import { QuizResponse } from "@/lib/api/school/common/quiz/response";
import { getQuizResultList } from "@/lib/api/school/common/quiz/routes";
import { StudentResponse } from "@/lib/api/school/common/student/response";
import { TableColumnsType } from "antd";
import { useQuery } from "@tanstack/react-query";
import { Table, Text } from "@/ui/antd";
import {
  TableColumnObject,
  TableColumnStringNumber,
} from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function DescriptionQuizResult(props: { item?: QuizResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  // Tanstack hooks
  const queryKeyData = "quiz-results";
  const query = useQuery({
    queryKey: [queryKeyData, props.item?.id],
    queryFn: async () =>
      getQuizResultList({
        quizID: props.item?.id,
      }),
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col">
        <Text>{props.item?.title}</Text>
        <Text type="secondary">{props.item?.description}</Text>
        <Text type="secondary">
          {tWords("totalQuestions")}: {props.item?.questions?.length ?? 0}
        </Text>
        <Text type="secondary">
          {tWords("totalStudentss")}: {query.data?.data?.data?.length ?? 0}
        </Text>
      </div>
      <DescriptionQuizResultTable
        loading={query.isPending}
        items={query.data?.data?.data ?? []}
      />
    </div>
  );
}

function DescriptionQuizResultTable(props: {
  loading?: boolean;
  items?: {
    student?: StudentResponse | null;
    result?: number | null;
  }[];
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  const columns: TableColumnsType<{
    student?: StudentResponse | null;
    result?: number | null;
  }> = [
    ...TableColumnObject<object>({
      title: tWords("ranking"),
      dataIndex: "id",
      render(_, index) {
        return <Text>{(index ?? 0) + 1}</Text>;
      },
    }),
    ...TableColumnObject<{
      student?: StudentResponse | null;
      result?: number | null;
    }>({
      title: tWords("student"),
      dataIndex: "students",
      render(record) {
        return <TableIndexStudent record={record?.student ?? undefined} />;
      },
    }),
    ...TableColumnStringNumber<object>({
      title: tWords("score"),
      dataIndex: "results",
    }),
  ];

  return (
    <Table<{
      student?: StudentResponse | null;
      result?: number | null;
    }>
      loading={props.loading}
      columns={columns}
      dataSource={props.items ?? []}
      size="middle"
      rowKey="id"
      tableLayout="auto"
      pagination={false}
      bordered={false}
      showHeader={true}
      showSorterTooltip={false}
    />
  );
}
