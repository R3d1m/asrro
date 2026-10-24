"use client";

import React from "react";
import { Newspaper, ArrowUpRight } from "lucide-react";
import InteractiveCard from "../ui/InteractiveCard";
import SmartImage from "../ui/SmartImage";

export default function MediaPress() {
  const pressItems = [
    {
      outlet: "THE DAILY STAR",
      title: "CUET's Team ASRRO Clinches World Championship in Global Space Challenge 2025",
      date: "NATIONAL DAILY",
      localImage: "/images/press/daily-star.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1000&q=80",
      excerpt: "Demonstrating groundbreaking aerospace engineering and scoring 499.8 out of 500, Chittagong University of Engineering & Technology students clinch top global honors under NASA patronage.",
      url: "https://thedailystar.net",
    },
    {
      outlet: "PROTHOM ALO",
      title: "চুয়েটের শিক্ষার্থীদের তৈরি প্রথম সাউন্ডিং রকেট ‘স্টারল্যাপ’",
      date: "LEADING DAILY",
      localImage: "/images/press/prothom-alo.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80",
      excerpt: "অ্যান্ড্রোমিডা স্পেস অ্যান্ড রোবোটিক্স রিসার্চ অর্গানাইজেশনের একদল তরুণ প্রকৌশলী তৈরি করেছেন নিজস্ব সলিড প্রোপেলান্ট নির্ভর সাউন্ডিং রকেট।",
      url: "https://prothomalo.com",
    },
    {
      outlet: "CUET PRESS COMMUNIQUE",
      title: "Vice-Chancellor Commends ASRRO's International Aerospace Milestones",
      date: "OFFICIAL BULLETIN",
      localImage: "/images/press/cuet-bulletin.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
      excerpt: "University administration pledges sustained laboratory infrastructure backing and testing ground clearance for student rocketry and autonomous rover teams.",
      url: "#",
    },
  ];

  return (
    <section id="press" className="pt-8 pb-8 sm:pt-12 sm:pb-12 px-4 sm:px-8 lg:px-12 bg-white border-b border-black scroll-mt-20">
      <div className="max-w-[90rem] mx-auto">
        {/* Centered Section Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3.5 mx-auto">
            <Newspaper className="size-3.5 text-sky-400" />
            <span>PUBLICITY & RECOGNITION</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase text-center">
            In The Headlines
          </h2>

          <p className="mt-3 text-zinc-600 text-xs sm:text-sm md:text-base font-sans max-w-xl mx-auto text-center leading-relaxed">
            Widely covered across mainstream national dailies, television broadcasts, and scientific portals.
          </p>

          {/* Clean Architectural Accent Divider */}
          <div className="w-16 h-0.5 bg-black mx-auto mt-5" />
        </div>

        {/* Sharp Square Cards with Rich Press Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pressItems.map((item, idx) => (
            <InteractiveCard key={idx} glowColor="cyan" className="h-full">
              <div className="flex flex-col justify-between h-full bg-white">
                {/* News Photo Frame */}
                <div className="relative h-48 w-full overflow-hidden border-b border-zinc-200">
                  <SmartImage
                    localSrc={item.localImage}
                    fallbackSrc={item.fallbackImage}
                    alt={item.title}
                    className="size-full object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 bg-black text-white font-mono text-[10px] font-black uppercase px-2.5 py-1">
                    {item.outlet}
                  </div>

                  <div className="absolute bottom-3 right-3 font-mono text-[10px] text-zinc-300 uppercase tracking-widest bg-black/80 px-2 py-0.5">
                    {item.date}
                  </div>
                </div>

                {/* News Details */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-heading text-xl font-black text-black uppercase leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs text-zinc-600 leading-relaxed font-sans line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-500 uppercase">PRESS DESK</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-black group-hover:text-sky-600 flex items-center gap-1 transition-colors"
                    >
                      <span>Read Clipping</span>
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </InteractiveCard>

            
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center">
            <a
              href="/news"
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-black font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors"
            >
              <span>Full Press Archive</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
      </div>
    </section>
  );
}
