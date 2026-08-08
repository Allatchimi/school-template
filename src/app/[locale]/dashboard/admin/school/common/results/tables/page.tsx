import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Result tables management",
  description: "Admin dashboard for result tables management.",
  openGraph: {
    title: "Result tables management",
    description: "Result tables management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Result", "Table"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
