import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Class subjects management",
  description: "Admin dashboard for class subjects management.",
  openGraph: {
    title: "Subjects management",
    description: "Subjects management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Class subjects"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
