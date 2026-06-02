import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luca Joos | CV",
  robots: "noindex, nofollow",
};

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}