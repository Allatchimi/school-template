"use client";

import CourseDocumentRow from "./course-document-row";
import { CourseDocumentResponse } from "@/lib/api/school/common/course/response";
import { Divider, List } from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function DocumentSection(props: {
  loading?: boolean;
  items?: CourseDocumentResponse[];
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <div className="w-full max-h-fit flex flex-col">
      <Divider plain style={{ padding: "0px" }}>
        {tWords("documents")}
      </Divider>
      <List
        loading={props.loading === true}
        split={false}
        dataSource={props.items}
        renderItem={(item, index) => (
          <List.Item style={{ paddingTop: "0px" }}>
            <CourseDocumentRow key={index} item={item} />
          </List.Item>
        )}
      />
    </div>
  );
}
