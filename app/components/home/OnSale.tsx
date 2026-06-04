"use client";

import { useApp } from "../../context/AppContext";

export default function OnSale() {
  const { products, addToCart, toggleWishlist, wishlist, setShowQuickView } = useApp();

  const onSaleProducts = products.filter((p) => p.discount > 0);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-6">
        <h3 className="text-lg font-black text-black tracking-wider uppercase">
          On Sale
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {onSaleProducts.slice(0, 4).map((p) => (
          <div
            key={p.id}
            onClick={() => setShowQuickView(p)}
            className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow group relative cursor-pointer"
          >
            <span className="absolute top-3 left-3 bg-[#e11d48] text-white font-extrabold text-[9px] px-2 py-0.5 rounded shadow z-10">ON SALE</span>
            
            <button
              onClick={(e) => toggleWishlist(p.id, e)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 text-zinc-500 hover:text-[#e11d48] flex items-center justify-center shadow-sm border border-zinc-100 cursor-pointer z-10"
            >
              <svg className={`w-4.5 h-4.5 stroke-current stroke-2 ${wishlist.has(p.id) ? "fill-[#e11d48] text-[#e11d48]" : "fill-none"}`} viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <div className="w-full aspect-square bg-[#FAF9F6] rounded-xl flex items-center justify-center p-3 relative overflow-hidden shrink-0">
              <img src={p.imageUrl} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" alt={p.name} />
            </div>

            <div className="mt-3 flex flex-col gap-1.5 flex-1 justify-between">
              <div>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">{p.brand}</span>
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
                  className="bg-black hover:bg-[#e11d48] text-white font-extrabold text-[10px] uppercase py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
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
