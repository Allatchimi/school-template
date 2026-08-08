import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enrolls",
  description: "Student dashboard for enrolls.",
  openGraph: {
    title: "Enrolls",
    description: "Enrolls page.",
  },
  keywords: ["Dashboard", "Student", "Enroll"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
