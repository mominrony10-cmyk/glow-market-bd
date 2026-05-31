"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FavouriteIcon,
  Share01Icon,
  ShoppingBag01Icon,
  CheckmarkCircle02Icon,
  DeliveryTruckIcon,
  ArrowRight01Icon,
  StarIcon,
  Shield01Icon,
  ArrowReloadHorizontalIcon,
  CleanIcon,
  FireIcon,
  AiPhone01Icon,
  BarCode01Icon,
  Award01Icon,
} from "@hugeicons/core-free-icons";
import { useApp, Product } from "../../context/AppContext";
import { PRODUCTS_DATA } from "../../data/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id, 10);
  
  const {
    addToCart,
    toggleWishlist,
    wishlist,
    setShowCartDrawer,
    setToastMessage,
  } = useApp();

  const product = PRODUCTS_DATA.find((p) => p.id === productId);

  // States for dynamic rendering
  const [countdown, setCountdown] = useState({ days: 2, hours: 14, minutes: 30, seconds: 10 });
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-gray-800 uppercase tracking-wide">Product Not Found</h2>
        <p className="text-zinc-500 text-sm mt-2 max-w-sm leading-normal">
          We couldn't locate this premium cosmetic item in our catalog. It may have been discontinued or moved.
        </p>
        <Link
          href="/"
          className="mt-6 bg-[#FF1A58] hover:bg-[#e11d48] text-white font-extrabold text-xs uppercase px-8 py-3 rounded-full shadow transition-all tracking-wider"
        >
          Back to Storefront
        </Link>
      </div>
    );
  }

  // Calculate dynamic delivery dates: 2 days out to 5 days out
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const deliveryStart = new Date(today);
  deliveryStart.setDate(today.getDate() + 2);
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 5);

  const deliveryStr = `Delivery from ${deliveryStart.toLocaleDateString("en-US", options)} – ${deliveryEnd.toLocaleDateString("en-US", options)}`;

  // Formatted timer strings
  const formatNum = (n: number) => n.toString().padStart(2, "0");

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setToastMessage("Product link copied to clipboard!");
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const appPrice = Math.round(product.price * 0.88); // 12% extra discount for App Price!

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs Banner */}
      <div className="bg-zinc-50 py-3.5 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-zinc-500">
          <Link href="/" className="hover:text-[#FF1A58] transition-colors">Home</Link>
          <HugeiconsIcon icon={ArrowRight01Icon} size={10} className="text-zinc-400" />
          <span className="hover:text-[#FF1A58] transition-colors">{product.category}</span>
          <HugeiconsIcon icon={ArrowRight01Icon} size={10} className="text-zinc-400" />
          <span className="text-zinc-800 font-bold truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* LEFT COLUMN: Gallery & Main Image Preview */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square bg-[#FAF9F6] border border-zinc-100 rounded-3xl p-6 md:p-12 relative flex items-center justify-center overflow-hidden group shadow-sm">
              {/* Product Badge */}
              <span className="absolute top-4 left-4 bg-emerald-500 text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-sm tracking-wider select-none z-10">
                {product.discount > 0 ? `${product.discount}% OFF` : "NEW!"}
              </span>

              {/* Heart and Share floating actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className="w-10 h-10 rounded-full bg-white hover:bg-zinc-50 text-zinc-500 hover:text-[#e11d48] flex items-center justify-center shadow border border-zinc-100 cursor-pointer"
                  title="Save to Wishlist"
                >
                  <HugeiconsIcon
                    icon={FavouriteIcon}
                    size={20}
                    className={`${wishlist.has(product.id) ? "fill-[#e11d48] text-[#e11d48]" : "text-zinc-600"}`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className={`w-10 h-10 rounded-full bg-white hover:bg-zinc-50 flex items-center justify-center shadow border border-zinc-100 cursor-pointer ${copied ? "text-[#0B8043]" : "text-zinc-600"}`}
                  title="Share Product"
                >
                  <HugeiconsIcon icon={copied ? CheckmarkCircle02Icon : Share01Icon} size={20} />
                </button>
              </div>

              <img
                src={product.imageUrl}
                className="max-h-[380px] max-w-full object-contain"
                alt={product.name}
              />
            </div>

            {/* Thumbnail previews */}
            <div className="flex gap-3">
              <div className="w-20 h-20 bg-[#FAF9F6] border-2 border-[#FF1A58] rounded-xl p-2 flex items-center justify-center cursor-pointer shrink-0">
                <img src={product.imageUrl} className="w-full h-full object-contain" alt="" />
              </div>
              <div className="w-20 h-20 bg-[#FAF9F6] border border-zinc-200 hover:border-zinc-300 rounded-xl p-2 flex items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition-all shrink-0">
                <img src={product.imageUrl} className="w-full h-full object-contain rotate-90" alt="" />
              </div>
              <div className="w-20 h-20 bg-[#FAF9F6] border border-zinc-200 hover:border-zinc-300 rounded-xl p-2 flex items-center justify-center cursor-pointer opacity-70 hover:opacity-100 transition-all shrink-0">
                <img src={product.imageUrl} className="w-full h-full object-contain -rotate-90" alt="" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Actions & Info Details */}
          <div className="flex flex-col gap-6">
            
            {/* Promo timer */}
            <div className="bg-[#FFF5F5] py-2.5 px-4 rounded-xl text-center select-none">
              <span className="text-xs sm:text-sm font-semibold text-zinc-800">
                Sale Ends in{" "}
                <span className="text-[#FF1A58] font-extrabold ml-1">
                  {formatNum(countdown.days)}d: {formatNum(countdown.hours)}h: {formatNum(countdown.minutes)}m: {formatNum(countdown.seconds)}s
                </span>
              </span>
            </div>

            {/* Brand, Name, Rating */}
            <div>
              <div className="text-zinc-500 font-semibold text-xs sm:text-sm select-none">
                {product.category} • <span className="underline font-black text-zinc-800 uppercase">{product.brand}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-black leading-snug tracking-tight mt-2.5">{product.name}</h1>
              
              <div className="flex items-center gap-2 mt-3 select-none text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <HugeiconsIcon
                      key={i}
                      icon={StarIcon}
                      size={14}
                      className="text-[#FF1A58] fill-[#FF1A58]"
                    />
                  ))}
                </div>
                <span className="text-zinc-800 font-extrabold ml-1">
                  0
                </span>
                <span className="text-zinc-400 font-medium">
                  (0 reviews)
                </span>
                <span className="text-[#FF1A58] font-extrabold ml-2">
                  In Stock
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pb-2 select-none">
              <span className="text-3xl font-black text-[#FF1A58]">৳ {product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm font-semibold text-zinc-400 line-through">৳ {product.originalPrice}</span>
              )}
            </div>

            {/* Interactive Buy and Add Actions */}
            <div className="flex flex-col sm:flex-row gap-3 select-none">
              <button
                onClick={() => {
                  addToCart(product);
                  setToastMessage(`"${product.name.substring(0, 30)}..." added! Checkout now.`);
                  setShowCartDrawer(true);
                }}
                className="flex-1 bg-[#FF1A58] hover:bg-[#e11d48] text-white font-bold text-sm py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <HugeiconsIcon icon={ShoppingBag01Icon} size={18} />
                Add to bag
              </button>

              <button
                onClick={() => {
                  addToCart({ ...product, price: appPrice });
                  setToastMessage(`📱 App Promo Discount Applied! added to cart!`);
                  setShowCartDrawer(true);
                }}
                className="flex-1 bg-white hover:bg-rose-50 border-2 border-[#FF1A58] text-zinc-800 font-bold text-sm py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <HugeiconsIcon icon={AiPhone01Icon} size={18} className="text-[#FF1A58]" />
                App Price: ৳{appPrice}
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-[#FF1A58] ml-1" />
              </button>
            </div>

            {/* Premium Trust Cards Grid */}
            <div className="bg-[#FFF8F6] border border-[#FFE8E1] p-4 rounded-xl select-none">
              <div className="grid grid-cols-2 gap-y-3.5 gap-x-4">
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={Award01Icon} size={18} className="text-[#FF1A58]" />
                  <span className="text-xs font-bold text-zinc-800">100% Authentic Product</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={18} className="text-[#FF1A58]" />
                  <span className="text-xs font-bold text-zinc-800">Easy Returns Policy</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={DeliveryTruckIcon} size={18} className="text-[#FF1A58]" />
                  <span className="text-xs font-bold text-zinc-800">New User: 899+ Free Delivery</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={CleanIcon} size={18} className="text-[#FF1A58]" />
                  <span className="text-xs font-bold text-zinc-800">Cruelty-Free</span>
                </div>
              </div>
            </div>

            {/* Dynamic Delivery Info & Social Proof */}
            <div className="border border-zinc-200/60 rounded-xl p-4 flex flex-col gap-4 bg-white select-none">
              <div className="flex items-start gap-2.5">
                <HugeiconsIcon icon={DeliveryTruckIcon} size={18} className="text-[#FF1A58] mt-0.5 shrink-0" />
                <div className="flex-1 flex flex-col">
                  <span className="text-xs font-black text-zinc-800 leading-tight">Delivery info</span>
                  <span className="text-[11px] font-bold text-zinc-500 mt-1">
                    Delivery from {deliveryStart.toLocaleDateString("en-US", { day: "numeric", month: "short" })} ~ {deliveryEnd.toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <HugeiconsIcon icon={FireIcon} size={18} className="text-[#FF1A58] mt-0.5 shrink-0" />
                <div className="flex-1 flex flex-col">
                  <span className="text-xs font-black text-zinc-800 leading-tight">Fast selling</span>
                  <span className="text-[11px] font-bold text-zinc-500 mt-1">
                    People are loving it! Sold <span className="text-[#FF1A58] font-bold">{120 + (product?.id || 1) * 13}</span> pcs in last 24 hrs
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <HugeiconsIcon icon={BarCode01Icon} size={18} className="text-[#FF1A58] mt-0.5 shrink-0" />
                <div className="flex-1 flex flex-col">
                  <span className="text-xs font-black text-zinc-800 leading-tight">SKU code</span>
                  <span className="text-[11px] font-bold text-zinc-500 mt-1">
                    36005240782{80 + (product?.id || 1)}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed Product Information (Description & Ingredients) */}
        <div className="mt-12 md:mt-16 border-t border-zinc-100 pt-8">
          <div className="flex border-b border-zinc-200">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-3 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeTab === "description" ? "border-[#FF1A58] text-black" : "border-transparent text-zinc-400 hover:text-zinc-600"}`}
            >
              Description & Benefits
            </button>
            <button
              onClick={() => setActiveTab("ingredients")}
              className={`ml-8 pb-3 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeTab === "ingredients" ? "border-[#FF1A58] text-black" : "border-transparent text-zinc-400 hover:text-zinc-600"}`}
            >
              How to use & Ingredients
            </button>
          </div>

          <div className="py-6">
            {activeTab === "description" ? (
              <div className="max-w-3xl flex flex-col gap-4">
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
                  {product.name} is a high-performance formula imported directly from licensed international centers. Formulated to fit beautifully into your {product.skinType.toLowerCase()} skin routine, it rapidly restores essential moisture barriers, brightens dull spots, and gives you a radiant glass-skin complexion.
                </p>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-zinc-500 space-y-1.5 font-medium">
                  <li><strong>Target Concern:</strong> Dullness, loss of hydration, dry flakes, uneven skin tone.</li>
                  <li><strong>Skin Compatibility:</strong> Dermatologically proven compatible with {product.skinType} skin profiles.</li>
                  <li><strong>Key Highlights:</strong> Free from parabens, synthetic colors, sulfates, and artificial fragrances.</li>
                  <li>100% Genuine origin guaranteed with dynamic verification barcodes.</li>
                </ul>
              </div>
            ) : (
              <div className="max-w-3xl flex flex-col gap-4">
                <h5 className="text-xs sm:text-sm font-black text-gray-900 uppercase">Directions for application:</h5>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
                  After cleansing your face and using an active toner, apply 2-3 drops of the formulation across the cheeks, chin, and forehead. Tap gently with clean fingers until fully absorbed. For best results, lock it in with a thick nourishing moisturizer.
                </p>
                <h5 className="text-xs sm:text-sm font-black text-gray-900 uppercase mt-4">Active ingredient list:</h5>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-medium">
                  Water, Butylene Glycol, Glycerin, Niacinamide, Centella Asiatica Extract, Sodium Hyaluronate, Panthenol, Adenosine, Allantoin, Carbomer, Arginine, 1,2-Hexanediol, Caprylyl Glycol, Ethylhexylglycerin.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
