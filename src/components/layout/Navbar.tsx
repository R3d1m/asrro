"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Rocket, 
  Menu, 
  X, 
  ArrowUpRight,
  Radio,
  Trophy,
  GraduationCap
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname() || "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Projects", href: "/#fleet" },
    // { label: "Events", href: "#about" },
    { label: "Achievements", href: "/#achievements" },
    { label: "Committee", href: "/#committee" },
    { label: "Media & Press", href: "/#press" },
    { label: "Alumni", href: "/alumni" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-zinc-200 text-black shadow-xs"
          : "bg-[#030712]/60 backdrop-blur-md border-b border-white/10 text-white"
      }`}
    >
      {/* Main Bar with Sharp Architecture */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logotype */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-11 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <img 
              src="/images/asrrologo.png" 
              alt="ASRRO Logo" 
              className="size-full object-contain" 
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                className={`font-heading font-black text-xl tracking-tight transition-colors ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                ASRRO
              </span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 font-bold transition-colors ${
                  isScrolled
                    ? "bg-zinc-100 border border-zinc-300 text-zinc-900"
                    : "bg-white/10 border border-white/20 text-amber-400"
                }`}
              >
                CUET
              </span>
            </div>
            {/* <span
              className={`text-[10px] font-mono uppercase tracking-wider leading-none mt-0.5 transition-colors ${
                isScrolled ? "text-zinc-500" : "text-zinc-400"
              }`}
            >
              CUET
            </span> */}
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs uppercase tracking-wider">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-4 py-2 transition-colors border ${
                isScrolled
                  ? "text-zinc-700 hover:text-black hover:bg-zinc-100 border-transparent hover:border-zinc-200"
                  : "text-zinc-300 hover:text-white hover:bg-white/10 border-transparent hover:border-white/20"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/alumni"
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider border transition-all ${
              pathname.startsWith("/alumni")
                ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : isScrolled
                  ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500 hover:text-black"
                  : "bg-white/10 text-white border-white/20 hover:bg-cyan-500 hover:text-black hover:border-cyan-400"
            }`}
          >
            <GraduationCap className="size-3.5" />
            <span>Alumni</span>
          </Link>

          <Link
            href="/join"
            className={`inline-flex items-center gap-2 px-4.5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
              isScrolled
                ? "bg-black text-white hover:bg-zinc-800"
                : "bg-amber-500 text-black hover:bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)]"
            }`}
          >
            <span>Join</span>
            <ArrowUpRight className="size-3.5" />
          </Link>

          <a
            href="mailto:contact@asrrocuetbd.org"
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
              isScrolled
                ? "bg-white text-zinc-900 border border-zinc-300 hover:border-black hover:bg-zinc-50"
                : "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40"
            }`}
          >
            <span>Contact</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2.5 border transition-colors focus:outline-none ${
            isScrolled
              ? "bg-zinc-100 border-zinc-300 text-zinc-900"
              : "bg-white/10 border-white/20 text-white"
          }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden px-4 pt-3 pb-6 border-b shadow-xl ${
            isScrolled
              ? "bg-white border-zinc-300 text-black"
              : "bg-[#030712]/95 backdrop-blur-xl border-white/15 text-white"
          }`}
        >
          <div className="flex flex-col space-y-1 font-mono text-xs uppercase tracking-wider">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 border-b transition-colors ${
                  isScrolled
                    ? "text-zinc-800 hover:bg-zinc-100 hover:text-black border-zinc-100"
                    : "text-zinc-200 hover:bg-white/10 hover:text-white border-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Link
                href="/alumni"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center justify-center gap-2 py-3 font-mono text-xs font-bold uppercase tracking-wider border ${
                  pathname.startsWith("/alumni")
                    ? "bg-cyan-500 text-black border-cyan-400"
                    : isScrolled
                      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/40"
                      : "bg-white/10 text-white border-white/20 hover:border-cyan-400 hover:text-cyan-400"
                }`}
              >
                <GraduationCap className="size-3.5" />
                <span>Distinguished Alumni</span>
              </Link>
              <Link
                href="/join"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center justify-center gap-2 py-3 font-mono text-xs font-bold uppercase tracking-wider ${
                  isScrolled
                    ? "bg-black text-white"
                    : "bg-amber-500 text-black"
                }`}
              >
                <span>Join ASRRO Fleet</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 font-mono text-[11px] text-zinc-400 hover:text-white uppercase tracking-wider"
              >
                <span>Committee Terminal</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
