import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Result entries management",
  description: "Admin dashboard for result entries management.",
  openGraph: {
    title: "Result entries management",
    description: "Result entries management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Result", "Entry"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
