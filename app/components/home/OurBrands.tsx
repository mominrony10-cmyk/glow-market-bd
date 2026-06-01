"use client";

import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";

export default function OurBrands() {
  const router = useRouter();

  const brands = ["COSRX", "SKIN1004", "ANUA", "BEAUTY OF JOSEON", "DOT & KEY", "ABIB", "VT COSMETICS", "CARE:NEL", "JUMISO", "3W CLINIC"];

  return (
    <section id="our-brands" className="max-w-7xl mx-auto px-4 mt-16 select-none">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-6">
        <h3 className="text-lg font-black text-black tracking-wider uppercase">
          Our Brands
        </h3>
        <button onClick={() => router.push("/products")} className="text-xs font-bold border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 px-4 py-1.5 rounded-full text-zinc-700 cursor-pointer">see all →</button>
      </div>

      <div className="overflow-x-auto no-scrollbar flex gap-6 py-2 items-center">
        {brands.map((brand, i) => (
          <button
            key={i}
            onClick={() => {
              router.push(`/products?brand=${encodeURIComponent(brand)}`);
            }}
            className="bg-[#FAF9F6] border border-zinc-200 px-6 py-3 rounded-xl shadow-sm text-xs font-black text-gray-700 whitespace-nowrap hover:text-[#e11d48] hover:border-rose-200 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            {brand}
          </button>
        ))}
      </div>
    </section>
  );
}
