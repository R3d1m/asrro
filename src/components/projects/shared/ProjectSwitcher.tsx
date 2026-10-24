"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { allProjectsList } from "@/data/projectsData";

interface ProjectSwitcherProps {
  currentSlug: string;
  theme?: "dark" | "light" | "tactical" | "cyber";
}

export default function ProjectSwitcher({ currentSlug, theme = "light" }: ProjectSwitcherProps) {
  const currentIndex = allProjectsList.findIndex((p) => p.slug === currentSlug);
  const prevProject = allProjectsList[(currentIndex - 1 + allProjectsList.length) % allProjectsList.length];
  const nextProject = allProjectsList[(currentIndex + 1) % allProjectsList.length];

  const isDark = theme === "dark" || theme === "tactical";

  return (
    <section className={`py-12 px-4 sm:px-8 border-t ${
      isDark ? "bg-black border-zinc-800 text-white" : "bg-zinc-100 border-black text-black"
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-dashed border-zinc-700">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            // FLEET NAVIGATION // BROWSE OTHER MISSIONS
          </span>
          <Link
            href="/#fleet"
            className="font-mono text-xs font-bold text-amber-500 hover:underline flex items-center gap-1"
          >
            <span>VIEW ALL FLEET MISSIONS</span>
            <ExternalLink className="size-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Previous Mission */}
          <Link
            href={`/projects/${prevProject.slug}`}
            className={`group p-4 sm:p-5 border transition-all duration-300 flex items-center justify-between gap-4 ${
              isDark 
                ? "bg-zinc-900 border-zinc-800 hover:border-amber-400 hover:bg-zinc-850" 
                : "bg-white border-black hover:bg-zinc-50 shadow-sm"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-10 sm:size-12 shrink-0 bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400 group-hover:-translate-x-1 transition-transform">
                <ArrowLeft className="size-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  PREVIOUS MISSION [{prevProject.code}]
                </span>
                <h4 className="font-heading text-sm sm:text-base font-black uppercase truncate group-hover:text-amber-500 transition-colors">
                  {prevProject.title}
                </h4>
                <p className="text-[11px] text-zinc-500 truncate">{prevProject.category}</p>
              </div>
            </div>
          </Link>

          {/* Next Mission */}
          <Link
            href={`/projects/${nextProject.slug}`}
            className={`group p-4 sm:p-5 border transition-all duration-300 flex items-center justify-between gap-4 text-right ${
              isDark 
                ? "bg-zinc-900 border-zinc-800 hover:border-amber-400 hover:bg-zinc-850" 
                : "bg-white border-black hover:bg-zinc-50 shadow-sm"
            }`}
          >
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                NEXT MISSION [{nextProject.code}]
              </span>
              <h4 className="font-heading text-sm sm:text-base font-black uppercase truncate group-hover:text-amber-500 transition-colors">
                {nextProject.title}
              </h4>
              <p className="text-[11px] text-zinc-500 truncate">{nextProject.category}</p>
            </div>
            <div className="size-10 sm:size-12 shrink-0 bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="size-5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
