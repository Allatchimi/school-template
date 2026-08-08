import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exams",
  description: "Teacher dashboard for exams.",
  openGraph: {
    title: "Exams",
    description: "Exams page.",
  },
  keywords: ["Dashboard", "Teacher", "Exam"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
