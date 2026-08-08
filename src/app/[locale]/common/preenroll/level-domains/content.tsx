"use client";

import DefaultFilters from "@/components/filter/default-filters";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import {
  setMultipleSearchParam,
  setMultipleSearchParamFromObject,
} from "@/helpers/url/search-param";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { HttpMessageFromStatus } from "@/components/message/status-message";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import LevelDomainListPaginated from "./components/level-domain-list-paginated";
import { SchoolConfig } from "@/config/school";
import { SelectOptionType } from "@/components/form-item/select/select";
import FormAddUpdateStudentPreEnroll from "@/components/form/school/common/form-add-update-student-pre-enroll";
import { LevelDomainResponse } from "@/lib/api/school/university/level/response";
import { getLevelDomainListPublic } from "@/lib/api/school/university/level/routes";
import { App, Text } from "@/ui/antd";
import { StudentPreEnrollRequest } from "@/lib/api/school/common/student/request";
import { postStudentPreEnroll } from "@/lib/api/school/common/student/routes";
import { useSession } from "next-auth/react";
import { FEATURE_DEFAULT } from "@/lib/constants/user/feature";
import DescriptionTemplate from "@/components/template/description-template";
import { DescriptionDomain } from "@/components/description/school/university/description-domain";
import { DescriptionLevel } from "@/components/description/school/university/description-level";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import { ArgsProps } from "antd/es/message";
import { useTranslations } from "next-intl";

export default function PageContent() {
  // React hooks
  const router = useCustomRouter();
  const searchParams = useSearchParams();
  const paramPage = parseInt(searchParams.get("page") ?? "1");
  const paramLimit = parseInt(searchParams.get("limit") ?? "30");
  const paramSearch = searchParams.get("search");
  const paramOrderBy = searchParams.get("orderBy");
  const paramSort = searchParams.get("sort");
  // Pre enroll to level domain states
  const [preEnrollToLevelDomainModalOpen, setPreEnrollToLevelDomainModalOpen] =
    useState(false);
  const [levelDomainToPreEnroll, setLevelDomainToPreEnroll] =
    useState<LevelDomainResponse>();
  // Describe item states
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [itemToDescribe, setItemToDescribe] = useState<LevelDomainResponse>();

  // Next hooks
  const session = useSession();
  const tPages = useTranslations("Pages.preEnroll.levelDomain");
  const tHttpStatus = useTranslations("Sentences.http.error");
  const tWords = useTranslations("Words");

  // Ant design hooks
  const { message: messageInst } = App.useApp();
  const toastMessage = (args: ArgsProps) => {
    messageInst.open(args);
  };

  // Tanstack hooks
  const queryClient = useQueryClient();
  const queryKeyData = "public-level-domains-data";
  const query = useQuery({
    queryKey: [
      queryKeyData,
      paramPage,
      paramLimit,
      paramSearch,
      paramOrderBy,
      paramSort,
    ],
    queryFn: async () =>
      getLevelDomainListPublic({
        schoolID: SchoolConfig.schoolID(),
        search: paramSearch ?? undefined,
        orderBy: paramOrderBy ?? undefined,
        sort: paramSort ?? undefined,
        page: paramPage ?? undefined,
        limit: paramLimit ?? undefined,
      }),
  });
  const mutationPreEnrollToLevelDomain = useMutation({
    mutationFn: async (item: StudentPreEnrollRequest) =>
      postStudentPreEnroll(item),
    onSuccess() {
      invalidateQueries();
      setPreEnrollToLevelDomainModalOpen(false);
      router.push("/common/preenroll/success");
    },
  });
  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: [
        queryKeyData,
        paramPage,
        paramLimit,
        paramSearch,
        paramOrderBy,
        paramSort,
      ],
    });
  };

  const orderByList: SelectOptionType<string>[] = [
    {
      label: tWords("default"),
      value: "updated_at",
    },
    {
      label: tWords("name"),
      value: "name",
    },
    {
      label: tWords("fees"),
      value: "fees",
    },
  ];

  return (
    <>
      <div className="w-full flex flex-col justify-center gap-4">
        <div className="w-full flex flex-col gap-2">
          <DefaultFilters
            loading={query.isFetching}
            defaultValue={{
              search: paramSearch ?? undefined,
              orderBy: paramOrderBy ?? undefined,
              sort: paramSort === "asc" ? "asc" : "desc",
            }}
            formName={"public-level domaines-filters"}
            orderByList={orderByList}
            onFilterChanged={(values) => {
              const newUrl = setMultipleSearchParamFromObject(
                window.location.href,
                values
              );
              router.push(newUrl.href);
            }}
            onRefresh={() => query.refetch()}
          />
          <Text type="secondary" code>
            {tPages("title")}
          </Text>
        </div>
        <LevelDomainListPaginated
          loading={query.isFetching}
          queryKeyData={queryKeyData}
          loadingError={query.isLoadingError}
          data={query.data?.data ?? undefined}
          currentPage={query.data?.data?.pagination?.currentPage ?? undefined}
          limit={query.data?.data?.pagination?.limit ?? undefined}
          count={query.data?.data?.pagination?.count ?? undefined}
          onRefresh={() => query.refetch()}
          onPageChanged={(page, limit) => {
            const newUrl = setMultipleSearchParam(window.location.href, [
              {
                param: "page",
                value: `${page}`,
              },
              {
                param: "limit",
                value: `${limit}`,
              },
            ]);
            router.push(newUrl.href);
          }}
          onPreEnrollClicked={(value) => {
            if (session.status !== "authenticated") {
              router.push("/auth/login");
              return;
            }
            if (session.data.user.feature !== FEATURE_DEFAULT) {
              toastMessage({
                type: "warning",
                key: "pre-enroll-warning",
                duration: 5,
                content: tPages("warning"),
              });
              return;
            }
            setLevelDomainToPreEnroll(value);
            setPreEnrollToLevelDomainModalOpen(true);
          }}
          onDescriptionRequested={(value) => {
            setItemToDescribe(value);
            setDescriptionModalOpen(true);
          }}
        />
      </div>

      {/* Pre enroll to level domain modal */}
      <CustomModalWithoutFooter
        title={tWords("preEnroll")}
        content={
          <FormAddUpdateStudentPreEnroll
            loading={mutationPreEnrollToLevelDomain.isPending}
            disabled={mutationPreEnrollToLevelDomain.isPending}
            canSubmit={true}
            errorMessage={
              mutationPreEnrollToLevelDomain.isError
                ? HttpMessageFromStatus(
                    (mutationPreEnrollToLevelDomain.error as any)?.response
                      ?.data?.status ?? HttpStatusCode.InternalServerError,
                    tWords("preEnroll"),
                    tHttpStatus
                  )
                : undefined
            }
            item={{
              levelDomain: levelDomainToPreEnroll,
            }}
            onSubmit={(value) => {
              if (!value) return;
              mutationPreEnrollToLevelDomain.mutate(value);
            }}
            onCancel={() => setPreEnrollToLevelDomainModalOpen(false)}
          />
        }
        modalOpen={preEnrollToLevelDomainModalOpen}
        maskClosable={false}
        width={650}
        destroyOnHidden={true}
        onOk={() => setPreEnrollToLevelDomainModalOpen(false)}
        onCancel={() => setPreEnrollToLevelDomainModalOpen(false)}
      />

      {/* Description modal */}
      <CustomModalWithoutFooter
        title={tWords("description")}
        content={
          <DescriptionTemplate
            item={itemToDescribe}
            returnDescriptionsNode={(item) => {
              return [
                { description: DescriptionLevelDomain(item) },
                {
                  title: tWords("level"),
                  description: DescriptionLevel(item?.level ?? undefined),
                },
                {
                  title: tWords("domain"),
                  description: DescriptionDomain(item?.domain ?? undefined),
                },
              ];
            }}
            onClose={() => setDescriptionModalOpen(false)}
          />
        }
        modalOpen={descriptionModalOpen}
        maskClosable={true}
        width={800}
        destroyOnHidden={true}
        onOk={() => setDescriptionModalOpen(false)}
        onCancel={() => setDescriptionModalOpen(false)}
      />
    </>
  );
}
