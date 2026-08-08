import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report averages management",
  description: "Admin dashboard for report averages management.",
  openGraph: {
    title: "Report averages management",
    description: "Report averages management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Report", "Average"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
