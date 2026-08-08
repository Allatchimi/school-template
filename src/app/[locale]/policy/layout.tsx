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
  const tWords = useTranslations("Words");

  const menus: DrawerMenuItemType[] = [
    {
      href: "/",
      label: tWords("home"),
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
