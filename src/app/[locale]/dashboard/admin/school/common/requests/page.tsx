import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Requests management",
  description: "Admin dashboard for requests management.",
  openGraph: {
    title: "Requests management",
    description: "Requests management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Request"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
