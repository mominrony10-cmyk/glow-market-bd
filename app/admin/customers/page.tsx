"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { supabase } from "../../lib/supabase";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  joined: string;
  purchases: number;
  spent: number;
  points: number;
  tier: "VIP" | "Premium" | "Standard";
}

export default function AdminCustomersPage() {
  const { isDbConnected } = useApp();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("All");

  useEffect(() => {
    async function loadCustomers() {
      setLoading(true);
      let allOrders: any[] = [];
      
      // 1. Fetch from Supabase if connected
      if (isDbConnected) {
        try {
          const { data, error } = await supabase
            .from("orders")
            .select("*");
          if (error) throw error;
          if (data) {
            allOrders = data;
          }
        } catch (err) {
          console.error("Failed to fetch live orders for CRM:", err);
        }
      }

      // 2. Fetch local orders from localStorage
      let localOrders: any[] = [];
      if (typeof window !== "undefined") {
        const localOrdersStr = localStorage.getItem("beautybooth_local_orders");
        if (localOrdersStr) {
          try {
            localOrders = JSON.parse(localOrdersStr);
          } catch (e) {
            console.error(e);
          }
        }
      }

      // Merge and remove duplicates by order ID
      const orderMap = new Map<string, any>();
      allOrders.forEach(o => orderMap.set(o.id, o));
      localOrders.forEach(o => orderMap.set(o.id, o));
      const mergedOrders = Array.from(orderMap.values());

      // Retrieve overrides from localStorage
      let pointsAdjust: Record<string, number> = {};
      let tierOverrides: Record<string, "VIP" | "Premium" | "Standard"> = {};
      if (typeof window !== "undefined") {
        const pointsAdjustStr = localStorage.getItem("beautybooth_customer_points_adjustments");
        if (pointsAdjustStr) pointsAdjust = JSON.parse(pointsAdjustStr);
        const tierOverridesStr = localStorage.getItem("beautybooth_customer_tier_overrides");
        if (tierOverridesStr) tierOverrides = JSON.parse(tierOverridesStr);
      }

      // 3. Fallback to default mock customers if no orders found
      if (mergedOrders.length === 0) {
        const defaultCustomers: Customer[] = [
          { id: 1, name: "Farhana Yasmin", email: "farhana.yasmin@gmail.com", phone: "+8801712345678", joined: "Jan 12, 2026", purchases: 18, spent: 38200, points: 382, tier: "VIP" },
          { id: 2, name: "Imran Khan", email: "imran.khan@yahoo.com", phone: "+8801912987654", joined: "Feb 04, 2026", purchases: 1, spent: 24500, points: 245, tier: "Premium" },
          { id: 3, name: "Nusrat Jahan", email: "nusrat.jahan@hotmail.com", phone: "+8801643998877", joined: "Mar 19, 2026", purchases: 4, spent: 7400, points: 74, tier: "Standard" },
          { id: 4, name: "Sajid Hasan", email: "sajid.hasan@gmail.com", phone: "+8801811223344", joined: "Apr 28, 2026", purchases: 2, spent: 1280, points: 12, tier: "Standard" },
          { id: 5, name: "Ayesha Siddiqua", email: "ayesha.siddiqua@gmail.com", phone: "+8801555667788", joined: "May 02, 2026", purchases: 3, spent: 7050, points: 70, tier: "Premium" }
        ];

        const finalized = defaultCustomers.map(c => ({
          ...c,
          points: c.phone in pointsAdjust ? pointsAdjust[c.phone] : c.points,
          tier: c.phone in tierOverrides ? tierOverrides[c.phone] : c.tier
        }));
        setCustomers(finalized);
        setLoading(false);
        return;
      }

      // 4. Aggregate orders by phone number
      const customerGroups = new Map<string, any[]>();
      mergedOrders.forEach(order => {
        const phone = order.phone || "unknown";
        if (!customerGroups.has(phone)) {
          customerGroups.set(phone, []);
        }
        customerGroups.get(phone)!.push(order);
      });

      const aggregatedCustomers: Customer[] = Array.from(customerGroups.entries()).map(([phone, ordersList], idx) => {
        // Sort orders for this customer by date to find the earliest (joined) and most recent (name/email info)
        const sortedOrders = [...ordersList].sort((a, b) => {
          const tA = new Date(a.date).getTime() || 0;
          const tB = new Date(b.date).getTime() || 0;
          return tA - tB;
        });

        const earliestOrder = sortedOrders[0];
        const latestOrder = sortedOrders[sortedOrders.length - 1];
        
        const customerName = latestOrder.customer || "Anonymous User";
        const email = customerName.toLowerCase().replace(/[^a-z0-9]/g, "") + "@gmail.com";
        
        // Calculate spent amount
        const spent = sortedOrders.reduce((sum, o) => {
          let subtotal = 0;
          if (Array.isArray(o.items)) {
            subtotal = o.items.reduce((acc: number, item: any) => acc + ((item.price || 0) * (item.qty || 1)), 0);
          }
          return sum + subtotal + (o.shipping || 80);
        }, 0);

        const purchases = sortedOrders.length;
        
        // Calculate points (1 point per 100 spent)
        const defaultPoints = Math.round(spent / 100);
        const points = phone in pointsAdjust ? pointsAdjust[phone] : defaultPoints;

        // Determine tier
        let defaultTier: "VIP" | "Premium" | "Standard" = "Standard";
        if (purchases >= 10 || spent >= 15000) {
          defaultTier = "VIP";
        } else if (purchases >= 3 || spent >= 5000) {
          defaultTier = "Premium";
        }
        const tier = phone in tierOverrides ? tierOverrides[phone] : defaultTier;

        // Joined date
        const joinedDate = earliestOrder.date || "Unknown";

        return {
          id: idx + 1,
          name: customerName,
          email,
          phone,
          joined: joinedDate,
          purchases,
          spent,
          points,
          tier
        };
      });

      setCustomers(aggregatedCustomers);
      setLoading(false);
    }

    loadCustomers();
  }, [isDbConnected]);

  const handleTierChange = (phone: string, newTier: "VIP" | "Premium" | "Standard") => {
    setCustomers(prev => prev.map(c => c.phone === phone ? { ...c, tier: newTier } : c));

    if (typeof window !== "undefined") {
      const tierOverridesStr = localStorage.getItem("beautybooth_customer_tier_overrides");
      const tierOverrides = tierOverridesStr ? JSON.parse(tierOverridesStr) : {};
      tierOverrides[phone] = newTier;
      localStorage.setItem("beautybooth_customer_tier_overrides", JSON.stringify(tierOverrides));
    }
  };

  const adjustPoints = (phone: string, amount: number) => {
    setCustomers(prev => prev.map(c => {
      if (c.phone === phone) {
        const newPoints = Math.max(0, c.points + amount);
        
        if (typeof window !== "undefined") {
          const pointsAdjustStr = localStorage.getItem("beautybooth_customer_points_adjustments");
          const pointsAdjust = pointsAdjustStr ? JSON.parse(pointsAdjustStr) : {};
          pointsAdjust[phone] = newPoints;
          localStorage.setItem("beautybooth_customer_points_adjustments", JSON.stringify(pointsAdjust));
        }
        
        return { ...c, points: newPoints };
      }
      return c;
    }));
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.phone.includes(searchQuery);
    const matchesTier = tierFilter === "All" || c.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const getTierStyle = (tier: string) => {
    switch (tier) {
      case "VIP":
        return "bg-rose-50 text-rose-600 border-rose-200/60";
      case "Premium":
        return "bg-purple-50 text-purple-600 border-purple-200/60";
      default:
        return "bg-zinc-50 text-zinc-500 border-zinc-200";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 bg-zinc-200 rounded-xl" />
          <div className="h-4 w-72 bg-zinc-100 rounded-xl" />
        </div>

        {/* Filter panel */}
        <div className="bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col md:flex-row gap-4 h-24" />

        {/* Table skeleton */}
        <div className="bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col gap-4">
          <div className="h-6 w-32 bg-zinc-200 rounded-md" />
          <div className="flex flex-col gap-4 divide-y divide-zinc-100 mt-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-100" />
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-28 bg-zinc-200 rounded-md" />
                    <div className="h-3 w-40 bg-zinc-100 rounded-md" />
                  </div>
                </div>
                <div className="h-4 w-20 bg-zinc-100 rounded-md" />
                <div className="h-8 w-24 bg-zinc-100 rounded-xl" />
                <div className="h-4 w-12 bg-zinc-200 rounded-md" />
                <div className="flex gap-2">
                  <div className="h-8 w-16 bg-zinc-100 rounded-xl" />
                  <div className="h-8 w-16 bg-zinc-100 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Customer CRM</h1>
        <span className="text-[13px] font-bold text-zinc-400 uppercase tracking-widest">
          Loyalty logs & relationship console
        </span>
      </div>

      {/* Filter panel */}
      <div className="bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-4 shadow-xs">
        {/* Search */}
        <div className="flex-1 w-full relative">
          <input
            type="text"
            placeholder="Search by customer name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-50/50 border border-zinc-200 rounded-2xl py-3 px-4 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#FF1A58] focus:bg-white transition-all font-semibold"
          />
        </div>

        {/* Tier Filter */}
        <div className="w-full md:w-48">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="w-full bg-zinc-50/50 border border-zinc-200 rounded-2xl py-3 px-4 text-sm text-zinc-700 font-bold focus:outline-none focus:border-[#FF1A58] focus:bg-white transition-all"
          >
            <option value="All">All Tiers</option>
            <option value="VIP">VIP</option>
            <option value="Premium">Premium</option>
            <option value="Standard">Standard</option>
          </select>
        </div>
      </div>

      {/* Customer CRM Table */}
      <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 text-xs uppercase tracking-widest text-zinc-400 font-extrabold select-none bg-zinc-50/30">
                <th className="py-4.5 px-6">Customer details</th>
                <th className="py-4.5 px-6">Purchase Summary</th>
                <th className="py-4.5 px-6">Loyalty Level</th>
                <th className="py-4.5 px-6">Reward Points</th>
                <th className="py-4.5 px-6 text-right">Adjust Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredCustomers.map((c) => (
                <tr key={c.phone} className="hover:bg-zinc-50/30 transition-colors">
                  {/* Info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center font-extrabold text-zinc-800 text-sm select-none shrink-0 uppercase shadow-xs">
                        {c.name.split(" ").map(w => w[0]).join("")}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-zinc-900 leading-normal truncate">{c.name}</span>
                        <span className="text-xs font-semibold text-zinc-400 mt-0.5 truncate">{c.email}</span>
                        <span className="text-[11px] font-semibold text-zinc-400 mt-0.5">Joined: {c.joined}</span>
                      </div>
                    </div>
                  </td>

                  {/* Purchase Summary */}
                  <td className="py-4 px-6 select-text">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-[#FF1A58]">৳{c.spent.toLocaleString()}</span>
                      <span className="text-xs font-semibold text-zinc-500 mt-0.5">{c.purchases} total order(s)</span>
                    </div>
                  </td>

                  {/* Tier */}
                  <td className="py-4 px-6">
                    <select
                      value={c.tier}
                      onChange={(e) => handleTierChange(c.phone, e.target.value as any)}
                      className={`text-xs font-black uppercase px-3 py-1.5 rounded-full border focus:outline-none cursor-pointer ${getTierStyle(c.tier)}`}
                    >
                      <option value="VIP" className="text-rose-600 font-bold bg-white">VIP</option>
                      <option value="Premium" className="text-purple-600 font-bold bg-white">Premium</option>
                      <option value="Standard" className="text-zinc-500 font-bold bg-white">Standard</option>
                    </select>
                  </td>

                  {/* Reward Points */}
                  <td className="py-4 px-6 text-sm font-extrabold text-zinc-700 select-text">
                    🏆 {c.points} Pts
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => adjustPoints(c.phone, 50)}
                        className="bg-zinc-50 hover:bg-zinc-100 text-zinc-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-zinc-200 hover:border-zinc-300 cursor-pointer active:scale-95 duration-100 shadow-xs"
                      >
                        +50 Pts
                      </button>
                      <button
                        onClick={() => adjustPoints(c.phone, -50)}
                        className="bg-zinc-50 hover:bg-zinc-100 text-zinc-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-zinc-200 hover:border-zinc-300 cursor-pointer active:scale-95 duration-100 shadow-xs"
                      >
                        -50 Pts
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs font-semibold text-zinc-400 select-none">
                    No customers matched your search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
