import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MembershipForm from "@/components/membership/MembershipForm";

export const metadata: Metadata = {
  title: "Join the Fleet | ASRRO CUET Recruitment",
  description: "Apply to become a student researcher in sounding rocketry, autonomous UAVs, rovers, and astrophotography with ASRRO at CUET.",
};

export default function JoinPage() {
  return (
    <div className="relative min-h-screen bg-[#030712] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <MembershipForm />
      </main>
      <Footer />
    </div>
  );
}
