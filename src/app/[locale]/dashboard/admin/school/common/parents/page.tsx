import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parents management",
  description: "Admin dashboard for parents management.",
  openGraph: {
    title: "Parents management",
    description: "Parents management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Parent"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
