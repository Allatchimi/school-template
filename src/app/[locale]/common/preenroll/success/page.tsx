import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pre enroll success",
  description: "Pre enroll success page.",
  openGraph: {
    title: "Pre enroll success",
    description: "Pre enroll success page.",
  },
  keywords: ["Enroll", "Success", "Register", "Enrollment"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
