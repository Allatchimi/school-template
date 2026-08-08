import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report grades management",
  description: "Admin dashboard for report grades management.",
  openGraph: {
    title: "Report grades management",
    description: "Report grades management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Report", "Grade"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
