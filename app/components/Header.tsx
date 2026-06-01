"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  UserIcon,
  FavouriteIcon,
  ShoppingBag01Icon,
  WhatsappIcon,
  Camera01Icon,
} from "@hugeicons/core-free-icons";
import { useApp } from "../context/AppContext";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const {
    cartCount,
    wishlist,
    searchQuery,
    setSearchQuery,
    setToastMessage,
    setShowCartDrawer,
  } = useApp();

  const pathname = usePathname();
  const router = useRouter();
  const isAdminOrDashboard = pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard");

  if (isAdminOrDashboard) {
    return null;
  }

  return (
    <>
      {/* SECTOR 1: ANNOUNCEMENT BAR (TOP NOTICE - SINGLE LINE RESPONSIVE AND ALIGNED WITH MATCHING PAGE WIDTH) */}
      <div className="w-full bg-[#FF1A58] text-white py-2 select-none z-50 relative border-b border-[#e11d48]/10 text-xs md:text-sm font-medium">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-2.5 min-h-[36px] md:min-h-[40px]">
          {/* Notice text */}
          <div className="text-left font-bold text-[11px] md:text-[15px] tracking-wide truncate">
            {/* Mobile View Text */}
            <span className="block md:hidden">আপগ্রেড চলছে – সমস্যা হলে WhatsApp করুন</span>
            {/* Desktop View Text */}
            <span className="hidden md:block">আমাদের ওয়েবসাইট আপগ্রেড করা হচ্ছে – কোনো সমস্যা হলে WhatsApp-এ যোগাযোগ করুন।</span>
          </div>
          
          {/* WhatsApp pill button on right */}
          <div className="shrink-0 flex items-center">
            {/* Mobile View WhatsApp Button */}
            <a
              href="https://api.whatsapp.com/send?phone=8801952190142"
              target="_blank"
              rel="noopener noreferrer"
              className="flex md:hidden items-center gap-1 bg-white text-gray-900 px-3 py-1 rounded-full shadow-xs transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <HugeiconsIcon icon={WhatsappIcon} size={14} color="#25D366" />
              <span className="text-[10px] font-black text-zinc-900">Chat</span>
            </a>

            {/* Desktop View WhatsApp Button */}
            <a
              href="https://api.whatsapp.com/send?phone=8801952190142"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 bg-white text-gray-900 px-4.5 py-1.5 rounded-full shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <HugeiconsIcon icon={WhatsappIcon} size={17} color="#25D366" />
              <span className="text-[12.5px] font-black text-zinc-900">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* SECTOR 2: MAIN HEADER ROW */}
      <header className="w-full bg-white border-b border-zinc-100 py-4 px-4 sm:px-6 sticky top-0 z-40 shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo Audited (Exact circular pastel pink and elegant serif design matching user uploaded image) */}
          <div className="flex items-center gap-2 select-none shrink-0">
            <a href="/" className="flex items-center gap-2.5 group select-none">
              {/* Circular Soft Pastel Pink Brand Logo Badge matching user logo */}
              <div className="w-[45px] h-[45px] rounded-full bg-[#FCE1E4] border border-[#f8c5cb]/40 flex items-center justify-center shadow-xs select-none shrink-0 group-hover:scale-105 active:scale-95 transition-all duration-300 relative">
                <div className="flex flex-col items-center justify-center text-center leading-none mt-0.5">
                  <span className="text-[7.5px] font-extrabold tracking-wider text-zinc-900 font-serif uppercase">GLOW</span>
                  <span className="text-[6px] font-bold tracking-wide text-zinc-900 font-serif uppercase mt-0.5">MARKET</span>
                  <span className="text-[6.5px] font-extrabold tracking-widest text-[#FF1A58] font-serif uppercase mt-0.5">BD</span>
                  <div className="w-5 h-[0.5px] bg-zinc-900/40 mt-1" />
                </div>
              </div>

              {/* Text side in luxury matching serif style */}
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-base sm:text-[17px] font-bold tracking-wide text-zinc-950 font-serif leading-none group-hover:text-[#FF1A58] transition-colors duration-300">
                    Glow Market <span className="text-[#FF1A58]">BD</span>
                  </h1>
                </div>
                <span className="text-[8.5px] font-bold text-zinc-400 uppercase tracking-[0.18em] font-sans leading-none mt-1.5">
                  Authentic Cosmetics
                </span>
              </div>
            </a>
          </div>

          {/* Search Pill Audited */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <div className="w-full flex items-center border border-zinc-200 hover:border-zinc-400 focus-within:border-[#e11d48] rounded-full overflow-hidden bg-white pl-4 pr-1 py-1 transition-all duration-200">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    router.push(`/products?q=${searchQuery}`);
                  }
                }}
                placeholder="What are you looking for?"
                className="w-full bg-transparent border-none outline-none text-sm text-gray-800 placeholder-zinc-400 font-medium"
              />
              
              

              {/* Image search */}
              <button 
                onClick={() => setToastMessage("Search by Image features active. Please select a beauty product photo.")}
                className="p-2 text-zinc-400 hover:text-zinc-600 rounded-full transition-colors mr-2 shrink-0"
                title="Search by image"
              >
                <HugeiconsIcon icon={Camera01Icon} size={18} />
              </button>

              {/* Pink Magnifier search trigger */}
              <button 
                onClick={() => router.push(`/products?q=${searchQuery}`)}
                className="w-9 h-9 rounded-full bg-[#FF1A58] hover:bg-[#be185d] text-white flex items-center justify-center transition-all duration-300 shadow shrink-0 cursor-pointer"
              >
                <HugeiconsIcon icon={Search01Icon} size={16} />
              </button>
            </div>
          </div>

          {/* User profile avatar, wishlist, cart */}
          <div className="flex items-center gap-2 sm:gap-4 select-none shrink-0">
            {/* Mobile Search Magnifier (Grey round background) */}
            <button
              onClick={() => setToastMessage("Open Search interface")}
              className="flex md:hidden w-10 h-10 rounded-full bg-zinc-100/90 hover:bg-zinc-200 items-center justify-center text-zinc-700 transition-all"
            >
              <HugeiconsIcon icon={Search01Icon} size={20} />
            </button>

            {/* User Profile - desktop only */}
            <button 
              onClick={() => setToastMessage("Opening Customer Login Dashboard...")}
              className="hidden md:flex w-10 h-10 rounded-full hover:bg-zinc-100 items-center justify-center text-zinc-700 transition-colors"
            >
              <HugeiconsIcon icon={UserIcon} size={20} />
            </button>

            {/* Wishlist Heart - desktop only */}
            <button 
              onClick={() => setToastMessage(`Wishlist holds ${wishlist.size} cosmetics.`)}
              className="hidden md:flex w-10 h-10 rounded-full hover:bg-zinc-100 items-center justify-center text-zinc-700 hover:text-[#e11d48] transition-colors relative"
            >
              <HugeiconsIcon 
                icon={FavouriteIcon} 
                size={20} 
                className={`${wishlist.size > 0 ? "fill-[#FF1A58] text-[#FF1A58]" : "text-zinc-700"}`} 
              />
              {wishlist.size > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF1A58] text-white font-extrabold text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
                  {wishlist.size}
                </span>
              )}
            </button>

            {/* Shopping Cart Bag with pink count badge (Grey round background) */}
            <button 
              onClick={() => setShowCartDrawer(true)}
              className="w-10 h-10 rounded-full bg-zinc-100/90 hover:bg-zinc-200 flex items-center justify-center text-zinc-700 hover:text-[#e11d48] transition-all relative"
            >
              <HugeiconsIcon icon={ShoppingBag01Icon} size={20} />
              <span className="absolute -top-0.5 -right-0.5 bg-[#FF1A58] text-white font-black text-[9px] w-5 h-5 rounded-full flex items-center justify-center shadow border border-white">
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* SECTOR 3: SUB-NAVIGATION MENU (HORIZONTAL SCROLLING MENU WITH PERFECT COMPONENT PILLS) */}
      <nav className="w-full bg-white border-b border-zinc-100 py-2.5 relative z-30 select-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-2">
          
          {/* Scroll Navigation Left Control (Desktop only) */}
          <button 
            onClick={() => setToastMessage("Scrolling category navigation left.")}
            className="hidden md:flex w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200 items-center justify-center text-zinc-600 text-xs shrink-0 cursor-pointer"
          >
            &lt;
          </button>

          {/* Links list wrapper */}
          <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 py-1">
            
            {/* Pill Categories matching mobile view exactly */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  router.push("/products");
                  setToastMessage("Flash Friday Deals active!");
                }}
                className="flex items-center bg-white border border-zinc-200 text-gray-900 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap hover:border-[#FF1A58]"
              >
                <span>Flash Friday</span>
              </button>
              <button
                onClick={() => {
                  router.push("/products");
                  setToastMessage("Summer Sale 2026 active!");
                }}
                className="flex items-center bg-white border border-zinc-200 text-gray-900 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap hover:border-[#FF1A58]"
              >
                <span>Summer Sale 2026</span>
              </button>
              <button
                onClick={() => {
                  router.push("/products");
                  setToastMessage("Beauty Week specials active!");
                }}
                className="flex items-center bg-white border border-zinc-200 text-gray-900 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap hover:border-[#FF1A58]"
              >
                <span>Beauty Week</span>
              </button>
              <button
                onClick={() => {
                  router.push("/products?category=Hair Care");
                  setToastMessage("Hair Care campaign loaded!");
                }}
                className="flex items-center bg-white border border-zinc-200 text-gray-900 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap hover:border-[#FF1A58]"
              >
                <span>Hair Care</span>
              </button>
            </div>
            
            {/* Fallback details for desktop navigation */}
            <div className="hidden md:flex items-center gap-4 text-sm font-semibold text-zinc-700 shrink-0 border-l border-zinc-200 pl-4 ml-2">
              <button onClick={() => router.push("/products?category=Skin Care")} className="hover:text-[#e11d48] cursor-pointer">Skin Care</button>
              <button onClick={() => router.push("/products?category=Makeup")} className="hover:text-[#e11d48] cursor-pointer">Make Up</button>
              <button onClick={() => router.push("/products?category=Hair Care")} className="hover:text-[#e11d48] cursor-pointer">Hair Care</button>
              <button onClick={() => router.push("/products?category=Bath & Body")} className="hover:text-[#e11d48] cursor-pointer">Bath & Body Care</button>
              <button onClick={() => router.push("/products?category=Accessories")} className="text-[#e11d48] hover:underline cursor-pointer">Accessories</button>
            </div>

          </div>

          {/* Scroll Navigation Right Control (Desktop only) */}
          <button 
            onClick={() => setToastMessage("Scrolling category navigation right.")}
            className="hidden md:flex w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200 items-center justify-center text-zinc-600 text-xs shrink-0 cursor-pointer"
          >
            &gt;
          </button>

        </div>
      </nav>
    </>
  );
}
