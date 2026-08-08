"use client";

import { SchoolConfig } from "@/config/school";
import DashboardContentLayout from "../components/layout-content";
import AdminSideMenuItems from "./components/admin-side-menu-items";
import {
  PATH_PROTECTED_ADMIN,
  PATH_PROTECTED_DIRECTOR,
} from "@/lib/constants/routes";
import { useSession } from "next-auth/react";
import { FEATURE_ADMIN, FEATURE_DIRECTOR } from "@/lib/constants/user/feature";

export default function Layout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  // Next hooks
  const session = useSession();
  const feature = session.data?.user?.feature;

  const sideMenuItems = (onClick?: (info: { key: string }) => void) => {
    const menuItems = AdminSideMenuItems({
      isAdmin: feature === FEATURE_ADMIN ? true : false,
      schoolType: SchoolConfig.schoolType(),
      basePath:
        feature === FEATURE_ADMIN
          ? PATH_PROTECTED_ADMIN
          : feature === FEATURE_DIRECTOR
            ? PATH_PROTECTED_DIRECTOR
            : "",
      onClick: onClick,
    });
    return menuItems;
  };

  return (
    <DashboardContentLayout sideMenuItems={sideMenuItems}>
      {children}
    </DashboardContentLayout>
  );
}
