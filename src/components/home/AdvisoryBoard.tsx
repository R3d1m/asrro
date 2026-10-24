"use client";

import React from "react";
import { GraduationCap, ArrowUpRight } from "lucide-react";
import InteractiveCard from "../ui/InteractiveCard";
import SmartImage from "../ui/SmartImage";

export default function AdvisoryBoard() {
  const advisors = [
    {
      name: "Dr. Sajal Chandra Banik",
      title: "Professor & Senior Advisor",
      department: "Dept. of Mechanical Engineering",
      institution: "CUET",
      role: "ROBOTICS & MECHANICAL SYSTEMS",
      localImage: "/images/advisors/sajal-banik.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Dr. Muhammad Ahsan Ullah",
      title: "Professor & Faculty Advisor",
      department: "Dept. of Electrical & Electronic Engineering",
      institution: "CUET",
      role: "AVIONICS, POWER & TELEMETRY",
      localImage: "/images/advisors/ahsan-ullah.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Dr. Mahbubul Alam",
      title: "Professor & Research Guide",
      department: "Dept. of Mechanical Engineering",
      institution: "CUET",
      role: "AERODYNAMICS & PROPULSION",
      localImage: "/images/advisors/mahbubul-alam.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Dr. Yunus Ahmed",
      title: "Professor & Technical Mentor",
      department: "Department of Chemistry",
      institution: "CUET",
      role: "SOLID COMPOSITE PROPELLANTS",
      localImage: "/images/advisors/yunus-ahmed.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="advisors" className="pt-8 pb-8 sm:pt-12 sm:pb-12 px-4 sm:px-8 lg:px-12 bg-white border-b border-black scroll-mt-20">
      <div className="max-w-[90rem] mx-auto">
        {/* Centered Section Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3.5 mx-auto">
            <GraduationCap className="size-3.5 text-sky-400" />
            <span>ACADEMIC GOVERNANCE & MENTORSHIP</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase text-center">
            Faculty Advisory Board
          </h2>

          <p className="mt-3 text-zinc-600 text-xs sm:text-sm md:text-base font-sans max-w-xl mx-auto text-center leading-relaxed">
            ASRRO&apos;s sounding rocket safety protocols, autonomous robotics research, and laboratory operations are mentored by senior professors at CUET.
          </p>

          {/* <div className="mt-4 font-mono text-xs text-zinc-500 uppercase tracking-wider">
            Chittagong University of Engineering & Technology
          </div> */}

          {/* Clean Architectural Accent Divider */}
          <div className="w-16 h-0.5 bg-black mx-auto mt-5" />
        </div>

        {/* Sharp Square Cards with Rich Academic Portraits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advisors.map((adv, idx) => (
            <InteractiveCard key={idx} glowColor="cyan" className="h-full">
              <div className="flex flex-col justify-between h-full bg-white">
                {/* Professor Portrait Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-zinc-200">
                  <SmartImage
                    localSrc={adv.localImage}
                    fallbackSrc={adv.fallbackImage}
                    alt={adv.name}
                    className="size-full object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                  {/* Overlaid Role Pill */}
                  {/* <div className="absolute bottom-3 left-3 right-3 font-mono">
                    <span className="text-[10px] text-sky-300 font-bold uppercase tracking-wider block bg-black/90 px-2 py-1 border border-zinc-700">
                      {adv.role}
                    </span>
                  </div> */}
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-heading text-xl font-black text-black uppercase leading-snug">
                      {adv.name}
                    </h3>
                    <span className="text-xs font-mono text-sky-700 font-bold block mt-1">
                      {adv.title}
                    </span>
                    <span className="text-xs text-zinc-600 font-sans block mt-0.5">
                      {adv.department}
                    </span>
                    <span className="text-xs text-zinc-600 font-sans block mt-0.5">
                      Chittagong University of Engineering & Technology
                    </span>
                  </div>

                  {/* <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                    <span>{adv.institution}</span>
                    <span className="text-black font-bold uppercase flex items-center gap-1 group-hover:text-sky-600 transition-colors">
                      Profile <ArrowUpRight className="size-3" />
                    </span>
                  </div> */}
                </div>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </section>
  );
}
