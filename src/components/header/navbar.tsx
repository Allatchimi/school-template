"use client";

import { ReactNode, useTransition } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AvatarMenu from "../avatar/avatar-menu";
import ImageFallback from "../image/image-fallback";
import { Button, antdTheme } from "@/ui/antd";
import { SchoolConfig } from "@/config/school";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import { MenuOutlined, TranslationOutlined } from "@ant-design/icons";
import { useLocale, useTranslations } from "next-intl";
import { LOCALE_DEFAULT, LOCALE_FR } from "@/lib/constants/locales";
import { setUserLocale } from "@/services/locale";
import { usePathname } from "next/navigation";
import { setDateTimeLocaleLanguage } from "@/helpers/date/format";

interface NavbarProps {
  menus?: ReactNode;
  extra?: ReactNode;
  addPadding?: boolean;
  onToggleDrawer?: () => void;
}

interface MenuItemType {
  label: string;
  link: string;
}

export default function Navbar(props: NavbarProps) {
  // React hooks
  const [isPending, startTransition] = useTransition();

  // Next hooks
  const session = useSession();
  const locale = useLocale();
  const pathname = usePathname();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const toggleLocale = () => {
    const newLocale = locale === LOCALE_DEFAULT ? LOCALE_FR : LOCALE_DEFAULT;
    if (newLocale !== locale) {
      startTransition(async () => {
        await setUserLocale(newLocale); // Update the date locale on the client side

        setDateTimeLocaleLanguage(newLocale); // Redirect the user to the new locale route

        window.location.replace(
          pathname.replace(`/${locale}`, `/${newLocale}`)
        );
      });
    }
  };

  return (
    <div
      style={
        props.addPadding === true
          ? {
              borderRadius: theme.borderRadius,
              borderWidth: "0.5px",
              borderColor: theme.colorBorder,
              backgroundColor: theme.colorBgContainer,
              boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
            }
          : {}
      }
      className={
        props.addPadding === true ? "w-full my-2 px-2 lg:px-6" : "w-full"
      }
    >
      <nav className="w-full relative z-100">
        <div className="w-full flex items-center justify-between gap-6 py-4">
          <div className="w-full max-w-1/2 flex items-center">
            <Link
              style={{
                color: theme.colorText,
              }}
              href="/"
              className="flex items-center gap-2"
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  minWidth: "max-content",
                }}
              >
                <ImageFallback
                  objectFit="contain"
                  src={"/assets/images/logos/logo.png"}
                />
              </div>
              <span className="w-full lg:font-semibold text-lg lg:text-2xl text-ellipsis line-clamp-1">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </Link>
          </div>
          <div className="w-full hidden xl:block">
            <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {props.menus}
            </div>
          </div>
          <div className="w-auto flex items-center justify-end text-end">
            <div className="w-auto ml-2.5">
              <Button
                color="default"
                variant="filled"
                icon={<TranslationOutlined />}
                onClick={toggleLocale}
                loading={isPending}
              >
                {locale.toUpperCase() || LOCALE_DEFAULT.toUpperCase()}
              </Button>
            </div>
            <div className="w-auto hidden xl:block ml-2.5">{props.extra}</div>
            <div className="w-auto ml-2.5">
              {session.status === "authenticated" ||
              session.status === "loading" ? (
                <div className="w-auto flex items-center justify-end gap-2">
                  <AvatarMenu />
                </div>
              ) : undefined}
            </div>
            <div className="w-auto block xl:hidden ml-2.5">
              <Button
                size="large"
                icon={<MenuOutlined />}
                onClick={props.onToggleDrawer}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

//  -------------------- Menus --------------------
export function NavbarAdminMenus() {
  // Next hooks
  const tPage = useTranslations("Pages.home");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const menus: MenuItemType[] = [
    {
      label: tPage("menus.home"),
      link: "/",
    },
    {
      label: tPage("menus.directors"),
      link: "#directors",
    },
    {
      label: tPage("menus.teachers"),
      link: "#teachers",
    },
    {
      label: tPage("menus.students"),
      link: "#students",
    },
    {
      label: tPage("menus.parents"),
      link: "#parents",
    },
  ];
  return (
    <ul className="flex flex-col justify-center items-center p-4 md:p-0 mt-4 d-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0">
      {menus.map((item) => {
        return (
          <li key={item.label}>
            <Link
              style={{
                color: theme.colorText,
                fontSize: "16px",
                fontWeight: "600",
              }}
              href={item.link}
              aria-current="page"
              className="py-2 px-3 font-semibold text-ellipsis opacity-75 hover:opacity-100 transition-all"
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function NavbarDefaultMenus() {
  // Next hooks
  const tPage = useTranslations("Pages.homeSchool");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const menus: MenuItemType[] = [
    {
      link: "/",
      label: tPage("menus.home"),
    },
    {
      link:
        SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY
          ? "/common/preenroll/level-domains"
          : "/common/preenroll/classes",
      label: tPage("menus.preEnroll"),
    },
    {
      link: "/common/help",
      label: tPage("menus.explore"),
    },
  ];
  return (
    <ul className="flex flex-col justify-center items-center p-4 md:p-0 mt-4 d-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0">
      {menus.map((item) => {
        return (
          <li key={item.label}>
            <Link
              style={{
                color: theme.colorText,
                fontSize: "16px",
                fontWeight: "600",
              }}
              href={item.link}
              aria-current="page"
              className="py-2 px-3 font-semibold text-ellipsis opacity-75 hover:opacity-100 transition-all"
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
export function NavbarHelpCenterAdminMenus() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const menus: MenuItemType[] = [];

  return (
    <ul className="flex flex-col justify-center items-center p-4 md:p-0 mt-4 d-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0">
      <li className="z-40">
        {menus.map((item) => {
          return (
            <li key={item.label}>
              <Link
                style={{
                  color: theme.colorText,
                  fontSize: "16px",
                  fontWeight: "600",
                }}
                href={item.link}
                aria-current="page"
                className="py-2 px-3 font-semibold text-ellipsis opacity-75 hover:opacity-100 transition-all ell"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </li>
    </ul>
  );
}
export function NavbarHelpCenterDefaultMenus() {
  // Next hooks
  const tPage = useTranslations("Pages.homeSchool");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const menus: MenuItemType[] = [
    {
      link: "/",
      label: tPage("menus.home"),
    },
    {
      link:
        SchoolConfig.schoolType() === SCHOOL_TYPE_UNIVERSITY
          ? "/common/preenroll/level-domains"
          : "/common/preenroll/classes",
      label: tPage("menus.preEnroll"),
    },
    {
      link: "/common/help",
      label: tPage("menus.explore"),
    },
  ];

  return (
    <ul className="flex flex-col justify-center items-center p-4 md:p-0 mt-4 d-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0">
      {menus.map((item) => {
        return (
          <li key={item.label}>
            <Link
              style={{
                color: theme.colorText,
                fontSize: "16px",
                fontWeight: "600",
              }}
              href={item.link}
              aria-current="page"
              className="py-2 px-3 font-semibold text-ellipsis opacity-75 hover:opacity-100 transition-all"
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

//  -------------------- Extras --------------------
export function NavbarDefaultExtra() {
  // Next hooks
  const session = useSession();
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto min-w-max flex flex-col xl:flex-row flex-wrap gap-4">
      <Link href="#contact">
        <Button size="large">{tWords("contactUs")}</Button>
      </Link>
      {session.status === "unauthenticated" ? (
        <Link href="/auth/login">
          <Button type="primary" size="large">
            {tWords("login")}
          </Button>
        </Link>
      ) : undefined}
    </div>
  );
}
