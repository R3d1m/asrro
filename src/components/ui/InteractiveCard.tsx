"use client";

import React, { useRef, useState } from "react";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "amber" | "monochrome";
  reticles?: boolean;
}

export default function InteractiveCard({
  children,
  className = "",
  glowColor = "cyan",
  reticles = true,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Calculate rotation (-6deg to +6deg for sharp architectural feel)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -5.5;
    const rotY = ((x - centerX) / centerX) * 5.5;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setMousePos({ x: -1000, y: -1000 });
  };

  const glowStyle =
    glowColor === "cyan"
      ? "rgba(2, 132, 199, 0.08)"
      : glowColor === "amber"
      ? "rgba(217, 119, 6, 0.09)"
      : "rgba(0, 0, 0, 0.05)";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={`group relative transition-transform duration-200 ease-out ${className}`}
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`
            : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transition: isHovered ? "transform 0.08s ease-out" : "transform 0.5s ease-out",
        }}
        className="relative size-full bg-white border border-zinc-300 group-hover:border-black transition-colors duration-200"
      >
        {/* Dynamic Cursor Spotlight Sheen */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
            style={{
              background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, ${glowStyle}, transparent 70%)`,
            }}
          />
        )}

        {/* Sharp Corner Reticles (+) */}
        {reticles && (
          <>
            <span className="pointer-events-none absolute -top-2.5 -left-2.5 z-30 font-mono text-xs font-bold text-zinc-900 group-hover:text-sky-600 transition-colors">
              +
            </span>
            <span className="pointer-events-none absolute -top-2.5 -right-2.5 z-30 font-mono text-xs font-bold text-zinc-900 group-hover:text-sky-600 transition-colors">
              +
            </span>
            <span className="pointer-events-none absolute -bottom-2.5 -left-2.5 z-30 font-mono text-xs font-bold text-zinc-900 group-hover:text-sky-600 transition-colors">
              +
            </span>
            <span className="pointer-events-none absolute -bottom-2.5 -right-2.5 z-30 font-mono text-xs font-bold text-zinc-900 group-hover:text-sky-600 transition-colors">
              +
            </span>
          </>
        )}

        {children}
      </div>
    </div>
  );
}
