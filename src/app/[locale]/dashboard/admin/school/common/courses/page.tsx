import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses management",
  description: "Admin dashboard for courses management.",
  openGraph: {
    title: "Courses management",
    description: "Courses management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Course"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
