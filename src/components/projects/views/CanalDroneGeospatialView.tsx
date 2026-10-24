"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  MapPin, 
  Layers, 
  Compass, 
  Database, 
  CheckCircle2, 
  Play, 
  Maximize2, 
  Cpu, 
  Activity, 
  Sparkles,
  Mountain,
  Grid,
  FileSpreadsheet
} from "lucide-react";
import { ProjectData, GalleryItem } from "@/data/projectsData";
import SmartImage from "@/components/ui/SmartImage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryLightbox from "@/components/projects/shared/GalleryLightbox";
import ProjectSwitcher from "@/components/projects/shared/ProjectSwitcher";

export default function CanalDroneGeospatialView({ project }: { project: ProjectData }) {
  const [activeLayer, setActiveLayer] = useState<"aerial" | "pointcloud" | "silt">("aerial");
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  const pipelineStages = [
    {
      code: "PHASE-01",
      title: "AUTONOMOUS SURVEY GRID FLIGHT",
      tool: "Mission Planner + RTK GPS",
      metric: "80% Forward / 70% Side Overlap",
      desc: "UAV executes automated zigzag flight path over the 14 km canal corridor at 60m AGL, maintaining constant ground sampling distance (GSD) of 1.4 cm/pixel."
    },
    {
      code: "PHASE-02",
      title: "CALIBRATED 4K ORTHO-STILLS",
      tool: "Sony High-Resolution Sensor",
      metric: "Sub-Centimeter Georeferencing",
      desc: "High-speed mechanical shutter captures georeferenced still frames, embedding precise millisecond RTK GNSS coordinates into image EXIF metadata."
    },
    {
      code: "PHASE-03",
      title: "STRUCTURE-FROM-MOTION 3D MESH",
      tool: "WebODM / Agisoft SfM Pipeline",
      metric: "14.2M Densified Point Cloud",
      desc: "Photogrammetry cluster extracts feature keypoints across overlapping frames, generating a dense 3D digital elevation model (DEM) and orthomosaic map."
    },
    {
      code: "PHASE-04",
      title: "AI VOLUMETRIC EXCAVATION AUDIT",
      tool: "PyTorch CNN + GIS Spatial Analysis",
      metric: "Cut-and-Fill Accuracy: ± 2.8%",
      desc: "Computer vision segmentation maps silt accumulation and calculates exact cubic meters of sediment excavated against contractual civil specifications."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070e14] text-zinc-100 font-sans selection:bg-cyan-500 selection:text-black">
      <Navbar />

      {/* 1. Geospatial Header Bar */}
      <section className="bg-black/95 border-b border-cyan-500/30 py-2.5 px-4 sm:px-8 sticky top-16 sm:top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              href="/#fleet" 
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>FLEET</span>
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="px-1.5 py-0.5 bg-cyan-500 text-black font-bold uppercase text-[10px]">
              GEOSPATIAL SURVEY
            </span>
            <span className="text-cyan-400 font-bold hidden sm:inline">{project.code}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
              <MapPin className="size-3.5 text-cyan-400" />
              <span className="font-mono text-cyan-400">CUET WATERWAY SECTOR: 22.4633° N, 91.9712° E</span>
            </div>
            <span className="px-2 py-0.5 bg-zinc-900 border border-cyan-500/40 text-cyan-400 font-bold text-[11px]">
              RTK ACCURACY: ± 2.5 CM
            </span>
          </div>
        </div>
      </section>

      {/* 2. Hero Section: Topographical Grid Styling */}
      <section className="relative min-h-[560px] sm:min-h-[620px] flex items-center justify-center overflow-hidden border-b border-cyan-500/20">
        <div className="absolute inset-0 z-0">
          <SmartImage
            localSrc={project.heroImage}
            fallbackSrc="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1600&q=80"
            alt={project.title}
            className="size-full object-cover object-center filter brightness-85 contrast-115"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e14] via-[#070e14]/80 to-[#070e14]/50" />
          <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />
        </div>

        {/* Topographic GIS Overlay Elements */}
        <div className="absolute inset-6 sm:inset-10 border border-cyan-500/20 pointer-events-none hidden md:block">
          <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
            <Grid className="size-3" />
            <span>ORTHOPHOTO MOSAIC // GSD: 1.4 CM/PX</span>
          </div>
          <div className="absolute top-2 right-2 text-[10px] font-mono text-cyan-400">
            WGS84 / UTM ZONE 46N
          </div>
          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-cyan-400">
            SURVEY CORRIDOR: 14 KM ACTIVE
          </div>
          <div className="absolute bottom-2 right-2 text-[10px] font-mono text-cyan-400">
            VOLUMETRIC ERROR: &lt; 3%
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4">
            <Compass className="size-3.5 animate-pulse text-cyan-400" />
            <span>REMOTE SENSING // PHOTOGRAMMETRY & AI</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none drop-shadow-2xl">
            {project.title}
          </h1>

          <p className="mt-3 text-base sm:text-xl text-cyan-300 font-mono tracking-wide max-w-3xl mx-auto font-bold">
            {project.fullTitle}
          </p>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-300 font-sans max-w-2xl mx-auto leading-relaxed">
            {project.summary}
          </p>

          {/* Survey Telemetry Specs Strip */}
          <div className="mt-8 pt-6 border-t border-cyan-500/20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 max-w-4xl mx-auto">
            {project.specs.map((item, idx) => (
              <div key={idx} className="p-3 bg-black/85 border border-cyan-500/30 backdrop-blur-md text-center">
                <span className="text-[10px] font-mono uppercase text-cyan-400/80 block truncate">
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

      {/* 3. CREATIVE MISSION OVERVIEW: Photogrammetry & 3D Reconstruction Pipeline */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#09151f] border-b border-cyan-500/15">
        <div className="max-w-6xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Layers className="size-3.5 text-cyan-400" />
              <span>SPATIAL RECONSTRUCTION WORKFLOW</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Photogrammetric Survey Pipeline
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              From automated zigzag flight execution to dense 3D point cloud generation and automated cut-and-fill volumetric excavation auditing.
            </p>
            <div className="w-16 h-0.5 bg-cyan-500 mx-auto mt-4" />
          </div>

          {/* Interactive 4-Stage Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            {pipelineStages.map((stage, idx) => (
              <div key={idx} className="p-5 bg-black/85 border border-cyan-500/30 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                    <span>{stage.code}</span>
                    <span className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 font-bold">0{idx + 1}</span>
                  </div>
                  <h4 className="font-heading text-sm font-black uppercase text-white tracking-tight">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed mt-2">
                    {stage.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-zinc-800 text-[11px] font-mono">
                  <div className="text-zinc-500">TOOL: <span className="text-cyan-400">{stage.tool}</span></div>
                  <div className="text-zinc-500">ACCURACY: <span className="text-emerald-400 font-bold">{stage.metric}</span></div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Survey Layer Inspector */}
          <div className="bg-black/90 border-2 border-cyan-500/40 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider block">
                  // LIVE GEOSPATIAL LAYER INSPECTOR
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Waterway Excavation Analysis
                </h3>
              </div>

              {/* Layer Toggle Buttons */}
              <div className="inline-flex p-1 bg-zinc-900 border border-zinc-700">
                <button
                  onClick={() => setActiveLayer("aerial")}
                  className={`px-3 py-1 text-xs font-mono font-bold transition-all ${
                    activeLayer === "aerial" ? "bg-cyan-500 text-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  RAW ORTHOPHOTO
                </button>
                <button
                  onClick={() => setActiveLayer("pointcloud")}
                  className={`px-3 py-1 text-xs font-mono font-bold transition-all ${
                    activeLayer === "pointcloud" ? "bg-cyan-500 text-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  3D ELEVATION MESH
                </button>
                <button
                  onClick={() => setActiveLayer("silt")}
                  className={`px-3 py-1 text-xs font-mono font-bold transition-all ${
                    activeLayer === "silt" ? "bg-cyan-500 text-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  AI SILT HEATMAP
                </button>
              </div>
            </div>

            {/* Inspector Display Box */}
            <div className="p-4 bg-zinc-950 border border-cyan-500/30 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-zinc-500">ACTIVE LAYER:</span>
                <p className="text-cyan-400 font-bold uppercase">{activeLayer.toUpperCase()} INSPECTION</p>
                <span className="text-[11px] text-zinc-400">
                  {activeLayer === "aerial" && "Calibrated 4K multi-spectral survey capture with RTK GNSS EXIF tags."}
                  {activeLayer === "pointcloud" && "Dense point cloud elevation mesh calculating sub-centimeter volumetric depth."}
                  {activeLayer === "silt" && "Convolutional neural network segmenting silt sediment deposits across embankment."}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500">EXCAVATED VOLUME:</span>
                <p className="text-emerald-400 font-bold">18,450 CUBIC METERS (M³)</p>
                <span className="text-[11px] text-zinc-400">Target contract quota achieved: 94.2%</span>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500">CIVIL COMPLIANCE:</span>
                <p className="text-amber-400 font-bold">WGS84 CERTIFIED AUDIT</p>
                <span className="text-[11px] text-zinc-400">Automated CAD export ready for water management authority.</span>
              </div>
            </div>
          </div>

          {/* Overview Narrative & Strategic Objectives */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
              <h4 className="font-mono text-xs uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-2">
                <Sparkles className="size-4" />
                <span>SURVEY PROBLEM STATEMENT</span>
              </h4>
              {project.overview.map((paragraph, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
              <h4 className="font-mono text-xs uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-2">
                <CheckCircle2 className="size-4" />
                <span>PRIMARY SURVEY DELIVERABLES</span>
              </h4>
              <ul className="space-y-3 font-sans text-xs sm:text-sm">
                {project.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-zinc-300">
                    <span className="size-5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
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

      {/* 4. SUBTEAMS & DIVISIONS (With Rich Pictures, NO Member Names Inside) */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#070e14] border-b border-cyan-500/15">
        <div className="max-w-7xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Cpu className="size-3.5 text-cyan-400" />
              <span>GEODETIC & GEOSPATIAL DIVISIONS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Subteams & Divisions
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              Specialized labs managing long-endurance autonomous flight frames, photogrammetry algorithms, and civil GIS reporting.
            </p>
            <div className="w-16 h-0.5 bg-cyan-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {project.subteams.map((subteam) => (
              <div 
                key={subteam.id}
                className="group bg-zinc-950 border border-zinc-800 hover:border-cyan-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
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
                    <span className="px-2 py-0.5 bg-black/90 border border-cyan-500/40 text-cyan-400 font-mono text-[10px] font-bold">
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
                      <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-wider block font-bold">
                        // DIVISION RESPONSIBILITIES
                      </span>
                      <ul className="space-y-1.5">
                        {subteam.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="text-xs text-zinc-400 flex items-start gap-2">
                            <span className="text-cyan-500 font-bold">›</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Toolstack */}
                  <div className="pt-3 border-t border-zinc-800/80">
                    <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider block mb-2">
                      TECHNICAL ARSENAL
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

      {/* 5. MULTIMEDIA GALLERY (Aerial Survey Orthophoto & Mapping Logs) */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#09151f] border-b border-cyan-500/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Maximize2 className="size-3.5 text-cyan-400" />
              <span>AERIAL ORTHOPHOTO & FLIGHT LOGS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Survey Imagery Vault
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              High-altitude canal orthomosaic mosaics, flight video footage, and ground station telemetry captures.
            </p>
            <div className="w-16 h-0.5 bg-cyan-500 mx-auto mt-4" />
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
                  className={`group relative overflow-hidden bg-black border border-zinc-800 hover:border-cyan-400 cursor-pointer transition-all duration-300 ${
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
                      <div className="absolute top-3 right-3 size-9 bg-cyan-500 text-black flex items-center justify-center font-bold shadow-lg">
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
                    <span className="px-2 py-0.5 bg-cyan-500 text-black font-mono text-[9px] font-bold uppercase tracking-wider mb-1 inline-block">
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
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#070e14] border-b border-cyan-500/15">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
              <MapPin className="size-3.5 text-cyan-400" />
              <span>CIVIL RESEARCH CREW & MENTORS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Canal Drone Personnel
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              Geomatics engineers, AI specialists, and civil engineering advisors behind the automated waterways survey initiative.
            </p>
            <div className="w-16 h-0.5 bg-cyan-500 mx-auto mt-4" />
          </div>

          <div className="space-y-12">
            {/* Leadership */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <span>// PROJECT LEADS & DIRECTORS</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.team.leadership.map((leader, lIdx) => (
                  <div key={lIdx} className="p-4 bg-zinc-950 border border-cyan-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-cyan-400 block">{leader.role}</span>
                      <h4 className="font-heading text-base sm:text-lg font-black uppercase text-white">{leader.name}</h4>
                    </div>
                    <span className="size-8 bg-cyan-500 text-black font-mono font-bold flex items-center justify-center text-xs">
                      ▲
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Members */}
            {project.team.members && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2">
                  <span>// CIVIL GIS & AI RESEARCH ENGINEERS</span>
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
                <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2">
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
