import type { Metadata } from "next";
import AlumniDashboardClient from "@/components/alumni/AlumniDashboardClient";

export const metadata: Metadata = {
  title: "Alumni Access | ASRRO CUET",
  description: "Sign in or register to update your alumni research profile.",
};

export default function AlumniLoginPage() {
  return <AlumniDashboardClient />;
}
