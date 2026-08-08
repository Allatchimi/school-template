import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report entries management",
  description: "Admin dashboard for report entries management.",
  openGraph: {
    title: "Report entries management",
    description: "Report entries management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Report", "Entry"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
