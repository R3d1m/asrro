"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  Newspaper,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Trash2,
  ExternalLink,
  Shield,
  LogOut,
  Sparkles,
  Search,
  Filter,
  Eye,
  X,
  FileText,
  Radio,
  Send,
  ArrowLeft,
  ChevronRight,
  GraduationCap
} from "lucide-react";

interface Application {
  id: number;
  full_name: string;
  student_id: string;
  department: string;
  batch: string;
  email: string;
  phone: string;
  subteam: string;
  skills: string;
  motivation: string;
  status: "pending" | "approved" | "rejected";
  review_notes?: string;
  reviewed_by?: string;
  created_at: string;
}

interface NewsItem {
  id: number;
  title: string;
  source: string;
  url: string;
  date: string;
  snippet: string;
  image_url: string;
  category: string;
  created_by?: string;
}

interface EventItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  registration_link: string;
  image_url: string;
  status: string;
  created_by?: string;
}

export default function AdminPortalClient() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<"applications" | "news" | "events">("applications");

  // Auth form states
  const [isRegistering, setIsRegistering] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authDept, setAuthDept] = useState("Mechanical Engineering");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Applications state
  const [applications, setApplications] = useState<Application[]>([]);
  const [appFilter, setAppFilter] = useState<string>("all");
  const [appSearch, setAppSearch] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [updatingApp, setUpdatingApp] = useState(false);

  // News CMS state
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [newsForm, setNewsForm] = useState({
    title: "",
    source: "",
    url: "",
    date: new Date().toISOString().split("T")[0],
    snippet: "",
    imageUrl: "",
    category: "National Press",
  });
  const [creatingNews, setCreatingNews] = useState(false);

  // Events CMS state
  const [eventsList, setEventsList] = useState<EventItem[]>([]);
  const [eventForm, setEventForm] = useState({
    title: "",
    category: "Technical Workshop",
    date: "",
    time: "",
    venue: "CUET Campus, ME Seminar Hall",
    description: "",
    registrationLink: "",
    imageUrl: "",
  });
  const [creatingEvent, setCreatingEvent] = useState(false);

  // Check auth on mount
  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.authenticated && (data.user.role === "committee" || data.user.role === "admin")) {
        setCurrentUser(data.user);
        loadDashboardData();
      } else {
        setCurrentUser(null);
      }
    } catch {
      setCurrentUser(null);
    } finally {
      setAuthChecking(false);
    }
  };

  const loadDashboardData = () => {
    fetchApplications();
    fetchNews();
    fetchEvents();
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/membership/applications");
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications || []);
      }
    } catch (err) {
      console.error("Failed to load applications:", err);
    }
  };

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.success) {
        setNewsList(data.news || []);
      }
    } catch (err) {
      console.error("Failed to load news:", err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (data.success) {
        setEventsList(data.events || []);
      }
    } catch (err) {
      console.error("Failed to load events:", err);
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
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.user.role !== "committee" && data.user.role !== "admin") {
        throw new Error("This portal is restricted to Executive Committee members.");
      }

      setCurrentUser(data.user);
      loadDashboardData();
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

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: authName,
          email: authEmail,
          password: authPassword,
          role: "committee",
          department: authDept,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setCurrentUser(data.user);
      loadDashboardData();
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setCurrentUser(null);
  };

  const handleStatusUpdate = async (id: number, status: "approved" | "rejected") => {
    setUpdatingApp(true);
    try {
      const res = await fetch("/api/membership/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, reviewNotes }),
      });

      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status, review_notes: reviewNotes } : app))
        );
        if (selectedApp?.id === id) {
          setSelectedApp((prev) => (prev ? { ...prev, status, review_notes: reviewNotes } : null));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingApp(false);
    }
  };

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingNews(true);

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsForm),
      });

      const data = await res.json();
      if (data.success) {
        setNewsList([data.newsItem, ...newsList]);
        setNewsForm({
          title: "",
          source: "",
          url: "",
          date: new Date().toISOString().split("T")[0],
          snippet: "",
          imageUrl: "",
          category: "National Press",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCreatingNews(false);
    }
  };

  const handleDeleteNews = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;

    try {
      const res = await fetch(`/api/news?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setNewsList(newsList.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingEvent(true);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventForm),
      });

      const data = await res.json();
      if (data.success) {
        setEventsList([data.event, ...eventsList]);
        setEventForm({
          title: "",
          category: "Technical Workshop",
          date: "",
          time: "",
          venue: "CUET Campus, ME Seminar Hall",
          description: "",
          registrationLink: "",
          imageUrl: "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCreatingEvent(false);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`/api/events?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setEventsList(eventsList.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered applications list
  const filteredApps = applications.filter((app) => {
    if (appFilter !== "all" && app.status !== appFilter) return false;
    if (appSearch.trim() !== "") {
      const q = appSearch.toLowerCase();
      const matches =
        app.full_name.toLowerCase().includes(q) ||
        app.student_id.toLowerCase().includes(q) ||
        app.department.toLowerCase().includes(q) ||
        app.subteam.toLowerCase().includes(q) ||
        app.email.toLowerCase().includes(q);
      if (!matches) return false;
    }
    return true;
  });

  const pendingCount = applications.filter((a) => a.status === "pending").length;
  const approvedCount = applications.filter((a) => a.status === "approved").length;

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center font-mono text-xs">
        <div className="flex items-center gap-3">
          <Clock className="size-4 animate-spin text-amber-400" />
          <span>Verifying Committee Security Tokens...</span>
        </div>
      </div>
    );
  }

  // Not logged in -> Show Committee Login & Registration Gate
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#070c18] border-2 border-amber-400 p-8 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-amber-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                COMMITTEE GATEWAY
              </span>
            </div>
            <Link href="/" className="text-zinc-500 hover:text-white text-xs font-mono">
              ← Portal
            </Link>
          </div>

          <h2 className="font-heading text-2xl font-black uppercase text-white mb-2">
            {isRegistering ? "Executive Member Signup" : "Committee Terminal"}
          </h2>
          <p className="text-xs text-zinc-400 font-sans mb-6">
            Authorized portal for ASRRO Executive Committee members to manage recruitment admissions, press news, and events.
          </p>

          {authError && (
            <div className="mb-4 p-3 bg-red-950 border border-red-500/50 text-red-200 text-xs font-mono">
              {authError}
            </div>
          )}

          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4 font-mono text-xs">
            {isRegistering && (
              <div>
                <label className="block text-zinc-400 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Faria Anowara Adhora"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            )}

            <div>
              <label className="block text-zinc-400 uppercase mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="committee@asrrocuetbd.org"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-zinc-400 uppercase mb-1">Password</label>
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
              {authLoading ? "Authenticating..." : isRegistering ? "Create Committee Account" : "Access Terminal"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center font-mono text-xs">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setAuthError("");
              }}
              className="text-zinc-400 hover:text-amber-400 transition-colors"
            >
              {isRegistering
                ? "Already have committee credentials? Sign In"
                : "First-time committee member? Register here"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Logged in Committee Dashboard
  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-amber-400 selection:text-black">
      {/* Top Telemetry Control Bar */}
      <header className="border-b border-white/10 bg-[#060a14] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 bg-amber-400 text-black font-black flex items-center justify-center font-mono text-xs">
              EC
            </div>
            <span className="font-heading font-black text-lg text-white">ASRRO TERMINAL</span>
          </Link>

          <span className="hidden sm:inline font-mono text-[10px] bg-white/10 text-amber-400 px-2 py-0.5 border border-white/20 uppercase font-bold">
            {currentUser.role}
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="text-right hidden sm:block">
            <span className="text-white font-bold block">{currentUser.name}</span>
            <span className="text-[10px] text-zinc-400 block">{currentUser.email}</span>
          </div>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-white/10 hover:bg-red-900/60 border border-white/20 hover:border-red-500 text-zinc-300 hover:text-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="size-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Metric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 font-mono">
          <div className="p-4 bg-white/5 border border-white/10">
            <span className="text-[10px] text-zinc-400 uppercase block font-semibold">APPLICATIONS</span>
            <span className="text-2xl font-black text-amber-400 block mt-1">{applications.length}</span>
            <span className="text-[10px] text-amber-300/80 mt-1 block font-bold">{pendingCount} Pending Review</span>
          </div>

          <div className="p-4 bg-white/5 border border-white/10">
            <span className="text-[10px] text-zinc-400 uppercase block font-semibold">APPROVED RECRUITS</span>
            <span className="text-2xl font-black text-emerald-400 block mt-1">{approvedCount}</span>
            <span className="text-[10px] text-zinc-500 mt-1 block">Active Onboarding</span>
          </div>

          <div className="p-4 bg-white/5 border border-white/10">
            <span className="text-[10px] text-zinc-400 uppercase block font-semibold">PRESS RELEASES</span>
            <span className="text-2xl font-black text-white block mt-1">{newsList.length}</span>
            <span className="text-[10px] text-zinc-500 mt-1 block">Live on Portal</span>
          </div>

          <div className="p-4 bg-white/5 border border-white/10">
            <span className="text-[10px] text-zinc-400 uppercase block font-semibold">PUBLISHED EVENTS</span>
            <span className="text-2xl font-black text-cyan-400 block mt-1">{eventsList.length}</span>
            <span className="text-[10px] text-zinc-500 mt-1 block">Workshops & Launches</span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/15 mb-8 font-mono text-xs">
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-5 py-3 border-b-2 font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer ${
              activeTab === "applications"
                ? "border-amber-400 text-amber-400 bg-white/5"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <Users className="size-4" />
            <span>Recruitment Admissions ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("news")}
            className={`px-5 py-3 border-b-2 font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer ${
              activeTab === "news"
                ? "border-amber-400 text-amber-400 bg-white/5"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <Newspaper className="size-4" />
            <span>Press & News CMS ({newsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("events")}
            className={`px-5 py-3 border-b-2 font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer ${
              activeTab === "events"
                ? "border-amber-400 text-amber-400 bg-white/5"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <Calendar className="size-4" />
            <span>Events Manager ({eventsList.length})</span>
          </button>
        </div>

        {/* TAB 1: MEMBERSHIP APPLICATIONS */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 font-mono text-xs">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search by student ID, name, subteam..."
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-black border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Status:</span>
                {["all", "pending", "approved", "rejected"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setAppFilter(st)}
                    className={`px-2.5 py-1 uppercase text-[11px] font-bold border cursor-pointer ${
                      appFilter === st
                        ? "bg-amber-400 text-black border-amber-400"
                        : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Applications Table */}
            {filteredApps.length === 0 ? (
              <div className="p-12 text-center border border-white/10 bg-white/5 font-mono text-xs text-zinc-400">
                No recruitment applications found under this filter.
              </div>
            ) : (
              <div className="border border-white/15 overflow-x-auto bg-[#060b18]">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-black/80 border-b border-white/15 text-zinc-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Applicant</th>
                      <th className="p-3.5">Student ID</th>
                      <th className="p-3.5">Department & Batch</th>
                      <th className="p-3.5">Preferred Subteam</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredApps.map((app) => (
                      <tr key={app.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5">
                          <span className="text-white font-bold block">{app.full_name}</span>
                          <span className="text-[10px] text-zinc-400 block">{app.email}</span>
                        </td>
                        <td className="p-3.5 text-amber-400 font-bold">{app.student_id}</td>
                        <td className="p-3.5 text-zinc-300">
                          {app.department} <span className="text-zinc-500">(' {app.batch})</span>
                        </td>
                        <td className="p-3.5 text-zinc-200">{app.subteam}</td>
                        <td className="p-3.5">
                          <span
                            className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase ${
                              app.status === "approved"
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-500/50"
                                : app.status === "rejected"
                                ? "bg-red-950 text-red-300 border border-red-500/50"
                                : "bg-amber-950 text-amber-300 border border-amber-500/50"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setReviewNotes(app.review_notes || "");
                            }}
                            className="px-3 py-1 bg-amber-400 hover:bg-white text-black font-black uppercase text-[10px] transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            <Eye className="size-3" />
                            <span>Review</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRESS & NEWS CMS */}
        {activeTab === "news" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create News Form */}
            <div className="lg:col-span-1 border border-white/15 bg-[#060b18] p-6 h-fit">
              <h3 className="font-heading text-lg font-black uppercase text-white mb-4 flex items-center gap-2">
                <Plus className="size-4 text-amber-400" />
                <span>Publish Press News</span>
              </h3>

              <form onSubmit={handleCreateNews} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Headline / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ASRRO Genesis-I Achieves Supersonic Apogee"
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Source / Publication *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Daily Star / Prothom Alo"
                    value={newsForm.source}
                    onChange={(e) => setNewsForm({ ...newsForm, source: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Source Link (URL) *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://thedailystar.net/news/..."
                    value={newsForm.url}
                    onChange={(e) => setNewsForm({ ...newsForm, url: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-zinc-400 uppercase mb-1">Date *</label>
                    <input
                      type="date"
                      required
                      value={newsForm.date}
                      onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 uppercase mb-1">Category</label>
                    <select
                      value={newsForm.category}
                      onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="National Press">National Press</option>
                      <option value="International Recognition">International</option>
                      <option value="Space Challenge">Space Challenge</option>
                      <option value="Rocketry Milestone">Rocketry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Cover Image URL</label>
                  <input
                    type="text"
                    placeholder="/images/press/dailystar.jpg"
                    value={newsForm.imageUrl}
                    onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Article Snippet *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Summary of the newspaper coverage..."
                    value={newsForm.snippet}
                    onChange={(e) => setNewsForm({ ...newsForm, snippet: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={creatingNews}
                  className="w-full py-2.5 bg-amber-400 hover:bg-white text-black font-black uppercase tracking-wider transition-colors cursor-pointer mt-2 disabled:opacity-50"
                >
                  {creatingNews ? "Broadcasting..." : "Publish to Portal"}
                </button>
              </form>
            </div>

            {/* Existing News List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-heading text-lg font-black uppercase text-white mb-4">
                Published News & Media ({newsList.length})
              </h3>

              {newsList.length === 0 ? (
                <div className="p-8 text-center border border-white/10 bg-white/5 font-mono text-xs text-zinc-400">
                  No news items published yet. Fill out the form to broadcast media releases.
                </div>
              ) : (
                <div className="space-y-3">
                  {newsList.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-[#060b18] border border-white/15 hover:border-white/30 flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-mono text-[10px]">
                          <span className="text-amber-400 font-bold uppercase">{item.source}</span>
                          <span className="text-zinc-500">•</span>
                          <span className="text-zinc-400">{item.date}</span>
                          <span className="px-1.5 py-0.2 bg-white/10 text-zinc-300 border border-white/20">
                            {item.category}
                          </span>
                        </div>

                        <h4 className="font-heading text-base font-black text-white">{item.title}</h4>
                        <p className="text-xs text-zinc-300 font-sans line-clamp-2">{item.snippet}</p>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:underline pt-1"
                        >
                          <span>Open Source Article</span>
                          <ExternalLink className="size-3" />
                        </a>
                      </div>

                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        className="p-2 bg-red-950/60 border border-red-500/40 text-red-300 hover:bg-red-900 transition-colors cursor-pointer shrink-0"
                        title="Delete News Article"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: EVENTS MANAGER */}
        {activeTab === "events" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Event Form */}
            <div className="lg:col-span-1 border border-white/15 bg-[#060b18] p-6 h-fit">
              <h3 className="font-heading text-lg font-black uppercase text-white mb-4 flex items-center gap-2">
                <Plus className="size-4 text-amber-400" />
                <span>Create New Event</span>
              </h3>

              <form onSubmit={handleCreateEvent} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Event Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Genesis Sounding Rocket Hot-Fire"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-zinc-400 uppercase mb-1">Date *</label>
                    <input
                      type="date"
                      required
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 uppercase mb-1">Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 03:00 PM BST"
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Category</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Technical Workshop">Technical Workshop</option>
                    <option value="Rocket Launch">Rocket Launch</option>
                    <option value="Stargazing Session">Stargazing Night</option>
                    <option value="Hackathon">Competition / Hackathon</option>
                    <option value="Recruitment Orientation">Orientation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Venue / Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CUET Central Ground / ME Lab"
                    value={eventForm.venue}
                    onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Registration Link (URL)</label>
                  <input
                    type="url"
                    placeholder="https://forms.gle/... or internal"
                    value={eventForm.registrationLink}
                    onChange={(e) => setEventForm({ ...eventForm, registrationLink: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Event Description *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe mission scope, eligibility, and equipment..."
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-white/20 text-white focus:outline-none focus:border-amber-400 font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={creatingEvent}
                  className="w-full py-2.5 bg-amber-400 hover:bg-white text-black font-black uppercase tracking-wider transition-colors cursor-pointer mt-2 disabled:opacity-50"
                >
                  {creatingEvent ? "Scheduling..." : "Schedule Event"}
                </button>
              </form>
            </div>

            {/* Existing Events List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-heading text-lg font-black uppercase text-white mb-4">
                Scheduled Events ({eventsList.length})
              </h3>

              {eventsList.length === 0 ? (
                <div className="p-8 text-center border border-white/10 bg-white/5 font-mono text-xs text-zinc-400">
                  No upcoming events scheduled. Create a workshop or stargazing session.
                </div>
              ) : (
                <div className="space-y-3">
                  {eventsList.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-[#060b18] border border-white/15 hover:border-white/30 flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                          <span className="px-2 py-0.5 bg-amber-400 text-black font-bold uppercase">
                            {item.category}
                          </span>
                          <span className="text-zinc-300 font-bold">{item.date}</span>
                          {item.time && <span className="text-zinc-400">@ {item.time}</span>}
                          <span className="text-zinc-500">•</span>
                          <span className="text-zinc-400">{item.venue}</span>
                        </div>

                        <h4 className="font-heading text-lg font-black text-white">{item.title}</h4>
                        <p className="text-xs text-zinc-300 font-sans">{item.description}</p>

                        {item.registration_link && (
                          <a
                            href={item.registration_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:underline pt-1"
                          >
                            <span>Registration Portal</span>
                            <ExternalLink className="size-3" />
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteEvent(item.id)}
                        className="p-2 bg-red-950/60 border border-red-500/40 text-red-300 hover:bg-red-900 transition-colors cursor-pointer shrink-0"
                        title="Delete Event"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Review Dossier Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#070c18] border-2 border-amber-400 p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <span className="font-mono text-xs text-amber-400 font-bold uppercase">
                RECRUIT DOSSIER #{selectedApp.id}
              </span>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="font-heading text-2xl font-black uppercase text-white">
                  {selectedApp.full_name}
                </h2>
                <div className="mt-1 flex flex-wrap gap-2 font-mono text-xs text-zinc-400">
                  <span>ID: <strong className="text-white">{selectedApp.student_id}</strong></span>
                  <span>•</span>
                  <span>Dept: <strong className="text-white">{selectedApp.department}</strong></span>
                  <span>•</span>
                  <span>Batch '{selectedApp.batch}</span>
                </div>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 font-mono text-xs space-y-1">
                <div><span className="text-zinc-400">Email:</span> <a href={`mailto:${selectedApp.email}`} className="text-amber-400 underline">{selectedApp.email}</a></div>
                <div><span className="text-zinc-400">Phone:</span> <a href={`tel:${selectedApp.phone}`} className="text-white">{selectedApp.phone}</a></div>
                <div><span className="text-zinc-400">Assigned Subteam:</span> <span className="text-white font-bold">{selectedApp.subteam}</span></div>
              </div>

              {selectedApp.skills && (
                <div>
                  <h4 className="font-mono text-xs uppercase text-zinc-400 mb-1 font-bold">Skills & Tools</h4>
                  <p className="text-xs text-zinc-200 font-sans bg-black/60 p-3 border border-white/10 whitespace-pre-wrap">
                    {selectedApp.skills}
                  </p>
                </div>
              )}

              {selectedApp.motivation && (
                <div>
                  <h4 className="font-mono text-xs uppercase text-zinc-400 mb-1 font-bold">Statement of Motivation</h4>
                  <p className="text-xs text-zinc-200 font-sans bg-black/60 p-3 border border-white/10 whitespace-pre-wrap">
                    {selectedApp.motivation}
                  </p>
                </div>
              )}

              <div>
                <label className="block font-mono text-xs uppercase text-zinc-400 mb-1 font-bold">
                  Committee Review Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Optional interview schedule notes or review feedback..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/20 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="font-mono text-xs">
                  Current Status:{" "}
                  <strong className="uppercase text-amber-400">{selectedApp.status}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={updatingApp}
                    onClick={() => handleStatusUpdate(selectedApp.id, "rejected")}
                    className="px-4 py-2 bg-red-950 hover:bg-red-900 border border-red-500/50 text-red-200 font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
                  >
                    Reject
                  </button>

                  <button
                    disabled={updatingApp}
                    onClick={() => handleStatusUpdate(selectedApp.id, "approved")}
                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-black uppercase transition-colors cursor-pointer"
                  >
                    Approve Recruit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
