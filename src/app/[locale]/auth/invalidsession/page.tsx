import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invalid session",
  description: "Invalid session page.",
  openGraph: {
    title: "Invalid session",
    description: "Invalid session page.",
  },
  keywords: ["Invalid", "Session", "User", "Account"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
