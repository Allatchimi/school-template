import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teachers management",
  description: "Admin dashboard for teachers management.",
  openGraph: {
    title: "Teachers management",
    description: "Teachers management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Teacher"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
