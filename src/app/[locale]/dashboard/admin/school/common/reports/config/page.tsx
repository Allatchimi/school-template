import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report config management",
  description: "Admin dashboard for report config management.",
  openGraph: {
    title: "Report config management",
    description: "Report config management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Report", "Config"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
