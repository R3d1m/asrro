"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  Eye, 
  Compass, 
  Layers, 
  CheckCircle2, 
  Play, 
  Maximize2, 
  Cpu, 
  Activity, 
  Globe2,
  CircleDot,
  Moon,
  Telescope
} from "lucide-react";
import { ProjectData, GalleryItem } from "@/data/projectsData";
import SmartImage from "@/components/ui/SmartImage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryLightbox from "@/components/projects/shared/GalleryLightbox";
import ProjectSwitcher from "@/components/projects/shared/ProjectSwitcher";

export default function AsrroscopeObservatoryView({ project }: { project: ProjectData }) {
  const [selectedTarget, setSelectedTarget] = useState(0);
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  const celestialTargets = [
    {
      name: "M31 ANDROMEDA GALAXY",
      constellation: "Andromeda",
      distance: "2.537 Million Light Years",
      visualMag: "3.44 Mag",
      notes: "Resolved bright galactic nucleus, prominent dust lanes, and satellite companion galaxies M32 and M110 under rural CUET dark skies.",
      opticsSetup: "160mm F/7.5 + 32mm Super Plössl (37.5x Magnification)"
    },
    {
      name: "M42 ORION NEBULA",
      constellation: "Orion (The Hunter)",
      distance: "1,344 Light Years",
      visualMag: "4.00 Mag",
      notes: "Vivid emission and reflection nebula filaments resolved with crisp four-star Trapezium cluster (Theta-1 Orionis) at high contrast.",
      opticsSetup: "160mm F/7.5 + 12mm Wide-Field Eyepiece (100x Magnification)"
    },
    {
      name: "LUNAR CRATER COPERNICUS",
      constellation: "Oceanus Procellarum (Moon)",
      distance: "384,400 km",
      visualMag: "-12.7 Mag (Full Lunar)",
      notes: "Terraced crater walls standing 3.8 km high and central peak triple-cluster captured during terminator phase shadows with sub-arcsecond sharpness.",
      opticsSetup: "160mm F/7.5 + 2x Barlow + 6mm Planetary (400x Max Resolving)"
    },
    {
      name: "SATURN RING PLANE & CASSINI DIVISION",
      constellation: "Aquarius",
      distance: "1.4 Billion km",
      visualMag: "0.55 Mag",
      notes: "Distinct dark gap of the Cassini Division clearly resolved between Rings A and B; major moon Titan tracked alongside subtle cloud bands on Saturn's disk.",
      opticsSetup: "160mm F/7.5 + 9mm Orthoscopic (133x Magnification)"
    }
  ];

  const rayTraceSteps = [
    {
      step: "01",
      title: "160 MM CLEAR APERTURE",
      desc: "Parallel starlight enters the flock-lined, anti-reflective optical tube, minimizing internal glare and atmospheric thermal convection currents."
    },
    {
      step: "02",
      title: "PARABOLIC PRIMARY MIRROR (1200 MM)",
      desc: "High-purity aluminized mirror curves wavefront to single aberration-free focal point, delivering high light gathering power (522x human eye)."
    },
    {
      step: "03",
      title: "45° SECONDARY ELLIPTICAL FLAT",
      desc: "Precision Pyrex diagonal flat redirects incoming convergence cone 90 degrees outward through the tube sidewall with minimal diffraction spike."
    },
    {
      step: "04",
      title: "CRAYFORD DUAL-SPEED FOCUSER",
      desc: "Zero-backlash 1:10 micro-reduction focusing barrel delivers razor-sharp wavefront convergence directly to visual eyepiece or CMOS sensor."
    }
  ];

  return (
    <div className="min-h-screen bg-[#04040a] text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* 1. Deep-Sky Observatory Header Bar */}
      <section className="bg-black/95 border-b border-indigo-500/30 py-2.5 px-4 sm:px-8 sticky top-16 sm:top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              href="/#fleet" 
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-indigo-400 transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>FLEET</span>
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="px-1.5 py-0.5 bg-indigo-600 text-white font-bold uppercase text-[10px]">
              DEEP-SKY OBSERVATORY
            </span>
            <span className="text-indigo-400 font-bold hidden sm:inline">{project.code}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
              <Sparkles className="size-3 text-indigo-400 animate-pulse" />
              <span className="font-mono text-indigo-300">OBSERVATORY LAT: 22.4633° N // LIMITING MAG: 13.8</span>
            </div>
            <span className="px-2 py-0.5 bg-zinc-900 border border-indigo-500/40 text-indigo-300 font-bold text-[11px]">
              160MM DOBSONIAN
            </span>
          </div>
        </div>
      </section>

      {/* 2. Hero Section: Cosmic Nightfall & Starlight */}
      <section className="relative min-h-[560px] sm:min-h-[620px] flex items-center justify-center overflow-hidden border-b border-indigo-500/20">
        <div className="absolute inset-0 z-0">
          <SmartImage
            localSrc={project.heroImage}
            fallbackSrc="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80"
            alt={project.title}
            className="size-full object-cover object-center filter brightness-90 contrast-120"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04040a] via-[#04040a]/80 to-[#04040a]/50" />
          <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
        </div>

        {/* Celestial Reticle & Framing Lines */}
        <div className="absolute inset-6 sm:inset-10 border border-indigo-500/20 pointer-events-none hidden md:block">
          <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[10px] font-mono text-indigo-400">
            <CircleDot className="size-3" />
            <span>F/7.5 OPTICAL TRAIN // LIGHT GATHERING 522X</span>
          </div>
          <div className="absolute top-2 right-2 text-[10px] font-mono text-indigo-400">
            DIFFRACTION LIMIT: 0.72 ARCSEC
          </div>
          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-indigo-400">
            PRIMARY: 160MM BOROSILICATE PARABOLA
          </div>
          <div className="absolute bottom-2 right-2 text-[10px] font-mono text-indigo-400">
            MOUNT: ALT-AZ TEFLON GLIDE
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Sparkles className="size-3.5 animate-pulse text-indigo-400" />
            <span>OPTICAL ASTRONOMY // DEEP-SKY EXPLORATION</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none drop-shadow-2xl">
            {project.title}
          </h1>

          <p className="mt-3 text-base sm:text-xl text-indigo-200 font-mono tracking-wide max-w-3xl mx-auto font-bold">
            {project.fullTitle}
          </p>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-300 font-sans max-w-2xl mx-auto leading-relaxed">
            {project.summary}
          </p>

          {/* Optical Telemetry Specs Strip */}
          <div className="mt-8 pt-6 border-t border-indigo-500/20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 max-w-4xl mx-auto">
            {project.specs.map((item, idx) => (
              <div key={idx} className="p-3 bg-black/85 border border-indigo-500/30 backdrop-blur-md text-center">
                <span className="text-[10px] font-mono uppercase text-indigo-300/80 block truncate">
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

      {/* 3. CREATIVE MISSION OVERVIEW: Optical Ray-Tracing & Celestial Observation Log */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#060612] border-b border-indigo-500/15">
        <div className="max-w-6xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-mono text-xs uppercase tracking-widest mb-3">
              <Layers className="size-3.5 text-indigo-400" />
              <span>OPTICAL RAY-TRACING & CELESTIAL TARGETS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Optical Train & Observation Logs
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              From photon wavefront capture at the 160 mm parabolic mirror to live celestial deep-sky observations.
            </p>
            <div className="w-16 h-0.5 bg-indigo-500 mx-auto mt-4" />
          </div>

          {/* Optical Ray-Tracing 4-Step Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {rayTraceSteps.map((stg, idx) => (
              <div key={idx} className="p-5 bg-black/80 border border-indigo-500/30 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-indigo-400 mb-2">
                    <span>RAY-STEP</span>
                    <span className="size-5 bg-indigo-600 text-white font-bold flex items-center justify-center">
                      {stg.step}
                    </span>
                  </div>
                  <h4 className="font-heading text-sm font-black uppercase text-white tracking-tight">
                    {stg.title}
                  </h4>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed mt-2">
                    {stg.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-indigo-500/20 text-[10px] font-mono text-indigo-400 mt-4">
                  SURFACE ACCURACY: λ/8 WAVEFRONT
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Celestial Observation Log */}
          <div className="bg-black/90 border-2 border-indigo-500/40 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-wider block">
                  // DEEP-SKY CELESTIAL LOGBOOK
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Observed Deep-Sky Targets
                </h3>
              </div>

              {/* Target Select Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {celestialTargets.map((tgt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTarget(idx)}
                    className={`px-3 py-1.5 text-xs font-mono font-bold transition-all ${
                      selectedTarget === idx 
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" 
                        : "bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {tgt.name.split(" ")[0]} {tgt.name.split(" ")[1]}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Display Box */}
            <div className="p-5 bg-zinc-950 border border-indigo-500/30 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 bg-indigo-600 text-white font-mono text-xs font-bold">
                    {celestialTargets[selectedTarget].constellation}
                  </span>
                  <span className="text-xs font-mono text-indigo-300 font-bold">
                    DISTANCE: {celestialTargets[selectedTarget].distance}
                  </span>
                </div>
                <h4 className="font-heading text-2xl font-black text-white uppercase">
                  {celestialTargets[selectedTarget].name}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  {celestialTargets[selectedTarget].notes}
                </p>
              </div>

              <div className="bg-black p-4 border border-zinc-800 space-y-2.5 font-mono text-xs">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">APPARENT MAG:</span>
                  <span className="text-indigo-400 font-bold">{celestialTargets[selectedTarget].visualMag}</span>
                </div>
                <div className="border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500 block text-[10px]">INSTRUMENT OPTICAL TRAIN:</span>
                  <span className="text-white text-[11px] block mt-0.5">{celestialTargets[selectedTarget].opticsSetup}</span>
                </div>
                <div className="flex justify-between pt-1 text-[11px] text-zinc-500">
                  <span>RESOLVING LIMIT</span>
                  <span className="text-indigo-400 font-bold">DAWES LIMIT SATISFIED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative & Objectives Matrix */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
              <h4 className="font-mono text-xs uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-2">
                <Sparkles className="size-4" />
                <span>INSTRUMENT DESIGN PHILOSOPHY</span>
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
                <span>ASTRONOMICAL MISSION OBJECTIVES</span>
              </h4>
              <ul className="space-y-3 font-sans text-xs sm:text-sm">
                {project.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-zinc-300">
                    <span className="size-5 bg-indigo-900/60 text-indigo-300 border border-indigo-500/40 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
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

      {/* 4. SUBTEAMS & WORKSHOPS (With Rich Pictures, NO Member Names Inside) */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#04040a] border-b border-indigo-500/15">
        <div className="max-w-7xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-mono text-xs uppercase tracking-widest mb-3">
              <Cpu className="size-3.5 text-indigo-400" />
              <span>OPTICAL INSTRUMENTATION WORKSHOPS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Subteams & Workshops
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              Precision machining, parabolic optical fabrication, mechanical vibration dampening, and astrophotography sensor calibration.
            </p>
            <div className="w-16 h-0.5 bg-indigo-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {project.subteams.map((subteam) => (
              <div 
                key={subteam.id}
                className="group bg-zinc-950 border border-zinc-800 hover:border-indigo-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
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
                    <span className="px-2 py-0.5 bg-black/90 border border-indigo-500/40 text-indigo-300 font-mono text-[10px] font-bold">
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
                      <span className="font-mono text-[10px] uppercase text-indigo-400 tracking-wider block font-bold">
                        // WORKSHOP CORE TASKS
                      </span>
                      <ul className="space-y-1.5">
                        {subteam.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="text-xs text-zinc-400 flex items-start gap-2">
                            <span className="text-indigo-400 font-bold">›</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Toolstack */}
                  <div className="pt-3 border-t border-zinc-800/80">
                    <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider block mb-2">
                      FABRICATION TOOLS & HARDWARE
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

      {/* 5. MULTIMEDIA GALLERY (Deep-Sky Astrophotography & Optical Hardware) */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#060612] border-b border-indigo-500/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-mono text-xs uppercase tracking-widest mb-3">
              <Maximize2 className="size-3.5 text-indigo-400" />
              <span>ASTROPHOTOGRAPHY & OBSERVATORY ARCHIVES</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Observatory Media Vault
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              High-resolution astronomical observations, nebulae exposures, and telescope hardware fabrication logs.
            </p>
            <div className="w-16 h-0.5 bg-indigo-500 mx-auto mt-4" />
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
                  className={`group relative overflow-hidden bg-black border border-zinc-800 hover:border-indigo-400 cursor-pointer transition-all duration-300 ${
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
                      <div className="absolute top-3 right-3 size-9 bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg">
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
                    <span className="px-2 py-0.5 bg-indigo-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider mb-1 inline-block">
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
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#04040a] border-b border-indigo-500/15">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-mono text-xs uppercase tracking-widest mb-3">
              <Sparkles className="size-3.5 text-indigo-400" />
              <span>ASTRONOMICAL INSTRUMENT CREW</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              ASRROSCOPE Personnel
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              Optical engineers, mechanical machinists, and faculty mentors behind the 160 mm Dobsonian telescope program.
            </p>
            <div className="w-16 h-0.5 bg-indigo-500 mx-auto mt-4" />
          </div>

          <div className="space-y-12">
            {/* Leadership */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-indigo-400 font-bold mb-4 flex items-center gap-2">
                <span>// PROJECT LEADS & DIRECTORS</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.team.leadership.map((leader, lIdx) => (
                  <div key={lIdx} className="p-4 bg-zinc-950 border border-indigo-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-indigo-400 block">{leader.role}</span>
                      <h4 className="font-heading text-base sm:text-lg font-black uppercase text-white">{leader.name}</h4>
                    </div>
                    <span className="size-8 bg-indigo-600 text-white font-mono font-bold flex items-center justify-center text-xs">
                      ★
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Members */}
            {project.team.members && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-indigo-400 font-bold mb-4 flex items-center gap-2">
                  <span>// OPTICAL & ASTROPHOTOGRAPHY RESEARCHERS</span>
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

            {/* Advisors */}
            {project.team.advisors && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-indigo-400 font-bold mb-4 flex items-center gap-2">
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
      <ProjectSwitcher currentSlug={project.slug} theme="dark" />

      <Footer />
    </div>
  );
}
