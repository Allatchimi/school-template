import { CourseResponse } from "@/lib/api/school/common/course/response";
import { create } from "zustand";

interface CourseDetailsState {
  items: CourseResponse[];
  addCourse: (item?: CourseResponse) => void;
  clearCourse: () => void;
}

export const useCourseDetailsStore = create<CourseDetailsState>((set) => ({
  items: [],
  addCourse: (item) =>
    set((state) => ({
      items: item ? [item, ...state.items] : [],
    })),
  clearCourse: () =>
    set(() => ({
      items: [],
    })),
}));
