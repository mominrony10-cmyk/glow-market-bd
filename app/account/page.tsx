"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { wishlist, cartCount } = useApp();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  // Mock Profile Info
  const [profile, setProfile] = useState({
    name: "Shawon Ahmed",
    email: "shawonetc@gmail.com",
    phone: "+880 1952-190142",
    address: "House 24, Road 5, Dhanmondi",
    city: "Dhaka",
    zip: "1209",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "vouchers">("profile");

  // Mock Orders
  const [orders] = useState([
    { id: "GM-7841", date: "June 01, 2026", total: 3450, status: "Shipped", items: 2 },
    { id: "GM-7612", date: "May 18, 2026", total: 1890, status: "Delivered", items: 1 },
    { id: "GM-7493", date: "April 29, 2026", total: 5400, status: "Delivered", items: 3 },
  ]);

  // Mock Vouchers
  const [vouchers, setVouchers] = useState([
    { code: "GLOWVIP10", discount: "10% OFF", minSpend: "৳2,000", expiry: "June 30, 2026", copied: false },
    { code: "FREESHIP26", discount: "Free Shipping", minSpend: "৳1,500", expiry: "June 15, 2026", copied: false },
  ]);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const copyVoucher = (index: number, code: string) => {
    navigator.clipboard.writeText(code);
    setVouchers(prev => prev.map((v, i) => i === index ? { ...v, copied: true } : v));
    setTimeout(() => {
      setVouchers(prev => prev.map((v, i) => i === index ? { ...v, copied: false } : v));
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#FF1A58] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-black uppercase text-zinc-400 tracking-wider">Verifying Access...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-24 select-none">
      {/* Upper Glowing Header */}
      <div className="relative bg-gradient-to-br from-[#FF1A58] via-[#e11d48] to-[#9f1239] text-white pt-10 pb-20 px-4 rounded-b-[40px] shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-60" />
        
        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
          <button 
            onClick={() => router.push("/")}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 text-white stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="text-lg font-black tracking-tight uppercase">My Account</h1>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>

        {/* Profile Card Overlay */}
        <div className="max-w-md mx-auto mt-6 bg-white text-zinc-800 rounded-3xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-zinc-100 flex items-center gap-4 relative z-10">
          <div className="relative">
            <img 
              src={profile.avatar} 
              alt="Avatar" 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#fbcfe8] shadow-sm"
            />
            <span className="absolute -bottom-1.5 -right-1.5 bg-amber-400 text-white rounded-full p-1 border-2 border-white shadow-xs">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-zinc-950 truncate">{profile.name}</h2>
              <span className="text-[9px] font-black uppercase tracking-wider bg-rose-50 text-[#FF1A58] border border-rose-100 px-2 py-0.5 rounded-full shrink-0">
                VIP Gold
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-semibold truncate mt-0.5">{profile.email}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-md mx-auto px-4 -mt-10 relative z-20">
        
        {/* Navigation Grid Tabs */}
        <div className="bg-white rounded-2xl p-1.5 shadow-sm border border-zinc-100 grid grid-cols-3 gap-1 mb-6">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${activeTab === "profile" ? "bg-zinc-950 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-800"}`}
          >
            Profile
          </button>
          <button 
            onClick={() => setActiveTab("orders")}
            className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${activeTab === "orders" ? "bg-zinc-950 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-800"}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab("vouchers")}
            className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${activeTab === "vouchers" ? "bg-zinc-950 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-800"}`}
          >
            Coupons
          </button>
        </div>

        {/* Tab 1: Profile Details & Address */}
        {activeTab === "profile" && (
          <div className="flex flex-col gap-5">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-xs text-center flex flex-col items-center">
                <span className="text-lg font-black text-[#FF1A58]">{orders.length}</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight mt-1">Orders</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-xs text-center flex flex-col items-center">
                <span className="text-lg font-black text-[#FF1A58]">{wishlist.size}</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight mt-1">Wishlist</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-xs text-center flex flex-col items-center">
                <span className="text-lg font-black text-[#FF1A58]">৳1,250</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight mt-1">Wallet</span>
              </div>
            </div>

            {/* Editable Profile Information */}
            <div className="bg-white rounded-3xl p-5 border border-zinc-100 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h3 className="font-black text-sm uppercase tracking-wider text-zinc-900">Personal Info</h3>
                {!isEditing ? (
                  <button 
                    onClick={() => {
                      setEditedProfile({ ...profile });
                      setIsEditing(true);
                    }}
                    className="text-xs font-black text-[#FF1A58] hover:text-[#e11d48] cursor-pointer"
                  >
                    Edit Info
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="text-xs font-bold text-zinc-400 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="text-xs font-black text-[#FF1A58] cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>

              {!isEditing ? (
                <div className="flex flex-col gap-3.5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Full Name</span>
                    <span className="text-xs font-black text-zinc-800 mt-0.5">{profile.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Phone Number</span>
                    <span className="text-xs font-black text-zinc-800 mt-0.5">{profile.phone}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Shipping Address</span>
                    <span className="text-xs font-black text-zinc-800 mt-0.5 leading-relaxed">
                      {profile.address}, {profile.city} - {profile.zip}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      value={editedProfile.name}
                      onChange={e => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-[#FF1A58] mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Phone Number</label>
                    <input 
                      type="text" 
                      value={editedProfile.phone}
                      onChange={e => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-[#FF1A58] mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Shipping Address</label>
                    <input 
                      type="text" 
                      value={editedProfile.address}
                      onChange={e => setEditedProfile({ ...editedProfile, address: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-[#FF1A58] mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">City</label>
                      <input 
                        type="text" 
                        value={editedProfile.city}
                        onChange={e => setEditedProfile({ ...editedProfile, city: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-[#FF1A58] mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">ZIP Code</label>
                      <input 
                        type="text" 
                        value={editedProfile.zip}
                        onChange={e => setEditedProfile({ ...editedProfile, zip: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 focus:outline-none focus:border-[#FF1A58] mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions (WhatsApp Hotline & Support) */}
            <div className="bg-white rounded-3xl p-5 border border-zinc-100 shadow-sm flex flex-col gap-3">
              <h3 className="font-black text-sm uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-3 mb-1">
                Help & Hotline
              </h3>

              {/* Official WhatsApp */}
              <a 
                href="https://api.whatsapp.com/send?phone=8801952190142" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-xs">
                    <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.742.002-2.602-1.01-5.05-2.85-6.89C16.643 2.133 14.195 1.12 11.6 1.118c-5.438 0-9.863 4.37-9.867 9.74-.001 1.955.518 3.858 1.502 5.568l-1.015 3.702 3.827-.988zm13.14-6.398c-.347-.173-2.054-1.01-2.37-1.124-.318-.118-.55-.173-.78.173-.23.35-.89 1.123-1.09 1.348-.2.226-.4.254-.747.082-.347-.172-1.464-.537-2.79-1.714-1.03-.916-1.724-2.047-1.926-2.395-.2-.347-.02-.535.152-.706.155-.155.347-.403.52-.605.172-.2.23-.346.346-.57.115-.23.057-.43-.028-.604-.087-.172-.78-1.878-1.07-2.572-.28-.675-.563-.585-.78-.596-.2-.01-.43-.012-.66-.012-.23 0-.6.086-.913.43-.313.346-1.192 1.164-1.192 2.838 0 1.674 1.22 3.293 1.39 3.518.173.226 2.4 3.647 5.816 5.117.812.35 1.446.558 1.94.715.815.258 1.56.222 2.148.134.654-.097 2.054-.836 2.34-1.644.285-.807.285-1.5.2-1.644-.086-.145-.318-.23-.664-.403z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-zinc-950 uppercase tracking-tight">WhatsApp Hotline</h4>
                    <p className="text-[10px] font-bold text-zinc-400 mt-0.5">Contact official support instantly</p>
                  </div>
                </div>
                <svg className="w-4.5 h-4.5 text-emerald-500 group-hover:translate-x-0.5 transition-transform stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>

              {/* Call support */}
              <a 
                href="tel:01952190142" 
                className="flex items-center justify-between p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-100 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF1A58] flex items-center justify-center shadow-xs">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-zinc-950 uppercase tracking-tight">Call Hotline</h4>
                    <p className="text-[10px] font-bold text-zinc-400 mt-0.5">Direct phone call support</p>
                  </div>
                </div>
                <svg className="w-4.5 h-4.5 text-[#FF1A58] group-hover:translate-x-0.5 transition-transform stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            </div>

            {/* Logout button */}
            <button 
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                router.push("/");
              }}
              className="w-full bg-white hover:bg-zinc-100 text-zinc-600 font-extrabold text-xs uppercase py-3.5 rounded-2xl border border-zinc-200 transition-colors shadow-xs cursor-pointer text-center"
            >
              Sign Out Account
            </button>
          </div>
        )}

        {/* Tab 2: Order History */}
        {activeTab === "orders" && (
          <div className="flex flex-col gap-4">
            <h3 className="font-black text-sm uppercase tracking-wider text-zinc-900 px-1">
              Order History ({orders.length})
            </h3>

            {orders.map((o) => (
              <div 
                key={o.id}
                className="bg-white rounded-3xl p-5 border border-zinc-100 shadow-sm flex flex-col gap-3.5"
              >
                <div className="flex items-center justify-between border-b border-zinc-50 pb-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-zinc-400 uppercase">Order ID</span>
                    <span className="text-sm font-black text-zinc-900 mt-0.5">{o.id}</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
                    o.status === "Shipped" 
                      ? "bg-blue-50 text-blue-600 border-blue-100" 
                      : "bg-emerald-50 text-emerald-600 border-emerald-100"
                  }`}>
                    {o.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-left">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase">Date</span>
                    <span className="text-xs font-bold text-zinc-700 mt-0.5">{o.date}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase">Items</span>
                    <span className="text-xs font-bold text-zinc-700 mt-0.5">{o.items} items</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase">Total Paid</span>
                    <span className="text-xs font-extrabold text-[#FF1A58] mt-0.5">৳{o.total}</span>
                  </div>
                </div>

                <button 
                  onClick={() => router.push("/products")}
                  className="w-full bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-extrabold text-[10px] uppercase py-2 rounded-xl border border-zinc-150 transition-colors cursor-pointer text-center"
                >
                  Track Package
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Discount Coupons */}
        {activeTab === "vouchers" && (
          <div className="flex flex-col gap-4">
            <h3 className="font-black text-sm uppercase tracking-wider text-zinc-900 px-1">
              Active Vouchers ({vouchers.length})
            </h3>

            {vouchers.map((v, i) => (
              <div 
                key={v.code}
                className="bg-white rounded-3xl p-5 border-2 border-dashed border-zinc-200 shadow-sm relative overflow-hidden flex items-center justify-between"
              >
                {/* Decorative side circles for ticket shape */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-50 border-r border-zinc-200" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-50 border-l border-zinc-200" />

                <div className="pl-3 flex flex-col">
                  <span className="text-lg font-black text-[#FF1A58] tracking-tight">{v.discount}</span>
                  <span className="text-[10px] font-bold text-zinc-500 mt-0.5">Min. Spend: {v.minSpend}</span>
                  <span className="text-[9px] font-semibold text-zinc-400 mt-1">Expires: {v.expiry}</span>
                </div>

                <div className="pr-3 flex flex-col items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-800 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg">
                    {v.code}
                  </span>
                  <button 
                    onClick={() => copyVoucher(i, v.code)}
                    className={`text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full cursor-pointer transition-colors ${
                      v.copied 
                        ? "bg-emerald-500 text-white" 
                        : "bg-rose-50 hover:bg-rose-100 text-[#FF1A58] border border-rose-100"
                    }`}
                  >
                    {v.copied ? "Copied!" : "Copy Code"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
