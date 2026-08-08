"use client";

import { COLOR_SCHEME } from "@/lib/constants/others/color";
import { App, ConfigProvider, theme } from "antd";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import frFR from "antd/locale/fr_FR";
import enUS from "antd/locale/en_US";
import { useLocale } from "next-intl";
import { LOCALE_FR } from "@/lib/constants/locales";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  style: "normal",
  preload: true,
});

export default function AntdTheme({
  children,
}: Readonly<{ children?: ReactNode }>) {
  const darkMode = false;
  const locale = useLocale();

  return (
    <ConfigProvider
      locale={locale === LOCALE_FR ? frFR : enUS}
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          // Colors primary
          colorPrimary: darkMode ? COLOR_SCHEME.primary : COLOR_SCHEME.primary,
          colorPrimaryBg: darkMode
            ? COLOR_SCHEME.primaryBg
            : COLOR_SCHEME.primaryBg,
          colorPrimaryBgHover: darkMode
            ? COLOR_SCHEME.primaryBgHover
            : COLOR_SCHEME.primaryBgHover,

          // Colors container & secondary
          colorBgContainer: darkMode ? "#0b0e0d" : "#ffffff", // Card, container
          colorBgBase: darkMode ? "#181d1b" : "#fcfdfd", // Body
          colorBgElevated: darkMode ? "#28312e" : "#fcfdfd", // Modal, popup
          colorBorderSecondary: darkMode ? "#d9d9d9" : "#d9d9d9",

          // Colors fill
          // colorFillQuaternary: darkMode
          //   ? `${COLOR_SCHEME.primaryBg}33`
          //   : `${COLOR_SCHEME.primaryBg}33`,
          colorFillQuaternary: darkMode
            ? `rgba(0, 0, 0, 0.025)`
            : `rgba(0, 0, 0, 0.025)`,

          // Radius
          borderRadius: 10,

          // Shadow
          boxShadow: darkMode
            ? "rgba(255, 255, 255, 0.05) 0px 7px 29px 0px"
            : "rgba(0, 0, 0, 0.1) 0px 7px 29px 0px",
          boxShadowSecondary: darkMode
            ? "rgba(255, 255, 255, 0.05) 0px 7px 29px 0px"
            : "rgba(0, 0, 0, 0.1) 0px 7px 29px 0px",
          boxShadowTertiary: darkMode
            ? "rgba(255, 255, 255, 0.05) 0px 7px 29px 0px"
            : "rgba(0, 0, 0, 0.1) 0px 7px 29px 0px",

          // Font
          fontFamily: inter.style.fontFamily,
          fontWeightStrong: 700,
        },

        // Components
        components: {
          Menu: {
            subMenuItemBorderRadius: 15,
          },
          Rate: {
            starColor: "#faad14",
          },
          Table: {
            headerBorderRadius: 0,
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
