import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AlumniDirectoryClient from "@/components/alumni/AlumniDirectoryClient";

export const metadata: Metadata = {
  title: "Distinguished Alumni | ASRRO CUET",
  description: "Explore the distinguished alumni of Andromeda Space and Robotics Research Organization (ASRRO) across leading global universities and high-tech industries.",
};

export default function AlumniPage() {
  return (
    <div className="relative min-h-screen bg-[#030712] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <AlumniDirectoryClient />
      </main>
      <Footer />
    </div>
  );
}
