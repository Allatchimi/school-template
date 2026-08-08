import { MotionPageTransitionFromTop } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help",
  description: "Help page.",
  openGraph: {
    title: "Help",
    description: "Help page.",
  },
  keywords: [
    "Help",
    "Support",
    "FAQ",
    "Contact",
    "About",
    "Terms",
    "Privacy",
    "Get started",
    "Enroll",
    "Register",
  ],
};

export default function Page() {
  return (
    <MotionPageTransitionFromTop>
      <PageContent />
    </MotionPageTransitionFromTop>
  );
}
