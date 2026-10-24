"use client";

import React, { useEffect } from "react";
import { X, Play, Maximize2 } from "lucide-react";
import { GalleryItem } from "@/data/projectsData";

interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export default function GalleryLightbox({ item, onClose }: GalleryLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-zinc-950 border border-zinc-800 flex flex-col max-h-[92vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 bg-zinc-900/90 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-400 text-black font-bold uppercase text-[10px]">
              {item.category}
            </span>
            <span className="text-zinc-300 font-bold truncate max-w-xs sm:max-w-md">{item.title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
            title="Close (Esc)"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Media Canvas */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[280px] sm:min-h-[420px] max-h-[68vh] overflow-hidden">
          {item.type === "video" ? (
            <video
              src={item.src}
              controls
              autoPlay
              playsInline
              className="max-h-[68vh] w-auto max-w-full object-contain"
            />
          ) : (
            <img
              src={item.src}
              alt={item.title}
              className="max-h-[68vh] w-auto max-w-full object-contain"
            />
          )}
        </div>

        {/* Footer Details */}
        <div className="p-3.5 sm:p-4 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-sans">
          <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
            {item.caption}
          </p>
          <span className="text-[10px] font-mono text-zinc-400 shrink-0 uppercase tracking-widest bg-zinc-800 px-2 py-1">
            ASRRO ARCHIVE // LOG: {item.id}
          </span>
        </div>
      </div>
    </div>
  );
}
