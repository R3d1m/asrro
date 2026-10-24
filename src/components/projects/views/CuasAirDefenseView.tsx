"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Crosshair, 
  Eye, 
  Radio, 
  Zap, 
  Play, 
  Maximize2, 
  CheckCircle2, 
  Cpu, 
  Activity, 
  Sparkles,
  AlertTriangle,
  Radar
} from "lucide-react";
import { ProjectData, GalleryItem } from "@/data/projectsData";
import SmartImage from "@/components/ui/SmartImage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryLightbox from "@/components/projects/shared/GalleryLightbox";
import ProjectSwitcher from "@/components/projects/shared/ProjectSwitcher";

export default function CuasAirDefenseView({ project }: { project: ProjectData }) {
  const [selectedKillChain, setSelectedKillChain] = useState(0);
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  const killChainStages = [
    {
      code: "STAGE-01",
      title: "RF & RADAR PERIMETER SCAN",
      tech: "SDR 2.4/5.8 GHz + Micro-Doppler",
      desc: "Ground and airborne software-defined radio antennas sweep perimeter air space. Algorithmic micro-Doppler radar analysis detects propeller blade rotation signatures up to 500 meters away.",
      interceptMetric: "Detection Latency: < 120 ms",
      threatTier: "PRIORITY ALPHA"
    },
    {
      code: "STAGE-02",
      title: "EDGE AI TARGET ACQUISITION",
      tech: "YOLOv8 + TensorRT on Jetson Orin",
      desc: "High-definition onboard cameras stream 1080p60 video directly to hardware-accelerated TensorRT inference. YOLOv8 convolutional neural network locks 3D bounding boxes around hostile aerial targets.",
      interceptMetric: "Inference Speed: 62 FPS (FP16)",
      threatTier: "TARGET LOCKED"
    },
    {
      code: "STAGE-03",
      title: "AUTONOMOUS KINEMATIC PURSUIT",
      tech: "PX4 Autopilot + Proportional Navigation",
      desc: "Guidance algorithms calculate optimal high-speed intercept trajectory. High-thrust carbon airframe surges forward at speeds up to 120 km/h with visual servoing adjusting heading 50 times per second.",
      interceptMetric: "Max Intercept Velocity: 120 km/h",
      threatTier: "PURSUIT ENGAGED"
    },
    {
      code: "STAGE-04",
      title: "NEUTRALIZATION & DEBRIS MITIGATION",
      tech: "Pneumatic Net Launcher / Directional Jam",
      desc: "Upon closing within 4 meters, vehicle triggers pneumatic tethered net deployment to entangle rotors without kinetic explosion, bringing target down safely to prevent ground collateral damage.",
      interceptMetric: "Capture Probability: > 94%",
      threatTier: "THREAT NEUTRALIZED"
    }
  ];

  return (
    <div className="min-h-screen bg-[#070b0d] text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">
      <Navbar />

      {/* 1. Tactical HUD Header Bar */}
      <section className="bg-black/95 border-b border-emerald-500/30 py-2.5 px-4 sm:px-8 sticky top-16 sm:top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              href="/#fleet" 
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>FLEET</span>
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="px-1.5 py-0.5 bg-emerald-500 text-black font-bold uppercase text-[10px]">
              TACTICAL AIR DEFENSE
            </span>
            <span className="text-emerald-400 font-bold hidden sm:inline">{project.code}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
              <span className="inline-block size-2 bg-emerald-400 rounded-full animate-ping" />
              <span className="font-mono text-emerald-400">DEFENSE PROTOCOL: ACTIVE ARMED</span>
            </div>
            <span className="px-2 py-0.5 bg-zinc-900 border border-emerald-500/40 text-emerald-400 font-bold text-[11px]">
              AUTONOMOUS INTERCEPTOR
            </span>
          </div>
        </div>
      </section>

      {/* 2. Tactical Hero Section: Reticle & Radar Crosshairs */}
      <section className="relative min-h-[560px] sm:min-h-[620px] flex items-center justify-center overflow-hidden border-b border-emerald-500/20">
        <div className="absolute inset-0 z-0">
          <SmartImage
            localSrc={project.heroImage}
            fallbackSrc="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1600&q=80"
            alt={project.title}
            className="size-full object-cover object-center filter brightness-85 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b0d] via-[#070b0d]/80 to-[#070b0d]/50" />
          <div className="absolute inset-0 tactical-grid opacity-25 pointer-events-none" />
        </div>

        {/* Tactical HUD Overlay Elements */}
        <div className="absolute inset-6 sm:inset-10 border border-emerald-500/20 pointer-events-none hidden md:block">
          <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
            <Crosshair className="size-3" />
            <span>FOV 84° // TELEMETRY LINK 5.8GHz</span>
          </div>
          <div className="absolute top-2 right-2 text-[10px] font-mono text-emerald-400">
            [SYS_HEALTH: 100%]
          </div>
          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-emerald-400">
            RADAR PERIMETER: 500M ACTIVE
          </div>
          <div className="absolute bottom-2 right-2 text-[10px] font-mono text-emerald-400">
            KILL-CHAIN: READY
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4">
            <Crosshair className="size-3.5 animate-spin text-emerald-400" />
            <span>COUNTER-UNMANNED AERIAL SYSTEMS (C-UAS)</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none drop-shadow-2xl">
            {project.title}
          </h1>

          <p className="mt-3 text-base sm:text-xl text-emerald-300 font-mono tracking-wide max-w-3xl mx-auto font-bold">
            {project.fullTitle}
          </p>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-300 font-sans max-w-2xl mx-auto leading-relaxed">
            {project.summary}
          </p>

          {/* Tactical Specs HUD Strip */}
          <div className="mt-8 pt-6 border-t border-emerald-500/20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 max-w-4xl mx-auto">
            {project.specs.map((item, idx) => (
              <div key={idx} className="p-3 bg-black/85 border border-emerald-500/30 backdrop-blur-md text-center">
                <span className="text-[10px] font-mono uppercase text-emerald-400/80 block truncate">
                  {item.label}
                </span>
                <span className="text-xs sm:text-sm font-mono font-black text-white block mt-0.5 truncate">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CREATIVE MISSION OVERVIEW: Tactical Interception Kill-Chain & Radar Defense Protocol */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#091114] border-b border-emerald-500/15">
        <div className="max-w-6xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Radar className="size-3.5 text-emerald-400" />
              <span>AUTONOMOUS AIR DEFENSE MATRIX</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              4-Stage Intercept Kill-Chain
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              From long-range perimeter RF detection to micro-second edge computer vision lock and non-lethal net entanglement.
            </p>
            <div className="w-16 h-0.5 bg-emerald-500 mx-auto mt-4" />
          </div>

          {/* Kill Chain Interactive Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 font-mono text-xs">
            {killChainStages.map((stg, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedKillChain(idx)}
                className={`p-3.5 border text-left transition-all ${
                  selectedKillChain === idx
                    ? "bg-emerald-500 text-black border-emerald-400 font-bold shadow-lg shadow-emerald-500/20"
                    : "bg-black/70 border-zinc-800 text-zinc-400 hover:border-emerald-500/50 hover:text-white"
                }`}
              >
                <div className="text-[10px] opacity-80">{stg.code}</div>
                <div className="font-heading text-xs sm:text-sm uppercase mt-0.5 truncate">{stg.title}</div>
              </button>
            ))}
          </div>

          {/* Active Kill Chain Stage Showcase */}
          <div className="bg-black/90 border-2 border-emerald-500/40 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-emerald-500 text-black font-mono text-xs font-bold">
                    {killChainStages[selectedKillChain].code}
                  </span>
                  <span className="font-mono text-xs text-emerald-400 font-bold uppercase">
                    ENGAGEMENT STATUS: {killChainStages[selectedKillChain].threatTier}
                  </span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {killChainStages[selectedKillChain].title}
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
                  {killChainStages[selectedKillChain].desc}
                </p>
              </div>

              {/* Tactical Radar Telemetry Box */}
              <div className="bg-zinc-950 p-4 border border-emerald-500/30 space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">HARDWARE ENGINE:</span>
                  <span className="text-emerald-400 font-bold">{killChainStages[selectedKillChain].tech}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-400">BENCHMARK METRIC:</span>
                  <span className="text-white font-bold">{killChainStages[selectedKillChain].interceptMetric}</span>
                </div>
                <div className="flex justify-between pt-1 text-[11px] text-zinc-500">
                  <span>DEFENSE LEVEL</span>
                  <span className="text-emerald-400 animate-pulse font-bold">AIR DEFENSE READY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overview & Objectives Matrix */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
              <h4 className="font-mono text-xs uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-2">
                <Sparkles className="size-4" />
                <span>COUNTER-UAS STRATEGIC MISSION</span>
              </h4>
              {project.overview.map((paragraph, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
              <h4 className="font-mono text-xs uppercase font-bold text-amber-400 tracking-wider flex items-center gap-2">
                <CheckCircle2 className="size-4" />
                <span>TACTICAL INTERCEPTOR OBJECTIVES</span>
              </h4>
              <ul className="space-y-3 font-sans text-xs sm:text-sm">
                {project.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-zinc-300">
                    <span className="size-5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUBTEAMS & INTERCEPTOR SQUADRONS (With Rich Pictures, NO Member Names Inside) */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#070b0d] border-b border-emerald-500/15">
        <div className="max-w-7xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Cpu className="size-3.5 text-emerald-400" />
              <span>SPECIALIZED AIR DEFENSE SQUADRONS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Subteams & Squadrons
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              Dedicated engineering units responsible for carbon composite aerodynamics, edge tensor computing, and high-G visual servoing.
            </p>
            <div className="w-16 h-0.5 bg-emerald-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {project.subteams.map((subteam) => (
              <div 
                key={subteam.id}
                className="group bg-zinc-950 border border-zinc-800 hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                {/* Photo Frame */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black border-b border-zinc-800">
                  <SmartImage
                    localSrc={subteam.image}
                    fallbackSrc={project.heroImage}
                    alt={subteam.name}
                    className="size-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2 py-0.5 bg-black/90 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold">
                      {subteam.code}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <h3 className="font-heading text-lg sm:text-xl font-black uppercase text-white tracking-tight">
                      {subteam.name}
                    </h3>
                  </div>
                </div>

                {/* Subteam Content (NO member names inside) */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed mb-4">
                      {subteam.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <span className="font-mono text-[10px] uppercase text-emerald-400 tracking-wider block font-bold">
                        // SQUADRON CORE DUTIES
                      </span>
                      <ul className="space-y-1.5">
                        {subteam.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="text-xs text-zinc-400 flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">›</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Toolstack */}
                  <div className="pt-3 border-t border-zinc-800/80">
                    <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider block mb-2">
                      SQUADRON TOOLSTACK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {subteam.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono text-[10px]">
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

      {/* 5. MULTIMEDIA GALLERY (Surveillance & Engagement Vault) */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#091114] border-b border-emerald-500/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Maximize2 className="size-3.5 text-emerald-400" />
              <span>RECONNAISSANCE & FLIGHT LOGS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Flight Intercept Media Vault
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              Aerial engagement logs, high-speed camera footage, and edge vision bounding box captures.
            </p>
            <div className="w-16 h-0.5 bg-emerald-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] sm:auto-rows-[320px] gap-4 sm:gap-6">
            {project.gallery.map((item) => {
              const isWide = item.aspect === "wide";
              const isTall = item.aspect === "tall";
              const isPanoramic = item.aspect === "panoramic";

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveMedia(item)}
                  className={`group relative overflow-hidden bg-black border border-zinc-800 hover:border-emerald-400 cursor-pointer transition-all duration-300 ${
                    isWide ? "md:col-span-2 row-span-1" :
                    isTall ? "col-span-1 row-span-2" :
                    isPanoramic ? "md:col-span-3 row-span-1" :
                    "col-span-1 row-span-1"
                  }`}
                >
                  {item.type === "video" ? (
                    <div className="relative size-full">
                      <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 right-3 size-9 bg-emerald-500 text-black flex items-center justify-center font-bold shadow-lg">
                        <Play className="size-4 fill-current" />
                      </div>
                    </div>
                  ) : (
                    <SmartImage
                      localSrc={item.src}
                      fallbackSrc={project.heroImage}
                      alt={item.title}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <span className="px-2 py-0.5 bg-emerald-500 text-black font-mono text-[9px] font-bold uppercase tracking-wider mb-1 inline-block">
                      {item.category}
                    </span>
                    <h4 className="font-heading text-sm sm:text-base font-black uppercase text-white tracking-tight drop-shadow truncate">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-zinc-300 line-clamp-1 font-sans mt-0.5">
                      {item.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TEAM MEMBERS AT THE END (Project Leadership, Subsystem Leads, Researchers, Advisors) */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#070b0d] border-b border-emerald-500/15">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Crosshair className="size-3.5 text-emerald-400" />
              <span>COMMAND STRUCTURE & RESEARCH ROSTER</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              C-UAS Interceptor Personnel
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              Autonomous UAV engineers, computer vision researchers, and CUET faculty mentors powering the air defense program.
            </p>
            <div className="w-16 h-0.5 bg-emerald-500 mx-auto mt-4" />
          </div>

          <div className="space-y-12">
            {/* Leadership */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold mb-4 flex items-center gap-2">
                <span>// AIR DEFENSE COMMAND & LEADS</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.team.leadership.map((leader, lIdx) => (
                  <div key={lIdx} className="p-4 bg-zinc-950 border border-emerald-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-emerald-400 block">{leader.role}</span>
                      <h4 className="font-heading text-base sm:text-lg font-black uppercase text-white">{leader.name}</h4>
                    </div>
                    <span className="size-8 bg-emerald-500 text-black font-mono font-bold flex items-center justify-center text-xs">
                      ⚡
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Members */}
            {project.team.members && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold mb-4 flex items-center gap-2">
                  <span>// ACTIVE RESEARCHERS & FLIGHT CREW</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {project.team.members.map((member, mIdx) => (
                    <div key={mIdx} className="p-3 bg-zinc-950 border border-zinc-800 text-xs">
                      <span className="font-bold text-white block">{member.name}</span>
                      {member.deptOrBatch && (
                        <span className="text-zinc-500 font-mono text-[11px]">{member.deptOrBatch}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Former Leads & Advisors */}
            {project.team.advisors && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold mb-4 flex items-center gap-2">
                  <span>// FACULTY ADVISORY BOARD</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.team.advisors.map((advisor, aIdx) => (
                    <div key={aIdx} className="p-4 bg-zinc-950 border border-zinc-800">
                      <h4 className="font-heading text-sm sm:text-base font-black uppercase text-white">
                        {advisor.name}
                      </h4>
                      <p className="text-xs text-zinc-400 font-mono mt-0.5">
                        {advisor.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <GalleryLightbox item={activeMedia} onClose={() => setActiveMedia(null)} />

      {/* Bottom Mission Switcher */}
      <ProjectSwitcher currentSlug={project.slug} theme="tactical" />

      <Footer />
    </div>
  );
}
