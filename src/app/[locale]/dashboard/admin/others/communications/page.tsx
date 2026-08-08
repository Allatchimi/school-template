import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Communications management",
  description: "Communications management page.",
  openGraph: {
    title: "Communications management",
    description: "Communications management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Communication"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
