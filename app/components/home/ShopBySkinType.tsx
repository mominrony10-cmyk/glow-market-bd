"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";

interface SkinProduct {
  id: string;
  brand: string;
  name: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  onSale: boolean;
}

export default function ShopBySkinType() {
  const [activeTab, setActiveTab] = useState("Oily");
  const router = useRouter();
  const { addToCart } = useApp();

  const productsByTab: Record<string, SkinProduct[]> = {
    Oily: [
      {
        id: "oily-1",
        brand: "MARS COSMETICS",
        name: "Mars Cosmetics Oil Blotter Gel Compact (5gm)",
        price: "749",
        originalPrice: "1000",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/mars-cosmetics-oil-blotter-gel-compact-5gm_63.webp",
        onSale: true
      },
      {
        id: "oily-2",
        brand: "KOSÉ",
        name: "Kose Suncut Tone Up UV Essence Sunscreen SPF 50/PA++++ #Min...",
        price: "1299",
        originalPrice: "1550",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/kose-suncut-tone-up-uv-essence-sunscreen-spf-50pa-mint-green-80gm_18.webp",
        onSale: true
      },
      {
        id: "oily-3",
        brand: "KOSÉ",
        name: "Kose Suncut Light Up UV Essence Sunscreen With SPF50+ PA++++...",
        price: "1299",
        originalPrice: "1550",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/kose-suncut-light-up-uv-essence-sunscreen-with-spf50-pa-80gm_89.webp",
        onSale: true
      },
      {
        id: "oily-4",
        brand: "SKIN AQUA",
        name: "Skin Aqua Tone Up UV Essence SPF50+/PA++++ #Latte Beige...",
        price: "1299",
        originalPrice: "1550",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/skin-aqua-tone-up-uv-essence-spf50pa-latte-beige-80gm_28.webp",
        onSale: true
      },
      {
        id: "oily-5",
        brand: "THE FACE SHOP",
        name: "The Face Shop Rice Water Bright Facial Foaming Cleanser (50ml)",
        price: "700",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/the-face-shop-rice-water-bright-facial-foaming-cleanser-50ml_73.webp",
        onSale: false
      }
    ],
    Dry: [
      {
        id: "dry-1",
        brand: "ANUA",
        name: "Anua Heartleaf 77% Soothing Toner Daily Hydrator (250ml)",
        price: "1950",
        originalPrice: "2400",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/kose-suncut-tone-up-uv-essence-sunscreen-spf-50pa-mint-green-80gm_18.webp",
        onSale: true
      },
      {
        id: "dry-2",
        brand: "ROUND LAB",
        name: "Round Lab 1025 Dokdo Toner Intensive Dry Skin Therapy",
        price: "1699",
        originalPrice: "2100",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/kose-suncut-light-up-uv-essence-sunscreen-with-spf50-pa-80gm_89.webp",
        onSale: true
      },
      {
        id: "dry-3",
        brand: "COSRX",
        name: "COSRX Advanced Snail 96 Mucin Power Essence Ampoule",
        price: "1450",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/the-face-shop-rice-water-bright-facial-foaming-cleanser-50ml_73.webp",
        onSale: false
      },
      {
        id: "dry-4",
        brand: "BEAUTY OF JOSEON",
        name: "Beauty of Joseon Dynasty Cream Extra Moisturizing (50ml)",
        price: "1800",
        originalPrice: "2200",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/skin-aqua-tone-up-uv-essence-spf50pa-latte-beige-80gm_28.webp",
        onSale: true
      },
      {
        id: "dry-5",
        brand: "ROUND LAB",
        name: "Round Lab Birch Juice Moisturizing Cream Deep Hydrating Barrier",
        price: "1999",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/mars-cosmetics-oil-blotter-gel-compact-5gm_63.webp",
        onSale: false
      }
    ],
    Combination: [
      {
        id: "comb-1",
        brand: "SOME BY MI",
        name: "Some By Mi AHA BHA PHA 30 Days Miracle Toner Clarifying",
        price: "1250",
        originalPrice: "1600",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/the-face-shop-rice-water-bright-facial-foaming-cleanser-50ml_73.webp",
        onSale: true
      },
      {
        id: "comb-2",
        brand: "COSRX",
        name: "COSRX Low pH Good Morning Gel Cleanser Gentle Daily",
        price: "850",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/mars-cosmetics-oil-blotter-gel-compact-5gm_63.webp",
        onSale: false
      },
      {
        id: "comb-3",
        brand: "SKIN1004",
        name: "Skin1004 Madagascar Centella Ampoule Healing Essence (100ml)",
        price: "1799",
        originalPrice: "2300",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/kose-suncut-light-up-uv-essence-sunscreen-with-spf50-pa-80gm_89.webp",
        onSale: true
      },
      {
        id: "comb-4",
        brand: "AXIS-Y",
        name: "Axis-Y Dark Spot Correcting Glow Serum Brightening Essence",
        price: "1350",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/skin-aqua-tone-up-uv-essence-spf50pa-latte-beige-80gm_28.webp",
        onSale: false
      },
      {
        id: "comb-5",
        brand: "HARUHARU WONDER",
        name: "Haruharu Wonder Black Rice Hyaluronic Toner Unscented Duo",
        price: "1599",
        originalPrice: "1900",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/kose-suncut-tone-up-uv-essence-sunscreen-spf-50pa-mint-green-80gm_18.webp",
        onSale: true
      }
    ],
    Normal: [
      {
        id: "norm-1",
        brand: "MIXSOON",
        name: "Mixsoon Bean Essence Gentle Exfoliating Skin Softener",
        price: "2400",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/kose-suncut-light-up-uv-essence-sunscreen-with-spf50-pa-80gm_89.webp",
        onSale: false
      },
      {
        id: "norm-2",
        brand: "BEAUTY OF JOSEON",
        name: "Beauty of Joseon Ginseng Essence Water Nourishing Cleanser",
        price: "1399",
        originalPrice: "1750",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/mars-cosmetics-oil-blotter-gel-compact-5gm_63.webp",
        onSale: true
      },
      {
        id: "norm-3",
        brand: "ROUND LAB",
        name: "Round Lab Birch Juice Moisturizing Sunscreen SPF 50+ Light",
        price: "1550",
        originalPrice: "1900",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/skin-aqua-tone-up-uv-essence-spf50pa-latte-beige-80gm_28.webp",
        onSale: true
      },
      {
        id: "norm-4",
        brand: "TORIDEN",
        name: "Toriden Dive-In Low Molecular Hyaluronic Acid Serum Ampoule",
        price: "1650",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/the-face-shop-rice-water-bright-facial-foaming-cleanser-50ml_73.webp",
        onSale: false
      },
      {
        id: "norm-5",
        brand: "ANUA",
        name: "Anua Heartleaf Pore Control Cleansing Oil Waterproof Blackhead",
        price: "1850",
        originalPrice: "2200",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/kose-suncut-tone-up-uv-essence-sunscreen-spf-50pa-mint-green-80gm_18.webp",
        onSale: true
      }
    ],
    Sensitive: [
      {
        id: "sens-1",
        brand: "ETUDE HOUSE",
        name: "Etude House SoonJung 2x Barrier Intensive Cream Healing",
        price: "1350",
        originalPrice: "1700",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/skin-aqua-tone-up-uv-essence-spf50pa-latte-beige-80gm_28.webp",
        onSale: true
      },
      {
        id: "sens-2",
        brand: "I'M FROM",
        name: "I'm From Mugwort Essence Soothing Redness Calm Pack",
        price: "2450",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/the-face-shop-rice-water-bright-facial-foaming-cleanser-50ml_73.webp",
        onSale: false
      },
      {
        id: "sens-3",
        brand: "PURITO",
        name: "Purito SEOUL Wonder Releaf Centella Cream Unscented Shield",
        price: "1599",
        originalPrice: "1950",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/kose-suncut-light-up-uv-essence-sunscreen-with-spf50-pa-80gm_89.webp",
        onSale: true
      },
      {
        id: "sens-4",
        brand: "SKIN1004",
        name: "Skin1004 Madagascar Centella Soothing Cream Gel Formula",
        price: "1450",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/mars-cosmetics-oil-blotter-gel-compact-5gm_63.webp",
        onSale: false
      },
      {
        id: "sens-5",
        brand: "COSRX",
        name: "COSRX Centella Water Alcohol-Free Toner Calming Mist",
        price: "1150",
        originalPrice: "1450",
        imageUrl: "https://cms.beautybooth.com.bd/uploads/all/kose-suncut-tone-up-uv-essence-sunscreen-spf-50pa-mint-green-80gm_18.webp",
        onSale: true
      }
    ]
  };

  const activeProducts = productsByTab[activeTab] || [];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16 select-none relative">
      
      {/* Title & Centered Pill Tabs */}
      <div className="flex flex-col items-center justify-between gap-4 mb-8">
        <h3 className="text-2xl font-black text-black tracking-tight uppercase self-start">
          Shop By Skin Type
        </h3>

        {/* Outline Pill Button Tabs */}
        <div className="flex justify-center items-center gap-3 overflow-x-auto no-scrollbar w-full py-1">
          {["Oily", "Dry", "Combination", "Normal", "Sensitive"].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                }}
                className={`px-6 py-2 rounded-full text-xs font-black transition-all shrink-0 cursor-pointer border ${
                  isActive
                    ? "bg-[#3B0764] text-white border-[#3B0764]"
                    : "bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5-Column Grid Layout */}
      <div className="relative">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 sm:gap-6">
          {activeProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => router.push(`/products?skinType=${encodeURIComponent(activeTab)}`)}
              className="bg-white rounded-[28px] p-5 md:p-5.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group relative cursor-pointer border border-zinc-50"
            >
              {/* Hot Pink On Sale Pill Badge */}
              {p.onSale && (
                <span className="absolute top-4 left-4 bg-[#e11d48] text-white text-[8.5px] font-black uppercase px-2.5 py-0.5 rounded-full z-10">
                  ON SALE
                </span>
              )}

              {/* Product Image Wrapper */}
              <div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center p-3 relative overflow-hidden shrink-0 mt-2 sm:h-[200px] md:h-[220px]">
                <img
                  src={p.imageUrl}
                  className="max-h-[96%] max-w-[96%] object-contain group-hover:scale-106 transition-transform duration-300"
                  alt={p.name}
                />
              </div>

              {/* Card Footer Details */}
              <div className="mt-4 flex flex-col flex-1 justify-between text-left">
                <div>
                  {/* Brand Category title */}
                  <span className="text-[10px] md:text-[11px] font-bold text-zinc-400 uppercase tracking-widest block">
                    {p.brand}
                  </span>
                  
                  {/* Product Title */}
                  <h4 className="text-xs sm:text-[13.5px] font-bold text-zinc-700 leading-snug line-clamp-2 mt-1 min-h-[38px] group-hover:text-[#e11d48] transition-colors">
                    {p.name}
                  </h4>
                </div>

                {/* Price compartment */}
                <div className="flex items-baseline gap-2 mt-3 pt-2 border-t border-zinc-50">
                  {p.originalPrice ? (
                    <>
                      <span className="text-[11px] text-zinc-400 line-through">
                        ৳{p.originalPrice}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-[#e11d48]">
                        ৳{p.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm sm:text-base font-extrabold text-black">
                      ৳{p.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Circular Floating Next Navigation Button */}
        <div 
          onClick={() => {
            const tabs = ["Oily", "Dry", "Combination", "Normal", "Sensitive"];
            const nextIdx = (tabs.indexOf(activeTab) + 1) % tabs.length;
            setActiveTab(tabs[nextIdx]);
          }}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-zinc-100 flex items-center justify-center text-zinc-700 hover:bg-zinc-50 z-20 cursor-pointer transition-transform hover:scale-105"
        >
          <svg className="w-4.5 h-4.5 text-zinc-800" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
