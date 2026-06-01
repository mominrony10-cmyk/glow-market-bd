"use client";

import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";

export default function ExclusiveAccessories() {
  const router = useRouter();
  const { setToastMessage } = useApp();

  const accessories = [
    { title: "Heatless Curling Rod Headband Hair Curler", bg: "https://cms.beautybooth.com.bd/uploads/cms-migrate/heatless-curling-rod-headband-hair-curler-web-1768383159.webp" },
    { title: "Electric Waterproof Silicone Body Bath Brush", bg: "https://cms.beautybooth.com.bd/uploads/cms-migrate/electric-bath-brush-web-1768383197.webp" },
    { title: "Automatic Makeup Brush Cleaner With Dryer Machine", bg: "https://cms.beautybooth.com.bd/uploads/cms-migrate/automatic-makeup-brush-cleaner-web-1768383237.webp" }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16 select-none">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-6">
        <h3 className="text-lg font-black text-black tracking-wider uppercase">
          Exclusive Accessories
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accessories.map((acc, i) => (
          <div 
            key={i} 
            onClick={() => router.push("/products?category=Accessories")}
            className="rounded-2xl border border-zinc-200 overflow-hidden h-[180px] shadow-sm hover:shadow transition-shadow relative group cursor-pointer"
          >
            <img src={acc.bg} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" alt={acc.title} />
          </div>
        ))}
      </div>
    </section>
  );
}
