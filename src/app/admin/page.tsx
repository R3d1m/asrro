import type { Metadata } from "next";
import AdminPortalClient from "@/components/admin/AdminPortalClient";

export const metadata: Metadata = {
  title: "Committee Terminal | ASRRO CUET",
  description: "Executive Committee management terminal for recruitment admissions, press releases, and events.",
};

export default function AdminPage() {
  return <AdminPortalClient />;
}
