"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Building2,
  BookOpen,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  LogOut,
  ArrowLeft,
  Sparkles,
  Link as LinkIcon,
  User,
  ShieldCheck,
  Tag
} from "lucide-react";
import { alumniData } from "@/data/alumniData";

export default function AlumniDashboardClient() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // Auth form states
  const [isRegistering, setIsRegistering] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [selectedAlumniClaim, setSelectedAlumniClaim] = useState(alumniData[0].id);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Profile editing form states
  const [profile, setProfile] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.authenticated && (data.user.role === "alumni" || data.user.role === "admin")) {
        setCurrentUser(data.user);
        loadAlumniProfile(data.user.alumniId);
      } else {
        setCurrentUser(null);
      }
    } catch {
      setCurrentUser(null);
    } finally {
      setLoadingSession(false);
    }
  };

  const loadAlumniProfile = async (alumniId?: string) => {
    try {
      const res = await fetch(`/api/alumni/profile${alumniId ? `?id=${alumniId}` : ""}`);
      const data = await res.json();
      if (data.success && data.profile) {
        setProfile(data.profile);
        setTagsInput((data.profile.research_interests || []).join(", "));
      } else {
        // Fallback to static seed matching alumniId
        const match = alumniData.find((a) => a.id === alumniId) || alumniData[0];
        setProfile({
          id: match.id,
          name: match.name,
          department: match.department,
          academic_session: match.academicSession,
          batch: match.batch,
          graduation_year: match.graduationYear,
          position_in_committee: match.positionInCommittee,
          current_workplace: match.currentWorkplace,
          higher_studies: match.higherStudies,
          research_interests: match.researchInterests,
          about_me: match.aboutMe,
          research_gate: match.researchGate,
          google_scholar: match.googleScholar,
          image: match.image,
        });
        setTagsInput((match.researchInterests || []).join(", "));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authEmail, password: authPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      setCurrentUser(data.user);
      loadAlumniProfile(data.user.alumniId);
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    const claimed = alumniData.find((a) => a.id === selectedAlumniClaim);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: authName || claimed?.name,
          email: authEmail,
          password: authPassword,
          role: "alumni",
          alumniId: selectedAlumniClaim,
          department: claimed?.department,
          batch: claimed?.batch,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      setCurrentUser(data.user);
      loadAlumniProfile(data.user.alumniId);
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setCurrentUser(null);
    setProfile(null);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    const splitInterests = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      const res = await fetch("/api/alumni/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: profile.id,
          name: profile.name,
          department: profile.department,
          academicSession: profile.academic_session,
          batch: profile.batch,
          graduationYear: profile.graduation_year,
          positionInCommittee: profile.position_in_committee,
          currentWorkplace: profile.current_workplace,
          higherStudies: profile.higher_studies,
          researchInterests: splitInterests,
          aboutMe: profile.about_me,
          researchGate: profile.research_gate,
          googleScholar: profile.google_scholar,
          image: profile.image,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      setProfile(data.profile);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setSaveError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center font-mono text-xs">
        <span>Loading Alumni Portal...</span>
      </div>
    );
  }

  // Not logged in -> Show Alumni Sign In & Claim Portal
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#070c18] border-2 border-amber-400 p-8 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <GraduationCap className="size-5 text-amber-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                ALUMNI PORTAL
              </span>
            </div>
            <Link href="/alumni" className="text-zinc-500 hover:text-white text-xs font-mono">
              ← Directory
            </Link>
          </div>

          <h2 className="font-heading text-2xl font-black uppercase text-white mb-2">
            {isRegistering ? "Register Alumni Account" : "Alumni Sign In"}
          </h2>
          <p className="text-xs text-zinc-400 font-sans mb-6">
            Log in to update your current workplace, higher studies research, publications, and bio on the ASRRO Distinguished Alumni Directory.
          </p>

          {authError && (
            <div className="mb-4 p-3 bg-red-950 border border-red-500/50 text-red-200 text-xs font-mono">
              {authError}
            </div>
          )}

          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4 font-mono text-xs">
            {isRegistering && (
              <>
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Claim Your Profile Record *</label>
                  <select
                    value={selectedAlumniClaim}
                    onChange={(e) => {
                      setSelectedAlumniClaim(e.target.value);
                      const match = alumniData.find((a) => a.id === e.target.value);
                      if (match) setAuthName(match.name);
                    }}
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  >
                    {alumniData.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.batch} - {a.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-zinc-400 uppercase mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="your.email@alumni.cuet.ac.bd"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase mb-1">Password *</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-2.5 bg-amber-400 hover:bg-white text-black font-black uppercase tracking-wider transition-colors cursor-pointer mt-2 disabled:opacity-50"
            >
              {authLoading ? "Authenticating..." : isRegistering ? "Claim & Register Account" : "Access Dashboard"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center font-mono text-xs">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setAuthError("");
                const first = alumniData[0];
                setSelectedAlumniClaim(first.id);
                setAuthName(first.name);
              }}
              className="text-zinc-400 hover:text-amber-400 transition-colors"
            >
              {isRegistering
                ? "Already claimed your account? Sign In"
                : "First time here? Register and claim your profile"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Logged in: Profile Editor
  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-amber-400 selection:text-black">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#060a14] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/alumni" className="flex items-center gap-2">
            <div className="size-8 bg-amber-400 text-black font-black flex items-center justify-center font-mono text-xs">
              AL
            </div>
            <span className="font-heading font-black text-lg text-white">ALUMNI DASHBOARD</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <Link
            href="/alumni"
            className="text-zinc-400 hover:text-amber-400 flex items-center gap-1.5"
          >
            <span>View Public Directory</span>
            <ExternalLink className="size-3" />
          </Link>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-white/10 hover:bg-red-950 border border-white/20 text-zinc-300 hover:text-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="size-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-amber-400 text-black font-mono text-[10px] font-black uppercase mb-2">
              PROFILE TELEMETRY NODE
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">
              Update Your Information
            </h1>
            <p className="text-xs text-zinc-400 font-sans mt-1">
              Changes saved here will immediately synchronize with the public ASRRO Alumni Directory.
            </p>
          </div>

          <Link
            href="/alumni"
            className="px-4 py-2 bg-white/10 hover:bg-white hover:text-black border border-white/20 font-mono text-xs uppercase font-bold transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Directory</span>
          </Link>
        </div>

        {saveSuccess && (
          <div className="mb-6 p-4 bg-emerald-950 border border-emerald-500/50 text-emerald-200 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
            <span>Profile successfully updated in Neon Database! Changes are live.</span>
          </div>
        )}

        {saveError && (
          <div className="mb-6 p-4 bg-red-950 border border-red-500/50 text-red-200 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="size-4 text-red-400 shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        {profile && (
          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Identity & Department */}
            <div className="p-6 bg-[#070c18] border border-white/15 space-y-4 font-mono text-xs">
              <h3 className="font-heading text-sm font-black uppercase tracking-wider text-amber-400 pb-2 border-b border-white/10 flex items-center gap-2">
                <User className="size-4" />
                <span>1. Academic & Identity Credentials</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name || ""}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Department</label>
                  <input
                    type="text"
                    value={profile.department || ""}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Batch</label>
                  <input
                    type="text"
                    value={profile.batch || ""}
                    onChange={(e) => setProfile({ ...profile, batch: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Academic Session</label>
                  <input
                    type="text"
                    value={profile.academic_session || ""}
                    onChange={(e) => setProfile({ ...profile, academic_session: e.target.value })}
                    placeholder="e.g. 2011–2015"
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Graduation Year</label>
                  <input
                    type="text"
                    value={profile.graduation_year || ""}
                    onChange={(e) => setProfile({ ...profile, graduation_year: e.target.value })}
                    placeholder="e.g. 2017"
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Past Committee Leadership</label>
                  <input
                    type="text"
                    value={profile.position_in_committee || ""}
                    onChange={(e) => setProfile({ ...profile, position_in_committee: e.target.value })}
                    placeholder="e.g. Former President / Vice President"
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Current Affiliation & Higher Studies */}
            <div className="p-6 bg-[#070c18] border border-white/15 space-y-4 font-mono text-xs">
              <h3 className="font-heading text-sm font-black uppercase tracking-wider text-amber-400 pb-2 border-b border-white/10 flex items-center gap-2">
                <Building2 className="size-4" />
                <span>2. Career & Higher Education</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Current Workplace / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. University of Texas at Austin / Walton PLC"
                    value={profile.current_workplace || ""}
                    onChange={(e) => setProfile({ ...profile, current_workplace: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Higher Studies / Graduate Program</label>
                  <input
                    type="text"
                    placeholder="e.g. PhD in Biomedical Engineering, UT Austin"
                    value={profile.higher_studies || ""}
                    onChange={(e) => setProfile({ ...profile, higher_studies: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Research & Biography */}
            <div className="p-6 bg-[#070c18] border border-white/15 space-y-4 font-mono text-xs">
              <h3 className="font-heading text-sm font-black uppercase tracking-wider text-amber-400 pb-2 border-b border-white/10 flex items-center gap-2">
                <Tag className="size-4" />
                <span>3. Research Focus & Biography</span>
              </h3>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">
                  Research Interests & Technical Focus (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Machine Learning, Soft Robotics, IoT, Power Systems"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                />
                <span className="text-[10px] text-zinc-500 font-mono block mt-1">
                  Separate multiple tags with commas (e.g. Robotics, AI, Drones).
                </span>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">About Me / Alumnus Statement</label>
                <textarea
                  rows={4}
                  placeholder="Share a brief overview of your journey, career achievements, and connection to ASRRO..."
                  value={profile.about_me || ""}
                  onChange={(e) => setProfile({ ...profile, about_me: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-white/20 text-white font-sans text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Scholarly Profiles */}
            <div className="p-6 bg-[#070c18] border border-white/15 space-y-4 font-mono text-xs">
              <h3 className="font-heading text-sm font-black uppercase tracking-wider text-amber-400 pb-2 border-b border-white/10 flex items-center gap-2">
                <LinkIcon className="size-4" />
                <span>4. Academic Gateway Links</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Google Scholar Profile URL</label>
                  <input
                    type="url"
                    placeholder="https://scholar.google.com/citations?user=..."
                    value={profile.google_scholar || ""}
                    onChange={(e) => setProfile({ ...profile, google_scholar: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">ResearchGate Profile URL</label>
                  <input
                    type="url"
                    placeholder="https://www.researchgate.net/profile/..."
                    value={profile.research_gate || ""}
                    onChange={(e) => setProfile({ ...profile, research_gate: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Save Action */}
            <div className="flex items-center justify-between pt-4">
              <span className="font-mono text-xs text-zinc-500">
                Email, phone, and LinkedIn remain strictly private per privacy policy.
              </span>

              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-3.5 bg-amber-400 hover:bg-white text-black font-mono text-xs font-black uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isSaving ? (
                  <span>Saving Updates...</span>
                ) : (
                  <>
                    <Save className="size-4" />
                    <span>Synchronize Profile</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
