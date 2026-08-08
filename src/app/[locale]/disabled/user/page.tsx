import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disabled user",
  description: "Disabled user page.",
  openGraph: {
    title: "Disabled user",
    description: "Disabled user page.",
  },
  keywords: ["User", "Status", "Disabled", "Error"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
