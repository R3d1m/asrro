import type { Metadata } from "next";
import AlumniDashboardClient from "@/components/alumni/AlumniDashboardClient";

export const metadata: Metadata = {
  title: "Alumni Dashboard | ASRRO CUET",
  description: "Alumni profile editor and research network dashboard.",
};

export default function AlumniDashboardPage() {
  return <AlumniDashboardClient />;
}
