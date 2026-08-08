"use client";

import SelectLabelRequest from "@/components/form-item/select-label/school/common/select-label-request";
import { RequestListRequest } from "@/lib/api/school/common/request/request";
import {
  RequestResponse,
  RequestListResponse,
} from "@/lib/api/school/common/request/response";
import { getRequestList } from "@/lib/api/school/common/request/routes";
import { SCHOOL_TYPE_UNIVERSITY } from "@/lib/constants/school/common/school";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectRequest(
  props: FormItemSelectFetchProps<
    RequestResponse,
    RequestListRequest,
    RequestListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      RequestResponse,
      RequestListRequest,
      RequestListResponse
    >
      {...props}
      name={props.name || "requestID"}
      label={props.label || tWords("result")}
      placeholder={props.placeholder || tWords("result")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("result") })
      }
      getItemList={getRequestList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelRequest item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: RequestResponse[] | null,
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
      const title =
        item.title || tWords("invalidLabel", { label: tWords("title") });
      const classSubjectUnit =
        item?.school?.type === SCHOOL_TYPE_UNIVERSITY
          ? `(${item.unit?.name || tWords("invalidLabel", { label: tWords("unit") })})`
          : `(${item.classSubject?.subject?.name || tWords("invalidLabel", { label: tWords("subject") })} ${
              item.classSubject?.class?.name ||
              tWords("invalidLabel", { label: tWords("class") })
            })`;
      return {
        data: item,
        label: `${fullName}(${classSubjectUnit}) - ${title}`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
