import PageContent from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_WEBSITE_TITLE,
  description: process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION,
  openGraph: {
    title: process.env.NEXT_PUBLIC_WEBSITE_TITLE,
    description: process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION,
  },
  keywords: [
    process.env.NEXT_PUBLIC_APP_NAME || "",
    process.env.NEXT_PUBLIC_WEBSITE_TITLE || "",
    "School management",
    "Teacher",
    "Student",
    "Parent",
    "Enroll",
    "Dashboard",
    "Home",
    "Gestion scolaire",
    "Enseignant",
    "Etudiant",
    "Parent",
    "Inscription",
    "Dashboard",
    "Accueil",
  ],
};

export default function Page() {
  return <PageContent />;
}
