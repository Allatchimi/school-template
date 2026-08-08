import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule weekly view",
  description: "Admin dashboard for schedule weekly view",
  openGraph: {
    title: "Schedule weekly view management",
    description: "Schedule weekly view management page.",
  },
  keywords: [
    "Dashboard",
    "Admin",
    "Management",
    "Schedule",
    "Calendar",
    "Program",
    "Weekly",
    "View",
  ],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
