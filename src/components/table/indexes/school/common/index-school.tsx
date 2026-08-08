"use client";

import ImageFallback from "@/components/image/image-fallback";
import { SchoolResponse } from "@/lib/api/school/common/school/response";
import { TableIndexText } from "../../table-index";
import {
  SCHOOL_DEPLOYMENT_STATUS_DONE,
  SCHOOL_DEPLOYMENT_STATUS_DONE_NO_CHANGES,
  SCHOOL_DEPLOYMENT_STATUS_PENDING,
  SCHOOL_DEPLOYMENT_STATUS_FAILED,
} from "@/lib/constants/school/common/school";
import { Tag } from "antd";
import { useTranslations } from "next-intl";

export default function TableIndexSchool({
  record,
  showType,
}: {
  record?: SchoolResponse;
  showType?: boolean;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  if ((record?.id ?? 0) < 1) {
    return undefined;
  }

  return (
    <div className="w-auto flex items-center gap-2">
      <div style={{ width: "32px", height: "32px" }}>
        <ImageFallback src={record?.logo ?? undefined} />
      </div>
      <TableIndexText>
        {record?.name ||
          tWords("invalidLabel", {
            label: tWords("name"),
          })}{" "}
        {showType === true ? (
          <span className="w-auto opacity-50 text-xs ml-1">{`${record?.type || "Invalid type"}`}</span>
        ) : undefined}
      </TableIndexText>
    </div>
  );
}

export function TableIndexSchoolDeployment({
  record,
}: {
  record?: SchoolResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school");

  if ((record?.id ?? 0) < 1) {
    return undefined;
  }

  const color =
    record?.deploymentStatus === SCHOOL_DEPLOYMENT_STATUS_DONE ||
    record?.deploymentStatus === SCHOOL_DEPLOYMENT_STATUS_DONE_NO_CHANGES
      ? "success"
      : record?.deploymentStatus === SCHOOL_DEPLOYMENT_STATUS_PENDING
        ? "processing"
        : record?.deploymentStatus === SCHOOL_DEPLOYMENT_STATUS_FAILED
          ? "error"
          : "default";
  return (
    <div className="w-auto flex items-center gap-2">
      <Tag color={color}>
        {record?.deploymentStatus
          ? tEnums(`deploymentStatus.${record.deploymentStatus}`)
          : tWords("invalidLabel", {
              label: tWords("deploymentStatus"),
            })}{" "}
      </Tag>
      <TableIndexText>
        {record?.deploymentRequest
          ? tEnums(`deploymentRequest.${record.deploymentRequest}`)
          : tWords("invalidLabel", {
              label: tWords("deployment"),
            })}{" "}
      </TableIndexText>
    </div>
  );
}
