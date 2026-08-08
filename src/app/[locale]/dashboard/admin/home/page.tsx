import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistics",
  description: "Admin statistics page.",
  openGraph: {
    title: "Statistics",
    description: "Admin statistics page.",
  },
  keywords: ["Dashboard", "Admin", "Monitoring", "Statistic"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
