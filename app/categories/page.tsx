"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";
import { useApp } from "../context/AppContext";

export default function CategoriesPage() {
  const router = useRouter();
  const { setToastMessage } = useApp();

  const [activePill, setActivePill] = useState("Eid Festive Sale");

  const pills = [
    "Eid Festive Sale",
    "Flash Sale",
    "Combo",
    "New",
    "Brand",
    "Skin Care",
    "Makeup",
  ];

  // Subcategory data modeled exactly from the screenshot
  const hairCareSubcategories = [
    { name: "Shampoo", imgUrl: "https://cms.beautybooth.com.bd/uploads/all/sunsilk-power-shot-treatment-for-damage-repair-20ml_89.webp" },
    { name: "Conditioners", imgUrl: "https://cms.beautybooth.com.bd/uploads/all/loral-paris-elvive-growth-booster-anti-hair-loss-shampoo-200ml-4_33.webp" },
    { name: "Hair Oil", imgUrl: "https://cms.beautybooth.com.bd/uploads/all/loral-elvive-hydra-hyaluronic-8-second-wonder-water-lamellar-conditioner-200ml_20.webp" },
    { name: "Hair Treatments", imgUrl: "https://cms.beautybooth.com.bd/uploads/all/loral-elvive-hydra-hyaluronic-8-second-wonder-water-lamellar-conditioner-200ml_20.webp" },
    { name: "Hair Color", imgUrl: "https://cms.beautybooth.com.bd/uploads/all/loral-paris-elvive-growth-booster-anti-hair-loss-shampoo-200ml-4_33.webp" },
    { name: "Hair Cream & Masks", imgUrl: "https://cms.beautybooth.com.bd/uploads/all/medicube-deep-vita-c-daily-quick-mask_54.webp" },
    { name: "Hair Serum", imgUrl: "https://cms.beautybooth.com.bd/uploads/all/5SB1IdigLhkiH5QeKpidcoNyDdYRCooFIrJ35mgW.jpg" },
  ];

  const mensCareSubcategories = [
    { name: "Moisturizer for men", imgUrl: "https://cms.beautybooth.com.bd/uploads/all/medicube-deep-vita-c-daily-quick-mask_54.webp" },
    { name: "Scrub", imgUrl: "https://cms.beautybooth.com.bd/uploads/all/5SB1IdigLhkiH5QeKpidcoNyDdYRCooFIrJ35mgW.jpg" },
    { name: "Hair Care", imgUrl: "https://cms.beautybooth.com.bd/uploads/all/sunsilk-power-shot-treatment-for-damage-repair-20ml_89.webp" },
    { name: "Men's Face Wash", imgUrl: "https://cms.beautybooth.com.bd/uploads/all/xWmqdQ5HdibDg5m0FIWyz8czJGIFAE49rHnXen3N.jpg" },
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen pb-24 select-none">
      
      {/* 1. PINK ANNOUNCEMENT BAR (MOBILE OPTIMIZED ALIGNMENT AND WHITE CHAT BUTTON PILL) */}
      <div className="w-full bg-[#FF1A58] text-white py-2.5 px-4 flex items-center justify-between text-xs font-bold shadow-sm">
        <span className="truncate text-[11px] xs:text-[13px] tracking-wide">
          আপগ্রেড চলছে – সমস্যা হলে WhatsApp করুন
        </span>
        <a
          href="https://api.whatsapp.com/send?phone=8801952190142"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1 bg-white text-gray-900 px-3 py-1 rounded-full shadow-xs active:scale-95 transition-all"
        >
          <HugeiconsIcon icon={WhatsappIcon} size={13} color="#25D366" />
          <span className="text-[10px] font-black text-zinc-900 font-sans">Chat</span>
        </a>
      </div>

      {/* 2. TITLE NAVIGATION HEADER ROW (BACK ARROW & TITLE CENTERED) */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-zinc-100 bg-white">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-start text-zinc-800 text-xl font-bold cursor-pointer"
        >
          ←
        </button>
        <h1 className="text-base sm:text-lg font-bold text-zinc-900 font-sans tracking-wide">
          All Categories
        </h1>
        <div className="w-8" /> {/* Balance empty element */}
      </header>

      {/* 3. HORIZONTAL SCROLL PILLS LIST */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar px-4 py-3 bg-white select-none border-b border-zinc-50">
        {pills.map((pill) => {
          const isActive = activePill === pill;
          return (
            <button
              key={pill}
              onClick={() => {
                setActivePill(pill);
                if (pill === "Skin Care") router.push("/products?category=Skin Care");
                else if (pill === "Makeup") router.push("/products?category=Makeup");
                else setToastMessage(`Pill selected: ${pill}`);
              }}
              className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border shrink-0 cursor-pointer ${
                isActive
                  ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              {pill}
            </button>
          );
        })}
      </div>

      {/* 4. MAIN CATEGORY LISTINGS */}
      <div className="px-4 py-6 flex flex-col gap-8">
        
        {/* HAIR CARE BLOCK */}
        <section className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 
              onClick={() => router.push("/products?category=Hair Care")}
              className="text-lg font-black text-zinc-950 font-sans cursor-pointer hover:text-[#FF1A58] transition-colors"
            >
              Hair Care
            </h2>
            <button
              onClick={() => router.push("/products?category=Hair Care")}
              className="text-[10px] font-bold border border-zinc-200 hover:bg-zinc-50 text-zinc-600 px-3 py-1 rounded-md transition-colors cursor-pointer"
            >
              Products
            </button>
          </div>

          {/* Subcategories grid list inside pastel pink circles */}
          <div className="grid grid-cols-4 gap-y-5 gap-x-3 justify-items-center">
            {hairCareSubcategories.map((sub, idx) => (
              <button
                key={idx}
                onClick={() => router.push(`/products?category=Hair Care`)}
                className="flex flex-col items-center gap-2 group cursor-pointer w-full text-center"
              >
                <div className="w-16 h-16 xs:w-20 xs:h-20 rounded-full bg-gradient-to-tr from-pink-50 to-pink-100 flex items-center justify-center overflow-hidden border border-pink-200/40 p-2 shadow-xs group-hover:scale-105 transition-transform duration-200">
                  <img src={sub.imgUrl} className="w-full h-full object-contain mix-blend-multiply" alt={sub.name} />
                </div>
                <span className="text-[10.5px] xs:text-xs font-bold text-zinc-800 leading-snug group-hover:text-[#FF1A58] transition-colors max-w-[76px] break-words">
                  {sub.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* BOGO BLOCK */}
        <section className="flex items-center justify-between py-2 border-b border-zinc-100">
          <h2 className="text-lg font-black text-zinc-950 font-sans">Bogo</h2>
          <button
            onClick={() => router.push("/products")}
            className="text-[10px] font-bold border border-zinc-200 hover:bg-zinc-50 text-zinc-600 px-3 py-1 rounded-md transition-colors cursor-pointer"
          >
            Products
          </button>
        </section>

        {/* MEN'S CARE BLOCK */}
        <section className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 
              onClick={() => router.push("/products?category=Skin Care")}
              className="text-lg font-black text-zinc-950 font-sans cursor-pointer hover:text-[#FF1A58] transition-colors"
            >
              Men's Care
            </h2>
            <button
              onClick={() => router.push("/products?category=Skin Care")}
              className="text-[10px] font-bold border border-zinc-200 hover:bg-zinc-50 text-zinc-600 px-3 py-1 rounded-md transition-colors cursor-pointer"
            >
              Products
            </button>
          </div>

          {/* Subcategories grid list */}
          <div className="grid grid-cols-4 gap-y-5 gap-x-3 justify-items-center">
            {mensCareSubcategories.map((sub, idx) => (
              <button
                key={idx}
                onClick={() => router.push(`/products?category=Skin Care`)}
                className="flex flex-col items-center gap-2 group cursor-pointer w-full text-center"
              >
                <div className="w-16 h-16 xs:w-20 xs:h-20 rounded-full bg-gradient-to-tr from-pink-50 to-pink-100 flex items-center justify-center overflow-hidden border border-pink-200/40 p-2 shadow-xs group-hover:scale-105 transition-transform duration-200">
                  <img src={sub.imgUrl} className="w-full h-full object-contain mix-blend-multiply" alt={sub.name} />
                </div>
                <span className="text-[10.5px] xs:text-xs font-bold text-zinc-800 leading-snug group-hover:text-[#FF1A58] transition-colors max-w-[76px] break-words">
                  {sub.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* BODY SCRUB BLOCK */}
        <section className="flex items-center justify-between py-2 border-b border-zinc-100">
          <h2 className="text-lg font-black text-zinc-950 font-sans">Body scrub</h2>
          <button
            onClick={() => router.push("/products?category=Bath & Body")}
            className="text-[10px] font-bold border border-zinc-200 hover:bg-zinc-50 text-zinc-600 px-3 py-1 rounded-md transition-colors cursor-pointer"
          >
            Products
          </button>
        </section>

        {/* MOM & BABY CARE BLOCK */}
        <section className="flex items-center justify-between py-2 border-b border-zinc-100">
          <h2 className="text-lg font-black text-zinc-950 font-sans">Mom & Baby Care</h2>
          <button
            onClick={() => router.push("/products?category=Accessories")}
            className="text-[10px] font-bold border border-zinc-200 hover:bg-zinc-50 text-zinc-600 px-3 py-1 rounded-md transition-colors cursor-pointer"
          >
            Products
          </button>
        </section>

      </div>

    </div>
  );
}
