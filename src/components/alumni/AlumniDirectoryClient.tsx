"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  Building2, 
  Crown, 
  Search, 
  ExternalLink, 
  X, 
  Maximize2, 
  BookOpen, 
  Calendar, 
  Filter,
  Sparkles,
  ArrowLeft,
  Briefcase,
  Layers,
  Globe,
  Award
} from "lucide-react";
import { alumniData, AlumniMember } from "@/data/alumniData";

export default function AlumniDirectoryClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "leadership" | "academia" | "industry">("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [selectedAlumnus, setSelectedAlumnus] = useState<AlumniMember | null>(null);

  // Departments list for filtering
  const departments = useMemo(() => {
    const set = new Set<string>();
    alumniData.forEach((a) => {
      if (a.department.includes("EEE") || a.department.includes("Electrical")) set.add("EEE");
      else if (a.department.includes("Mechanical") || a.department.includes("ME")) set.add("Mechanical");
      else if (a.department.includes("Petroleum") || a.department.includes("PME")) set.add("Petroleum");
    });
    return ["all", ...Array.from(set)];
  }, []);

  // Filtered alumni list
  const filteredAlumni = useMemo(() => {
    return alumniData.filter((alumnus) => {
      // Search query filter
      const matchesSearch = 
        searchQuery.trim() === "" ||
        alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (alumnus.currentWorkplace && alumnus.currentWorkplace.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (alumnus.higherStudies && alumnus.higherStudies.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (alumnus.batch && alumnus.batch.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (alumnus.positionInCommittee && alumnus.positionInCommittee.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (alumnus.researchInterests && alumnus.researchInterests.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      if (!matchesSearch) return false;

      // Category filter
      if (selectedFilter === "leadership") {
        if (!alumnus.positionInCommittee) return false;
      } else if (selectedFilter === "academia") {
        const workplaceLower = (alumnus.currentWorkplace || "").toLowerCase();
        const isAcademic = 
          Boolean(alumnus.higherStudies) ||
          workplaceLower.includes("university") ||
          workplaceLower.includes("uts") ||
          workplaceLower.includes("texas") ||
          workplaceLower.includes("hawaii") ||
          workplaceLower.includes("illinois");
        if (!isAcademic) return false;
      } else if (selectedFilter === "industry") {
        const workplaceLower = (alumnus.currentWorkplace || "").toLowerCase();
        const isIndustry = 
          workplaceLower.includes("plc") ||
          workplaceLower.includes("corp") ||
          workplaceLower.includes("group") ||
          workplaceLower.includes("board") ||
          workplaceLower.includes("department") ||
          workplaceLower.includes("inc") ||
          workplaceLower.includes("limited") ||
          workplaceLower.includes("engineering") ||
          workplaceLower.includes("company");
        if (!isIndustry) return false;
      }

      // Department filter
      if (departmentFilter !== "all") {
        if (departmentFilter === "EEE" && !alumnus.department.includes("EEE") && !alumnus.department.includes("Electrical")) return false;
        if (departmentFilter === "Mechanical" && !alumnus.department.includes("Mechanical") && !alumnus.department.includes("ME")) return false;
        if (departmentFilter === "Petroleum" && !alumnus.department.includes("Petroleum") && !alumnus.department.includes("PME")) return false;
      }

      return true;
    });
  }, [searchQuery, selectedFilter, departmentFilter]);

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-amber-400 selection:text-black">
      {/* 1. Hero Header Banner */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#060b18] via-[#030712] to-[#030712]">
        {/* Subtle Background Grid & Star Accents */}
        <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-amber-400 transition-colors py-1 px-2.5 bg-white/5 border border-white/10 rounded-sm"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Portal Home</span>
            </Link>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-black font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4">
              <GraduationCap className="size-3.5" />
              <span>ALUMNI NETWORK & RESEARCH LEGACY</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Distinguished Alumni
            </h1>

            <p className="mt-4 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              From pioneer sounding rocketry and autonomous robotics at CUET to frontier PhD programs across the United States, United Kingdom, Australia, and leading engineering industries — discover the researchers and leaders continuing our mission.
            </p>
          </div>

          {/* Quick Telemetry Specs Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3.5 bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] uppercase text-zinc-400 block tracking-wider font-semibold">TOTAL REGISTERED</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 block mt-1">19 Pioneers</span>
            </div>
            <div className="p-3.5 bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] uppercase text-zinc-400 block tracking-wider font-semibold">GLOBAL LABS</span>
              <span className="text-xl sm:text-2xl font-black text-white block mt-1">USA, UK, AUS</span>
            </div>
            <div className="p-3.5 bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] uppercase text-zinc-400 block tracking-wider font-semibold">SECTORS</span>
              <span className="text-xl sm:text-2xl font-black text-white block mt-1">Academia & Industry</span>
            </div>
            <div className="p-3.5 bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] uppercase text-zinc-400 block tracking-wider font-semibold">FOUNDATIONAL ROOTS</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 block mt-1">2009 — Present</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Search & Filtering Controls */}
      <section className="sticky top-18 z-30 bg-[#030712]/95 backdrop-blur-md border-b border-white/10 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, workplace, research topic, batch..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/15 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-1.5 border transition-all cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-amber-400 text-black border-amber-300 font-bold"
                  : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/30"
              }`}
            >
              All ({alumniData.length})
            </button>
            <button
              onClick={() => setSelectedFilter("leadership")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 border transition-all cursor-pointer ${
                selectedFilter === "leadership"
                  ? "bg-amber-400 text-black border-amber-300 font-bold"
                  : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/30"
              }`}
            >
              <Crown className="size-3" />
              <span>Past Leadership</span>
            </button>
            <button
              onClick={() => setSelectedFilter("academia")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 border transition-all cursor-pointer ${
                selectedFilter === "academia"
                  ? "bg-amber-400 text-black border-amber-300 font-bold"
                  : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/30"
              }`}
            >
              <GraduationCap className="size-3" />
              <span>Academia & Research</span>
            </button>
            <button
              onClick={() => setSelectedFilter("industry")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 border transition-all cursor-pointer ${
                selectedFilter === "industry"
                  ? "bg-amber-400 text-black border-amber-300 font-bold"
                  : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/30"
              }`}
            >
              <Briefcase className="size-3" />
              <span>Industry Leaders</span>
            </button>
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="hidden sm:inline">Dept:</span>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-zinc-900 border border-white/20 text-white px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-amber-400"
            >
              <option value="all">All Departments</option>
              <option value="EEE">EEE</option>
              <option value="Mechanical">Mechanical (ME)</option>
              <option value="Petroleum">Petroleum (PME)</option>
            </select>
          </div>
        </div>
      </section>

      {/* 3. Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {filteredAlumni.length === 0 ? (
          <div className="p-12 text-center border border-white/10 bg-white/5 font-mono">
            <p className="text-zinc-400 text-sm">No alumni found matching your filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
                setDepartmentFilter("all");
              }}
              className="mt-4 px-4 py-2 bg-amber-400 text-black text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredAlumni.map((alumnus) => {
              const hasPastRole = Boolean(alumnus.positionInCommittee);

              return (
                <div
                  key={alumnus.id}
                  className="group relative flex flex-col bg-[#070c18] border border-white/15 hover:border-amber-400/80 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] flex-1"
                >
                  {/* Card Top: Portrait Image Area */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                    <img
                      src={alumnus.image}
                      alt={alumnus.name}
                      className="size-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                      loading="lazy"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070c18] via-transparent to-black/50" />
                    
                    {/* Top Floating Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-black/80 text-amber-400 border border-amber-400/40 backdrop-blur-md">
                          {alumnus.batch}
                        </span>
                        {alumnus.academicSession && (
                          <span className="font-mono text-[10px] px-2 py-0.5 bg-black/80 text-zinc-300 border border-white/20 backdrop-blur-md">
                            {alumnus.academicSession}
                          </span>
                        )}
                      </div>

                      {alumnus.graduationYear && (
                        <span className="font-mono text-[10px] px-2 py-0.5 bg-white/10 text-zinc-200 border border-white/20 backdrop-blur-md">
                          Grad: {alumnus.graduationYear}
                        </span>
                      )}
                    </div>

                    {/* Past Committee Role Badge if available */}
                    {hasPastRole && (
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-400 text-black font-mono text-[10px] font-black uppercase tracking-wider shadow-md">
                          <Crown className="size-3 fill-black" />
                          <span>{alumnus.positionInCommittee}</span>
                        </span>
                      </div>
                    )}

                    {/* Spotlight View Button */}
                    <button
                      onClick={() => setSelectedAlumnus(alumnus)}
                      className="absolute bottom-3 right-3 z-10 size-8 flex items-center justify-center bg-black/80 border border-white/20 text-white hover:bg-amber-400 hover:text-black transition-colors cursor-pointer"
                      title="Inspect Dossier"
                    >
                      <Maximize2 className="size-3.5" />
                    </button>
                  </div>

                  {/* Card Body: Info and Telemetry */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Name */}
                      <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-amber-400 transition-colors">
                        {alumnus.name}
                      </h3>

                      {/* Department */}
                      <p className="mt-1 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                        <GraduationCap className="size-3 text-amber-400 shrink-0" />
                        <span>{alumnus.department}</span>
                      </p>

                      {/* Current Career & Higher Studies Telemetry Box */}
                      {(alumnus.currentWorkplace || alumnus.higherStudies) && (
                        <div className="mt-4 p-3 bg-white/5 border border-white/10 space-y-2 text-xs font-mono">
                          {alumnus.currentWorkplace && (
                            <div className="flex items-start gap-2">
                              <Building2 className="size-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Current Workplace</span>
                                <span className="text-white font-semibold block">{alumnus.currentWorkplace}</span>
                              </div>
                            </div>
                          )}

                          {alumnus.higherStudies && (
                            <div className={`flex items-start gap-2 ${alumnus.currentWorkplace ? "pt-2 border-t border-white/10" : ""}`}>
                              <BookOpen className="size-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Higher Studies / Role</span>
                                <span className="text-zinc-200 block">{alumnus.higherStudies}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Research Interests Tags */}
                      {alumnus.researchInterests && alumnus.researchInterests.length > 0 && (
                        <div className="mt-4">
                          <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1.5 tracking-wider font-semibold">
                            Research & Tech Focus:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {alumnus.researchInterests.map((interest, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-black/60 border border-white/15 text-[11px] font-mono text-zinc-300 rounded-xs"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* About Me snippet */}
                      {alumnus.aboutMe && alumnus.aboutMe.trim() && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <p className="text-xs text-zinc-300 font-sans leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                            "{alumnus.aboutMe}"
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Academic Gateway & Modal Opener */}
                    <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {alumnus.googleScholar && (
                          <a
                            href={alumnus.googleScholar}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white hover:text-black border border-white/20 text-zinc-300 font-mono text-[10px] font-bold uppercase transition-colors"
                            title="Google Scholar Profile"
                          >
                            <ExternalLink className="size-2.5" />
                            <span>Scholar</span>
                          </a>
                        )}

                        {alumnus.researchGate && (
                          <a
                            href={alumnus.researchGate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-teal-400 hover:text-black border border-white/20 text-zinc-300 font-mono text-[10px] font-bold uppercase transition-colors"
                            title="ResearchGate Profile"
                          >
                            <ExternalLink className="size-2.5" />
                            <span>ResearchGate</span>
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedAlumnus(alumnus)}
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-amber-400 hover:text-white uppercase font-bold tracking-wider transition-colors ml-auto cursor-pointer"
                      >
                        <span>Full Dossier</span>
                        <Maximize2 className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Full Dossier Lightbox Modal */}
      {selectedAlumnus && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
          onClick={() => setSelectedAlumnus(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-[#070c18] border-2 border-white/20 flex flex-col max-h-[92vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-zinc-900 border-b border-zinc-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-400 text-black font-bold uppercase text-[10px]">
                  ALUMNI DOSSIER
                </span>
                <span className="text-white font-bold truncate max-w-xs sm:max-w-md">
                  {selectedAlumnus.name} ({selectedAlumnus.batch})
                </span>
              </div>

              <button
                onClick={() => setSelectedAlumnus(null)}
                className="size-8 flex items-center justify-center border border-zinc-700 bg-black text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Photo */}
                <div className="w-full sm:w-48 aspect-square shrink-0 overflow-hidden border border-white/20 bg-black rounded-lg">
                  <img
                    src={selectedAlumnus.image}
                    alt={selectedAlumnus.name}
                    className="size-full object-cover object-center"
                  />
                </div>

                {/* Main Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-black border border-amber-400/50 text-amber-400 font-mono text-xs font-bold">
                      {selectedAlumnus.batch}
                    </span>
                    {selectedAlumnus.positionInCommittee && (
                      <span className="px-2.5 py-0.5 bg-amber-400 text-black font-mono text-xs font-black uppercase">
                        {selectedAlumnus.positionInCommittee}
                      </span>
                    )}
                  </div>

                  <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">
                    {selectedAlumnus.name}
                  </h2>

                  <p className="font-mono text-xs text-zinc-300">
                    Department of {selectedAlumnus.department}
                  </p>

                  {(selectedAlumnus.academicSession || selectedAlumnus.graduationYear) && (
                    <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs text-zinc-400">
                      {selectedAlumnus.academicSession && (
                        <span>Session: <strong className="text-white">{selectedAlumnus.academicSession}</strong></span>
                      )}
                      {selectedAlumnus.graduationYear && (
                        <span>Graduation: <strong className="text-white">{selectedAlumnus.graduationYear}</strong></span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Current Workplace & Higher Studies */}
              {(selectedAlumnus.currentWorkplace || selectedAlumnus.higherStudies) && (
                <div className={`grid gap-4 font-mono text-xs ${
                  selectedAlumnus.currentWorkplace && selectedAlumnus.higherStudies 
                    ? "grid-cols-1 sm:grid-cols-2" 
                    : "grid-cols-1"
                }`}>
                  {selectedAlumnus.currentWorkplace && (
                    <div className="p-4 bg-white/5 border border-white/10">
                      <span className="text-[10px] text-zinc-400 uppercase block font-semibold">CURRENT WORKPLACE</span>
                      <span className="text-sm font-bold text-amber-400 block mt-1">{selectedAlumnus.currentWorkplace}</span>
                    </div>
                  )}

                  {selectedAlumnus.higherStudies && (
                    <div className="p-4 bg-white/5 border border-white/10">
                      <span className="text-[10px] text-zinc-400 uppercase block font-semibold">HIGHER STUDIES / ACADEMIC ROLE</span>
                      <span className="text-sm font-bold text-white block mt-1">
                        {selectedAlumnus.higherStudies}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Research Interests */}
              {selectedAlumnus.researchInterests && selectedAlumnus.researchInterests.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2 font-semibold">
                    Research & Technical Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAlumnus.researchInterests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-black border border-white/20 font-mono text-xs text-amber-300"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Biography / Statement */}
              {selectedAlumnus.aboutMe && selectedAlumnus.aboutMe.trim() && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2 font-semibold">
                    Alumnus Profile & Experience
                  </h4>
                  <div className="p-4 bg-black/60 border border-white/15 text-sm text-zinc-200 font-sans leading-relaxed">
                    "{selectedAlumnus.aboutMe}"
                  </div>
                </div>
              )}

              {/* Research Profiles */}
              {(selectedAlumnus.googleScholar || selectedAlumnus.researchGate) && (
                <div className="pt-2 flex flex-wrap gap-3">
                  {selectedAlumnus.googleScholar && (
                    <a
                      href={selectedAlumnus.googleScholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-mono text-xs font-bold uppercase hover:bg-amber-400 transition-colors"
                    >
                      <ExternalLink className="size-3.5" />
                      <span>View Google Scholar Profile</span>
                    </a>
                  )}

                  {selectedAlumnus.researchGate && (
                    <a
                      href={selectedAlumnus.researchGate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-teal-400 text-black font-mono text-xs font-bold uppercase hover:bg-white transition-colors"
                    >
                      <ExternalLink className="size-3.5" />
                      <span>View ResearchGate Profile</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setSelectedAlumnus(null)}
                className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
