"use client";

import StudentIcon from "@/components/icon/material/student";
import { StudentResponse } from "@/lib/api/school/common/student/response";
import CardListCardTemplate, { CardListCardProps } from "../../card-list";
import ImageFallback from "@/components/image/image-fallback";
import { UserOutlined } from "@ant-design/icons";
import { antdTheme, Button, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function StudentCard(
  props: {
    onAssignClicked?: (value?: StudentResponse) => void;
  } & CardListCardProps<StudentResponse>
) {
  // Next hooks
  const tWords = useTranslations("Words");
  const tSentences = useTranslations("Sentences");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Params
  const icon = <StudentIcon width={30} height={30} color={theme.colorText} />;
  const title = props.item?.uid || tSentences("invalidUid");
  const subtitle = props.item?.school?.name || tSentences("invalidSchool");
  const createdAt = props.item?.createdAt ?? undefined;
  const updatedAt = props.item?.updatedAt ?? undefined;

  return (
    <CardListCardTemplate
      {...props}
      icon={icon}
      title={title}
      subtitle={subtitle}
      createdAt={createdAt}
      updatedAt={updatedAt}
    >
      <div className="w-full flex gap-2">
        <div className="w-[120px] h-[65px]">
          <ImageFallback
            src={props.item?.user?.info?.image ?? undefined}
            borderRadius={theme.borderRadius}
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex flex-col gap-1">
            <div className="w-full flex items-center gap-2">
              <UserOutlined />{" "}
              <Text className="text-ellipsis line-clamp-1">
                {props.item?.user?.info?.firstName ||
                  tSentences("invalidFirstName")}
              </Text>
            </div>
            <div className="w-full flex items-center gap-2">
              <UserOutlined />{" "}
              <Text className="text-ellipsis line-clamp-1">
                {props.item?.user?.info?.lastName ||
                  tSentences("invalidLastName")}
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end z-20">
        <Button onClick={() => props.onAssignClicked?.(props.item)}>
          {tWords("add")}
        </Button>
      </div>
    </CardListCardTemplate>
  );
}
