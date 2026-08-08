"use client";

import { useState } from "react";
import {
  MotionPageTransitionFromBottom,
  MotionPageTransitionFromTop,
} from "@/components/motion/motion-page";
import DashboardHeader from "@/components/header/dashboard-header";
import DashboardSideMenu from "@/components/menu/dashboard-side-menu";
import DrawerDashboardSideMenu from "@/components/menu/drawer-dashboard-side-menu";
import { ItemType } from "antd/es/menu/interface";
import { Drawer, Layout } from "@/ui/antd";

import "../../../../styles/drawer.css";

interface DashboardContentLayoutProps {
  hideSideBar?: boolean;
  contentHeaderExtra?: React.ReactNode;
  sideMenuItems?: (onClick?: (info: { key: string }) => void) => ItemType[];
  children?: React.ReactNode;
}

export default function DashboardContentLayout(
  props: DashboardContentLayoutProps
) {
  // React hooks
  const [collapsed, setIsCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [breakPointBroken, setIsBreakpointBroken] = useState(false);

  return (
    <>
      <Layout
        style={{
          backgroundColor: "transparent",
          scrollbarWidth: "thin",
          minHeight: "100vh",
        }}
      >
        {props.hideSideBar === true ? undefined : (
          <div className="w-auto hidden lg:block">
            <DashboardSideMenu
              collapsed={collapsed}
              breakPointBroken={breakPointBroken}
              onBreakPointChanged={(broken) => setIsBreakpointBroken(broken)}
              getItems={props.sideMenuItems}
            />
          </div>
        )}
        <Layout
          style={{
            backgroundColor: "transparent",
            scrollbarWidth: "thin",
            minHeight: "max-content",
            padding: "10px",
            gap: "10px",
          }}
        >
          <MotionPageTransitionFromTop>
            <DashboardHeader
              hideLeftButton={props.hideSideBar === true}
              contentHeaderExtra={props.contentHeaderExtra}
              collapsed={collapsed}
              breakPointBroken={breakPointBroken}
              onToggleSidebar={() => {
                setIsCollapsed(!collapsed);
              }}
              onToggleDrawer={() => {
                setIsDrawerOpen(!isDrawerOpen);
              }}
            />
          </MotionPageTransitionFromTop>
          <MotionPageTransitionFromBottom>
            <Layout.Content
              style={{
                overflow: "hidden",
                backgroundColor: "transparent",
                padding: "0px",
              }}
            >
              {props.children}
            </Layout.Content>
          </MotionPageTransitionFromBottom>
        </Layout>
      </Layout>

      {props.hideSideBar === true ? undefined : (
        <Drawer
          placement={"left"}
          closable={false}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          style={{
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
          }}
          width={250}
          className="hover:overflow-auto overflow-hidden custom-drawer"
        >
          <DrawerDashboardSideMenu getItems={props.sideMenuItems} />
        </Drawer>
      )}
    </>
  );
}
