"use client";

import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import Quill from "quill";
import DOMPurify from "dompurify";

import "quill/dist/quill.bubble.css";

// Define the ref type for the RichTextEditorInternal component
export interface RichTextEditorBubbleHandle {
  getContent: () => string;
}

export interface RichTextEditorBubbleProps {
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function RichTextEditorInternalBubble(
  props: RichTextEditorBubbleProps,
  ref: React.ForwardedRef<RichTextEditorBubbleHandle>,
) {
  // React hooks
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  const initQuill = useCallback(() => {
    if (!editorRef.current) {
      return;
    }
    if (quillRef.current) {
      return;
    }
    quillRef.current = new Quill(editorRef.current, {
      theme: "bubble", // bubble, snow
      modules: {
        toolbar: [],
      },
      placeholder: "",
      readOnly: props.disabled === true,
    });

    // Listen for changes
    quillRef.current?.on("text-change", () => {
      props.onChange?.(quillRef.current?.root.innerHTML ?? "");
    });
  }, [editorRef, quillRef, props]);

  useEffect(() => {
    initQuill();
    if (quillRef.current && props.defaultValue) {
      quillRef.current.root.innerHTML = DOMPurify.sanitize(props.defaultValue);
    }
    return () => {};
  }, [initQuill, props.defaultValue]);

  // Expose the getContent function to the parent component
  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quillRef.current) {
        return quillRef.current.root.innerHTML; // Return the HTML content
      }
      return "";
    },
  }));

  return (
    <div
      ref={editorRef}
      style={{
        width: "100%",
        fontSize: "16px",
        fontWeight: "400",
        fontFamily: "inherit",
      }}
    />
  );
}

RichTextEditorInternalBubble.displayName = "RichTextEditor";
export default forwardRef(RichTextEditorInternalBubble);
