import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacts management",
  description: "Admin dashboard for contacts management.",
  openGraph: {
    title: "Contacts management",
    description: "Contacts management page.",
  },
  keywords: ["Dashboard", "Admin", "Management", "Contact"],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
