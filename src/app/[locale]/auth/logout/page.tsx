import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logout successfully",
  description: "Logout successfully page.",
  openGraph: {
    title: "Logout successfully",
    description: "Logout successfully page.",
  },
  keywords: ["Successfully", "Logged out", "User", "Account"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
