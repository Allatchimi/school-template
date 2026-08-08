"use client";

import { DescriptionPayment } from "@/components/description/school/common/description-payment";
import { DescriptionSchool } from "@/components/description/school/common/description-school";
import { DescriptionStudentEnroll } from "@/components/description/school/common/description-student-enroll";
import { DescriptionYear } from "@/components/description/school/common/description-year";
import { DescriptionClass } from "@/components/description/school/highschool/description-class";
import { DescriptionLevelDomain } from "@/components/description/school/university/description-level-domain";
import {
  FilterSchoolYearClassLevelDomainType,
  filterSchoolYearClassLevelDomainTypeTemplate,
} from "@/components/filter/default-filters";
import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import FormAddUpdatePayment from "@/components/form/school/common/form-add-update-payment";
import { TableColumsPayment } from "@/components/table/columns/school/common/columns-payment";
import ContentTableTemplate from "@/components/template/content-table/content-table-template";
import { SchoolConfig } from "@/config/school";
import { formatSortStrToSortOrder } from "@/helpers/cast/table";
import {
  PaymentEnrollRequest,
  PaymentEnrollListRequest,
  comparePaymentRequestToResponse,
} from "@/lib/api/school/common/payment/request";
import {
  PaymentEnrollResponse,
  PaymentEnrollListResponse,
} from "@/lib/api/school/common/payment/response";
import {
  getPaymentList,
  postPayment,
  updatePayment,
  deletePayment,
  deleteMultiplePayment,
} from "@/lib/api/school/common/payment/routes";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function PageContent() {
  // Next hooks
  const tWords = useTranslations("Words");

  // React hooks
  const searchParams = useSearchParams();
  const paramOrderBy = searchParams.get("orderBy");
  const paramSort = searchParams.get("sort");

  return (
    <>
      <ContentTableTemplate<
        PaymentEnrollRequest,
        PaymentEnrollResponse,
        PaymentEnrollListRequest,
        PaymentEnrollListResponse,
        FilterSchoolYearClassLevelDomainType
      >
        itemLabel={tWords("payment")}
        downloadUploadTableName="payments"
        queryKeyData="admin-payments-data"
        canAdd={true}
        canUpdate={true}
        canDeleteOne={true}
        canDeleteMultiple={true}
        canSelectMultiple={true}
        canUpload={false}
        canDownload={false}
        addDefaultActions={true}
        dialogFormAddUpdateWidth={800}
        dialogDescriptionWidth={800}
        searchParams={searchParams}
        filterTemplate={filterSchoolYearClassLevelDomainTypeTemplate}
        returnExtraFilterNode={(values, loading) => {
          if ((SchoolConfig.schoolID() ?? 0) > 0) {
            return undefined;
          }
          return (
            <div className="w-auto flex flex-wrap items-center gap-4">
              <FormItemSelectSchool
                disabled={loading}
                defaultValue={values?.schoolID?.toString()}
                allowEmptySelection={true}
                allowEmptySelectionLabel="*"
                noMargin={true}
              />
            </div>
          );
        }}
        columns={TableColumsPayment({
          schoolType: SchoolConfig.schoolType(),
          yearID: SchoolConfig.yearID(),
          orderBy: paramOrderBy ?? undefined,
          sort: formatSortStrToSortOrder(paramSort ?? undefined),
        })}
        areEqual={comparePaymentRequestToResponse}
        returnFormAddUpdateNode={FormAddUpdatePayment}
        returnDescriptions={(item) => {
          return [
            { description: DescriptionPayment(item) },
            {
              title: tWords("studentEnroll"),
              description: DescriptionStudentEnroll(
                item?.studentEnroll ?? undefined
              ),
            },
            {
              title: tWords("school"),
              description: DescriptionSchool(item?.school ?? undefined),
            },
            {
              title: tWords("year"),
              description: DescriptionYear(
                item?.studentEnroll?.year ?? undefined
              ),
            },
            ...(item?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
              ? [
                  {
                    title: tWords("class"),
                    description: DescriptionClass(
                      item?.studentEnroll?.class ?? undefined
                    ),
                  },
                ]
              : item?.school?.type === SCHOOL_TYPE_UNIVERSITY
                ? [
                    {
                      title: tWords("levelDomain"),
                      description: DescriptionLevelDomain(
                        item?.studentEnroll?.levelDomain ?? undefined
                      ),
                    },
                  ]
                : [
                    {
                      title: tWords("classLevelDomain"),
                      description: undefined,
                    },
                  ]),
          ];
        }}
        getItemList={getPaymentList}
        postItem={postPayment}
        updateItem={updatePayment}
        deleteItem={deletePayment}
        deleteMultipleItems={deleteMultiplePayment}
        uploadData={undefined}
        downloadData={undefined}
      />
    </>
  );
}
