"use client";

import { useState } from "react";

export default function SeoContentShowcase() {
  const [isExpanded, setIsExpanded] = useState(false);

  const popularSearches = [
    "Hair Care", 
    "Serum", 
    "Essences", 
    "Cleansers", 
    "Toner", 
    "Moisturizers", 
    "Exfoliators", 
    "Sun Protection", 
    "dot-key", 
    "COSRX", 
    "SKIN1004", 
    "ANUA", 
    "BEAUTY OF JOSEON", 
    "VT COSMETICS", 
    "JUMISO", 
    "CARE:NEL", 
    "APLB", 
    "3W CLINIC", 
    "Medicube AGE-R", 
    "BOGO Deals"
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 text-left select-text">
      {/* Decorative clean divider line */}
      <div className="border-t border-zinc-100 w-full mb-10"></div>

      {/* Main SEO Article heading */}
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-zinc-900 tracking-tight leading-snug max-w-5xl">
        What Kinds of Beauty Products and Cosmetic Items Does Glow Market BD Offer?
      </h3>

      {/* Toggleable SEO Description */}
      <div className="text-sm sm:text-base text-zinc-600 font-medium leading-relaxed mt-4 max-w-6xl">
        <p>
          Glow Market BD is Bangladesh leading online beauty and skincare destination.
          {isExpanded && (
            <span className="inline transition-opacity duration-500 ease-in-out">
              {" "}We are pioneering the online beauty storefront industry by bringing you 100% genuine skincare, makeup, and health imports directly to your doorstep. We specialize in verified authentic products imported directly from leading dermatological laboratories in South Korea, Japan, Thailand, and Europe.
            </span>
          )}
        </p>
        
        {isExpanded && (
          <p className="mt-3.5 transition-opacity duration-500 ease-in-out">
            Our massive inventory includes high-demand chemical exfoliators, soothing centella toners, hydrating hyaluronic essence formulas, lightweight sun protection blocks, and premium makeup cushions suited to all South Asian skin undertones. Every product undergoes strict quality control and verification procedures to ensure you get the absolute best for your skin.
          </p>
        )}
      </div>

      {/* Read More / Read Less Toggle Link */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-sm font-semibold text-[#f43f5e] hover:text-[#e11d48] mt-3.5 flex items-center gap-1 cursor-pointer transition-all hover:underline"
      >
        {isExpanded ? "Read less" : "Read more >"}
      </button>

      {/* Popular Searches Heading */}
      <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 mt-10 mb-3 tracking-tight">
        Popular Searches
      </h3>

      {/* Pipe-separated Popular Searches list */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed max-w-5xl">
        {popularSearches.map((search, index) => (
          <span key={search} className="flex items-center gap-2">
            <a
              href={`/search?q=${encodeURIComponent(search)}`}
              className="hover:text-zinc-800 transition-colors hover:underline"
            >
              {search}
            </a>
            {index < popularSearches.length - 1 && (
              <span className="text-zinc-300 font-light select-none">|</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}

