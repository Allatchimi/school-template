"use client";

import { TableColumnsType } from "antd";
import {
  defaultColumnBooleanProps,
  defaultColumnDateProps,
  defaultColumnEnumProps,
  defaultColumnObjectProps,
  defaultColumnProps,
  defaultColumnStatusProps,
} from "../props/default-column-props";
import { TableColumnDataProps, TableColumnsProps } from "../column.type";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

interface TableColumnDefaultProps
  extends TableColumnDataProps,
    TableColumnsProps {}

interface TableColumnEnumProps extends TableColumnDataProps, TableColumnsProps {
  render?: (value?: string | number | null) => ReactNode;
}

interface TableColumnStatusProps<
  T extends object | string | number | boolean | null,
> extends TableColumnDataProps,
    TableColumnsProps {
  render?: (record?: T) => ReactNode;
  renderColor?: (record?: T) => string;
}

interface TableColumnDateProps<
  T extends object | string | number | boolean | null,
> extends TableColumnDataProps,
    TableColumnsProps {
  renderDateFormat?: (record?: T) => string;
}

interface TableColumnObjectProps<
  T extends object | string | number | boolean | null,
> extends TableColumnDataProps,
    TableColumnsProps {
  render?: (record?: T, index?: number) => ReactNode;
}

export function TableColumnStringNumber<
  T extends object | string | number | boolean | null,
>(props: TableColumnDefaultProps): TableColumnsType<T> {
  const columns: TableColumnsType<T> = [
    {
      title: props.title,
      dataIndex: props.dataIndex,
      key: props.key,
      fixed: props.fixed,
      sortOrder:
        props.orderBy && props.orderBy === props.key ? props.sort : null,
      ...defaultColumnProps(props.sorter),
    },
  ];

  return columns;
}

export function TableColumnEnum<
  T extends object | string | number | boolean | null,
>(props: TableColumnEnumProps): TableColumnsType<T> {
  const columns: TableColumnsType<T> = [
    {
      title: props.title,
      dataIndex: props.dataIndex,
      key: props.key,
      fixed: props.fixed,
      sortOrder:
        props.orderBy && props.orderBy === props.key ? props.sort : null,
      ...defaultColumnEnumProps(props.sorter, props.render),
    },
  ];

  return columns;
}

export function TableColumnBoolean<
  T extends object | string | number | boolean | null,
>(props: TableColumnDefaultProps): TableColumnsType<T> {
  // Next hooks
  const tWords = useTranslations("Words");

  const columns: TableColumnsType<T> = [
    {
      title: props.title,
      dataIndex: props.dataIndex,
      key: props.key,
      sortOrder:
        props.orderBy && props.orderBy === props.key ? props.sort : null,
      ...defaultColumnBooleanProps(props.sorter, tWords),
    },
  ];

  return columns;
}

export function TableColumnStatus<
  T extends object | string | number | boolean | null,
>(props: TableColumnStatusProps<T>): TableColumnsType<T> {
  // Next hooks
  const tWords = useTranslations("Words");

  const columns: TableColumnsType<T> = [
    {
      title: tWords("status"),
      dataIndex: props.dataIndex || "status",
      key: props.key || "status",
      sortOrder:
        props.orderBy && props.orderBy === props.key ? props.sort : null,
      ...defaultColumnStatusProps(
        props.sorter,
        props.render,
        props.renderColor
      ),
    },
  ];

  return columns;
}

export function TableColumnDate<
  T extends object | string | number | boolean | null,
>(props: TableColumnDateProps<T>): TableColumnsType<T> {
  const columns: TableColumnsType<T> = [
    {
      title: props.title,
      dataIndex: props.dataIndex,
      key: props.key,
      sortOrder:
        props.orderBy && props.orderBy === props.key ? props.sort : null,
      ...defaultColumnDateProps(props.sorter, props.renderDateFormat),
    },
  ];

  return columns;
}

export function TableColumnObject<
  T extends object | string | number | boolean | null,
>(props: TableColumnObjectProps<T>): TableColumnsType<T> {
  const columns: TableColumnsType<T> = [
    {
      title: props.title,
      dataIndex: props.dataIndex,
      key: props.key,
      sortOrder:
        props.orderBy && props.orderBy === props.key ? props.sort : null,
      ...defaultColumnObjectProps(props.sorter, props.render),
    },
  ];

  return columns;
}
