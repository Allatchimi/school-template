// Payment status
export const PAYMENT_STATUS_PENDING = "pending";
export const PAYMENT_STATUS_SUCCESS = "success";
export const PAYMENT_STATUS_FAILED = "failed";
export const PAYMENT_STATUS_CANCELED = "canceled";
export const PAYMENT_STATUS_REJECTED = "rejected";
export const PAYMENT_STATUS = [
  PAYMENT_STATUS_PENDING,
  PAYMENT_STATUS_SUCCESS,
  PAYMENT_STATUS_FAILED,
  PAYMENT_STATUS_CANCELED,
  PAYMENT_STATUS_REJECTED,
];

// Payment method
export const PAYMENT_METHOD_CASH = "cash";
export const PAYMENT_METHOD_CARD = "card";
export const PAYMENT_METHOD_MTN_MOBILE_MONEY = "mtn_mobile_money";
export const PAYMENT_METHOD_ORANGE_MONEY = "orange_money";
export const PAYMENT_METHOD_BANK_TRANSFER = "bank_transfer";
export const PAYMENT_METHOD_BANK_DEPOSIT = "bank_deposit";
export const PAYMENT_METHODS = [
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_CARD,
  PAYMENT_METHOD_MTN_MOBILE_MONEY,
  PAYMENT_METHOD_ORANGE_MONEY,
  PAYMENT_METHOD_BANK_TRANSFER,
  PAYMENT_METHOD_BANK_DEPOSIT,
];
