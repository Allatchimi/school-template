"use client";

import { RefObject, Suspense } from "react";
import { RichTextEditorSnowProps } from "./rich-text-editor-snow-internal";
import { RichTextEditorSnowHandle } from "./rich-text-editor-snow-internal";
import dynamic from "next/dynamic";
import { Spin } from "@/ui/antd";
import { LoadingOutlined } from "@ant-design/icons";

const RichTextEditorSnowInternal = dynamic(
  () => import("@/components/editor/rich-text-editor-snow-internal"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] flex items-center justify-center">
        <Spin
          indicator={<LoadingOutlined spin />}
          size="small"
          tip="Loading editor"
        />
      </div>
    ),
  }
);

interface Props {
  ref: RefObject<RichTextEditorSnowHandle | null>;
  props?: RichTextEditorSnowProps;
}

export default function RichTextEditorSnow(props: Props) {
  return props.props?.mounted === true ? (
    <Suspense>
      <RichTextEditorSnowInternal ref={props.ref} {...props.props} />
    </Suspense>
  ) : (
    <div className="w-full h-[300px] flex items-center justify-center">
      <Spin
        indicator={<LoadingOutlined spin />}
        size="small"
        tip="Loading editor"
      />
    </div>
  );
}
