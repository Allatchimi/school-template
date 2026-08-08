import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication error",
  description: "Authentication error page.",
  openGraph: {
    title: "Authentication error",
    description: "Authentication error page.",
  },
  keywords: ["Authentication", "Error", "User", "Account"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
