import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directors management",
  description: "Admin dashboard for directors management.",
  openGraph: {
    title: "Directors management",
    description: "Directors management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Director"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
