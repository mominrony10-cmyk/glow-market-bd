"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  GridIcon,
  ShoppingBag01Icon,
  UserIcon,
  GiftIcon,
  ArrowRight01Icon,
  Database01Icon,
} from "@hugeicons/core-free-icons";
import { supabase } from "../lib/supabase";
import { useApp } from "../context/AppContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  const { isDbConnected } = useApp();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const localAdmin = localStorage.getItem("admin_session");
      if (localAdmin === "sandbox") {
        setIsAdmin(true);
        return;
      }

      if (!isDbConnected) {
        setIsAdmin(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (profile?.role === "admin" || session.user.email === "admin@glowmarketbd.com") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        setIsAdmin(false);
      }
    };
    
    checkAuth();
  }, [isDbConnected]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    if (email !== "admin@glowmarketbd.com") {
      setAuthError("Access denied: Invalid administrator email.");
      setAuthLoading(false);
      return;
    }

    if (!isDbConnected) {
      if (password === "admin") {
        localStorage.setItem("admin_session", "sandbox");
        setIsAdmin(true);
      } else {
        setAuthError("Incorrect password. In local sandbox mode, use password: admin");
      }
      setAuthLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message === "Invalid login credentials" ? "Invalid email or password." : authError.message);
      }

      if (authData.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", authData.user.id)
          .single();

        if (profile?.role === "admin" || authData.user.email === "admin@glowmarketbd.com") {
          if (!profile) {
            await supabase.from("profiles").upsert({
              id: authData.user.id,
              email: authData.user.email,
              role: "admin"
            });
          }
          setIsAdmin(true);
        } else {
          await supabase.auth.signOut();
          throw new Error("Forbidden: You do not have admin privileges.");
        }
      }
    } catch (err: any) {
      setAuthError(err.message || "An authentication error occurred.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("admin_session");
    if (isDbConnected) {
      try {
        await supabase.auth.signOut();
      } catch (err) {}
    }
    setIsAdmin(false);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: "Overview", path: "/admin", icon: Home01Icon },
    { name: "Products", path: "/admin/products", icon: GridIcon },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag01Icon },
    { name: "Customers", path: "/admin/customers", icon: UserIcon },
    { name: "Campaigns", path: "/admin/campaigns", icon: GiftIcon },
    { name: "Database", path: "/admin/database", icon: Database01Icon },
  ];

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-[#FF1A58] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest animate-pulse">
          Authenticating Admin Session...
        </span>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden border border-zinc-100">
          {/* Decorative gradients */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-rose-300/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-[#FF1A58]/10 blur-3xl" />

          {/* Logo Header */}
          <div className="text-center mt-6 mb-8 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#FCE1E4] flex items-center justify-center shadow-xs mb-4">
              <span className="text-[11px] font-black tracking-wider text-zinc-900 font-serif leading-none">GLOW</span>
            </div>
            <h2 className="text-3.5xl font-black text-zinc-950 font-serif tracking-tight">
              Admin Portal
            </h2>
            <p className="text-xs font-black tracking-widest text-[#FF1A58] opacity-90 mt-1.5 uppercase">
              Operations Control Panel
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="flex flex-col gap-5">
            {authError && (
              <div className="bg-rose-50 text-rose-600 border border-rose-100 rounded-xl px-4 py-3 text-xs font-bold text-left leading-relaxed">
                ⚠️ {authError}
              </div>
            )}

            <div>
              <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@glowmarketbd.com"
                className="w-full bg-zinc-100/75 hover:bg-zinc-100 focus:bg-white border-none rounded-2xl px-4 py-3.5 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-rose-200 mt-1.5 transition-all font-semibold"
              />
            </div>

            <div>
              <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-100/75 hover:bg-zinc-100 focus:bg-white border-none rounded-2xl px-4 py-3.5 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-rose-200 mt-1.5 transition-all font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-gradient-to-r from-[#FF1A58] to-[#e11d48] hover:from-[#e11d48] hover:to-[#be185d] text-white font-extrabold text-sm uppercase py-4 rounded-2xl shadow-[0_4px_20px_rgba(255,26,88,0.3)] transition-all duration-300 cursor-pointer text-center mt-3 active:scale-98 disabled:opacity-50"
            >
              {authLoading ? "Verifying Credentials..." : "Authenticate"}
            </button>
          </form>

          {/* Fallback indicator */}
          {!isDbConnected && (
            <div className="mt-6 text-center border-t border-zinc-100 pt-6">
              <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-100 font-bold px-3 py-1.5 rounded-full inline-block">
                ⚠️ Local Sandbox Fallback
              </span>
              <p className="text-[9px] text-zinc-400 font-semibold mt-2 leading-relaxed">
                Database not connected. Log in with email <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-600 font-bold">admin@glowmarketbd.com</code> and password: <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-600 font-bold">admin</code>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-800 flex font-sans select-none antialiased">
      
      {/* 1. Sidebar Container (Desktop View) */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-zinc-200/80 flex-col justify-between shrink-0 sticky top-0 h-screen z-40 select-none">
        <div className="flex flex-col">
          {/* Brand header */}
          <div className="p-8 border-b border-zinc-200/80 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FF1A58] flex items-center justify-center font-black text-white text-base shadow-sm">
                G
              </div>
              <span className="font-extrabold text-lg text-zinc-900 tracking-tight">
                Glow<span className="text-[#FF1A58]">Console</span>
              </span>
            </Link>
            <span className="text-[10px] font-black uppercase text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md">
              v1.0
            </span>
          </div>

          {/* Nav links */}
          <nav className="p-6 flex flex-col gap-2">
            {navItems.map((item) => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-[#FF1A58] text-white font-bold shadow-lg shadow-[#FF1A58]/15"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <HugeiconsIcon icon={item.icon} size={18} />
                    <span className="text-sm font-semibold tracking-wide">{item.name}</span>
                  </div>
                  {active && (
                    <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="text-white" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card with Logout */}
        <div className="p-6 border-t border-zinc-200/80 bg-zinc-50/30 flex items-center justify-between gap-3 select-text">
          <div className="flex items-center gap-3 truncate">
            <div className="w-10 h-10 rounded-xl bg-[#FF1A58]/10 border border-[#FF1A58]/20 flex items-center justify-center font-bold text-[#FF1A58] shrink-0 text-sm">
              AD
            </div>
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold text-zinc-900 leading-tight">Admin Console</span>
              <span className="text-[10px] text-zinc-500 font-semibold mt-0.5 truncate">admin@glowmarketbd.com</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-zinc-400 hover:text-rose-500 cursor-pointer p-1.5 hover:bg-rose-50 rounded-xl transition-all shrink-0"
            title="Log Out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </div>
      </aside>

      {/* 2. Main Area Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navbar */}
        <header className="bg-white border-b border-zinc-200/80 py-4 px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 select-none">
          <div className="flex items-center gap-4">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden w-10 h-10 rounded-xl bg-zinc-50 hover:bg-zinc-100 items-center justify-center text-zinc-700 border border-zinc-200 cursor-pointer shadow-sm"
            >
              ☰
            </button>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Storefront Hub</span>
              <span className="text-base font-black text-zinc-900 leading-tight">Operations Panel</span>
            </div>
          </div>

          <div className="flex items-center gap-4 select-text">
            {/* Clock Widget */}
            <div className="hidden sm:flex items-center gap-2 bg-zinc-50 border border-zinc-200/60 rounded-xl px-3 py-1.5 text-xs text-zinc-600 font-semibold select-none">
              <span>⏰ {timeStr || "10:55 PM"}</span>
            </div>
            
            {/* Outlet link */}
            <Link
              href="/"
              className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-[#FF1A58] hover:border-[#FF1A58]/20 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>View Site</span>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex lg:hidden select-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="bg-white w-72 h-full flex flex-col justify-between shadow-2xl relative border-r border-zinc-200/80 animate-slide-right"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col">
                <div className="p-6 border-b border-zinc-200/80 flex items-center justify-between">
                  <span className="font-extrabold text-lg text-zinc-900">GlowConsole</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-zinc-50 text-zinc-500 hover:text-zinc-900 flex items-center justify-center cursor-pointer border border-zinc-200"
                  >
                    ✕
                  </button>
                </div>
                
                <nav className="p-4 flex flex-col gap-1">
                  {navItems.map((item) => {
                    const active = pathname === item.path;
                    return (
                      <Link
                        key={item.name}
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all cursor-pointer ${
                          active
                            ? "bg-[#FF1A58] text-white font-bold"
                            : "text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <HugeiconsIcon icon={item.icon} size={18} />
                          <span className="text-sm font-semibold">{item.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6 border-t border-zinc-200/80 bg-zinc-50/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 truncate">
                  <div className="w-8 h-8 rounded-lg bg-[#FF1A58]/10 flex items-center justify-center font-bold text-[#FF1A58] text-xs shrink-0">
                    AD
                  </div>
                  <span className="text-xs font-semibold text-zinc-500 truncate">admin@glowmarketbd.com</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-zinc-400 hover:text-rose-500 cursor-pointer p-1 rounded-lg hover:bg-rose-50 transition-all shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4.5 h-4.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. Page Content Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto min-h-0 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto w-full select-text animate-fade-in">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
