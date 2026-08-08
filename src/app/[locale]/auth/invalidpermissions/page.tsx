import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invalid permissions",
  description: "Invalid permissions page.",
  openGraph: {
    title: "Invalid permissions",
    description: "Invalid permissions page.",
  },
  keywords: ["Invalid", "Permissions", "User", "Account"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
