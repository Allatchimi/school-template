import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot password success",
  description: "Forgot password success page.",
  openGraph: {
    title: "Forgot password success",
    description: "Forgot password success page.",
  },
  keywords: ["Forgot", "Password", "Success", "User", "Account"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
