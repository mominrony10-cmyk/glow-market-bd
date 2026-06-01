"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";

export default function FlatSalesPercentage() {
  const router = useRouter();
  const { setToastMessage } = useApp();

  const brands = [
    {
      id: "carenel",
      name: "CARE:NEL",
      discount: "16",
      bannerImg: "https://cms.beautybooth.com.bd/uploads/cms-migrate/flat-16-off-web-1766996913.webp",
      iconImg: "https://cms.beautybooth.com.bd/uploads/all/Wv4FYm25qo3dBuE7jPPA5ZZLtqXn5S4Xt2z5Cx33.webp"
    },
    {
      id: "jumiso",
      name: "JUMISO",
      discount: "16",
      bannerImg: "https://cms.beautybooth.com.bd/uploads/cms-migrate/flat-16-off-web-1766996866.webp",
      iconImg: "https://cms.beautybooth.com.bd/uploads/all/abib-product-price-in-bd.png"
    },
    {
      id: "apieu",
      name: "APIEU",
      discount: "14",
      bannerImg: "https://cms.beautybooth.com.bd/uploads/cms-migrate/flat-14-off-web-1766996776.webp",
      iconImg: "https://cms.beautybooth.com.bd/uploads/all/numbuzin-products.webp"
    },
    {
      id: "aplb",
      name: "APLB",
      discount: "13",
      bannerImg: "https://cms.beautybooth.com.bd/uploads/cms-migrate/flat-13-off-web-1766996742.webp",
      iconImg: "https://cms.beautybooth.com.bd/uploads/all/abib-product-price-in-bd.png"
    },
    {
      id: "3wclinic",
      name: "3W CLINIC",
      discount: "13",
      bannerImg: "https://cms.beautybooth.com.bd/uploads/cms-migrate/flat-13-off-web-1766996708.webp",
      iconImg: "https://cms.beautybooth.com.bd/uploads/all/OJFHpDqpawLfd8JrKe0kvLUQTGkhZ4HRPvJw6lvY.webp"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16 select-none">
      {/* Title Block */}
      <div className="pb-1 mb-8">
        <h3 className="text-2xl font-black text-black tracking-tight uppercase">
          Flat Sales Percentage
        </h3>
      </div>

      {/* 5-Column High-Fidelity Campaign Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5 sm:gap-6">
        {brands.map((b) => (
          <div
            key={b.id}
            onClick={() => {
              router.push(`/products?brand=${encodeURIComponent(b.name)}`);
            }}
            className="flex flex-col items-center group cursor-pointer"
          >
            {/* High-Fidelity Production WebP Banner Container */}
            <div className="w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 bg-zinc-50 relative">
              <img
                src={b.bannerImg}
                className="w-full h-full object-cover"
                alt={`${b.name} Flat Sales Campaign Banner`}
              />
            </div>

            {/* Bottom Brand Promotion Details Section */}
            <div className="mt-4 flex flex-col items-center text-center">
              {/* Brand Logo Square Icon */}
              <div className="w-7 h-7 rounded-sm border border-zinc-150 bg-white p-0.5 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
                <img
                  src={b.iconImg}
                  className="max-h-full max-w-full object-contain"
                  alt={b.name}
                />
              </div>

              {/* Flat Percentage Off Label */}
              <span className="text-sm sm:text-[15px] font-black text-[#e11d48] mt-2 block">
                Flat {b.discount}% Off
              </span>

              {/* Entire Brand Subtitle */}
              <span className="text-[11px] font-bold text-zinc-500 mt-0.5 block uppercase tracking-wider">
                On Entire Brand
              </span>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
