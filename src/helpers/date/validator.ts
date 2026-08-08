import { TimeType } from "@/types/http/base-response";

export function isValidTimeFormat(time: TimeType): boolean {
  // Simple regex for "HH:mm"
  // ^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$
  // Hours from de 00 to 23 and minutes from 00 to 59.
  return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time.toString());
}
