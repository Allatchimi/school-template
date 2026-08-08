"use client";

import FormItemSelectSchool from "@/components/form-item/select/school/common/select-school";
import { SchoolConfig } from "@/config/school";
import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import { useState } from "react";
import { FormInstance } from "antd/es/form/Form";
import FormItemSelectLevelDomain from "@/components/form-item/select/school/university/select-level-domain";
import FormItemSelectClass from "@/components/form-item/select/school/highschool/select-class";
import FormItemSelect from "@/components/form-item/select/select";
import { FilterType } from "@/components/filter/default-filters";
import { IDType } from "@/types/http/base-response";
import { useTranslations } from "next-intl";

interface FormFilterSchoolLevelDomainProps<
  T extends Partial<FilterType> | undefined,
> {
  disabled?: boolean;
  item?: T;
  form?: FormInstance<T>;
  onFieldsChanged?: (value?: T) => void;
}

interface FilterInternalType {
  schoolID?: IDType;
  schoolType?: string;
}

export default function FormFilterSchoolLevelDomain<
  T extends Partial<FilterType> | undefined,
>(props: FormFilterSchoolLevelDomainProps<T>) {
  // React hooks
  const initialRequest: FilterInternalType = {
    schoolID: SchoolConfig.schoolID(),
    schoolType: SchoolConfig.schoolType(),
  };
  const [request, setRequest] = useState<FilterInternalType | undefined>(
    initialRequest
  );

  // Next hooks
  const tWords = useTranslations("Words");

  const handleValuesChange = (values?: FilterInternalType) => {
    // Cleanup values
    if (request?.schoolID != values?.schoolID) {
      const fieldValues = {
        ...props.form?.getFieldsValue?.(),
        classID: undefined,
        levelDomainID: undefined,
      };
      props.onFieldsChanged?.(fieldValues as any);
    }
    // Update
    setRequest(values ?? undefined);
  };

  return (
    <div className="w-auto flex flex-wrap items-center gap-4">
      {request?.schoolType === SCHOOL_TYPE_HIGHSCHOOL ? (
        <FormItemSelectClass
          form={props.form}
          disabled={props.disabled}
          defaultValue={(props?.item as any)?.classID?.toString()}
          request={{ schoolID: request.schoolID }}
          prefetch={true}
          noMargin={true}
        />
      ) : request?.schoolType === SCHOOL_TYPE_UNIVERSITY ? (
        <FormItemSelectLevelDomain
          form={props.form}
          disabled={props.disabled}
          defaultValue={(props?.item as any)?.levelDomainID?.toString()}
          request={{ schoolID: request.schoolID }}
          prefetch={true}
          noMargin={true}
        />
      ) : (
        <FormItemSelect
          disabled={props.disabled}
          name="classLevelDomainID"
          label={tWords("classLevelDomain")}
          placeholder={tWords("classLevelDomain")}
          noMargin={true}
        />
      )}

      {!initialRequest.schoolID ? (
        <FormItemSelectSchool
          form={props.form}
          disabled={props.disabled}
          defaultValue={(props?.item as any)?.schoolID?.toString()}
          prefetch={true}
          onChangeFormatted={(value) => {
            const newValues: FilterInternalType = {
              schoolID: value?.id ?? undefined,
              schoolType: value?.type ?? undefined,
            };
            handleValuesChange(newValues);
          }}
          noMargin={true}
        />
      ) : undefined}
    </div>
  );
}
