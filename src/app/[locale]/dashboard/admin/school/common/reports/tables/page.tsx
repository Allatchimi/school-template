import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report tables management",
  description: "Admin dashboard for report tables management.",
  openGraph: {
    title: "Report tables management",
    description: "Report tables management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Report", "Table"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
