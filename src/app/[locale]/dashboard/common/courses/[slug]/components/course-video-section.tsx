"use client";

import { useState } from "react";
import { CourseVideoResponse } from "@/lib/api/school/common/course/response";
import { antdTheme, Select, Spin } from "@/ui/antd";

export default function CourseVideoSection(props: {
  loading?: boolean;
  items?: CourseVideoResponse[];
}) {
  // React hooks
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(-1);

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div className="w-full min-h-[200px]">
      <div className="w-full h-full flex flex-col gap-2">
        <Spin spinning={props.loading}>
          <div className="w-full flex flex-col gap-2">
            <iframe
              style={{
                backgroundColor: theme.colorFillTertiary,
                borderRadius: theme.borderRadius,
                borderWidth: "0.5px",
                borderColor: theme.colorBorder,
                width: "100%",
                height: "200px",
              }}
              src={
                currentVideoIndex >= 0
                  ? (props.items?.[currentVideoIndex]?.url ?? "")
                  : undefined
              }
            />
          </div>
        </Spin>

        <Select
          disabled={props.loading === true}
          options={
            props.items?.map((item, index) => ({
              data: item,
              label: item.title ?? "",
              value: index.toString(),
            })) ?? []
          }
          onChange={(value) => {
            const index = parseInt(`${value || "0"}`);
            setCurrentVideoIndex(index);
          }}
          style={{
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}
