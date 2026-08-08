"use client";

import SubjectIcon from "@/components/icon/material/subject";
import { ClassSubjectResponse } from "@/lib/api/school/highschool/class/response";
import CardListCardTemplate, { CardListCardProps } from "../../card-list";
import { antdTheme, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function ClassSubjectCard(
  props: CardListCardProps<ClassSubjectResponse>
) {
  // Next hooks
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Params
  const icon = <SubjectIcon width={30} height={30} color={theme.colorText} />;
  const title =
    props.item?.subject?.name ||
    tWords("invalidLabel", { label: tWords("subject") });
  const subtitle =
    props.item?.class?.name ||
    tWords("invalidLabel", { label: tWords("class") });
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
      titleExtra={`${tWords("coefficient")} ${props.item?.coefficient ?? "0"}`}
      createdAt={createdAt}
      updatedAt={updatedAt}
      showStatus={false}
      status={status}
      statusColor={statusColor}
    >
      <Text className="text-ellipsis line-clamp-3">
        {props.item?.subject?.description} {props.item?.class?.description}
      </Text>
    </CardListCardTemplate>
  );
}
