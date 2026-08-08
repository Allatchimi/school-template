import { DrawerMenuItemType } from "@/components/menu/drawer-default-menu";
import LayoutContentExplore from "../components/layout-content-explore";
import { NavbarDefaultExtra } from "@/components/header/navbar";
import { SchoolConfig } from "@/config/school";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";

export default function Layout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  // Next hooks
  const tPage = useTranslations("Pages.homeSchool");

  const drawerMenus: DrawerMenuItemType[] = [
    {
      href: "/",
      label: tPage("menus.home"),
    },
    {
      href:
        SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY
          ? "/common/preenroll/level-domains"
          : "/common/preenroll/classes",
      label: tPage("menus.preEnroll"),
    },
    {
      href: "/common/help",
      label: tPage("menus.explore"),
    },
  ];
  return (
    <LayoutContentExplore
      drawerMenus={drawerMenus}
      drawerExtra={<NavbarDefaultExtra />}
    >
      {children}
    </LayoutContentExplore>
  );
}
