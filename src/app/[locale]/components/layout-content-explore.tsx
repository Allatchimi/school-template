"use client";

import {
  CustomContainer,
  CustomContainerXl,
} from "@/components/container/custom-container";
import Footer from "@/components/footer/footer";
import Contact from "@/components/section/contact";
import { MotionRevealFromBottom } from "@/components/motion/reveal";
import NavbarScrollEffect from "@/components/header/navbar-scroll-reveal";
import Navbar, { NavbarDefaultExtra } from "@/components/header/navbar";
import { antdTheme, Drawer } from "@/ui/antd";
import { ReactNode, useState } from "react";
import DrawerDefaultMenu, {
  DrawerMenuItemType,
} from "@/components/menu/drawer-default-menu";

import "../../../styles/drawer.css";

interface LayoutContentExplore {
  children?: React.ReactNode;
  drawerMenus?: DrawerMenuItemType[];
  drawerExtra?: ReactNode;
}

export default function LayoutContentExplore(
  props: Readonly<LayoutContentExplore>
) {
  // React hooks
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <>
      <NavbarScrollEffect>
        <CustomContainerXl>
          <Navbar
            extra={<NavbarDefaultExtra />}
            addPadding={true}
            onToggleDrawer={() => setDrawerOpen(true)}
          />
        </CustomContainerXl>
      </NavbarScrollEffect>

      <CustomContainerXl>
        <Navbar
          extra={<NavbarDefaultExtra />}
          onToggleDrawer={() => setDrawerOpen(true)}
        />
      </CustomContainerXl>

      <div className="w-full flex flex-col">
        <CustomContainer>
          <div
            style={{
              backgroundColor: theme.colorBgContainer,
              borderRadius: theme.borderRadius,
              borderWidth: "0.5px",
              borderColor: theme.colorBorder,
            }}
            className="w-full min-h-[80vh] mt-6 p-3 gap-6"
          >
            {props.children}
          </div>
          <div className="w-full flex flex-col gap-16">
            <div id="contact" className="pt-16 lg:pt-24">
              <MotionRevealFromBottom>
                <Contact />
              </MotionRevealFromBottom>
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
          menus={props.drawerMenus}
          extra={props.drawerExtra}
          onClose={() => setDrawerOpen(false)}
        />
      </Drawer>
    </>
  );
}
