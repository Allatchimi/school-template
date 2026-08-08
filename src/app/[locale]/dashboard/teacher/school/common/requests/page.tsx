import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Requests",
  description: "Teacher dashboard for requests.",
  openGraph: {
    title: "Requests",
    description: "Requests page.",
  },
  keywords: ["Dashboard", "Teacher", "Request"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
