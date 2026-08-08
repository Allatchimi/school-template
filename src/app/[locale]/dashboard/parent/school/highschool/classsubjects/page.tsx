import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subjects",
  description: "Student dashboard for subjects.",
  openGraph: {
    title: "Subjects",
    description: "Subjects page.",
  },
  keywords: ["Dashboard", "Student", "Subject"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
