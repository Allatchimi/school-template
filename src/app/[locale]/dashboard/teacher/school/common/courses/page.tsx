import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description: "Teacher dashboard for courses.",
  openGraph: {
    title: "Courses",
    description: "Courses page.",
  },
  keywords: ["Dashboard", "Teacher", "Course"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
