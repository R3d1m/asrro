"use client";

import React from "react";
import AndromedaVideoBackground from "../galaxy/AndromedaVideoBackground";
import { Trophy, ArrowRight, ArrowUpRight, Compass, Radio } from "lucide-react";

export default function HeroSection() {
  const stats = [
    { value: "5+", label: "Projects", sub: "Currently ongoing" },
    { value: "500+", label: "Members", sub: "Across 12 departments" },
    { value: "1ST", label: "IN Bangladesh", sub: "Hybrid Rocketry" },
    { value: "12+", label: "LAURELS", sub: "National & Global" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#030712] text-white pt-20 pb-8 sm:pt-22 sm:pb-10 select-none border-b border-black">
      {/* 1. Zoomed-Out Infinite Andromeda Video Background */}
      <AndromedaVideoBackground />

      {/* Subtle Technical Grid Lines */}
      <div className="pointer-events-none absolute inset-0 technical-grid opacity-15" />

      {/* 2. Main Centered Typography Content (Galaxy Core Uncovered) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto py-2 sm:py-4">
        {/* Monumental Centered Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-[5.5rem] font-black tracking-[-0.04em] uppercase leading-[0.92] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
          <span className="block">ENGINEERED FOR</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 drop-shadow-[0_8px_35px_rgba(245,158,11,0.5)] mt-1">
            THE UNIVERSE.
          </span>
        </h1>

        {/* Central Gap for Unobstructed Galaxy Nucleus + Lowered Paragraph with Sleek Glass Effect */}
        <div className="mt-14 sm:mt-20 lg:mt-24 max-w-2xl mx-auto">
          <div className="px-6 py-3.5 sm:py-4 bg-black/55 backdrop-blur-md-5 border border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <p className="text-xs sm:text-sm md:text-base text-zinc-100 font-sans leading-relaxed font-normal">
              Andromeda Space and Robotics Research Organization (ASRRO) designs, builds, and launches Bangladesh&apos;s first student-built sounding rockets, autonomous planetary exploration rovers, and deep-space instrumentation at CUET.
            </p>
          </div>
        </div>

        {/* Centered Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 font-mono text-xs uppercase tracking-wider">
          <a
            href="#fleet"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(245,158,11,0.45)]"
          >
            <span>Join Asrro</span>
            <ArrowRight className="size-4" />
          </a>

          <a
            href="mailto:asrro@cuet.ac.bd"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-black/40 hover:bg-black/80 text-white border border-white/30 hover:border-white transition-all backdrop-blur-xs"
          >
            <span>Connect & Collab</span>
            <ArrowUpRight className="size-3.5 text-zinc-400" />
          </a>
        </div>
      </div>

      {/* 3. Bottom Centered Stats Strip with Large Watermark (Matching Screenshot) */}
      <div className="relative z-10 w-full pt-4 pb-2">
        {/* Giant Background Watermark Text */}
        <div className="pointer-events-none absolute -bottom-3 inset-x-0 overflow-hidden flex items-center justify-center opacity-10 select-none">
          <span className="font-heading font-black text-5xl sm:text-7xl lg:text-[9.5rem] tracking-widest text-zinc-500 uppercase whitespace-nowrap">
            ASRRO // CUET
          </span>
        </div>

        {/* 4 Centered Metrics Row - Crisp & Transparent so Galaxy Swirls Through */}
        <div className="relative max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="py-3 px-2 border-t border-b border-white/10 hover:border-amber-500/40 transition-colors"
            >
              <span className="block font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400 tracking-tight drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]">
                {item.value}
              </span>
              <span className="block text-[11px] font-bold text-white uppercase tracking-widest mt-1.5 [text-shadow:_0_1px_4px_rgba(0,0,0,1)]">
                {item.label}
              </span>
              <span className="block text-[10px] text-zinc-300 font-sans mt-0.5 [text-shadow:_0_1px_4px_rgba(0,0,0,1)]">
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
