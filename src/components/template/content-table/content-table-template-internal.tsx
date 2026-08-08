"use client";

import { ReactNode, Suspense, useCallback, useEffect, useState } from "react";
import DefaultTableHeaderInfo from "@/components/table/headers/default-table-header-info";
import DefaultTableHeader from "@/components/table/headers/default-table-header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { ArgsProps } from "antd/es/message";
import {
  AxiosError,
  AxiosResponse,
  GenericAbortSignal,
  HttpStatusCode,
} from "axios";
import { HttpMessageFromStatus } from "@/components/message/status-message";
import {
  deleteMultipleSearchParam,
  getSearchParamFromObjectType,
  setMultipleSearchParam,
  setMultipleSearchParamFromObject,
} from "@/helpers/url/search-param";
import {
  DownloadRequest,
  UploadRequest,
} from "@/lib/api/others/upload-download/request";
import { useCustomRouter } from "@/hooks/use-custom-router";
import {
  DownloadResponse,
  UploadResponse,
} from "@/lib/api/others/upload-download/response";
import { SelectionRequest } from "@/types/http/base-request";
import { FilterType } from "@/components/filter/default-filters";
import { IDType } from "@/types/http/base-response";
import { DescriptionsProps, FormInstance, TableColumnsType } from "antd";
import { App, Pagination } from "@/ui/antd";
import dynamic from "next/dynamic";
import { TableTemplateProps } from "./table-template";
import LoaderTableTemplate from "@/components/loader/loader-table-template";
import FormDownload from "@/components/form/others/form-download";
import FormUpload from "@/components/form/others/form-upload";
import DescriptionTemplate from "../description-template";
import FormAddUpdateTemplate from "../form-add-update-template";
import { useTranslations } from "next-intl";

const TableTemplateLazy = dynamic<TableTemplateProps<any>>(
  () => import("./table-template"),
  { ssr: false }
);

const CustomModalWithoutFooterLazy = dynamic(
  () => import("@/components/modal/custom-without-footer"),
  { ssr: false }
);

const DeleteModalLazy = dynamic(() => import("@/components/modal/delete"), {
  ssr: false,
});

export interface ContentTableTemplateInternalProps<
  TReq extends object,
  TResp extends object,
  TListReq extends object,
  TListResp extends object,
  TSearchParam extends Partial<FilterType> | undefined,
> {
  itemLabel?: string;
  itemLabelUpdateErrorDetails?: string;
  downloadUploadTableName?: string;
  queryKeyData?: string;
  canAdd?: boolean;
  canUpdate?: boolean;
  canDeleteOne?: boolean;
  canSelectMultiple?: boolean;
  canDeleteMultiple?: boolean;
  canUpload?: boolean;
  canDownload?: boolean;
  addDefaultActions?: boolean;
  hideTableHeader?: boolean;
  hidePagination?: boolean;
  dialogFormAddUpdateWidth?: number;
  dialogDescriptionWidth?: number;
  searchParams?: ReadonlyURLSearchParams;
  filterTemplate?: TSearchParam;
  columns?: TableColumnsType<TResp>;
  returnExtraFilterNode?: (
    values?: TSearchParam,
    loading?: boolean,
    form?: FormInstance<TSearchParam>
  ) => ReactNode;
  areEqual?: (b?: TReq, a?: TResp) => boolean | null | undefined;
  returnFormAddUpdateNode?: (props: {
    isLoading?: boolean;
    disabled?: boolean;
    item?: TResp;
    canSubmit?: boolean;
    errorMessage?: string;
    onValuesChange?: (value?: TReq) => void;
    onSubmit?: (value?: TReq) => void;
    onCancel?: () => void;
  }) => ReactNode;
  returnDescriptions?: (
    value?: TResp
  ) => { title?: string; description?: DescriptionsProps["items"] }[];
  getItemList?: (
    params: TListReq,
    signal?: GenericAbortSignal
  ) => Promise<AxiosResponse<TListResp | null | undefined, any>>;
  postItem?: (
    item: TReq
  ) => Promise<AxiosResponse<TResp | null | undefined, any>>;
  updateItem?: (
    item: TReq
  ) => Promise<AxiosResponse<TResp | null | undefined, any>>;
  deleteItem?: (
    id: number
  ) => Promise<AxiosResponse<number | null | undefined, any>>;
  deleteMultipleItems?: (
    selection: SelectionRequest
  ) => Promise<AxiosResponse<number | null | undefined, any>>;
  uploadData?: (
    params: UploadRequest
  ) => Promise<AxiosResponse<UploadResponse | null | undefined, any>>;
  downloadData?: (
    params: DownloadRequest
  ) => Promise<AxiosResponse<DownloadResponse | null | undefined, any>>;
}

export default function ContentTableTemplateInternal<
  TReq extends object,
  TResp extends object,
  TListReq extends object,
  TListResp extends object,
  TSearchParam extends Partial<FilterType> | undefined = undefined,
>(
  props: ContentTableTemplateInternalProps<
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
  // Table row selection states
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // Description item states
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [itemToDescribe, setItemToDescribe] = useState<TResp>();
  // Add update item states
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [modalAddMounted, setModalAddMounted] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [modalUpdateMounted, setModalUpdateMounted] = useState(false);
  const [canSubmitUpdate, setCanSubmitUpdate] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState<TResp>();
  // Delete item states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // Upload & download
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
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
  const tModal = useTranslations("Sentences.modal");
  const tHttpStatus = useTranslations("Sentences.http.error");

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
    mutationFn: async (item: TReq) => props.updateItem?.(item),
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
          key: "mutationAddError",
          duration: 5,
        });
      }
    },
  });
  const mutationDelete = useMutation({
    mutationFn: async (id: number) => props.deleteItem?.(id),
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
  const mutationDeleteMultiple = useMutation({
    mutationFn: async (selection: SelectionRequest) =>
      props.deleteMultipleItems?.(selection),
    onSuccess() {
      setSelectedRowKeys([]);
      invalidateQueries();
      toastMessage({
        type: "success",
        content: tFeedback("deleteMultiple.success", {
          label: props.itemLabel ?? "",
        }),
        key: "mutationAddSuccess",
        duration: 5,
      });
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
          key: "mutationDeleteMultipleError",
          duration: 5,
        });
      }
    },
  });
  const mutationUpload = useMutation({
    mutationFn: async (params: UploadRequest) => props.uploadData?.(params),
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
          key: "mutationUploadError",
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
        <DefaultTableHeader
          loading={query.isPending}
          fetching={query.isFetching}
          isDeletingSelection={mutationDeleteMultiple.isPending}
          selectedItemsCount={selectedRowKeys.length}
          canAdd={props.canAdd}
          canDeleteMultiple={props.canDeleteMultiple}
          canUpload={props.canUpload}
          canDownload={props.canDownload}
          filterDefaultValue={filterDefaultValue}
          returnExtraFilterNode={props.returnExtraFilterNode}
          onFilterChanged={(values) => {
            const newValues = values;
            const newUrl = setMultipleSearchParamFromObject(url, newValues);
            router.push(newUrl.href);
          }}
          onAdd={() => {
            mutationAdd.reset();
            setAddModalOpen(true);
          }}
          onRefresh={() => {
            query.refetch();
          }}
          onDelete={() => {
            setDeleteModalOpen(true);
          }}
          onUpload={() => {
            setUploadModalOpen(true);
          }}
          onDownload={() => {
            setDownloadModalOpen(true);
          }}
        />
        {props.hideTableHeader === true ? undefined : (
          <DefaultTableHeaderInfo
            showSelection={true}
            selectedItemsCount={selectedRowKeys.length}
            currentPage={
              (query.data?.data as any)?.pagination?.currentPage ?? 0
            }
            totalPages={(query.data?.data as any)?.pagination?.totalPages ?? 0}
          />
        )}
        <Suspense fallback={<LoaderTableTemplate />}>
          <TableTemplateLazy
            status={(query.error as AxiosError | undefined)?.status}
            loading={
              query.isFetching ||
              mutationDelete.isPending ||
              mutationDeleteMultiple.isPending
            }
            loadingError={query.isLoadingError}
            items={(query.data?.data as any)?.data as TResp[] | undefined}
            orderBy={filterDefaultValue?.orderBy ?? undefined}
            sort={filterDefaultValue?.sort === "asc" ? "ascend" : "descend"}
            itemLabel={props.itemLabel}
            columns={props.columns}
            addDefaultActions={props.addDefaultActions}
            selectedRowKeys={selectedRowKeys}
            canUpdate={props.canUpdate}
            canDelete={props.canDeleteOne}
            canSelectMultiple={props.canSelectMultiple}
            onRefresh={() => query.refetch()}
            onFilterSortChanged={(_filters, sorter) => {
              // If there are no filters, cleanup
              if (!(sorter as any)?.column) {
                const newUrl = deleteMultipleSearchParam(url, [
                  "orderBy",
                  "sort",
                ]);
                router.push(newUrl.href);
                return;
              }

              // Apply filters
              const orderBy = (sorter as any)?.columnKey as
                | string
                | null
                | undefined;
              const sort =
                ((sorter as any)?.order as string | null | undefined) ===
                "ascend"
                  ? "asc"
                  : "desc";
              const newUrl = setMultipleSearchParam(url, [
                {
                  param: "orderBy",
                  value: `${orderBy}`,
                },
                {
                  param: "sort",
                  value: `${sort}`,
                },
              ]);
              router.push(newUrl.href);
            }}
            onRowSelectionChanged={(selectedRowKeys) => {
              setSelectedRowKeys(selectedRowKeys);
            }}
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
            onDeleteConfirmed={(value) => {
              mutationDelete.mutate((value as any)?.id ?? -1);
            }}
          />
        </Suspense>
        {props.hidePagination === true ? undefined : (
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
        )}
      </div>

      {/* Description modal */}
      <Suspense>
        <CustomModalWithoutFooterLazy
          title={tModal("title.description", { label: props.itemLabel ?? "" })}
          content={
            <DescriptionTemplate
              item={itemToDescribe}
              returnDescriptionsNode={props.returnDescriptions}
              onClose={() => setDescriptionModalOpen(false)}
            />
          }
          modalOpen={descriptionModalOpen}
          maskClosable={true}
          width={props.dialogDescriptionWidth}
          onOk={() => setDescriptionModalOpen(false)}
          onCancel={() => setDescriptionModalOpen(false)}
        />
      </Suspense>

      {/* Add modal */}
      <Suspense>
        <CustomModalWithoutFooterLazy
          title={tModal("title.add", { label: props.itemLabel ?? "" })}
          content={
            <FormAddUpdateTemplate
              loading={mutationAdd.isPending}
              canSubmit={true}
              mounted={modalAddMounted}
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
          afterOpenChange={(visible) => setModalAddMounted(visible)}
          onOk={() => setAddModalOpen(false)}
          onCancel={() => setAddModalOpen(false)}
        />
      </Suspense>

      {/* Update modal */}
      <Suspense>
        <CustomModalWithoutFooterLazy
          title={tModal("title.update", { label: props.itemLabel ?? "" })}
          content={
            <FormAddUpdateTemplate
              loading={mutationUpdate.isPending}
              canSubmit={canSubmitUpdate}
              mounted={modalUpdateMounted}
              canSubmitMessage={tModal("footer.update")}
              returnFormAddUpdateNode={props.returnFormAddUpdateNode}
              errorMessage={
                mutationUpdate.isError
                  ? HttpMessageFromStatus(
                      (mutationUpdate.error as any)?.response?.data?.status ??
                        HttpStatusCode.InternalServerError,
                      `${props.itemLabel ?? ""}${
                        (props.itemLabelUpdateErrorDetails?.length ?? 0) > 0
                          ? ` ${props.itemLabelUpdateErrorDetails}`
                          : ""
                      }`,
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
          }
          modalOpen={updateModalOpen}
          maskClosable={false}
          width={props.dialogFormAddUpdateWidth}
          afterOpenChange={(visible) => setModalUpdateMounted(visible)}
          onOk={() => setUpdateModalOpen(false)}
          onCancel={() => setUpdateModalOpen(false)}
        />
      </Suspense>

      {/* Delete modal */}
      <Suspense>
        <DeleteModalLazy
          description={tModal("confirm.delete", {
            label: props.itemLabel ?? "",
          })}
          modalOpen={deleteModalOpen}
          onOk={() => {
            const tmpSelection = selectedRowKeys.map(
              (item) => item as IDType
            ) as IDType[];
            mutationDeleteMultiple.mutate({ list: tmpSelection });
            setDeleteModalOpen(false);
          }}
          onCancel={() => setDeleteModalOpen(false)}
        />
      </Suspense>

      {/* Upload modal */}
      <Suspense>
        <CustomModalWithoutFooterLazy
          title={tModal("title.upload", { label: props.itemLabel ?? "" })}
          content={
            <FormUpload
              loading={mutationUpload.isPending}
              canSubmit={true}
              errorMessage={
                mutationUpload.isError
                  ? HttpMessageFromStatus(
                      (mutationUpload.error as any)?.response?.data?.status ??
                        HttpStatusCode.InternalServerError,
                      `${props.itemLabel}`,
                      tHttpStatus
                    )
                  : undefined
              }
              onSubmit={(data) => {
                mutationUpload.mutate(data);
              }}
              onCancel={() => setUploadModalOpen(false)}
            />
          }
          modalOpen={uploadModalOpen}
          maskClosable={true}
          onOk={() => setUploadModalOpen(false)}
          onCancel={() => setUploadModalOpen(false)}
        />
      </Suspense>

      {/* Download modal */}
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
                      (mutationDownload.error as any)?.response?.data?.status ??
                        HttpStatusCode.InternalServerError,
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
          onOk={() => setDownloadModalOpen(false)}
          onCancel={() => setDownloadModalOpen(false)}
        />
      </Suspense>
    </>
  );
}
