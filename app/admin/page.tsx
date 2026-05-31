"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS_DATA } from "../data/products";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingBag01Icon,
  ArrowRight01Icon,
  Coins01Icon,
  GridIcon,
} from "@hugeicons/core-free-icons";

export default function AdminDashboardOverview() {
  const totalProducts = PRODUCTS_DATA.length;
  
  const metrics = [
    {
      title: "Total Revenue",
      value: "৳1,248,500",
      change: "+12.4% this month",
      icon: Coins01Icon,
      color: "text-[#FF1A58] bg-[#FF1A58]/10"
    },
    {
      title: "Active Orders",
      value: "84",
      change: "28 pending shipment",
      icon: ShoppingBag01Icon,
      color: "text-amber-600 bg-amber-50"
    },
    {
      title: "Product Catalog",
      value: totalProducts.toString(),
      change: "Across 6 categories",
      icon: GridIcon,
      color: "text-sky-600 bg-sky-50"
    }
  ];

  const recentOrders = [
    { id: "BB-9204", customer: "Farhana Yasmin", amount: "৳2,100", status: "Delivered" },
    { id: "BB-9203", customer: "Imran Khan", amount: "৳24,500", status: "Pending" },
    { id: "BB-9202", customer: "Nusrat Jahan", amount: "৳3,700", status: "Processing" },
    { id: "BB-9201", customer: "Sajid Hasan", amount: "৳640", status: "Delivered" },
    { id: "BB-9200", customer: "Ayesha Siddiqua", amount: "৳2,350", status: "Processing" }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Header Hero */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Overview</h1>
        <p className="text-sm text-zinc-400 font-semibold leading-relaxed">
          Here is a quick snapshot of Glow Market BD storefront operations today.
        </p>
      </div>

      {/* 2. Grid metrics (Clean 3-Column Layout with Icons) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="bg-white border border-zinc-100 rounded-2xl p-6 flex items-center justify-between shadow-xs hover:border-[#FF1A58]/20 transition-all duration-200"
          >
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{metric.title}</span>
              <span className="text-3xl font-black text-zinc-900 leading-none">{metric.value}</span>
              <span className="text-xs font-semibold text-zinc-400 mt-0.5">{metric.change}</span>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${metric.color}`}>
              <HugeiconsIcon icon={metric.icon} size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Detailed Data Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders log */}
        <div className="lg:col-span-2 bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col gap-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-50 pb-4">
            <div className="flex items-center gap-2.5">
              <HugeiconsIcon icon={ShoppingBag01Icon} className="text-[#FF1A58]" size={20} />
              <span className="font-extrabold text-base text-zinc-900">Recent Orders</span>
            </div>
            <Link href="/admin/orders" className="text-sm font-bold text-[#FF1A58] hover:underline flex items-center gap-1">
              <span>View All</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
            </Link>
          </div>

          <div className="divide-y divide-zinc-50">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-black text-zinc-900">{order.id}</span>
                  <span className="text-xs font-semibold text-zinc-400">{order.customer}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-[#FF1A58]">{order.amount}</span>
                  <span
                    className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-emerald-50 text-emerald-600"
                        : order.status === "Pending"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-sky-50 text-sky-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Shortcuts & Quick Operations */}
        <div className="bg-white border border-zinc-100 rounded-3xl p-6 flex flex-col gap-6 shadow-xs h-fit">
          <span className="font-extrabold text-base text-zinc-900 border-b border-zinc-50 pb-4">
            Quick Actions
          </span>
          <div className="flex flex-col gap-2.5">
            <Link
              href="/admin/products"
              className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 hover:bg-[#FF1A58]/5 hover:text-[#FF1A58] text-sm font-semibold text-zinc-700 transition-all border border-zinc-100/50"
            >
              <span>Manage Products</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-zinc-400 hover:text-[#FF1A58]" />
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 hover:bg-[#FF1A58]/5 hover:text-[#FF1A58] text-sm font-semibold text-zinc-700 transition-all border border-zinc-100/50"
            >
              <span>Order Pipelines</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-zinc-400 hover:text-[#FF1A58]" />
            </Link>
            <Link
              href="/admin/campaigns"
              className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 hover:bg-[#FF1A58]/5 hover:text-[#FF1A58] text-sm font-semibold text-zinc-700 transition-all border border-zinc-100/50"
            >
              <span>Campaign & Promos</span>
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-zinc-400 hover:text-[#FF1A58]" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
