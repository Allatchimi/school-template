import { NavbarDefaultExtra } from "@/components/header/navbar";
import { DrawerMenuItemType } from "@/components/menu/drawer-default-menu";
import LayoutContentExplore from "../components/layout-content-explore";
import { useTranslations } from "next-intl";

export default function Layout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  // Next hooks
  const tPage = useTranslations("Pages.home");

  const menus: DrawerMenuItemType[] = [
    {
      label: tPage("menus.home"),
      href: "/",
    },
    {
      label: tPage("menus.directors"),
      href: "#directors",
    },
    {
      label: tPage("menus.teachers"),
      href: "#teachers",
    },
    {
      label: tPage("menus.students"),
      href: "#students",
    },
    {
      label: tPage("menus.parents"),
      href: "#parents",
    },
  ];

  return (
    <LayoutContentExplore
      drawerMenus={menus}
      drawerExtra={<NavbarDefaultExtra />}
    >
      {children}
    </LayoutContentExplore>
  );
}
