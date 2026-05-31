"use client";

import React, { useEffect, useRef } from "react";

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
      text: "New at Beauty Booth? Then Get Free delivery for your First order!"
    },
    {
      title: "Free Gift Offer",
      spend: "2000 TK",
      disc: "৳150",
      label: "Max Discount",
      text: "Free Gift 🎁 Get Skin1004 Madagascar Centella Tea-Trica BHA Foam (1.5ml) on orders above 2000 BDT"
    }
  ];

  // Smooth Auto-Scrolling Effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let direction = 1; // 1 = forward, -1 = backward
    const scrollStep = 200; // Adjusted for super compact card width + gap

    const timer = setInterval(() => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (maxScrollLeft <= 0) return;

      let nextScrollLeft = container.scrollLeft + scrollStep * direction;

      if (nextScrollLeft >= maxScrollLeft) {
        nextScrollLeft = maxScrollLeft;
        direction = -1; // Reverse direction at the end
      } else if (nextScrollLeft <= 0) {
        nextScrollLeft = 0;
        direction = 1; // Go forward at the start
      }

      container.scrollTo({
        left: nextScrollLeft,
        behavior: "smooth"
      });
    }, 3500); // Slide every 3.5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-12 select-none">
      <div className="pb-1 mb-6">
        <h3 className="text-2xl font-black text-black tracking-tight uppercase">
          Offers to Say Yes
        </h3>
      </div>

      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto no-scrollbar flex gap-4 pb-4 scroll-smooth"
      >
        {coupons.map((ticket, i) => (
          <div 
            key={i} 
            className="bg-[#FFFDF9] border border-[#FFE3C3] rounded-2xl flex items-center min-w-[220px] md:min-w-[240px] h-[115px] overflow-hidden shadow-xs relative shrink-0"
          >
            {/* Left Ticket Part */}
            <div className="p-3 flex-1 flex flex-col justify-center h-full">
              <span className="text-xs font-black text-gray-900 leading-tight">{ticket.title}</span>
              <p className="text-[9.5px] text-zinc-500 font-semibold leading-normal mt-1 line-clamp-3">
                {ticket.text}
              </p>
            </div>

            {/* Dashed partition divider with notch cutouts */}
            <div className="relative h-full flex flex-col justify-between items-center w-0 shrink-0">
              {/* Top half circle notch cutout */}
              <div className="w-3 h-3 rounded-full bg-white border border-[#FFE3C3] absolute -top-1.5 -left-1.5 z-10"></div>
              
              {/* Vertical dashed separator */}
              <div className="h-full border-l-2 border-dashed border-[#FFE3C3]"></div>
              
              {/* Bottom half circle notch cutout */}
              <div className="w-3 h-3 rounded-full bg-white border border-[#FFE3C3] absolute -bottom-1.5 -left-1.5 z-10"></div>
            </div>

            {/* Right Ticket Part */}
            <div className="p-2 w-[75px] h-full flex flex-col items-center justify-center text-center shrink-0">
              <span className="text-[8px] font-bold text-zinc-500 block">Spend: {ticket.spend}</span>
              <span className="text-lg font-black text-[#e11d48] block mt-0.5 tracking-tight">
                {ticket.disc}
              </span>
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-wider block mt-1">
                {ticket.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
