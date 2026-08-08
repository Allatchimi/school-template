import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Units management",
  description: "Admin dashboard for units management.",
  openGraph: {
    title: "Units management",
    description: "Units management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Unit"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
