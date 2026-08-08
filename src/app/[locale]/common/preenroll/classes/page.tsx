import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pre enroll",
  description: "Pre enroll page.",
  openGraph: {
    title: "Pre enroll",
    description: "Pre enroll page.",
  },
  keywords: ["Enroll", "Class", "Enrollment"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
