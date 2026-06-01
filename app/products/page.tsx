"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PRODUCTS_DATA } from "../data/products";
import { useApp, Product } from "../context/AppContext";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart, toggleWishlist, wishlist, setToastMessage } = useApp();

  // URL State Synchronizer
  const initialCategory = searchParams?.get("category") || "";
  const initialSearch = searchParams?.get("q") || "";
  const initialBrand = searchParams?.get("brand") || "";
  const initialMaxPrice = searchParams?.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 15000;

  // State Management
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [sortBy, setSortBy] = useState("New Arrival");

  // Mobile Filter Drawer Toggle
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync category selection if set via search params
  useEffect(() => {
    if (initialCategory) {
      if (initialCategory === "Skincare" || initialCategory === "Skin Care") {
        setSelectedCategories(["Skin Care"]);
      } else {
        setSelectedCategories([initialCategory]);
      }
    } else {
      setSelectedCategories([]);
    }
  }, [initialCategory]);

  // Sync brand selection if set via search params
  useEffect(() => {
    if (initialBrand) {
      setSelectedBrands([initialBrand]);
    } else {
      setSelectedBrands([]);
    }
  }, [initialBrand]);

  // Sync query if set via header search input
  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  // Sync maxPrice if set via URL search parameter (e.g. from Trending banners)
  useEffect(() => {
    const urlMaxPrice = searchParams?.get("maxPrice");
    if (urlMaxPrice) {
      setMaxPrice(Number(urlMaxPrice));
    }
  }, [searchParams]);

  // Show more filter toggles
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  // Constants
  const categoriesList = [
    { name: "Skin Care", count: 3045 },
    { name: "Moisturizers", count: 542 },
    { name: "Cleansers", count: 507 },
    { name: "Serums & Treatments", count: 481 },
    { name: "Moisturizing Cream", count: 479 },
    { name: "Toner", count: 320 },
    { name: "Hair Care", count: 215 },
    { name: "Accessories", count: 180 },
  ];

  const visibleCategories = showAllCategories ? categoriesList : categoriesList.slice(0, 5);

  const brandsList = [
    { name: "ANUA", count: 107 },
    { name: "MEDICUBE", count: 107 },
    { name: "GOOD MOLECULES", count: 105 },
    { name: "SOME BY MI", count: 107 },
    { name: "CERAVE", count: 107 },
    { name: "COSRX", count: 105 },
    { name: "BABY BRIGHT", count: 84 },
    { name: "SKIN1004", count: 81 },
    { name: "LOREAL", count: 64 },
  ];

  const visibleBrands = showAllBrands ? brandsList : brandsList.slice(0, 5);

  // Toggle Category Selection
  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Toggle Brand Selection
  const handleBrandToggle = (brandName: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName]
    );
  };

  // Clear All Filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(15000);
    setSearchQuery("");
    router.push("/products");
    setToastMessage("All filters cleared!");
  };

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      // 1. Text Search Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory) return false;
      }

      // 2. Category Filter
      if (selectedCategories.length > 0) {
        const isMatched = selectedCategories.some((cat) => {
          if (cat === "Skin Care") {
            return ["Serum", "Essences", "Cleansers", "Toner", "Moisturizers", "Sun Protection"].includes(p.category);
          }
          if (cat === "Moisturizers") {
            return p.category === "Moisturizers";
          }
          if (cat === "Cleansers") {
            return p.category === "Cleansers";
          }
          if (cat === "Serums & Treatments") {
            return ["Serum", "Essences"].includes(p.category);
          }
          if (cat === "Moisturizing Cream") {
            return p.category === "Moisturizers";
          }
          return p.category.toLowerCase() === cat.toLowerCase();
        });
        if (!isMatched) return false;
      }

      // 3. Brand Filter
      if (selectedBrands.length > 0) {
        const brandMatch = selectedBrands.some(
          (b) => p.brand.toUpperCase() === b.toUpperCase()
        );
        if (!brandMatch) return false;
      }

      // 4. Price Filter
      if (p.price < minPrice || p.price > maxPrice) return false;

      return true;
    });
  }, [searchQuery, selectedCategories, selectedBrands, minPrice, maxPrice]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "Price: Low to High") {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "Price: High to Low") {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "Best Selling") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    return list.sort((a, b) => b.id - a.id);
  }, [filteredProducts, sortBy]);

  // Helper component to render filter elements (reusable in desktop sidebar and mobile drawer)
  const renderFiltersContent = () => (
    <>
      {/* 1. Price Filter Component */}
      <div className="border-b border-zinc-100 pb-6 mb-6">
        <div className="flex items-center justify-between mb-4.5">
          <span className="font-bold text-zinc-900 text-sm tracking-tight">Price</span>
          <span className="text-xs font-semibold text-zinc-400">৳{minPrice} - ৳{maxPrice}</span>
        </div>
        
        {/* Custom Dual Slider styling */}
        <div className="relative w-full h-2 bg-zinc-100 rounded-lg mb-6 flex items-center">
          <div
            className="absolute h-full bg-zinc-900 rounded-lg"
            style={{
              left: `${(minPrice / 15000) * 100}%`,
              right: `${100 - (maxPrice / 15000) * 100}%`,
            }}
          />
          
          <input
            type="range"
            min="0"
            max="15000"
            step="100"
            value={minPrice}
            onChange={(e) => {
              const value = Math.min(Number(e.target.value), maxPrice - 500);
              setMinPrice(value);
            }}
            className="absolute w-full h-full appearance-none bg-transparent pointer-events-auto cursor-pointer focus:outline-none z-20 
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF1A58] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
          />

          <input
            type="range"
            min="0"
            max="15000"
            step="100"
            value={maxPrice}
            onChange={(e) => {
              const value = Math.max(Number(e.target.value), minPrice + 500);
              setMaxPrice(value);
            }}
            className="absolute w-full h-full appearance-none bg-transparent pointer-events-auto cursor-pointer focus:outline-none z-20
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF1A58] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
          />
        </div>

        {/* Price manual inputs */}
        <div className="flex items-center gap-3 justify-between">
          <div className="w-[45%] flex items-center border border-zinc-200 rounded-xl px-3 py-2 bg-[#FAFAFA] focus-within:border-zinc-400 transition-colors">
            <span className="text-xs text-zinc-400 mr-1.5 font-bold">৳</span>
            <input
              type="number"
              value={minPrice}
              min="0"
              max="15000"
              onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 100))}
              className="w-full bg-transparent outline-none border-none text-xs font-bold text-zinc-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          
          <span className="text-zinc-400 font-bold text-sm">—</span>

          <div className="w-[45%] flex items-center border border-zinc-200 rounded-xl px-3 py-2 bg-[#FAFAFA] focus-within:border-zinc-400 transition-colors">
            <span className="text-xs text-zinc-400 mr-1.5 font-bold">৳</span>
            <input
              type="number"
              value={maxPrice}
              min="0"
              max="15000"
              onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 100))}
              className="w-full bg-transparent outline-none border-none text-xs font-bold text-zinc-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Category checkboxes */}
      <div className="border-b border-zinc-100 pb-6 mb-6">
        <span className="font-bold text-zinc-900 text-sm tracking-tight block mb-4">Category</span>
        <div className="flex flex-col gap-3.5">
          {visibleCategories.map((cat) => {
            const isChecked = selectedCategories.includes(cat.name);
            return (
              <label key={cat.name} className="flex items-center justify-between group cursor-pointer select-none">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryToggle(cat.name)}
                    className="w-4.5 h-4.5 rounded-sm border-zinc-300 text-[#FF1A58] focus:ring-[#FF1A58]/20 transition-all cursor-pointer accent-[#FF1A58]"
                  />
                  <span className={`text-[13px] font-bold transition-colors duration-150 ${isChecked ? "text-[#FF1A58]" : "text-zinc-600 group-hover:text-zinc-950"}`}>
                    {cat.name}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-zinc-400 tracking-wide bg-zinc-50 px-2 py-0.5 rounded-full border border-zinc-100">
                  ({cat.count})
                </span>
              </label>
            );
          })}
        </div>

        {categoriesList.length > 5 && (
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="text-xs font-black text-[#FF1A58] hover:text-[#d01040] hover:underline cursor-pointer mt-4 flex items-center gap-1.5 transition-colors"
          >
            {showAllCategories ? "- Show less" : "+ Show more"}
          </button>
        )}
      </div>

      {/* 3. Brands checkboxes */}
      <div className="pb-2">
        <span className="font-bold text-zinc-900 text-sm tracking-tight block mb-4">Brands</span>
        <div className="flex flex-col gap-3.5">
          {visibleBrands.map((brand) => {
            const isChecked = selectedBrands.includes(brand.name);
            return (
              <label key={brand.name} className="flex items-center justify-between group cursor-pointer select-none">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleBrandToggle(brand.name)}
                    className="w-4.5 h-4.5 rounded-sm border-zinc-300 text-[#FF1A58] focus:ring-[#FF1A58]/20 transition-all cursor-pointer accent-[#FF1A58]"
                  />
                  <span className={`text-[13px] font-bold transition-colors duration-150 ${isChecked ? "text-[#FF1A58]" : "text-zinc-600 group-hover:text-zinc-950"}`}>
                    {brand.name}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-zinc-400 tracking-wide bg-zinc-50 px-2 py-0.5 rounded-full border border-zinc-100">
                  ({brand.count})
                </span>
              </label>
            );
          })}
        </div>

        {brandsList.length > 5 && (
          <button
            onClick={() => setShowAllBrands(!showAllBrands)}
            className="text-xs font-black text-[#FF1A58] hover:text-[#d01040] hover:underline cursor-pointer mt-4 flex items-center gap-1.5 transition-colors"
          >
            {showAllBrands ? "- Show less" : "+ Show more"}
          </button>
        )}
      </div>
    </>
  );

  return (
    <div className="bg-[#FCFCFC] min-h-screen py-6 sm:py-10 selection:bg-rose-100 selection:text-[#FF1A58]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main 2-Column Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          
          {/* DESKTOP SIDEBAR FILTER - Hidden on mobile, sticky on desktop */}
          <aside className="hidden lg:block lg:w-1/4 shrink-0 bg-white border border-zinc-100 rounded-3xl p-6 sm:p-7 shadow-xs self-start sticky top-28">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6">
              <h3 className="font-extrabold text-lg text-zinc-900 tracking-tight">Filters</h3>
              {(selectedCategories.length > 0 || selectedBrands.length > 0 || minPrice > 0 || maxPrice < 15000 || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-[#FF1A58] hover:underline cursor-pointer transition-all"
                >
                  Clear All
                </button>
              )}
            </div>

            {renderFiltersContent()}
          </aside>

          {/* MOBILE FILTER BOTTOM SHEET DRAWER - Slides up from the bottom */}
          {isFilterDrawerOpen && (
            <div 
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden flex items-end justify-center"
              onClick={() => setIsFilterDrawerOpen(false)}
            >
              <div 
                className="bg-white w-full max-h-[85vh] rounded-t-[32px] p-6 overflow-hidden flex flex-col justify-between shadow-2xl animate-slide-up relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header of Drawer */}
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4.5 mb-4 shrink-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-lg text-zinc-950">Filters</h3>
                    {(selectedCategories.length > 0 || selectedBrands.length > 0 || minPrice > 0 || maxPrice < 15000 || searchQuery) && (
                      <button
                        onClick={() => {
                          clearFilters();
                          setIsFilterDrawerOpen(false);
                        }}
                        className="text-xs font-black text-[#FF1A58] hover:underline"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold text-sm transition-colors border border-zinc-200 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Filters Content - Scrollable */}
                <div className="flex-1 overflow-y-auto no-scrollbar pr-1 py-2">
                  {renderFiltersContent()}
                </div>

                {/* Footer Action Button */}
                <div className="pt-4 border-t border-zinc-100 mt-4 shrink-0">
                  <button 
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="w-full bg-[#FF1A58] hover:bg-[#e11d48] text-white font-black text-sm uppercase py-3.5 rounded-2xl text-center shadow-lg transition-transform active:scale-98 cursor-pointer"
                  >
                    Apply Filters ({sortedProducts.length} Items)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT PRODUCT GRID SECTION */}
          <main className="w-full lg:w-3/4 flex flex-col">
            
            {/* Header row with Title & Sort Select / Mobile Filter button */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4.5 mb-6">
              <h2 className="text-lg sm:text-2xl font-black text-zinc-950 tracking-tight font-sans">
                {selectedCategories.length === 1 ? selectedCategories[0] : "All Products"}{" "}
                <span className="text-zinc-400 font-bold text-sm sm:text-lg">
                  ({sortedProducts.length})
                </span>
              </h2>

              <div className="flex items-center gap-2">
                {/* Mobile Filter Button - only visible on screen < lg */}
                <button
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 border border-zinc-200 hover:border-zinc-300 bg-white text-xs font-black text-zinc-700 px-3.5 py-2 rounded-2xl shadow-xs transition-colors cursor-pointer"
                >
                  <span className="text-[10px]">🔍</span>
                  <span>Filter</span>
                </button>

                {/* Styled Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none border border-zinc-200 hover:border-zinc-300 bg-white text-xs sm:text-[13px] font-bold text-zinc-700 pl-4 pr-9 py-2 sm:py-2.5 rounded-2xl shadow-xs transition-colors outline-none cursor-pointer"
                  >
                    <option>New Arrival</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Best Selling</option>
                  </select>
                  <div className="absolute right-4.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 font-bold text-xs select-none">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Grid of high-end product cards */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {sortedProducts.map((p) => {
                  const hasDiscount = p.originalPrice > p.price;
                  return (
                    <div
                      key={p.id}
                      onClick={() => router.push(`/product/${p.id}`)}
                      className="bg-white border border-zinc-100 rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group relative cursor-pointer"
                    >
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 select-none">
                        <span className="bg-[#00D084] text-white text-[8px] sm:text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                          NEW!
                        </span>
                        {hasDiscount && (
                          <span className="bg-[#FF1A58] text-white text-[8px] sm:text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                            ON SALE
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => toggleWishlist(p.id, e)}
                        className="absolute top-4 right-4 w-8.5 h-8.5 rounded-full bg-white/90 hover:bg-white text-zinc-400 hover:text-[#FF1A58] flex items-center justify-center shadow-xs border border-zinc-100/60 transition-all active:scale-95 z-20 cursor-pointer"
                      >
                        <svg
                          className={`w-4 sm:w-4.5 h-4 sm:h-4.5 stroke-current stroke-2.5 transition-colors ${
                            wishlist.has(p.id) ? "fill-[#FF1A58] text-[#FF1A58]" : "fill-none"
                          }`}
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>

                      <div className="w-full aspect-square bg-[#FCFCFA] rounded-2xl flex items-center justify-center p-3 relative overflow-hidden shrink-0 mt-3.5 mb-2">
                        <img
                          src={p.imageUrl}
                          className="max-h-[92%] max-w-[92%] object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
                          alt={p.name}
                        />
                      </div>

                      <div className="mt-4 flex flex-col flex-1 justify-between text-left">
                        <div>
                          <span className="text-[10px] sm:text-[11px] font-black text-amber-900/65 uppercase tracking-widest block font-sans">
                            {p.brand}
                          </span>
                          
                          <h4 className="text-xs sm:text-[13.5px] font-bold text-zinc-800 leading-snug line-clamp-2 mt-1 min-h-[38px] group-hover:text-[#FF1A58] transition-colors font-sans">
                            {p.name}
                          </h4>
                        </div>

                        <div className="flex items-baseline gap-2.5 mt-3 pt-3.5 border-t border-zinc-50 font-sans">
                          {hasDiscount ? (
                            <>
                              <span className="text-xs sm:text-[13px] text-zinc-400 line-through font-medium">
                                ৳{p.originalPrice}
                              </span>
                              <span className="text-sm sm:text-base font-extrabold text-[#FF1A58] tracking-tight">
                                ৳{p.price}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm sm:text-base font-extrabold text-zinc-950 tracking-tight">
                              ৳{p.price}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p, e);
                        }}
                        className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-zinc-950 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md border border-zinc-800 active:scale-95 cursor-pointer z-10"
                        title="Add to Cart"
                      >
                        <svg className="w-4 h-4 fill-none stroke-current stroke-2.5" viewBox="0 0 24 24">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-zinc-100 rounded-3xl p-8">
                <svg className="w-14 h-14 text-zinc-300 mb-4 stroke-current stroke-1" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="font-bold text-zinc-800 text-lg mb-1">No products found</h3>
                <p className="text-zinc-500 text-xs sm:text-sm max-w-md">
                  We couldn't find any cosmetics matching your current price slider or category selections.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-5 px-5 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-[#FF1A58] animate-spin" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
