"use client";

import { formatDateTime } from "@/helpers/date/format";
import {
  CourseDocumentResponse,
  CourseResponse,
  CourseVideoResponse,
} from "@/lib/api/school/common/course/response";
import { DescriptionsProps } from "antd";
import Link from "next/link";
import { List, ListItem, ListItemMeta, Text } from "@/ui/antd";
import { useTranslations } from "next-intl";

export function DescriptionCourse(
  item?: CourseResponse
): DescriptionsProps["items"] {
  // Next hooks
  const tWords = useTranslations("Words");

  return [
    {
      key: "id",
      label: tWords("id"),
      children: item?.id,
    },
    {
      key: "title",
      label: tWords("title"),
      children: item?.title,
    },
    {
      key: "description",
      label: tWords("description"),
      children: item?.description,
    },
    {
      key: "content",
      label: tWords("content"),
      children: (
        <div>
          <Link
            href={`/dashboard/common/courses/${item?.id ?? 0}`}
            target="_blank"
          >
            {tWords("content")}
          </Link>
        </div>
      ),
    },
    {
      key: "documents",
      label: tWords("documents"),
      children: DescriptionCourseDocuments(item?.documents ?? undefined),
    },
    {
      key: "videos",
      label: tWords("videos"),
      children: DescriptionCourseVideos(item?.videos ?? undefined),
    },
    {
      key: "createdAt",
      label: tWords("createdAt"),
      children: formatDateTime(item?.createdAt?.toString()),
    },
    {
      key: "updatedAt",
      label: tWords("updatedAt"),
      children: formatDateTime(item?.updatedAt?.toString()),
    },
  ];
}

function DescriptionCourseDocuments(items?: CourseDocumentResponse[]) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={items ?? []}
      renderItem={(item, index) => (
        <ListItem key={index}>
          <ListItemMeta
            avatar={<Text>{index + 1}</Text>}
            title={<Text>{item?.title}</Text>}
            description={
              <div className="flex flex-col gap-2">
                <Text type="secondary">{item?.description}</Text>
                <Link href={item?.url?.toString() ?? "/"} target="_blank">
                  {item?.url?.toString()}
                </Link>
              </div>
            }
          />
        </ListItem>
      )}
    />
  );
}

function DescriptionCourseVideos(items?: CourseVideoResponse[]) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={items ?? []}
      renderItem={(item, index) => (
        <ListItem key={index}>
          <ListItemMeta
            avatar={<Text>{index + 1}</Text>}
            title={<Text>{item?.title}</Text>}
            description={
              <div className="flex flex-col gap-2">
                <Text type="secondary">{item?.description}</Text>
                <Link href={item?.url ?? "/"} target="_blank">
                  {item?.url}
                </Link>
              </div>
            }
          />
        </ListItem>
      )}
    />
  );
}
