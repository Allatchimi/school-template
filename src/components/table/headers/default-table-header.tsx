"use client";

import { ReactNode, useState } from "react";
import { FilterType } from "@/components/filter/default-filters";
import { InputSearch, Button, Form } from "@/ui/antd";
import {
  ClearOutlined,
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { FormInstance, useForm } from "antd/es/form/Form";
import { useTranslations } from "next-intl";

export default function DefaultTableHeader<
  T extends Partial<FilterType> | undefined,
>(props: {
  loading?: boolean;
  fetching?: boolean;
  canAdd?: boolean;
  canDeleteMultiple?: boolean;
  canUpload?: boolean;
  canDownload?: boolean;
  isDeletingSelection?: boolean;
  selectedItemsCount?: number;
  filterDefaultValue?: T;
  returnExtraFilterNode?: (
    values?: T,
    loading?: boolean,
    form?: FormInstance<T>
  ) => ReactNode;
  onFilterChanged?: (values: T) => void;
  onAdd?: () => void;
  onRefresh?: () => void;
  onDelete?: () => void;
  onUpload?: () => void;
  onDownload?: () => void;
}) {
  // React hooks
  const [form] = useForm<T>();
  const [values, setValues] = useState<T>(
    props.filterDefaultValue ?? ({} as T)
  );

  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        {props.canAdd === true ? (
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={props.onAdd}
          >
            {tWords("add")}
          </Button>
        ) : null}
        <InputSearch
          allowClear
          placeholder={tWords("search")}
          enterButton={tWords("search")}
          size="large"
          className="max-w-[500px] flex-1"
          onSearch={(value) => {
            props.onFilterChanged?.({
              ...values,
              search: value,
            });
          }}
        />
        {props.filterDefaultValue?.search &&
        (props.filterDefaultValue.search?.length ?? 0) >= 1 ? (
          <div className="flex flex-wrap items-center gap-2">
            <p className="line-clamp-1">
              {tWords("resultsFor")}{" "}
              <b className="font-extrabold">
                {props.filterDefaultValue?.search ?? ""}
              </b>
            </p>
            <Button
              icon={<ClearOutlined width={18} height={18} />}
              onClick={() => {
                props.onFilterChanged?.({
                  ...values,
                  search: "",
                });
              }}
            >
              {tWords("clear")}
            </Button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap items-end gap-2 lg:gap-4 xl:gap-8">
        <Form<T>
          name="table-header-filters"
          form={form}
          layout={"horizontal"}
          initialValues={props.filterDefaultValue}
          onValuesChange={(_changedValues, values) => {
            setValues(values);
            props.onFilterChanged?.(values);
          }}
          autoComplete="on"
          className="w-auto flex flex-wrap items-center gap-4"
        >
          {props.returnExtraFilterNode?.(
            props.filterDefaultValue,
            props.loading,
            form
          )}
        </Form>
        <Button
          loading={props.fetching ?? undefined}
          icon={<SyncOutlined />}
          onClick={props.onRefresh}
        >
          {tWords("refresh")}
        </Button>
        {props.canDeleteMultiple === true ? (
          <Button
            loading={props.isDeletingSelection ?? undefined}
            disabled={
              (props.selectedItemsCount ?? 0) < 1 || props.loading == true
            }
            icon={<DeleteOutlined />}
            onClick={props.onDelete}
          >
            {tWords("delete")}
          </Button>
        ) : null}
        {props.canUpload === true ? (
          <Button
            disabled={props.loading ?? undefined}
            icon={<UploadOutlined />}
            onClick={props.onUpload}
          >
            {tWords("import")}
          </Button>
        ) : null}
        {props.canDownload === true ? (
          <Button
            disabled={props.loading ?? undefined}
            icon={<DownloadOutlined />}
            onClick={props.onDownload}
          >
            {tWords("export")}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
