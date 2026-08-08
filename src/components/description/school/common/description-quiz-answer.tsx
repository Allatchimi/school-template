"use client";

import {
  QuizQuestionOptionResponse,
  QuizQuestionResponse,
  QuizResponse,
} from "@/lib/api/school/common/quiz/response";
import { getQuizAnswerList } from "@/lib/api/school/common/quiz/routes";
import { TableColumnsType } from "antd";
import { useQuery } from "@tanstack/react-query";
import { Table, Text } from "@/ui/antd";
import { TableColumnObject } from "@/components/table/column/column-types";
import { QuizQuestionProps } from "./description-quiz-question";
import { useTranslations } from "next-intl";

export function DescriptionQuizAnswers(props: { item?: QuizResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  // Tanstack hooks
  const queryKeyData = "quiz-answers";
  const query = useQuery({
    queryKey: [queryKeyData, props.item?.id],
    queryFn: async () =>
      getQuizAnswerList({
        quizID: props.item?.id,
      }),
  });

  return query.data?.data?.data?.map((item, index) => {
    return (
      <div key={index} className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col">
          <Text>{props.item?.title}</Text>
          <Text type="secondary">{props.item?.description}</Text>
        </div>
        <div className="w-full flex flex-col">
          <Text>{tWords("student")}</Text>
          <Text type="secondary">
            {item.student?.user?.info?.firstName}{" "}
            {item.student?.user?.info?.lastName} ({item.student?.uid})
          </Text>
        </div>
        <DescriptionQuizAnswersTable
          key={index}
          loading={query.isPending}
          items={item.answers ?? []}
        />
      </div>
    );
  });
}

export function DescriptionQuizAnswersTable(props: {
  loading?: boolean;
  items?: {
    question?: QuizQuestionResponse | null;
    answer?: QuizQuestionOptionResponse | null;
  }[];
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  const columns: TableColumnsType<QuizQuestionProps> = [
    ...TableColumnObject<object>({
      title: tWords("number"),
      dataIndex: "id",
      render(_, index) {
        return <Text>{(index ?? 0) + 1}</Text>;
      },
    }),
    ...TableColumnObject<QuizQuestionProps>({
      title: tWords("question"),
      dataIndex: "question",
      render(record) {
        return (
          <div className="flex flex-col gap-2">
            <Text>{record?.question?.title}</Text>
            <Text type="secondary">{record?.question?.description}</Text>
          </div>
        );
      },
    }),
    ...TableColumnObject<QuizQuestionProps>({
      title: tWords("answer"),
      dataIndex: "answer",
      render(record) {
        return (
          <div className="flex flex-col gap-2">
            <Text>{record?.answer?.title}</Text>
            <Text type="secondary">{record?.answer?.description}</Text>
          </div>
        );
      },
    }),
  ];

  return (
    <Table<{
      question?: QuizQuestionResponse | null;
      answer?: QuizQuestionOptionResponse | null;
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
