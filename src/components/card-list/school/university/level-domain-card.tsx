"use client";

import { LevelDomainResponse } from "@/lib/api/school/university/level/response";
import WorkspaceIcon from "@/components/icon/material/workspace";
import CardListCardTemplate, { CardListCardProps } from "../../card-list";
import { antdTheme, Button, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function LevelDomainCard(
  props: {
    isPublic?: boolean;
    onPreEnrollClicked?: (value?: LevelDomainResponse) => void;
  } & CardListCardProps<LevelDomainResponse>
) {
  // Next hooks
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Params
  const icon = <WorkspaceIcon width={30} height={30} color={theme.colorText} />;
  const title = `${props.item?.level?.name || tWords("invalidLabel", { label: tWords("level") })} - ${
    props.item?.domain?.name ||
    tWords("invalidLabel", { label: tWords("domain") })
  }`;
  const subtitle =
    props.item?.domain?.department?.name ||
    tWords("invalidLabel", { label: tWords("department") });
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
          <Text className="text-ellipsis line-clamp-1">
            {tWords("faculty")}{" "}
            {props.item?.domain?.department?.faculty?.name ||
              tWords("invalidLabel", { label: tWords("faculty") })}
          </Text>
          <Text type="secondary" className="text-ellipsis line-clamp-3">
            {props.item?.level?.description} {props.item?.domain?.description}
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
