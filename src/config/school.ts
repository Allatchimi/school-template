import { SchoolResponse } from "@/lib/api/school/common/school/response";
import { YearResponse } from "@/lib/api/school/common/year/response";
import { IDType } from "@/types/http/base-response";

export const SchoolConfig = (() => {
  let mSchoolID: IDType | undefined;
  let mSchoolType: string | undefined;
  let mSchoolData: SchoolResponse | undefined;
  let mYear: YearResponse | undefined;

  // School ID
  const schoolID = (): IDType | undefined =>
    mSchoolID && mSchoolID > 0 ? mSchoolID : undefined;
  const setSchoolID = (schoolID: IDType | undefined) => {
    mSchoolID = schoolID;
  };
  // School type
  const schoolType = (): string | undefined =>
    mSchoolType && mSchoolType.length > 0 ? mSchoolType : undefined;
  const setSchoolType = (schoolType: string | undefined) => {
    mSchoolType = schoolType;
  };
  // School data
  const setSchoolData = (data?: SchoolResponse) => {
    mSchoolData = data;
  };
  const schoolData = (): SchoolResponse | undefined => mSchoolData;

  // Year
  const setYearData = (year?: YearResponse, updateLocalStorage?: boolean) => {
    if (!year) {
      mYear = undefined;
      if (updateLocalStorage === true) {
        localStorage.removeItem("yearID");
      }
      return;
    }

    mYear = year;
    if (updateLocalStorage === true) {
      localStorage.setItem("yearID", year?.id?.toString() ?? "");
    }
  };
  const yearID = (): IDType | undefined => {
    return mYear?.id ?? undefined;
  };
  const yearIDLocalStorage = (): IDType | undefined => {
    const yearIDStr = localStorage.getItem("yearID");
    const yearID = yearIDStr && yearIDStr.length > 0 ? parseInt(yearIDStr) : 0;
    return yearID;
  };
  const yearData = (): YearResponse | undefined => {
    return mYear;
  };

  return {
    setSchoolID,
    schoolID,

    setSchoolType,
    schoolType,

    schoolData,
    setSchoolData,

    yearData,
    yearID,
    yearIDLocalStorage,
    setYearData,
  };
})();
