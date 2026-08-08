"use client";

import { useState } from "react";
import { ArgsProps } from "antd/es/message";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCourseCommentList,
  postCourseComment,
} from "@/lib/api/school/common/course/routes";
import { CourseCommentRequest } from "@/lib/api/school/common/course/request";
import MessageRow from "./course-message-row";
import FormComment from "@/components/form-item/comment/comment";
import { App, Divider, List, Pagination } from "@/ui/antd";
import { useForm } from "antd/es/form/Form";
import { useSession } from "next-auth/react";
import {
  FEATURE_ADMIN,
  FEATURE_DIRECTOR,
  FEATURE_STUDENT,
  FEATURE_TEACHER,
} from "@/lib/constants/user/feature";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { HttpStatusCode } from "axios";
import { useTranslations } from "next-intl";
import ResultFailed from "@/components/result/result";

export default function CourseCommentSection(props: { id?: number }) {
  // React hooks
  const router = useCustomRouter();
  const [paramPage, setParamPage] = useState(1);
  const [paramLimit, setParamLimit] = useState(10);
  const [form] = useForm();

  // Next hooks
  const session = useSession();
  const tSentences = useTranslations("Sentences");
  const tWords = useTranslations("Words");

  // Tanstack hooks
  const { message: messageInst } = App.useApp();
  const toastMessage = (args: ArgsProps) => {
    messageInst.open(args);
  };
  const queryKeyData = "couse-comments-data";
  const query = useQuery({
    queryKey: [queryKeyData, paramPage, paramLimit],
    queryFn: async () =>
      getCourseCommentList({
        courseID: props.id,
        page: paramPage,
        limit: paramLimit,
      }),
  });
  const mutationAddComment = useMutation({
    mutationFn: async (req: CourseCommentRequest) => postCourseComment(req),
    onSuccess() {
      form.resetFields();
      setParamPage(1);
      query.refetch();
    },
    onError() {
      toastMessage({
        type: "error",
        key: "mutationAddCommentError",
        duration: 5,
        content: tSentences("feedback.add.error", { label: tWords("comment") }),
      });
    },
  });

  const canAddComment = () => {
    const feature = session?.data?.user.feature;
    return (
      feature === FEATURE_ADMIN ||
      feature === FEATURE_DIRECTOR ||
      feature === FEATURE_TEACHER ||
      feature === FEATURE_STUDENT
    );
  };

  const handleRefresh = () => {
    query.refetch();
  };

  return (
    <div className="w-full min-h-52">
      <Divider plain orientation="center">
        {tWords("comments")}
      </Divider>
      <div className="w-full mt-4">
        <FormComment
          loading={mutationAddComment.isPending || query.isLoading}
          fetching={query.isFetching}
          form={form}
          onSubmit={(values) => {
            if (session.status === "loading") {
              return;
            }
            if (session.status === "unauthenticated") {
              router.push("/auth/login");
            }
            if (canAddComment() !== true) {
              toastMessage({
                type: "warning",
                key: "canAddCommentWarning",
                duration: 5,
                content: tSentences("http.error.403"),
              });
              return;
            }
            mutationAddComment.mutate({
              courseID: props.id,
              message: values.message ?? "",
            });
          }}
          onRefresh={handleRefresh}
          style={{
            maxWidth: "100%",
          }}
        />
      </div>
      {query.isLoadingError === true ? (
        <ResultFailed
          status={HttpStatusCode.InternalServerError}
          onRefresh={query.refetch}
        />
      ) : (
        <div>
          <List
            loading={
              query.isLoading ||
              (query.isFetching && (query.data?.data?.data?.length ?? 0) < 1)
            }
            dataSource={query.data?.data?.data ?? []}
            renderItem={(item, index) => (
              <List.Item>
                <MessageRow key={index} item={item} />
              </List.Item>
            )}
          />
          <div className="w-auto mt-6">
            <Pagination
              showQuickJumper
              responsive
              align="center"
              disabled={query.isFetching}
              current={query.data?.data?.pagination?.currentPage ?? 1}
              pageSize={query.data?.data?.pagination?.limit ?? 20}
              total={query.data?.data?.pagination?.count ?? 0}
              onChange={(page: number, pageSize: number) => {
                setParamPage(page);
                setParamLimit(pageSize);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
