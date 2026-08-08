"use client";

import FormAddUpdateRequestStatus from "@/components/form/school/common/form-add-update-request-status";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import { RequestStatusRequest } from "@/lib/api/school/common/request/request";
import {
  RequestListResponse,
  RequestResponse,
} from "@/lib/api/school/common/request/response";
import { updateRequestStatus } from "@/lib/api/school/common/request/routes";
import {
  REQUEST_AUDIENCE_TEACHER,
  REQUEST_AUDIENCE_DIRECTOR,
} from "@/lib/constants/school/common/request";
import {
  FEATURE_TEACHER,
  FEATURE_DIRECTOR,
  FEATURE_ADMIN,
} from "@/lib/constants/user/feature";
import { HttpMessageFromStatus } from "@/components/message/status-message";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { HttpStatusCode } from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import RequestCard from "./request-card";
import { CardListProps } from "../../card-list";
import CardListDisplayTemplate from "@/components/template/content-card-list/card-list-display-template";
import { ArgsProps } from "antd/es/message";
import { useTranslations } from "next-intl";

export default function RequestList(
  props: CardListProps<RequestResponse, RequestListResponse>
) {
  // React hooks
  const [updateStatusModalOpen, setUpdateStatusModalOpen] = useState(false);
  const [itemToUpdateStatus, setItemToUpdateStatus] =
    useState<RequestResponse>();

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
  const mutationUpdateStatus = useMutation({
    mutationFn: async (item: RequestStatusRequest) => updateRequestStatus(item),
    onSuccess() {
      toastMessage({
        type: "success",
        key: "mutationUpdateStatusSuccess",
        duration: 5,
        content: tSentences("feedback.result.common.requestList.success"),
      });
      setUpdateStatusModalOpen(false);
      setItemToUpdateStatus(undefined);
      props.onRefreshRequested?.();
    },
  });

  const handleUpdateStatus = (item?: RequestResponse) => {
    mutationUpdateStatus.reset();
    setItemToUpdateStatus(item);
    setUpdateStatusModalOpen(true);
  };

  const canUpdateStatus = () => {
    const feature = session?.data?.user.feature;
    return (
      (feature === FEATURE_TEACHER &&
        itemToUpdateStatus?.audience === REQUEST_AUDIENCE_TEACHER) ||
      (feature === FEATURE_DIRECTOR &&
        itemToUpdateStatus?.audience === REQUEST_AUDIENCE_DIRECTOR) ||
      feature === FEATURE_ADMIN
    );
  };

  return (
    <>
      <CardListDisplayTemplate count={props.data?.data?.length}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 custom3xl:grid-cols-5 gap-2.5">
          {props.data?.data?.map((item, index) => {
            return (
              <RequestCard
                key={index}
                item={item}
                canUpdate={props.canUpdate}
                canDelete={props.canDelete}
                canUpdateStatus={canUpdateStatus()}
                onDescriptionRequested={props.onDescriptionRequested}
                onUpdateRequested={props.onUpdateRequested}
                onDeleteRequested={props.onDeleteRequested}
                onUpdateStatusRequested={handleUpdateStatus}
              />
            );
          })}
        </div>
      </CardListDisplayTemplate>

      {/* Update status modal */}
      {canUpdateStatus() ? (
        <CustomModalWithoutFooter
          title={`${tSentences("modal.title.updateStatusForRequest")}: ${
            ((itemToUpdateStatus?.title?.length ?? 0) > 0
              ? itemToUpdateStatus?.title
              : "invalidLabel",
            { label: tWords("title") })
          }`}
          content={
            <FormAddUpdateRequestStatus
              loading={mutationUpdateStatus.isPending}
              canSubmit={true}
              item={itemToUpdateStatus}
              errorMessage={
                mutationUpdateStatus.isError
                  ? HttpMessageFromStatus(
                      (mutationUpdateStatus.error as any)?.response?.data
                        ?.status ?? HttpStatusCode.InternalServerError,
                      tWords("request"),
                      tHttpStatus
                    )
                  : undefined
              }
              onSubmit={(value) => {
                if (!value) {
                  return;
                }
                const newValue = value;
                newValue.id = itemToUpdateStatus?.id;
                mutationUpdateStatus.mutate(newValue);
              }}
              onCancel={() => setUpdateStatusModalOpen(false)}
            />
          }
          modalOpen={updateStatusModalOpen}
          maskClosable={true}
          width={800}
          onOk={() => setUpdateStatusModalOpen(false)}
          onCancel={() => setUpdateStatusModalOpen(false)}
        />
      ) : undefined}
    </>
  );
}
