"use client";

import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";

export default function ComboOffersBanner() {
  const router = useRouter();
  const { setToastMessage } = useApp();

  return (
    <section className="max-w-7xl mx-auto px-4 mt-12 select-none">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-6">
        <h3 className="text-lg font-black text-black tracking-wider uppercase">
          Combo Offers
        </h3>
      </div>

      <div 
        onClick={() => router.push("/products")}
        className="relative w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden shadow-sm border border-zinc-200 bg-zinc-950 flex items-center cursor-pointer group"
      >
        <img src="https://cms.beautybooth.com.bd/uploads/cms-migrate/combo-web-1768106696.webp" className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-700" alt="Combo Offer Banner Large" />
      </div>
    </section>
  );
}
