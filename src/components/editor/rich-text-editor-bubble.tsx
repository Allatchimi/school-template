"use client";

import { RefObject, Suspense } from "react";
import { RichTextEditorBubbleProps } from "./rich-text-editor-bubble-internal";
import { RichTextEditorBubbleHandle } from "./rich-text-editor-bubble-internal";
import dynamic from "next/dynamic";

const RichTextEditorBubbleInternal = dynamic(
  () => import("@/components/editor/rich-text-editor-bubble-internal"),
  {
    ssr: false,
  }
);

interface Props {
  ref: RefObject<RichTextEditorBubbleHandle | null>;
  props?: RichTextEditorBubbleProps;
}

export default function RichTextEditorBubble(props: Props) {
  return (
    <Suspense>
      <RichTextEditorBubbleInternal ref={props.ref} {...props.props} />
    </Suspense>
  );
}
