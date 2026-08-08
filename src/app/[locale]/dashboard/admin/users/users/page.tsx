import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users management",
  description: "Admin dashboard for users management.",
  openGraph: {
    title: "Users management",
    description: "Users management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "User"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
