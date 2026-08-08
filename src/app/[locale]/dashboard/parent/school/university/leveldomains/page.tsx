import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Level domains",
  description: "Student dashboard for level domains.",
  openGraph: {
    title: "Level domains",
    description: "Level domains page.",
  },
  keywords: ["Dashboard", "Student", "Level domain"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
