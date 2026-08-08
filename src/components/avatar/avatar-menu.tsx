"use client";

import { useState, useCallback, useEffect } from "react";
import { getDashboardPath } from "@/lib/links/dashboard";
import {
  DeleteOutlined,
  EyeOutlined,
  LogoutOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { signOut, useSession } from "next-auth/react";
import ImageFallback, {
  ImageFallbackPlaceholderText,
} from "../image/image-fallback";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotification,
  deleteNotificationAll,
  getNotificationList,
  getNotificationNotSeenCount,
  updateNotificationSeen,
  updateNotificationSeenAll,
} from "@/lib/api/others/notification/routes";
import { ItemType } from "antd/es/menu/interface";
import { useNotificationStore } from "@/store/notification";
import { IDType } from "@/types/http/base-response";
import { ArgsProps } from "antd/es/message";
import ModalInfoFooter from "../form-item/modal-info-footer";
import CustomModalWithoutFooter from "../modal/custom-without-footer";
import NotificationList from "../section/notifications";
import {
  App,
  antdTheme,
  Avatar,
  Badge,
  Button,
  Dropdown,
  Text,
} from "@/ui/antd";
import { useTranslations } from "next-intl";

export default function AvatarMenu() {
  // React hooks
  const router = useCustomRouter();
  const [page, setPage] = useState<number | undefined>(1);
  const [limit, setLimit] = useState<number | undefined>(10);
  const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);
  const [updateSeenItemsID, setUpdateSeenItemsID] = useState<
    IDType[] | undefined
  >(undefined);
  const [deleteItemsID, setDeleteItemsID] = useState<IDType[]>([]);

  // Next hooks
  const session = useSession();
  const tComponents = useTranslations("Components.avatar");
  const tWords = useTranslations("Words");
  const tSentences = useTranslations("Sentences");

  // Zustand hooks
  const notificationsStore = useNotificationStore((state) => state.items);

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Ant design hooks
  const { message: messageInst } = App.useApp();
  const toastMessage = (args: ArgsProps) => {
    messageInst.open(args);
  };

  // Tanstack hooks
  const queryClient = useQueryClient();
  const queryKeyDataNotificationNotSeenCount =
    "notifications-not-seen-count-data";
  const queryNotificationNotSeenCount = useQuery({
    queryKey: [queryKeyDataNotificationNotSeenCount],
    queryFn: async () =>
      session.status === "authenticated"
        ? getNotificationNotSeenCount()
        : Promise.resolve(null),
  });
  const queryKeyDataNotifications = "notifications-data";
  const queryNotifications = useQuery({
    queryKey: [queryKeyDataNotifications, page, limit],
    queryFn: async () =>
      session.status === "authenticated"
        ? getNotificationList({
            page: page,
            limit: limit,
          })
        : Promise.resolve(null),
  });
  const mutationUpdateSeen = useMutation({
    mutationFn: async (id: IDType) =>
      updateNotificationSeen({
        id: id,
        seen: true,
      }),
    onSuccess(_, id) {
      const newItemsID = updateSeenItemsID;
      setUpdateSeenItemsID(removeItemByID(newItemsID, id));
      invalidateQueriesNotificationNotSeenCount();
      invalidateQueriesNotifications();
    },
    onError(_, id) {
      const newItemsID = updateSeenItemsID;
      setUpdateSeenItemsID(removeItemByID(newItemsID, id));
      toastMessage({
        type: "error",
        key: "mutationUpdateSeenError",
        duration: 5,
        content: tComponents("feedback.notification.seenError"),
      });
    },
  });
  const mutationUpdateSeenAll = useMutation({
    mutationFn: async () => updateNotificationSeenAll({ seen: true }),
    onSuccess() {
      setUpdateSeenItemsID([]);
      invalidateQueriesNotificationNotSeenCount();
      invalidateQueriesNotifications();
    },
    onError() {
      setUpdateSeenItemsID([]);
      toastMessage({
        type: "error",
        key: "mutationUpdateSeenAllError",
        duration: 5,
        content: tComponents("feedback.notification.seenAllError"),
      });
    },
  });
  const mutationDelete = useMutation({
    mutationFn: async (id: IDType) => deleteNotification(id),
    onSuccess(_, id) {
      const newItemsID = deleteItemsID;
      setDeleteItemsID(removeItemByID(newItemsID, id));
      invalidateQueriesNotificationNotSeenCount();
      invalidateQueriesNotifications();
    },
    onError(_, id) {
      const newItemsID = deleteItemsID;
      setDeleteItemsID(removeItemByID(newItemsID, id));
      toastMessage({
        type: "error",
        key: "mutationDeleteError",
        duration: 5,
        content: tComponents("feedback.notification.deleteError"),
      });
    },
  });
  const mutationDeleteAll = useMutation({
    mutationFn: async () => deleteNotificationAll(),
    onSuccess() {
      setDeleteItemsID([]);
      invalidateQueriesNotificationNotSeenCount();
      invalidateQueriesNotifications();
    },
    onError() {
      setDeleteItemsID([]);
      toastMessage({
        type: "error",
        key: "mutationDeleteAllError",
        duration: 5,
        content: tComponents("feedback.notification.deleteAllError"),
      });
    },
  });

  function removeItemByID(arr?: IDType[], id?: IDType): IDType[] {
    return arr?.filter((item) => item !== id) ?? [];
  }

  const invalidateQueriesNotificationNotSeenCount = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [queryKeyDataNotificationNotSeenCount],
    });
  }, [queryClient]);

  const invalidateQueriesNotifications = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [queryKeyDataNotifications, page, limit],
    });
  }, [queryClient, limit, page]);

  useEffect(() => {
    invalidateQueriesNotificationNotSeenCount();
    invalidateQueriesNotifications();
  }, [
    notificationsStore,
    invalidateQueriesNotificationNotSeenCount,
    invalidateQueriesNotifications,
  ]);

  const items: ItemType[] = [
    {
      key: "/notifications",
      label: (
        <Badge
          dot={
            (queryNotificationNotSeenCount.data?.data?.count ?? 0) > 0
              ? true
              : false
          }
        >
          <Text ellipsis>{tWords("notifications")}</Text>
        </Badge>
      ),
    },
    {
      key: "/dashboard",
      label: tWords("dashboard"),
    },
    {
      key: "/profile",
      label: tWords("profile"),
    },
    {
      key: "/logout",
      label: tWords("logout"),
      danger: true,
      icon: <LogoutOutlined />,
    },
  ];

  const handlePageChange = (page: number, limit: number) => {
    setPage(page);
    setLimit(limit);
  };

  const feature = session?.data?.user.feature;
  return (
    <>
      {session.status === "loading" ? (
        <Avatar size={"large"} />
      ) : (
        <Dropdown
          menu={{
            onClick: (item) => {
              switch (item.key) {
                case "/notifications":
                  queryNotifications.refetch();
                  queryNotificationNotSeenCount.refetch();
                  setNotificationsModalOpen(true);
                  break;
                case "/dashboard":
                  router.push(getDashboardPath(feature ?? ""));
                  break;
                case "/logout":
                  signOut({
                    redirect: true,
                    redirectTo: "/auth/logout",
                  });
                  break;

                default:
                  router.push(item.key);
                  break;
              }
            },
            items: items,
          }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Badge count={queryNotificationNotSeenCount.data?.data?.count}>
            <Avatar
              size={"large"}
              style={{
                cursor: "pointer",
                backgroundColor: theme.colorPrimary,
              }}
              src={
                <ImageFallback
                  src={session.data?.user?.image || undefined}
                  backgroundColor={"transparent"}
                  fallback={
                    <ImageFallbackPlaceholderText
                      text={
                        session.data?.user?.nameTrunc
                          ? session.data?.user?.nameTrunc?.toUpperCase()?.trim()
                          : "NA"
                      }
                      textColor={theme.colorWhite}
                      textFontSize="18px"
                      backgroundColor="transparent"
                    />
                  }
                />
              }
            />
          </Badge>
        </Dropdown>
      )}

      {/* Notifications modal */}
      <CustomModalWithoutFooter
        hideHead={true}
        content={
          <div className="w-full">
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex flex-wrap items-center justify-end gap-4">
                <Button
                  disabled={
                    mutationUpdateSeenAll.isPending ||
                    mutationDeleteAll.isPending
                  }
                  loading={queryNotifications.isFetching ?? undefined}
                  icon={<SyncOutlined />}
                  onClick={() => queryNotifications.refetch()}
                >
                  {tWords("refresh")}
                </Button>
                <Button
                  disabled={
                    queryNotifications.isPending ||
                    (queryNotifications.data?.data?.pagination?.count ?? 0) < 1
                  }
                  loading={mutationUpdateSeenAll.isPending}
                  icon={<EyeOutlined />}
                  onClick={() => {
                    setUpdateSeenItemsID(
                      queryNotifications.data?.data?.data?.map(
                        (item) => item.id ?? -1
                      ) ?? undefined
                    );
                    mutationUpdateSeenAll.mutate();
                  }}
                >
                  {tSentences("common.markAllAsSeen")}
                </Button>
                <Button
                  disabled={
                    queryNotifications.isPending ||
                    (queryNotifications.data?.data?.pagination?.count ?? 0) < 1
                  }
                  loading={mutationDeleteAll.isPending}
                  variant="filled"
                  color="danger"
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    setDeleteItemsID(
                      queryNotifications.data?.data?.data?.map(
                        (item) => item.id ?? -1
                      ) ?? []
                    );
                    mutationDeleteAll.mutate();
                  }}
                >
                  {tSentences("common.deleteAll")}
                </Button>
              </div>
              <NotificationList
                loading={queryNotifications.isFetching}
                loadingDelete={mutationDelete.isPending}
                loadingDeleteAll={mutationDeleteAll.isPending}
                page={{
                  current:
                    queryNotifications.data?.data?.pagination?.currentPage ??
                    undefined,
                  limit:
                    queryNotifications.data?.data?.pagination?.limit ??
                    undefined,
                  total:
                    queryNotifications.data?.data?.pagination?.count ??
                    undefined,
                }}
                data={queryNotifications.data?.data ?? undefined}
                itemsToUpdateSeenID={updateSeenItemsID}
                itemsToDeleteID={deleteItemsID}
                onUpdateSeen={(id) => {
                  const newItemsID = updateSeenItemsID;
                  newItemsID?.push(id);
                  setUpdateSeenItemsID(newItemsID);
                  mutationUpdateSeen.mutate(id);
                }}
                onDeleteItem={(id) => {
                  const newItemsID = deleteItemsID;
                  newItemsID?.push(id);
                  setDeleteItemsID(newItemsID);
                  mutationDelete.mutate(id);
                }}
                onChangePage={handlePageChange}
              />
            </div>
            <ModalInfoFooter onClose={() => setNotificationsModalOpen(false)} />
          </div>
        }
        modalOpen={notificationsModalOpen}
        maskClosable={true}
        width={800}
        onOk={() => setNotificationsModalOpen(false)}
        onCancel={() => setNotificationsModalOpen(false)}
      />
    </>
  );
}
