import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activate account",
  description: "Activate account page.",
  openGraph: {
    title: "Activate account",
    description: "Activate account page.",
  },
  keywords: ["Activate", "Account", "User"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
