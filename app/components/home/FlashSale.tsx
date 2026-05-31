"use client";

import { useApp } from "../../context/AppContext";
import { PRODUCTS_DATA } from "../../data/products";

export default function FlashSale() {
  const { addToCart, setShowQuickView } = useApp();

  const flashSaleProducts = PRODUCTS_DATA.filter((p) => p.isFlashSale);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16 select-none">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-6">
        <h3 className="text-lg font-black text-black tracking-wider uppercase">
          Flash Sale
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {flashSaleProducts.slice(0, 4).map((p) => (
          <div
            key={p.id}
            onClick={() => setShowQuickView(p)}
            className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow group relative cursor-pointer"
          >
            <span className="absolute top-3 left-3 bg-[#e11d48] text-white font-extrabold text-[9px] px-2 py-0.5 rounded shadow z-10">FLASH DEAL</span>

            <div className="w-full aspect-square bg-[#FAF9F6] rounded-xl flex items-center justify-center p-3 relative overflow-hidden shrink-0">
              <img src={p.imageUrl} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" alt={p.name} />
            </div>

            <div className="mt-3 flex flex-col gap-1.5 flex-1 justify-between">
              <div>
                <span className="text-[9px] font-bold text-zinc-400 uppercase block">{p.brand}</span>
                <h4 className="text-xs sm:text-sm font-bold text-black leading-snug line-clamp-2 mt-0.5 group-hover:text-[#e11d48] min-h-[36px]">
                  {p.name}
                </h4>
              </div>

              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between mt-2">
                <div className="flex flex-col">
                  <span className="text-sm font-black text-[#e11d48]">৳{p.price}</span>
                  <span className="text-[10px] text-zinc-400 line-through">৳{p.originalPrice}</span>
                </div>
                <button
                  onClick={(e) => addToCart(p, e)}
                  className="bg-black hover:bg-[#e11d48] text-white font-extrabold text-[10px] py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
