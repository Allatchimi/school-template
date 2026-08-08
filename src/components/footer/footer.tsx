"use client";

import Link from "next/link";
import { CustomContainer } from "../container/custom-container";
import {
  FacebookFilled,
  WhatsAppOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import ImageFallback from "../image/image-fallback";
import { antdTheme } from "@/ui/antd";
import { SchoolConfig } from "@/config/school";
import { useTranslations } from "next-intl";

export default function Footer() {
  // Next hooks
  const tComponents = useTranslations("Components.footer");
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const links = [
    {
      title: tComponents("links.legalSupport.title"),
      items: [
        ...(SchoolConfig.schoolID()
          ? []
          : [{ label: tWords("about"), href: "/about" }]),
        { label: tWords("privacyPolicy"), href: "/policy" },
      ],
    },
    {
      title: tComponents("links.information.title"),
      items: [{ label: tWords("contactUs"), href: "#contact" }],
    },
  ];

  return (
    <footer
      style={{
        background: theme.colorPrimary,
        borderTopWidth: "0.5px",
        borderTopColor: theme.colorBorder,
      }}
      className="w-full mt-16 lg:mt-52"
    >
      <CustomContainer>
        <div className="w-full flex flex-col gap-12 py-12">
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="w-full">
              <Link
                style={{
                  color: theme.colorWhite,
                }}
                href="/"
                className="flex items-center gap-2"
              >
                <div className="w-16 h-16 lg:w-10 lg:h-10">
                  <ImageFallback
                    objectFit="contain"
                    backgroundColor="transparent"
                    src={"/assets/images/logos/logo-white.png"}
                  />
                </div>
                <span className="self-center text-lg lg:text-xl font-medium whitespace-nowrap text-primary">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>
              </Link>
            </div>
            {links.map((group) => (
              <div key={group.title}>
                <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                  {group.title}
                </h2>
                <ul className="font-medium">
                  {group.items.map((link, index) => (
                    <li className="mb-4" key={link.label + index}>
                      <Link
                        href={link.href}
                        className="text-white/75 hover:text-white hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="w-full flex items-center justify-center gap-8">
            <Link
              href="https://www.youtube.com"
              target="_blank"
              className="text-white/75 hover:text-white"
            >
              <YoutubeFilled style={{ fontSize: "24px" }} />
              <span className="sr-only">Youtube</span>
            </Link>
            <Link
              href="https://www.facebook.com"
              target="_blank"
              className="text-white/75 hover:text-white"
            >
              <FacebookFilled style={{ fontSize: "24px" }} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://www.whatsapp.com"
              target="_blank"
              className="text-white/75 hover:text-white"
            >
              <WhatsAppOutlined style={{ fontSize: "24px" }} />
              <span className="sr-only">Whatsapp</span>
            </Link>
          </div>
          <span className="block text-sm text-center text-white/75">
            © 2025{" "}
            <Link
              href="/"
              className="hover:underline text-white/75 hover:text-white"
            >
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Link>
            . {tComponents("copyright.allRightsReserved")}
          </span>
        </div>
      </CustomContainer>
    </footer>
  );
}
