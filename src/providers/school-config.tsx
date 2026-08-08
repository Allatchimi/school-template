"use client";

import { createContext, useEffect, useState } from "react";
import { SchoolResponse } from "@/lib/api/school/common/school/response";
import { IDType } from "@/types/http/base-response";
import { SchoolConfig } from "@/config/school";
import { YearResponse } from "@/lib/api/school/common/year/response";
import { FEATURE_ADMIN, FEATURE_DIRECTOR } from "@/lib/constants/user/feature";
import PreloadFailed from "@/components/section/preload-failed";
import LoaderLogo from "@/components/loader/loader-logo";

interface SchoolConfigType {
  children?: React.ReactNode;
  schoolID?: IDType;
  schoolType?: string;
  schoolData?: SchoolResponse;
  years?: YearResponse[];
  userFeature?: string;
  isAuthenticated?: boolean;
  isPreloadError?: boolean;
}

const SchoolConfigContext = createContext<SchoolConfigType | undefined>(
  undefined
);

export function SchoolConfigProvider(props: SchoolConfigType) {
  // React hooks
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    SchoolConfig.setSchoolID(props.schoolID);
    SchoolConfig.setSchoolType(props.schoolType);
    SchoolConfig.setSchoolData(props.schoolData);

    if (props.isAuthenticated === true) {
      const localStorageYearID = SchoolConfig.yearIDLocalStorage();
      const updateLocalStorageYearID = localStorageYearID ? true : false;
      if (
        !props.schoolID ||
        props.userFeature === FEATURE_ADMIN ||
        props.userFeature === FEATURE_DIRECTOR
      ) {
        SchoolConfig.setYearData(undefined, updateLocalStorageYearID);
      } else {
        const yearIndex = YearIndexInYearsList(
          props.years,
          localStorageYearID,
          props.schoolID
        );
        if (props.years && props.years.length > 0) {
          SchoolConfig.setYearData(
            props.years[yearIndex],
            updateLocalStorageYearID
          );
        } else {
          SchoolConfig.setYearData(undefined, updateLocalStorageYearID);
        }
      }
    }

    setIsReady(true);
  }, [
    props.schoolID,
    props.schoolType,
    props.schoolData,
    props.years,
    props.userFeature,
    props.isAuthenticated,
  ]);

  // Check ready
  if (!isReady) {
    return <LoaderLogo />;
  }

  // Check error
  if (props.isPreloadError == true) {
    return <PreloadFailed />;
  }

  return (
    <SchoolConfigContext.Provider
      value={{
        schoolID: props.schoolID,
        schoolType: props.schoolType,
        schoolData: props.schoolData,
        years: props.years,
        userFeature: props.userFeature,
      }}
    >
      {props.children}
    </SchoolConfigContext.Provider>
  );
}

function YearIndexInYearsList(
  years?: YearResponse[],
  yearID?: IDType,
  yearSchoolID?: IDType
) {
  if (!years || years.length < 1 || !yearID || !yearSchoolID) {
    return 0;
  }
  for (let i = 0; i < years.length; i++) {
    if (years[i].id === yearID && years[i].school?.id === yearSchoolID) {
      return i;
    }
  }

  return 0;
}
