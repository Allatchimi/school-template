import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule entries management",
  description: "Admin dashboard for schedule entries management.",
  openGraph: {
    title: "Schedule entries management",
    description: "Schedule entries management page.",
  },
  keywords: [
    "Dashboard",
    "Admin",
    "Management",
    "Schedule",
    "Calendar",
    "Program",
    "Entry",
  ],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
