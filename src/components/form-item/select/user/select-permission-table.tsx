"use client";

import { PERMISSION_TABLE_LIST } from "@/lib/constants/user/permission-table";
import FormItemSelect, { FormItemSelectProps } from "../select";
import { RoleListRequest } from "@/lib/api/user/role/request";
import { useTranslations } from "next-intl";

export default function FormItemSelectPermissionTable(
  props: {
    request?: RoleListRequest;
  } & FormItemSelectProps<string>
) {
  // Next hooks
  const tSentences = useTranslations("Sentences.feedback.form.validation");
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.user.permission.table");

  return (
    <FormItemSelect<string>
      {...props}
      name={props.name || "tableName"}
      label={props.label || tWords("table")}
      placeholder={props.placeholder || tWords("table")}
      requiredMsg={
        props.requiredMsg ||
        tSentences("pleaseSelectTheLabel", { label: tWords("table") })
      }
      options={PERMISSION_TABLE_LIST.map((item) => {
        return {
          data: item,
          label: tEnums(`${item}`),
          value: item,
        };
      })}
    />
  );
}
