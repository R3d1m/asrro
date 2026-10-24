"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Users, 
  Crown, 
  ArrowLeft, 
  ArrowRight, 
  Maximize2, 
  X, 
  Sparkles, 
  Activity,
  ArrowUpRight,
  ShieldCheck,
  GraduationCap
} from "lucide-react";
import { committeeMembers, CommitteeMember } from "@/data/committeeData";

function getMemberPortfolio(role: string): string {
  if (role === "President") return "Executive Governance";
  if (role.includes("Vice President")) return "Division Oversight";
  if (role.includes("General Secretary")) return "Council Operations";
  if (role.includes("Organizing")) return "Institutional Coordination";
  if (role.includes("Finance")) return "Treasury & Budgeting";
  if (role.includes("Research")) return "Publications & R&D";
  if (role.includes("Programming")) return "Software Architecture";
  if (role.includes("Robotics")) return "Autonomous Robotics";
  if (role.includes("Space")) return "Aerospace & Astronomy";
  if (role.includes("Outreach")) return "Sponsorships & PR";
  if (role.includes("Media")) return "Broadcasting & Press";
  if (role.includes("Event")) return "Event Management";
  if (role.includes("Office")) return "Administration & Records";
  if (role.includes("Graphics")) return "Visual Brand Identity";
  return "Executive Committee";
}

export default function ExecutiveCommittee() {
  const [activeMedia, setActiveMedia] = useState<CommitteeMember | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMedia(null);
      }
    };
    if (activeMedia) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeMedia]);

  // Tripled array for seamless infinite circular scrolling (set 1, set 2 [middle], set 3)
  const extendedMembers = [...committeeMembers, ...committeeMembers, ...committeeMembers];
  const middleOffset = committeeMembers.length; // Index 22 is President (member 0 of Set 2)

  const [activeExtendedIndex, setActiveExtendedIndex] = useState(middleOffset);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isResettingRef = useRef(false);

  // Real 0..21 index for indicators & active member
  const currentMemberIndex = ((activeExtendedIndex % committeeMembers.length) + committeeMembers.length) % committeeMembers.length;
  const currentMember = committeeMembers[currentMemberIndex];

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

  // Center the President on initial mount (with adjacent slides peeking on left and right)
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToSlide(middleOffset, false);
    }, 60);
    return () => clearTimeout(timer);
  }, [middleOffset, scrollToSlide]);

  // Timed Auto-Scroll: advances every 4.5s unless paused or lightbox open
  useEffect(() => {
    if (isPaused || activeMedia !== null) return;

    const interval = setInterval(() => {
      setActiveExtendedIndex((prev) => {
        const next = prev + 1;
        scrollToSlide(next, true);
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, activeMedia, scrollToSlide]);

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
        isResettingRef.current = true;
        const normalized = activeExtendedIndex - middleOffset;
        scrollToSlide(normalized, false);
        setTimeout(() => {
          isResettingRef.current = false;
        }, 100);
      } else if (activeExtendedIndex < middleOffset) {
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

  const handleJumpTo = (memberIdx: number) => {
    scrollToSlide(middleOffset + memberIdx, true);
  };

  return (
    <section 
      id="committee" 
      className="pt-8 pb-14 sm:pt-12 sm:pb-20 bg-white border-b border-black scroll-mt-20 overflow-hidden"
    >
      {/* 1. Centered Section Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3.5 mx-auto">
          <Users className="size-3.5 text-amber-400" />
          <span>LEADERSHIP</span>
        </div>
        
        <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase text-center">
          Executive Committee 2026–2027
        </h2>

        {/* <p className="mt-3 text-zinc-600 text-xs sm:text-sm md:text-base font-sans max-w-xl mx-auto text-center leading-relaxed">
          The student researchers, aerospace engineers, and specialized division leads steering ASRRO across sounding rocketry, autonomous UAVs, and deep-space astronomy.
        </p> */}

        {/* Clean Architectural Accent Divider */}
        <div className="w-16 h-0.5 bg-black mx-auto mt-5" />
      </div>

      {/* 2. Infinite Looped Horizontal Carousel Track (Styled exactly like Projects) */}
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
        {extendedMembers.map((member, extIdx) => {
          const isSelected = activeExtendedIndex === extIdx;
          const isPresident = member.id === "faria-anowara-adhora";

          return (
            <div
              key={`${member.id}-${extIdx}`}
              onClick={() => scrollToSlide(extIdx, true)}
              className={`group w-[82vw] sm:w-[54vw] md:w-[46vw] lg:w-[36vw] max-w-[480px] shrink-0 snap-center rounded-2xl sm:rounded-3xl border-2 border-black bg-[#030712] overflow-hidden transition-all duration-500 cursor-pointer ${
                isSelected 
                  ? "shadow-2xl scale-[1] opacity-100 ring-2 ring-black" 
                  : "scale-[0.96] opacity-75 hover:opacity-95"
              }`}
            >
              {/* Card Container with Balanced Vertical Spacing */}
              <div className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[520px] flex flex-col justify-between p-5 sm:p-7 lg:p-8 overflow-hidden">
                {/* Background Poster Photography with Natural Depth Scrim */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="size-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-105 brightness-90"
                    loading="lazy"
                  />
                  {/* Base darkening layer so colors stay rich and vibrant */}
                  <div className="absolute inset-0 bg-black/45" />
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
                    <span className={`font-mono text-[10px] sm:text-xs uppercase px-2.5 sm:px-3 py-1 font-bold backdrop-blur-md border ${
                      isPresident
                        ? "bg-amber-400 text-black border-amber-300 shadow-md flex items-center gap-1.5"
                        : "bg-black/90 text-white border-zinc-700"
                    }`}>
                      {isPresident && <Crown className="size-3.5 fill-black" />}
                      <span>{member.role}</span>
                    </span>
                    {/* <span className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 bg-white/10 text-zinc-200 border border-white/20 backdrop-blur-md">
                      {member.batch}
                    </span> */}
                  </div>

                  <span className="font-mono text-[10px] sm:text-xs text-white/90 bg-black/80 px-2.5 py-1 border border-zinc-700 backdrop-blur-md flex items-center gap-1.5">
                    <Activity className="size-3 text-amber-400 animate-pulse" />
                    <span>0{((extIdx % committeeMembers.length) + 1)} / {committeeMembers.length}</span>
                  </span>
                </div>

                {/* Centered Content: Title, Role, Description, Specs & Gateway */}
                <div className="relative z-10 pt-6 sm:pt-10 flex flex-col items-center text-center">
                  {/* Role & Org Pill (Centered) */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-2 text-center mx-auto">
                    <span className="font-mono text-[10px] sm:text-xs text-amber-400 font-bold uppercase tracking-widest drop-shadow">
                      ASRRO EXECUTIVE COMMITTEE
                    </span>
                    <span className="text-zinc-400 font-mono text-xs">•</span>
                    <span className="font-mono text-[10px] sm:text-xs text-zinc-200 drop-shadow">
                      2026–2027
                    </span>
                  </div>

                  {/* Monumental Name (Centered) */}
                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white drop-shadow-xl text-center">
                    {member.name}
                  </h3>

                  {/* Department Subtitle (Centered) */}
                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-zinc-100 font-sans leading-relaxed max-w-xl mx-auto text-center drop-shadow">
                    Department of {member.department}
                  </p>

                  {/* Integrated Telemetry Specs Strip (Centered Grid) */}
                  <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-white/20 flex justify-center items-center font-mono w-full mx-auto">
                    <div className="px-4 py-2 sm:px-5 sm:py-2.5 bg-black/75 border border-white/15 backdrop-blur-md text-center inline-flex flex-col items-center justify-center max-w-full">
                      <span className="text-[9px] sm:text-[10px] uppercase text-zinc-400 block font-semibold tracking-wider">
                        DESIGNATION
                      </span>
                      <span className="text-xs sm:text-sm font-black text-amber-400 block mt-0.5 leading-snug whitespace-normal text-center">
                        {member.role}
                      </span>
                    </div>

                    {/* <div className="p-2 sm:p-2.5 bg-black/70 border border-white/15 backdrop-blur-md text-center">
                      <span className="text-[9px] sm:text-[10px] uppercase text-zinc-400 block font-semibold truncate">
                        PORTFOLIO
                      </span>
                      <span className="text-xs sm:text-sm font-black text-white block mt-0.5 truncate">
                        {getMemberPortfolio(member.role)}
                      </span>
                    </div>

                    <div className="p-2 sm:p-2.5 bg-black/70 border border-white/15 backdrop-blur-md text-center">
                      <span className="text-[9px] sm:text-[10px] uppercase text-zinc-400 block font-semibold truncate">
                        SESSION
                      </span>
                      <span className="text-xs sm:text-sm font-black text-white block mt-0.5 truncate">
                        2026–2027
                      </span>
                    </div>

                    <div className="p-2 sm:p-2.5 bg-black/70 border border-white/15 backdrop-blur-md text-center">
                      <span className="text-[9px] sm:text-[10px] uppercase text-zinc-400 block font-semibold truncate">
                        ORGANIZATION
                      </span>
                      <span className="text-xs sm:text-sm font-black text-white block mt-0.5 truncate">
                        ASRRO CUET
                      </span>
                    </div> */}
                  </div>

                  {/* Direct Action Links (Centered) */}
                  <div className="mt-4 sm:mt-5 pt-3 border-t border-white/10 w-full flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMedia(member);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-400 text-black font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider hover:bg-white transition-colors shadow-lg cursor-pointer"
                    >
                      <Maximize2 className="size-3.5" />
                      <span>Spotlight</span>
                    </button>

                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToSlide(middleOffset, true);
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-black/80 border border-zinc-700 text-zinc-300 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hover:text-white hover:border-zinc-500 transition-colors cursor-pointer"
                    >
                      <Crown className="size-3 text-amber-400" />
                      <span>President Spotlight</span>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Bottom Centered Navigation & Progress Tracker (Removed per user request) */}
      {/* <div className="max-w-4xl mx-auto px-4 mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs text-zinc-600">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="size-9 sm:size-10 flex items-center justify-center border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors cursor-pointer shadow-xs"
            aria-label="Previous Committee Member"
          >
            <ArrowLeft className="size-4" />
          </button>

          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-xs no-scrollbar py-1">
            {committeeMembers.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleJumpTo(idx)}
                className={`h-1.5 transition-all cursor-pointer rounded-full shrink-0 ${
                  currentMemberIndex === idx ? "w-6 sm:w-8 bg-black" : "w-1.5 sm:w-2 bg-zinc-300 hover:bg-zinc-500"
                }`}
                aria-label={`Jump to ${item.name}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="size-9 sm:size-10 flex items-center justify-center border-2 border-black bg-black text-white hover:bg-amber-500 hover:text-black transition-colors cursor-pointer shadow-xs"
            aria-label="Next Committee Member"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>

        <span className="text-[11px] font-mono text-zinc-500 sm:ml-4">
          0{currentMemberIndex + 1} / {committeeMembers.length} • {currentMember.name} ({currentMember.role})
        </span>
      </div> */}

      {/* 4. Full-Screen Poster Inspection Lightbox Modal */}
      {activeMedia && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200"
          onClick={() => setActiveMedia(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-zinc-950 border border-zinc-800 flex flex-col max-h-[92vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3.5 sm:p-4 bg-zinc-900 border-b border-zinc-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-400 text-black font-bold uppercase text-[10px]">
                  EXECUTIVE COMMITTEE 2026–2027
                </span>
                <span className="text-white font-bold truncate max-w-xs sm:max-w-md">
                  {activeMedia.name} — {activeMedia.role}
                </span>
              </div>
              <button
                onClick={() => setActiveMedia(null)}
                className="p-1.5 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Poster Canvas */}
            <div className="relative flex-1 bg-black flex items-center justify-center p-2 min-h-[300px] max-h-[72vh] overflow-hidden">
              <img
                src={activeMedia.image}
                alt={`${activeMedia.name} - ${activeMedia.role}`}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 sm:p-4 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-sans">
              <div className="flex items-center gap-3">
                <span className="font-heading font-black text-base text-white uppercase">{activeMedia.name}</span>
                <span className="px-2 py-0.5 bg-zinc-800 text-amber-400 font-mono text-[10px] font-bold uppercase">{activeMedia.role}</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                Department of {activeMedia.department}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
