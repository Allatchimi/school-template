"use client";

import { QuizResponse } from "@/lib/api/school/common/quiz/response";
import QuizIcon from "@/components/icon/material/quiz";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import {
  QUIZ_STATUS_CLOSED,
  QUIZ_STATUS_PUBLISHED,
  QUIZ_STATUS_RESULT,
} from "@/lib/constants/school/common/quiz";
import CardListCardTemplate, { CardListCardProps } from "../../card-list";
import { SchoolConfig } from "@/config/school";
import { antdTheme, Button, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function QuizCard(
  props: {
    canAnswer?: boolean;
    canSolution?: boolean;
    onAnswerRequested?: (value?: QuizResponse) => void;
    onSolutionRequested?: (value?: QuizResponse) => void;
    onResultsRequested?: (value?: QuizResponse) => void;
  } & CardListCardProps<QuizResponse>
) {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.quiz");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Params
  const icon = <QuizIcon width={30} height={30} color={theme.colorText} />;
  const title =
    props.item?.title || tWords("invalidLabel", { label: tWords("title") });
  const subtitle =
    SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY
      ? props.item?.unit?.name ||
        tWords("invalidLabel", { label: tWords("unit") })
      : props.item?.classSubject?.subject?.name ||
        tWords("invalidLabel", { label: tWords("subject") });
  const createdAt = props.item?.createdAt ?? undefined;
  const updatedAt = props.item?.updatedAt ?? undefined;
  const status = props.item?.status
    ? tEnums(`status.${props.item.status}`)
    : tWords("invalidLabel", { label: tWords("status") });
  const statusColor =
    props.item?.status === QUIZ_STATUS_RESULT
      ? "success"
      : props.item?.status === QUIZ_STATUS_CLOSED
        ? "error"
        : props.item?.status === QUIZ_STATUS_PUBLISHED
          ? "processing"
          : "default";

  return (
    <CardListCardTemplate
      {...props}
      icon={icon}
      title={title}
      subtitle={subtitle}
      createdAt={createdAt}
      updatedAt={updatedAt}
      showStatus={true}
      status={status}
      statusColor={statusColor}
    >
      <div className="w-full h-full flex flex-col justify-between gap-4">
        <div className="w-full">
          <Text className="text-ellipsis line-clamp-1">
            {props.item?.title ||
              tWords("invalidLabel", { label: tWords("title") })}
          </Text>
          <Text type="secondary" className="text-ellipsis line-clamp-3">
            {props.item?.description || tWords("noDescription")}
          </Text>
        </div>
        <div className="w-full flex items-end justify-between gap-2">
          <div className="flex flex-wrap items-center justify-start gap-2">
            <Button
              color="primary"
              variant="filled"
              onClick={() => {
                props.onResultsRequested?.(props.item);
              }}
              className="z-20"
            >
              {tWords("results")}
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {props.canAnswer === true ? (
              <Button
                onClick={() => {
                  props.onAnswerRequested?.(props.item);
                }}
                className="z-20"
              >
                {tWords("answer")}
              </Button>
            ) : undefined}
            {props.canSolution === true ? (
              <Button
                onClick={() => {
                  props.onSolutionRequested?.(props.item);
                }}
                className="z-20"
              >
                {tWords("solution")}
              </Button>
            ) : undefined}
          </div>
        </div>
      </div>
    </CardListCardTemplate>
  );
}
