"use client";

import { PaymentEnrollResponse } from "@/lib/api/school/common/payment/response";
import { TableColumnsType } from "antd";
import { TableColumnClassLevelDomain } from "../../../column/school/column-class-level-domain";
import TableIndexStudentEnroll from "../../../indexes/school/common/index-student-enroll";
import {
  PAYMENT_STATUS_CANCELED,
  PAYMENT_STATUS_FAILED,
  PAYMENT_STATUS_PENDING,
  PAYMENT_STATUS_REJECTED,
  PAYMENT_STATUS_SUCCESS,
} from "@/lib/constants/school/common/payment";
import { Text } from "@/ui/antd";
import { TableColumnSchool } from "../../../column/school/column-school";
import { TableColumnYear } from "../../../column/school/column-year";
import { TableColumnsProps } from "../../../column.type";
import { TableColumnID } from "../../../column/column-id";
import { TableColumnUpdatedAt } from "../../../column/column-updated-at";
import {
  TableColumnEnum,
  TableColumnObject,
  TableColumnStatus,
} from "@/components/table/column/column-types";
import { useTranslations } from "next-intl";

export function TableColumsPayment(
  props: TableColumnsProps
): TableColumnsType<PaymentEnrollResponse> {
  // Next hooks
  const tWords = useTranslations("Words");
  const tEnums = useTranslations("Enums.school.common.payment");

  return [
    ...TableColumnID<PaymentEnrollResponse>({ ...props }),
    ...TableColumnObject<PaymentEnrollResponse>({
      ...props,
      title: tWords("student"),
      render(record) {
        return (
          <TableIndexStudentEnroll
            record={record?.studentEnroll ?? undefined}
          />
        );
      },
    }),
    ...TableColumnSchool<PaymentEnrollResponse>(props.schoolType),
    ...TableColumnYear<PaymentEnrollResponse>(props.yearID, true),
    ...TableColumnClassLevelDomain<PaymentEnrollResponse>({
      schoolType: props.schoolType,
      isStudentEnroll: true,
    }),
    ...TableColumnObject<PaymentEnrollResponse>({
      ...props,
      title: tWords("amount"),
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      render(record) {
        return (
          <Text ellipsis>
            {record?.amount ?? 0} {record?.currency?.toUpperCase()}
          </Text>
        );
      },
    }),
    ...TableColumnEnum<PaymentEnrollResponse>({
      ...props,
      title: tWords("method"),
      dataIndex: "method",
      key: "method",
      sorter: true,
      render(value) {
        return value ? tEnums(`method.${value}`) : "";
      },
    }),
    ...TableColumnStatus<PaymentEnrollResponse>({
      ...props,
      sorter: true,
      render(record) {
        return record?.status ? tEnums(`status.${record?.status}`) : "";
      },
      renderColor(record) {
        return record?.status === PAYMENT_STATUS_SUCCESS
          ? "success"
          : record?.status === PAYMENT_STATUS_PENDING
            ? "processing"
            : record?.status === PAYMENT_STATUS_FAILED ||
                PAYMENT_STATUS_CANCELED ||
                PAYMENT_STATUS_REJECTED
              ? "error"
              : "default";
      },
    }),
    ...TableColumnUpdatedAt<PaymentEnrollResponse>({ ...props }),
  ];
}
