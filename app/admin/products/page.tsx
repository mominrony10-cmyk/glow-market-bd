"use client";

import React, { useState } from "react";
import { PRODUCTS_DATA } from "../../data/products";
import { Product } from "../../context/AppContext";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [skinFilter, setSkinFilter] = useState("All");

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<Product | null>(null);

  // New product form state
  const [newName, setNewName] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newCategory, setNewCategory] = useState("Serum");
  const [newSkinType, setNewSkinType] = useState("Normal");
  const [newPrice, setNewPrice] = useState(1000);
  const [newOriginalPrice, setNewOriginalPrice] = useState(1200);
  const [newImageUrl, setNewImageUrl] = useState("https://cms.beautybooth.com.bd/uploads/all/sunsilk-power-shot-treatment-for-damage-repair-20ml_89.webp");

  // Edit product form state
  const [editName, setEditName] = useState("");
  const [editBrand, setEditBrand] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editSkinType, setEditSkinType] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editOriginalPrice, setEditOriginalPrice] = useState(0);

  const categories = [
    "All", "Essences", "Toner", "Moisturizers", "Accessories", "Serum", "Cleansers", "Sun Protection", "Hair Care"
  ];
  const skinTypes = ["All", "Normal", "Sensitive", "Dry", "Oily"];

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || prod.category === categoryFilter;
    const matchesSkin = skinFilter === "All" || prod.skinType === skinFilter;
    return matchesSearch && matchesCategory && matchesSkin;
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleOpenAdd = () => {
    setNewName("");
    setNewBrand("");
    setNewCategory("Serum");
    setNewSkinType("Normal");
    setNewPrice(1000);
    setNewOriginalPrice(1200);
    setIsAddOpen(true);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newBrand) {
      alert("Please fill in Name and Brand");
      return;
    }
    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const discountVal = Math.round(((newOriginalPrice - newPrice) / newOriginalPrice) * 100);
    const newProd: Product = {
      id: newId,
      name: newName,
      brand: newBrand.toUpperCase(),
      category: newCategory,
      skinType: newSkinType,
      rating: 5,
      price: newPrice,
      originalPrice: newOriginalPrice,
      discount: discountVal > 0 ? discountVal : 0,
      imageColor: "from-zinc-100 to-zinc-200",
      imageUrl: newImageUrl,
      isBogo: false,
      isFlashSale: false,
      isFlatPercentage: false
    };
    setProducts([newProd, ...products]);
    setIsAddOpen(false);
  };

  const handleOpenEdit = (prod: Product) => {
    setCurrentEdit(prod);
    setEditName(prod.name);
    setEditBrand(prod.brand);
    setEditCategory(prod.category);
    setEditSkinType(prod.skinType);
    setEditPrice(prod.price);
    setEditOriginalPrice(prod.originalPrice);
    setIsEditOpen(true);
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEdit) return;
    const discountVal = Math.round(((editOriginalPrice - editPrice) / editOriginalPrice) * 100);
    const updated = products.map((p) => {
      if (p.id === currentEdit.id) {
        return {
          ...p,
          name: editName,
          brand: editBrand.toUpperCase(),
          category: editCategory,
          skinType: editSkinType,
          price: editPrice,
          originalPrice: editOriginalPrice,
          discount: discountVal > 0 ? discountVal : 0,
        };
      }
      return p;
    });
    setProducts(updated);
    setIsEditOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. Header controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Product Catalog</h1>
          <span className="text-[13px] font-bold text-zinc-400 uppercase tracking-widest">
            Manage {products.length} registered products
          </span>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#FF1A58] hover:bg-[#e11d48] text-white text-xs font-black uppercase px-6 py-3 rounded-2xl transition-all shadow-lg shadow-[#FF1A58]/20 cursor-pointer active:scale-95 duration-100"
        >
          + Add New Product
        </button>
      </div>

      {/* 2. Filters card */}
      <div className="bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-4 shadow-xs">
        {/* Search */}
        <div className="flex-1 w-full relative">
          <input
            type="text"
            placeholder="Search by product name or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-50/50 border border-zinc-200 rounded-2xl py-3 px-4 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#FF1A58] focus:bg-white transition-all font-semibold"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-48">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-zinc-50/50 border border-zinc-200 rounded-2xl py-3 px-4 text-sm text-zinc-700 font-bold focus:outline-none focus:border-[#FF1A58] focus:bg-white transition-all"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Skin Type Filter */}
        <div className="w-full md:w-48">
          <select
            value={skinFilter}
            onChange={(e) => setSkinFilter(e.target.value)}
            className="w-full bg-zinc-50/50 border border-zinc-200 rounded-2xl py-3 px-4 text-sm text-zinc-700 font-bold focus:outline-none focus:border-[#FF1A58] focus:bg-white transition-all"
          >
            {skinTypes.map((st) => (
              <option key={st} value={st}>{st} Skin</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Product Catalog Table */}
      <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 text-xs uppercase tracking-widest text-zinc-400 font-extrabold select-none bg-zinc-50/30">
                <th className="py-4.5 px-6">Product details</th>
                <th className="py-4.5 px-6">Category</th>
                <th className="py-4.5 px-6">Skin Type</th>
                <th className="py-4.5 px-6">Price Details</th>
                <th className="py-4.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-zinc-50/30 transition-colors">
                  {/* Detail */}
                  <td className="py-4 px-6 flex items-center gap-4.5 max-w-[280px] sm:max-w-sm">
                    <div className="w-12 h-12 rounded-xl bg-white p-1 border border-zinc-100 shrink-0 select-none shadow-xs">
                      <img src={prod.imageUrl} className="w-full h-full object-contain" alt="" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-black text-[#FF1A58] uppercase tracking-wide truncate">{prod.brand}</span>
                      <span className="text-sm font-bold text-zinc-900 mt-0.5 leading-normal truncate">{prod.name}</span>
                      <span className="text-xs font-semibold text-zinc-400 mt-0.5">ID: #{prod.id}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-6 text-sm font-semibold text-zinc-600">
                    {prod.category}
                  </td>

                  {/* Skin Type */}
                  <td className="py-4 px-6">
                    <span className="text-xs font-bold uppercase bg-zinc-50 text-zinc-600 border border-zinc-200/60 px-3 py-1 rounded-full">
                      {prod.skinType}
                    </span>
                  </td>

                  {/* Price info */}
                  <td className="py-4 px-6 select-text">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-black text-[#FF1A58]">৳{prod.price}</span>
                      {prod.discount > 0 && (
                        <span className="text-[11px] font-semibold text-zinc-400 line-through">
                          ৳{prod.originalPrice} <span className="text-rose-500 font-extrabold">-{prod.discount}%</span>
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="bg-zinc-50 hover:bg-zinc-100 text-zinc-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-zinc-200 hover:border-zinc-300 cursor-pointer active:scale-95 duration-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-rose-100 hover:border-rose-200 cursor-pointer active:scale-95 duration-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs font-semibold text-zinc-400 select-none">
                    No products matched your search queries.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Add Product Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200/80 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <span className="font-extrabold text-lg text-zinc-900">Create New Product</span>
              <button onClick={() => setIsAddOpen(false)} className="text-zinc-400 hover:text-zinc-900 cursor-pointer font-bold">✕</button>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-zinc-400">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Niacinamide Balancing Daily Cleanser"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:outline-none focus:border-[#FF1A58] focus:bg-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-zinc-400">Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Good Molecules"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:outline-none focus:border-[#FF1A58] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-zinc-400">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-700 focus:outline-none focus:bg-white"
                  >
                    {categories.filter(c => c !== "All").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-zinc-400">Skin Type</label>
                  <select
                    value={newSkinType}
                    onChange={(e) => setNewSkinType(e.target.value)}
                    className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-700 focus:outline-none focus:bg-white"
                  >
                    {skinTypes.filter(st => st !== "All").map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-zinc-400">Offer Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:outline-none focus:border-[#FF1A58] focus:bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-zinc-400">Original Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(Number(e.target.value))}
                    className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:outline-none focus:border-[#FF1A58] focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#FF1A58] hover:bg-[#e11d48] text-white py-3 rounded-xl text-xs font-black uppercase mt-4 transition-all shadow-md active:scale-95 duration-100 cursor-pointer"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. Edit Product Modal */}
      {isEditOpen && currentEdit && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-200/80 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <span className="font-extrabold text-lg text-zinc-900">Modify Catalog Details</span>
              <button onClick={() => setIsEditOpen(false)} className="text-zinc-400 hover:text-zinc-900 cursor-pointer font-bold">✕</button>
            </div>
            
            <form onSubmit={handleEditProduct} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-zinc-400">Product Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:outline-none focus:border-[#FF1A58] focus:bg-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-zinc-400">Brand Name</label>
                <input
                  type="text"
                  required
                  value={editBrand}
                  onChange={(e) => setEditBrand(e.target.value)}
                  className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:outline-none focus:border-[#FF1A58] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-zinc-400">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-700 focus:outline-none focus:bg-white"
                  >
                    {categories.filter(c => c !== "All").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-zinc-400">Skin Type</label>
                  <select
                    value={editSkinType}
                    onChange={(e) => setEditSkinType(e.target.value)}
                    className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-700 focus:outline-none focus:bg-white"
                  >
                    {skinTypes.filter(st => st !== "All").map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-zinc-400">Offer Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:outline-none focus:border-[#FF1A58] focus:bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-zinc-400">Original Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={editOriginalPrice}
                    onChange={(e) => setEditOriginalPrice(Number(e.target.value))}
                    className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:outline-none focus:border-[#FF1A58] focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#FF1A58] hover:bg-[#e11d48] text-white py-3 rounded-xl text-xs font-black uppercase mt-4 transition-all shadow-md active:scale-95 duration-100 cursor-pointer"
              >
                Apply Modifications
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
