import {
  FEATURE_ADMIN,
  FEATURE_DIRECTOR,
  FEATURE_PARENT,
  FEATURE_STUDENT,
  FEATURE_TEACHER,
} from "@/lib/constants/user/feature";
import {
  PATH_PROTECTED_ADMIN,
  PATH_PROTECTED_DEFAULT,
  PATH_PROTECTED_DIRECTOR,
  PATH_PROTECTED_PARENT,
  PATH_PROTECTED_STUDENT,
  PATH_PROTECTED_TEACHER,
} from "../constants/routes";

export const getDashboardPath = (feature: string) => {
  switch (feature) {
    case FEATURE_ADMIN:
      return `${PATH_PROTECTED_ADMIN}/home`;
    case FEATURE_DIRECTOR:
      return `${PATH_PROTECTED_DIRECTOR}/home`;
    case FEATURE_TEACHER:
      return `${PATH_PROTECTED_TEACHER}/school/common/schedules`;
    case FEATURE_STUDENT:
      return `${PATH_PROTECTED_STUDENT}/school/common/schedules`;
    case FEATURE_PARENT:
      return `${PATH_PROTECTED_PARENT}/school/common/schedules`;

    default:
      return `${PATH_PROTECTED_DEFAULT}`;
  }
};
