"use client";

import { DescriptionQuizResult } from "@/components/description/school/common/description-quiz-result";
import FormAddUpdateQuizAnswer from "@/components/form/school/common/form-add-update-quiz-answer";
import FormAddUpdateQuizSolution from "@/components/form/school/common/form-add-update-quiz-solution";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import { DescriptionTemplateContent } from "@/components/template/description-template";
import {
  QuizAnswerRequest,
  QuizSolutionRequest,
} from "@/lib/api/school/common/quiz/request";
import {
  QuizListResponse,
  QuizResponse,
} from "@/lib/api/school/common/quiz/response";
import {
  postQuizAnswer,
  updateQuizSolution,
} from "@/lib/api/school/common/quiz/routes";
import {
  QUIZ_STATUS_PUBLISHED,
  QUIZ_STATUS_RESULT,
} from "@/lib/constants/school/common/quiz";
import {
  FEATURE_TEACHER,
  FEATURE_ADMIN,
  FEATURE_STUDENT,
  FEATURE_DIRECTOR,
} from "@/lib/constants/user/feature";
import { HttpMessageFromStatus } from "@/components/message/status-message";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { HttpStatusCode } from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import QuizCard from "./quiz-card";
import { CardListProps } from "../../card-list";
import CardListDisplayTemplate from "@/components/template/content-card-list/card-list-display-template";
import { ArgsProps } from "antd/es/message";
import { useTranslations } from "next-intl";

export default function QuizList(
  props: CardListProps<QuizResponse, QuizListResponse>
) {
  // React hooks
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  const [solutionModalOpen, setSolutionModalOpen] = useState(false);
  const [resultsModalOpen, setResultsModalOpen] = useState(false);
  const [itemToAnswer, setItemToAnswer] = useState<QuizResponse>();
  const [itemToSolution, setItemToSolution] = useState<QuizResponse>();
  const [itemToShowResults, setItemToShowResults] = useState<QuizResponse>();

  // Next hooks
  const session = useSession();
  const tSentences = useTranslations("Sentences");
  const tHttpStatus = useTranslations("Sentences.http.error");
  const tWords = useTranslations("Words");

  // Ant design hooks
  const { message: messageInst } = App.useApp();
  const toastMessage = (args: ArgsProps) => {
    messageInst.open(args);
  };

  // Tanstack hooks
  const mutationAnswer = useMutation({
    mutationFn: async (item: QuizAnswerRequest) => postQuizAnswer(item),
    onSuccess() {
      toastMessage({
        type: "success",
        key: "mutationAnswerSuccess",
        duration: 5,
        content: tSentences("feedback.result.common.quizList.successAnswer"),
      });
      setAnswerModalOpen(false);
      setItemToAnswer(undefined);
      props.onRefreshRequested?.();
    },
  });
  const mutationSolution = useMutation({
    mutationFn: async (item: QuizSolutionRequest) => updateQuizSolution(item),
    onSuccess() {
      toastMessage({
        type: "success",
        key: "mutationSolutionSuccess",
        duration: 5,
        content: tSentences("feedback.result.common.quizList.successSolution"),
      });
      setSolutionModalOpen(false);
      setItemToSolution(undefined);
      props.onRefreshRequested?.();
    },
  });

  const canUpdateSolution = () => {
    const feature = session?.data?.user.feature;
    return feature === FEATURE_TEACHER || feature === FEATURE_ADMIN;
  };

  const canAddAnswer = () => {
    const feature = session?.data?.user.feature;
    return feature === FEATURE_STUDENT || feature === FEATURE_ADMIN;
  };

  const handleAnswer = (item?: QuizResponse) => {
    if (item?.status !== QUIZ_STATUS_PUBLISHED) {
      toastMessage({
        type: "warning",
        key: "handleAnswerWarning",
        duration: 5,
        content: tSentences("feedback.result.common.quizList.warningAnswer"),
      });
      return;
    }
    mutationAnswer.reset();
    setItemToAnswer(item);
    setAnswerModalOpen(true);
  };

  const handleSolution = (item?: QuizResponse) => {
    const feature = session?.data?.user.feature;
    if (
      !(
        feature === FEATURE_ADMIN ||
        feature === FEATURE_DIRECTOR ||
        feature === FEATURE_TEACHER
      )
    ) {
      toastMessage({
        type: "warning",
        key: "handleSolutionWarning",
        duration: 5,
        content: tSentences("feedback.result.common.quizList.warningSolution"),
      });
      return;
    }
    mutationSolution.reset();
    setItemToSolution(item);
    setSolutionModalOpen(true);
  };

  const handleResults = (item?: QuizResponse) => {
    const feature = session?.data?.user.feature;
    if (
      !(
        feature === FEATURE_ADMIN ||
        feature === FEATURE_DIRECTOR ||
        feature === FEATURE_TEACHER
      ) &&
      item?.status !== QUIZ_STATUS_RESULT
    ) {
      toastMessage({
        type: "warning",
        key: "handleResultsWarning",
        duration: 5,
        content: tSentences("feedback.result.common.quizList.warningResults"),
      });
      return;
    }
    setItemToShowResults(item);
    setResultsModalOpen(true);
  };

  return (
    <>
      <CardListDisplayTemplate count={props.data?.data?.length}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 custom3xl:grid-cols-5 gap-2.5">
          {props.data?.data?.map((item, index) => {
            return (
              <QuizCard
                key={index}
                item={item}
                canUpdate={props.canUpdate}
                canDelete={props.canDelete}
                canAnswer={canAddAnswer()}
                canSolution={canUpdateSolution()}
                onDescriptionRequested={props.onDescriptionRequested}
                onUpdateRequested={props.onUpdateRequested}
                onDeleteRequested={props.onDeleteRequested}
                onAnswerRequested={handleAnswer}
                onSolutionRequested={handleSolution}
                onResultsRequested={handleResults}
              />
            );
          })}
        </div>
      </CardListDisplayTemplate>

      {/* Answer modal */}
      {canAddAnswer() ? (
        <CustomModalWithoutFooter
          title={`${tSentences("modal.title.answerForQuiz")}: ${
            ((itemToAnswer?.title?.length ?? 0) > 0
              ? itemToAnswer?.title
              : "invalidLabel",
            { label: tWords("title") })
          }`}
          content={
            <FormAddUpdateQuizAnswer
              loading={mutationAnswer.isPending}
              canSubmit={true}
              quiz={itemToAnswer ?? undefined}
              errorMessage={
                mutationAnswer.isError
                  ? HttpMessageFromStatus(
                      (mutationAnswer.error as any)?.response?.data?.status ??
                        HttpStatusCode.InternalServerError,
                      tWords("quizAnswer"),
                      tHttpStatus
                    )
                  : undefined
              }
              onSubmit={(value) => {
                if (!value) {
                  return;
                }
                const newValue = value;
                newValue.id = itemToAnswer?.id;
                mutationAnswer.mutate(newValue);
              }}
              onCancel={() => setAnswerModalOpen(false)}
            />
          }
          modalOpen={answerModalOpen}
          maskClosable={true}
          width={800}
          onOk={() => setAnswerModalOpen(false)}
          onCancel={() => setAnswerModalOpen(false)}
        />
      ) : undefined}

      {/* Solution modal */}
      {canUpdateSolution() ? (
        <CustomModalWithoutFooter
          title={`${tSentences("modal.title.solveForQuiz")}: ${
            ((itemToSolution?.title?.length ?? 0) > 0
              ? itemToSolution?.title
              : "invalidLabel",
            { label: tWords("title") })
          }`}
          content={
            <FormAddUpdateQuizSolution
              loading={mutationSolution.isPending}
              canSubmit={true}
              quiz={itemToSolution}
              item={itemToSolution}
              errorMessage={
                mutationSolution.isError
                  ? HttpMessageFromStatus(
                      (mutationSolution.error as any)?.response?.data?.status ??
                        HttpStatusCode.InternalServerError,
                      tWords("quizSolution"),
                      tHttpStatus
                    )
                  : undefined
              }
              onSubmit={(value) => {
                if (!value) {
                  return;
                }
                const newValue = value;
                newValue.id = itemToSolution?.id;
                mutationSolution.mutate(newValue);
              }}
              onCancel={() => setSolutionModalOpen(false)}
            />
          }
          modalOpen={solutionModalOpen}
          maskClosable={true}
          width={800}
          onOk={() => setSolutionModalOpen(false)}
          onCancel={() => setSolutionModalOpen(false)}
        />
      ) : undefined}

      {/* Results modal */}
      {canUpdateSolution() ? (
        <CustomModalWithoutFooter
          title={`${tSentences("modal.title.resultsForQuiz")}: ${
            ((itemToShowResults?.title?.length ?? 0) > 0
              ? itemToShowResults?.title
              : "invalidLabel",
            { label: tWords("title") })
          }`}
          content={
            <DescriptionTemplateContent
              item={itemToShowResults}
              content={<DescriptionQuizResult item={itemToShowResults} />}
              onClose={() => setResultsModalOpen(false)}
            />
          }
          modalOpen={resultsModalOpen}
          maskClosable={true}
          width={800}
          onOk={() => setResultsModalOpen(false)}
          onCancel={() => setResultsModalOpen(false)}
        />
      ) : undefined}
    </>
  );
}
