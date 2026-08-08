"use client";

import SelectLabelResult from "@/components/form-item/select-label/school/common/select-label-result";
import { ResultListRequest } from "@/lib/api/school/common/result/request";
import {
  ResultResponse,
  ResultListResponse,
} from "@/lib/api/school/common/result/response";
import { getResultList } from "@/lib/api/school/common/result/routes";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectResult(
  props: FormItemSelectFetchProps<
    ResultResponse,
    ResultListRequest,
    ResultListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<ResultResponse, ResultListRequest, ResultListResponse>
      {...props}
      name={props.name || "resultID"}
      label={props.label || tWords("result")}
      placeholder={props.placeholder || tWords("result")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("result") })
      }
      getItemList={getResultList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelResult item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: ResultResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      const fullNameSpace = `${item.student?.user?.info?.firstName || ""} ${item.student?.user?.info?.lastName || ""}`;
      const fullName =
        fullNameSpace.trim().length > 0
          ? fullNameSpace
          : tWords("invalidLabel", { label: tWords("name") });
      const classSubjectUnit =
        item.exam?.school?.type === SCHOOL_TYPE_UNIVERSITY
          ? `(${
              item.exam?.unit?.name ||
              tWords("invalidLabel", { label: tWords("unit") })
            })`
          : `(${item.exam?.classSubject?.subject?.name || {}} ${
              item.exam?.classSubject?.class?.name ||
              tWords("invalidLabel", { label: tWords("class") })
            })`;
      return {
        data: item,
        label: `${fullName} (${classSubjectUnit})`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
