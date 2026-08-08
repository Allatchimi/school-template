import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exams",
  description: "Student dashboard for exams.",
  openGraph: {
    title: "Exams",
    description: "Exams page.",
  },
  keywords: ["Dashboard", "Student", "Exam"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
