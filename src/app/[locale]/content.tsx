"use client";

import Navbar, {
  NavbarDefaultExtra,
  NavbarAdminMenus,
} from "@/components/header/navbar";
import {
  CustomContainer,
  CustomContainerXl,
} from "@/components/container/custom-container";
import Footer from "@/components/footer/footer";
import Hero from "./components/hero";
import HeroBenefits from "./components/hero-benefits";
import HeroDirector from "./components/hero-director";
import HeroTeacher from "./components/hero-teacher";
import HeroStudent from "./components/hero-student";
import HeroParent from "./components/hero-parent";
import Contact from "@/components/section/contact";
import NavbarScrollEffect from "@/components/header/navbar-scroll-reveal";
import HeroStatistics from "./components/hero-statistics";
import { MotionRevealFromTop } from "@/components/motion/reveal";
import { Drawer } from "@/ui/antd";
import DrawerDefaultMenu, {
  DrawerMenuItemType,
} from "@/components/menu/drawer-default-menu";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function PageContent() {
  // React hooks
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Next hooks
  const tPage = useTranslations("Pages.home");

  const drawerMenus: DrawerMenuItemType[] = [
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
    <>
      <NavbarScrollEffect>
        <CustomContainerXl>
          <Navbar
            menus={<NavbarAdminMenus />}
            extra={<NavbarDefaultExtra />}
            addPadding={true}
            onToggleDrawer={() => setDrawerOpen(true)}
          />
        </CustomContainerXl>
      </NavbarScrollEffect>

      <CustomContainer>
        <Navbar
          menus={<NavbarAdminMenus />}
          extra={<NavbarDefaultExtra />}
          onToggleDrawer={() => setDrawerOpen(true)}
        />
      </CustomContainer>

      <div className="w-full min-h-screen flex flex-col gap-16">
        <CustomContainerXl>
          <MotionRevealFromTop>
            <Hero />
          </MotionRevealFromTop>
        </CustomContainerXl>
        <CustomContainer>
          <div className="w-full flex flex-col gap-16">
            <div className="lg:pt-24">
              <HeroBenefits />
            </div>
            <div id="directors" className="lg:pt-24">
              <HeroDirector />
            </div>
            <div id="teachers" className="lg:pt-24">
              <HeroTeacher />
            </div>
          </div>
        </CustomContainer>
        <div className="lg:pt-24">
          <HeroStatistics />
        </div>
        <CustomContainer>
          <div className="w-full flex flex-col gap-16">
            <div id="students" className="lg:pt-24">
              <HeroStudent />
            </div>
            <div id="parents" className="lg:pt-24">
              <HeroParent />
            </div>
            <div id="contact" className="lg:pt-24">
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
