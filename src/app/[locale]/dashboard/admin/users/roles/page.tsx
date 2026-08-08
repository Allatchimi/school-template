import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roles management",
  description: "Admin dashboard for roles management.",
  openGraph: {
    title: "Roles management",
    description: "Roles management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Role"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
