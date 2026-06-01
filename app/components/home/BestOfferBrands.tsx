"use client";

import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";

export default function BestOfferBrands() {
  const router = useRouter();
  const { setToastMessage } = useApp();

  const brands = [
    { name: "COSRX", rate: "Up to 44% Off", desc: "K-Beauty Must Have", bg: "https://cms.beautybooth.com.bd/uploads/cms-migrate/up-to-44-off-web-1768387016.webp" },
    { name: "SKIN1004", rate: "Up to 26% off", desc: "On Entire Range", bg: "https://cms.beautybooth.com.bd/uploads/cms-migrate/up-to-26-off-web-1768387052.webp" },
    { name: "ANUA", rate: "Up to 35% Off", desc: "On Entire Brand", bg: "https://cms.beautybooth.com.bd/uploads/cms-migrate/up-to-35-off-web-1768387084.webp" },
    { name: "BEAUTY OF JOSEON", rate: "Up to 29% off", desc: "On Bestsellers", bg: "https://cms.beautybooth.com.bd/uploads/cms-migrate/up-to-29-off-web-1766997236.webp" },
    { name: "DOT & KEY", rate: "Up to 22% Off", desc: "On Entire Brand", bg: "https://cms.beautybooth.com.bd/uploads/cms-migrate/up-to-22-off-web-1768387653.webp" }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16 select-none">
      <div className="pb-1 mb-6">
        <h3 className="text-2xl font-black text-black tracking-tight uppercase">
          Best Offer Brands
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {brands.map((br, i) => (
          <div 
            key={i}
            onClick={() => {
              router.push(`/products?brand=${encodeURIComponent(br.name)}`);
            }}
            className="flex flex-col group cursor-pointer"
          >
            {/* Arched Poster Card */}
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-xs hover:shadow transition-shadow relative">
              <img 
                src={br.bg} 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                alt={br.name} 
              />
            </div>

            {/* Floating Mini Brand Badge */}
            <div className="w-8 h-8 rounded overflow-hidden border border-zinc-150 shadow-sm mx-auto -mt-4 bg-white relative z-10 select-none">
              <img src={br.bg} className="w-full h-full object-cover scale-150" alt="" />
            </div>

            {/* Labels */}
            <div className="text-center mt-2">
              <span className="text-[13px] font-black text-[#e11d48] uppercase tracking-tight block">
                {br.rate}
              </span>
              <span className="text-[10px] font-semibold text-zinc-500 block mt-0.5">
                {br.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
