"use client";

import {
  SCHOOL_TYPE_HIGHSCHOOL,
  SCHOOL_TYPE_UNIVERSITY,
} from "@/lib/constants/school/common/school";
import {
  PATH_PROTECTED_ADMIN,
  PATH_PROTECTED_DEFAULT,
  PATH_PROTECTED_DIRECTOR,
  PATH_PROTECTED_PARENT,
  PATH_PROTECTED_STUDENT,
  PATH_PROTECTED_TEACHER,
} from "@/lib/constants/routes";
import { useSession } from "next-auth/react";
import {
  FEATURE_ADMIN,
  FEATURE_DIRECTOR,
  FEATURE_PARENT,
  FEATURE_STUDENT,
  FEATURE_TEACHER,
} from "@/lib/constants/user/feature";
import { Breadcrumb } from "@/ui/antd";
import Link from "next/link";
import { useCourseDetailsStore } from "@/store/course-details";
import { useTranslations } from "next-intl";

export default function CourseBreadcrumb() {
  // Next hooks
  const session = useSession();
  const tWords = useTranslations("Words");

  // Zustand hooks
  const courseDetailsStore = useCourseDetailsStore((state) => state.items);
  const data =
    courseDetailsStore.length > 0 ? courseDetailsStore[0] : undefined;

  const feature = session?.data?.user.feature;
  return (
    <Breadcrumb
      items={[
        {
          title: (
            <Link
              href={`${
                feature === FEATURE_ADMIN
                  ? PATH_PROTECTED_ADMIN
                  : feature === FEATURE_DIRECTOR
                    ? PATH_PROTECTED_DIRECTOR
                    : feature === FEATURE_TEACHER
                      ? PATH_PROTECTED_TEACHER
                      : feature === FEATURE_STUDENT
                        ? PATH_PROTECTED_STUDENT
                        : feature === FEATURE_PARENT
                          ? PATH_PROTECTED_PARENT
                          : PATH_PROTECTED_DEFAULT
              }/school/common/courses`}
            >
              {tWords("courses")}
            </Link>
          ),
        },
        ...(data?.school?.type === SCHOOL_TYPE_HIGHSCHOOL
          ? [
              {
                title:
                  data?.classSubject?.class?.name ||
                  tWords("invalidLabel", { label: tWords("class") }),
              },
              {
                title:
                  data?.classSubject?.subject?.name ||
                  tWords("invalidLabel", { label: tWords("subject") }),
              },
            ]
          : data?.school?.type === SCHOOL_TYPE_UNIVERSITY
            ? [
                {
                  title:
                    data?.unit?.semester?.name ||
                    tWords("invalidLabel", { label: tWords("semester") }),
                },
                {
                  title: `${
                    data?.unit?.levelDomain?.level?.name ||
                    tWords("invalidLabel", { label: tWords("level") })
                  } ${
                    data?.unit?.levelDomain?.domain?.name ||
                    tWords("invalidLabel", { label: tWords("domain") })
                  }`,
                },
                {
                  title:
                    data?.unit?.name ||
                    tWords("invalidLabel", { label: tWords("unit") }),
                },
              ]
            : []),
        {
          title:
            data?.title || tWords("invalidLabel", { label: tWords("title") }),
        },
      ]}
    />
  );
}
