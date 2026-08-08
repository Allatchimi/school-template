"use client";

import DashboardContentLayout from "../components/layout-content";
import { SchoolConfig } from "@/config/school";
import TeacherSideMenuItems from "./components/teacher-side-menu-items";
import { PATH_PROTECTED_TEACHER } from "@/lib/constants/routes";
import PreloadInvalidYear from "../../components/preload-invalid-year";

export default function Layout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  const sideMenuItems = (onClick?: (info: { key: string }) => void) => {
    const menuItems = TeacherSideMenuItems({
      schoolType: SchoolConfig.schoolType(),
      basePath: PATH_PROTECTED_TEACHER,
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
