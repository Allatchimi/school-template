import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classes management",
  description: "Admin dashboard for classes management.",
  openGraph: {
    title: "Classes management",
    description: "Classes management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Class"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
