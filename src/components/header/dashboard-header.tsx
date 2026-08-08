"use client";

import {
  MenuOutlined,
  NodeCollapseOutlined,
  NodeExpandOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import AvatarMenu from "../avatar/avatar-menu";
import { useCustomRouter } from "@/hooks/use-custom-router";
import {
  PATH_PUBLIC_ADMIN_HELP,
  PATH_PUBLIC_SCHOOL_HELP,
} from "@/lib/constants/routes";
import { SchoolConfig } from "@/config/school";
import { Button, antdTheme } from "@/ui/antd";
import { useTranslations } from "next-intl";

interface DashboardHeaderProps {
  collapsed?: boolean;
  breakPointBroken?: boolean;
  hideLeftButton?: boolean;
  contentHeaderExtra?: React.ReactNode;
  onToggleDrawer?: () => void;
  onToggleSidebar?: () => void;
}

export default function DashboardHeader(props: DashboardHeaderProps) {
  // React hooks
  const router = useCustomRouter();

  // Next hooks
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const handleHelpClick = () => {
    if ((SchoolConfig.schoolID() ?? 0) > 0) {
      router.push(PATH_PUBLIC_SCHOOL_HELP);
    } else {
      router.push(PATH_PUBLIC_ADMIN_HELP);
    }
  };

  return (
    <>
      <div
        style={{
          padding: "10px 15px 10px 15px",
          backgroundColor: theme.colorFillQuaternary,
          borderRadius: theme.borderRadius,
          borderWidth: "0.5px",
          borderColor: theme.colorBorder,
        }}
        className="w-full flex items-center justify-between gap-5"
      >
        {props.hideLeftButton === true ? (
          <div className="w-full flex flex-wrap items-center">
            {props.contentHeaderExtra}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-5">
            {props.breakPointBroken === true ? (
              <Button
                size="large"
                icon={<MenuOutlined />}
                onClick={props.onToggleDrawer}
              />
            ) : (
              <Button
                size="large"
                icon={
                  props.collapsed === true ? (
                    <NodeCollapseOutlined />
                  ) : (
                    <NodeExpandOutlined />
                  )
                }
                onClick={props.onToggleSidebar}
              >
                {props.collapsed === true ? tWords("show") : tWords("hide")}
              </Button>
            )}
            {props.contentHeaderExtra}
          </div>
        )}
        <div className="w-auto flex items-center justify-end text-end gap-2.5">
          <div className="w-auto hidden xl:block">
            <Button
              size="large"
              icon={<QuestionCircleOutlined />}
              onClick={handleHelpClick}
            >
              {tWords("help")}
            </Button>
          </div>
          <div className="w-auto flex items-center justify-end gap-2">
            <AvatarMenu />
          </div>
        </div>
      </div>
    </>
  );
}
