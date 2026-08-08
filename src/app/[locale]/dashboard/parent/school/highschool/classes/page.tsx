import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classes",
  description: "Student dashboard for classes.",
  openGraph: {
    title: "Classes",
    description: "Classes page.",
  },
  keywords: ["Dashboard", "Student", "Class"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
