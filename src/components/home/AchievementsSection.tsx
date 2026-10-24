"use client";

import React from "react";
import { Trophy, Award, CheckCircle2, ArrowUpRight } from "lucide-react";
import InteractiveCard from "../ui/InteractiveCard";
import SmartImage from "../ui/SmartImage";

export default function AchievementsSection() {
  const achievements = [
    {
      year: "2025",
      badge: "WORLD CHAMPION",
      title: "Global Space Challenge 2025",
      organizer: "Under the Patronage of NASA",
      score: "499.8 / 500",
      featured: true,
      localImage: "/images/achievements/nasa-world-champion.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1000&q=80",
      details: "Team ASRRO emerged as Global Champions, outperforming premier university aerospace teams worldwide with near-perfect technical scores and the prestigious 'Best Team Video' award.",
    },
    {
      year: "2024–25",
      badge: "HISTORIC MILESTONE",
      title: "STARLAP Sounding Rocket Genesis-I",
      organizer: "Chittagong University of Engineering & Technology",
      score: "Level-1 Suborbital",
      localImage: "/images/achievements/starlap-launch.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1000&q=80",
      details: "Engineered and static-fire tested CUET's first student-built solid rocket motor, custom avionics telemetry board, and dual parachute recovery mechanism.",
    },
    {
      year: "2024",
      badge: "NATIONAL CHAMPION",
      title: "National Autonomous Robotics Championship",
      organizer: "Bangladesh Innovation & Robotics Forum",
      score: "1st Place",
      localImage: "/images/achievements/robotics-champion.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
      details: "Champion in autonomous obstacle navigation and line-maze solving with custom micro-controller architecture and sub-millisecond PID tuning.",
    },
    {
      year: "2023",
      badge: "BEST STEM INNOVATION",
      title: "National Space Science Festival",
      organizer: "Youth Space Society of Bangladesh",
      score: "Top Honor",
      localImage: "/images/achievements/optics-award.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1000&q=80",
      details: "Honored for the handcrafted 8-inch Newtonian deep-sky optical telescope and astronomical public outreach sessions across Chattogram Division.",
    },
  ];

  return (
    <section id="achievements" className="pt-8 pb-8 sm:pt-12 sm:pb-12 px-4 sm:px-8 lg:px-12 bg-white border-b border-black scroll-mt-20">
      <div className="max-w-[90rem] mx-auto">
        {/* Centered Section Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-black font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3.5 mx-auto">
            <Trophy className="size-3.5 text-black" />
            <span>INTERNATIONAL EXCELLENCE</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase text-center">
            Proof Of Global Laurels
          </h2>

          <p className="mt-3 text-zinc-600 text-xs sm:text-sm md:text-base font-sans max-w-xl mx-auto text-center leading-relaxed">
            Demonstrated engineering validation on the world stage, competing against leading international aerospace and robotics universities.
          </p>

          {/* <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-zinc-600 bg-zinc-100 px-3 py-1 border border-zinc-300 mx-auto">
            <span className="size-2 bg-amber-500 animate-pulse" />
            <span className="font-bold text-black">WORLD CHAMPION 2025 // RECORD SCORE 499.8/500</span>
          </div> */}

          {/* Clean Architectural Accent Divider */}
          <div className="w-16 h-0.5 bg-black mx-auto mt-5" />
        </div>

        {/* Sharp Square Cards with Rich Demo Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((item, idx) => (
            <InteractiveCard
              key={idx}
              glowColor={item.featured ? "amber" : "cyan"}
              className="h-full"
            >
              <div className="flex flex-col h-full bg-white">
                {/* Demo Image Showcase Frame */}
                <div className="relative h-60 w-full overflow-hidden border-b border-zinc-200">
                  <SmartImage
                    localSrc={item.localImage}
                    fallbackSrc={item.fallbackImage}
                    alt={item.title}
                    className="size-full object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Overlaid Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className={`font-mono text-xs font-black uppercase px-2.5 py-1 ${
                      item.featured ? "bg-amber-500 text-black" : "bg-black text-white"
                    }`}>
                      {item.badge}
                    </span>
                    <span className="font-mono text-xs text-white bg-black/80 px-2 py-1">
                      {item.year}
                    </span>
                  </div>

                  {item.score && (
                    <div className="absolute bottom-4 left-4 font-mono">
                      <span className="text-[10px] text-zinc-300 uppercase tracking-widest block">SCORE RECORD</span>
                      <span className="text-xl font-black text-white">{item.score}</span>
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-heading text-2xl font-black text-black uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs text-sky-700 font-bold uppercase mt-1">
                      {item.organizer}
                    </p>
                    <p className="mt-4 text-sm text-zinc-600 leading-relaxed font-sans">
                      {item.details}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-500">OFFICIAL ARCHIVE</span>
                    <span className="font-bold text-black group-hover:text-sky-600 flex items-center gap-1 transition-colors">
                      Verification Link <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </section>
  );
}
