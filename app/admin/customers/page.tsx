"use client";

import React, { useState } from "react";

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
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: "Farhana Yasmin", email: "farhana.yasmin@gmail.com", phone: "+8801712345678", joined: "Jan 12, 2026", purchases: 18, spent: 38200, points: 382, tier: "VIP" },
    { id: 2, name: "Imran Khan", email: "imran.khan@yahoo.com", phone: "+8801912987654", joined: "Feb 04, 2026", purchases: 1, spent: 24500, points: 245, tier: "Premium" },
    { id: 3, name: "Nusrat Jahan", email: "nusrat.jahan@hotmail.com", phone: "+8801643998877", joined: "Mar 19, 2026", purchases: 4, spent: 7400, points: 74, tier: "Standard" },
    { id: 4, name: "Sajid Hasan", email: "sajid.hasan@gmail.com", phone: "+8801811223344", joined: "Apr 28, 2026", purchases: 2, spent: 1280, points: 12, tier: "Standard" },
    { id: 5, name: "Ayesha Siddiqua", email: "ayesha.siddiqua@gmail.com", phone: "+8801555667788", joined: "May 02, 2026", purchases: 3, spent: 7050, points: 70, tier: "Premium" }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("All");

  const handleTierChange = (id: number, newTier: "VIP" | "Premium" | "Standard") => {
    setCustomers(customers.map(c => c.id === id ? { ...c, tier: newTier } : c));
  };

  const adjustPoints = (id: number, amount: number) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, points: Math.max(0, c.points + amount) } : c));
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
                <tr key={c.id} className="hover:bg-zinc-50/30 transition-colors">
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
                      <span className="text-sm font-black text-[#FF1A58]">৳{c.spent}</span>
                      <span className="text-xs font-semibold text-zinc-500 mt-0.5">{c.purchases} total order(s)</span>
                    </div>
                  </td>

                  {/* Tier */}
                  <td className="py-4 px-6">
                    <select
                      value={c.tier}
                      onChange={(e) => handleTierChange(c.id, e.target.value as any)}
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
                        onClick={() => adjustPoints(c.id, 50)}
                        className="bg-zinc-50 hover:bg-zinc-100 text-zinc-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-zinc-200 hover:border-zinc-300 cursor-pointer active:scale-95 duration-100 shadow-xs"
                      >
                        +50 Pts
                      </button>
                      <button
                        onClick={() => adjustPoints(c.id, -50)}
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
