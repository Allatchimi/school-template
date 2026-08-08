"use client";

import { FilterType } from "@/components/filter/default-filters";
import { ContentCardListTemplateInternalProps } from "./content-card-list-template-internal";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoaderContentCardListTemplate from "@/components/loader/content-card-list-template";

const CardListTemplateLazy = dynamic<
  ContentCardListTemplateInternalProps<any, any, any, any, any>
>(() => import("./content-card-list-template-internal"), { ssr: false });

export default function ContentCardListTemplate<
  TReq extends object,
  TResp extends object,
  TListReq extends object,
  TListResp extends object,
  TSearchParam extends Partial<FilterType> | undefined = undefined,
>(
  props: ContentCardListTemplateInternalProps<
    TReq,
    TResp,
    TListReq,
    TListResp,
    TSearchParam
  >
) {
  return (
    <Suspense fallback={<LoaderContentCardListTemplate />}>
      <CardListTemplateLazy {...props} />
    </Suspense>
  );
}
