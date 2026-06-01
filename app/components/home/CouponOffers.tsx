"use client";

import React, { useRef } from "react";

export default function CouponOffers() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const coupons = [
    {
      title: "Free Gift Offer",
      spend: "2000 TK",
      disc: "৳150",
      label: "Max Discount",
      text: "Free Gift 🎁 Get Nineless A-Control Azelaic Acid Serum (2ml) on orders above 2000 BDT"
    },
    {
      title: "Free Gift Offer",
      spend: "2000 TK",
      disc: "৳150",
      label: "Max Discount",
      text: "Free Gift 🎁 Round Lab Mugwort Calming Serum (2ml) on orders above 2000 BDT"
    },
    {
      title: "New User Treat 🚚",
      spend: "0 TK",
      disc: "FREE",
      label: "Delivery",
      text: "New at Glow Market? Then Get Free delivery for your First order!"
    },
    {
      title: "Free Gift Offer",
      spend: "2000 TK",
      disc: "৳150",
      label: "Max Discount",
      text: "Free Gift 🎁 Get Skin1004 Madagascar Centella Tea-Trica BHA Foam (1.5ml) on orders above 2000 BDT"
    }
  ];

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 320;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-12 select-none relative group/nav">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-100 pb-3 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight uppercase">
            Offers to Say Yes
          </h3>
          <p className="text-xs text-zinc-400 font-medium mt-0.5">
            Grab exclusive coupons & free gifts on your purchase
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
        {coupons.map((ticket, i) => (
          <div 
            key={i} 
            className="bg-gradient-to-r from-amber-50/40 to-rose-50/20 border border-amber-200/50 rounded-2xl flex items-center min-w-[280px] sm:min-w-[320px] max-w-[340px] h-[120px] overflow-hidden shadow-xs hover:shadow-md transition-shadow relative shrink-0 snap-start"
          >
            {/* Left Ticket Part */}
            <div className="p-4 flex-1 flex flex-col justify-center h-full text-left">
              <span className="text-xs sm:text-[13px] font-black text-zinc-900 leading-tight uppercase tracking-tight">
                {ticket.title}
              </span>
              <p className="text-[10px] sm:text-xs text-zinc-500 font-semibold leading-relaxed mt-1.5 line-clamp-3">
                {ticket.text}
              </p>
            </div>

            {/* Dashed partition divider with notch cutouts */}
            <div className="relative h-full flex flex-col justify-between items-center w-0 shrink-0">
              {/* Top half circle notch cutout */}
              <div className="w-4 h-4 rounded-full bg-white border border-amber-200/50 absolute -top-2 -left-2 z-10"></div>
              
              {/* Vertical dashed separator */}
              <div className="h-full border-l-[1.5px] border-dashed border-amber-200/70"></div>
              
              {/* Bottom half circle notch cutout */}
              <div className="w-4 h-4 rounded-full bg-white border border-amber-200/50 absolute -bottom-2 -left-2 z-10"></div>
            </div>

            {/* Right Ticket Part */}
            <div className="p-3 w-[85px] sm:w-[95px] h-full flex flex-col items-center justify-center text-center shrink-0 bg-white/40">
              <span className="text-[9px] font-bold text-zinc-400 block tracking-wide">Spend: {ticket.spend}</span>
              <span className="text-lg sm:text-xl font-black text-[#FF1A58] block mt-0.5 tracking-tighter">
                {ticket.disc}
              </span>
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mt-1 scale-90">
                {ticket.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
