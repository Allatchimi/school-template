import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedules",
  description: "Teacher dashboard for schedules.",
  openGraph: {
    title: "Schedules",
    description: "Schedules page.",
  },
  keywords: ["Dashboard", "Teacher", "Schedule"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
