"use client";

import { ReactNode, Suspense, useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArgsProps } from "antd/es/message";
import {
  AxiosError,
  AxiosResponse,
  GenericAbortSignal,
  HttpStatusCode,
} from "axios";
import { HttpMessageFromStatus } from "@/components/message/status-message";
import {
  getSearchParamFromObjectType,
  setMultipleSearchParam,
  setMultipleSearchParamFromObject,
} from "@/helpers/url/search-param";
import { DownloadRequest } from "@/lib/api/others/upload-download/request";
import { useCustomRouter } from "@/hooks/use-custom-router";
import DefaultFilters, {
  FilterType,
} from "@/components/filter/default-filters";
import { DownloadResponse } from "@/lib/api/others/upload-download/response";
import { SelectOptionType } from "@/components/form-item/select/select";
import { IDType } from "@/types/http/base-response";
import { useSearchParams } from "next/navigation";
import { DescriptionsProps } from "antd";
import { App, Pagination } from "@/ui/antd";
import { CardListTemplateProps } from "./card-list-template";
import dynamic from "next/dynamic";
import LoaderCardListTemplate from "@/components/loader/loader-card-list-template";
import FormDownload from "@/components/form/others/form-download";
import DescriptionTemplate from "../description-template";
import FormAddUpdateTemplate from "../form-add-update-template";
import { useTranslations } from "next-intl";

const CardListTemplateLazy = dynamic<CardListTemplateProps<any, any>>(
  () => import("./card-list-template"),
  { ssr: false }
);

const CustomModalWithoutFooterLazy = dynamic(
  () => import("@/components/modal/custom-without-footer"),
  { ssr: false }
);

const DeleteModalLazy = dynamic(() => import("@/components/modal/delete"), {
  ssr: false,
});

export interface ContentCardListTemplateInternalProps<
  TReq extends object,
  TResp extends object,
  TListReq extends object,
  TListResp extends object,
  TSearchParam extends Partial<FilterType> | undefined,
> {
  itemLabel?: string;
  queryKeyData?: string;
  canAdd?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canDownload?: boolean;
  dialogDescriptionWidth?: number;
  dialogFormAddUpdateWidth?: number;
  filterTemplate?: TSearchParam;
  filterOrderByList?: SelectOptionType<string>[];
  returnExtraFilterNode?: (
    values?: TSearchParam,
    loading?: boolean
  ) => ReactNode;
  areEqual?: (b?: TReq, a?: TResp) => boolean | null | undefined;
  returnDescriptionsNode?: (
    item?: TResp
  ) => { title?: string; description?: DescriptionsProps["items"] }[];
  returnFormAddUpdateNode?: (props: {
    loading?: boolean;
    disabled?: boolean;
    formName?: string;
    item?: TResp;
    canSubmit?: boolean;
    errorMessage?: string;
    onValuesChange?: (value?: TReq) => void;
    onSubmit?: (value?: TReq) => void;
    onCancel?: () => void;
  }) => ReactNode;
  returnItemListNode?: (props: {
    data?: TListResp;
    canUpdate?: boolean;
    canDelete?: boolean;
    onDescriptionRequested?: (value?: TResp) => void;
    onUpdateRequested?: (value?: TResp) => void;
    onDeleteRequested?: (value?: TResp) => void;
  }) => ReactNode;
  getItemList?: (
    params: TListReq,
    signal?: GenericAbortSignal
  ) => Promise<AxiosResponse<TListResp | null | undefined, any>>;
  postItem?: (
    item: TReq
  ) => Promise<AxiosResponse<TResp | null | undefined, any>>;
  updateItem?: (
    params: TReq
  ) => Promise<AxiosResponse<TResp | null | undefined, any>>;
  deleteItem?: (
    id: IDType
  ) => Promise<AxiosResponse<number | null | undefined, any>>;
  downloadData?: (
    params: DownloadRequest
  ) => Promise<AxiosResponse<DownloadResponse | null | undefined, any>>;
}

export default function ContentCardListTemplateInternal<
  TReq extends object,
  TResp extends object,
  TListReq extends object,
  TListResp extends object,
  TSearchParam extends Partial<FilterType> | undefined = undefined,
>(
  props: ContentCardListTemplateInternalProps<
    TReq,
    TResp,
    TListReq,
    TListResp,
    TSearchParam
  >
) {
  // React hooks
  const router = useCustomRouter();
  const searchParams = useSearchParams();
  // Add, describe and update item states
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [modalAddMounted, setModalAddMounted] = useState(false);
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [modalUpdateMounted, setModalUpdateMounted] = useState(false);
  const [canSubmitUpdate, setCanSubmitUpdate] = useState(false);
  const [itemToDescribe, setItemToDescribe] = useState<TResp>();
  const [itemToUpdate, setItemToUpdate] = useState<TResp>();
  // Delete item states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<TResp>();
  // Download
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  // Url
  const [url, setUrl] = useState("");
  // Filter
  const filterDefaultValue = getSearchParamFromObjectType<TSearchParam>(
    searchParams,
    props.filterTemplate
  );

  // Next hooks
  const tFeedback = useTranslations("Sentences.feedback");
  const tHttpStatus = useTranslations("Sentences.http.error");
  const tModal = useTranslations("Sentences.modal");

  // Ant design hooks
  const { message: messageInst } = App.useApp();
  const toastMessage = (args: ArgsProps) => {
    messageInst.open(args);
  };

  // Tanstack hooks
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [props.queryKeyData, ...Object.values(filterDefaultValue ?? {})],
    queryFn: async () =>
      props.getItemList?.({
        ...(filterDefaultValue ?? {}),
      } as TListReq),
  });
  const mutationAdd = useMutation({
    mutationFn: async (item: TReq) => props.postItem?.(item),
    onSuccess() {
      toastMessage({
        type: "success",
        content: tFeedback("add.success", { label: props.itemLabel ?? "" }),
        key: "mutationAddSuccess",
        duration: 5,
      });
      invalidateQueries();
      setAddModalOpen(false);
    },
    onError(error) {
      const errStatus =
        (error as AxiosError | undefined)?.status ??
        HttpStatusCode.InternalServerError;
      if (errStatus < 500) {
        const msg = HttpMessageFromStatus(
          errStatus,
          `${props.itemLabel}`,
          tHttpStatus
        );
        toastMessage({
          type: "error",
          content: msg,
          key: "mutationAddError",
          duration: 5,
        });
      }
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: async (params: TReq) => props.updateItem?.(params),
    onSuccess() {
      toastMessage({
        type: "success",
        content: tFeedback("update.success", { label: props.itemLabel ?? "" }),
        key: "mutationUpdateSuccess",
        duration: 5,
      });
      invalidateQueries();
      setUpdateModalOpen(false);
      setItemToUpdate(undefined);
      setCanSubmitUpdate(false);
    },
    onError(error) {
      const errStatus =
        (error as AxiosError | undefined)?.status ??
        HttpStatusCode.InternalServerError;
      if (errStatus < 500) {
        const msg = HttpMessageFromStatus(
          errStatus,
          `${props.itemLabel}`,
          tHttpStatus
        );
        toastMessage({
          type: "error",
          content: msg,
          key: "mutationUpdateError",
          duration: 5,
        });
      }
    },
  });
  const mutationDelete = useMutation({
    mutationFn: async (id: IDType) => props.deleteItem?.(id),
    onSuccess() {
      toastMessage({
        type: "success",
        content: tFeedback("delete.success", { label: props.itemLabel ?? "" }),
        key: "mutationDeleteSuccess",
        duration: 5,
      });
      invalidateQueries();
      setDeleteModalOpen(false);
    },
    onError(error) {
      const errStatus =
        (error as AxiosError | undefined)?.status ??
        HttpStatusCode.InternalServerError;
      if (errStatus < 500) {
        const msg = HttpMessageFromStatus(
          errStatus,
          `${props.itemLabel}`,
          tHttpStatus
        );
        toastMessage({
          type: "error",
          content: msg,
          key: "mutationDeleteError",
          duration: 5,
        });
      }
    },
  });
  const mutationDownload = useMutation({
    mutationFn: async (params: DownloadRequest) => props.downloadData?.(params),
    onError(error) {
      const errStatus =
        (error as AxiosError | undefined)?.status ??
        HttpStatusCode.InternalServerError;
      if (errStatus < 500) {
        const msg = HttpMessageFromStatus(
          errStatus,
          `${props.itemLabel}`,
          tHttpStatus
        );
        toastMessage({
          type: "error",
          content: msg,
          key: "mutationDownloadError",
          duration: 5,
        });
      }
    },
  });
  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: [
        props.queryKeyData,
        ...Object.values(filterDefaultValue ?? {}),
      ],
    });
  };

  const updateWindowData = useCallback(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [setUrl]);

  useEffect(() => {
    updateWindowData();
  }, [updateWindowData]);

  return (
    <>
      <div
        style={{
          minHeight: "60vh",
        }}
      >
        <DefaultFilters
          loading={query.isFetching}
          formName={`${props.itemLabel}-default-filters`}
          canAdd={props.canAdd}
          canDownload={props.canDownload}
          defaultValue={filterDefaultValue}
          orderByList={props.filterOrderByList}
          returnExtraFilterNode={props.returnExtraFilterNode}
          onFilterChanged={(values) => {
            const newUrl = setMultipleSearchParamFromObject(url, values);
            router.push(newUrl.href);
          }}
          onRefresh={() => {
            query.refetch();
          }}
          onAdd={() => {
            mutationAdd.reset();
            setAddModalOpen(true);
          }}
          onDownload={() => {
            setDownloadModalOpen(true);
          }}
        />
        <div className="w-auto mt-6">
          <Suspense fallback={<LoaderCardListTemplate />}>
            <CardListTemplateLazy
              status={(query.error as AxiosError | undefined)?.status}
              loading={query.isFetching}
              loadingError={query.isLoadingError}
              data={query.data?.data ?? undefined}
              canUpdate={props.canUpdate}
              canDelete={props.canDelete}
              onRefresh={() => query.refetch()}
              onDescriptionRequested={(value) => {
                setItemToDescribe(value);
                setDescriptionModalOpen(true);
              }}
              onUpdateRequested={(value) => {
                mutationUpdate.reset();
                setCanSubmitUpdate(false);
                setItemToUpdate(value);
                setUpdateModalOpen(true);
              }}
              onDeleteRequested={(value) => {
                mutationDelete.reset();
                setItemToDelete(value);
                setDeleteModalOpen(true);
              }}
              returnItemListNode={props.returnItemListNode}
            />
          </Suspense>
        </div>
        <div className="w-auto mt-6 pb-4">
          <Pagination
            showQuickJumper
            responsive
            align="center"
            disabled={query.isFetching}
            current={(query.data?.data as any)?.pagination?.currentPage ?? 1}
            pageSize={(query.data?.data as any)?.pagination?.limit ?? 20}
            total={(query.data?.data as any)?.pagination?.count ?? 0}
            onChange={(page: number, pageSize: number) => {
              const newUrl = setMultipleSearchParam(url, [
                {
                  param: "page",
                  value: `${page}`,
                },
                {
                  param: "limit",
                  value: `${pageSize}`,
                },
              ]);
              router.push(newUrl.href);
            }}
          />
        </div>
      </div>

      {/* Description modal */}
      <Suspense>
        <CustomModalWithoutFooterLazy
          title={tModal("title.description", { label: props.itemLabel ?? "" })}
          content={
            <DescriptionTemplate
              item={itemToDescribe}
              returnDescriptionsNode={props.returnDescriptionsNode}
              onClose={() => setDescriptionModalOpen(false)}
            />
          }
          modalOpen={descriptionModalOpen}
          maskClosable={true}
          width={props.dialogDescriptionWidth}
          destroyOnHidden={true}
          onOk={() => setDescriptionModalOpen(false)}
          onCancel={() => setDescriptionModalOpen(false)}
        />
      </Suspense>

      {/* Add modal */}
      {props.canAdd === true ? (
        <Suspense>
          <CustomModalWithoutFooterLazy
            title={tModal("title.add", { label: props.itemLabel ?? "" })}
            content={
              <FormAddUpdateTemplate
                loading={mutationAdd.isPending}
                mounted={modalAddMounted}
                formName={`form-add-${props.itemLabel}`}
                canSubmit={true}
                returnFormAddUpdateNode={props.returnFormAddUpdateNode}
                errorMessage={
                  mutationAdd.isError
                    ? HttpMessageFromStatus(
                        (mutationAdd.error as any)?.response?.data?.status ??
                          HttpStatusCode.InternalServerError,
                        `${props.itemLabel}`,
                        tHttpStatus
                      )
                    : undefined
                }
                onSubmit={(value) => {
                  if (!value) {
                    return;
                  }
                  mutationAdd.mutate(value);
                }}
                onCancel={() => setAddModalOpen(false)}
              />
            }
            modalOpen={addModalOpen}
            maskClosable={false}
            width={props.dialogFormAddUpdateWidth}
            destroyOnHidden={true}
            afterOpenChange={(visible) => setModalAddMounted(visible)}
            onOk={() => setAddModalOpen(false)}
            onCancel={() => setAddModalOpen(false)}
          />
        </Suspense>
      ) : undefined}

      {/* Update modal */}
      {props.canUpdate === true ? (
        <Suspense>
          <CustomModalWithoutFooterLazy
            title={tModal("title.update", { label: props.itemLabel ?? "" })}
            content={
              <div className="w-full min-h-64">
                <FormAddUpdateTemplate
                  loading={mutationUpdate.isPending}
                  mounted={modalUpdateMounted}
                  canSubmit={canSubmitUpdate}
                  formName={`form-update-${props.itemLabel}`}
                  canSubmitMessage={tModal("footer.update")}
                  returnFormAddUpdateNode={props.returnFormAddUpdateNode}
                  errorMessage={
                    mutationUpdate.isError
                      ? HttpMessageFromStatus(
                          (mutationUpdate.error as any)?.response?.data
                            ?.status ?? HttpStatusCode.InternalServerError,
                          `${props.itemLabel}`,
                          tHttpStatus
                        )
                      : undefined
                  }
                  item={itemToUpdate}
                  onValuesChange={(value) => {
                    if (props.areEqual) {
                      const tmpAreEqual = props.areEqual(value, itemToUpdate);
                      setCanSubmitUpdate(!(tmpAreEqual === true));
                    }
                  }}
                  onSubmit={(value) => {
                    const newData = {
                      ...value,
                      id: (itemToUpdate as any)?.id,
                    } as TReq | undefined;
                    if (!newData) {
                      return;
                    }
                    mutationUpdate.mutate(newData);
                  }}
                  onCancel={() => setUpdateModalOpen(false)}
                />
              </div>
            }
            modalOpen={updateModalOpen}
            maskClosable={true}
            width={props.dialogFormAddUpdateWidth}
            destroyOnHidden={true}
            afterOpenChange={(visible) => setModalUpdateMounted(visible)}
            onOk={() => setUpdateModalOpen(false)}
            onCancel={() => setUpdateModalOpen(false)}
          />
        </Suspense>
      ) : undefined}

      {/* Delete modal */}
      {props.canDelete === true ? (
        <Suspense>
          <DeleteModalLazy
            description={tModal("confirm.delete", {
              label: props.itemLabel ?? "",
            })}
            modalOpen={deleteModalOpen}
            onOk={() => {
              mutationDelete.mutate((itemToDelete as any)?.id ?? 0);
              setDeleteModalOpen(false);
            }}
            onCancel={() => setDeleteModalOpen(false)}
          />
        </Suspense>
      ) : undefined}

      {/* Download modal */}
      {props.canDownload === true ? (
        <Suspense>
          <CustomModalWithoutFooterLazy
            title={tModal("title.download", { label: props.itemLabel ?? "" })}
            content={
              <FormDownload
                loading={mutationDownload.isPending}
                canSubmit={true}
                errorMessage={
                  mutationDownload.isError
                    ? HttpMessageFromStatus(
                        (mutationDownload.error as any)?.response?.data
                          ?.status ?? HttpStatusCode.InternalServerError,
                        `${props.itemLabel}`,
                        tHttpStatus
                      )
                    : undefined
                }
                onSubmit={(data) => {
                  mutationDownload.mutate(data);
                }}
                onCancel={() => setDownloadModalOpen(false)}
              />
            }
            modalOpen={downloadModalOpen}
            maskClosable={true}
            destroyOnHidden={true}
            onOk={() => setDownloadModalOpen(false)}
            onCancel={() => setDownloadModalOpen(false)}
          />
        </Suspense>
      ) : undefined}
    </>
  );
}
