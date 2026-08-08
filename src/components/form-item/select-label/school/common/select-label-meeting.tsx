"use client";

import { MeetingResponse } from "@/lib/api/school/common/meeting/response";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import { Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function SelectLabelMeeting(props: { item?: MeetingResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-auto flex items-center gap-2">
      <div className="flex flex-col">
        <Text ellipsis>
          {props.item?.apiRoomID ||
            tWords("invalidLabel", { label: tWords("apiRoomID") })}
        </Text>
        <Text ellipsis type="secondary">
          {props.item?.school?.type === SCHOOL_TYPE_UNIVERSITY
            ? props.item.unit?.name ||
              tWords("invalidLabel", { label: tWords("unit") })
            : props.item?.classSubject?.subject?.name ||
              tWords("invalidLabel", { label: tWords("subject") })}
        </Text>
      </div>
    </div>
  );
}
