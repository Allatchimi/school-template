import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot password - step 2",
  description: "Forgot password - step 2 page.",
  openGraph: {
    title: "Forgot password - step 2",
    description: "Forgot password - step 2 page.",
  },
  keywords: ["Forgot", "Password", "Code", "User", "Account"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
