"use client";

import Navbar, {
  NavbarDefaultExtra,
  NavbarDefaultMenus,
} from "@/components/header/navbar";
import {
  CustomContainer,
  CustomContainerXl,
} from "@/components/container/custom-container";
import Footer from "@/components/footer/footer";
import Hero from "./components/hero";
import Contact from "@/components/section/contact";
import NavbarScrollEffect from "@/components/header/navbar-scroll-reveal";
import { MotionRevealFromTop } from "@/components/motion/reveal";
import { Drawer } from "@/ui/antd";
import DrawerDefaultMenu, {
  DrawerMenuItemType,
} from "@/components/menu/drawer-default-menu";
import { useState } from "react";
import { SchoolConfig } from "@/config/school";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";

export default function PageContent() {
  // React hooks
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    <>
      <NavbarScrollEffect>
        <CustomContainerXl>
          <Navbar
            menus={<NavbarDefaultMenus />}
            extra={<NavbarDefaultExtra />}
            addPadding={true}
            onToggleDrawer={() => setDrawerOpen(true)}
          />
        </CustomContainerXl>
      </NavbarScrollEffect>

      <CustomContainerXl>
        <Navbar
          menus={<NavbarDefaultMenus />}
          extra={<NavbarDefaultExtra />}
          onToggleDrawer={() => setDrawerOpen(true)}
        />
      </CustomContainerXl>

      <div className="w-full min-h-[60vh] flex flex-col">
        <CustomContainerXl>
          <MotionRevealFromTop>
            <Hero />
          </MotionRevealFromTop>
        </CustomContainerXl>
        <CustomContainer>
          <div className="w-full flex flex-col">
            <div id="contact" className="pt-16 lg:pt-24">
              <Contact />
            </div>
          </div>
        </CustomContainer>
      </div>
      <Footer />
      <Drawer
        placement={"right"}
        closable={true}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        style={{
          scrollbarWidth: "thin",
          scrollbarGutter: "auto",
        }}
        width={250}
        className="hover:overflow-auto overflow-hidden custom-drawer"
      >
        <DrawerDefaultMenu
          menus={drawerMenus}
          extra={<NavbarDefaultExtra />}
          onClose={() => setDrawerOpen(false)}
        />
      </Drawer>
    </>
  );
}
