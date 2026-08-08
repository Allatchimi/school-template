"use client";

import { usePathname } from "next/navigation";
import { ItemType } from "antd/es/menu/interface";
import { useCustomRouter } from "@/hooks/use-custom-router";
import Sider from "antd/es/layout/Sider";
import { useSession } from "next-auth/react";
import { FEATURE_ADMIN, FEATURE_DIRECTOR } from "@/lib/constants/user/feature";
import ManageAccountsIcon from "../icon/material/manage-accounts";
import { SchoolConfig } from "@/config/school";
import { antdTheme, Divider, Menu, Text } from "@/ui/antd";
import SelectYearGlobal from "../form-item/select/school/common/select-year-global";
import { useLocale, useTranslations } from "next-intl";

export default function DashboardSideMenu(props: {
  collapsed?: boolean;
  breakPointBroken?: boolean;
  onBreakPointChanged?: (broken: boolean) => void;
  getItems?: (onClick?: (info: { key: string }) => void) => ItemType[];
}) {
  // React hooks
  const router = useCustomRouter();
  const pathname = usePathname();

  // Next hooks
  const session = useSession();
  const tWords = useTranslations("Words");
  const locale = useLocale();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const items: ItemType[] = props.getItems
    ? props.getItems(({ key }) => {
        router.push(key);
      })
    : [];

  // If no items are provided, use a default empty array
  if (!items || items.length === 0) {
    return undefined;
  }

  const defaultOptions = () => {
    const yearData = SchoolConfig.yearData();
    return yearData && (yearData?.id ?? 0) > 0 ? [yearData] : [];
  };

  const feature = session?.data?.user.feature;
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth={props.breakPointBroken === true ? 0 : 80}
      onBreakpoint={(broken) => {
        if (props.onBreakPointChanged) {
          props.onBreakPointChanged(broken);
        }
      }}
      trigger={null}
      collapsible={true}
      collapsed={
        props.breakPointBroken === true ? true : props.collapsed === true
      }
      style={{
        backgroundColor: theme.colorFillQuaternary,
        paddingLeft: props.breakPointBroken === true ? "0px" : "5px",
        paddingRight: props.breakPointBroken === true ? "0px" : "5px",
        borderRightWidth: props.breakPointBroken === true ? "0px" : "0.5px",
        borderRightColor:
          props.breakPointBroken === true ? "transparent" : theme.colorBorder,
        height: "100vh",
        position: "sticky",
        zIndex: "10",
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
        // overflow: "auto",
        // scrollbarColor: `${theme.colorFill} transparent`
      }}
      className="hover:overflow-auto focus:overflow-auto overflow-hidden scrollbar"
    >
      <div
        style={{
          backgroundColor: theme.colorPrimary,
          borderRadius: theme.borderRadius,
          marginTop: "10px",
          padding: "12px",
          height: "64px",
        }}
        className="flex items-center justify-center"
      >
        {!feature || session.status === "loading" ? (
          <Text
            ellipsis
            style={{
              color: theme.colorWhite,
            }}
            className="text-center"
          >
            {tWords("loading")}...
          </Text>
        ) : feature === FEATURE_ADMIN || feature === FEATURE_DIRECTOR ? (
          <div>
            {props.collapsed === true ? (
              <ManageAccountsIcon
                width={24}
                height={24}
                style={{
                  color: theme.colorWhite,
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <Divider
                  plain
                  orientation="center"
                  style={{
                    margin: "0px",
                    padding: "0px",
                    borderColor: theme.colorWhite,
                  }}
                >
                  <ManageAccountsIcon
                    width={24}
                    height={24}
                    style={{
                      color: theme.colorWhite,
                    }}
                  />
                </Divider>
                <Text
                  ellipsis
                  style={{
                    color: theme.colorWhite,
                  }}
                  className="text-center"
                >
                  {tWords("welcome")} {session.data?.user.role}
                </Text>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full">
            {props.collapsed === true ? (
              <Text
                ellipsis
                style={{
                  color: theme.colorWhite,
                }}
                className="text-center"
              >
                {tWords("year")}
              </Text>
            ) : (
              <SelectYearGlobal
                defaultValue={SchoolConfig.yearID()?.toString() ?? undefined}
                defaultOptions={defaultOptions()}
                request={{ schoolID: SchoolConfig.schoolID() }}
                size="large"
                onChange={(_, option) => {
                  if (!option) {
                    SchoolConfig.setYearData(undefined);
                    window.location.reload();
                    return;
                  }

                  if (Array.isArray(option)) {
                    SchoolConfig.setYearData(option[0].data);
                    window.location.reload();
                    return;
                  }
                  SchoolConfig.setYearData(option.data);
                  window.location.reload();
                }}
              />
            )}
          </div>
        )}
      </div>
      <style>
        {`
          .ant-menu-inline {
            border-radius: ${theme.borderRadius}px !important;
          }
        `}
      </style>
      <Menu
        mode="inline"
        theme="light"
        defaultSelectedKeys={[pathname.replace(`/${locale}`, "")]}
        selectable={true}
        selectedKeys={[pathname.replace(`/${locale}`, "")]}
        items={items}
        style={{
          backgroundColor: "transparent",
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingRight: "0px",
          paddingLeft: "0px",
          margin: "0px",
          border: "none",
        }}
      />
    </Sider>
  );
}
