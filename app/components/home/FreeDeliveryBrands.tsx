"use client";

import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";

export default function FreeDeliveryBrands() {
  const router = useRouter();
  const { setToastMessage } = useApp();

  const brands = [
    { 
      name: "ABIB", 
      rate: "Up to 35% Off", 
      desc: "Free Delivery Over 999 bdt",
      bg: "https://cms.beautybooth.com.bd/uploads/brand/up-to-35-off-web-1777870861.webp",
      logo: "https://cms.beautybooth.com.bd/uploads/all/abib-product-price-in-bd.png"
    },
    { 
      name: "DABO", 
      rate: "Up to 28% Off", 
      desc: "Free Delivery over 999 bdt",
      bg: "https://cms.beautybooth.com.bd/uploads/brand/up-to-28-off-web-1777870878.webp",
      logo: "https://cms.beautybooth.com.bd/uploads/all/Wv4FYm25qo3dBuE7jPPA5ZZLtqXn5S4Xt2z5Cx33.webp"
    },
    { 
      name: "HARUHARU", 
      rate: "Up to 18% Off", 
      desc: "Free Delivery over 999 bdt",
      bg: "https://cms.beautybooth.com.bd/uploads/brand/up-to-18-off-web-1777870894.webp",
      logo: "https://cms.beautybooth.com.bd/uploads/all/c6r8L1jF22qoq0LC1QbIBp5pNchTLOZXAAyTU7Lr.png"
    },
    { 
      name: "NUMBUZIN", 
      rate: "Up to 26% Off", 
      desc: "Free Delivery over 999 bdt",
      bg: "https://cms.beautybooth.com.bd/uploads/brand/up-to-26-off-web-1777870911.webp",
      logo: "https://cms.beautybooth.com.bd/uploads/all/numbuzin-products.webp"
    },
    { 
      name: "VT COSMETICS", 
      rate: "Up to 18% Off.", 
      desc: "Free Delivery over 999 bdt",
      bg: "https://cms.beautybooth.com.bd/uploads/brand/up-to-18-off-web-1777870931.webp",
      logo: "https://cms.beautybooth.com.bd/uploads/all/OJFHpDqpawLfd8JrKe0kvLUQTGkhZ4HRPvJw6lvY.webp"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16 select-none">
      <div className="pb-1 mb-6">
        <h3 className="text-2xl font-black text-black tracking-tight uppercase">
          Free Delivery Available
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
            {/* Arched Poster Card with Lavender Background */}
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-xs hover:shadow transition-shadow relative">
              <img 
                src={br.bg} 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                alt={br.name} 
              />
            </div>

            {/* Centered Small Logo Badge */}
            <div className="h-6 flex items-center justify-center mt-3 select-none">
              <img 
                src={br.logo} 
                className="max-h-full max-w-[80px] object-contain opacity-90 group-hover:opacity-100 transition-opacity" 
                alt={br.name} 
              />
            </div>

            {/* Discount Labels */}
            <div className="text-center mt-1">
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
