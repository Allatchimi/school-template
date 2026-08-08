import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activate account success",
  description: "Activate account success page.",
  openGraph: {
    title: "Activate account success",
    description: "Activate account success page.",
  },
  keywords: ["Activate", "Account", "Success", "User"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
