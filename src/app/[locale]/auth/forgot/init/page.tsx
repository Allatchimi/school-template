import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot password - step 1",
  description: "Forgot password - step 1 page.",
  openGraph: {
    title: "Forgot password - step 1",
    description: "Forgot password - step 1 page.",
  },
  keywords: ["Forgot", "Password", "User", "Account"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
