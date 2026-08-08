import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schools management",
  description: "Admin dashboard for schools management.",
  openGraph: {
    title: "Schools management",
    description: "Schools management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "School"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
