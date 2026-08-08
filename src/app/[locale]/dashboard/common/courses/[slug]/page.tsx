import { MotionPageTransitionFromBottom } from "@/components/motion/motion-page";
import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course details",
  description: "Course details page.",
  openGraph: {
    title: "Course details",
    description: "Course details page.",
  },
  keywords: ["Course", "Details"],
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <MotionPageTransitionFromBottom>
      <PageContent slug={slug} />
    </MotionPageTransitionFromBottom>
  );
}
