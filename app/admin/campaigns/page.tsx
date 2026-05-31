"use client";

import React, { useState } from "react";

interface Coupon {
  code: string;
  discount: number;
  status: "Active" | "Expired";
  expiry: string;
}

export default function AdminCampaignsPage() {
  const [campaignStatus, setCampaignStatus] = useState<"Running" | "Paused">("Running");
  const [countdownDate, setCountdownDate] = useState("2026-05-30T23:59:59");
  
  const [coupons, setCoupons] = useState<Coupon[]>([
    { code: "BOOTH15", discount: 15, status: "Active", expiry: "2026-05-31" },
    { code: "BOISHAKHI25", discount: 25, status: "Active", expiry: "2026-06-15" },
    { code: "GLOW10", discount: 10, status: "Active", expiry: "2026-05-28" },
    { code: "EID30", discount: 30, status: "Expired", expiry: "2026-04-12" }
  ]);

  // New coupon form
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState(15);
  const [newExpiry, setNewExpiry] = useState("2026-06-30");

  const handleToggleCampaign = () => {
    setCampaignStatus(campaignStatus === "Running" ? "Paused" : "Running");
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;
    const added: Coupon = {
      code: newCode.toUpperCase().trim(),
      discount: newDiscount,
      status: "Active",
      expiry: newExpiry
    };
    setCoupons([added, ...coupons]);
    setNewCode("");
  };

  const handleToggleCoupon = (code: string) => {
    setCoupons(coupons.map(c => {
      if (c.code === code) {
        return { ...c, status: c.status === "Active" ? "Expired" : "Active" };
      }
      return c;
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Campaign & Promos Room</h1>
        <span className="text-[13px] font-bold text-zinc-400 uppercase tracking-widest">
          Govern coupon definitions, campaigns, and deadlocks
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Boishakhi Campaign Controls */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Main Campaign Panel */}
          <div className="bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col gap-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-zinc-50 pb-4">
              <span className="font-extrabold text-lg text-zinc-900">Boishakhi Campaign Controller</span>
              <span
                className={`text-xs font-black uppercase px-2.5 py-1 rounded-full border ${
                  campaignStatus === "Running"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200/60"
                    : "bg-rose-50 text-rose-600 border-rose-200/60"
                }`}
              >
                {campaignStatus}
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-zinc-50/50 rounded-2xl border border-zinc-100">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-zinc-900">Campaign System Status</span>
                  <span className="text-xs font-semibold text-zinc-500 leading-normal max-w-xs">
                    Pausing campaign deactivates homepage banners, active sales tags, and timer countdowns.
                  </span>
                </div>
                <button
                  onClick={handleToggleCampaign}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase transition-all shadow-md active:scale-95 duration-100 cursor-pointer ${
                    campaignStatus === "Running"
                      ? "bg-rose-500 hover:bg-rose-600 text-white"
                      : "bg-[#FF1A58] hover:bg-[#e11d48] text-white"
                  }`}
                >
                  {campaignStatus === "Running" ? "Pause Campaign" : "Resume Campaign"}
                </button>
              </div>

              {/* Countdown controller */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] uppercase font-bold text-zinc-400">Campaign Countdown Deadline</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={countdownDate}
                    onChange={(e) => setCountdownDate(e.target.value)}
                    className="flex-1 bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:outline-none focus:border-[#FF1A58] focus:bg-white transition-all font-bold"
                  />
                  <button
                    onClick={() => alert("Countdown deadline applied to frontend timer!")}
                    className="bg-zinc-50 hover:bg-zinc-100 text-zinc-700 px-5 py-3 rounded-xl text-xs font-black uppercase transition-all border border-zinc-200 active:scale-95 duration-100 cursor-pointer"
                  >
                    Sync Timer
                  </button>
                </div>
                <span className="text-[10px] font-semibold text-zinc-500 leading-normal">
                  Standard format is ISO-8601 string: <code className="text-zinc-400">YYYY-MM-DDTHH:MM:SS</code>
                </span>
              </div>
            </div>
          </div>

          {/* Active Promo Coupons Grid */}
          <div className="bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col gap-6 shadow-xs">
            <span className="font-extrabold text-lg text-zinc-900 border-b border-zinc-50 pb-4">
              Active Promo Coupons
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="bg-zinc-50/30 border border-zinc-100 rounded-2xl p-4 flex flex-col justify-between gap-4 shadow-xs"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-zinc-900">{coupon.code}</span>
                      <span className="text-xs font-semibold text-zinc-400 mt-1">Expires: {coupon.expiry}</span>
                    </div>
                    <span className="text-xs font-black text-[#FF1A58] bg-[#FF1A58]/10 px-2.5 py-1 rounded-lg">
                      -{coupon.discount}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
                    <span
                      className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                        coupon.status === "Active"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-rose-50 text-rose-600 border border-rose-100"
                      }`}
                    >
                      {coupon.status}
                    </span>
                    <button
                      onClick={() => handleToggleCoupon(coupon.code)}
                      className="text-xs font-bold text-zinc-400 hover:text-zinc-700 cursor-pointer active:scale-95 duration-100"
                    >
                      {coupon.status === "Active" ? "Invalidate" : "Re-activate"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Add Coupon Form */}
        <div className="bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col gap-6 h-fit shadow-xs">
          <span className="font-extrabold text-sm text-zinc-900 border-b border-zinc-50 pb-4">
            Generate Promo Coupon
          </span>

          <form onSubmit={handleAddCoupon} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-zinc-400">Coupon Code</label>
              <input
                type="text"
                required
                placeholder="e.g. SUMMER20"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:outline-none focus:border-[#FF1A58] focus:bg-white transition-all font-bold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-zinc-400">Discount Value (%)</label>
              <input
                type="number"
                required
                min={1}
                max={99}
                value={newDiscount}
                onChange={(e) => setNewDiscount(Number(e.target.value))}
                className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:outline-none focus:border-[#FF1A58] focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold text-zinc-400">Expiry Date</label>
              <input
                type="date"
                required
                value={newExpiry}
                onChange={(e) => setNewExpiry(e.target.value)}
                className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 text-xs text-zinc-800 focus:outline-none focus:border-[#FF1A58] focus:bg-white transition-all font-bold"
              />
            </div>

            <button
              type="submit"
              className="bg-[#FF1A58] hover:bg-[#e11d48] text-white py-3 rounded-xl text-xs font-black uppercase mt-4 transition-all shadow-md active:scale-95 duration-100 cursor-pointer"
            >
              Add Promo Coupon
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
