"use client";

import {
  ClearOutlined,
  DownloadOutlined,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import FormItemSelect, { SelectOptionType } from "../form-item/select/select";
import { IDType } from "@/types/http/base-response";
import { ReactNode, useState } from "react";
import { Form, InputSearch, Button } from "@/ui/antd";
import { useTranslations } from "next-intl";

interface FilterOrderBySortType {
  orderBy?: string;
  sort?: "asc" | "desc";
}
const filterOrderBySortTypeTemplate: FilterOrderBySortType = {
  orderBy: undefined,
  sort: undefined,
};

interface FilterPaginationType {
  page?: number;
  limit?: number;
}
const filterPaginationTypeTemplate: FilterPaginationType = {
  page: undefined,
  limit: undefined,
};

export interface FilterType
  extends FilterOrderBySortType,
    FilterPaginationType {
  search?: string;
}

export const filterTypeTemplate: FilterType = {
  ...filterOrderBySortTypeTemplate,
  ...filterPaginationTypeTemplate,
  search: undefined,
};

export interface FilterSchoolType extends FilterType {
  schoolID?: IDType | null;
}
export const filterSchoolTypeTemplate: FilterSchoolType = {
  ...filterTypeTemplate,
  schoolID: undefined,
};

export interface FilterSchoolYearType extends FilterSchoolType {
  yearID?: IDType | null;
}
export const filterSchoolYearTypeTemplate: FilterSchoolYearType = {
  ...filterSchoolTypeTemplate,
  yearID: undefined,
};

export interface FilterSchoolClassLevelDomainType extends FilterSchoolType {
  classID?: IDType | null;
  levelDomainID?: IDType | null;
}
export const filterSchoolClassLevelDomainTypeTemplate: FilterSchoolClassLevelDomainType =
  {
    ...filterSchoolTypeTemplate,
    classID: undefined,
    levelDomainID: undefined,
  };

export interface FilterSchoolYearClassLevelDomainType
  extends FilterSchoolYearType {
  classID?: IDType | null;
  levelDomainID?: IDType | null;
}
export const filterSchoolYearClassLevelDomainTypeTemplate: FilterSchoolYearClassLevelDomainType =
  {
    ...filterSchoolYearTypeTemplate,
    classID: undefined,
    levelDomainID: undefined,
  };

export interface FilterSchoolClassSubjectUnitType extends FilterSchoolType {
  classSubjectID?: IDType | null;
  unitID?: IDType | null;
}
export const filterSchoolClassSubjectUnitTypeTemplate: FilterSchoolClassSubjectUnitType =
  {
    ...filterSchoolTypeTemplate,
    classSubjectID: undefined,
    unitID: undefined,
  };

export interface FilterSchoolYearClassSubjectUnitType
  extends FilterSchoolYearType {
  classSubjectID?: IDType | null;
  unitID?: IDType | null;
}
export const filterSchoolYearClassSubjectUnitTypeTemplate: FilterSchoolYearClassSubjectUnitType =
  {
    ...filterSchoolYearTypeTemplate,
    classSubjectID: undefined,
    unitID: undefined,
  };

export interface FilterSchoolYearStudentType extends FilterSchoolYearType {
  studentID?: IDType | null;
}
export const filterSchoolYearStudentTypeTemplate: FilterSchoolYearStudentType =
  {
    ...filterSchoolYearTypeTemplate,
    studentID: undefined,
  };

export interface DefaultFiltersProps<
  T extends Partial<FilterType> | undefined,
> {
  loading?: boolean;
  defaultValue?: T;
  formName?: string;
  canAdd?: boolean;
  canDownload?: boolean;
  orderByList?: SelectOptionType<string>[];
  returnExtraFilterNode?: (values?: T, loading?: boolean) => ReactNode;
  onFilterChanged?: (values: T) => void;
  onRefresh?: () => void;
  onAdd?: () => void;
  onDownload?: () => void;
}

export default function DefaultFilters<
  T extends Partial<FilterType> | undefined,
>(props: DefaultFiltersProps<T>) {
  // React hooks
  const [values, setValues] = useState<T>(props.defaultValue ?? ({} as T));

  // Next hooks
  const tWords = useTranslations("Words");

  const sortList: SelectOptionType<string>[] = [
    {
      label: tWords("ascending"),
      value: "asc",
    },
    {
      label: tWords("descending"),
      value: "desc",
    },
  ];

  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        {props.canAdd === true ? (
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={props.onAdd}
          >
            {tWords("add")}
          </Button>
        ) : null}
        <InputSearch
          defaultValue={props.defaultValue?.search ?? ""}
          placeholder={tWords("search")}
          enterButton={tWords("search")}
          size="large"
          className="w-full lg:max-w-[500px] flex-1"
          onSearch={(value) => {
            props.onFilterChanged?.({
              ...values,
              search: value,
            });
          }}
        />
        {(props.defaultValue?.search?.length ?? 0) >= 1 ? (
          <div className="flex flex-wrap items-center gap-2">
            <p className="line-clamp-1">
              {tWords("resultsFor")}{" "}
              <b className="font-extrabold">
                {props.defaultValue?.search ?? ""}
              </b>
            </p>
            <Button
              icon={<ClearOutlined width={18} height={18} />}
              onClick={() => {
                props.onFilterChanged?.({
                  ...values,
                  search: "",
                });
              }}
            >
              {tWords("clear")}
            </Button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap items-end gap-2 lg:gap-4 xl:gap-8">
        <Form<T>
          name={props.formName ?? "default-filters"}
          layout={"horizontal"}
          initialValues={{
            orderBy: props.defaultValue?.orderBy,
            sort: props.defaultValue?.sort,
          }}
          onValuesChange={(_changedValues, values) => {
            setValues(values);
            props.onFilterChanged?.(values);
          }}
          autoComplete="on"
          className="w-auto flex flex-wrap items-center gap-4"
        >
          {props.returnExtraFilterNode?.(props.defaultValue, props.loading)}

          <FormItemSelect<string>
            disabled={props.loading}
            defaultValue={props.defaultValue?.orderBy}
            name="orderBy"
            label={tWords("filter")}
            placeholder={tWords("filter")}
            required={false}
            size="middle"
            options={props.orderByList}
            noMargin={true}
          />

          <FormItemSelect<string>
            disabled={props.loading}
            defaultValue={props.defaultValue?.sort}
            name="sort"
            label={tWords("sort")}
            placeholder={tWords("sort")}
            required={false}
            size="middle"
            options={sortList}
            noMargin={true}
          />
        </Form>
        <Button
          loading={props.loading ?? undefined}
          icon={<SyncOutlined />}
          onClick={props.onRefresh}
        >
          {tWords("refresh")}
        </Button>
        {props.canDownload === true ? (
          <Button
            disabled={props.loading ?? undefined}
            icon={<DownloadOutlined />}
            onClick={props.onDownload}
          >
            {tWords("export")}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
