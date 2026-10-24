"use client";

import React, { useEffect, useRef, useState } from "react";

interface StarParticle {
  radius: number;
  angle: number;
  armIndex: number;
  randomX: number;
  randomY: number;
  randomZ: number;
  speed: number;
  size: number;
  baseAlpha: number;
  colorType: "core" | "arm" | "halo" | "dust" | "satellite";
  pulseOffset: number;
  pulseSpeed: number;
  vx: number;
  vy: number;
}

export default function AndromedaGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [telemetry, setTelemetry] = useState({
    cursorX: 0,
    cursorY: 0,
    particles: 10500,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = parent?.clientWidth || window.innerWidth;
      const displayHeight = parent?.clientHeight || window.innerHeight;

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
      return { width: displayWidth, height: displayHeight };
    };

    let { width, height } = updateDimensions();

    // 3D Parallax & Fluid Mouse Tracking
    let targetPitch = 0;
    let targetYaw = 0;
    let currentPitch = 0;
    let currentYaw = 0;

    let mouseCanvasX = -1000;
    let mouseCanvasY = -1000;
    let prevMouseX = -1000;
    let prevMouseY = -1000;
    let mouseSpeedX = 0;
    let mouseSpeedY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouseCanvasX = clientX;
      mouseCanvasY = clientY;

      mouseSpeedX = clientX - prevMouseX;
      mouseSpeedY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      targetPitch = (clientY / height - 0.5) * 0.55;
      targetYaw = (clientX / width - 0.5) * 0.75;

      setTelemetry((prev) => ({
        ...prev,
        cursorX: Math.round(clientX),
        cursorY: Math.round(clientY),
      }));
    };

    const handleMouseLeave = () => {
      mouseCanvasX = -1000;
      mouseCanvasY = -1000;
      targetPitch = 0;
      targetYaw = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      const dims = updateDimensions();
      width = dims.width;
      height = dims.height;
    };

    window.addEventListener("resize", handleResize);

    // -------------------------------------------------------------
    // Full-Bleed Logarithmic Spiral Galaxy (M31 Andromeda)
    // -------------------------------------------------------------
    const starCount = 10500;
    const branches = 2; // Andromeda dominant dual spiral branches
    const spin = 1.55;
    const randomnessPower = 3.5;
    const maxRadius = Math.max(width, height) * 0.55;
    const coreRadius = maxRadius * 0.14;

    const stars: StarParticle[] = [];

    for (let i = 0; i < starCount; i++) {
      const isCore = i < starCount * 0.22;
      const isSatellite = !isCore && i < starCount * 0.27; // M32 & M110 dwarf clusters
      const isDust = !isCore && !isSatellite && i < starCount * 0.48;

      let r: number;
      let angle: number;
      let armIndex = 0;
      let colorType: StarParticle["colorType"] = "arm";
      let size = Math.random() * 1.6 + 0.4;
      let speed: number;

      if (isCore) {
        // High density central galactic bulge
        r = Math.pow(Math.random(), 2.2) * coreRadius;
        angle = Math.random() * Math.PI * 2;
        colorType = "core";
        size = Math.random() * 2.2 + 0.6;
        speed = (0.0018 / (r * 0.02 + 1)) * (Math.random() * 0.4 + 0.8);
      } else if (isSatellite) {
        // M32 (compact dwarf) & M110 (elongated dwarf)
        const isM32 = Math.random() < 0.5;
        const satDist = isM32 ? maxRadius * 0.45 : maxRadius * 0.85;
        const satBaseAngle = isM32 ? 1.05 : -1.75;
        const satSpread = isM32 ? 35 : 65;

        r = satDist + (Math.random() - 0.5) * satSpread;
        angle = satBaseAngle + (Math.random() - 0.5) * 0.35;
        colorType = "satellite";
        size = Math.random() * 1.4 + 0.4;
        speed = 0.0002;
      } else {
        // Logarithmic spiral arms
        armIndex = i % branches;
        const branchAngle = (armIndex / branches) * Math.PI * 2;
        r = coreRadius + Math.pow(Math.random(), 0.92) * (maxRadius - coreRadius);
        const spinAngle = (r / maxRadius) * spin * Math.PI;
        angle = branchAngle + spinAngle;

        colorType = isDust ? "dust" : "arm";
        size = isDust ? Math.random() * 2.2 + 0.8 : Math.random() * 1.5 + 0.4;
        speed = (0.0007 / Math.pow(r / coreRadius, 0.46)) * (Math.random() * 0.3 + 0.85);
      }

      const dispersionFactor = (r / maxRadius) * 0.35 + 0.05;
      const rx = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * dispersionFactor * maxRadius;
      const rz = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * dispersionFactor * maxRadius;
      const ry = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * 32;

      stars.push({
        radius: r,
        angle,
        armIndex,
        randomX: rx,
        randomY: ry,
        randomZ: rz,
        speed,
        size,
        baseAlpha: Math.random() * 0.8 + 0.2,
        colorType,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        vx: 0,
        vy: 0,
      });
    }

    let time = 0;
    // Andromeda true inclination angle is 77.5°
    const m31Inclination = (77.5 * Math.PI) / 180;
    const cosInc = Math.cos(m31Inclination);
    const sinInc = Math.sin(m31Inclination);

    // Orientation angle
    const positionAngle = -0.38;
    const cosPos = Math.cos(positionAngle);
    const sinPos = Math.sin(positionAngle);

    const render = () => {
      time += 1;

      // Eased mouse tilt
      currentPitch += (targetPitch - currentPitch) * 0.05;
      currentYaw += (targetYaw - currentYaw) * 0.05;

      const centerX = width * 0.5;
      const centerY = height * 0.45;

      // Deep space background fill
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, width, height);

      // 1. Radiant Accretion Core Glow (Glowing Amber / Solar Orange & Cyan Halo)
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius * 2.4);
      coreGradient.addColorStop(0, "rgba(251, 191, 36, 0.75)");   // Brilliant warm gold
      coreGradient.addColorStop(0.18, "rgba(245, 158, 11, 0.55)"); // Radiant solar amber
      coreGradient.addColorStop(0.42, "rgba(217, 119, 6, 0.35)");  // Deep amber
      coreGradient.addColorStop(0.65, "rgba(14, 165, 233, 0.15)"); // Electric cyan ionized rim
      coreGradient.addColorStop(0.88, "rgba(2, 132, 199, 0.03)");
      coreGradient.addColorStop(1, "transparent");

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(positionAngle + currentYaw * 0.25);
      ctx.scale(1, cosInc + currentPitch * 0.15);
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Faint Astrometric Orbital Calibration Wireframe Grid
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(positionAngle + currentYaw * 0.25);
      ctx.scale(1, cosInc + currentPitch * 0.15);
      ctx.strokeStyle = "rgba(14, 165, 233, 0.12)";
      ctx.lineWidth = 0.8;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius * 2.6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(245, 158, 11, 0.08)";
      ctx.beginPath();
      ctx.arc(0, 0, maxRadius * 0.6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.beginPath();
      ctx.arc(0, 0, maxRadius * 0.95, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 3. Render 10,500 Luminous Particle Stars with Fluid Cursor Wake
      const effectiveCosInc = cosInc + currentPitch * 0.18;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Orbit update
        star.angle += star.speed;

        // Polar disk coords
        const diskX = Math.cos(star.angle) * star.radius + star.randomX;
        const diskZ = Math.sin(star.angle) * star.radius + star.randomZ;
        const diskY = star.randomY;

        // 3D inclination
        const tiltedY = diskY * effectiveCosInc - diskZ * sinInc;
        const tiltedZ = diskY * sinInc + diskZ * effectiveCosInc;

        // Position angle rotation
        const rotatedX = diskX * cosPos - tiltedY * sinPos;
        const rotatedY = diskX * sinPos + tiltedY * cosPos;

        // 3D perspective projection
        const fov = 850;
        const scale = fov / (fov + tiltedZ * 0.35);

        let screenX = centerX + rotatedX * scale + star.vx;
        let screenY = centerY + rotatedY * scale + star.vy;

        // Cursor Kinetic Wake / Fluid Perturbation
        if (mouseCanvasX > 0 && mouseCanvasY > 0) {
          const dx = screenX - mouseCanvasX;
          const dy = screenY - mouseCanvasY;
          const distSq = dx * dx + dy * dy;
          const influenceRadius = 85;

          if (distSq < influenceRadius * influenceRadius && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / influenceRadius) * 2.8;
            star.vx += (dx / dist) * force + mouseSpeedX * 0.1;
            star.vy += (dy / dist) * force + mouseSpeedY * 0.1;
          }
        }

        // Dampen velocity back to zero
        star.vx *= 0.92;
        star.vy *= 0.92;

        if (screenX < -20 || screenX > width + 20 || screenY < -20 || screenY > height + 20) {
          continue;
        }

        const pulse = Math.sin(time * star.pulseSpeed + star.pulseOffset) * 0.25 + 0.75;
        const currentAlpha = Math.min(1, Math.max(0.1, star.baseAlpha * pulse * scale));
        const renderedSize = Math.max(0.5, star.size * scale);

        // Luminous Deep Space Color Palette
        if (star.colorType === "core") {
          // Warm solar amber / gold core stars
          if (i % 3 === 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.95})`; // Brilliant white center
          } else {
            ctx.fillStyle = `rgba(245, 158, 11, ${currentAlpha * 0.9})`;  // Solar amber
          }
        } else if (star.colorType === "dust") {
          // Faint interstellar dust filaments
          ctx.fillStyle = `rgba(14, 165, 233, ${currentAlpha * 0.35})`;
        } else if (star.colorType === "satellite") {
          // Dwarf companion galaxies M32 / M110
          ctx.fillStyle = `rgba(251, 191, 36, ${currentAlpha * 0.85})`;
        } else {
          // Outer spiral arms: mix of electric cyan O/B giants & pure white starlight
          if (i % 4 === 0) {
            ctx.fillStyle = `rgba(14, 165, 233, ${currentAlpha * 0.9})`; // Electric cyan
          } else if (i % 7 === 0) {
            ctx.fillStyle = `rgba(245, 158, 11, ${currentAlpha * 0.85})`; // Amber stellar cluster
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.8})`; // White starlight
          }
        }

        ctx.beginPath();
        ctx.arc(screenX, screenY, renderedSize, 0, Math.PI * 2);
        ctx.fill();

        // Pinpoint diffraction spike for brightest giant stars
        if (renderedSize > 1.6 && star.colorType === "arm" && i % 6 === 0) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(screenX - 4, screenY);
          ctx.lineTo(screenX + 4, screenY);
          ctx.moveTo(screenX, screenY - 4);
          ctx.lineTo(screenX, screenY + 4);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 size-full overflow-hidden select-none pointer-events-auto">
      <canvas ref={canvasRef} className="size-full block cursor-crosshair" />

      {/* Deep-space edge vignettes to maintain high contrast and atmosphere */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#030712] via-[#030712]/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent" />
    </div>
  );
}
