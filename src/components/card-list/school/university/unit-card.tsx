"use client";

import SubjectIcon from "@/components/icon/material/subject";
import { UnitResponse } from "@/lib/api/school/university/unit/response";
import CardListCardTemplate, { CardListCardProps } from "../../card-list";
import { antdTheme, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function UnitCard(props: CardListCardProps<UnitResponse>) {
  // Next hooks
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Params
  const icon = <SubjectIcon width={30} height={30} color={theme.colorText} />;
  const title =
    props.item?.name || tWords("invalidLabel", { label: tWords("unit") });
  const subtitle =
    props.item?.semester?.name ||
    tWords("invalidLabel", { label: tWords("semester") });
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
      titleExtra={`${tWords("credit")} ${props.item?.credit ?? "0"}`}
      createdAt={createdAt}
      updatedAt={updatedAt}
      showStatus={false}
      status={status}
      statusColor={statusColor}
    >
      <Text className="text-ellipsis line-clamp-3">
        {props.item?.description}
      </Text>
    </CardListCardTemplate>
  );
}
