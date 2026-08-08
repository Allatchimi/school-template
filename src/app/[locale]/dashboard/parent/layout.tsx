"use client";

import DashboardContentLayout from "../components/layout-content";
import { SchoolConfig } from "@/config/school";
import { PATH_PROTECTED_PARENT } from "@/lib/constants/routes";
import ParentSideMenuItems from "./components/parent-side-menu-items";
import PreloadInvalidYear from "../../components/preload-invalid-year";

export default function Layout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  const sideMenuItems = (onClick?: (info: { key: string }) => void) => {
    const menuItems = ParentSideMenuItems({
      schoolType: SchoolConfig.schoolType(),
      basePath: PATH_PROTECTED_PARENT,
      onClick: onClick,
    });
    return menuItems;
  };

  return (
    <DashboardContentLayout sideMenuItems={sideMenuItems}>
      {SchoolConfig.yearID() ? children : <PreloadInvalidYear />}
    </DashboardContentLayout>
  );
}
