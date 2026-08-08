"use client";

import {
  ScheduleResponse,
  ScheduleWeeklyViewResponse,
} from "@/lib/api/school/common/schedule/response";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { List, ListItem, ListItemMeta } from "@/ui/antd";
import { TableIndexText } from "../../table-index";
import { useTranslations } from "next-intl";

import "../../../../../styles/list.css";

export function TableIndexScheduleWeeklyViewTime({
  record,
}: {
  record?: ScheduleWeeklyViewResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  const startTime =
    (record?.startTime?.toString().length ?? 0 > 0)
      ? record?.startTime?.toString()
      : tWords("invalidLabel", {
          label: tWords("startTime"),
        });
  const endTime =
    (record?.endTime?.toString().length ?? 0 > 0)
      ? record?.endTime?.toString()
      : tWords("invalidLabel", {
          label: tWords("endTime"),
        });
  return (
    <div className="w-auto flex items-center gap-2">
      {startTime} - {endTime}
    </div>
  );
}

export function TableIndexScheduleWeeklyViewItemList({
  record,
}: {
  record?: ScheduleResponse[];
}) {
  return (
    <List
      split={true}
      dataSource={record ?? []}
      className="hidden-empty-text"
      renderItem={(item, index) => (
        <ListItem key={index}>
          {item.isCommon === true ? (
            <ListMetaDescriptionGeneric item={item} />
          ) : item.school?.type === SCHOOL_TYPE_HIGHSCHOOL ? (
            <ListMetaDescriptionClassSubject item={item} />
          ) : item.school?.type === SCHOOL_TYPE_UNIVERSITY ? (
            <ListMetaDescriptionUnit item={item} />
          ) : (
            <ListMetaDescriptionGeneric item={item} />
          )}
        </ListItem>
      )}
    />
  );
}

function ListMetaDescriptionClassSubject({
  item,
}: {
  item?: ScheduleResponse;
}) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <ListItemMeta
      title={
        <TableIndexText>
          {item?.classSubject?.subject?.name ||
            tWords("invalidLabel", {
              label: tWords("subject"),
            })}
        </TableIndexText>
      }
      description={
        <div className="flex flex-col">
          <TableIndexText type="secondary">
            {item?.classSubject?.class?.name ||
              tWords("invalidLabel", {
                label: tWords("class"),
              })}
          </TableIndexText>
          <TableIndexText type="secondary" style={{ fontSize: "12px" }}>
            {item?.type ||
              tWords("invalidLabel", {
                label: tWords("type"),
              })}
          </TableIndexText>
        </div>
      }
    />
  );
}

function ListMetaDescriptionUnit({ item }: { item?: ScheduleResponse }) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <ListItemMeta
      title={
        <TableIndexText>{item?.unit?.name || "Invalid unit"}</TableIndexText>
      }
      description={
        <div className="flex flex-col">
          <TableIndexText type="secondary">
            {item?.unit?.levelDomain?.level?.name ||
              tWords("invalidLabel", {
                label: tWords("level"),
              })}
            {" - "}
            {item?.unit?.levelDomain?.domain?.name ||
              tWords("invalidLabel", {
                label: tWords("domain"),
              })}
          </TableIndexText>
          <TableIndexText
            style={{
              fontSize: "12px",
            }}
            type="secondary"
          >
            {item?.type ||
              tWords("invalidLabel", {
                label: tWords("type"),
              })}
          </TableIndexText>
        </div>
      }
    />
  );
}

function ListMetaDescriptionGeneric({ item }: { item?: ScheduleResponse }) {
  return (
    <ListItemMeta
      title={
        <TableIndexText>
          {item?.description || item?.type?.toUpperCase() || "---"}
        </TableIndexText>
      }
      description={
        <div className="flex flex-col">
          <TableIndexText>{item?.type}</TableIndexText>
        </div>
      }
    />
  );
}
