import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Level domains management",
  description: "Admin dashboard for level domains management.",
  openGraph: {
    title: "Level domains management",
    description: "Level domains management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Level domain"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
