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
} from "@hugeicons/core-free-icons";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("");

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
  ];

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

        {/* User Card */}
        <div className="p-6 border-t border-zinc-200/80 bg-zinc-50/30 flex items-center gap-3 select-text">
          <div className="w-10 h-10 rounded-xl bg-[#FF1A58]/10 border border-[#FF1A58]/20 flex items-center justify-center font-bold text-[#FF1A58] shrink-0 text-sm">
            AD
          </div>
          <div className="flex flex-col truncate">
            <span className="text-sm font-bold text-zinc-900 leading-tight">Admin Console</span>
            <span className="text-[10px] text-zinc-500 font-semibold mt-0.5 truncate">admin@glowmarketbd.com</span>
          </div>
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

              <div className="p-6 border-t border-zinc-200/80 bg-zinc-50/30 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF1A58]/10 flex items-center justify-center font-bold text-[#FF1A58] text-xs">
                  AD
                </div>
                <span className="text-xs font-semibold text-zinc-500">admin@glowmarketbd.com</span>
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
