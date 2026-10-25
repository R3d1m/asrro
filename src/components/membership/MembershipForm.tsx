"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Rocket, 
  CheckCircle2, 
  Send, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Radio, 
  Compass, 
  AlertCircle,
  HelpCircle,
  FileText
} from "lucide-react";

export default function MembershipForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    department: "Electrical & Electronic Engineering (EEE)",
    batch: "23",
    email: "",
    phone: "",
    subteam: "Sounding Rocketry & Aeropropulsion (STARLAP)",
    skills: "",
    motivation: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [applicationId, setApplicationId] = useState<number | null>(null);
  const [emailSent, setEmailSent] = useState<boolean | null>(null);
  const [emailMessage, setEmailMessage] = useState<string>("");

  const subteams = [
    {
      name: "Sounding Rocketry & Aeropropulsion (STARLAP)",
      desc: "Solid/hybrid rocket propulsion, aerodynamics, nozzle design, and Genesis sounding rocket launches.",
    },
    {
      name: "Autonomous UAVs & Counter-UAS (CUAS-UAV)",
      desc: "Autonomous drone flight controllers, RF spectrum tracking, computer vision, and air defense telemetry.",
    },
    {
      name: "Astrophotography & Space Science (ASRROSCOPE)",
      desc: "Newtonian reflector telescopes, deep-sky astrometry, planetary tracking, and celestial optics.",
    },
    {
      name: "Autonomous Planetary Robotics & Rovers",
      desc: "Rocker-bogie chassis mechanisms, ROS2 navigation, robotic manipulation, and rover autonomy.",
    },
    {
      name: "Avionics, Embedded IoT & Telemetry",
      desc: "ARM microcontrollers, LoRa 433MHz transceivers, PCB design, power management, and sensor buses.",
    },
    {
      name: "Software Architecture & Geospatial AI",
      desc: "Full-stack portals, edge computer vision, geospatial GIS mapping, and telemetry dashboards.",
    },
    {
      name: "Outreach, Media & Project Management",
      desc: "Sponsorships, press relations, brand identity, documentary videography, and mission logistics.",
    },
  ];

  const departments = [
    "Electrical & Electronic Engineering (EEE)",
    "Mechanical Engineering (ME)",
    "Computer Science & Engineering (CSE)",
    "Petroleum & Mining Engineering (PME)",
    "Civil Engineering (CE)",
    "Mechatronics Engineering (MTE)",
    "Biomedical Engineering (BME)",
    "Materials & Metallurgical Engineering (MME)",
    "Urban & Regional Planning (URP)",
    "Architecture",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/membership/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application.");
      }

      setApplicationId(data.applicationId);
      setEmailSent(Boolean(data.emailSent));
      setEmailMessage(data.emailMessage || "");
      setSubmitSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please verify your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[#070e14] text-white flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-[#0a1520] border-2 border-cyan-500/50 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 technical-grid opacity-20 pointer-events-none" />

          <div className="size-16 bg-cyan-500/10 border-2 border-cyan-500 flex items-center justify-center text-cyan-400 mb-6">
            <CheckCircle2 className="size-8" />
          </div>

          <div className="inline-block px-3 py-1 bg-cyan-500 text-black font-mono text-[10px] font-black uppercase tracking-widest mb-3">
            APPLICATION RECORDED #{applicationId || "OK"}
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            Application Telemetry Logged
          </h2>

          <p className="mt-3 text-sm text-zinc-300 font-sans leading-relaxed">
            Welcome, <strong>{formData.fullName}</strong>. Your recruitment submission has been securely written to the ASRRO Central Research Admissions Database.
          </p>

          <div className="mt-6 p-4 bg-black/70 border border-cyan-500/20 font-mono text-xs space-y-2">
            <div><span className="text-zinc-400">STUDENT ID:</span> <span className="text-cyan-400 font-bold">{formData.studentId}</span></div>
            <div><span className="text-zinc-400">DEPARTMENT:</span> <span className="text-white">{formData.department} (Batch '{formData.batch})</span></div>
            <div><span className="text-zinc-400">SUBTEAM:</span> <span className="text-white font-bold">{formData.subteam}</span></div>
            <div>
              <span className="text-zinc-400">AUTOMATED EMAIL:</span>{" "}
              {emailSent ? (
                <span className="text-emerald-400 font-bold">DISPATCHED TO {formData.email}</span>
              ) : (
                <span className="text-cyan-400 font-bold">QUEUED FOR COMMITTEE REVIEW NOTIFICATION</span>
              )}
            </div>
          </div>

          <div className="mt-6 p-4 bg-cyan-950/30 border border-cyan-500/30 text-xs text-zinc-300 font-mono space-y-1">
            <div className="text-cyan-400 font-bold flex items-center gap-1.5">
              <Sparkles className="size-3.5" />
              <span>WHAT HAPPENS NEXT?</span>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-300 pt-1">
              {emailSent
                ? "Check your inbox for your application receipt. You will receive an official recruitment decision email once the Executive Committee evaluates your dossier."
                : "Your dossier is currently logged for committee evaluation. You will receive an official decision email with interview & orientation guidelines upon approval."}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-cyan-500 hover:bg-white text-black font-mono text-xs font-black uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="size-4" />
              <span>Return to Portal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-amber-400 selection:text-black py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Ambience */}
      <div className="fixed inset-0 technical-grid opacity-15 pointer-events-none" />
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 blur-[160px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-400 hover:text-amber-400 transition-colors py-1.5 px-3 bg-white/5 border border-white/10"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Portal Home</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="border border-white/15 bg-[#060b18] p-6 sm:p-10 mb-8 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-black font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4">
            <Rocket className="size-3.5" />
            <span>RECRUITMENT PROTOCOL 2026–2027</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            Join the Research Fleet
          </h1>

          <p className="mt-3 text-sm text-zinc-300 font-sans leading-relaxed">
            Apply to engineer sounding rockets, autonomous drones, planetary rovers, and deep-space celestial trackers with the NASA Global Space Challenge World Champion organization at CUET.
          </p>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-amber-400" />
              <span>CUET Students Only</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Radio className="size-3.5 text-amber-400" />
              <span>Instant Confirmation Email</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu className="size-3.5 text-amber-400" />
              <span>Hands-on Lab Training</span>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-mono flex items-start gap-2.5">
            <AlertCircle className="size-4 shrink-0 text-red-400 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="border border-white/15 bg-[#070c18] p-6 sm:p-10 shadow-2xl space-y-6">
          {/* 1. Personal & Academic Credentials */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <FileText className="size-3.5" />
              <span>1. Academic Dossier</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvin Ahmed"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 text-sm font-sans text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Student ID <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2104001"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 text-sm font-mono text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Department <span className="text-amber-400">*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/20 text-sm font-sans text-white focus:outline-none focus:border-amber-400"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Academic Batch <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 23 or 24"
                  value={formData.batch}
                  onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 text-sm font-mono text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 2. Contact Communication Channels */}
          <div className="pt-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <Radio className="size-3.5" />
              <span>2. Communication Channels</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Email Address <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="u2104001@student.cuet.ac.bd"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 text-sm font-mono text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
                <span className="text-[10px] text-zinc-500 font-mono block mt-1">
                  Confirmation letter will be automatically dispatched here.
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  WhatsApp / Phone <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+8801XXXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 text-sm font-mono text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 3. Subteam Domain Selection */}
          <div className="pt-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <Compass className="size-3.5" />
              <span>3. Primary Subteam Preference</span>
            </h3>

            <div className="space-y-2.5">
              {subteams.map((team) => (
                <label
                  key={team.name}
                  className={`flex items-start gap-3 p-3.5 border transition-all cursor-pointer ${
                    formData.subteam === team.name
                      ? "bg-amber-400/10 border-amber-400 text-white"
                      : "bg-black/40 border-white/10 text-zinc-300 hover:border-white/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="subteam"
                    value={team.name}
                    checked={formData.subteam === team.name}
                    onChange={(e) => setFormData({ ...formData, subteam: e.target.value })}
                    className="mt-1 accent-amber-400"
                  />
                  <div>
                    <span className="font-heading font-black text-sm uppercase block text-white">
                      {team.name}
                    </span>
                    <span className="text-xs text-zinc-400 font-sans block mt-0.5 leading-relaxed">
                      {team.desc}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Skills & Statement */}
          <div className="pt-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <Cpu className="size-3.5" />
              <span>4. Technical Background & Motivation</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Technical Skills, Software & Hardware Experience
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. C/C++, Python, SolidWorks, Altium/EasyEDA, Arduino, OpenCV, React, Drone Piloting, 3D Printing..."
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 text-sm font-sans text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Why do you wish to join ASRRO?
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your passion for space, rocketry, or robotics and what you hope to build or accomplish with our research teams..."
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-white/20 text-sm font-sans text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] font-mono text-zinc-400">
              By submitting, your application will be reviewed by the Executive Committee.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-white text-black font-mono text-xs font-black uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Transmitting Dossier...</span>
              ) : (
                <>
                  <span>Transmit Application</span>
                  <Send className="size-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
