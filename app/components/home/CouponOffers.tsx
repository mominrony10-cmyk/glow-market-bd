"use client";

import React, { useRef, useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

interface Coupon {
  code: string;
  discount: number;
  status: "Active" | "Expired";
  expiry: string;
}

export default function CouponOffers() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Load from cache first, then fetch from database in background
  useEffect(() => {
    // 1. Check cache
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("beautybooth_campaign_coupons");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          const activeOnly = parsed.filter((c: Coupon) => c.status === "Active");
          setCoupons(activeOnly);
        } catch (e) {
          console.error(e);
        }
      }
    }

    // 2. Fetch fresh coupons
    async function fetchCoupons() {
      try {
        const { data, error } = await supabase
          .from("coupons")
          .select("*")
          .eq("status", "Active")
          .order("code", { ascending: true });

        if (error) throw error;
        if (data) {
          setCoupons(data);
          localStorage.setItem("beautybooth_campaign_coupons", JSON.stringify(data));
        }
      } catch (err) {
        console.warn("Could not fetch active coupons from DB (using local fallback):", err);
      }
    }

    fetchCoupons();
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 320;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-12 select-none relative group/nav">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-100 pb-3 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight uppercase">
            Offers to Say Yes
          </h3>
          <p className="text-xs text-zinc-400 font-medium mt-0.5">
            Grab exclusive coupons & free gifts on your purchase (Click coupon to copy code)
          </p>
        </div>

        {/* Desktop Slide Controls */}
        <div className="hidden sm:flex items-center gap-2 mt-3 sm:mt-0">
          <button
            onClick={() => handleScroll("left")}
            className="w-8 h-8 rounded-full border border-zinc-200 hover:border-zinc-300 bg-white flex items-center justify-center text-zinc-600 transition-colors shadow-xs hover:shadow-sm cursor-pointer"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="w-8 h-8 rounded-full border border-zinc-200 hover:border-zinc-300 bg-white flex items-center justify-center text-zinc-600 transition-colors shadow-xs hover:shadow-sm cursor-pointer"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto no-scrollbar flex gap-4 pb-4 scroll-smooth snap-x snap-mandatory"
      >
        {coupons.map((coupon) => (
          <div 
            key={coupon.code}
            onClick={() => handleCopyCode(coupon.code)}
            className="bg-white border border-orange-200 rounded-2xl flex items-center min-w-[280px] sm:min-w-[320px] max-w-[340px] h-[120px] overflow-hidden shadow-xs hover:shadow-md transition-shadow relative shrink-0 snap-start cursor-pointer active:scale-98 duration-100"
          >
            {/* Left Ticket Part - Peach tint */}
            <div className="p-4 flex-1 flex flex-col justify-center h-full text-left bg-orange-50/40">
              <span className="text-xs sm:text-[13px] font-black text-zinc-900 leading-tight uppercase tracking-tight">
                Discount Offer
              </span>
              
              {/* Promo Code Inside Card */}
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="bg-orange-100 text-orange-800 border border-orange-200/80 text-[10px] sm:text-xs font-mono font-black px-2 py-0.5 rounded tracking-widest uppercase">
                  {coupon.code}
                </span>
                <span className="text-[8px] font-bold text-zinc-400 bg-white/60 border border-zinc-200/40 rounded px-1 scale-90 uppercase">
                  {copiedCode === coupon.code ? "Copied" : "Copy"}
                </span>
              </div>

              <p className="text-[10px] sm:text-xs text-zinc-500 font-semibold leading-relaxed mt-2 line-clamp-2">
                Use code <strong className="text-zinc-800">{coupon.code}</strong> for a flat {coupon.discount}% discount at checkout.
              </p>
            </div>

            {/* Dashed partition divider with notch cutouts */}
            <div className="relative h-full flex flex-col justify-between items-center w-0 shrink-0">
              {/* Top half circle notch cutout */}
              <div className="w-4 h-4 rounded-full bg-white border border-orange-200 absolute -top-2 -left-2 z-10"></div>
              
              {/* Vertical dashed separator */}
              <div className="h-full border-l-[1.5px] border-dashed border-orange-200/70"></div>
              
              {/* Bottom half circle notch cutout */}
              <div className="w-4 h-4 rounded-full bg-white border border-orange-200 absolute -bottom-2 -left-2 z-10"></div>
            </div>

            {/* Right Ticket Part - White background */}
            <div className="p-3 w-[85px] sm:w-[95px] h-full flex flex-col items-center justify-center text-center shrink-0 bg-white">
              <span className="text-[9px] font-bold text-zinc-400 block tracking-wide">
                Expires: {coupon.expiry.substring(5)}
              </span>
              <span className="text-lg sm:text-xl font-black text-[#FF1A58] block mt-0.5 tracking-tighter">
                {coupon.discount}%
              </span>
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mt-1 scale-90">
                OFF
              </span>
            </div>
          </div>
        ))}
        
        {coupons.length === 0 && (
          <div className="w-full text-center py-8 text-zinc-400 text-xs font-bold">
            No active coupons currently available. Check back soon!
          </div>
        )}
      </div>
    </section>
  );
}
