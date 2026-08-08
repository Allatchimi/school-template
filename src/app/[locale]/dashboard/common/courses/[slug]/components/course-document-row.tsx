"use client";

import { CourseDocumentResponse } from "@/lib/api/school/common/course/response";
import Link from "next/link";
import { antdTheme, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function CourseDocumentRow(props: {
  item?: CourseDocumentResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div
      style={{
        backgroundColor: theme.colorFillQuaternary,
        borderRadius: theme.borderRadius,
        borderWidth: "0.5px",
        borderColor: theme.colorBorder,
      }}
      className="w-full flex flex-col gap-2 px-2.5 py-1.5"
    >
      <div className="w-full flex flex-col gap-1">
        <Text strong className="text-ellipsis line-clamp-1">
          {props.item?.title
            ? props.item?.title
            : tWords("invalidLabel", { label: tWords("title") })}
        </Text>
        <Text type="secondary" className="text-ellipsis line-clamp-3">
          {props.item?.description
            ? props.item?.description
            : tWords("invalidLabel", { label: tWords("description") })}
        </Text>
      </div>
      <div className="">
        <Link
          href={props.item?.url?.toString() ?? ""}
          target="_blank"
          className="text-ellipsis line-clamp-1"
        >
          {tWords("download")}
        </Link>
      </div>
    </div>
  );
}
