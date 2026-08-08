import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quizzes",
  description: "Student dashboard for quizzes.",
  openGraph: {
    title: "Quizzes",
    description: "Quizzes page.",
  },
  keywords: ["Dashboard", "Student", "Quiz"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
