export const PATH_API_BASE_URL_INTERNAL = "/backend-api";
export const PATH_CDN_URL_INTERNAL = "/cdn-api";

export const PATH_INVALID_FEATURE_PERMISSION = "/auth/invalidpermissions";

// Feature protected
export const PATH_PROTECTED_ADMIN = "/dashboard/admin";
export const PATH_PROTECTED_DIRECTOR = "/dashboard/admin";
export const PATH_PROTECTED_TEACHER = "/dashboard/teacher";
export const PATH_PROTECTED_STUDENT = "/dashboard/student";
export const PATH_PROTECTED_PARENT = "/dashboard/parent";
// Default protected
export const PATH_PROTECTED_DEFAULT = "/profile";
export const PATH_PROTECTED_COURSE = "/dashboard/common/courses";

// All protected
export const PATH_PROTECTED_LIST_SUPER_ADMIN = [
  PATH_PROTECTED_ADMIN + "/users",
  PATH_PROTECTED_ADMIN + "/school/common/schools",
];
export const PATH_PROTECTED_LIST = [
  PATH_PROTECTED_ADMIN,
  PATH_PROTECTED_DIRECTOR,
  PATH_PROTECTED_TEACHER,
  PATH_PROTECTED_STUDENT,
  PATH_PROTECTED_PARENT,
  PATH_PROTECTED_DEFAULT,
  PATH_PROTECTED_COURSE,
];

// Admin only routes
export const PATH_PUBLIC_ADMIN_HELP = "/help/home";
export const PATH_PUBLIC_ADMINS = [PATH_PUBLIC_ADMIN_HELP];

// School only routes
export const PATH_PUBLIC_SCHOOL_HOME = "/home";
export const PATH_PUBLIC_SCHOOL_HELP = "/common/help";
export const PATH_PUBLIC_SCHOOLS = ["/common", PATH_PUBLIC_SCHOOL_HELP];
