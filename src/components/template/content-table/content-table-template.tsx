"use client";

import { FilterType } from "@/components/filter/default-filters";
import { ContentTableTemplateInternalProps } from "./content-table-template-internal";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import LoaderContentTableTemplate from "@/components/loader/loader-content-table-template";

const ContentTableTemplateInternalLazy = dynamic<
  ContentTableTemplateInternalProps<any, any, any, any, any>
>(() => import("./content-table-template-internal"), { ssr: false });

export default function ContentTableTemplate<
  TReq extends object,
  TResp extends object,
  TListReq extends object,
  TListResp extends object,
  TSearchParam extends Partial<FilterType> | undefined = undefined,
>(
  props: ContentTableTemplateInternalProps<
    TReq,
    TResp,
    TListReq,
    TListResp,
    TSearchParam
  >
) {
  return (
    <Suspense fallback={<LoaderContentTableTemplate />}>
      <ContentTableTemplateInternalLazy {...props} />
    </Suspense>
  );
}
