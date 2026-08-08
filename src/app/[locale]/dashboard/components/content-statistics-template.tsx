"use client";

import ChartCount from "./chart-count";
import ChartLine from "./chart-line";
import { useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMonitoringList } from "@/lib/api/others/monitoring/routes";
import { SchoolConfig } from "@/config/school";
import StudentIcon from "@/components/icon/material/student";
import SupervisorIcon from "@/components/icon/material/supervisor";
import ManageAccountsIcon from "@/components/icon/material/manage-accounts";
import SchoolIcon from "@/components/icon/material/school";
import { antdTheme, Spin } from "@/ui/antd";
import dayjs from "dayjs";
import { AxiosError } from "axios";
import { FEATURE_ADMIN, FEATURE_DIRECTOR } from "@/lib/constants/user/feature";
import { useSession } from "next-auth/react";
import ParentIcon from "@/components/icon/material/parent";
import { useLocale, useTranslations } from "next-intl";
import ResultFailed from "@/components/result/result";
import { LOCALE_FR } from "@/lib/constants/locales";

export default function ContentStatisticsTemplate(props: {
  queryKey?: string;
}) {
  // Next hooks
  const session = useSession();
  const tPages = useTranslations("Pages.dashboard.admin.home");
  const tWords = useTranslations("Words");
  const locale = useLocale();

  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();

  // Tanstack hooks
  const queryKeyData = props.queryKey || "monitoring-data";
  const query = useQuery({
    queryKey: [queryKeyData],
    queryFn: async () =>
      getMonitoringList({
        schoolID: SchoolConfig.schoolID(),
      }),
  });

  const updateWindowData = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, []);

  useEffect(() => {
    updateWindowData();
  }, [updateWindowData]);

  return (
    <div
      style={{
        minHeight: "70vh",
      }}
      className="w-full grid grid-cols-1 gap-2"
    >
      {query.isLoadingError === true ? (
        <div className="w-full mt-16 flex items-center justify-center">
          <ResultFailed
            status={(query.error as AxiosError | undefined)?.status}
            onRefresh={query.refetch}
          />
        </div>
      ) : (
        <Spin spinning={query.isFetching}>
          {query.isFetching ? (
            <div className="w-full h-64" />
          ) : (
            <div className="w-full h-full min-h-64 grid grid-cols-1 gap-2">
              <div className="w-full h-full grid grid-cols-1 xl:grid-cols-6 gap-2">
                <div className="w-full h-full flex flex-col gap-2 xl:col-span-4">
                  <ChartCount
                    loading={query.isFetching}
                    data={[
                      ...(session.data?.user.feature === FEATURE_ADMIN
                        ? [
                            {
                              icon: (
                                <SchoolIcon
                                  color={theme.colorPrimary}
                                  width={40}
                                  height={40}
                                />
                              ),
                              label: tWords("schools"),
                              count:
                                query.data?.data?.data?.count?.schools ?? 0,
                            },
                            {
                              icon: (
                                <ManageAccountsIcon
                                  color={theme.colorPrimary}
                                  width={40}
                                  height={40}
                                />
                              ),
                              label: tWords("directors"),
                              count:
                                query.data?.data?.data?.count?.directors ?? 0,
                            },
                          ]
                        : session.data?.user.feature === FEATURE_DIRECTOR
                          ? [
                              {
                                icon: (
                                  <ManageAccountsIcon
                                    color={theme.colorPrimary}
                                    width={40}
                                    height={40}
                                  />
                                ),
                                label: tWords("managers"),
                                count:
                                  query.data?.data?.data?.count?.directors ?? 0,
                              },
                            ]
                          : []),
                      {
                        icon: (
                          <SupervisorIcon
                            color={theme.colorPrimary}
                            width={40}
                            height={40}
                          />
                        ),
                        label: tWords("teachers"),
                        count: query.data?.data?.data?.count?.teachers ?? 0,
                      },
                      {
                        icon: (
                          <StudentIcon
                            color={theme.colorPrimary}
                            width={40}
                            height={40}
                          />
                        ),
                        label: tWords("students"),
                        count: query.data?.data?.data?.count?.students ?? 0,
                      },
                      ...(session.data?.user.feature === FEATURE_DIRECTOR
                        ? [
                            {
                              icon: (
                                <ParentIcon
                                  color={theme.colorPrimary}
                                  width={40}
                                  height={40}
                                />
                              ),
                              label: tWords("parents"),
                              count:
                                query.data?.data?.data?.count?.parents ?? 0,
                            },
                          ]
                        : []),
                    ]}
                  />
                  <div
                    style={{
                      backgroundColor: theme.colorBgContainer,
                      borderRadius: theme.borderRadius,
                      borderWidth: "0.5px",
                      borderColor: theme.colorBorder,
                    }}
                    className="w-full xl:col-span-2"
                  >
                    <ChartLine
                      title={tPages("newUsers")}
                      data={
                        query.data?.data?.data?.usersByMonth?.map((item) => {
                          const montInt = parseInt(`${item.month || 0}`) ?? 0;
                          const month = dayjs()
                            .month(montInt - 1)
                            .format("MMMM");
                          return locale === LOCALE_FR
                            ? {
                                nom: month,
                                total: item.count ?? 0,
                              }
                            : {
                                name: month,
                                total: item.count ?? 0,
                              };
                        }) ?? []
                      }
                      xField={tWords("name").toLowerCase()}
                      yField={tWords("total").toLowerCase()}
                    />
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: theme.colorBgContainer,
                    borderRadius: theme.borderRadius,
                    borderWidth: "0.5px",
                    borderColor: theme.colorBorder,
                  }}
                  className="w-full xl:col-span-2"
                >
                  <ChartLine
                    title={tPages("usersByYear")}
                    data={
                      query.data?.data?.data?.usersByYear?.map((item) =>
                        locale === LOCALE_FR
                          ? {
                              nom:
                                item.year?.toString() ||
                                tWords("invalidLabel", {
                                  label: tWords("year"),
                                }),
                              total: item.count ?? 0,
                            }
                          : {
                              name:
                                item.year?.toString() ||
                                tWords("invalidLabel", {
                                  label: tWords("year"),
                                }),
                              total: item.count ?? 0,
                            }
                      ) ?? []
                    }
                    xField={tWords("name").toLowerCase()}
                    yField={tWords("total").toLowerCase()}
                  />
                </div>
              </div>
              {/* {session.data?.user.feature === FEATURE_ADMIN ? (
                <div
                  style={{
                    backgroundColor: theme.colorBgContainer,
                    borderRadius: theme.borderRadius,
                    borderWidth: "0.5px",
                    borderColor: theme.colorBorder,
                  }}
                  className="w-full"
                >
                  <ChartBidirectionalBar
                    title={
                      "Percentage of success comparison between boys and girls"
                    }
                    data={
                      query.data?.data?.data?.successBySchoolGender?.map(
                        (item) => ({
                          school: item.school?.name || "Invalid school",
                          boys: item.boys ?? 0,
                          girls: item.girls ?? 0,
                        })
                      ) ?? []
                    }
                  />
                </div>
              ) : undefined} */}
            </div>
          )}
        </Spin>
      )}
    </div>
  );
}
