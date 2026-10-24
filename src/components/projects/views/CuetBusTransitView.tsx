"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Bus, 
  MapPin, 
  Smartphone, 
  Radio, 
  Database, 
  CheckCircle2, 
  Play, 
  Maximize2, 
  Cpu, 
  Activity, 
  ExternalLink,
  Sparkles,
  Navigation,
  Clock,
  Wifi
} from "lucide-react";
import { ProjectData, GalleryItem } from "@/data/projectsData";
import SmartImage from "@/components/ui/SmartImage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryLightbox from "@/components/projects/shared/GalleryLightbox";
import ProjectSwitcher from "@/components/projects/shared/ProjectSwitcher";

export default function CuetBusTransitView({ project }: { project: ProjectData }) {
  const [selectedBus, setSelectedBus] = useState(0);
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  const activeBuses = [
    {
      id: "BUS-01",
      name: "Pahartali Express",
      route: "Chittagong City Center ⟷ CUET Main Gate",
      lat: "22.4632° N",
      lon: "91.9715° E",
      speed: "44 km/h",
      heading: "215° SW",
      nextStop: "Raozan Highway Junction",
      eta: "11 Mins",
      status: "ON SCHEDULE",
      packetLatency: "380 ms"
    },
    {
      id: "BUS-03",
      name: "Chawkbazar Line",
      route: "Chawkbazar ⟷ CUET Campus Terminal",
      lat: "22.4180° N",
      lon: "91.9320° E",
      speed: "38 km/h",
      heading: "190° S",
      nextStop: "Kaptai Road Intersection",
      eta: "18 Mins",
      status: "SLIGHT DELAY",
      packetLatency: "410 ms"
    },
    {
      id: "BUS-05",
      name: "Agrabad Transit",
      route: "Agrabad Commercial ⟷ CUET Campus",
      lat: "22.4920° N",
      lon: "91.9950° E",
      speed: "52 km/h",
      heading: "045° NE",
      nextStop: "Pahartali Link Road",
      eta: "06 Mins",
      status: "APPROACHING",
      packetLatency: "340 ms"
    }
  ];

  const iotPipelineStages = [
    {
      step: "01",
      title: "ONBOARD VEHICLE TRACKER",
      tech: "ESP32 + NEO-6M GPS Module",
      desc: "Mounted inside the bus cabin, the ESP32 samples NMEA satellite coordinates every 1000ms with custom jitter filtration to smooth GPS drift."
    },
    {
      step: "02",
      title: "GPRS CELLULAR TELEMETRY",
      tech: "SIM800L Wireless Transmitter",
      desc: "Firmware packages raw coordinate, speed, and heading data into compact encrypted HTTP/TCP JSON payloads transmitted via cellular networks."
    },
    {
      step: "03",
      title: "REAL-TIME CLOUD ENGINE",
      tech: "Firebase Realtime DB + GCP",
      desc: "Cloud database ingests vehicle state with sub-second synchronization, triggering push notifications and geofence events for arriving stops."
    },
    {
      step: "04",
      title: "STUDENT CLIENT APP",
      tech: "React Native + Mapbox GL",
      desc: "Student smartphone app renders smooth vector maps with animated bus markers, route timetables, and predictive ETA arrival calculations."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-zinc-100 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* 1. Smart Transit Header Bar */}
      <section className="bg-black/95 border-b border-blue-500/30 py-2.5 px-4 sm:px-8 sticky top-16 sm:top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link 
              href="/#fleet" 
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>FLEET</span>
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="px-1.5 py-0.5 bg-blue-600 text-white font-bold uppercase text-[10px]">
              CAMPUS IOT TRANSIT
            </span>
            <span className="text-blue-400 font-bold hidden sm:inline">{project.code}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
              <Wifi className="size-3 text-emerald-400 animate-pulse" />
              <span className="font-mono text-emerald-400">TELEMETRY LINK: 3 VEHICLES ACTIVE</span>
            </div>
            <a
              href="https://mycuetbus.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black font-bold text-[11px] uppercase transition-colors inline-flex items-center gap-1"
            >
              <span>Launch App</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Hero Section: Electric Transit Grid */}
      <section className="relative min-h-[560px] sm:min-h-[620px] flex items-center justify-center overflow-hidden border-b border-blue-500/20">
        <div className="absolute inset-0 z-0">
          <SmartImage
            localSrc={project.heroImage}
            fallbackSrc="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1600&q=80"
            alt={project.title}
            className="size-full object-cover object-center filter brightness-85 contrast-120"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/80 to-[#070b14]/50" />
          <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />
        </div>

        {/* Transit Grid Overlay Elements */}
        <div className="absolute inset-6 sm:inset-10 border border-blue-500/20 pointer-events-none hidden md:block">
          <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[10px] font-mono text-blue-400">
            <Navigation className="size-3" />
            <span>GEO-TELEMETRY // MAPBOX GL ENGINE</span>
          </div>
          <div className="absolute top-2 right-2 text-[10px] font-mono text-blue-400">
            BACKEND: FIREBASE REALTIME DB
          </div>
          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-blue-400">
            FLEET SERVICE: CHITTAGONG-CUET HIGHWAY
          </div>
          <div className="absolute bottom-2 right-2 text-[10px] font-mono text-blue-400">
            REFRESH RATE: 1000MS
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/60 border border-blue-500/40 text-blue-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Bus className="size-3.5 text-blue-400" />
            <span>SMART CAMPUS MOBILITY // INTERNET OF THINGS</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none drop-shadow-2xl">
            {project.title}
          </h1>

          <p className="mt-3 text-base sm:text-xl text-blue-200 font-mono tracking-wide max-w-3xl mx-auto font-bold">
            {project.fullTitle}
          </p>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-300 font-sans max-w-2xl mx-auto leading-relaxed">
            {project.summary}
          </p>

          {/* Transit Specs Strip */}
          <div className="mt-8 pt-6 border-t border-blue-500/20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 max-w-4xl mx-auto">
            {project.specs.map((item, idx) => (
              <div key={idx} className="p-3 bg-black/85 border border-blue-500/30 backdrop-blur-md text-center">
                <span className="text-[10px] font-mono uppercase text-blue-300/80 block truncate">
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

      {/* 3. CREATIVE MISSION OVERVIEW: Real-Time IoT Telemetry & Live Bus Tracker */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#0a101f] border-b border-blue-500/15">
        <div className="max-w-6xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/60 border border-blue-500/30 text-blue-300 font-mono text-xs uppercase tracking-widest mb-3">
              <Activity className="size-3.5 text-blue-400" />
              <span>END-TO-END SMART TRANSIT ARCHITECTURE</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              IoT Telemetry Pipeline & Live Tracker
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              From in-vehicle ESP32 GPS sentence acquisition to cellular GSM packet dispatch and live student mobile rendering.
            </p>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto mt-4" />
          </div>

          {/* 4-Stage IoT Data Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {iotPipelineStages.map((stg, idx) => (
              <div key={idx} className="p-5 bg-black/85 border border-blue-500/30 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-blue-400 mb-2">
                    <span>STAGE {stg.step}</span>
                    <span className="size-5 bg-blue-600 text-white font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                  </div>
                  <h4 className="font-heading text-sm font-black uppercase text-white tracking-tight">
                    {stg.title}
                  </h4>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed mt-2">
                    {stg.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-blue-500/20 text-[10px] font-mono text-amber-400">
                  CORE: {stg.tech}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Live Bus Telemetry Monitor */}
          <div className="bg-black/90 border-2 border-blue-500/40 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider block">
                  // REAL-TIME FLEET TELEMETRY MONITOR
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Simulated Route Telemetry Stream
                </h3>
              </div>

              {/* Bus Switcher */}
              <div className="flex flex-wrap gap-2">
                {activeBuses.map((bus, idx) => (
                  <button
                    key={bus.id}
                    onClick={() => setSelectedBus(idx)}
                    className={`px-3 py-1.5 text-xs font-mono font-bold transition-all ${
                      selectedBus === idx
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : "bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {bus.id} — {bus.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Telemetry Display */}
            <div className="p-5 bg-zinc-950 border border-blue-500/30 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 bg-blue-600 text-white font-mono text-xs font-bold">
                    {activeBuses[selectedBus].id}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    STATUS: {activeBuses[selectedBus].status}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    LATENCY: {activeBuses[selectedBus].packetLatency}
                  </span>
                </div>
                <h4 className="font-heading text-2xl font-black text-white uppercase">
                  {activeBuses[selectedBus].name}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Route Corridor: <span className="text-blue-300 font-semibold">{activeBuses[selectedBus].route}</span>
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 pt-2 border-t border-zinc-800">
                  <div>LAT: <span className="text-white font-bold">{activeBuses[selectedBus].lat}</span></div>
                  <div>LON: <span className="text-white font-bold">{activeBuses[selectedBus].lon}</span></div>
                  <div>HEADING: <span className="text-white font-bold">{activeBuses[selectedBus].heading}</span></div>
                </div>
              </div>

              {/* Speed & ETA Gauge Box */}
              <div className="bg-black p-4 border border-zinc-800 space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">CURRENT SPEED:</span>
                  <span className="text-amber-400 font-bold">{activeBuses[selectedBus].speed}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">NEXT STOP:</span>
                  <span className="text-white font-bold truncate max-w-[140px]">{activeBuses[selectedBus].nextStop}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">STUDENT ETA:</span>
                  <span className="text-emerald-400 font-bold">{activeBuses[selectedBus].eta}</span>
                </div>
                <div className="flex justify-between pt-1 text-[11px] text-zinc-500">
                  <span>TELEMETRY SYNC</span>
                  <span className="text-blue-400 font-bold animate-pulse">FIREBASE REALTIME</span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative & Objectives Matrix */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
              <h4 className="font-mono text-xs uppercase font-bold text-blue-400 tracking-wider flex items-center gap-2">
                <Sparkles className="size-4" />
                <span>TRANSIT CHALLENGE SOLVED</span>
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
                <span>COMMUTER DEPLOYMENT GOALS</span>
              </h4>
              <ul className="space-y-3 font-sans text-xs sm:text-sm">
                {project.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-zinc-300">
                    <span className="size-5 bg-blue-900/60 text-blue-300 border border-blue-500/40 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
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

      {/* 4. SUBTEAMS & PRODUCT SPRINT WINGS (With Rich Pictures, NO Member Names Inside) */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#070b14] border-b border-blue-500/15">
        <div className="max-w-7xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/60 border border-blue-500/30 text-blue-300 font-mono text-xs uppercase tracking-widest mb-3">
              <Cpu className="size-3.5 text-blue-400" />
              <span>PRODUCT ENGINEERING DIVISIONS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Subteams & Product Wings
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              Hardware fabrication, embedded telemetry firmware, cross-platform mobile frontend, and cloud backend microservices.
            </p>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {project.subteams.map((subteam) => (
              <div 
                key={subteam.id}
                className="group bg-zinc-950 border border-zinc-800 hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
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
                    <span className="px-2 py-0.5 bg-black/90 border border-blue-500/40 text-blue-300 font-mono text-[10px] font-bold">
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
                      <span className="font-mono text-[10px] uppercase text-blue-400 tracking-wider block font-bold">
                        // SPRINT RESPONSIBILITIES
                      </span>
                      <ul className="space-y-1.5">
                        {subteam.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="text-xs text-zinc-400 flex items-start gap-2">
                            <span className="text-blue-500 font-bold">›</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Toolstack */}
                  <div className="pt-3 border-t border-zinc-800/80">
                    <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider block mb-2">
                      TECH STACK & APIS
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

      {/* 5. MULTIMEDIA GALLERY (Mobile App & In-Bus Hardware Logs) */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#0a101f] border-b border-blue-500/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/60 border border-blue-500/30 text-blue-300 font-mono text-xs uppercase tracking-widest mb-3">
              <Maximize2 className="size-3.5 text-blue-400" />
              <span>APP INTERFACE & HARDWARE ARCHIVE</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Transit Media Vault
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              User interface previews, vehicle telemetry installations, and campus testing footage.
            </p>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto mt-4" />
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
                  className={`group relative overflow-hidden bg-black border border-zinc-800 hover:border-blue-400 cursor-pointer transition-all duration-300 ${
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
                      <div className="absolute top-3 right-3 size-9 bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg">
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
                    <span className="px-2 py-0.5 bg-blue-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider mb-1 inline-block">
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
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#070b14] border-b border-blue-500/15">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/60 border border-blue-500/30 text-blue-300 font-mono text-xs uppercase tracking-widest mb-3">
              <Bus className="size-3.5 text-blue-400" />
              <span>APP DEVELOPMENT & HARDWARE ROSTER</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              My CUET Bus Personnel
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans">
              Software architects, embedded IoT engineers, and university transit division advisors behind the live smart mobility app.
            </p>
            <div className="w-16 h-0.5 bg-blue-500 mx-auto mt-4" />
          </div>

          <div className="space-y-12">
            {/* Leadership */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-blue-400 font-bold mb-4 flex items-center gap-2">
                <span>// PROJECT LEADS & PRODUCT DIRECTORS</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.team.leadership.map((leader, lIdx) => (
                  <div key={lIdx} className="p-4 bg-zinc-950 border border-blue-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-blue-400 block">{leader.role}</span>
                      <h4 className="font-heading text-base sm:text-lg font-black uppercase text-white">{leader.name}</h4>
                    </div>
                    <span className="size-8 bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-xs">
                      ▲
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Members */}
            {project.team.members && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-blue-400 font-bold mb-4 flex items-center gap-2">
                  <span>// ENGINEERING & IOT DEVELOPERS</span>
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

            {/* Live App Deployment link */}
            {project.team.sponsorship && (
              <div className="p-4 bg-blue-950/40 border border-blue-500/40 text-center">
                <span className="font-mono text-xs text-blue-300">
                  OFFICIAL DEPLOYMENT: {project.team.sponsorship}
                </span>
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
