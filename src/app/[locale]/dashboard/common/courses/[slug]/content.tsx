"use client";

import CourseDescription from "./components/course-description";
import CourseRightPanel from "./components/course-right-panel";
import CourseCommentSection from "./components/course-comment-section";
import { getCourse } from "@/lib/api/school/common/course/routes";
import { useQuery } from "@tanstack/react-query";
import { useCourseDetailsStore } from "@/store/course-details";
import { useCallback, useEffect } from "react";

export default function PageContent(props: { slug: string }) {
  // React hooks
  const id: number = Number(props.slug);

  // Zustand hooks
  const addCourseDetails = useCourseDetailsStore((state) => state.addCourse);

  // Tanstack hooks
  const queryKeyData = "course-details-data";
  const query = useQuery({
    queryKey: [queryKeyData],
    queryFn: async () => getCourse(id),
  });

  const startAddCourseDetails = useCallback(() => {
    addCourseDetails(query.data?.data ?? undefined);
  }, [addCourseDetails, query.data?.data]);
  useEffect(() => {
    startAddCourseDetails();
  }, [startAddCourseDetails]);

  return (
    <>
      <div className="w-full flex flex-col-reverse xl:flex-row gap-2.5">
        <CourseDescription
          loading={query.isFetching}
          loadingError={query.isLoadingError}
          status={query.data?.status}
          item={query.data?.data ?? undefined}
          onRefresh={query.refetch}
        />
        <CourseRightPanel
          loading={query.isFetching}
          documents={query.data?.data?.documents ?? undefined}
          videos={query.data?.data?.videos ?? undefined}
        />
      </div>
      <div className="w-full mt-4 pb-12">
        <CourseCommentSection id={id} />
      </div>
    </>
  );
}
