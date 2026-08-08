import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classes",
  description: "Teacher dashboard for classes.",
  openGraph: {
    title: "Classes",
    description: "Classes page.",
  },
  keywords: ["Dashboard", "Teacher", "Class"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
