"use client";

import React from "react";
import Link from "next/link";
import { 
  Rocket, 
  MapPin, 
  Mail, 
  ArrowUpRight,
  Radio
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-white border-t-2 border-black text-zinc-600 font-sans">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-zinc-300">
          {/* Col 1 & 2: Branding & Affiliation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-11 flex items-center justify-center shrink-0">
                <img 
                  src="/images/asrrologo.png" 
                  alt="ASRRO Logo" 
                  className="size-full object-contain" 
                />
              </div>
              <div>
                <span className="font-heading font-black text-2xl text-black tracking-tight uppercase">ASRRO</span>
                <span className="ml-2 text-xs font-mono text-zinc-900 bg-zinc-100 border border-zinc-300 px-2 py-0.5 font-bold">
                  CUET
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-700 leading-relaxed max-w-sm font-sans">
              <strong className="text-black font-semibold">Andromeda Space and Robotics Research Organization</strong>
            </p>

            <div className="space-y-2 pt-2 text-xs font-mono text-zinc-600">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-black shrink-0" />
                <span>CUET Campus, Raozan, Chattogram-4349, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-black shrink-0" />
                <a href="mailto:asrro@cuet.ac.bd" className="hover:text-black hover:underline transition-colors">Executive Office: asrro@cuet.ac.bd</a>
              </div>
            </div>
          </div>

          {/* Col 3: Research Fleet */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-black font-black mb-4">
              // CURRENT PROJECTS
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a href="#fleet" className="hover:text-black transition-colors block">
                  STARLAP
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-black transition-colors block">
                  ASRROSCOPE
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-black transition-colors block">
                  SUAS Drone
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-black transition-colors block">
                  Project ORION CubeSat
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Organization */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-black font-black mb-4">
              // ORGANIZATION
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/#fleet" className="hover:text-black transition-colors block">
                  Research Fleet
                </Link>
              </li>
              <li>
                <Link href="/#achievements" className="hover:text-black transition-colors block">
                  World Champion Accolades
                </Link>
              </li>
              <li>
                <Link href="/#committee" className="hover:text-black transition-colors block">
                  Executive Committee 2026–2027
                </Link>
              </li>
              <li>
                <Link href="/alumni" className="text-black font-bold hover:text-cyan-700 transition-colors block flex items-center gap-1.5">
                  <span>Distinguished Alumni</span>
                  <span className="text-[9px] bg-cyan-500 text-black px-1.5 py-0.2 font-black uppercase">New</span>
                </Link>
              </li>
              <li>
                <Link href="/#press" className="hover:text-black transition-colors block">
                  News & Press Coverage
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-zinc-500 hover:text-black transition-colors block text-[11px]">
                  Committee Terminal (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Telemetry Node */}
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <p>© 2026 ANDROMEDA SPACE & ROBOTICS RESEARCH ORGANIZATION (ASRRO) · CUET.</p>
          <div className="flex items-center gap-6">
            <a href="https://facebook.com/asrro2012" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              FACEBOOK
            </a>
            <a href="https://linkedin.com/company/andromeda-space-robotics-research-organization/" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              LINKEDIN
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              YOUTUBE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
