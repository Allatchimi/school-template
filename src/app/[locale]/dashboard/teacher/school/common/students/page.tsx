import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Students",
  description: "Teacher dashboard for students.",
  openGraph: {
    title: "Students",
    description: "Students page.",
  },
  keywords: ["Dashboard", "Teacher", "Student"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
