"use client";

import React from "react";
import { Flag, Eye, ArrowUpRight, Compass } from "lucide-react";
import InteractiveCard from "../ui/InteractiveCard";

export default function AboutSection() {
  return (
    <section id="about" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32 border-b border-black bg-zinc-50">
      <div className="mx-auto max-w-[90rem]">
        {/* Top Kicker */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-600 mb-6">
          <Compass className="size-4 text-sky-600" />
          <span>INSTITUTIONAL CHARTER // CUET</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
          {/* Main Narrative Card */}
          <InteractiveCard glowColor="cyan" className="h-full">
            <div className="p-8 sm:p-12 flex flex-col justify-between size-full">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-sky-700 font-bold block mb-4">
                  01 // RESEARCH PHILOSOPHY
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight uppercase">
                  Research Becomes Credible When Curiosity Meets Engineering Rigor.
                </h2>
                <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-700 font-sans">
                  ASRRO is Chittagong University of Engineering & Technology&apos;s flagship aerospace and robotics society. 
                  Our researchers build, document, static-fire test, and launch frontier systems—translating aerospace theory into indigenous hardware reality.
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-zinc-200 flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-500 uppercase">ESTABLISHED AT CUET · CHATTOGRAM</span>
                <a
                  href="/about"
                  className="inline-flex items-center gap-1.5 font-bold uppercase text-black hover:text-sky-600 transition-colors"
                >
                  <span>Read Full Charter</span>
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </InteractiveCard>

          {/* Mission Card (Sharp Square) */}
          <InteractiveCard glowColor="monochrome" className="h-full">
            <div className="p-8 sm:p-10 flex flex-col justify-between size-full bg-white">
              <div>
                <div className="size-12 bg-black text-white flex items-center justify-center mb-6">
                  <Flag className="size-6 text-sky-400" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold block">
                  02 // MISSION STATEMENT
                </span>
                <h3 className="mt-3 font-heading text-2xl font-black text-black leading-snug uppercase">
                  Equip Bangladeshi Students To Build Scalable Space Hardware.
                </h3>
              </div>
              <p className="mt-6 text-sm text-zinc-600 font-sans leading-relaxed">
                Providing university engineers with practical, hands-on rocketry, telemetry avionics, robotics, and machine intelligence projects.
              </p>
            </div>
          </InteractiveCard>

          {/* Vision Card (Sharp Square with Amber Accent) */}
          <InteractiveCard glowColor="amber" className="h-full">
            <div className="p-8 sm:p-10 flex flex-col justify-between size-full bg-white border-l-4 border-l-amber-500">
              <div>
                <div className="size-12 bg-amber-50 border border-amber-300 text-amber-900 flex items-center justify-center mb-6">
                  <Eye className="size-6 text-amber-700" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-amber-800 font-bold block">
                  03 // FUTURE HORIZON
                </span>
                <h3 className="mt-3 font-heading text-2xl font-black text-black leading-snug uppercase">
                  Position CUET At The Forefront Of Global Aerospace Exploration.
                </h3>
              </div>
              <p className="mt-6 text-sm text-zinc-600 font-sans leading-relaxed">
                Pioneering suborbital launches, lunar rover mobility, and autonomous robotics platforms that inspire the next generation of engineers across Bangladesh.
              </p>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
}
