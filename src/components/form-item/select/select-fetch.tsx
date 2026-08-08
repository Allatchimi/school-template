"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AxiosResponse, GenericAbortSignal } from "axios";
import FormItemSelect, {
  FormItemSelectProps,
  SelectOptionType,
} from "./select";
import { FilterRequest } from "@/types/http/filter/request";
import {
  BasePaginatedResponse,
  BaseResponse,
  IDType,
} from "@/types/http/base-response";
import { PaginationRequest } from "@/types/http/pagination/request";
import { FormInstance } from "antd";

type FormItemSelectFetchOmitProps<T extends object | string | number> = Omit<
  FormItemSelectProps<T>,
  "options"
>;

export type FormItemSelectFetchProps<
  TResp extends BaseResponse,
  TListReq extends FilterRequest & PaginationRequest,
  TListResp extends BasePaginatedResponse & {
    data?: TResp[] | null;
  },
> = {
  defaultOptions?: TResp[];
  request?: TListReq;
  form?: FormInstance;
  prefetch?: boolean;
  getItemList?: (
    params: TListReq,
    signal?: GenericAbortSignal
  ) => Promise<AxiosResponse<TListResp | null | undefined, any>>;
  getItem?: (
    id: IDType
  ) => Promise<AxiosResponse<TResp | null | undefined, any>>;
  optionsFormat?: (
    data?: TResp[] | null | undefined
  ) => SelectOptionType<TResp>[] | undefined;
} & FormItemSelectFetchOmitProps<TResp>;

export default function FormItemSelectFetch<
  TResp extends BaseResponse,
  TListReq extends FilterRequest & PaginationRequest,
  TListResp extends BasePaginatedResponse & {
    data?: TResp[] | null;
  },
>(props: FormItemSelectFetchProps<TResp, TListReq, TListResp>) {
  // React hooks
  const [data, setData] = useState<TResp[]>();

  // Tanstack hooks
  const mutationGetAll = useMutation({
    mutationFn: async (item: TListReq) => props.getItemList?.(item),
    onSuccess(data) {
      setData(data?.data?.data ?? undefined);
    },
  });
  const mutationGet = useMutation({
    mutationFn: async (id: IDType) => props.getItem?.(id),
    onSuccess(data) {
      setData(data?.data ? [data?.data] : []);
      if (props.name) {
        // Delay 10ms
        setTimeout(() => {
          props.form?.setFieldValue?.(props.name, data?.data?.id);
        }, 10);
      }
    },
  });

  const handleSearch = (value: string) => {
    const req: TListReq = {
      ...props.request,
      search: value,
    } as TListReq;
    mutationGetAll.mutate(req);
  };

  const handleOpenChange = (visible: boolean) => {
    if (visible && !mutationGetAll.isPending) {
      const defaultValue = Array.isArray(props.defaultValue)
        ? (props.defaultValue?.[0] ?? 0)
        : props.defaultValue;
      handleSearch(defaultValue ?? "");
    }
  };

  useEffect(() => {
    if (
      props.prefetch === true &&
      props.defaultValue &&
      !mutationGet.isPending &&
      (data?.length ?? 0) < 1
    ) {
      const defaultValue = Array.isArray(props.defaultValue)
        ? (props.defaultValue?.[0] ?? 0)
        : props.defaultValue;
      const parsedID = parseInt(defaultValue ?? "0");
      if (parsedID && parsedID > 0) {
        props.form?.setFieldValue?.(props.name, undefined);
        mutationGet.mutate(parsedID);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.prefetch, props.defaultValue]);

  return (
    <FormItemSelect<TResp>
      {...props}
      loading={mutationGetAll.isPending || mutationGet.isPending}
      options={
        mutationGetAll.isPending || mutationGet.isPending
          ? []
          : props.optionsFormat?.(data)
      }
      onSearch={handleSearch}
      onOpenChange={handleOpenChange}
      filterOption={false}
      autoClearSearchValue={true}
    />
  );
}
