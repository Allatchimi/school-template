import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Years management",
  description: "Admin dashboard for years management.",
  openGraph: {
    title: "Years management",
    description: "Years management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Year"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
