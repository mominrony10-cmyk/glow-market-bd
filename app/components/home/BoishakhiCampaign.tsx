"use client";

import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";
import { PRODUCTS_DATA } from "../../data/products";

export default function BoishakhiCampaign() {
  const router = useRouter();
  const {
    activeBoishakhiTab,
    setActiveBoishakhiTab,
    addToCart,
    toggleWishlist,
    wishlist,
    setShowQuickView,
    setToastMessage,
  } = useApp();

  const filteredProducts = PRODUCTS_DATA.filter((p) => p.category === activeBoishakhiTab);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">

      <div className="flex items-center justify-between pb-1 mb-5">
        <h3 className="text-2xl font-black text-black tracking-tight uppercase">
          BOISHAKHI OFFER
        </h3>
        <button
          onClick={() => setToastMessage("Loading all campaign listings...")}
          className="text-xs font-bold border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 px-4 py-1.5 rounded-full text-zinc-700 shrink-0 cursor-pointer"
        >
          See All →
        </button>
      </div>

      {/* Category Tabs list */}
      <div className="flex overflow-x-auto no-scrollbar gap-2.5 mb-6 pb-1 select-none">
        {["Serum", "Essences", "Cleansers", "Toner", "Moisturizers", "Exfoliators", "Sun Protection", "Hair Care"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveBoishakhiTab(tab);
              setToastMessage(`Boishakhi offer changed to: ${tab}`);
            }}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 cursor-pointer ${activeBoishakhiTab === tab
                ? "bg-[#310062] text-white border-[#310062]"
                : "bg-white text-zinc-500 border-zinc-300 hover:bg-zinc-50 hover:text-zinc-800"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Filtered Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => router.push(`/product/${p.id}`)}
              className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow transition-shadow group relative cursor-pointer"
            >
              <span className="absolute top-3 left-3 bg-[#e11d48] text-white font-extrabold text-[9px] px-2 py-0.5 rounded shadow z-10">ON SALE</span>

              {/* Heart outline favorite toggler */}
              <button
                onClick={(e) => toggleWishlist(p.id, e)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 text-zinc-500 hover:text-[#e11d48] flex items-center justify-center shadow-sm border border-zinc-100 transition-colors cursor-pointer z-10"
              >
                <svg className={`w-4.5 h-4.5 stroke-current stroke-2 ${wishlist.has(p.id) ? "fill-[#e11d48] text-[#e11d48]" : "fill-none"}`} viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              <div className="w-full aspect-square bg-[#FAF9F6] rounded-xl flex items-center justify-center p-3 relative overflow-hidden shrink-0">
                <img
                  src={p.imageUrl}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  alt={p.name}
                />
              </div>

              <div className="mt-3 flex flex-col gap-1.5 flex-1 justify-between">
                <div>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">{p.brand}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-black leading-snug line-clamp-2 mt-0.5 group-hover:text-[#e11d48] transition-colors min-h-[36px]">
                    {p.name}
                  </h4>
                  <div className="flex items-center gap-0.5 text-amber-500 text-xs mt-1">
                    {"★".repeat(p.rating)}
                  </div>
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
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-zinc-400 font-semibold">
            No active campaign items in this tab.
          </div>
        )}
      </div>
    </section>
  );
}
