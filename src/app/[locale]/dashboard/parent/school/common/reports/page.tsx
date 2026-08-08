import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports",
  description: "Student dashboard for reports.",
  openGraph: {
    title: "Reports",
    description: "Reports page.",
  },
  keywords: ["Dashboard", "Student", "Report"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
