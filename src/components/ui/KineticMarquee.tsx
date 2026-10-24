"use client";

import React from "react";

interface MarqueeItem {
  text: string;
  badge?: string;
  accent?: "cyan" | "amber" | "black";
}

interface KineticMarqueeProps {
  items: MarqueeItem[];
  direction?: "left" | "right";
  speedClass?: string;
  className?: string;
}

export default function KineticMarquee({
  items,
  direction = "left",
  className = "",
}: KineticMarqueeProps) {
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-zinc-200 bg-white py-3.5 select-none ${className}`}
    >
      <div className={animClass}>
        {/* Render twice for seamless loop */}
        {[...items, ...items].map((item, idx) => {
          const badgeColor =
            item.accent === "amber"
              ? "bg-amber-100 text-amber-800 border-amber-300"
              : item.accent === "cyan"
              ? "bg-sky-100 text-sky-800 border-sky-300"
              : "bg-zinc-100 text-zinc-900 border-zinc-300";

          return (
            <div key={idx} className="flex items-center gap-6 px-6 shrink-0">
              <span className="font-heading font-black text-sm tracking-tight text-black uppercase">
                {item.text}
              </span>

              {item.badge && (
                <span
                  className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 border ${badgeColor}`}
                >
                  {item.badge}
                </span>
              )}

              <span className="text-zinc-300 font-mono text-xs">///</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
