"use client";

import { ClassResponse } from "@/lib/api/school/highschool/class/response";
import WorkspaceIcon from "@/components/icon/material/workspace";
import CardListCardTemplate, { CardListCardProps } from "../../card-list";
import { antdTheme, Button, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function ClassCard(
  props: {
    isPublic?: boolean;
    onPreEnrollClicked?: (value?: ClassResponse) => void;
  } & CardListCardProps<ClassResponse>
) {
  // Next hooks
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Params
  const icon = <WorkspaceIcon width={30} height={30} color={theme.colorText} />;
  const title =
    props.item?.name || tWords("invalidLabel", { label: tWords("class") });
  const subtitle =
    props.item?.specialty?.name ||
    tWords("invalidLabel", { label: tWords("specialty") });
  const createdAt = props.item?.createdAt ?? undefined;
  const updatedAt = props.item?.updatedAt ?? undefined;
  const status = undefined;
  const statusColor = undefined;

  return (
    <CardListCardTemplate
      {...props}
      icon={icon}
      title={title}
      subtitle={subtitle}
      titleExtra={`${props.item?.fees ?? 0} ${props.item?.school?.currency?.toUpperCase() ?? ""}`}
      createdAt={createdAt}
      updatedAt={updatedAt}
      showStatus={false}
      status={status}
      statusColor={statusColor}
    >
      <div className="w-full h-full flex flex-col justify-between gap-4">
        <div className="w-full">
          <Text className="text-ellipsis line-clamp-5">
            {tWords("section")}{" "}
            {props.item?.specialty?.section?.name ||
              tWords("invalidLabel", { label: tWords("section") })}
          </Text>
          <Text type="secondary" className="text-ellipsis line-clamp-5">
            {props.item?.description}
          </Text>
        </div>
        {props.isPublic === true ? (
          <div className="w-full flex items-center z-20">
            {props.item?.isValid === true ? (
              <Button onClick={() => props.onPreEnrollClicked?.(props.item)}>
                {tWords("preEnroll")}
              </Button>
            ) : (
              <Text type="secondary" ellipsis>
                {tWords("closed")}
              </Text>
            )}
          </div>
        ) : undefined}
      </div>
    </CardListCardTemplate>
  );
}
