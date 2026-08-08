import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disabled school",
  description: "Disabled school page.",
  openGraph: {
    title: "Disabled school",
    description: "Disabled school page.",
  },
  keywords: ["School", "Status", "Disabled", "Error"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
