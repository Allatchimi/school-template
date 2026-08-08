"use client";

import { Button, Result } from "@/ui/antd";
import { HttpStatusCode } from "axios";
import { useTranslations } from "next-intl";
import React from "react";

export default function ResultFailed(props: {
  status?: number;
  onRefresh?: () => void;
}) {
  // Next hooks
  const tComponents = useTranslations("Components.result");
  const tWords = useTranslations("Words");

  return props.status === HttpStatusCode.Forbidden ? (
    <Result
      status="warning"
      title={tComponents("forbidden.title")}
      subTitle={tComponents("forbidden.description")}
      extra={<Button onClick={props.onRefresh}>{tWords("retry")}</Button>}
    />
  ) : (
    <Result
      status="warning"
      title={tComponents("default.title")}
      subTitle={tComponents("default.description")}
      extra={<Button onClick={props.onRefresh}>{tWords("retry")}</Button>}
    />
  );
}
