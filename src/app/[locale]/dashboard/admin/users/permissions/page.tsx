import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permissions management",
  description: "Admin dashboard for permissions management.",
  openGraph: {
    title: "Permissions management",
    description: "Permissions management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Permission"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
