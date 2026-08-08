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
import { antdTheme } from "@/ui/antd";

import "quill/dist/quill.snow.css";

// Define the ref type for the RichTextEditorInternal component
export interface RichTextEditorSnowHandle {
  getContent: () => string;
}

export interface RichTextEditorSnowProps {
  mounted?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function RichTextEditorInternalSnow(
  props: RichTextEditorSnowProps,
  ref: React.ForwardedRef<RichTextEditorSnowHandle>,
) {
  // React hooks
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  const initQuill = useCallback(() => {
    if (!editorRef.current) {
      return;
    }
    if (quillRef.current) {
      return;
    }
    quillRef.current = new Quill(editorRef.current, {
      theme: "snow", // bubble, snow
      modules: {
        toolbar: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ script: "sub" }, { script: "super" }],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          ["link", "formula", "code-block"],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ color: [] }, { background: [] }],
        ],
      },
      placeholder: "",
      readOnly: false,
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
        height: "300px",
        backgroundColor: theme.colorWhite,
        borderBottomLeftRadius: theme.borderRadius,
        borderBottomRightRadius: theme.borderRadius,
      }}
    />
  );
}

RichTextEditorInternalSnow.displayName = "RichTextEditor";
export default forwardRef(RichTextEditorInternalSnow);
