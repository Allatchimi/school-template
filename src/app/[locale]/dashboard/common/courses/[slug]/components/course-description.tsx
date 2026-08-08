"use client";

import { useEffect, useRef, useState } from "react";
import { CourseResponse } from "@/lib/api/school/common/course/response";
import { antdTheme, Spin, Button } from "@/ui/antd";
import RichTextEditorBubble from "@/components/editor/rich-text-editor-bubble";
import { RichTextEditorBubbleHandle } from "@/components/editor/rich-text-editor-bubble-internal";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import ResultFailed from "@/components/result/result";

export default function CourseDescription(props: {
  loading?: boolean;
  loadingError?: boolean;
  status?: number;
  item?: CourseResponse;
  onRefresh?: () => void;
}) {
  // React hooks
  const editorRef = useRef<RichTextEditorBubbleHandle | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Next hooks
  const tWords = useTranslations("Words");

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setIsOverflowing(scrollHeight > 1600);
    }
  }, [props.item?.content]);

  return (
    <div
      style={{
        backgroundColor: theme.colorFillQuaternary,
        borderRadius: theme.borderRadius,
        borderWidth: "0.5px",
        borderColor: theme.colorBorder,
      }}
      className="w-full min-h-screen p-4"
    >
      <div className="w-full min-h-[200px] flex items-center justify-center">
        {props.loadingError === true ? (
          <ResultFailed status={props.status} onRefresh={props.onRefresh} />
        ) : (
          <Spin spinning={props.loading} className="w-full">
            <div
              ref={contentRef}
              className="w-full relative overflow-hidden transition-all duration-300"
              style={{
                maxHeight: expanded ? "none" : "1600px",
              }}
            >
              <RichTextEditorBubble
                ref={editorRef}
                props={{
                  disabled: true,
                  defaultValue: props.item?.content ?? "",
                }}
              />
            </div>

            {isOverflowing && !expanded && (
              <div className="w-full flex justify-center mt-4">
                <Button
                  type="primary"
                  icon={<ArrowDownOutlined />}
                  onClick={() => setExpanded(true)}
                >
                  {tWords("showMore")}
                </Button>
              </div>
            )}

            {expanded && (
              <div className="w-full flex justify-center mt-4">
                <Button
                  icon={<ArrowUpOutlined />}
                  onClick={() => setExpanded(false)}
                >
                  {tWords("showLess")}
                </Button>
              </div>
            )}
          </Spin>
        )}
      </div>
    </div>
  );
}
