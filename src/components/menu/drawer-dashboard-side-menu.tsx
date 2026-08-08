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

export default function DrawerDashboardSideMenu(props: {
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
        router.replace(key);
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
      trigger={null}
      width={"100%"}
      collapsible={false}
      style={{
        backgroundColor: "transparent",
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          backgroundColor: theme.colorPrimary,
          borderRadius: theme.borderRadius,
          padding: "12px",
          height: "64px",
        }}
        className="flex items-center justify-center"
      >
        {session.status === "loading" ? (
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
          border: "none",
          paddingTop: "5px",
        }}
      />
    </Sider>
  );
}
