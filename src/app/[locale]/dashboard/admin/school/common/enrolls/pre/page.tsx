import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pre enrolls management",
  description: "Admin dashboard for pre enrolls management.",
  openGraph: {
    title: "Pre enrolls management",
    description: "Pre enrolls management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Enroll"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
