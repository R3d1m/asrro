"use client";

import React from "react";

export default function StatsStrip() {
  const stats = [
    {
      value: "499.8",
      suffix: "/500",
      label: "WORLD CHAMPION SCORE",
      sub: "NASA Global Space Challenge '25",
      accent: "amber",
    },
    {
      value: "1ST",
      suffix: "",
      label: "SOUNDING ROCKET IN CUET",
      sub: "STARLAP Genesis-I Airframe",
      accent: "cyan",
    },
    {
      value: "3,000",
      suffix: "+",
      label: "ENGINEERING IMPACT",
      sub: "Students Reached in Workshops",
      accent: "black",
    },
    {
      value: "12",
      suffix: "+",
      label: "COMPETITION HONORS",
      sub: "National & Global Laurels",
      accent: "amber",
    },
    {
      value: "04",
      suffix: "",
      label: "ACTIVE DIVISIONS",
      sub: "Rocket, Rover, Optics, CubeSat",
      accent: "cyan",
    },
  ];

  return (
    <section className="border-b border-black bg-zinc-50">
      <div className="mx-auto max-w-[90rem] grid grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-zinc-300">
        {stats.map((s, idx) => {
          const valueColor =
            s.accent === "amber"
              ? "text-amber-800"
              : s.accent === "cyan"
              ? "text-sky-700"
              : "text-black";

          return (
            <div
              key={idx}
              className="p-6 sm:p-8 bg-white hover:bg-zinc-50 transition-colors group relative"
            >
              <span className="pointer-events-none absolute top-2 right-2 font-mono text-[9px] text-zinc-400">
                0{idx + 1}
              </span>
              <p className={`font-heading text-4xl sm:text-5xl font-black tracking-[-.04em] ${valueColor}`}>
                <span>{s.value}</span>
                {s.suffix && <span className="text-xl font-mono text-zinc-400 ml-1">{s.suffix}</span>}
              </p>
              <p className="mt-3 font-mono text-[10px] tracking-[.2em] text-zinc-900 uppercase font-black">
                {s.label}
              </p>
              <p className="text-[11px] text-zinc-500 font-sans mt-1">
                {s.sub}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
