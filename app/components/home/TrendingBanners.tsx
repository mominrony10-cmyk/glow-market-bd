"use client";

import { useApp } from "../../context/AppContext";

export default function TrendingBanners() {
  const { setToastMessage } = useApp();

  return (
    <section className="max-w-7xl mx-auto px-4 mt-8 select-none">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-6">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight uppercase">
          Trending
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {/* Banner 1: Thai Beauty */}
        <div 
          onClick={() => setToastMessage("Loading Thai Beauty Glow cosmetics...")}
          className="rounded-3xl overflow-hidden aspect-[4/5] w-full shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative group border border-zinc-100"
        >
          <img src="https://cms.beautybooth.com.bd/uploads/trending/t-beauty-web-1766904298.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Thai Beauty Secret" />
        </div>

        {/* Banner 2: Under 1k */}
        <div 
          onClick={() => setToastMessage("Loading self-care under 1k BDT...")}
          className="rounded-3xl overflow-hidden aspect-[4/5] w-full shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative group border border-zinc-100"
        >
          <img src="https://cms.beautybooth.com.bd/uploads/trending/under-1k-web-1771916315.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Self Care Under 1k" />
        </div>

        {/* Banner 3: J-Beauty */}
        <div 
          onClick={() => setToastMessage("Loading J-Beauty Japanese skincare...")}
          className="rounded-3xl overflow-hidden aspect-[4/5] w-full shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative group border border-zinc-100 col-span-2 md:col-span-1"
        >
          <img src="https://cms.beautybooth.com.bd/uploads/trending/j-beauty-web-1768456388.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="J-Beauty Minimal Steps" />
        </div>
      </div>
    </section>
  );
}
