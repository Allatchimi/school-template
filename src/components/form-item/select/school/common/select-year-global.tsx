"use client";

import { YearResponse } from "@/lib/api/school/common/year/response";
import { getYearList } from "@/lib/api/school/common/year/routes";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Select, Spin, Empty } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useState, useCallback, useEffect } from "react";
import { YearListRequest } from "@/lib/api/school/common/year/request";
import { useTranslations } from "next-intl";

interface SelectYearGlobalProps {
  disabled?: boolean;
  defaultValue?: string;
  defaultOptions?: YearResponse[];
  request?: YearListRequest;
  size?: SizeType;
  onChange?: (
    value: string,
    option?:
      | SelectYearGlobalOptionType
      | SelectYearGlobalOptionType[]
      | undefined
  ) => void;
}

interface SelectYearGlobalOptionType {
  data: YearResponse;
  label: string;
  value: string | undefined;
  icon: null;
}

export default function SelectYearGlobal(props: SelectYearGlobalProps) {
  // React hooks
  const [search, setSearch] = useState("");
  const [value, setValue] = useState<string | undefined>(props.defaultValue);

  // Next hooks
  const tWords = useTranslations("Words");

  // Tanstack hooks
  const queryClient = useQueryClient();
  const queryKeyData = "select-year-global-data";
  const query = useQuery({
    queryKey: [queryKeyData, search, props.request],
    queryFn: async ({ signal }) =>
      getYearList(
        {
          ...props.request,
          search: search,
        },
        signal
      ),
  });

  const handleSearch = (value: string) => {
    queryClient.removeQueries({
      queryKey: [queryKeyData, search, props.request],
    });
    setSearch(value);
  };

  const onDataChanged = useCallback(
    (years?: YearResponse[]) => {
      if (!(value && value.length > 0) && (years?.length ?? 0) > 0) {
        setValue(years?.[0]?.id?.toString());
      }
    },
    [value, setValue]
  );
  useEffect(() => {
    onDataChanged(query.data?.data?.data ?? undefined);
  }, [onDataChanged, query.data?.data?.data]);

  return (
    <Select
      loading={query.isFetching}
      disabled={props.disabled}
      defaultValue={props.defaultValue}
      value={value}
      showSearch
      notFoundContent={
        query.isFetching ? (
          <Spin size="small" />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      }
      size={props.size ?? "middle"}
      placeholder={tWords("year")}
      optionLabelProp="label"
      filterOption={false}
      optionRender={(option) => {
        return option.label;
      }}
      onSearch={handleSearch}
      options={getOptionsFromData(
        query.data?.data?.data || props.defaultOptions,
        tWords
      )}
      onChange={props.onChange}
      style={{
        width: "100%",
      }}
    />
  );
}

const getOptionsFromData = (
  data?: YearResponse[] | null,
  tWords?: ReturnType<typeof useTranslations>
) => {
  if (!tWords) {
    return [];
  }

  return (
    data?.map((item) => {
      return {
        data: item,
        label: item.name || tWords("invalidLabel", { label: tWords("year") }),
        value: item.id?.toString(),
        icon: null,
      };
    }) ?? []
  );
};
