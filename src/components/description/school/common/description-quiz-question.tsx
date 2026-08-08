"use client";

import {
  QuizQuestionOptionResponse,
  QuizQuestionResponse,
} from "@/lib/api/school/common/quiz/response";
import { TableColumnsType } from "antd";
import { Table, List, ListItem, ListItemMeta, Text } from "@/ui/antd";
import { TableColumnObject } from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export interface QuizQuestionProps {
  question?: QuizQuestionResponse | null;
  options?: QuizQuestionOptionResponse[] | null;
  answer?: QuizQuestionOptionResponse | null;
}

export function DescriptionQuizQuestions(props: {
  loading?: boolean;
  items?: {
    question?: QuizQuestionResponse | null;
    options?: QuizQuestionOptionResponse[] | null;
  }[];
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  const columns: TableColumnsType<QuizQuestionProps> = [
    ...TableColumnObject<QuizQuestionProps>({
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
      title: tWords("options"),
      dataIndex: "options",
      render(record) {
        return (
          <DescriptionQuizQuestionOptions
            items={record?.options ?? undefined}
          />
        );
      },
    }),
    ...TableColumnObject<QuizQuestionProps>({
      title: tWords("solution"),
      dataIndex: "solution",
      render(record) {
        return (
          <div className="flex flex-col gap-2">
            <Text>{record?.question?.solution?.title}</Text>
            <Text type="secondary">
              {record?.question?.solution?.description}
            </Text>
          </div>
        );
      },
    }),
  ];
  return (
    <Table<{
      question?: QuizQuestionResponse | null;
      options?: QuizQuestionOptionResponse[] | null;
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

function DescriptionQuizQuestionOptions(props: {
  items?: QuizQuestionOptionResponse[];
}) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.items ?? []}
      renderItem={(item, index) => (
        <ListItem key={index}>
          <ListItemMeta
            title={(item?.title?.length ?? 0) > 0 ? item?.title : ""}
            description={
              (item?.description?.length ?? 0) > 0
                ? item?.description
                : undefined
            }
          />
        </ListItem>
      )}
    />
  );
}
