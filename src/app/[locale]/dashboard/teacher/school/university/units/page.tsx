import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Units",
  description: "Teacher dashboard for units.",
  openGraph: {
    title: "Units",
    description: "Units page.",
  },
  keywords: ["Dashboard", "Teacher", "Unit"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
