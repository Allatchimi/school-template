import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exam entries management",
  description: "Admin dashboard for exams management.",
  openGraph: {
    title: "Exams management",
    description: "Exams management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Exam"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
