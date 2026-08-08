"use client";

import SelectLabelSequence from "@/components/form-item/select-label/school/highschool/select-label-sequence";
import { SequenceListRequest } from "@/lib/api/school/highschool/sequence/request";
import {
  SequenceResponse,
  SequenceListResponse,
} from "@/lib/api/school/highschool/sequence/response";
import { getSequenceList } from "@/lib/api/school/highschool/sequence/routes";
import FormItemSelectFetch, {
  FormItemSelectFetchProps,
} from "../../select-fetch";
import { useTranslations } from "next-intl";

export default function FormItemSelectSequence(
  props: FormItemSelectFetchProps<
    SequenceResponse,
    SequenceListRequest,
    SequenceListResponse
  >
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");

  return (
    <FormItemSelectFetch<
      SequenceResponse,
      SequenceListRequest,
      SequenceListResponse
    >
      {...props}
      name={props.name || "sequenceID"}
      label={props.label || tWords("sequence")}
      placeholder={props.placeholder || tWords("sequence")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("sequence") })
      }
      getItemList={getSequenceList}
      defaultOptions={getOptionsFromData(props.defaultOptions, tWords)}
      optionsFormat={(data) => getOptionsFromData(data, tWords)}
      optionRender={(option) => {
        return option.data ? (
          <SelectLabelSequence item={option.data} />
        ) : (
          option.label
        );
      }}
    />
  );
}

const getOptionsFromData = (
  data?: SequenceResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      return {
        data: item,
        label:
          item.name || tWords("invalidLabel", { label: tWords("sequence") }),
        value: item.id?.toString() ?? "",
      };
    }) ?? []
  );
};
