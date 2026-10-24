"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Rocket, 
  Bot, 
  Telescope, 
  Cpu, 
  ArrowUpRight, 
  Layers, 
  Activity,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import SmartImage from "../ui/SmartImage";

export default function InteractiveFleetExplorer() {
  const fleet = [
    {
      id: "project-starlap",
      slug: "starlap",
      index: "01",
      code: "AERO-RK-01",
      title: "STARLAP Genesis-I",
      category: "Aerospace, Rocketry & Solid Propulsion",
      subdomain: "starlap.asrrocuetbd.org",
      status: "FLAGSHIP ROCKETRY PROGRAM",
      localImage: "/images/projects/starlap.png",
      fallbackImage: "https://images.unsplash.com/photo-1517976487504-59a1a08420e7?auto=format&fit=crop&w=1200&q=80",
      description: "ASRRO's flagship rocketry program and CUET's pioneer sounding rocket. Engineered with custom-built solid propulsion, integrated avionics telemetry, and aerodynamic supersonic airframe.",
      specs: [
        { label: "MISSION CLASS", value: "Level-1 Sounding Rocket" },
        { label: "PROPULSION", value: "Solid Motor Propulsion" },
        { label: "AVIONICS", value: "Telemetry, GPS & Sensors" },
        { label: "AERODYNAMICS", value: "Supersonic Fin Airframe" },
      ],
      tags: ["Solid Propulsion", "Telemetry Avionics", "Aerodynamics", "Aeropropulsion"],
      icon: Rocket,
    },
    {
      id: "project-cuas-uav",
      slug: "cuas-uav",
      index: "02",
      code: "AERO-CUAS-02",
      title: "ASRRO C-UAS UAV Team",
      category: "Counter-UAS & Autonomous Aerial Systems",
      subdomain: "cuas.asrrocuetbd.org",
      status: "ACTIVE R&D / COMPETITION",
      localImage: "/images/projects/cuas-drone.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=80",
      description: "Autonomous unmanned aerial system engineered for Counter-UAS missions. Combines real-time computer vision, target tracking, sensor fusion, and autonomous flight control.",
      specs: [
        { label: "MISSION ROLE", value: "C-UAS Intercept" },
        { label: "AI PERCEPTION", value: "Target Detection & Track" },
        { label: "FLIGHT CONTROL", value: "Autonomous Waypoints" },
        { label: "TELEMETRY LINK", value: "Encrypted GCS Stream" },
      ],
      tags: ["Autonomous Flight", "Computer Vision", "C-UAS", "Target Tracking"],
      icon: Rocket,
    },
    {
      id: "project-canal-drone",
      slug: "canal-drone",
      index: "03",
      code: "AERO-SURV-03",
      title: "Canal Monitoring Drone",
      category: "UAV & Edge AI Geospatial Engineering",
      subdomain: "canal.asrrocuetbd.org",
      status: "PROTOTYPE / TESTING",
      localImage: "/images/projects/canal-drone.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
      description: "Autonomous drone surveying linear infrastructure, reconstructing 3D terrain models via SfM photogrammetry, and calculating excavation progress with onboard Edge AI.",
      specs: [
        { label: "EDGE AI ENGINE", value: "Jetson Orin (67 TOPS)" },
        { label: "3D MODELING", value: "SfM Photogrammetry" },
        { label: "POSITIONING", value: "Dual-Freq GNSS (PPP)" },
        { label: "SURVEY ACCURACY", value: "Zero GCPs / No RTK Fee" },
      ],
      tags: ["Edge AI", "Photogrammetry", "Jetson Orin", "DSM Mapping"],
      icon: Layers,
    },
    {
      id: "project-asrroscope",
      slug: "asrroscope",
      index: "04",
      code: "OPTI-DS-04",
      title: "ASRROSCOPE Deep-Sky",
      category: "Astronomy & Optical Engineering",
      subdomain: "observatory.asrrocuetbd.org",
      status: "OPERATIONAL AT CUET",
      localImage: "/images/projects/asrroscope.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
      description: "Student-built 160 mm Dobsonian optical telescope for astronomical research. Capturing high-contrast views of M31 Andromeda Galaxy, Whirlpool Galaxy, and deep-sky nebulae.",
      specs: [
        { label: "PRIMARY APERTURE", value: "160 mm Mirror" },
        { label: "FOCAL LENGTH", value: "1280 mm (f/8)" },
        { label: "MAGNIFICATION", value: "Up to 320× Optical" },
        { label: "KEY TARGET", value: "M31 Andromeda & Planets" },
      ],
      tags: ["Astrophysics", "Dobsonian", "Deep Sky", "Optical Alignment"],
      icon: Telescope,
    },
    {
      id: "project-cuet-bus",
      slug: "cuet-bus",
      index: "05",
      code: "IOT-TRK-05",
      title: "My CUET Bus App",
      category: "Smart Campus IoT & Fleet Telemetry",
      subdomain: "mycuetbus.web.app",
      status: "PROTOTYPE DEPLOYED",
      localImage: "/images/projects/cuet-bus.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
      description: "Real-time campus transit platform integrating custom ESP32 IoT hardware, GPS positioning, Mapbox geospatial mapping, and cloud backend for live bus schedules and tracking.",
      specs: [
        { label: "HARDWARE CORE", value: "ESP32 + NEO-6M GPS" },
        { label: "CELLULAR LINK", value: "SIM800L Module" },
        { label: "MAPPING ENGINE", value: "Mapbox Geospatial API" },
        { label: "CLOUD BACKEND", value: "Firebase Realtime DB" },
      ],
      tags: ["IoT", "GPS Tracking", "Mapbox", "Smart Campus"],
      icon: Cpu,
    },
  ];

  // Tripled array for seamless infinite circular scrolling (set 1, set 2 [middle], set 3)
  const extendedFleet = [...fleet, ...fleet, ...fleet];
  const middleOffset = fleet.length; // 4
  const [activeExtendedIndex, setActiveExtendedIndex] = useState(middleOffset); // starts at index 4 (1st slide)
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isResettingRef = useRef(false);

  // Real 0..3 index for indicators & counter
  const currentProjectIndex = ((activeExtendedIndex % fleet.length) + fleet.length) % fleet.length;

  const scrollToSlide = useCallback((targetIndex: number, smooth: boolean = true) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const target = container.children[targetIndex] as HTMLElement;
    if (target) {
      const containerCenter = container.offsetWidth / 2;
      const cardCenter = target.offsetLeft + target.offsetWidth / 2;
      container.scrollTo({
        left: cardCenter - containerCenter,
        behavior: smooth ? "smooth" : "instant",
      });
    }
    setActiveExtendedIndex(targetIndex);
  }, []);

  // Center the 1st slide on initial mount (with 4th slide peeking on left and 2nd on right)
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToSlide(middleOffset, false);
    }, 60);
    return () => clearTimeout(timer);
  }, [middleOffset, scrollToSlide]);

  // Timed Auto-Scroll (advances every 4.5s unless paused)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveExtendedIndex((prev) => {
        const next = prev + 1;
        scrollToSlide(next, true);
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, scrollToSlide]);

  // Handle continuous loop bounds check on scroll settle
  const handleScroll = useCallback(() => {
    if (isResettingRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, idx) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeExtendedIndex) {
      setActiveExtendedIndex(closestIndex);
    }
  }, [activeExtendedIndex]);

  // Seamless jump reset when reaching near the outer boundary ends
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkBoundary = () => {
      if (activeExtendedIndex >= middleOffset * 2) {
        // Scrolled into set 3 -> reset silently back to set 2 (same project)
        isResettingRef.current = true;
        const normalized = activeExtendedIndex - middleOffset;
        scrollToSlide(normalized, false);
        setTimeout(() => {
          isResettingRef.current = false;
        }, 100);
      } else if (activeExtendedIndex < middleOffset) {
        // Scrolled into set 1 -> reset silently forward to set 2 (same project)
        isResettingRef.current = true;
        const normalized = activeExtendedIndex + middleOffset;
        scrollToSlide(normalized, false);
        setTimeout(() => {
          isResettingRef.current = false;
        }, 100);
      }
    };

    const timer = setTimeout(checkBoundary, 400);
    return () => clearTimeout(timer);
  }, [activeExtendedIndex, middleOffset, scrollToSlide]);

  const handlePrev = () => {
    scrollToSlide(activeExtendedIndex - 1, true);
  };

  const handleNext = () => {
    scrollToSlide(activeExtendedIndex + 1, true);
  };

  const handleJumpTo = (projectIdx: number) => {
    scrollToSlide(middleOffset + projectIdx, true);
  };

  return (
    <section 
      id="fleet" 
      className="pt-8 pb-14 sm:pt-12 sm:pb-20 bg-white border-b border-black scroll-mt-20 overflow-hidden"
    >
      {/* 1. Centered Section Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3.5 mx-auto">
          <Layers className="size-3.5 text-sky-400" />
          <span>Works</span>
        </div>
        
        <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase text-center">
          Our Ongoing Projects
        </h2>

        <p className="mt-3 text-zinc-600 text-xs sm:text-sm md:text-base font-sans max-w-xl mx-auto text-center leading-relaxed">
          Each flagship project operates as an independent research laboratory with dedicated hardware roster, telemetry protocols, and autonomous subdomain portal.
        </p>

        {/* Clean Architectural Accent Divider */}
        <div className="w-16 h-0.5 bg-black mx-auto mt-5" />
      </div>

      {/* 2. Infinite Looped Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="mt-8 flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-3 px-4 sm:px-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {extendedFleet.map((project, extIdx) => {
          const isSelected = activeExtendedIndex === extIdx;

          return (
            <div
              key={`${project.id}-${extIdx}`}
              onClick={() => scrollToSlide(extIdx, true)}
              className={`group w-[86vw] sm:w-[68vw] lg:w-[58vw] max-w-[820px] shrink-0 snap-center rounded-2xl sm:rounded-3xl border-2 border-black bg-[#030712] overflow-hidden transition-all duration-500 cursor-pointer ${
                isSelected 
                  ? "shadow-2xl scale-[1] opacity-100 ring-2 ring-black" 
                  : "scale-[0.96] opacity-75 hover:opacity-95"
              }`}
            >
              {/* Card Container with Balanced Vertical Spacing */}
              <div className="relative min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex flex-col justify-between p-5 sm:p-8 lg:p-10 overflow-hidden">
                {/* Background Photography with Natural Depth Scrim */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <SmartImage
                    localSrc={project.localImage}
                    fallbackSrc={project.fallbackImage}
                    alt={project.title}
                    className="size-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Base darkening layer so colors stay rich and vibrant */}
                  <div className="absolute inset-0 bg-black/40" />
                  {/* Vertical protective scrim: lighter at top, balanced in middle, protective at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/25" />
                  {/* Subtle edge vignettes */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
                  {/* Subtle technical blueprint grid */}
                  <div className="absolute inset-0 technical-grid opacity-15 pointer-events-none" />
                </div>

                {/* Top Corner Telemetry Strip */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] sm:text-xs uppercase px-2.5 sm:px-3 py-1 bg-black/90 text-white border border-zinc-700 font-bold backdrop-blur-md">
                      {project.status}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 bg-white/10 text-zinc-200 border border-white/20 backdrop-blur-md">
                      {project.code}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] sm:text-xs text-white/90 bg-black/80 px-2.5 py-1 border border-zinc-700 backdrop-blur-md flex items-center gap-1.5">
                    <Activity className="size-3 text-sky-400 animate-pulse" />
                    <span>0{((extIdx % fleet.length) + 1)} / 0{fleet.length}</span>
                  </span>
                </div>

                {/* Centered Content: Title, Description, Specs & Gateway */}
                <div className="relative z-10 pt-6 sm:pt-10 flex flex-col items-center text-center">
                  {/* Category & Subdomain Kicker (Centered) */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-2 text-center mx-auto">
                    <span className="font-mono text-[10px] sm:text-xs text-amber-400 font-bold uppercase tracking-widest drop-shadow">
                      {project.category}
                    </span>
                    <span className="text-zinc-400 font-mono text-xs">•</span>
                    <span className="font-mono text-[10px] sm:text-xs text-zinc-200 drop-shadow">
                      {project.subdomain}
                    </span>
                  </div>

                  {/* Monumental Headline (Centered) */}
                  <h3 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white drop-shadow-xl text-center">
                    {project.title}
                  </h3>

                  {/* Description (Centered) */}
                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-zinc-100 font-sans leading-relaxed max-w-xl mx-auto text-center line-clamp-3 sm:line-clamp-none drop-shadow">
                    {project.description}
                  </p>

                  {/* Integrated Telemetry Specs Strip (Centered Grid) */}
                  <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono w-full max-w-2xl mx-auto">
                    {project.specs.map((item, sIdx) => (
                      <div key={sIdx} className="p-2 sm:p-2.5 bg-black/70 border border-white/15 backdrop-blur-md text-center">
                        <span className="text-[9px] sm:text-[10px] uppercase text-zinc-400 block font-semibold truncate">
                          {item.label}
                        </span>
                        <span className="text-xs sm:text-sm font-black text-white block mt-0.5 truncate">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Direct Action Links (Centered) */}
                  <div className="mt-4 sm:mt-5 pt-3 border-t border-white/10 w-full flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-400 text-black font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider hover:bg-white transition-colors shadow-lg cursor-pointer"
                    >
                      <span>Explore Project & Subteams</span>
                      <ArrowRight className="size-3.5" />
                    </Link>

                    <a
                      href={project.subdomain.startsWith("http") ? project.subdomain : `https://${project.subdomain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-black/80 border border-zinc-700 text-zinc-300 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hover:text-white hover:border-zinc-500 transition-colors"
                    >
                      <span>Live Portal</span>
                      <ArrowUpRight className="size-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Bottom Centered Navigation & Progress Tracker */}
      <div className="max-w-4xl mx-auto px-4 mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs text-zinc-600">
        <div className="flex items-center gap-3">
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            className="size-9 sm:size-10 flex items-center justify-center border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
            aria-label="Previous Project"
          >
            <ArrowLeft className="size-4" />
          </button>

          {/* Pagination Step Indicators */}
          <div className="flex items-center gap-2">
            {fleet.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleJumpTo(idx)}
                className={`h-1.5 transition-all cursor-pointer rounded-full ${
                  currentProjectIndex === idx ? "w-10 sm:w-12 bg-black" : "w-3 sm:w-4 bg-zinc-300 hover:bg-zinc-500"
                }`}
                aria-label={`Jump to ${item.title}`}
              />
            ))}
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            className="size-9 sm:size-10 flex items-center justify-center border-2 border-black bg-black text-white hover:bg-sky-600 transition-colors cursor-pointer"
            aria-label="Next Project"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>

        {/* <span className="text-[11px] font-mono text-zinc-500 sm:ml-4">
          0{currentProjectIndex + 1} / 0{fleet.length} • {fleet[currentProjectIndex].title}
        </span> */}
      </div>
    </section>
  );
}
