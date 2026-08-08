import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report correspondences management",
  description: "Admin dashboard for report correspondences management.",
  openGraph: {
    title: "Report correspondences management",
    description: "Report correspondences management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Report", "Correspondence"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
