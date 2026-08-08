import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parent students management",
  description: "Admin dashboard for parent students management.",
  openGraph: {
    title: "Parent students management",
    description: "Parent students management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Parent", "Student"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
