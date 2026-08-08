"use client";

import { NotificationListResponse } from "@/lib/api/others/notification/response";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { IDType } from "@/types/http/base-response";
import { formatDateTimeToSince } from "@/helpers/date/format";
import {
  List,
  ListItem,
  Button,
  Avatar,
  Collapse,
  Badge,
  Text,
} from "@/ui/antd";
import { useTranslations } from "next-intl";

interface NotificationListProps {
  loading?: boolean;
  loadingDelete?: boolean;
  loadingDeleteAll?: boolean;
  page?: {
    current?: number;
    limit?: number;
    total?: number;
  } | null;
  data?: NotificationListResponse;
  itemsToUpdateSeenID?: IDType[];
  itemsToDeleteID?: IDType[];
  onUpdateSeen?: (id: IDType) => void;
  onDeleteItem?: (id: IDType) => void;
  onChangePage?: (page: number, limit: number) => void;
}

export default function NotificationList(props: NotificationListProps) {
  // Next hooks
  const tWords = useTranslations("Words");

  return (
    <List
      className="notification-list"
      loading={props.loading}
      itemLayout="horizontal"
      split={false}
      pagination={{
        position: "bottom",
        align: "center",
        current: props.page?.current ?? undefined,
        pageSize: props.page?.limit ?? undefined,
        total: props.page?.total ?? undefined,
        onChange: props.onChangePage,
      }}
      dataSource={props.data?.data ?? undefined}
      renderItem={(item, index) => (
        <ListItem key={index} style={{ padding: "4px" }}>
          <Collapse
            bordered={false}
            size="middle"
            ghost={item.seen === true}
            items={[
              {
                key: item.id?.toString() ?? "",
                showArrow: false,
                label: (
                  <div className="w-full flex items-center gap-2">
                    <Badge dot={item.seen !== true}>
                      <Avatar icon={<UserOutlined color="white" />} />
                    </Badge>
                    <div className="w-full flex flex-col">
                      <Text
                        ellipsis
                        type={item.seen === true ? "secondary" : undefined}
                      >
                        {item.title ||
                          tWords("invalidLabel", { label: tWords("title") })}
                      </Text>
                      <Text
                        ellipsis
                        style={{
                          fontSize: "12px",
                          opacity: "25%",
                        }}
                      >
                        {formatDateTimeToSince(
                          item.createdAt?.toString() ?? ""
                        ) ||
                          tWords("invalidLabel", {
                            label: tWords("createdAt"),
                          })}
                      </Text>
                    </div>
                  </div>
                ),
                children: (
                  <Text type="secondary" className="text-xs">
                    {item.message ||
                      tWords("invalidLabel", { label: tWords("message") })}
                  </Text>
                ),
                extra: (
                  <Button
                    disabled={props.loadingDeleteAll}
                    loading={
                      props.loadingDelete &&
                      props.itemsToDeleteID?.includes(item.id ?? -1)
                    }
                    type="text"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.id) {
                        props.onDeleteItem?.(item.id);
                      }
                    }}
                  />
                ),
              },
            ]}
            onChange={(key) => {
              if (key.length > 0 && item.seen !== true) {
                props.onUpdateSeen?.(parseInt(key[0]));
              }
            }}
            className="w-full shadow-xs"
          />
        </ListItem>
      )}
    />
  );
}
