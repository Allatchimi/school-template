import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exam types management",
  description: "Admin dashboard for exam types management.",
  openGraph: {
    title: "Exam types management",
    description: "Exam types management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Exam", "Type"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
