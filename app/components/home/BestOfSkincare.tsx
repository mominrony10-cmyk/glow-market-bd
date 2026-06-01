"use client";

import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";

export default function BestOfSkincare() {
  const router = useRouter();
  const { setToastMessage } = useApp();

  const steps = [
    { name: "Cleanser", imgUrl: "https://cms.beautybooth.com.bd/uploads/cms-migrate/cleanser-web-1766999433.webp" },
    { name: "Serum", imgUrl: "https://cms.beautybooth.com.bd/uploads/cms-migrate/serum-web-1766999496.webp" },
    { name: "Sunscreen", imgUrl: "https://cms.beautybooth.com.bd/uploads/cms-migrate/sunscreen-web-1766999538.webp" }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16 select-none">
      <div className="flex items-center justify-between pb-1 mb-6">
        <h3 className="text-2xl font-black text-black tracking-tight uppercase">
          Best of Skincare
        </h3>
        <button 
          onClick={() => {
            router.push("/products?category=Skin Care");
          }} 
          className="text-xs font-bold border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 px-4 py-1.5 rounded-full text-zinc-700 cursor-pointer"
        >
          See All →
        </button>
      </div>

      <div className="bg-[#f9bed8] p-8 sm:p-12 rounded-3xl grid grid-cols-3 gap-4 justify-items-center items-center shadow-xs">
        {steps.map((step, i) => (
          <button 
            key={i} 
            onClick={() => {
              const categoryQuery = step.name === "Cleanser" 
                ? "Cleansers" 
                : step.name === "Sunscreen" 
                  ? "Sun Protection" 
                  : "Serums & Treatments";
              
              router.push(`/products?category=${encodeURIComponent(categoryQuery)}`);
            }}
            className="flex flex-col items-center gap-3.5 text-center group cursor-pointer focus:outline-none"
          >
            {/* Concentric Dual-Ring Category Border (Cyan Outer, White Mid, Cyan Inner) */}
            <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full p-[2.5px] sm:p-[3.5px] bg-[#a5f3fc] relative flex items-center justify-center shadow-xs group-hover:scale-102 transition-transform duration-300">
              <div className="w-full h-full rounded-full p-[2.5px] sm:p-[3.5px] bg-white flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden border-[2px] sm:border-[3px] border-[#a5f3fc]">
                  <img 
                    src={step.imgUrl} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={step.name} 
                  />
                </div>
              </div>
            </div>
            
            <span className="text-xs sm:text-sm font-black text-gray-900 uppercase tracking-tight block">
              {step.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
