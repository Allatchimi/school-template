import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meetings management",
  description: "Admin dashboard for meetings management.",
  openGraph: {
    title: "Meetings management",
    description: "Meetings management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Meeting"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
