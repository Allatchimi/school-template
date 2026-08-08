"use client";

import { DateType } from "@/types/http/base-response";
import DropdownButtonMore from "../dropdown/dropdown-button-more";
import { formatDateTimeToSince } from "@/helpers/date/format";
import Link from "next/link";
import { antdTheme, Tag, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";
import { MenuProps } from "antd";

export interface CardListProps<TResp extends object, TListResp extends object> {
  loading?: boolean;
  loadingError?: boolean;
  data?: TListResp;
  canUpdate?: boolean;
  canDelete?: boolean;
  hideDropdownButtonMore?: boolean;
  onRefreshRequested?: () => void;
  onDescriptionRequested?: (value?: TResp) => void;
  onUpdateRequested?: (value?: TResp) => void;
  onDeleteRequested?: (value?: TResp) => void;
}

export interface CardListCardProps<T extends object> {
  item?: T;
  canUpdate?: boolean;
  canDelete?: boolean;
  hideDropdownButtonMore?: boolean;
  onDescriptionRequested?: (value?: T) => void;
  onUpdateRequested?: (value?: T) => void;
  onDeleteRequested?: (value?: T) => void;
}

export default function CardListCardTemplate<T extends object>(
  props: {
    icon?: React.ReactNode;
    title?: string;
    subtitle?: string;
    titleExtra?: string;
    createdAt?: DateType;
    updatedAt?: DateType;
    showStatus?: boolean;
    status?: string;
    statusColor?: string;
    children?: React.ReactNode;
    clickable?: boolean;
    onClickHref?: string;
    onClick?: () => void;
  } & CardListCardProps<T>
) {
  // Next hooks
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const menuItems: MenuProps["items"] = [
    {
      key: "description",
      label: tWords("description"),
      onClick: () => {
        if (props.onDescriptionRequested) {
          props.onDescriptionRequested(props.item);
        }
      },
    },
  ];

  if (props.canUpdate === true) {
    menuItems.push({
      key: "update",
      label: tWords("update"),
      onClick: () => {
        if (props.onUpdateRequested) {
          props.onUpdateRequested(props.item);
        }
      },
    });
  }

  if (props.canDelete === true) {
    menuItems.push({
      key: "delete",
      label: tWords("delete"),
      onClick: () => {
        if (props.onDeleteRequested) {
          props.onDeleteRequested(props.item);
        }
      },
    });
  }

  return (
    <div
      style={{
        backgroundColor: theme.colorFillQuaternary,
        borderRadius: theme.borderRadius,
        borderWidth: "0.5px",
        borderColor: theme.colorBorder,
      }}
      className="w-full h-full relative flex flex-col justify-between gap-2 pb-4 hover:shadow-lg transition-all"
    >
      <div className="w-full h-full flex flex-col gap-2">
        <div
          style={{
            backgroundColor: theme.colorPrimaryBg,
            borderTopLeftRadius: theme.borderRadius,
            borderTopRightRadius: theme.borderRadius,
          }}
          className="w-full flex gap-2 px-4 py-2"
        >
          <div className="w-full flex gap-1">
            {props.icon}
            <div className="w-full flex flex-col">
              <Title
                level={5}
                className="text-ellipsis line-clamp-1"
                style={{
                  margin: "0px",
                  color: theme.colorText,
                }}
              >
                {props.title || "No title"}
              </Title>
              <Text type="secondary" className="text-ellipsis line-clamp-1">
                {props.subtitle || "No subtitle"}
              </Text>
            </div>
            {props.hideDropdownButtonMore !== true ? (
              <div className="z-20">
                <DropdownButtonMore items={menuItems} />
              </div>
            ) : undefined}
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-2 mt-1 px-4">
          <div className="w-full grid grid-cols-2">
            <div className="w-full">
              <Text
                ellipsis
                type="secondary"
                code
                className="text-xs line-clamp-1"
              >
                Created {formatDateTimeToSince(props.createdAt?.toString())}
              </Text>
              <Text
                ellipsis
                type="secondary"
                code
                className="text-xs line-clamp-1"
              >
                Updated {formatDateTimeToSince(props?.updatedAt?.toString())}
              </Text>
            </div>
            <div className="w-full flex justify-end">
              {props.showStatus === true ? (
                <div>
                  <Tag color={props.statusColor || "default"} className="p-12">
                    {props.status}
                  </Tag>
                </div>
              ) : undefined}
              {props.showStatus !== true ? (
                <Text
                  className="text-ellipsis line-clamp-1"
                  style={{
                    color: theme.colorText,
                  }}
                >
                  {props.titleExtra}
                </Text>
              ) : undefined}
            </div>
          </div>
          <div className="w-full h-full">{props.children}</div>
        </div>
      </div>
      {props.clickable === true ? (
        <Link
          href={props.onClickHref ?? ""}
          className="w-full h-full absolute z-10 top-0 left-0"
          onClick={props.onClick}
          target="_blank"
        />
      ) : undefined}
    </div>
  );
}
