import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manegers management",
  description: "Admin dashboard for manager management.",
  openGraph: {
    title: "Managers management",
    description: "Managers management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Manager"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
