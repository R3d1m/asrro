"use client";

import React, { useRef, useEffect } from "react";

export default function AndromedaVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay muted allowed
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 size-full overflow-hidden bg-[#030712] flex items-center justify-center pointer-events-none select-none">
      {/* Galaxy Video with Soft Elliptical Alpha Feather Mask */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/videos/andromeda_thumb.jpg"
        className="h-[140vh] sm:h-[155vh] lg:h-[165vh] w-auto max-w-[95vw] object-contain aspect-[720/1280]"
        style={{
          maskImage: "radial-gradient(ellipse 46% 36% at 50% 50%, black 25%, rgba(0,0,0,0.88) 50%, rgba(0,0,0,0.35) 75%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 46% 36% at 50% 50%, black 25%, rgba(0,0,0,0.88) 50%, rgba(0,0,0,0.35) 75%, transparent 100%)",
        }}
      >
        <source src="/andromeda.mp4" type="video/mp4" />
        <source src="/videos/andromeda.mp4" type="video/mp4" />
      </video>

      {/* Multi-layered Soft Deep-Space Blending Overlays */}
      {/* 1. Global Radial Feather */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(3,7,18,0.45)_55%,#030712_82%)] z-[2]" />

      {/* 2. Left side black melt */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 sm:w-64 lg:w-96 bg-gradient-to-r from-[#030712] via-[#030712]/90 to-transparent z-[2]" />
      
      {/* 3. Right side black melt */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 sm:w-64 lg:w-96 bg-gradient-to-l from-[#030712] via-[#030712]/90 to-transparent z-[2]" />

      {/* 4. Top edge navbar melt */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-44 bg-gradient-to-b from-[#030712] via-[#030712]/80 to-transparent z-[2]" />

      {/* 5. Bottom edge section melt */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent z-[2]" />
    </div>
  );
}
