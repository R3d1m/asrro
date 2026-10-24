"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import KineticMarquee from "@/components/ui/KineticMarquee";
import AboutSection from "@/components/home/AboutSection";
import InteractiveFleetExplorer from "@/components/home/InteractiveFleetExplorer";
import AchievementsSection from "@/components/home/AchievementsSection";
import ExecutiveCommittee from "@/components/home/ExecutiveCommittee";
import MediaPress from "@/components/home/MediaPress";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const marqueeAccolades = [
    { text: "WORLD CHAMPION", badge: "NASA GSC 2025", accent: "amber" as const },
    { text: "GLOBAL SPACE CHALLENGE 2025", badge: "SCORE 499.8 / 500", accent: "amber" as const },
    { text: "FIRST SOUNDING ROCKET IN CUET", badge: "STARLAP GENESIS-I", accent: "cyan" as const },
    { text: "CHITTAGONG UNIVERSITY OF ENGINEERING & TECHNOLOGY", badge: "BANGLADESH", accent: "black" as const },
    { text: "BEST TEAM VIDEO AWARD", badge: "INTERNATIONAL", accent: "amber" as const },
    { text: "ANDROMEDA M31 ASTROMETRIC OBSERVATION", badge: "8-INCH OPTICS", accent: "cyan" as const },
  ];

  const marqueeCapabilities = [
    { text: "SUPERSONIC SOLID ROCKET PROPULSION", badge: "1,200 N THRUST", accent: "cyan" as const },
    { text: "AUTONOMOUS PLANETARY ROVER", badge: "ROCKER-BOGIE 6WD", accent: "black" as const },
    { text: "433 MHZ LORA GROUND LINK", badge: "TELEMETRY", accent: "cyan" as const },
    { text: "HIGH-CONTRAST DEEP SKY OPTICS", badge: "NEWTONIAN REFLECTOR", accent: "black" as const },
    { text: "1U CUBESAT TELEMETRY BUS", badge: "ARM CORTEX-M7", accent: "cyan" as const },
    { text: "NATIONAL ROBOTICS CHAMPIONS", badge: "1ST PLACE", accent: "amber" as const },
  ];

  return (
    <div className="relative min-h-screen bg-white text-zinc-950 flex flex-col font-sans">
      {/* 1. Global Architectural Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section featuring Centered Typography + Full-Bleed Mouse Interactive Andromeda Galaxy */}
        <HeroSection />

        {/* 3. Kinetic Marquee 1 (World Champion Accolades) */}
        <KineticMarquee items={marqueeAccolades} direction="left" />

        {/* 4. Institutional Charter, Mission & Vision with 3D Tilt Cards */}
        {/* <AboutSection /> */}

        {/* 5. Interactive Fleet Blueprint Explorer with Demo Photography & Animated Vector HUD */}
        <InteractiveFleetExplorer />

        {/* 6. Kinetic Marquee 2 (Division Capabilities) */}
        <KineticMarquee items={marqueeCapabilities} direction="right" />

        {/* 7. Global Space Challenge World Champion & Competition Accolades with Photos */}
        <AchievementsSection />

        {/* 8. ASRRO Executive Committee 2026–2027 Slider with President at Center */}
        <ExecutiveCommittee />

        {/* 9. National Media & Newspaper Press Coverage with Press Imagery */}
        <MediaPress />
      </main>

      {/* 10. Aerospace Telemetry Footer */}
      <Footer />
    </div>
  );
}
