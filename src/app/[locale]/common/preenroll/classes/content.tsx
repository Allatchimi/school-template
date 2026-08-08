"use client";

import DefaultFilters from "@/components/filter/default-filters";
import CustomModalWithoutFooter from "@/components/modal/custom-without-footer";
import {
  setMultipleSearchParam,
  setMultipleSearchParamFromObject,
} from "@/helpers/url/search-param";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { ClassResponse } from "@/lib/api/school/highschool/class/response";
import { getClassListPublic } from "@/lib/api/school/highschool/class/routes";
import { HttpMessageFromStatus } from "@/components/message/status-message";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ClassListPaginated from "./components/class-list-paginated";
import { postStudentPreEnroll } from "@/lib/api/school/common/student/routes";
import { StudentPreEnrollRequest } from "@/lib/api/school/common/student/request";
import { SchoolConfig } from "@/config/school";
import { SelectOptionType } from "@/components/form-item/select/select";
import FormAddUpdateStudentPreEnroll from "@/components/form/school/common/form-add-update-student-pre-enroll";
import { App, Text } from "@/ui/antd";
import { useSession } from "next-auth/react";
import { ArgsProps } from "antd/es/message";
import { FEATURE_DEFAULT } from "@/lib/constants/user/feature";
import DescriptionTemplate from "@/components/template/description-template";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionSpecialty } from "@/components/description/school/highschool/description-specialty";
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
  // Pre enroll to class states
  const [preEnrollToClassModalOpen, setPreEnrollToClassModalOpen] =
    useState(false);
  const [classToPreEnroll, setClassToPreEnroll] = useState<ClassResponse>();
  // Describe item states
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [itemToDescribe, setItemToDescribe] = useState<ClassResponse>();

  // Next hooks
  const session = useSession();
  const tPages = useTranslations("Pages.preEnroll.class");
  const tHttpStatus = useTranslations("Sentences.http.error");
  const tWords = useTranslations("Words");

  // Ant design hooks
  const { message: messageInst } = App.useApp();
  const toastMessage = (args: ArgsProps) => {
    messageInst.open(args);
  };

  // Tanstack hooks
  const queryClient = useQueryClient();
  const queryKeyData = "public-classes-data";
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
      getClassListPublic({
        schoolID: SchoolConfig.schoolID(),
        search: paramSearch ?? undefined,
        orderBy: paramOrderBy ?? undefined,
        sort: paramSort ?? undefined,
        page: paramPage ?? undefined,
        limit: paramLimit ?? undefined,
      }),
  });
  const mutationPreEnrollToClass = useMutation({
    mutationFn: async (item: StudentPreEnrollRequest) =>
      postStudentPreEnroll(item),
    onSuccess() {
      invalidateQueries();
      setPreEnrollToClassModalOpen(false);
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
            formName={"public-classes-filters"}
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
        <ClassListPaginated
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
            setClassToPreEnroll(value);
            setPreEnrollToClassModalOpen(true);
          }}
          onDescriptionRequested={(value) => {
            setItemToDescribe(value);
            setDescriptionModalOpen(true);
          }}
        />
      </div>

      {/* Pre enroll to class modal */}
      <CustomModalWithoutFooter
        title={tWords("preEnroll")}
        content={
          <FormAddUpdateStudentPreEnroll
            loading={mutationPreEnrollToClass.isPending}
            disabled={mutationPreEnrollToClass.isPending}
            canSubmit={true}
            errorMessage={
              mutationPreEnrollToClass.isError
                ? HttpMessageFromStatus(
                    (mutationPreEnrollToClass.error as any)?.response?.data
                      ?.status ?? HttpStatusCode.InternalServerError,
                    tWords("preEnroll"),
                    tHttpStatus
                  )
                : undefined
            }
            item={{
              class: classToPreEnroll,
            }}
            onSubmit={(value) => {
              if (!value) return;
              mutationPreEnrollToClass.mutate(value);
            }}
            onCancel={() => setPreEnrollToClassModalOpen(false)}
          />
        }
        modalOpen={preEnrollToClassModalOpen}
        maskClosable={false}
        width={650}
        destroyOnHidden={true}
        onOk={() => setPreEnrollToClassModalOpen(false)}
        onCancel={() => setPreEnrollToClassModalOpen(false)}
      />

      {/* Description modal */}
      <CustomModalWithoutFooter
        title={tWords("description")}
        content={
          <DescriptionTemplate
            item={itemToDescribe}
            returnDescriptionsNode={(item) => {
              return [
                { description: DescriptionClass(item) },
                {
                  title: tWords("specialty"),
                  description: DescriptionSpecialty(
                    item?.specialty ?? undefined
                  ),
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
