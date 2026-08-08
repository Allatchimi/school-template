"use client";

import DashboardContentLayout from "../../components/layout-content";
import CourseBreadcrumb from "./[slug]/components/course-breadcrumb";

export default function Layout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <DashboardContentLayout
      hideSideBar={true}
      contentHeaderExtra={<CourseBreadcrumb />}
    >
      {children}
    </DashboardContentLayout>
  );
}
