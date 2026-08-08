import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enrolls management",
  description: "Admin dashboard for enrolls management.",
  openGraph: {
    title: "Enrolls management",
    description: "Enrolls management page.",
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
