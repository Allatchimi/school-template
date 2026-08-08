"use client";

import { ReactNode } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { Popconfirm, Space, Tag } from "@/ui/antd";
import { TableIndexText } from "../indexes/table-index";
import { useTranslations } from "next-intl";

export const defaultColumnProps = (sorter?: boolean) => {
  return {
    sorter: sorter,
    ellipsis: {
      showTitle: false,
    },
    render: (value?: string | number | null) => (
      <TableIndexText>{value}</TableIndexText>
    ),
  };
};

export const defaultColumnEnumProps = (
  sorter?: boolean,
  render?: (value?: string | number | null) => ReactNode
) => {
  return {
    sorter: sorter,
    ellipsis: {
      showTitle: false,
    },
    render: (value?: string | number | null) => (
      <TableIndexText>{render?.(value)}</TableIndexText>
    ),
  };
};

export const defaultColumnBooleanProps = (
  sorter?: boolean,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return undefined;
  }

  return {
    sorter: sorter,
    ellipsis: {
      showTitle: false,
    },
    render: (value?: boolean | null) =>
      value === true ? (
        <Tag color="success">{tWords("yes")}</Tag>
      ) : (
        <Tag color="error">{tWords("no")}</Tag>
      ),
  };
};

export const defaultColumnStatusProps = <
  T extends object | string | number | boolean | null,
>(
  sorter?: boolean,
  render?: (record?: T) => ReactNode,
  renderColor?: (record?: T) => string
) => {
  return {
    sorter: sorter,
    ellipsis: {
      showTitle: false,
    },
    render: (_?: T, record?: T) => (
      <Tag color={renderColor?.(record)}>{render?.(record)}</Tag>
    ),
  };
};

export const defaultColumnDateProps = <
  T extends object | string | number | boolean | null,
>(
  sorter?: boolean,
  renderDateFormat?: (record?: T) => string
) => {
  return {
    sorter: sorter,
    ellipsis: {
      showTitle: false,
    },
    render: (_?: T, record?: T) => (
      <TableIndexText>{renderDateFormat?.(record)}</TableIndexText>
    ),
  };
};

export const defaultColumnObjectProps = <
  T extends object | string | number | boolean | null,
>(
  sorter?: boolean,
  render?: (record?: T, index?: number) => ReactNode
): ColumnType<T> => {
  return {
    sorter: sorter,
    ellipsis: {
      showTitle: false,
    },
    render: (_?: any, record?: T, index?: number) => (
      <>{render?.(record, index)}</>
    ),
  };
};

// Default column props for user actions
export function defaultColumnActionProps<T>(props: {
  canUpdate?: boolean;
  canDelete?: boolean;
  deleteDescription?: string;
  showCustomButton?: boolean;
  customButtonContent?: (record?: T) => ReactNode;
  onDescriptionRequested?: (value?: T, index?: number) => void;
  onUpdateRequested?: (value?: T, index?: number) => void;
  onDeleteConfirmed?: (value?: T, index?: number) => void;
  onCustomButtonRequested?: (value?: T, index?: number) => void;
  tSentences?: ReturnType<typeof useTranslations>;
  tWords?: ReturnType<typeof useTranslations>;
}): ColumnType<T> {
  if (!props.tWords || !props.tSentences) {
    return {};
  }

  const tSentences = props.tSentences;
  const tWords = props.tWords;

  return {
    title: tWords("actions"),
    key: "actions",
    sorter: false,
    fixed: "right",
    render: (_, record, index) => (
      <Space size="large">
        {props.showCustomButton === true && (
          <a
            className="w-auto"
            onClick={(e) => {
              e.preventDefault();
              if (props.onCustomButtonRequested) {
                props.onCustomButtonRequested(record, index);
              }
            }}
          >
            {props.customButtonContent && props.customButtonContent(record)}
          </a>
        )}
        <a
          className="w-auto"
          onClick={(e) => {
            e.preventDefault();
            if (props.onDescriptionRequested) {
              props.onDescriptionRequested(record, index);
            }
          }}
        >
          <EyeOutlined />
        </a>
        {props.canUpdate === true ? (
          <a
            onClick={(e) => {
              e.preventDefault();
              if (props.onUpdateRequested) {
                props.onUpdateRequested(record, index);
              }
            }}
          >
            {tWords("update")}
          </a>
        ) : undefined}
        {props.canDelete === true ? (
          <Popconfirm
            title={tWords("delete")}
            description={tSentences("delete", {
              label: props.deleteDescription ?? "",
            })}
            placement="topRight"
            okText={tWords("yes")}
            cancelText={tWords("no")}
            onConfirm={() => {
              if (props.onDeleteConfirmed) {
                props.onDeleteConfirmed(record, index);
              }
            }}
          >
            <a
              style={{ color: "red" }}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {tWords("delete")}
            </a>
          </Popconfirm>
        ) : undefined}
      </Space>
    ),
  };
}
