"use client";

import { useApp } from "../../context/AppContext";

export default function Top3Beauty() {
  const { setSearchQuery, setToastMessage } = useApp();

  const items = [
    { label: "Face", imgUrl: "https://cms.beautybooth.com.bd/uploads/beauty/face-web-1766999341.webp" },
    { label: "Eyes", imgUrl: "https://cms.beautybooth.com.bd/uploads/beauty/eye-web-1766999370.webp" },
    { label: "Lips", imgUrl: "https://cms.beautybooth.com.bd/uploads/beauty/lips-web-1760861077.webp" }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16 select-none">
      <div className="flex items-center justify-between pb-1 mb-6">
        <h3 className="text-2xl font-black text-black tracking-tight uppercase">
          Top 3 of Beauty
        </h3>
        <button 
          onClick={() => setToastMessage("Exploring Trending collections...")} 
          className="text-xs font-bold border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 px-4 py-1.5 rounded-full text-zinc-700 cursor-pointer"
        >
          See All →
        </button>
      </div>

      <div className="bg-[#edd3c4] p-8 sm:p-12 rounded-3xl grid grid-cols-3 gap-4 justify-items-center items-center shadow-xs">
        {items.map((item, i) => (
          <button 
            key={i} 
            onClick={() => {
              setSearchQuery(item.label);
              setToastMessage(`Viewing products for: ${item.label}`);
            }}
            className="flex flex-col items-center gap-3.5 text-center group cursor-pointer focus:outline-none"
          >
            {/* Concentric Dual-Ring Category Border (Cyan Outer, Pink Inner) */}
            <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full p-[2.5px] sm:p-[3.5px] bg-[#a5f3fc] relative flex items-center justify-center shadow-xs group-hover:scale-102 transition-transform duration-300">
              <div className="w-full h-full rounded-full p-[2.5px] sm:p-[3.5px] bg-[#fbcfe8] flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden border-[2px] sm:border-[3px] border-white">
                  <img 
                    src={item.imgUrl} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={item.label} 
                  />
                </div>
              </div>
            </div>
            
            <span className="text-xs sm:text-sm font-black text-gray-900 uppercase tracking-tight block">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
