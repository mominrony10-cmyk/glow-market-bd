"use client";

import { useApp } from "../../context/AppContext";

export default function TopCategories() {
  const { setActiveBoishakhiTab, setToastMessage } = useApp();

  const categories = [
    { name: "Skincare", label: "Skincare", imgUrl: "https://cms.beautybooth.com.bd/uploads/cms-migrate/skincare-web-1766999117.webp" },
    { name: "Makeup", label: "Makeup", imgUrl: "https://cms.beautybooth.com.bd/uploads/cms-migrate/makeup-web-1766999147.webp" },
    { name: "Hair Care", label: "Hair Care", imgUrl: "https://cms.beautybooth.com.bd/uploads/cms-migrate/hair-care-web-1766999179.webp" },
    { name: "Bath & Body", label: "Bath & Body Care", imgUrl: "https://cms.beautybooth.com.bd/uploads/cms-migrate/bath-body-web-1766999208.webp" },
    { name: "Mom & Baby Care", label: "Mom & Baby Care", imgUrl: "https://cms.beautybooth.com.bd/uploads/cms-migrate/mom-baby-care-web-1766999237.webp" },
    { name: "Accessories", label: "Accessories", imgUrl: "https://cms.beautybooth.com.bd/uploads/cms-migrate/accessories-web-1766999294.webp" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-8 select-none">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-6">
        <h3 className="text-xl font-extrabold text-gray-900 tracking-tight uppercase">
          Top Categories
        </h3>
        <button 
          onClick={() => setToastMessage("Opening all categories catalogue.")}
          className="border border-zinc-200 hover:border-zinc-300 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-700 transition-colors flex items-center gap-1 bg-white cursor-pointer"
        >
          <span>See All</span>
          <span>→</span>
        </button>
      </div>

      <div className="flex md:grid md:grid-cols-6 overflow-x-auto no-scrollbar gap-5 pb-2 md:pb-0 justify-start md:justify-center">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (cat.name === "Skincare") {
                setActiveBoishakhiTab("Serum");
              }
              setToastMessage(`Switched Category to: ${cat.label}`);
            }}
            className="flex flex-col items-center gap-2 group cursor-pointer shrink-0 min-w-[90px] md:min-w-0"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-[2.5px] bg-white border-[2.5px] border-[#bae6fd] shadow-xs group-hover:scale-105 transition-transform duration-300 relative flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-full p-[2.5px] bg-white border-[2.5px] border-[#fbcfe8] flex items-center justify-center overflow-hidden">
                <img src={cat.imgUrl} className="w-full h-full object-cover rounded-full" alt={cat.label} />
              </div>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-gray-900 group-hover:text-[#e11d48] transition-colors mt-1 text-center block whitespace-nowrap">
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
