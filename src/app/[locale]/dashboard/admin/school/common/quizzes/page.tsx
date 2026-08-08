import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quizzes management",
  description: "Admin dashboard for quizzes management.",
  openGraph: {
    title: "Quizzes management",
    description: "Quizzes management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Quiz"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
