"use client";

import { ReactNode } from "react";
import ManageAccountsIcon from "@/components/icon/material/manage-accounts";
import ChatIcon from "@/components/icon/material/chat";
import {
  MotionRevealFromTop,
  MotionRevealFromBottom,
} from "@/components/motion/reveal";
import VideoCameraIcon from "@/components/icon/material/video-camera";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import CardBasic from "@/components/card/card-basic";
import { antdTheme, Title, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

interface HeroBenefitsCardProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function HeroBenefits() {
  // Next hooks
  const tPage = useTranslations("Pages.home.heroBenefits");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const items: HeroBenefitsCardProps[] = [
    {
      icon: <ManageAccountsIcon className="fill-white" />,
      title: tPage("cardManagement.title"),
      description: tPage("cardManagement.description"),
      actionLabel: tPage("cardManagement.actionLabel"),
      actionHref: tPage("cardManagement.actionHref"),
    },
    {
      icon: <ChatIcon className="fill-white" />,
      title: tPage("cardForum.title"),
      description: tPage("cardForum.description"),
      actionLabel: tPage("cardForum.actionLabel"),
      actionHref: tPage("cardForum.actionHref"),
    },
    {
      icon: <VideoCameraIcon className="fill-white" />,
      title: tPage("cardMeeting.title"),
      description: tPage("cardMeeting.description"),
      actionLabel: tPage("cardMeeting.actionLabel"),
      actionHref: tPage("cardMeeting.actionHref"),
    },
  ];
  return (
    <section>
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <MotionRevealFromTop>
          <div className="w-full flex flex-col items-center justify-center text-center gap-6">
            <Text
              style={{
                color: theme.colorPrimary,
              }}
              className="font-bold underline underline-offset-8"
            >
              {tPage("title")}
            </Text>
            <Title
              level={2}
              style={{ margin: "0px" }}
              className="max-w-[600px]"
            >
              {tPage("subtitle")}
            </Title>
            <Text
              style={{ fontSize: theme.fontSizeLG }}
              className="max-w-[400px]"
            >
              {tPage("description")}
            </Text>
          </div>
        </MotionRevealFromTop>

        <MotionRevealFromBottom>
          <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <CardBasic
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                extra={
                  <Link
                    style={{
                      color: theme.colorPrimary,
                    }}
                    href={item.actionHref ?? ""}
                    className="mt-3 inline-flex items-center"
                  >
                    <span className="mr-1">
                      {item.actionLabel ?? "No action label"}
                    </span>{" "}
                    <ArrowRightOutlined />
                  </Link>
                }
              />
            ))}
          </div>
        </MotionRevealFromBottom>
      </div>
    </section>
  );
}
