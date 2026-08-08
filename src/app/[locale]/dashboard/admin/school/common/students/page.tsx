import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Students management",
  description: "Admin dashboard for students management.",
  openGraph: {
    title: "Students management",
    description: "Students management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Student"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
