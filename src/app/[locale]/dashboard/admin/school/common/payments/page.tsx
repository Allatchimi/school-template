import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payments management",
  description: "Admin dashboard for payments management.",
  openGraph: {
    title: "Payments management",
    description: "Payments management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Payment"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
