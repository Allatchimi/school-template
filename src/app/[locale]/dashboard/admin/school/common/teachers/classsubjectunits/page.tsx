import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teacher class subjects/units management",
  openGraph: {
    title: "Teacher class subjects/units management",
    description: "Teacher class subjects/units management page.",
  },
  description: "Admin dashboard for Teacher class subjects/units management.",
  keywords: [
    "Dashboard",
    "Admin",
    "Management",
    "Teacher",
    "Class",
    "Subject",
    "Unit",
  ],
};

export default function Page() {
  return (
    <MotionPageTransitionFromBottom>
      <PageContent />
    </MotionPageTransitionFromBottom>
  );
}
