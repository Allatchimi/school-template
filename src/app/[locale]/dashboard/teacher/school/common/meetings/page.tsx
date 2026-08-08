import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meetings",
  description: "Teacher dashboard for meetings.",
  openGraph: {
    title: "Meetings",
    description: "Meetings page.",
  },
  keywords: ["Dashboard", "Teacher", "Meeting"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
