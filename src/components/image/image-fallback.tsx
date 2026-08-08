"use client";

import Image from "next/image";
import { useState, ReactNode, CSSProperties } from "react";
import ImagePlaceholderIcon from "../icon/image-placeholder";
import { antdTheme, SkeletonNode, Text } from "@/ui/antd";

import "../../styles/skeleton.css";

interface ImageFallbackProps {
  alt?: string;
  src?: string;
  size?: number;
  quality?: number;
  priority?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  borderRadius?: string | number;
  backgroundColor?: string;
  fillColor?: string;
  style?: CSSProperties;
  className?: string;
  fallback?: ReactNode;
}

// const defaultSize = 128;

export default function ImageFallback(props: ImageFallbackProps) {
  // React hooks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  if (!props.src || (props.src?.trim().length ?? 0) < 1 || error) {
    return (
      <>{props.fallback || <ImageFallbackPlaceholderDefault {...props} />}</>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      <Image
        alt={props.alt ?? "alt"}
        loader={() => props.src || "http://localhost:80/test"}
        unoptimized={true}
        src={props.src}
        // width={props.size || defaultSize}
        // height={props.size || defaultSize}
        fill={true}
        quality={props.quality || 80}
        priority={props.priority}
        style={{
          borderRadius: props.borderRadius || theme.borderRadius,
          backgroundColor: props.backgroundColor || theme.colorTextLightSolid,
          objectFit: props.objectFit || "cover",
          ...props.style,
        }}
        className={props.className}
        onLoad={(result) => {
          if (result.currentTarget.naturalWidth < 1) {
            setError(true);
          }
          if (loading) {
            setLoading(false);
          }
        }}
        onError={() => {
          setError(true);
          if (loading) {
            setLoading(false);
          }
        }}
      />
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <ImageFallbackPlaceholderDefault {...props} loading={true} />
        </div>
      ) : undefined}
    </div>
  );
}

export function ImageFallbackPlaceholderDefault(
  props: {
    loading?: boolean;
  } & ImageFallbackProps
) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: props.borderRadius || theme.borderRadius,
        backgroundColor: props.backgroundColor || theme.colorTextLightSolid,
        ...props.style,
      }}
      className={`${props.className ?? ""} image-fallback-skeleton-full`}
    >
      <SkeletonNode
        active={props.loading === true}
        style={{
          borderRadius: props.borderRadius || theme.borderRadius,
        }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-full max-w-52 max-h-52 flex items-center justify-center">
            <ImagePlaceholderIcon
              width={"50%"}
              height={"50%"}
              fill={props.fillColor || theme.colorTextPlaceholder}
            />
          </div>
        </div>
      </SkeletonNode>
    </div>
  );
}

export function ImageFallbackPlaceholderText(
  props: {
    text?: string;
    textColor?: string;
    textFontSize?: string;
  } & ImageFallbackProps
) {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: props.borderRadius || theme.borderRadius,
        backgroundColor: props.backgroundColor || theme.colorTextLightSolid,
        ...props.style,
      }}
      className="image-fallback-skeleton-full"
    >
      <SkeletonNode
        active={false}
        style={{
          borderRadius: props.borderRadius || theme.borderRadius,
        }}
      >
        <div className="w-full h-full flex items-center justify-center p-1">
          <Text
            ellipsis
            style={{
              color: props.textColor || theme.colorTextPlaceholder,
              fontSize: props.textFontSize || "16px",
            }}
          >
            {props.text || "..."}
          </Text>
        </div>
      </SkeletonNode>
    </div>
  );
}
