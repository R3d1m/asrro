"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Layers, 
  Activity, 
  CheckCircle2, 
  Cpu, 
  Rocket, 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  Play, 
  Maximize2, 
  X,
  Compass,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { ProjectData, allProjectsList, GalleryItem } from "@/data/projectsData";
import SmartImage from "@/components/ui/SmartImage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface ProjectDetailClientProps {
  project: ProjectData;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMedia(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Determine Previous and Next project for seamless cycling
  const currentIndex = allProjectsList.findIndex((p) => p.slug === project.slug);
  const prevProject = allProjectsList[(currentIndex - 1 + allProjectsList.length) % allProjectsList.length];
  const nextProject = allProjectsList[(currentIndex + 1) % allProjectsList.length];

  return (
    <div className="relative min-h-screen bg-white text-zinc-950 flex flex-col font-sans">
      {/* 1. Global Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Sticky Telemetry Breadcrumb Bar */}
        <section className="bg-zinc-950 text-white border-b border-zinc-800 py-3 px-4 sm:px-8 sticky top-16 sm:top-20 z-30 backdrop-blur-md bg-opacity-95">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <Link 
                href="/#fleet" 
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="size-3.5" />
                <span>FLEET EXPLORER</span>
              </Link>
              <span className="text-zinc-600">/</span>
              <span className="text-amber-400 font-bold uppercase">{project.code}</span>
              <span className="text-zinc-600 hidden sm:inline">/</span>
              <span className="text-zinc-300 hidden sm:inline truncate max-w-[200px] md:max-w-none">
                {project.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-zinc-900 border border-zinc-700 text-sky-400 text-[11px] font-bold">
                <Activity className="size-3 animate-pulse" />
                <span>{project.status}</span>
              </span>

              <a
                href={project.subdomain.startsWith("http") ? project.subdomain : `https://${project.subdomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 bg-white text-black hover:bg-amber-400 transition-colors text-[11px] font-bold uppercase"
              >
                <span>Live Portal</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </section>

        {/* 3. Monumental Hero Section */}
        <section className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#030712] border-b-2 border-black">
          {/* Hero Background Photography with Calibrated Scrim */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <SmartImage
              localSrc={project.heroImage}
              fallbackSrc="https://images.unsplash.com/photo-1517976487504-59a1a08420e7?auto=format&fit=crop&w=1600&q=80"
              alt={project.title}
              className="size-full object-cover object-center scale-105 filter brightness-95"
            />
            {/* Calibrated Dark Scrim */}
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
            <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
          </div>

          {/* Centered Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-black/90 text-white font-mono text-[11px] sm:text-xs uppercase tracking-widest border border-zinc-700 backdrop-blur-md mb-4 mx-auto">
              <Layers className="size-3.5 text-sky-400" />
              <span className="text-amber-400 font-bold">{project.category}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">{project.code}</span>
            </div>

            {/* Monumental Heading */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight drop-shadow-2xl text-center leading-none">
              {project.title}
            </h1>

            {/* Subtitle / Full Name */}
            <p className="mt-4 text-sm sm:text-lg md:text-xl text-zinc-200 font-sans max-w-3xl mx-auto font-medium drop-shadow-md text-center">
              {project.fullTitle}
            </p>

            {/* High-Level Summary */}
            <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-300 font-sans max-w-2xl mx-auto leading-relaxed drop-shadow text-center">
              {project.summary}
            </p>

            {/* Key Telemetry Specs Strip */}
            <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 max-w-4xl mx-auto">
              {project.specs.map((item, idx) => (
                <div key={idx} className="p-2.5 sm:p-3 bg-black/75 border border-white/15 backdrop-blur-md text-center">
                  <span className="text-[10px] uppercase text-zinc-400 block font-mono font-semibold truncate">
                    {item.label}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-white block mt-0.5 font-mono truncate">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Project Overview & Core Objectives */}
        <section className="py-14 sm:py-20 px-4 sm:px-8 lg:px-12 bg-zinc-50 border-b border-black">
          <div className="max-w-6xl mx-auto">
            {/* Centered Section Header */}
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3.5 mx-auto">
                <Compass className="size-3.5 text-sky-400" />
                <span>MISSION MANDATE & SCOPE</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-black text-black tracking-tight uppercase text-center">
                Mission Overview
              </h2>
              <div className="w-16 h-0.5 bg-black mx-auto mt-4" />
            </div>

            {/* 2-Column Content Grid: Narrative on Left, Objectives on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column: Context Narrative */}
              <div className="space-y-4 bg-white p-6 sm:p-8 border-2 border-black shadow-sm">
                <div className="flex items-center gap-2 font-mono text-xs text-sky-600 font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="size-4" />
                  <span>RESEARCH ARCHITECTURE</span>
                </div>
                {project.overview.map((paragraph, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-zinc-700 leading-relaxed font-sans">
                    {paragraph}
                  </p>
                ))}

                {project.architecture && (
                  <div className="mt-6 pt-6 border-t border-zinc-200">
                    <h4 className="font-mono text-xs uppercase font-bold text-black tracking-wider mb-3">
                      // SYSTEM SUBSYSTEM BREAKDOWN
                    </h4>
                    <div className="space-y-3 font-mono text-xs">
                      {project.architecture.map((arch, aIdx) => (
                        <div key={aIdx} className="bg-zinc-50 p-3 border border-zinc-200">
                          <span className="font-bold text-zinc-900 block mb-1">
                            {arch.title}
                          </span>
                          <div className="flex flex-wrap gap-1.5 text-zinc-600 text-[11px]">
                            {arch.items.map((subItem, sIdx) => (
                              <span key={sIdx} className="px-2 py-0.5 bg-white border border-zinc-200">
                                {subItem}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Strategic Objectives */}
              <div className="bg-black text-white p-6 sm:p-8 border-2 border-black">
                <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold uppercase tracking-widest mb-4">
                  <CheckCircle2 className="size-4 text-amber-400" />
                  <span>PRIMARY RESEARCH OBJECTIVES</span>
                </div>
                
                <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-6">
                  Key Engineering Milestones
                </h3>

                <ul className="space-y-4">
                  {project.objectives.map((obj, oIdx) => (
                    <li key={oIdx} className="flex items-start gap-3">
                      <span className="size-6 bg-zinc-800 border border-zinc-700 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        0{oIdx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                        {obj}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>STANDARD: MIL-STD / CUET R&D</span>
                  <span className="text-sky-400">ACTIVE DEPLOYMENT</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Subteams Section (Focused on Subteams, Pictures Must, No Member Names) */}
        <section className="py-14 sm:py-20 px-4 sm:px-8 lg:px-12 bg-white border-b border-black">
          <div className="max-w-7xl mx-auto">
            {/* Centered Section Header */}
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3.5 mx-auto">
                <Users className="size-3.5 text-sky-400" />
                <span>PROJECT SUBDIVISIONS & TECHNICAL ROSTER</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase text-center">
                Subteams & Engineering Wings
              </h2>
              <p className="mt-3 text-zinc-600 text-xs sm:text-sm md:text-base font-sans max-w-xl mx-auto text-center leading-relaxed">
                Autonomous specialized divisions responsible for mechanical synthesis, computational vision, avionics firmware, and operational validation.
              </p>
              <div className="w-16 h-0.5 bg-black mx-auto mt-5" />
            </div>

            {/* Subteam Cards Grid with Rich Pictures */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {project.subteams.map((subteam) => (
                <div 
                  key={subteam.id}
                  className="group bg-white border-2 border-black flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Top Photo Frame */}
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-zinc-900 border-b-2 border-black">
                    <SmartImage
                      localSrc={subteam.image}
                      fallbackSrc={project.heroImage}
                      alt={subteam.name}
                      className="size-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    
                    {/* Floating Subsystem Code */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 bg-black/90 border border-zinc-700 text-white font-mono text-[11px] font-bold backdrop-blur-md">
                        {subteam.code}
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <h3 className="font-heading text-lg sm:text-xl font-black uppercase text-white tracking-tight drop-shadow-md">
                        {subteam.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Functional Description */}
                      <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed mb-5">
                        {subteam.description}
                      </p>

                      {/* Key Engineering Deliverables */}
                      <div className="mb-5">
                        <span className="font-mono text-[10px] uppercase font-bold text-zinc-500 tracking-wider block mb-2">
                          // CORE FOCUS & RESPONSIBILITIES
                        </span>
                        <ul className="space-y-1.5 font-sans text-xs text-zinc-800">
                          {subteam.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <span className="size-1.5 bg-black rounded-full mt-1.5 shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Technology Stack Tags */}
                    <div className="pt-4 border-t border-zinc-200">
                      <span className="font-mono text-[9px] uppercase font-bold text-zinc-400 tracking-wider block mb-2">
                        TOOLSTACK & TECHNOLOGIES
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {subteam.techStack.map((tech, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="px-2 py-0.5 bg-zinc-100 border border-zinc-300 text-zinc-800 font-mono text-[10px] font-semibold uppercase"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Project Media & Video Gallery (Varied Sizes & Visually Beautiful) */}
        <section className="py-14 sm:py-20 px-4 sm:px-8 lg:px-12 bg-zinc-950 text-white border-b border-black">
          <div className="max-w-7xl mx-auto">
            {/* Centered Section Header */}
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-black font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3.5 mx-auto">
                <Play className="size-3.5 text-black" />
                <span>MULTIMEDIA RESEARCH LOGS</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase text-center">
                Project Gallery
              </h2>
              <p className="mt-3 text-zinc-400 text-xs sm:text-sm md:text-base font-sans max-w-xl mx-auto text-center leading-relaxed">
                Field launch captures, laboratory cleanroom validation, CAD blueprints, and dynamic telemetry video streams.
              </p>
              <div className="w-16 h-0.5 bg-amber-400 mx-auto mt-5" />
            </div>

            {/* Asymmetric / Dynamic Masonry Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px] sm:auto-rows-[320px]">
              {project.gallery.map((item) => {
                const isWide = item.aspect === "wide" || item.aspect === "panoramic";
                const isTall = item.aspect === "tall";

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveMedia(item)}
                    className={`group relative overflow-hidden border-2 border-zinc-800 bg-zinc-900 cursor-pointer transition-all duration-500 hover:border-amber-400 hover:shadow-2xl ${
                      isWide ? "md:col-span-2" : isTall ? "row-span-2" : "col-span-1"
                    }`}
                  >
                    {item.type === "video" ? (
                      <div className="relative size-full overflow-hidden bg-black">
                        <video
                          src={item.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="size-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute top-3 right-3 z-10 p-2 bg-black/80 text-amber-400 border border-zinc-700 rounded-full">
                          <Play className="size-4 fill-current" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative size-full overflow-hidden bg-black">
                        <SmartImage
                          localSrc={item.src}
                          fallbackSrc={project.heroImage}
                          alt={item.title}
                          className="size-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                        <div className="absolute top-3 right-3 z-10 p-2 bg-black/70 text-white border border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="size-3.5" />
                        </div>
                      </div>
                    )}

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 bg-amber-400 text-black font-mono text-[9px] font-black uppercase">
                          {item.category}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-400 uppercase">
                          {item.type === "video" ? "VIDEO FEED" : "STILL LOG"}
                        </span>
                      </div>
                      
                      <h4 className="font-heading text-base sm:text-lg font-black uppercase text-white tracking-tight drop-shadow">
                        {item.title}
                      </h4>
                      
                      <p className="text-xs text-zinc-300 font-sans line-clamp-2 mt-1 drop-shadow-sm">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. Team Member Names Section (At the End, Cleanly Grouped) */}
        <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-white border-b-2 border-black">
          <div className="max-w-6xl mx-auto">
            {/* Centered Section Header */}
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3.5 mx-auto">
                <GraduationCap className="size-3.5 text-sky-400" />
                <span>PROJECT PERSONNEL & RESEARCH ROSTER</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase text-center">
                Team Members & Leadership
              </h2>
              <p className="mt-3 text-zinc-600 text-xs sm:text-sm md:text-base font-sans max-w-xl mx-auto text-center leading-relaxed">
                The engineers, researchers, student leads, and faculty advisors behind the {project.title} initiative.
              </p>
              <div className="w-16 h-0.5 bg-black mx-auto mt-5" />
            </div>

            <div className="space-y-12">
              {/* Project Leadership Grid */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-black mb-4 flex items-center gap-2">
                  <span className="size-2 bg-amber-500" />
                  <span>// PROJECT LEADERSHIP & MANAGEMENT</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {project.team.leadership.map((lead, idx) => (
                    <div key={idx} className="p-4 sm:p-5 bg-zinc-50 border-2 border-black">
                      <span className="font-mono text-[10px] uppercase text-zinc-500 block font-bold">
                        {lead.role}
                      </span>
                      <span className="font-heading text-base sm:text-lg font-black text-black uppercase block mt-1">
                        {lead.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subteam Leads (If Specified) */}
              {project.team.subteamLeads && project.team.subteamLeads.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-black mb-4 flex items-center gap-2">
                    <span className="size-2 bg-black" />
                    <span>// DIVISION TECHNICAL LEADS</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.team.subteamLeads.map((group, idx) => (
                      <div key={idx} className="p-5 border-2 border-black bg-white">
                        <span className="font-mono text-xs uppercase font-black text-sky-700 block mb-1">
                          {group.area}
                        </span>
                        <div className="font-heading text-base font-black text-black uppercase">
                          Lead: {group.lead}
                        </div>
                        {group.coLeads && group.coLeads.length > 0 && (
                          <div className="font-mono text-xs text-zinc-600 mt-1">
                            Co-Lead: {group.coLeads.join(", ")}
                          </div>
                        )}
                        {group.members && group.members.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-zinc-200">
                            <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold block mb-1">
                              MEMBERS:
                            </span>
                            <div className="text-xs text-zinc-700 font-sans leading-relaxed">
                              {group.members.join(" • ")}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* General Engineering Members Roster */}
              {project.team.members && project.team.members.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-black mb-4 flex items-center gap-2">
                    <span className="size-2 bg-sky-500" />
                    <span>// ENGINEERING & RESEARCH ROSTER</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {project.team.members.map((member, idx) => (
                      <div key={idx} className="p-3 sm:p-4 bg-zinc-50 border border-zinc-300">
                        <span className="font-sans text-xs sm:text-sm font-bold text-black block truncate">
                          {member.name}
                        </span>
                        {member.deptOrBatch && (
                          <span className="font-mono text-[10px] text-zinc-500 block uppercase mt-0.5 truncate">
                            {member.deptOrBatch}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Former Leads / Milestone Contributors */}
              {project.team.formerLeads && project.team.formerLeads.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-black mb-4 flex items-center gap-2">
                    <span className="size-2 bg-zinc-400" />
                    <span>// FORMER FOUNDING LEADS</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.team.formerLeads.map((fLead, idx) => (
                      <div key={idx} className="p-3 bg-zinc-100 border border-zinc-300 flex items-center justify-between">
                        <span className="font-sans text-xs sm:text-sm font-bold text-black">
                          {fLead.name}
                        </span>
                        <span className="font-mono text-xs text-zinc-500">
                          {fLead.deptOrBatch}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Faculty Advisors */}
              {project.team.advisors && project.team.advisors.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-black mb-4 flex items-center gap-2">
                    <span className="size-2 bg-amber-500" />
                    <span>// FACULTY ADVISORS & SENIOR MENTORS</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.team.advisors.map((adv, idx) => (
                      <div key={idx} className="p-4 sm:p-5 bg-amber-50/50 border-2 border-black">
                        <span className="font-heading text-base font-black text-black uppercase block">
                          {adv.name}
                        </span>
                        <span className="font-mono text-xs text-zinc-600 block mt-1">
                          {adv.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sponsorship / Deployed note */}
              {project.team.sponsorship && (
                <div className="p-4 bg-zinc-100 border border-zinc-300 text-center font-mono text-xs text-zinc-700">
                  {project.team.sponsorship}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 8. Bottom Project Switcher Carousel Bar */}
        <section className="bg-zinc-950 text-white py-12 px-4 sm:px-8 border-b-2 border-black">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Previous Project Link */}
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-4 text-left p-4 hover:bg-zinc-900 transition-colors border border-zinc-800 w-full sm:w-auto flex-1 max-w-sm"
            >
              <div className="size-10 bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                <ArrowLeft className="size-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                  PREVIOUS MISSION
                </span>
                <span className="font-heading text-base font-black uppercase text-white group-hover:text-amber-400 transition-colors block">
                  {prevProject.title}
                </span>
              </div>
            </Link>

            {/* Center Back to All */}
            <Link
              href="/#fleet"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-amber-400 transition-colors shrink-0"
            >
              <span>Explore All Fleet Projects</span>
            </Link>

            {/* Next Project Link */}
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center justify-end gap-4 text-right p-4 hover:bg-zinc-900 transition-colors border border-zinc-800 w-full sm:w-auto flex-1 max-w-sm"
            >
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                  NEXT MISSION
                </span>
                <span className="font-heading text-base font-black uppercase text-white group-hover:text-amber-400 transition-colors block">
                  {nextProject.title}
                </span>
              </div>
              <div className="size-10 bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                <ArrowRight className="size-5" />
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* 9. Lightbox Modal */}
      {activeMedia && (
        <div 
          onClick={() => setActiveMedia(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-5xl w-full bg-zinc-950 border-2 border-zinc-700 overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900 text-white font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-400 text-black font-black uppercase">
                  {activeMedia.category}
                </span>
                <span className="text-zinc-300 font-bold uppercase">{activeMedia.title}</span>
              </div>
              <button
                onClick={() => setActiveMedia(null)}
                className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Media Body */}
            <div className="relative max-h-[75vh] min-h-[300px] flex items-center justify-center bg-black overflow-hidden">
              {activeMedia.type === "video" ? (
                <video
                  src={activeMedia.src}
                  controls
                  autoPlay
                  className="max-h-[75vh] w-auto max-w-full"
                />
              ) : (
                <img
                  src={activeMedia.src}
                  alt={activeMedia.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              )}
            </div>

            {/* Modal Footer Caption */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900 text-zinc-300 text-xs sm:text-sm font-sans flex items-center justify-between">
              <p>{activeMedia.caption}</p>
              <span className="font-mono text-[10px] text-zinc-500 uppercase ml-4 shrink-0">
                ESC TO CLOSE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 10. Global Footer */}
      <Footer />
    </div>
  );
}
