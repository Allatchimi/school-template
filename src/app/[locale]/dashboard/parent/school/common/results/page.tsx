import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Results",
  description: "Student dashboard for results.",
  openGraph: {
    title: "Results",
    description: "Results page.",
  },
  keywords: ["Dashboard", "Student", "Result"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
