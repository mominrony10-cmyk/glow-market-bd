"use client";
import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { useRouter } from "next/navigation";
import { supabase, hasValidSupabaseConfig } from "../lib/supabase";

export default function AccountPage() {
  const { wishlist } = useApp();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Profile Info state
  const [profile, setProfile] = useState({
    name: "Shawon Ahmed",
    email: "shawonetc@gmail.com",
    phone: "+880 1952-190142",
    address: "House 24, Road 5, Dhanmondi",
    city: "Dhaka",
    zip: "1209",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "vouchers">("profile");

  // Orders state
  const [orders, setOrders] = useState<any[]>([]);

  // Vouchers state
  const [vouchers, setVouchers] = useState([
    { code: "GLOWVIP10", discount: "10% OFF", minSpend: "৳2,000", expiry: "June 30, 2026", copied: false },
    { code: "FREESHIP26", discount: "Free Shipping", minSpend: "৳1,500", expiry: "June 15, 2026", copied: false },
  ]);

  const fetchUserAndOrders = async () => {
    setLoading(true);
    if (!hasValidSupabaseConfig) {
      // Offline fallback
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn !== "true") {
        router.push("/login");
        return;
      }
      const localName = localStorage.getItem("userName") || "Shawon Ahmed";
      const localPhone = localStorage.getItem("userPhone") || "+880 1952-190142";
      const initialProfile = {
        name: localName,
        email: "shawonetc@gmail.com",
        phone: localPhone,
        address: "House 24, Road 5, Dhanmondi",
        city: "Dhaka",
        zip: "1209",
        avatar: localStorage.getItem("userAvatar") || "",
      };
      setProfile(initialProfile);
      setEditedProfile(initialProfile);

      // Load local orders if any
      const localOrdersStr = localStorage.getItem("beautybooth_local_orders");
      const rawLocalOrders = localOrdersStr ? JSON.parse(localOrdersStr) : [
        { id: "GM-7841", date: "June 01, 2026", total: 3450, status: "Shipped", items: 2 },
        { id: "GM-7612", date: "May 18, 2026", total: 1890, status: "Delivered", items: 1 },
        { id: "GM-7493", date: "April 29, 2026", total: 5400, status: "Delivered", items: 3 },
      ];
      const localMapped = rawLocalOrders.map((o: any) => {
        if (typeof o.items === "number") return o;
        let itemsArray = [];
        try {
          itemsArray = typeof o.items === "string" ? JSON.parse(o.items) : o.items;
        } catch (e) {
          itemsArray = o.items || [];
        }
        if (!Array.isArray(itemsArray)) {
          itemsArray = [itemsArray].filter(Boolean);
        }
        const itemsCount = itemsArray.reduce((acc: number, item: any) => acc + (item.qty || 1), 0);
        let totalVal = o.total;
        if (typeof totalVal !== "number") {
          const productsTotal = itemsArray.reduce((acc: number, item: any) => acc + (item.price || 0) * (item.qty || 1), 0);
          totalVal = productsTotal + (o.shipping || 0);
        }
        return {
          id: o.id,
          date: o.date,
          status: o.status || "Pending",
          items: itemsCount,
          total: totalVal,
        };
      });
      setOrders(localMapped);
      setLoading(false);
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      const user = session.user;
      let profileData = null;

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        if (
          profileError.code === "PGRST205" ||
          profileError.message?.includes("public.profiles") ||
          profileError.message?.includes("schema cache")
        ) {
          // profiles table does not exist on Supabase, use localStorage/auth metadata fallback
          console.warn("Supabase profiles table not found. Falling back to local storage and auth metadata.");
          const loadedProfile = {
            name: user.user_metadata?.name || "Glow Member",
            email: user.email || "",
            phone: user.user_metadata?.phone || "",
            address: localStorage.getItem("beautybooth_local_address") || "",
            city: localStorage.getItem("beautybooth_local_city") || "",
            zip: localStorage.getItem("beautybooth_local_zip") || "",
            avatar: localStorage.getItem("userAvatar") || "",
          };
          setProfile(loadedProfile);
          setEditedProfile(loadedProfile);

          // Load local orders
          const localOrdersStr = localStorage.getItem("beautybooth_local_orders");
          const rawLocalOrders = localOrdersStr ? JSON.parse(localOrdersStr) : [
            { id: "GM-7841", date: "June 01, 2026", total: 3450, status: "Shipped", items: 2 },
            { id: "GM-7612", date: "May 18, 2026", total: 1890, status: "Delivered", items: 1 },
            { id: "GM-7493", date: "April 29, 2026", total: 5400, status: "Delivered", items: 3 },
          ];
          const localMapped = rawLocalOrders.map((o: any) => {
            if (typeof o.items === "number") return o;
            let itemsArray = [];
            try {
              itemsArray = typeof o.items === "string" ? JSON.parse(o.items) : o.items;
            } catch (e) {
              itemsArray = o.items || [];
            }
            if (!Array.isArray(itemsArray)) {
              itemsArray = [itemsArray].filter(Boolean);
            }
            const itemsCount = itemsArray.reduce((acc: number, item: any) => acc + (item.qty || 1), 0);
            let totalVal = o.total;
            if (typeof totalVal !== "number") {
              const productsTotal = itemsArray.reduce((acc: number, item: any) => acc + (item.price || 0) * (item.qty || 1), 0);
              totalVal = productsTotal + (o.shipping || 0);
            }
            return {
              id: o.id,
              date: o.date,
              status: o.status || "Pending",
              items: itemsCount,
              total: totalVal,
            };
          });
          setOrders(localMapped);
          setLoading(false);
          return;
        } else if (profileError.code === "PGRST116" || profileError.message.includes("does not exist")) {
          const newProfile = {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || "Glow Member",
            phone: user.user_metadata?.phone || "",
            role: "user",
            address: "",
            city: "",
            zip: "",
            avatar: "",
          };
          await supabase.from("profiles").upsert(newProfile);
          profileData = newProfile;
        } else {
          console.error("Profile load error:", profileError);
        }
      } else {
        profileData = data;
      }

      if (profileData) {
        const loadedProfile = {
          name: profileData.name || "Glow Member",
          email: profileData.email || user.email || "",
          phone: profileData.phone || "",
          address: profileData.address || "",
          city: profileData.city || "",
          zip: profileData.zip || "",
          avatar: profileData.avatar || "",
        };
        setProfile(loadedProfile);
        setEditedProfile(loadedProfile);

        // Fetch user specific orders from Supabase using name or phone
        const filterStr = loadedProfile.phone 
          ? `phone.eq.${loadedProfile.phone},customer.eq.${loadedProfile.name}` 
          : `customer.eq.${loadedProfile.name}`;

        const { data: dbOrders, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .or(filterStr)
          .order("date", { ascending: false });

        if (ordersError) {
          console.error("Orders load error:", ordersError);
        } else if (dbOrders) {
          const mapped = dbOrders.map((o: any) => {
            let itemsArray = [];
            try {
              itemsArray = typeof o.items === "string" ? JSON.parse(o.items) : o.items;
            } catch (e) {
              itemsArray = o.items || [];
            }
            if (!Array.isArray(itemsArray)) {
              itemsArray = [itemsArray].filter(Boolean);
            }
            const itemsCount = itemsArray.reduce((acc: number, item: any) => acc + (item.qty || 1), 0);
            let totalPaid = o.total;
            if (typeof totalPaid !== "number") {
              const productsTotal = itemsArray.reduce((acc: number, item: any) => acc + (item.price || 0) * (item.qty || 1), 0);
              totalPaid = productsTotal + (o.shipping || 0);
            }

            return {
              id: o.id,
              date: o.date,
              status: o.status || "Pending",
              items: itemsCount,
              total: totalPaid,
            };
          });
          setOrders(mapped);
        }
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAndOrders();
  }, [router]);

  const handleSave = async () => {
    setLoading(true);
    if (hasValidSupabaseConfig) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { error } = await supabase
            .from("profiles")
            .update({
              name: editedProfile.name,
              phone: editedProfile.phone,
              address: editedProfile.address,
              city: editedProfile.city,
              zip: editedProfile.zip,
              avatar: editedProfile.avatar,
            })
            .eq("id", session.user.id);
          
          if (error) {
            if (
              error.code === "PGRST205" ||
              error.message?.includes("public.profiles") ||
              error.message?.includes("schema cache")
            ) {
              console.warn("Supabase profiles table not found. Saving updates to localStorage.");
              localStorage.setItem("userName", editedProfile.name);
              localStorage.setItem("userPhone", editedProfile.phone);
              localStorage.setItem("beautybooth_local_address", editedProfile.address);
              localStorage.setItem("beautybooth_local_city", editedProfile.city);
              localStorage.setItem("beautybooth_local_zip", editedProfile.zip);
              localStorage.setItem("userAvatar", editedProfile.avatar);
              setProfile(editedProfile);
              setIsEditing(false);
              return;
            }
            throw error;
          }
        }
        setProfile(editedProfile);
        setIsEditing(false);
      } catch (err: any) {
        alert("Failed to save profile: " + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setProfile(editedProfile);
      setIsEditing(false);
      setLoading(false);
    }
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
      <div className="relative bg-gradient-to-br from-[#FF1A58] via-[#e11d48] to-[#9f1239] text-white pt-10 pb-28 px-4 rounded-b-[50px] shadow-lg overflow-hidden">
        {/* Glowing floating blur graphics */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -top-12 right-20 w-48 h-48 rounded-full bg-rose-400/20 blur-2xl" />

        <div className="max-w-6xl mx-auto flex items-center justify-between relative z-10">
          <button 
            onClick={() => router.push("/")}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 text-white stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <h1 className="text-sm font-black tracking-widest uppercase text-white/80">Customer Dashboard</h1>
          <div className="w-10 h-10" /> {/* Spacer */}
        </div>

        <div className="max-w-6xl mx-auto mt-8 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              {profile.avatar && profile.avatar.trim() ? (
                <img 
                  src={profile.avatar} 
                  alt="Avatar" 
                  className="w-20 h-20 rounded-3xl object-cover border-4 border-white/20 shadow-md group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border-4 border-white/20 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform text-white">
                  <svg className="w-10 h-10 text-white/95 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              )}
              <span className="absolute -bottom-2 -right-2 bg-amber-400 text-white rounded-full p-1 border-2 border-white shadow-xs">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-black font-serif text-white tracking-tight">{profile.name}</h2>
                <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md text-white border border-white/30 px-2.5 py-0.5 rounded-full shrink-0">
                  VIP Club
                </span>
              </div>
              <p className="text-xs text-white/75 font-semibold mt-1 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {profile.email}
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 flex gap-6 shrink-0">
            <div className="text-center">
              <span className="block text-xl font-black text-white">{orders.length}</span>
              <span className="text-[9px] font-black uppercase tracking-wider text-white/60">Orders</span>
            </div>
            <div className="w-[1px] bg-white/20" />
            <div className="text-center">
              <span className="block text-xl font-black text-white">{wishlist.size}</span>
              <span className="text-[9px] font-black uppercase tracking-wider text-white/60">Wishlist</span>
            </div>
            <div className="w-[1px] bg-white/20" />
            <div className="text-center">
              <span className="block text-xl font-black text-white">৳1,250</span>
              <span className="text-[9px] font-black uppercase tracking-wider text-white/60">Wallet</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar (Quick Links & Actions) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Quick Actions (WhatsApp Hotline & Support) */}
          <div className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm flex flex-col gap-4">
            <h3 className="font-black text-xs uppercase tracking-widest text-zinc-400 border-b border-zinc-50 pb-3">
              Official Helpline
            </h3>

            {/* Official WhatsApp */}
            <a 
              href="https://api.whatsapp.com/send?phone=8801952190142" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/75 border border-emerald-100 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-xs">
                  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.742.002-2.602-1.01-5.05-2.85-6.89C16.643 2.133 14.195 1.12 11.6 1.118c-5.438 0-9.863 4.37-9.867 9.74-.001 1.955.518 3.858 1.502 5.568l-1.015 3.702 3.827-.988zm13.14-6.398c-.347-.173-2.054-1.01-2.37-1.124-.318-.118-.55-.173-.78.173-.23.35-.89 1.123-1.09 1.348-.2.226-.4.254-.747.082-.347-.172-1.464-.537-2.79-1.714-1.03-.916-1.724-2.047-1.926-2.395-.2-.347-.02-.535.152-.706.155-.155.347-.403.52-.605.172-.2.23-.346.346-.57.115-.23.057-.43-.028-.604-.087-.172-.78-1.878-1.07-2.572-.28-.675-.563-.585-.78-.596-.2-.01-.43-.012-.66-.012-.23 0-.6.086-.913.43-.313.346-1.192 1.164-1.192 2.838 0 1.674 1.22 3.293 1.39 3.518.173.226 2.4 3.647 5.816 5.117.812.35 1.446.558 1.94.715.815.258 1.56.222 2.148.134.654-.097 2.054-.836 2.34-1.644.285-.807.285-1.5.2-1.644-.086-.145-.318-.23-.664-.403z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black text-zinc-900 uppercase tracking-tight">WhatsApp Hotline</h4>
                  <p className="text-[10px] font-bold text-zinc-400 mt-0.5">Contact official support instantly</p>
                </div>
              </div>
              <svg className="w-4 h-4 text-emerald-500 group-hover:translate-x-0.5 transition-all stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </a>

            {/* Call support */}
            <a 
              href="tel:01952190142" 
              className="flex items-center justify-between p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100/75 border border-rose-100 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF1A58] flex items-center justify-center shadow-xs">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-black text-zinc-900 uppercase tracking-tight">Call Hotline</h4>
                  <p className="text-[10px] font-bold text-zinc-400 mt-0.5">Direct phone call support</p>
                </div>
              </div>
              <svg className="w-4 h-4 text-[#FF1A58] group-hover:translate-x-0.5 transition-all stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </a>
          </div>

          {/* Logout button */}
          <button 
            onClick={async () => {
              localStorage.removeItem("isLoggedIn");
              if (hasValidSupabaseConfig) {
                await supabase.auth.signOut();
              }
              router.push("/");
            }}
            className="w-full bg-white hover:bg-zinc-50 hover:text-rose-600 text-zinc-500 font-extrabold text-xs uppercase py-4 rounded-3xl border border-zinc-200 transition-all shadow-xs cursor-pointer text-center flex items-center justify-center gap-2 group hover:scale-[1.01]"
          >
            <svg className="w-4 h-4 stroke-2 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Sign Out Account
          </button>
        </div>

        {/* Right Panel (Content area) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Navigation Grid Tabs */}
          <div className="bg-white rounded-3xl p-1.5 shadow-sm border border-zinc-100 grid grid-cols-3 gap-1.5">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${activeTab === "profile" ? "bg-zinc-950 text-white shadow-md" : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              Profile
            </button>
            <button 
              onClick={() => setActiveTab("orders")}
              className={`py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${activeTab === "orders" ? "bg-zinc-950 text-white shadow-md" : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              Orders
            </button>
            <button 
              onClick={() => setActiveTab("vouchers")}
              className={`py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${activeTab === "vouchers" ? "bg-zinc-950 text-white shadow-md" : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12v.75m0 3v.75m0 3v.75m0 3V18M3 8.25a.75.75 0 01.75-.75h16.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75v-7.5z" />
              </svg>
              Coupons
            </button>
          </div>

          {/* Tab 1: Profile Details */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-100 shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-zinc-50 pb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-base uppercase tracking-wider text-zinc-900">Personal Account Info</h3>
                </div>
                {!isEditing ? (
                  <button 
                    onClick={() => {
                      setEditedProfile({ ...profile });
                      setIsEditing(true);
                    }}
                    className="flex items-center gap-1.5 text-xs font-black text-[#FF1A58] hover:text-[#e11d48] cursor-pointer hover:scale-102 transition-transform"
                  >
                    <svg className="w-3.5 h-3.5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="text-xs font-bold text-zinc-400 hover:text-zinc-600 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="flex items-center gap-1 text-xs font-black text-emerald-500 hover:text-emerald-600 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Save Info
                    </button>
                  </div>
                )}
              </div>

              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col bg-zinc-50/75 p-4 rounded-2xl border border-zinc-100">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Full Name</span>
                    <span className="text-sm font-black text-zinc-900 mt-1">{profile.name}</span>
                  </div>
                  <div className="flex flex-col bg-zinc-50/75 p-4 rounded-2xl border border-zinc-100">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Phone Number</span>
                    <span className="text-sm font-black text-zinc-900 mt-1">{profile.phone || "Not provided"}</span>
                  </div>
                  <div className="flex flex-col bg-zinc-50/75 p-4 rounded-2xl border border-zinc-100 md:col-span-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Shipping Location</span>
                    <span className="text-sm font-black text-zinc-900 mt-1 leading-relaxed">
                      {profile.address || profile.city || profile.zip ? (
                        <>
                          {profile.address && <span>{profile.address}</span>}
                          {(profile.city || profile.zip) && (
                            <span className="block text-xs text-zinc-500 mt-1">
                              {profile.city} {profile.zip && `- ${profile.zip}`}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-zinc-400 italic">No delivery address saved yet</span>
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        value={editedProfile.name}
                        onChange={e => setEditedProfile({ ...editedProfile, name: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-2xl px-4 py-3 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-200 mt-1.5 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Phone Number</label>
                      <input 
                        type="text" 
                        value={editedProfile.phone}
                        onChange={e => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-2xl px-4 py-3 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-200 mt-1.5 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Shipping Address</label>
                    <input 
                      type="text" 
                      value={editedProfile.address}
                      onChange={e => setEditedProfile({ ...editedProfile, address: e.target.value })}
                      placeholder="e.g. House 24, Road 5"
                      className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-2xl px-4 py-3 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-200 mt-1.5 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">City</label>
                      <input 
                        type="text" 
                        value={editedProfile.city}
                        onChange={e => setEditedProfile({ ...editedProfile, city: e.target.value })}
                        placeholder="e.g. Dhaka"
                        className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-2xl px-4 py-3 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-200 mt-1.5 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">ZIP Code</label>
                      <input 
                        type="text" 
                        value={editedProfile.zip}
                        onChange={e => setEditedProfile({ ...editedProfile, zip: e.target.value })}
                        placeholder="e.g. 1209"
                        className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-2xl px-4 py-3 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-200 mt-1.5 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Profile Image URL</label>
                    <input 
                      type="text" 
                      value={editedProfile.avatar}
                      onChange={e => setEditedProfile({ ...editedProfile, avatar: e.target.value })}
                      placeholder="e.g. https://images.unsplash.com/photo-..."
                      className="w-full bg-zinc-50 border border-zinc-200 focus:bg-white rounded-2xl px-4 py-3 text-xs font-semibold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-200 mt-1.5 transition-all"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Order History */}
          {activeTab === "orders" && (
            <div className="flex flex-col gap-4">
              <h3 className="font-black text-xs uppercase tracking-widest text-zinc-400 px-1">
                Order History ({orders.length})
              </h3>

              {orders.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 border border-zinc-100 shadow-sm text-center flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-[#FF1A58]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-zinc-900 uppercase">No orders placed yet</h4>
                    <p className="text-xs text-zinc-400 mt-1">Check out our authentic skincare products & start shopping!</p>
                  </div>
                  <button 
                    onClick={() => router.push("/products")}
                    className="bg-gradient-to-r from-[#FF1A58] to-[#e11d48] hover:from-[#e11d48] hover:to-[#be185d] text-white font-extrabold text-[10px] uppercase px-5 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    Browse Shop
                  </button>
                </div>
              ) : (
                orders.map((o) => (
                  <div 
                    key={o.id}
                    className="bg-white rounded-3xl p-6 border border-zinc-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-50 pb-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Order Reference</span>
                        <span className="text-sm font-black text-zinc-950 mt-0.5">{o.id}</span>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border ${
                        o.status === "Shipped" 
                          ? "bg-blue-50 text-blue-600 border-blue-100" 
                          : o.status === "Delivered"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}>
                        {o.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-left">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Order Date</span>
                        <span className="text-xs font-bold text-zinc-800 mt-0.5">{o.date}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Items Count</span>
                        <span className="text-xs font-bold text-zinc-800 mt-0.5">{o.items} items</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Grand Total</span>
                        <span className="text-xs font-extrabold text-[#FF1A58] mt-0.5">৳{o.total}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => router.push("/products")}
                      className="w-full bg-zinc-50 hover:bg-zinc-100/75 text-zinc-700 font-extrabold text-[10px] uppercase py-3 rounded-2xl border border-zinc-200 transition-colors cursor-pointer text-center"
                    >
                      Track Package Info
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Discount Coupons */}
          {activeTab === "vouchers" && (
            <div className="flex flex-col gap-4">
              <h3 className="font-black text-xs uppercase tracking-widest text-zinc-400 px-1">
                Active Promo Vouchers ({vouchers.length})
              </h3>

              {vouchers.map((v, i) => (
                <div 
                  key={v.code}
                  className="bg-white rounded-3xl p-6 border-2 border-dashed border-zinc-200 shadow-sm relative overflow-hidden flex items-center justify-between group hover:border-[#FF1A58]/30 transition-colors"
                >
                  {/* Decorative side circles for ticket shape */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-50 border-r border-zinc-200" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-50 border-l border-zinc-200" />

                  <div className="pl-3 flex flex-col">
                    <span className="text-xl font-black text-[#FF1A58] tracking-tight">{v.discount}</span>
                    <span className="text-[10px] font-bold text-zinc-500 mt-0.5">Min. Spend: {v.minSpend}</span>
                    <span className="text-[9px] font-semibold text-zinc-400 mt-1 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Expires: {v.expiry}
                    </span>
                  </div>

                  <div className="pr-3 flex flex-col items-center gap-2.5">
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-950 bg-zinc-50 border border-zinc-200 px-3.5 py-2 rounded-xl group-hover:bg-[#FF1A58]/5 group-hover:border-[#FF1A58]/10 transition-colors">
                      {v.code}
                    </span>
                    <button 
                      onClick={() => copyVoucher(i, v.code)}
                      className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full cursor-pointer transition-all active:scale-95 ${
                        v.copied 
                          ? "bg-emerald-500 text-white shadow-xs" 
                          : "bg-rose-50 hover:bg-rose-100 text-[#FF1A58] border border-rose-100"
                      }`}
                    >
                      {v.copied ? "Copied!" : "Copy Promo"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
