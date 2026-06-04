"use client";

import React, { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingBag01Icon,
  WhatsappIcon,
  Home01Icon,
  GridIcon,
  GiftIcon,
  BubbleChatIcon,
  UserIcon,
  ArrowUp02Icon,
} from "@hugeicons/core-free-icons";
import { useApp } from "../context/AppContext";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function GlobalOverlays() {
  const {
    cartItems,
    cartCount,
    toastMessage,
    setToastMessage,
    showCartDrawer,
    setShowCartDrawer,
    addToCart,
    removeFromCart,
    cartTotal,
    clearCart,
    showQuickView,
    setShowQuickView,
    isDbConnected,
  } = useApp();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Please fill in all checkout fields.");
      return;
    }

    setPlacingOrder(true);
    const orderId = "BB-" + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });

    const orderItems = cartItems.map(item => ({
      name: item.product.name,
      qty: item.quantity,
      price: item.product.price
    }));

    const shippingFee = cartTotal >= 899 ? 0 : 80;

    const orderData = {
      id: orderId,
      customer: customerName,
      phone: customerPhone,
      address: customerAddress,
      date: orderDate,
      items: orderItems,
      shipping: shippingFee,
      status: "Pending"
    };

    if (isDbConnected) {
      try {
        const { error } = await supabase
          .from("orders")
          .insert([orderData]);
        if (error) throw error;
      } catch (err: any) {
        alert("Failed to save order to database: " + err.message);
        setPlacingOrder(false);
        return;
      }
    }

    // Save to local storage for local testing fallback
    if (typeof window !== "undefined") {
      const localOrdersStr = localStorage.getItem("beautybooth_local_orders");
      const localOrders = localOrdersStr ? JSON.parse(localOrdersStr) : [];
      localStorage.setItem("beautybooth_local_orders", JSON.stringify([orderData, ...localOrders]));
    }

    setToastMessage(`Order ${orderId} placed successfully via Cash on Delivery!`);
    clearCart();
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setShowCheckoutModal(false);
    setShowCartDrawer(false);
    setPlacingOrder(false);
  };

  const router = useRouter();
  const pathname = usePathname();

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. Floating WhatsApp button */}
      <a
        href="https://api.whatsapp.com/send?phone=8801952190142"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed md:bottom-6 bottom-20 right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 group"
        title="Chat with Customer Support on WhatsApp"
      >
        <HugeiconsIcon icon={WhatsappIcon} size={28} className="text-white" />
      </a>

      {/* 2. Floating Scroll-To-Top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed md:bottom-24 bottom-38 right-6 z-40 bg-white hover:bg-[#FF1A58] text-[#FF1A58] hover:text-white border border-zinc-200/80 w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:shadow-rose-500/20 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
          title="Scroll back to top"
        >
          <HugeiconsIcon icon={ArrowUp02Icon} size={22} className="transition-transform group-hover:-translate-y-0.5 duration-300" />
        </button>
      )}

      {/* 3. Floating Custom Toast Notifications */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#111827] text-white border border-zinc-800 py-3.5 px-6 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in select-none">
          <div className="w-5 h-5 rounded-full bg-[#FF1A58] text-white flex items-center justify-center font-bold text-xs">
            ✓
          </div>
          <span className="text-xs font-bold font-sans">
            {toastMessage}
          </span>
        </div>
      )}

      {/* 4. Cart Drawer Sidebar Overlay */}
      {showCartDrawer && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
          onClick={() => setShowCartDrawer(false)}
        >
          <div
            className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl relative border-l border-zinc-200 animate-slide-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-gray-900 uppercase tracking-wide">My Cart Catalog</span>
                <span className="bg-rose-50 text-[#e11d48] font-black text-xs px-2.5 py-0.5 rounded-full border border-rose-100">
                  {cartCount} Items
                </span>
              </div>
              <button
                onClick={() => setShowCartDrawer(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-colors border border-zinc-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 no-scrollbar">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-3 border border-zinc-200 rounded-2xl bg-zinc-50 relative group">
                    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shrink-0 overflow-hidden p-1 border border-zinc-200">
                      <img src={item.product.imageUrl} className="w-full h-full object-contain" alt="" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <span className="text-[8px] font-bold text-zinc-400 uppercase block">{item.product.brand}</span>
                        <h5 className="text-xs font-semibold text-gray-900 line-clamp-1 mt-0.5">{item.product.name}</h5>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-black text-[#e11d48]">৳{item.product.price}</span>
                        
                        <div className="flex items-center border border-zinc-200 rounded-full bg-white overflow-hidden shadow-sm">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="px-2 py-0.5 hover:bg-zinc-100 text-zinc-600 font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-black text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => addToCart(item.product)}
                            className="px-2 py-0.5 hover:bg-zinc-100 text-zinc-600 font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-center select-none">
                  <div className="text-4xl">🛍️</div>
                  <h5 className="font-black text-gray-900 uppercase text-xs">Your Shopping Cart is Empty</h5>
                  <p className="text-[11px] text-zinc-400 leading-normal max-w-[200px]">
                    Browse our beauty items to add authentic cosmetics to your box!
                  </p>
                  <button
                    onClick={() => setShowCartDrawer(false)}
                    className="bg-[#e11d48] text-white font-extrabold text-[10px] px-5 py-2.5 rounded-full shadow hover:bg-[#be185d] transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Explore Products
                  </button>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-zinc-200 flex flex-col gap-4 bg-zinc-50">
                <div className="flex flex-col gap-2 font-bold text-xs text-zinc-500">
                  <div className="flex justify-between">
                    <span>Subtotal Products:</span>
                    <span className="text-gray-900">৳{cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee:</span>
                    <span className="text-[#0B8043] font-black uppercase">
                      {cartTotal >= 899 ? "FREE SHIPPING" : "৳৮০"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-zinc-200 pt-2 text-sm font-black text-gray-900">
                    <span>Total Amount:</span>
                    <span className="text-[#e11d48]">৳{cartTotal >= 899 ? cartTotal : cartTotal + 80}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setShowCheckoutModal(true)}
                    className="w-full bg-[#0B8043] hover:bg-[#096a37] text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow cursor-pointer text-center"
                  >
                    Checkout with Cash On Delivery
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* SECTOR 28: RESPONSIVE BOTTOM STICKY TAB NAVIGATION BAR FOR MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zinc-100 flex items-center justify-around py-1.5 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden select-none">
        
        {/* Home Tab */}
        <button
          onClick={() => { router.push("/"); }}
          className="flex flex-col items-center gap-0.5 flex-1 relative py-1"
        >
          {pathname === "/" && <div className="absolute top-0 w-8 h-1 bg-[#FF1A58] rounded-full" />}
          <HugeiconsIcon icon={Home01Icon} size={20} className={pathname === "/" ? "text-[#FF1A58]" : "text-zinc-400 hover:text-[#FF1A58]"} />
          <span className={`text-[10px] ${pathname === "/" ? "font-black text-gray-900" : "font-bold text-zinc-400"}`}>Home</span>
        </button>

        {/* Category Tab */}
        <button
          onClick={() => {
            router.push("/categories");
          }}
          className="flex flex-col items-center gap-0.5 flex-1 relative py-1"
        >
          {pathname === "/categories" && <div className="absolute top-0 w-8 h-1 bg-[#FF1A58] rounded-full" />}
          <HugeiconsIcon icon={GridIcon} size={20} className={pathname === "/categories" ? "text-[#FF1A58]" : "text-zinc-400 hover:text-[#FF1A58]"} />
          <span className={`text-[10px] ${pathname === "/categories" ? "font-black text-gray-900" : "font-bold text-zinc-400"}`}>Category</span>
        </button>

        {/* Free Gift Tab */}
        <button
          onClick={() => {
            const el = document.getElementById("offers-to-say-yes");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            } else {
              window.scrollTo({ top: 1200, behavior: "smooth" });
            }
          }}
          className="flex flex-col items-center gap-0.5 flex-1 py-1"
        >
          <HugeiconsIcon icon={GiftIcon} size={20} className="text-zinc-400 hover:text-zinc-600" />
          <span className="text-[10px] font-bold text-zinc-400">Free Gift</span>
        </button>

        {/* Chat Tab */}
        <a
          href="https://api.whatsapp.com/send?phone=8801952190142"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 flex-1 py-1"
        >
          <HugeiconsIcon icon={BubbleChatIcon} size={20} className="text-zinc-400 hover:text-zinc-600" />
          <span className="text-[10px] font-bold text-zinc-400">Chat</span>
        </a>

        {/* Account Tab */}
        <button
          onClick={() => {
            router.push("/account");
          }}
          className="flex flex-col items-center gap-0.5 flex-1 relative py-1"
        >
          {pathname === "/account" && <div className="absolute top-0 w-8 h-1 bg-[#FF1A58] rounded-full" />}
          <HugeiconsIcon icon={UserIcon} size={20} className={pathname === "/account" ? "text-[#FF1A58]" : "text-zinc-400 hover:text-[#FF1A58]"} />
          <span className={`text-[10px] ${pathname === "/account" ? "font-black text-gray-900" : "font-bold text-zinc-400"}`}>Account</span>
        </button>
      </div>

      {/* Extra spacing at the bottom on mobile to offset bottom sticky bar */}
      <div className="h-16 md:hidden w-full" />

      {/* 4. Quick View Modal Overlay */}
      {showQuickView && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowQuickView(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative border border-zinc-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQuickView(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-colors border border-zinc-200 cursor-pointer"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-[#FAF9F6] p-8 flex items-center justify-center min-h-[250px] relative">
                <img src={showQuickView.imageUrl} className="max-h-[220px] max-w-full object-contain" alt={showQuickView.name} />
              </div>

              <div className="p-8 flex flex-col justify-between gap-6 max-h-[450px] overflow-y-auto no-scrollbar">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-black text-[#e11d48] uppercase tracking-widest">{showQuickView.brand}</span>
                  <h4 className="text-base sm:text-lg font-black text-black leading-snug">{showQuickView.name}</h4>
                  
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="text-amber-500 text-xs">★★★★★</div>
                    <span className="text-xs font-black text-zinc-600">({showQuickView.rating}.0 verified rating)</span>
                  </div>

                  <p className="text-xs text-zinc-500 leading-relaxed mt-2 font-medium">
                    Imported directly from licensed skincare centers. Suitable for {showQuickView.skinType.toLowerCase()} skin. This chemical formulation matches the highest dermatological safety checklists.
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-zinc-100">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-[#e11d48]">৳{showQuickView.price}</span>
                      <span className="text-xs text-zinc-400 line-through">৳{showQuickView.originalPrice}</span>
                    </div>
                    <span className="bg-rose-50 text-[#e11d48] border border-rose-100 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase">
                      In Stock / verified
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        addToCart(showQuickView);
                        setShowQuickView(null);
                      }}
                      className="flex-1 bg-[#e11d48] hover:bg-[#be185d] text-white font-extrabold text-xs uppercase py-3.5 rounded-xl transition-all shadow cursor-pointer"
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={() => {
                        addToCart(showQuickView);
                        setShowQuickView(null);
                        setShowCartDrawer(true);
                      }}
                      className="flex-1 bg-black hover:bg-zinc-900 text-white font-extrabold text-xs uppercase py-3.5 rounded-xl transition-all cursor-pointer"
                    >
                      Order Directly
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 5. Checkout Details Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setShowCheckoutModal(false)}>
          <div
            className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative border border-zinc-200 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition-colors border border-zinc-200 cursor-pointer"
            >
              ✕
            </button>

            <form onSubmit={handlePlaceOrder} className="p-6 flex flex-col gap-5 text-left">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-[#FF1A58] uppercase tracking-widest">
                  Secure Checkout
                </span>
                <h4 className="text-xl font-black text-black">Delivery Information</h4>
                <p className="text-xs text-zinc-400 font-semibold leading-normal">
                  Please enter your delivery details below to finalize your Cash on Delivery order.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold text-zinc-500 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Farhana Yasmin"
                    className="w-full bg-zinc-50/50 border border-zinc-200 focus:border-[#FF1A58] focus:bg-white rounded-xl py-3 px-4 text-xs font-semibold text-zinc-800 focus:outline-none transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold text-zinc-500 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +8801712345678"
                    className="w-full bg-zinc-50/50 border border-zinc-200 focus:border-[#FF1A58] focus:bg-white rounded-xl py-3 px-4 text-xs font-semibold text-zinc-800 focus:outline-none transition-all"
                  />
                </div>

                {/* Delivery Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold text-zinc-500 uppercase tracking-wider">
                    Delivery Address
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="House/Road, Area, City"
                    className="w-full bg-zinc-50/50 border border-zinc-200 focus:border-[#FF1A58] focus:bg-white rounded-xl py-3 px-4 text-xs font-semibold text-zinc-800 focus:outline-none transition-all resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Order total info banner */}
              <div className="bg-zinc-50 border border-zinc-100 p-4 rounded-2xl flex items-center justify-between text-xs font-extrabold">
                <span className="text-zinc-500">Order Grand Total:</span>
                <span className="text-[#FF1A58] text-sm font-black">
                  ৳{cartTotal >= 899 ? cartTotal : cartTotal + 80}
                </span>
              </div>

              {/* Confirm button */}
              <button
                type="submit"
                disabled={placingOrder}
                className="w-full bg-[#0B8043] hover:bg-[#096a37] disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl transition-all shadow cursor-pointer text-center"
              >
                {placingOrder ? "Placing Order..." : "Confirm Cash on Delivery"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
