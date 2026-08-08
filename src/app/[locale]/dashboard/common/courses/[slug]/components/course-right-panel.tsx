"use client";

import CourseVideoSection from "./course-video-section";
import CourseDocumentSection from "./course-document-section";
import {
  CourseDocumentResponse,
  CourseVideoResponse,
} from "@/lib/api/school/common/course/response";
import { antdTheme } from "@/ui/antd";

export default function CourseRightPanel(props: {
  loading?: boolean;
  documents?: CourseDocumentResponse[];
  videos?: CourseVideoResponse[];
}) {
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
      className="w-full xl:max-w-xs max-h-fit flex flex-col gap-4 p-4"
    >
      <CourseVideoSection loading={props.loading} items={props.videos} />
      <CourseDocumentSection loading={props.loading} items={props.documents} />
    </div>
  );
}
