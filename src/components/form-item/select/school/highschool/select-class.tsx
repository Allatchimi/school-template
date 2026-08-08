"use client";

import SelectLabelClass from "@/components/form-item/select-label/school/highschool/select-label-class";
import { ClassListRequest } from "@/lib/api/school/highschool/class/request";
import {
  ClassResponse,
  ClassListResponse,
} from "@/lib/api/school/highschool/class/response";
import { getClassList } from "@/lib/api/school/highschool/class/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectClass(
  props: FormItemSelectFetchProps<
    ClassResponse,
    ClassListRequest,
    ClassListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<ClassResponse, ClassListRequest, ClassListResponse>
      {...props}
      name={props.name || "classID"}
      label={props.label || tWords("class")}
      placeholder={props.placeholder || tWords("class")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("class") })
      }
      getItemList={getClassList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelClass item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: ClassResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      return {
        data: item,
        label: `${item?.name || tWords("invalidLabel", { label: tWords("class") })} - ${
          item?.specialty?.name ||
          tWords("invalidLabel", { label: tWords("specialty") })
        }, ${item?.specialty?.section?.name || tWords("invalidLabel", { label: tWords("section") })}`,
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
